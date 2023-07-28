import { Player } from "@/types/player";

function CheckForWinner(
  numberOfTurns: number,
  xScore: number,
  oScore: number
): Player {
  if (numberOfTurns === 27) {
    switch (true) {
      case oScore > xScore:
        return "O";
      case xScore > oScore:
        return "X";
      default:
        return "DRAW";
    }
  }
  return undefined;
}

export default CheckForWinner;
