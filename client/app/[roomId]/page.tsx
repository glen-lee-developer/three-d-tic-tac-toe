"use client";

import { useGameData } from "@/stores/boardStore";
import ScoreBoard from "@/components/ScoreBoard/scoreBoardContainer";
import Board from "@/components/board";
import { Button } from "@/components/common/ui/button";
import CalculateWinningCombinations from "@/lib/calculateWinner";
import CheckForWinner from "@/lib/checkForWinner";
import ChooseRandomPlayer from "@/lib/chooseRandomPlayer";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { usePlayersStore } from "@/stores/playersStore";

export default function Game() {
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
    setplayer1Score,
    setplayer2Score,
    setWinner,
  } = useGameData();

  const { player1, player2, setPlayer1, setPlayer2 } = usePlayersStore();

  let player1Name = player1?.username || null;
  let player2Name = player2?.username || null;

  const { roomId } = useParams();

  useEffect(() => {
    socket.on("update-players", (players) => {
      setPlayer1(players[0]);
      setPlayer2(players[1]);
    });
  }, [setPlayer1, setPlayer2]);

  useEffect(() => {
    socket.emit("client-ready", roomId);
  }, [roomId]);

  socket.on(
    "receive-board-state-from-server",
    ({
      cubesData,
      numberOfTurns,
      currentPlayer,
      player1Score,
      player2Score,
      winner,
    }: any) => {
      setCubesData(cubesData);
      setNumberOfTurns(numberOfTurns);
      setCurrentPlayer(currentPlayer);
      setplayer1Score(player1Score);
      setplayer2Score(player2Score);
      setWinner(winner);
    }
  );

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
    setCurrentPlayer(currentPlayer === "Player1" ? "Player2" : "Player1");

    // Emit the updated game state to the server
    socket.emit("send-board-state-to-server", {
      cubesData: updatedCubesData,
      numberOfTurns: numberOfTurns + 1,
      currentPlayer: currentPlayer === "Player1" ? "Player2" : "Player1",
      player1Score: updatedplayer1Score,
      player2Score: updatedplayer2Score,
      winner,
      roomId,
    });
  }

  console.log(currentPlayer, "CURRENT PLAYER");

  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <ScoreBoard
        player1Score={player1Score}
        player2Score={player2Score}
        // currentPlayer={currentPlayer === player1Name}
        winner={winner}
      />
      <Board
        cubesData={cubesData}
        updateCubesData={updateCubesData}
        isPlayerTurn={currentPlayer === player1Name}
      />
      <div className="flex flex-col justify-center gap-5 lg:flex-row">
        <Button onClick={handleReset}>Reset Board</Button>
      </div>
    </main>
  );
}
