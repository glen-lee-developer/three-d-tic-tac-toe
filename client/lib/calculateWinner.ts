// type Player = string | string | undefined;

// function CalculateWinningCombinations(
//   cubes: Player[],
//   player1: string,
//   player2:string
// ): {
//   updatedplayer2Score: number;
//   updatedplayer1Score: number;
// } {
//   let winningCombinations: number[][] = [
//     // TOP BOARD - 8
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//     // MIDDLE BOARD - 8
//     [9, 10, 11],
//     [12, 13, 14],
//     [15, 16, 17],
//     [9, 12, 15],
//     [10, 13, 16],
//     [11, 4, 17],
//     [9, 13, 17],
//     [11, 13, 15],
//     // BOTTOM BOARD - 8
//     [18, 19, 20],
//     [21, 22, 23],
//     [24, 25, 26],
//     [18, 21, 24],
//     [19, 22, 25],
//     [20, 23, 26],
//     [18, 22, 26],
//     [20, 22, 24],
//     //3D Verticals - 9
//     [0, 9, 18],
//     [1, 10, 19],
//     [2, 11, 20],
//     [3, 12, 21],
//     [4, 13, 22],
//     [5, 14, 23],
//     [6, 15, 24],
//     [7, 16, 25],
//     [8, 17, 26],
//     // 3D Horizontal Diagonals - 6
//     [0, 10, 20],
//     [2, 10, 18],
//     [3, 13, 23],
//     [5, 13, 21],
//     [6, 16, 26],
//     [8, 16, 24],
//     // 3D Vertical Diagonals - 6
//     [0, 12, 24],
//     [6, 12, 18],
//     [1, 13, 25],
//     [7, 13, 19],
//     [2, 14, 26],
//     [8, 14, 20],
//     // 3D Diagonals - 4
//     [0, 13, 26],
//     [8, 13, 18],
//     [6, 13, 20],
//     [2, 13, 24],
//     // Total 49 possibilities
//   ];
//   let updatedplayer1Score: number = 0;
//   let updatedplayer2Score: number = 0;
//   let player1WinningCombinations = [];
//   let player2WinningCombinations = [];
//   for (let i = 0; i < winningCombinations.length; i++) {
//     const [a, b, c] = winningCombinations[i];

//     if (cubes[a] && cubes[a] === cubes[b] && cubes[a] === cubes[c]) {
//       if (cubes[a] === player1) {
//         updatedplayer1Score += 1;
//         player1WinningCombinations.push([a, b, c]);
//       } else {
//         updatedplayer2Score += 1;
//         player2WinningCombinations.push([a, b, c]);
//       }
//     }
//   }

//   return { updatedplayer2Score, updatedplayer1Score };
// }

// export default CalculateWinningCombinations;

type Player = string | undefined;

function CalculateWinningCombinations(
  cubes: Player[],
  player1: string,
  player2: string
): {
  updatedplayer2Score: number;
  updatedplayer1Score: number;
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
    [11, 14, 17],
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
    // 3D Verticals - 9
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
  ];

  let updatedplayer1Score: number = 0;
  let updatedplayer2Score: number = 0;
  let player1WinningCombinations: number[][] = [];
  let player2WinningCombinations: number[][] = [];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (cubes[a] && cubes[a] === cubes[b] && cubes[a] === cubes[c]) {
      if (cubes[a] === player1) {
        updatedplayer1Score += 1;
        player1WinningCombinations.push([a, b, c]);
      } else if (cubes[a] === player2) {
        updatedplayer2Score += 1;
        player2WinningCombinations.push([a, b, c]);
      }
    }
  }

  return { updatedplayer2Score, updatedplayer1Score };
}

export default CalculateWinningCombinations;
