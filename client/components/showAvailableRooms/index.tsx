import React, { useEffect, useState } from "react";
import { Button } from "../common/ui/button";
import { Loader2 } from "lucide-react";
import { socket } from "@/lib/socket";
import useGlobalRoomListStore from "@/stores/globalRoomListStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../common/ui/dialog";
import { ScrollArea } from "../common/ui/scroll-area";
import { Separator } from "../common/ui/separator";
import JoinPublicRoomButton from "../joinPublicRoomButton";

const ShowAvailableRooms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { rooms, setRooms } = useGlobalRoomListStore();
  function showRooms() {
    setIsLoading(true);
    socket.emit("show-available-rooms");
  }

  useEffect(() => {
    socket.on("available-rooms", ({ rooms }) => {
      setRooms(rooms);
    });
  }, [setRooms]);
  console.log(rooms);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={showRooms}
          variant="outline"
          type="submit"
          className="mt-2 w-full"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Show Available Rooms"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[400px]">
        <DialogHeader className="pb-2">
          <DialogTitle>Available Rooms</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72 ">
          {rooms.map((room: any, i) => (
            <React.Fragment key={i}>
              <div className="flex justify-center items-center gap-2">
                {room.roomId}
                <JoinPublicRoomButton roomId={room.roomId} />
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ShowAvailableRooms;
