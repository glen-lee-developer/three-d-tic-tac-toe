"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { nanoid } from "nanoid";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

type Props = {};

const HomePage = (props: Props) => {
  const roomId = nanoid();

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

        <CardContent className="flex flex-col space-y-4">
          {/* <CreateRoomForm roomId={roomId} /> */}

          <div className="flex items-center space-x-2 ">
            <Separator />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator />
          </div>

          {/* <JoinRoomButtoon /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
