import { create } from "zustand";

export interface User {
  userSocketId: string;
  username: string;
}

interface PlayerStoreState {
  players: User[];
  addPlayer: (player: User) => void;
  updatePlayer: (playerId: string, updatedData: Partial<User>) => void;
  removePlayer: (playerId: string) => void;
}

const useGlobalPlayerStore = create<PlayerStoreState>((set) => ({
  players: [],

  addPlayer: (player) =>
    set((state) => ({ players: [...state.players, player] })),
  updatePlayer: (playerId, updatedData) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.userSocketId === playerId ? { ...p, ...updatedData } : p
      ),
    })),
  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.userSocketId !== playerId),
    })),
}));

export default useGlobalPlayerStore;
