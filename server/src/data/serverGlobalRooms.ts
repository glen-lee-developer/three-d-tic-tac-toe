import { User } from "@/types";

interface Room {
  roomId: string;
  isPublic: boolean;
  player1: User | undefined;
  player2?: User | undefined;
}

let serverGlobalRooms: Room[] = [];

const addRoomToServerGlobalRooms = (room: Room) => serverGlobalRooms.push(room);

const findRoomInServerGlobalRooms = (roomId: string) => {
  serverGlobalRooms = serverGlobalRooms.filter(
    (room) => room.roomId === roomId
  );
};

const showAllRoomsInServerGlobalRooms = () => serverGlobalRooms;

const removeRoomFromServerGlobalRooms = (roomId: string) => {
  serverGlobalRooms = serverGlobalRooms.filter(
    (room) => room.roomId !== roomId
  );
};

export {
  addRoomToServerGlobalRooms,
  findRoomInServerGlobalRooms,
  showAllRoomsInServerGlobalRooms,
  removeRoomFromServerGlobalRooms,
};
