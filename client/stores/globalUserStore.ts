import { create } from "zustand";

export interface User {
  userSocketId: any;
  username: string;
}

interface PlayerStoreState {
  player1: User | undefined;
  player2: User | undefined;
  addPlayer1: (player: User) => void;
  addPlayer2: (player: User) => void;
  removePlayer1: () => void;
  removePlayer2: () => void;
}

const useGlobalPlayerStore = create<PlayerStoreState>((set) => ({
  player1: undefined,
  player2: undefined,
  addPlayer1: (player) => set((state) => ({ player1: player })),
  addPlayer2: (player) => set((state) => ({ player2: player })),
  removePlayer1: () => set((state) => ({ player1: undefined })),
  removePlayer2: () => set((state) => ({ player2: undefined })),
}));

export default useGlobalPlayerStore;
