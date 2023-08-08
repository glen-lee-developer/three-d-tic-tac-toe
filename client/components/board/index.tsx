"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Cube from "./cube";
import { useOfflineGameData } from "@/stores/offlineBoardStore";

type BoardProps = {
  updateCubesData: (i: number) => void;
};

const Board = ({ updateCubesData }: BoardProps) => {
  const SPACING = 3;
  const { cubesData } = useOfflineGameData();

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
        onClick={() => updateCubesData(i)}
        position={[x, y, z]}
        cubeOwner={cubesData[i]}
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
