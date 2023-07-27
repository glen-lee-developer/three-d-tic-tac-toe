"use client";

import { Player } from "@/types/player";
import React, { useRef, useState } from "react";
import { Group } from "three";

type CubeProps = {
  position?: [x: number, y: number, z: number] | undefined;
  onClick?: () => void;
  value: Player;
};

const Cube = ({ position, onClick, value }: CubeProps) => {
  const meshRef = useRef<Group>(null);
  const [hovered, setHover] = useState(false);

  let color;

  if (value === "X") {
    color = "hotpink";
  } else if (value === "O") {
    color = "blue";
  } else {
    color = "orange";
  }

  return (
    <group
      position={position}
      ref={meshRef}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      scale={value ? 1 : hovered ? 1.5 : 1}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default Cube;
