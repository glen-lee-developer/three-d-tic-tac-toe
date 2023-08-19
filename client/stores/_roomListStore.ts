import { create } from "zustand";

export interface User {
  userSocketId: string;
  username: string;
  color?: string | undefined;
}

export interface Room {
  roomId: string;
  isPrivateRoom: boolean;
  player1: string;
  player2: string;
}

interface RoomListStoreState {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
}

const useRoomListStore = create<RoomListStoreState>((set) => ({
  rooms: [],
  setRooms: (updatedRooms) => set({ rooms: updatedRooms }),
}));

export default useRoomListStore;
