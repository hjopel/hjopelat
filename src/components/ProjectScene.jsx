import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import getUuid from "uuid-by-string";

const GOLDENRATIO = 1.61803398875;
const pexel = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
const images = [
  // Front
  { position: [0, 0, 1.3], rotation: [0, 0, 0], url: "/ss.png" },
  // Left
  {
    position: [-1.3, 0, 1.7],
    rotation: [0, Math.PI / 6, 0],
    url: "/lp_hgoe.png",
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, Math.PI / 2.5, 0],
    url: "/lp_admissio.png",
  },
  // Right

  {
    position: [1.3, 0, 1.7],
    rotation: [0, -Math.PI / 6, 0],
    url: "/naturjuwelgaas.png",
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "/florist.png",
  },
];
export default function App() {
  // const setImgs = useStore((state) => state.setImgs);
  const imgs = [
    {
      src: "/ss.png",
      category: "website",
      txtr: new THREE.TextureLoader().load("/ss.png"),
      id: "hjopel",
      title: "hjopel.at",
      tags: ["react", "webgl", "three.js"],
      ref: useRef(),
      width: 1920,
      height: 1080,
    },
    {
      src: "/florist.png",
      category: "mockup",
      id: "florist",
      txtr: new THREE.TextureLoader().load("/florist.png"),

      title: "florist",
      tags: ["react", "webgl", "three.js", "prototype"],
      ref: useRef(),
      width: 1920,
      height: 1080,
    },
    {
      src: "/naturjuwelgaas.png",
      category: "website",
      txtr: new THREE.TextureLoader().load("/naturjuwelgaas.png"),

      id: "naturjuwel",
      title: "naturjuwel",
      tags: ["wordpress", "smoobu"],
      ref: useRef(),
      width: 1920,
      height: 1080,
    },
    {
      src: "/lp_admissio.png",
      category: "application",
      txtr: new THREE.TextureLoader().load("/lp_admissio.png"),

      id: "admissio",
      title: "admissio",
      tags: ["angular", "node.js", "fullstack"],
      ref: useRef(),
      width: 2021,
      height: 2475,
    },
    {
      src: "/lp_hgoe.png",
      category: "application",
      txtr: new THREE.TextureLoader().load("/lp_hgoe.png"),

      id: "hgoe",
      title: "hgoe-burgenland",
      tags: ["angular", "wp", "node.js", "fullstack"],
      ref: useRef(),
      width: 1287,
      height: 2012,
    },
  ];
  // setImgs(imgs);
  return (
    // <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    <>
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", 0, 15]} />
      <Environment preset="city" />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#101010"
            metalness={0.5}
          />
        </mesh>
      </group>
    </>

    // </Canvas>
  );
}

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    state.camera.position.lerp(p, 0.025);
    state.camera.quaternion.slerp(q, 0.025);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object ? "/" : "/item/" + e.object.name
        )
      )}
      onPointerMissed={() => setLocation("/")}
    >
      {images.map(
        (props) => <Frame key={props.url} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const image = useRef();
  const frame = useRef();
  const name = getUuid(url);
  useCursor(hovered);
  useFrame((state) => {
    image.current.material.zoom =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    image.current.scale.x = THREE.MathUtils.lerp(
      image.current.scale.x,
      0.85 * (hovered ? 0.85 : 1),
      0.1
    );
    image.current.scale.y = THREE.MathUtils.lerp(
      image.current.scale.y,
      0.9 * (hovered ? 0.905 : 1),
      0.1
    );
    frame.current.material.color.lerp(
      c.set(hovered ? "#3987c9" : "white"),
      0.1
    );
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.025}
        color="black"
      >
        {name.split("-").join(" ")}
      </Text>
    </group>
  );
}
