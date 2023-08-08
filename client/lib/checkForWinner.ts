function CheckForWinner(
  numberOfTurns: number,
  player1: string,
  player2: string,
  player1Score: number,
  player2Score: number
): string | undefined {
  if (numberOfTurns === 27) {
    if (player2Score > player1Score) {
      return player2;
    } else if (player1Score > player2Score) {
      return player1;
    } else {
      return "DRAW";
    }
  }
  return undefined;
}

export default CheckForWinner;
