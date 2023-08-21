"use client";


import { useOnlineGameData } from "@/stores/onlineBoardStore";
import { Player } from "@/types/player";
import React, { useRef, useState } from "react";
import { Group } from "three";

type CubeProps = {
  position?: [x: number, y: number, z: number] | undefined;
  onClick?: () => void;
  cubeOwner?: Player;
};

const OnlineCube = ({ position, onClick, cubeOwner }: CubeProps) => {
  const meshRef = useRef<Group>(null);
  const [hovered, setHover] = useState(false);
  const { player1, player2, currentPlayer } = useOnlineGameData();


  let color;

  if (cubeOwner === player1) {
    color = "hotpink";
  } else if (cubeOwner === player2) {
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
      scale={cubeOwner ? 1 : hovered ? 1.5 : 1}
      onClick={!cubeOwner ? onClick : undefined}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default OnlineCube;
