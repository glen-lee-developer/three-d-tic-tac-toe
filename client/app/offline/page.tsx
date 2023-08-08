"use client";

import { useSearchParams } from "next/navigation";
import { useOfflineGameData } from "@/stores/offlineBoardStore";
import ScoreBoard from "@/components/scoreBoard";
import Board from "@/components/board";
import { Button } from "@/components/common/ui/button";
import CalculateWinningCombinations from "@/lib/calculateWinner";
import CheckForWinner from "@/lib/checkForWinner";
import { useEffect, useState } from "react";

export const OfflineGame = () => {
  const {
    cubesData,
    numberOfTurns,
    currentPlayer,
    player1Score,
    player2Score,
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

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  useEffect(() => {
    setPlayer1(player1);
    setPlayer2(player2);
  }, [player1, player2, setPlayer1, setPlayer2]);

  function startNewGame(): void {
    setCubesData(Array(27).fill(undefined));
    setNumberOfTurns(0);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? player1 : player2);
    setplayer1Score(0);
    setplayer2Score(0);
    if (!isGameStarted) {
      setIsGameStarted(true);
    }
  }

  function updateCubesData(indexOfCurrentCube: number): void {
    const updatedCubesData = cubesData.map((CubeInCubesArray, i) => {
      if (i === indexOfCurrentCube) {
        return currentPlayer;
      }
      return CubeInCubesArray;
    });

    // Calculate updated scores
    const { updatedplayer1Score, updatedplayer2Score } =
      CalculateWinningCombinations(updatedCubesData, player1, player2);

    setCubesData(updatedCubesData);
    setNumberOfTurns(numberOfTurns + 1);
    setplayer1Score(updatedplayer1Score);
    setplayer2Score(updatedplayer2Score);

    const winner = CheckForWinner(
      numberOfTurns + 1,
      player1,
      player2,
      player1Score,
      player2Score
    );
    setWinner(winner);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  }

  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <ScoreBoard />
      {isGameStarted ? (
        <Board updateCubesData={updateCubesData} />
      ) : (
        <Button onClick={startNewGame}>Begin Game</Button>
      )}
      <div className="flex flex-col justify-center gap-5 lg:flex-row">
        <Button onClick={startNewGame}>Reset Board</Button>
      </div>
    </main>
  );
};

export default OfflineGame;
