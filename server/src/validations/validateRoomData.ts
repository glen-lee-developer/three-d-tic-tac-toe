import { Socket } from "socket.io";
import { joinRoomSchema } from "./joinRoom";
import { JoinRoomData } from "@/types";
import { z } from "zod";

export function validateJoinRoomData(
  socket: Socket,
  joinRoomData: JoinRoomData
) {
  try {
    return joinRoomSchema.parse(joinRoomData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      socket.emit("invalid-data", {
        message:
          "The entities you provided are not correct and cannot be processed.",
      });
    }
  }
}
