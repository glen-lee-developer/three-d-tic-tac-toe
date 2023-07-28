"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Cube from "./cube";
import { GameData } from "@/types/gameData";
import ChooseRandomPlayer from "@/lib/chooseRandomPlayer";

const Board = () => {
  // Setting inital data
  const [gameData, setGameData] = useState<GameData>({
    cubesData: Array(27).fill(undefined), //Create an empty array of length 27
    numberOfTurns: 0,
    currentPlayer: ChooseRandomPlayer(),
    scores: {
      oScore: 0,
      xScore: 0,
    },
    winner: undefined,
    vertical: false,
  });

  const SPACING = 3;
  // Assigning a cube to each position in the gameData programatically
  let cubes: JSX.Element[] = gameData.cubesData.map((_, i) => {
    //  The | 0 operation is necessary to force an integer conversion and essentially truncate the float.
    //  The - SPACING is to compensate for lack of negatives and center the board
    let x = SPACING * (i % 3 | 0) - SPACING;
    let y = SPACING * ((i / 3) % 3 | 0) - SPACING;
    let z = SPACING * ((i / 9) | 0) - SPACING;

    return (
      <Cube
        key={i}
        // onClick={() => updateSquareData(i)}
        value={gameData.cubesData[i]}
        position={[x, y, z]}
      />
    );
  });

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group>{cubes}</group>
    </Canvas>
  );
};

export default Board;
