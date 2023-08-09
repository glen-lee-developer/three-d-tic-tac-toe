export interface User {
  id: string;
  username: string;
}

interface Room {
  roomId: string;
  isPublic: boolean;
}

let serverGlobalRooms: Room[] = [];

const addRoomToServerGlobalRooms = (room: Room) => serverGlobalRooms.push(room);

const findRoomInServerGlobalRooms = (roomId: string) => {
  serverGlobalRooms = serverGlobalRooms.filter(
    (room) => room.roomId === roomId
  );
};

const removeRoomFromServerGlobalRooms = (roomId: string) => {
  serverGlobalRooms = serverGlobalRooms.filter(
    (room) => room.roomId !== roomId
  );
};
