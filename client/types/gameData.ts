import { Player } from "./player";

export type GameData = {
  cubesData: Player[];
  numberOfTurns: number;
  currentPlayer: "Player1" | "Player2";
  scores: {
    player2Score: number;
    player1Score: number;
  };
  winner: Player;
};
