function ChooseRandomPlayer(): "Player1" | "Player2" {
  return Math.round(Math.random() * 1) === 1 ? "Player1" : "Player2";
}

export default ChooseRandomPlayer;
