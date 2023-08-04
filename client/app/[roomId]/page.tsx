"use client";

import { useGameData } from "@/stores/boardStore";
import ScoreBoard from "@/components/ScoreBoard/scoreBoardContainer";
import Board from "@/components/board";
import { Button } from "@/components/common/ui/button";
import CalculateWinningCombinations from "@/lib/calculateWinner";
import CheckForWinner from "@/lib/checkForWinner";
import ChooseRandomPlayer from "@/lib/chooseRandomPlayer";
import { useEffect } from "react";

export default function Game() {
  const {
    cubesData,
    numberOfTurns,
    currentPlayer,
    xScore,
    oScore,
    winner,
    reset, // Destructure the reset function from the store
    setCubesData,
    setNumberOfTurns,
    setCurrentPlayer,
    setXScore,
    setOScore,
    setWinner,
  } = useGameData();

  //  Reset the game data
  function handleReset(): void {
    reset();
  }

  function updateCubesData(indexOfCurrentSquare: number): void {
    const updatedCubesData = cubesData.map((CubeInCubesArray, i) => {
      if (i === indexOfCurrentSquare) {
        return currentPlayer;
      }
      return CubeInCubesArray;
    });

    // Calculate updated scores
    const { updatedXScore, updatedOScore } =
      CalculateWinningCombinations(updatedCubesData);

    setCubesData(updatedCubesData);
    setNumberOfTurns(numberOfTurns + 1);
    setXScore(updatedXScore);
    setOScore(updatedOScore);

    const winner = CheckForWinner(numberOfTurns + 1, xScore, oScore);
    setWinner(winner);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <ScoreBoard
        xScore={xScore}
        oScore={oScore}
        currentPlayer={currentPlayer}
        winner={winner}
      />
      <Board cubesData={cubesData} updateCubesData={updateCubesData} />
      <div className="flex flex-col justify-center gap-5 lg:flex-row">
        <Button onClick={handleReset}>Reset Board</Button>
      </div>
    </main>
  );
}
