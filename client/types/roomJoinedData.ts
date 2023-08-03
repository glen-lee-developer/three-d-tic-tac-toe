import { User } from "@/stores/userStore";

export interface RoomJoinedData {
  user: User;
  roomId: string;
  players: User[];
}
