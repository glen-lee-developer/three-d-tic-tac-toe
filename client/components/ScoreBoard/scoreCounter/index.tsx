import React from "react";

interface Props {
  color: string;
  scoreValue: number;
  team: string;
}

const ScoreCounter: React.FC<Props> = ({ color, scoreValue, team }) => {
  return (
    <div
      className={`border flex flex-col items-center justify-center ${color} h-24 w-24 rounded-md text-center`}
    >
      <h4>Player {team}</h4>
      <p>{scoreValue}</p>
    </div>
  );
};

export default ScoreCounter;
