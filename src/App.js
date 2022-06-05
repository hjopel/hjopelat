import "./App.css";
import { Box, useColorModeValue, Flex, Text } from "@chakra-ui/react";
import useRefs from "react-use-refs";
import { Canvas } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Preload,
  Image as Image3,
  OrbitControls,
  useAspect,
} from "@react-three/drei";
import Header from "./components/Header";
import Projects from "./components/Projects";
import ProjectScene from "./components/ProjectScene";
import gsap from "gsap";
import useStore from "./components/customHooks/useStore";
import Hero from "./components/Hero";
import Page from "./components/page";
import Scene from "./components/idk";
import CTASection from "./components/CTASection";
import { useRoute } from "wouter";
import * as THREE from "three";
import * as Test from "./components/test";
function App() {
  const [ref, view1, projectView, view3, view4, view5] = useRefs();
  useEffect(() => {
    gsap.timeline().to(".lateReveal", {
      clipPath: "polygon(0 1%, 100% 0%, 100% 100%, 0% 100%)",
      stagger: 0.3,
      duration: 2,
    });
  });

  const activeRef = useStore((state) => state.activeRef);

  const [matchesLandingPage] = useRoute("/");

  const setImgs = useStore((state) => state.setImgs);
  const imgs = [
    {
      src: "/ss.png",
      category: "website",
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

      title: "florist",
      tags: ["react", "webgl", "three.js", "prototype"],
      ref: useRef(),
      width: 1920,
      height: 1080,
    },
    {
      src: "/naturjuwelgaas.png",
      category: "website",
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
      id: "hgoe",
      title: "hgoe-burgenland",
      tags: ["angular", "wp", "node.js", "fullstack"],
      ref: useRef(),
      width: 1287,
      height: 2012,
    },
  ];
  setImgs(imgs);

  const renderImageViews = useCallback(() => {
    return imgs.map((img) => (
      <View key={img.id} track={img.ref}>
        <mesh>
          <boxBufferGeometry />
          <meshNormalMaterial />
        </mesh>
      </View>
    ));
  }, [imgs]);
  return (
    <>
      <Box
        w="100%"
        position={"absolute"}
        top={0}
        left={0}
        zIndex={1000}
        px={20}
        py={10}
      >
        <Header />
      </Box>
      <Box
        ref={ref}
        className="container"
        bgColor={useColorModeValue("light.bg", "dark.bg")}
      >
        <Box w="100%" h="100%">
          {matchesLandingPage && (
            <>
              <Hero view={view1} />
              <CTASection />
              <Projects ref={view3} />
            </>
          )}
          <Canvas
            onCreated={(state) => state.events.connect(ref.current)}
            className="canvas"
            id="canvasEl"
          >
            <Suspense fallback={null}>
              {matchesLandingPage && (
                <View track={view1}>
                  <Scene />
                </View>
              )}

              {activeRef && activeRef.ref && (
                <View track={projectView}>
                  <ProjectScene ref={projectView} />
                  {/* ref not used as a traditional ref, but as a target */}
                </View>
              )}
              <Preload all />
            </Suspense>
          </Canvas>
          <Box className="canvas" id="projectView" >
            <Flex w="100%" h="100%" p={20}>
              <Flex w="40%" h="100%" opacity={activeRef ? 1 : 0}>
                <Text color={"black"}>Dolor quis nostrud incididunt ex aute dolor ullamco ullamco sunt nisi ea in sint.</Text>
              </Flex>
              <Flex w="60%" h="100%"  id="finalView" ref={projectView}/>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
