type Player = "X" | "O" | "DRAW" | undefined;
function CalculateWinningCombinations(squares: Player[]): {
  updatedOScore: number;
  updatedXScore: number;
} {
  let winningCombinations: number[][] = [
    // TOP BOARD - 8
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    // MIDDLE BOARD - 8
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17],
    [9, 12, 15],
    [10, 13, 16],
    [11, 4, 17],
    [9, 13, 17],
    [11, 13, 15],

    // BOTTOM BOARD - 8
    [18, 19, 20],
    [21, 22, 23],
    [24, 25, 26],
    [18, 21, 24],
    [19, 22, 25],
    [20, 23, 26],
    [18, 22, 26],
    [20, 22, 24],
    //3D Verticals - 9
    [0, 9, 18],
    [1, 10, 19],
    [2, 11, 20],
    [3, 12, 21],
    [4, 13, 22],
    [5, 14, 23],
    [6, 15, 24],
    [7, 16, 25],
    [8, 17, 26],
    // 3D Horizontal Diagonals - 6
    [0, 10, 20],
    [2, 10, 18],
    [3, 13, 23],
    [5, 13, 21],
    [6, 16, 26],
    [8, 16, 24],
    // 3D Vertical Diagonals - 6
    [0, 12, 24],
    [6, 12, 18],
    [1, 13, 25],
    [7, 13, 19],
    [2, 14, 26],
    [8, 14, 20],
    // 3D Diagonals - 4
    [0, 13, 26],
    [8, 13, 18],
    [6, 13, 20],
    [2, 13, 24],
    // Total 49 possibilities
  ];
  let x: number = 0;
  let o: number = 0;
  let xWinningCombinations = [];
  let oWinningCombinations = [];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      if (squares[a] === "X") {
        x += 1;
        xWinningCombinations.push([a, b, c]);
      } else {
        o += 1;
        oWinningCombinations.push([a, b, c]);
      }
    }
  }

  return { updatedOScore: o, updatedXScore: x };
}

export default CalculateWinningCombinations;
