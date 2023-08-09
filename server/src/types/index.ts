export interface JoinRoomData {
  roomId: string;
  username: string;
}

export interface User {
  userSocketId: string;
  username: string;
  roomId: string;
}

export type Player = "Player1" | "Player2" | "DRAW" | undefined;

export type GameData = {
  cubesData: (Player | undefined)[]; // Corrected type here
  numberOfTurns: number;
  currentPlayer: "Player1" | "Player2";
  player2Score: number;
  player1Score: number;
  winner: Player;
};
