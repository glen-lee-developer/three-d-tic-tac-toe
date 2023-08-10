export interface User {
  userSocketId: any;
  username: string;
}

export interface RoomJoinedData {
  user: User;
  roomId: string;
  players: User[];
}

export interface RoomCreatedData {
  playersInRoom: User[];
  roomId: string;
}
