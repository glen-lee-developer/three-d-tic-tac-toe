// @ts-nocheck
import ChooseRandomPlayer from "@/lib/chooseRandomPlayer";
import { create } from "zustand";

export type Player = "X" | "O" | "DRAW" | undefined;

export type GameData = {
  cubesData: Player[];
  numberOfTurns: number;
  currentPlayer: "X" | "O";
  oScore: number;
  xScore: number;
  winner: Player;
  setCubesData: (cubesData: Array<undefined | string>) => void;
  setNumberOfTurns: (numberOfTurns: number) => void;
  setCurrentPlayer: (currentPlayer: string) => void;
  setOScore: (oScore: number) => void;
  setXScore: (xScore: number) => void;
  setWinner: (winner: string | undefined) => void;
  reset: () => void;
};

export const useGameData = create<GameData>((set) => ({
  cubesData: Array(27).fill(undefined),
  numberOfTurns: 0,
  currentPlayer: ChooseRandomPlayer(),
  oScore: 0,
  xScore: 0,
  winner: undefined,
  setCubesData: (cubesData) => set({ cubesData }),
  setNumberOfTurns: (numberOfTurns) => set({ numberOfTurns }),
  setCurrentPlayer: (currentPlayer) => set({ currentPlayer }),
  setOScore: (oScore) => set({ oScore }),
  setXScore: (xScore) => set({ xScore }),
  setWinner: (winner) => set({ winner }),
  reset: () =>
    set((state) => ({
      ...state,
      cubesData: Array(27).fill(undefined),
      numberOfTurns: 0,
      currentPlayer: ChooseRandomPlayer(),
      oScore: 0,
      xScore: 0,
      winner: undefined,
    })),
}));
