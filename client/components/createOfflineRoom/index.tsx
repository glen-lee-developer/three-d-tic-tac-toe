"use-client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../common/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { createOfflineRoomSchema } from "@/lib/validations/createOfflineRoom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
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

interface CreateRoomFormProps {
  roomId: string;
}

type CreatOfflineRoomForm = z.infer<typeof createOfflineRoomSchema>;

const CreateOfflineRoom = ({ roomId }: CreateRoomFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreatOfflineRoomForm>({
    resolver: zodResolver(createOfflineRoomSchema),
    defaultValues: {
      player_1_username: "",
      player_2_username: "",
    },
  });

  function onSubmit({
    player_1_username,
    player_2_username,
  }: CreatOfflineRoomForm) {
    setIsLoading(true);
    router.push(
      `/offline/?player1=${player_1_username}&player2=${player_2_username}`
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Play Offline
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90vw] max-w-[400px]">
        <DialogHeader className="pb-2">
          <DialogTitle>Create an offline room now!</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="player_1_username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Player 1 Username
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="player_2_username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Player 2 Username
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create Offline Room"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfflineRoom;
