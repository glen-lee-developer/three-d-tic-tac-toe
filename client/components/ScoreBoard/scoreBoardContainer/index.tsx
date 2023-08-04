"use client";

import React, { useEffect } from "react";
import PlayerIndicator from "../playerIndicator";
import { Player } from "@/types/player";
import { usePlayersStore } from "@/stores/playersStore";
import { socket } from "@/lib/socket";

interface ScoreBoardProps {
  xScore: number;
  oScore: number;
  currentPlayer: Player;
  winner: Player;
}

const ScoreBoard = ({
  xScore,
  oScore,
  currentPlayer,
  winner,
}: ScoreBoardProps) => {
  const [players, setPlayers] = usePlayersStore((state) => [
    state.players,
    state.setPlayers,
  ]);

  let player1 = players[0]?.username || null;
  let player2 = players[1]?.username || null;

  useEffect(() => {
    socket.on("update-players", (players) => {
      setPlayers(players);
    });

    return () => {
      socket.off("update-members");
    };
  }, [setPlayers]);

  const color1 = "bg-dreamer-blue";
  const color2 = "bg-dreamer-pink";

  return (
    <div className="flex justify-between items-center  w-full text-lg">
      <div
        className={`border flex flex-col items-center justify-center ${color1} h-24 w-24 rounded-md text-center`}
      >
        <h4>{player1 ? player1 : "waiting for player"}</h4>
        <p>{xScore}</p>
      </div>
      <PlayerIndicator currentPlayer={currentPlayer} winner={winner} />
      <div
        className={`border flex flex-col items-center justify-center ${color2} h-24 w-24 rounded-md text-center`}
      >
        <h4>{player2 ? player2 : "waiting for player"}</h4>
        <p>{oScore}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
