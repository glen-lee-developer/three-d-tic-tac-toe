import { User } from "@/types";

interface Room {
  roomId: any;
  isPublic: boolean;
  player1: User | undefined;
  player2?: User | undefined;
}

let serverGlobalRooms: Room[] = [];

const addRoomToServerGlobalRooms = (room: Room) => serverGlobalRooms.push(room);

const findRoomInServerGlobalRooms = (roomId: string): Room | undefined => {
  return serverGlobalRooms.find((room) => room.roomId === roomId);
};

const showAllRoomsInServerGlobalRooms = () => serverGlobalRooms;

const removeRoomFromServerGlobalRooms = (roomId: string) => {
  serverGlobalRooms = serverGlobalRooms.filter(
    (room) => room.roomId !== roomId
  );
};

//  Gets all players in a specfic room and returns their socketId and username
const getPlayersInRoomFromServerGlobalRooms = (
  roomId: string
): User[] | undefined => {
  const room = serverGlobalRooms.find((room) => room.roomId === roomId);

  if (room) {
    const players: User[] = [];

    if (room.player1) {
      players.push(room.player1);
    }
    if (room.player2) {
      players.push(room.player2);
    }

    return players;
  }

  return undefined;
};

const updatePlayersInAServerGlobalRoom = (roomId: string, user: User) => {
  const roomIndex = serverGlobalRooms.findIndex(
    (room) => room.roomId === roomId
  );

  if (roomIndex !== -1) {
    if (!serverGlobalRooms[roomIndex].player1) {
      serverGlobalRooms[roomIndex].player1 = user;
    } else if (!serverGlobalRooms[roomIndex].player2) {
      serverGlobalRooms[roomIndex].player2 = user;
    }
  }
};

export {
  addRoomToServerGlobalRooms,
  findRoomInServerGlobalRooms,
  showAllRoomsInServerGlobalRooms,
  removeRoomFromServerGlobalRooms,
  getPlayersInRoomFromServerGlobalRooms,
  updatePlayersInAServerGlobalRoom,
};
