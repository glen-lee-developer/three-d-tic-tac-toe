"use client";

import React, { useRef, useState } from "react";
import { Group } from "three";

type CubeProps = {
  position?: [x: number, y: number, z: number] | undefined;
};

const Cube = ({ position }: CubeProps) => {
  const meshRef = useRef<Group>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <group
      position={position}
      ref={meshRef}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    </group>
  );
};

export default Cube;
