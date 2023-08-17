"use client";

import useRoomListStore, { Room } from "@/stores/roomListStore";
import { useParams } from "next/navigation";

export const OnlineGame = () => {
  const searchParams = useParams();
  const roomId = searchParams.roomId;
  const { rooms } = useRoomListStore();

  const thisRoom = rooms.find((room: Room) => room.roomId === roomId);
  console.log(thisRoom);

  let player1 = thisRoom?.player1?.username || "Awaiting player 1";
  let player2 = thisRoom?.player2?.username || "Awaiting player 2";

  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <div>{roomId}</div>
      <div>Player 1: {player1}</div>
      <div>Player 2: {player2}</div>
    </main>
  );
};

export default OnlineGame;
