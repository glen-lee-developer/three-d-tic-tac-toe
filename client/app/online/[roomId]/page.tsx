"use client";


import { Button } from "@/components/common/ui/button";
import OnlineScoreBoard from "@/components/onlineScoreBoard";
import CalculateWinningCombinations from "@/lib/calculateWinner";
import CheckForWinner from "@/lib/checkForWinner";
import { OnlineGameData, useOnlineGameData } from "@/stores/onlineBoardStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { Room } from "@/types";
import OnlineBoard from "@/components/onlineBoard";

export const OnlineGame = () => {
  const searchParams = useParams();
  const roomId = searchParams.roomId;
 
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
  console.log( cubesData,
    numberOfTurns,
    currentPlayer,
    player1,
    player2,
    player1Score,
    player2Score,
    gameHasStarted)

    useEffect(() => {
      const players = (player1:string,player2:string) => {
        setPlayer1(player1);
        setPlayer2(player2);
      }
      socket.on("update-players", players)


      const initialiseGameData = ( updateGameData:OnlineGameData  ) => {    
        setCubesData(updateGameData.cubesData);
        setCurrentPlayer(updateGameData.currentPlayer);
        setNumberOfTurns(updateGameData.numberOfTurns);
        setplayer1Score(updateGameData.player1Score);
        setplayer2Score(updateGameData.player2Score);
        setGameHasStarted(updateGameData.gameHasStarted);
      }
      socket.on("response-start-game-data", initialiseGameData );


      const updateGameData = ( updatedGameData:any ) => {    
        console.log(updateGameData,"UPDATED")
        setCubesData(updatedGameData.cubesData);
        setCurrentPlayer(updatedGameData.currentPlayer);
        setNumberOfTurns(updatedGameData.numberOfTurns);
        setplayer1Score(updatedGameData.player1Score);
        setplayer2Score(updatedGameData.player2Score);
     
      }
      socket.on("updated-game-data", updateGameData)
  
      return () => {
        socket.off("update-players");
        socket.off("response-start-game-data");
        socket.off("updated-game-data");
      };
    }, []);

  function startNewGame(): void {
    socket.emit("request-start-game-data", {
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
      player1Score,
      player2Score,
    });
  }
  
 
  return (
    <main className="h-full w-full flex flex-col items-center justify-center" >
      <OnlineScoreBoard  />
      {gameHasStarted && <OnlineBoard updateCubesData={updateCubesData} />}
      { gameHasStarted === false ?  <Button onClick={startNewGame} disabled={player1 === null || player2 === null}>Begin Game</Button> :  <Button onClick={startNewGame}>Reset Board</Button>}
    </main>
  );
};

export default OnlineGame;
