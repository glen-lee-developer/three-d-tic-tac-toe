"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { socket } from "@/lib/socket";
import { createRoomSchema } from "@/lib/validations/createRoom";

import type { RoomJoinedData } from "@/types/roomJoinedData";
import { useUserStore } from "@/stores/userStore";
import { usePlayersStore } from "@/stores/playersStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../common/ui/form";
import { Input } from "../common/ui/input";
import { Button } from "../common/ui/button";

interface CreateRoomFormProps {
  roomId: string;
}

type CreatRoomForm = z.infer<typeof createRoomSchema>;

export default function CreateRoomForm({ roomId }: CreateRoomFormProps) {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const setPlayer1 = usePlayersStore((state) => state.setPlayer1);
  const setPlayer2 = usePlayersStore((state) => state.setPlayer2);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreatRoomForm>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit({ username }: CreatRoomForm) {
    setIsLoading(true);
    socket.emit("host-created-room", { roomId, username });
  }

  useEffect(() => {
    //  Once room has been joined it sets the user and players
    socket.on("room-joined", ({ user, roomId, players }: RoomJoinedData) => {
      //  Add user to list of total users
      setUser(user);
      //  Set player to game players
      setPlayer1(players[0]);
      //  Redirect to room
      router.replace(`/${roomId}`);
    });

    return () => {
      socket.off("room-joined");
      socket.off("room-not-found");
    };
  }, [router, setUser, setPlayer1]);

  //  Supress hydration bug
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div>
          <p className="mb-2 text-sm font-medium">Room ID</p>

          <div className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
            <span>{roomId}</span>
            {/* <CopyButton value={roomId} /> */}
          </div>
        </div>

        <Button
          type="submit"
          className="mt-2 w-full"
          aria-controls="radix-:R1mcq:"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create a Room"
          )}
        </Button>
      </form>
    </Form>
  );
}
