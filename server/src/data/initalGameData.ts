type initalGameData = {
  cubesData: undefined[],
  numberOfTurns: number,
  currentPlayer: string | undefined,
  player1:  string | undefined,
  player2:string | undefined,
  player2Score: number,
  player1Score: number,
  winner: string | undefined,
  gameHasStarted: boolean,
}


export const initialGameData:initalGameData = {
    cubesData: Array(27).fill(undefined),
    numberOfTurns: 0,
    currentPlayer: undefined,
    player1:  undefined,
    player2: undefined,
    player2Score: 0,
    player1Score: 0,
    winner: undefined,
    gameHasStarted: true,
  };
  