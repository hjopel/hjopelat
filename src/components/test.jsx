import { useAspect } from "@react-three/drei";

const Test = () => {
  const scale = useAspect(100, 100, 1);

  return (
    <mesh scale={scale}>
      <boxBufferGeometry /> <meshNormalMaterial />
    </mesh>
  );
};

export default Test;
