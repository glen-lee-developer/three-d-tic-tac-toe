function ChooseRandomPlayer(): "X" | "O" {
  return Math.round(Math.random() * 1) === 1 ? "X" : "O";
}

export default ChooseRandomPlayer;
