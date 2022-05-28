import "./App.css";
import { Box, Heading, Flex, useColorModeValue } from "@chakra-ui/react";
import useRefs from "react-use-refs";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import {
  View,
  Environment,
  TransformControls,
  Preload,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Soda } from "./components/Models";
import Header from "./components/Header";
import ShaderObject from "./components/idk";
import * as THREE from "three";
function App() {
  const [ref, view1, view2, view3, view4, view5] = useRefs();

  return (
    <>
      <Box
        ref={ref}
        className="container"
        bgColor={useColorModeValue("light.bg", "dark.bg")}
      >
        <Box w="100%" h="100%" p={8}>
          <Header />
          <Flex w="100%" h="100%" ref={view1} id={"view1"} />
          {/* <Flex w="100%" h="100vh" bgColor="blue">
            <Heading>hii</Heading>
          </Flex> */}
          <Canvas
            onCreated={(state) => state.events.connect(ref.current)}
            className="canvas"
          >
            <Suspense fallback={null}>
              <View track={view1}>
                <Scene />
                {/* <TransformControls>
                  <Soda scale={6} position={[0, -1.6, 0]} />
                </TransformControls> */}
                <ShaderObject />
                <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
                <OrbitControls makeDefault />
              </View>

              <Preload all />
            </Suspense>
          </Canvas>
        </Box>
      </Box>
    </>
  );
}
function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="dawn" />
    </>
  );
}
export default App;
