type ChooseRandomPlayerProps = {
  player1: string | undefined;
  player2: string | undefined;
};

function ChooseRandomPlayer({ player1, player2 }: ChooseRandomPlayerProps) {
  if (!player1) return;
  if (!player2) return;
  return Math.round(Math.random() * 1) === 1 ? player1 : player2;
}

export default ChooseRandomPlayer;
