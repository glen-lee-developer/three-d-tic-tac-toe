"use client";

import ScoreBoard from "@/components/ScoreBoard/scoreBoardContainer";
import Board from "@/components/board";
import { Button } from "@/components/common/ui/button";
import CalculateWinningCombinations from "@/lib/calculateWinner";
import CheckForWinner from "@/lib/checkForWinner";
import ChooseRandomPlayer from "@/lib/chooseRandomPlayer";
import { GameData } from "@/types/gameData";
import { useEffect, useState } from "react";

export default function Home() {
  // Setting inital data
  const [gameData, setGameData] = useState<GameData>({
    cubesData: Array(27).fill(undefined), //Creates an empty array of length 29
    numberOfTurns: 0,
    currentPlayer: ChooseRandomPlayer(),
    scores: {
      oScore: 0,
      xScore: 0,
    },
    winner: undefined,
    vertical: false,
  });

  //  Reset the game data
  function reset(): void {
    setGameData({
      ...gameData,
      cubesData: Array(27).fill(undefined),
      numberOfTurns: 0,
      currentPlayer: ChooseRandomPlayer(),
      scores: {
        oScore: 0,
        xScore: 0,
      },
      winner: undefined,
    });
  }

  useEffect(() => {
    setGameData({
      ...gameData,
      scores: CalculateWinningCombinations(gameData.cubesData),
    });
  }, [gameData.currentPlayer]);

  function updateCubesData(indexOfCurrentSquare: number): void {
    const updatedSquaresData = gameData.cubesData.map((CubeInCubesArray, i) => {
      if (i === indexOfCurrentSquare) {
        return gameData.currentPlayer;
      }
      return CubeInCubesArray;
    });
    setGameData({
      ...gameData,
      cubesData: updatedSquaresData,
      numberOfTurns: (gameData.numberOfTurns += 1),
      winner: CheckForWinner(
        gameData.numberOfTurns,
        gameData.scores.xScore,
        gameData.scores.oScore
      ),
      currentPlayer: gameData.currentPlayer === "X" ? "O" : "X",
    });
  }

  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <ScoreBoard
        xScore={gameData.scores.xScore}
        oScore={gameData.scores.oScore}
        currentPlayer={gameData.currentPlayer}
        winner={gameData.winner}
      />
      <Board gameData={gameData} updateCubesData={updateCubesData} />
      <div className="flex flex-col justify-center gap-5 lg:flex-row">
        <Button onClick={reset}>Reset Board</Button>
      </div>
    </main>
  );
}
