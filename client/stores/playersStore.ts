import { create } from "zustand";
import { User } from "./userStore";

interface UserState {
  player1: User;
  player2: User;
  setPlayer1: (player1: User) => void;
  setPlayer2: (player2: User) => void;
}

export const usePlayersStore = create<UserState>((set) => ({
  player1: { id: "", username: "" },
  player2: { id: "", username: "" },
  setPlayer1: (player1) => set({ player1 }),
  setPlayer2: (player2) => set({ player2 }),
}));
