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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../common/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/ui/dialog";
import { Input } from "../common/ui/input";
import { Button } from "../common/ui/button";
import { Switch } from "../common/ui/switch";
import useGlobalPlayerStore from "@/stores/globalUserStore";
import useGlobalRoomListStore from "@/stores/globalRoomListStore";

interface CreateRoomProps {
  roomId: string;
}

type CreatRoomForm = z.infer<typeof createRoomSchema>;

export default function CreateRoom({ roomId }: CreateRoomProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { addPlayer } = useGlobalPlayerStore();
  const { addRoom } = useGlobalRoomListStore();

  const form = useForm<CreatRoomForm>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: "",
      private_room: false,
    },
  });

  function onSubmit({ username }: CreatRoomForm) {
    setIsLoading(true);
    socket.emit("host-created-room", { roomId, username });
  }

  useEffect(() => {
    socket.on("room-joined", ({ roomId, playersInRoom }: RoomJoinedData) => {
      addRoom();

      router.replace(`/${roomId}`);
    });
  }, [router, setUser, setPlayer1]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Create a Room
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90vw] max-w-[400px]">
        <DialogHeader className="pb-2">
          <DialogTitle>Create a room now!</DialogTitle>
        </DialogHeader>

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

            <FormField
              control={form.control}
              name="private_room"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Private Room</FormLabel>
                    <FormDescription>
                      Enable if you want to play with a specific person
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
