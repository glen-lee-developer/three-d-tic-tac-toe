// @ts-nocheck
import { create } from "zustand";

export type OnlineGameData = {
  cubesData: Player[];
  numberOfTurns: number;
  currentPlayer: string;
  player1: string;
  player2: string;
  player2Score: number;
  player1Score: number;
  winner: string;
  setCubesData: (cubesData: Array<undefined | string>) => void;
  setNumberOfTurns: (numberOfTurns: number) => void;
  setCurrentPlayer: (currentPlayer: string) => void;
  setPlayer1: (player1: string) => void;
  setPlayer2: (player2: string) => void;
  setplayer2Score: (player2Score: number) => void;
  setplayer1Score: (player1Score: number) => void;
  setWinner: (winner: string | undefined) => void;
};

export const useOnlineGameData = create<OnlineGameData>((set) => ({
  cubesData: Array(27).fill(undefined),
  numberOfTurns: 0,
  currentPlayer: undefined,
  player1: undefined,
  player2: undefined,
  player2Score: 0,
  player1Score: 0,
  winner: undefined,
  setCubesData: (cubesData) => set({ cubesData }),
  setNumberOfTurns: (numberOfTurns) => set({ numberOfTurns }),
  setCurrentPlayer: (currentPlayer) => set({ currentPlayer }),
  setPlayer1: (player1: string) => set({ player1 }),
  setPlayer2: (player2: string) => set({ player2 }),
  setplayer2Score: (player2Score) => set({ player2Score }),
  setplayer1Score: (player1Score) => set({ player1Score }),
  setWinner: (winner) => set({ winner }),
}));
