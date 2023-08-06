import React from "react";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { Player } from "@/types/player";

interface Props {
  currentPlayer: any;
  winner: Player;
}

const PlayerIndicator: React.FC<Props> = ({ currentPlayer, winner }) => {
  return (
    <>
      {!winner && (
        <div
          className={`grid grid-cols-3 items-center justify-center place-items-center`}
        >
          <IoArrowBackCircle
            className={`w-8 h-8 ${
              currentPlayer === "Player1" ? "text-dreamer-blue" : "opacity-0"
            }`}
          />
          <div className="flex flex-col justify-center items-center  h-24 w-24">
            <h2 className="text-center">Current Player</h2>
            <div
              className={` ${
                currentPlayer === "Player1"
                  ? "text-dreamer-blue"
                  : "text-dreamer-pink"
              } text-2xl`}
            >
              {currentPlayer}
            </div>
          </div>
          <IoArrowForwardCircle
            className={`w-8 h-8 ${
              currentPlayer === "Player2" ? "text-dreamer-pink" : "opacity-0"
            }`}
          />
        </div>
      )}
      {winner && winner !== "DRAW" && <h2>Congratulations {winner}!</h2>}
      {winner && winner === "DRAW" && <h2>{`It's a draw!`}</h2>}
    </>
  );
};

export default PlayerIndicator;
