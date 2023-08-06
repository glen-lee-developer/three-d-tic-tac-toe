"use client";
import React, { useEffect } from "react";
import PlayerIndicator from "../playerIndicator";
import { Player } from "@/types/player";
import { usePlayersStore } from "@/stores/playersStore";
import { socket } from "@/lib/socket";

interface ScoreBoardProps {
  player1Score: number;
  player2Score: number;
  // currentPlayer: Player;
  winner: Player;
}

const ScoreBoard = ({
  player1Score,
  player2Score,
  // currentPlayer,
  winner,
}: ScoreBoardProps) => {
  const { player1, player2, setPlayer1, setPlayer2 } = usePlayersStore();

  let player1Name = player1?.username || null;
  let player2Name = player2?.username || null;

  useEffect(() => {
    socket.on("update-players", (players) => {
      setPlayer1(players[0]);
      setPlayer2(players[1]);
    });
  }, [setPlayer1, setPlayer2]);

  const color1 = "bg-dreamer-blue";
  const color2 = "bg-dreamer-pink";

  return (
    <div className="flex justify-between items-center  w-full text-lg">
      <div
        className={`border flex flex-col items-center justify-center ${color1} h-24 w-24 rounded-md text-center`}
      >
        <h4>{player1Name ? player1Name : "waiting for player"}</h4>
        <p>{player1Score}</p>
      </div>
      {/* <PlayerIndicator
        currentPlayer={
          currentPlayer === player1Name ? player1Name : player2Name
        }
        winner={winner}
      /> */}
      <div
        className={`border flex flex-col items-center justify-center ${color2} h-24 w-24 rounded-md text-center`}
      >
        <h4>{player2Name ? player2Name : "waiting for player"}</h4>
        <p>{player2Score}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
