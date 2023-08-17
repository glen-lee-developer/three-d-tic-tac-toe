export interface User {
  username: string;
  roomId: string;
}

export interface RoomData {
  roomId: string;
  isPrivateRoom: boolean;
  player1: User | null;
  player2: User | null;
}
