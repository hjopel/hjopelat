import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Soda(props) {
  const ref = useRef();
  const [hovered, spread] = useHover();
  const { nodes, materials } = useGLTF(
    "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/soda-bottle/model.gltf"
  );
  useFrame((state, delta) => (ref.current.rotation.y += delta));
  return (
    <group ref={ref} {...props} {...spread} dispose={null}>
      <mesh geometry={nodes.Mesh_sodaBottle.geometry}>
        <meshStandardMaterial
          color={hovered ? "red" : "green"}
          roughness={0}
          metalness={0.8}
          envMapIntensity={2}
        />
      </mesh>
      <mesh
        geometry={nodes.Mesh_sodaBottle_1.geometry}
        material={materials.red}
        material-envMapIntensity={0}
      />
    </group>
  );
}
function useHover() {
  const [hovered, hover] = useState(false);
  return [
    hovered,
    {
      onPointerOver: (e) => (e.stopPropagation(), hover(true)),
      onPointerOut: () => hover(false),
    },
  ];
}
