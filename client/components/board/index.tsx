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
    cubesData: Array(9).fill(undefined), //Create an empty array of length 27
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
  // Assigning a cube to each position in the gameData
  let cubes: JSX.Element[] = gameData.cubesData.map((_, i): JSX.Element => {
    let x = 0;
    let y = 0;
    let z = 0;

    // 6,7,8
    // 3,4,5
    // 0,1,2

    // if (i % 3 === 0) {
    //   x = (i / 3) * SPACING;
    // }
    if (i % 3 === 0) {
      y = i * SPACING;
      x = i + SPACING;
    }

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

// {/* Top section */}
// <Cube position={[-SPACING, SPACING, 0]} />
// <Cube position={[0, SPACING, 0]} />
// <Cube position={[SPACING, SPACING, 0]} />
// <Cube position={[-SPACING, SPACING, -SPACING]} />
// <Cube position={[0, SPACING, -SPACING]} />
// <Cube position={[SPACING, SPACING, -SPACING]} />
// <Cube position={[-SPACING, SPACING, SPACING]} />
// <Cube position={[0, SPACING, SPACING]} />
// <Cube position={[SPACING, SPACING, SPACING]} />

// {/* Middle section */}
// <Cube position={[-SPACING, 0, 0]} />
// <Cube position={[0, 0, 0]} />
// <Cube position={[SPACING, 0, 0]} />
// <Cube position={[-SPACING, 0, -SPACING]} />
// <Cube position={[0, 0, -SPACING]} />
// <Cube position={[SPACING, 0, -SPACING]} />
// <Cube position={[-SPACING, 0, SPACING]} />
// <Cube position={[0, 0, SPACING]} />
// <Cube position={[SPACING, 0, SPACING]} />

// {/* Bottom section */}
// <Cube position={[-SPACING, -SPACING, 0]} />
// <Cube position={[0, -SPACING, 0]} />
// <Cube position={[SPACING, -SPACING, 0]} />
// <Cube position={[-SPACING, -SPACING, -SPACING]} />
// <Cube position={[0, -SPACING, -SPACING]} />
// <Cube position={[SPACING, -SPACING, -SPACING]} />
// <Cube position={[-SPACING, -SPACING, SPACING]} />
// <Cube position={[0, -SPACING, SPACING]} />
// <Cube position={[SPACING, -SPACING, SPACING]} />
