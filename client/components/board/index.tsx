"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Cube from "./cube";

type BoardProps = {
  cubesData: any;
  updateCubesData: (i: number) => void;
  isPlayerTurn: boolean;
};

const Board = ({ cubesData, updateCubesData, isPlayerTurn }: BoardProps) => {
  const SPACING = 3;
  // Assigning a cube to each position in the gameData programatically
  // @ts-ignore
  let cubes: JSX.Element[] = cubesData.map((_, i) => {
    //  The | 0 operation is necessary to force an integer conversion and essentially truncate the float
    //  The - SPACING is to compensate for lack of negatives and center the board
    let x = SPACING * (i % 3 | 0) - SPACING;
    let y = SPACING * ((i / 3) % 3 | 0) - SPACING;
    let z = SPACING * ((i / 9) | 0) - SPACING;

    return (
      <Cube
        key={i}
        onClick={() => {
          if (isPlayerTurn) {
            updateCubesData(i);
          }
        }}
        value={cubesData[i]}
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
