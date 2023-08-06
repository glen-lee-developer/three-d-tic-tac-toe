// @ts-nocheck
import ChooseRandomPlayer from "@/lib/chooseRandomPlayer";
import { create } from "zustand";

export type Player = "Player1" | "Player2" | "DRAW" | undefined;

export type GameData = {
  cubesData: Player[];
  numberOfTurns: number;
  currentPlayer: string;
  player2Score: number;
  player1Score: number;
  winner: Player;
  setCubesData: (cubesData: Array<undefined | string>) => void;
  setNumberOfTurns: (numberOfTurns: number) => void;
  setCurrentPlayer: (currentPlayer: string) => void;
  setplayer2Score: (player2Score: number) => void;
  setplayer1Score: (player1Score: number) => void;
  setWinner: (winner: string | undefined) => void;
  reset: () => void;
};

export const useGameData = create<GameData>((set) => ({
  cubesData: Array(27).fill(undefined),
  numberOfTurns: 0,
  currentPlayer: undefined,
  player2Score: 0,
  player1Score: 0,
  winner: undefined,
  setCubesData: (cubesData) => set({ cubesData }),
  setNumberOfTurns: (numberOfTurns) => set({ numberOfTurns }),
  setCurrentPlayer: (currentPlayer) => set({ currentPlayer }),
  setplayer2Score: (player2Score) => set({ player2Score }),
  setplayer1Score: (player1Score) => set({ player1Score }),
  setWinner: (winner) => set({ winner }),
  reset: () =>
    set((state) => ({
      ...state,
      cubesData: Array(27).fill(undefined),
      numberOfTurns: 0,
      currentPlayer: ChooseRandomPlayer(),
      player2Score: 0,
      player1Score: 0,
      winner: undefined,
    })),
}));
