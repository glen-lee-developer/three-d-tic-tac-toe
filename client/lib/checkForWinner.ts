import { Player } from "@/types/player";

function CheckForWinner(
  numberOfTurns: number,
  player1Score: number,
  player2Score: number
): Player {
  if (numberOfTurns === 27) {
    switch (true) {
      case player2Score > player1Score:
        return "Player2";
      case player1Score > player2Score:
        return "Player1";
      default:
        return "DRAW";
    }
  }
  return undefined;
}

export default CheckForWinner;
