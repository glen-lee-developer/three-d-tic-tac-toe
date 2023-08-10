import React, { useEffect, useState } from "react";
import { Button } from "../common/ui/button";
import { Loader2 } from "lucide-react";
import { socket } from "@/lib/socket";
import useGlobalRoomListStore from "@/stores/globalRoomListStore";

type Props = {};

const ShowAvailableRooms = (props: Props) => {
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
  );
};

export default ShowAvailableRooms;
