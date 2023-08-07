"use client";
import React, { useEffect } from "react";
import PlayerIndicator from "../playerIndicator";
import { Player } from "@/types/player";
import { usePlayersStore } from "@/stores/playersStore";
import { socket } from "@/lib/socket";

interface ScoreBoardProps {
  isOffline: boolean;
  player1?: string;
  player2?: string;
  player1Score: number;
  player2Score: number;
  // currentPlayer: Player;
  winner: Player;
}

const ScoreBoard = ({
  isOffline,
  player1,
  player2,
  player1Score,
  player2Score,
  // currentPlayer,
  winner,
}: ScoreBoardProps) => {
  if (isOffline === false) {
  }

  const color1 = "bg-dreamer-blue";
  const color2 = "bg-dreamer-pink";

  return (
    <div className="flex justify-between items-center  w-full text-lg">
      <div
        className={`border flex flex-col items-center justify-center ${color1} h-24 w-24 rounded-md text-center`}
      >
        <h4>{player1 ? player1 : "waiting for player"}</h4>
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
        <h4>{player2 ? player2 : "waiting for player"}</h4>
        <p>{player2Score}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
