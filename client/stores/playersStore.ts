import { create } from "zustand";
import { User } from "./userStore";

interface UserState {
  players: User[];
  setPlayers: (players: User[]) => void;
}

export const usePlayersStore = create<UserState>((set) => ({
  players: [],
  setPlayers: (players) => set({ players }),
}));
