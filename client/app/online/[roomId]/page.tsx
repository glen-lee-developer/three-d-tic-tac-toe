"use client";

import Board from "@/components/board";
import { Button } from "@/components/common/ui/button";
import OnlineScoreBoard from "@/components/onlineScoreBoard";
import CalculateWinningCombinations from "@/lib/calculateWinner";
import CheckForWinner from "@/lib/checkForWinner";
import { useOnlineGameData } from "@/stores/onlineBoardStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { Room } from "@/types";

export const OnlineGame = () => {
  const searchParams = useParams();
  const roomId = searchParams.roomId;
  const router = useRouter()
 
  const {
    cubesData,
    numberOfTurns,
    currentPlayer,
    player1,
    player2,
    player1Score,
    player2Score,
    gameHasStarted,
    setCubesData,
    setNumberOfTurns,
    setCurrentPlayer,
    setPlayer1,
    setPlayer2,
    setplayer1Score,
    setplayer2Score,
    setWinner,
    setGameHasStarted,
  } = useOnlineGameData();

  useEffect(() => {
    socket.on("update-players", (player1:string,player2:string) => {
      setPlayer1(player1)
      setPlayer2(player2)
    })
    if(player1 && player2) {
      socket.emit("client-ready")
    }
  }, [router,player1,player2]);
 
  useEffect(() => {
    socket.on(
      "start-game-data-from-server",
      ({
        cubesData,
        numberOfTurns,
        player1Score,
        player2Score,
        gameHasStarted,
      }) => {
        setCubesData(cubesData);
        setCurrentPlayer(
          Math.round(Math.random() * 1) === 1 ? player1 : player2
        );
        setNumberOfTurns(numberOfTurns);
        setplayer1Score(player1Score);
        setplayer2Score(player2Score);
        setGameHasStarted(gameHasStarted);
      }
    );
  }, []);

  function startNewGame(): void {
    socket.emit("start-game-data", {
      roomId,
    });
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
    socket.emit("update-game-data", {
      roomId,
      cubesData,
      numberOfTurns,
      currentPlayer,
      player1,
      player2,
      player1Score,
      player2Score,
    });
  }
  console.log(gameHasStarted, "Game Started");
 
  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <OnlineScoreBoard />
      {gameHasStarted && <Board updateCubesData={updateCubesData} />}
      { !gameHasStarted ?  <Button onClick={startNewGame} disabled={player1 === null || player2 === null}>Begin Game</Button> :  <Button onClick={startNewGame}>Reset Board</Button>}
    </main>
  );
};

export default OnlineGame;
