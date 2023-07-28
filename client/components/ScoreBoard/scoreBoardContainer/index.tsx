import React from "react";
import ScoreCounter from "../scoreCounter";
import PlayerIndicator from "../playerIndicator";
import { Player } from "@/types/player";

interface Props {
  xScore: number;
  oScore: number;
  currentPlayer: Player;
  winner: Player;
}

const ScoreBoard: React.FC<Props> = ({
  xScore,
  oScore,
  currentPlayer,
  winner,
}) => {
  return (
    <div className="flex justify-between items-center  w-full text-lg">
      <ScoreCounter color="bg-dreamer-blue" team="X" scoreValue={xScore} />
      <PlayerIndicator currentPlayer={currentPlayer} winner={winner} />
      <ScoreCounter color="bg-dreamer-pink" team="O" scoreValue={oScore} />
    </div>
  );
};

export default ScoreBoard;
