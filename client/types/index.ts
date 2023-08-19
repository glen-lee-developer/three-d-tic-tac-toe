export interface User {
    userSocketId: string;
    username: string;
    color?: string | undefined;
  }
  
  export interface Room {
    roomId: string;
    isPrivateRoom: boolean;
    player1: string;
    player2: string;
  }