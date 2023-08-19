export interface User {
  username: string;
  roomId: string;
}

export interface RoomData {
  roomId: string;
  isPrivateRoom: boolean;
  player1: string | null;
  player2: string | null;
}