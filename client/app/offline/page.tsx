"use client";

import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { useOfflineGameData } from "@/stores/offlineBoardStore";
import ScoreBoard from "@/components/ScoreBoard/scoreBoardContainer";
import Board from "@/components/board";
import { Button } from "@/components/common/ui/button";
import CalculateWinningCombinations from "@/lib/calculateWinner";
import CheckForWinner from "@/lib/checkForWinner";
import ChooseRandomPlayer from "@/lib/chooseRandomPlayer";
import { useEffect } from "react";

export const OfflineGame = () => {
  const {
    cubesData,
    numberOfTurns,
    currentPlayer,
    player1Score,
    player2Score,
    winner,
    reset,
    setCubesData,
    setNumberOfTurns,
    setCurrentPlayer,
    setPlayer1,
    setPlayer2,
    setplayer1Score,
    setplayer2Score,
    setWinner,
  } = useOfflineGameData();
  const searchParams = useSearchParams();
  const player1 = searchParams.get("player1") as string;
  const player2 = searchParams.get("player2") as string;

  useEffect(() => {
    setPlayer1(player1);
    setPlayer2(player2);
  }, [player1, player2, setPlayer1, setPlayer2]);

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
    const { updatedplayer1Score, updatedplayer2Score } =
      CalculateWinningCombinations(updatedCubesData);

    setCubesData(updatedCubesData);
    setNumberOfTurns(numberOfTurns + 1);
    setplayer1Score(updatedplayer1Score);
    setplayer2Score(updatedplayer2Score);

    const winner = CheckForWinner(
      numberOfTurns + 1,
      player1Score,
      player2Score
    );
    setWinner(winner);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  }

  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <ScoreBoard
        isOffline={true}
        player1={player1}
        player2={player2}
        player1Score={player1Score}
        player2Score={player2Score}
        // currentPlayer={currentPlayer === player1Name}
        winner={winner}
      />
      <Board
        cubesData={cubesData}
        updateCubesData={updateCubesData}
        isPlayerTurn={currentPlayer === player1}
      />
      <div className="flex flex-col justify-center gap-5 lg:flex-row">
        <Button onClick={handleReset}>Reset Board</Button>
      </div>
    </main>
  );
};

export default OfflineGame;
