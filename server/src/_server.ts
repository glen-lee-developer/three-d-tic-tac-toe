import express from "express";
import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { z } from "zod";

import {
  addUserToServerGlobalUsers,
  getUserFromServerGlobalUsers,
  getUsersInSpecificRoom,
  removeUserFromServerGlobalUsers,
} from "./data/serverGlobalUsers";
import { joinRoomSchema } from "./validations/joinRoom";
import { JoinRoomData } from "./types";
import { validateJoinRoomData } from "./validations/validateRoomData";
import {
  addRoomToServerGlobalRooms,
  findRoomInServerGlobalRooms,
  getPlayersInRoomFromServerGlobalRooms,
  showAllRoomsInServerGlobalRooms,
  updatePlayersInAServerGlobalRoom,
} from "./data/serverGlobalRooms";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);
function isRoomCreated(roomId: string) {
  const rooms = [...io.sockets.adapter.rooms];
  console.log(rooms, "SOCKETROOM");
  return rooms?.some((room) => room[0] === roomId);
}

function CreateRoom(
  socket: Socket,
  roomId: string,
  isPublic: boolean,
  username: string
) {
  const user = {
    userSocketId: socket.id,
    username,
  };
  addUserToServerGlobalUsers({ ...user, roomId });
  const player1 = getUserFromServerGlobalUsers(user.userSocketId);
  addRoomToServerGlobalRooms({ roomId, isPublic, player1 });
  const playersInRoom = getPlayersInRoomFromServerGlobalRooms(roomId);

  socket.emit("room-created", { roomId, playersInRoom });
}

function joinRoom(socket: Socket, roomId: string, username: string) {
  socket.join(roomId);
  const user = {
    userSocketId: socket.id,
    username,
  };
  addUserToServerGlobalUsers({ ...user, roomId });

  const player2 = getUserFromServerGlobalUsers(user.userSocketId);
  if (player2) {
    updatePlayersInAServerGlobalRoom(roomId, player2);
  }
  const playersInRoom = getUsersInSpecificRoom(roomId);
  console.log(playersInRoom, "PEW PEW PEW");
  socket.emit("room-joined", { roomId, playersInRoom });
}

//  SOCKETS
io.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("attempt-to-create-room", (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);
    if (!validatedData) return;
    const { roomId, username } = validatedData;
    const isPublic = true;
    CreateRoom(socket, roomId, isPublic, username);
  });

  socket.on("show-available-rooms", () => {
    const rooms = showAllRoomsInServerGlobalRooms();
    socket.emit("available-rooms", { rooms });
  });

  socket.on("join-room", (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);
    if (!validatedData) return;
    const { roomId, username } = validatedData;

    console.log(roomId);
    if (isRoomCreated(roomId)) {
      return joinRoom(socket, roomId, username);
    }

    socket.emit("room-not-found", {
      message:
        "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
    });
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
