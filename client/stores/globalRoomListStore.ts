import { create } from "zustand";

export interface User {
  userSocketId: string;
  username: string;
  color?: string | undefined;
}

interface Room {
  roomId: string;
  isPublic: boolean;
  isFull: boolean;
  player1: User | null;
  player2: User | null;
}

interface GlobalRoomListStoreState {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
}

const useGlobalRoomListStore = create<GlobalRoomListStoreState>((set) => ({
  rooms: [],
  setRooms: (updatedRooms) => set({ rooms: updatedRooms }),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),

  // Effect to remove room from list when it's empty or adjust isFull
  onCleanup: (roomId: string) => {
    set((state) => {
      const roomIndex = state.rooms.findIndex((room) => room.roomId === roomId);
      if (roomIndex !== -1) {
        const room = state.rooms[roomIndex];

        if (!room.player1 && !room.player2) {
          state.rooms.splice(roomIndex, 1);
        } else {
          // Adjust isFull based on player count
          room.isFull = !!room.player1 && !!room.player2;
        }
      }
      return state;
    });
  },
}));

export default useGlobalRoomListStore;
