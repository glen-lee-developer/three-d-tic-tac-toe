import { Player } from "./player";

export type GameData = {
  cubesData: Player[];
  numberOfTurns: number;
  currentPlayer: "X" | "O";
  scores: {
    oScore: number;
    xScore: number;
  };
  winner: Player;
  vertical: boolean;
};
