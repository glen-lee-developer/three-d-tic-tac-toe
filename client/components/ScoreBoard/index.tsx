"use client";
import { useOfflineGameData } from "@/stores/offlineBoardStore";

const ScoreBoard = () => {
  const {
    player1,
    player2,
    player1Score,
    player2Score,
    currentPlayer,
    winner,
  } = useOfflineGameData();

  const color1 = "pink-500";
  const color2 = "blue-500";

  return (
    <div className="flex justify-between items-center  w-full text-lg">
      <div
        className={`border flex flex-col items-center justify-center bg-${color1} h-24 w-24 rounded-md text-center`}
      >
        <h4>{player1 ? player1 : "waiting for player"}</h4>
        <p>{player1Score}</p>
      </div>
      <div className="flex flex-col justify-center items-center text-center h-24 w-24">
        {winner ? (
          <div>End of Game</div>
        ) : (
          <div>
            <h2>Current Player</h2>
            <div>{currentPlayer}</div>
          </div>
        )}
        {winner && player1Score > player2Score && (
          <h2>Congratulations {player1}!</h2>
        )}
        {winner && player2Score > player1Score && (
          <h2>Congratulations {player2}!</h2>
        )}
        {winner && player2Score === player1Score && <h2>{`It's a draw!`}</h2>}
      </div>
      <div
        className={`border flex flex-col items-center justify-center  bg-${color2} h-24 w-24 rounded-md text-center`}
      >
        <h4>{player2 ? player2 : "waiting for player"}</h4>
        <p>{player2Score}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
