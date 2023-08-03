"use client";

import { useEffect } from "react";

import { usePlayersStore } from "@/stores/playersStore";
import { socket } from "@/lib/socket";

export default function PlayersList() {
  const [players, setPlayers] = usePlayersStore((state) => [
    state.players,
    state.setPlayers,
  ]);

  useEffect(() => {
    socket.on("update-players", (players) => {
      setPlayers(players);
    });

    return () => {
      socket.off("update-players");
    };
  }, [setPlayers]);

  return (
    <div className="my-6 select-none">
      <h2 className="pb-2.5 font-medium">Players</h2>
    </div>
  );
}
