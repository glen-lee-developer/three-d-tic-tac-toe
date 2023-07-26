"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Cube from "./cube";

type Props = {};

const Board = (props: Props) => {
  const SPACING = 3;

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group>
        {/* Top section */}
        <Cube position={[-SPACING, SPACING, 0]} />
        <Cube position={[0, SPACING, 0]} />
        <Cube position={[SPACING, SPACING, 0]} />
        <Cube position={[-SPACING, SPACING, -SPACING]} />
        <Cube position={[0, SPACING, -SPACING]} />
        <Cube position={[SPACING, SPACING, -SPACING]} />
        <Cube position={[-SPACING, SPACING, SPACING]} />
        <Cube position={[0, SPACING, SPACING]} />
        <Cube position={[SPACING, SPACING, SPACING]} />

        {/* Middle section */}
        <Cube position={[-SPACING, 0, 0]} />
        <Cube position={[0, 0, 0]} />
        <Cube position={[SPACING, 0, 0]} />
        <Cube position={[-SPACING, 0, -SPACING]} />
        <Cube position={[0, 0, -SPACING]} />
        <Cube position={[SPACING, 0, -SPACING]} />
        <Cube position={[-SPACING, 0, SPACING]} />
        <Cube position={[0, 0, SPACING]} />
        <Cube position={[SPACING, 0, SPACING]} />

        {/* Bottom section */}
        <Cube position={[-SPACING, -SPACING, 0]} />
        <Cube position={[0, -SPACING, 0]} />
        <Cube position={[SPACING, -SPACING, 0]} />
        <Cube position={[-SPACING, -SPACING, -SPACING]} />
        <Cube position={[0, -SPACING, -SPACING]} />
        <Cube position={[SPACING, -SPACING, -SPACING]} />
        <Cube position={[-SPACING, -SPACING, SPACING]} />
        <Cube position={[0, -SPACING, SPACING]} />
        <Cube position={[SPACING, -SPACING, SPACING]} />
      </group>
    </Canvas>
  );
};

export default Board;
