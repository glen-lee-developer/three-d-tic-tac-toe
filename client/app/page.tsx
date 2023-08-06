"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { nanoid } from "nanoid";
import React from "react";
import CreateRoomForm from "@/components/createRoomForm";
import JoinRoomButton from "@/components/joinRoomButton";
import CreateRoom from "@/components/createRoom";
import ShowAvailableRooms from "@/components/showAvailableRooms";
import PlayOffline from "@/components/playOffline";

export const dynamic = "force-dynamic";

const HomePage = () => {
  // const roomId = nanoid();
  const roomId = "room" + Math.floor(Math.random() * 100);
  return (
    <div className="flex h-screen flex-col items-center justify-between pb-5 pt-[13vh]">
      <Card className="w-[90vw] max-w-[400px]">
        <CardHeader>
          <CardTitle>Three D Tic Tac Toe</CardTitle>
          <CardDescription>
            Take turns to get as many lines of 3 as you can. Most points at the
            end wins!
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col space-y-4 items-center">
          {/* <CreateRoomForm roomId={roomId} /> */}
          <CreateRoom roomId={roomId} />

          <JoinRoomButton />
          <ShowAvailableRooms />
          <div className="flex items-center space-x-2 ">
            <span className="text-xs text-muted-foreground">OR</span>
          </div>
          <PlayOffline />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
