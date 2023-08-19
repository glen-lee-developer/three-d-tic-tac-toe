"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { socket } from "@/lib/socket";
import { joinPrivateRoomSchema } from "@/lib/validations/joinRoom";
import { Button } from "@/components/common/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";

type JoinPrivateRoomForm = z.infer<typeof joinPrivateRoomSchema>;

export default function JoinPrivateRoomButton() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<JoinPrivateRoomForm>({
    resolver: zodResolver(joinPrivateRoomSchema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });

  function onSubmit({ roomId, username }: JoinPrivateRoomForm) {
    setIsLoading(true);
    socket.emit("join-room", { roomId, username });
  }

  

  useEffect(() => {
    socket.on("room-not-found", () => {
      setIsLoading(false);
    });
  }, []);

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
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Room ID" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
        </Button>
      </form>
    </Form>
  );
}
