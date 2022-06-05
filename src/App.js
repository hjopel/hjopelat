import "./App.css";
import { Box, useColorModeValue, Flex, Text, chakra } from "@chakra-ui/react";
import useRefs from "react-use-refs";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useCallback, useRef } from "react";
import { View, Preload } from "@react-three/drei";
import { motion, isValidMotionProp } from "framer-motion";
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
import Footer from "./components/Footer";
import * as THREE from "three";

import { ChakraFlex } from "./components/AnimatedComponents";

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
  setImgs(imgs);

  const variants = {
    lp: { opacity: 1 },
    else: { opacity: 0 },
  };

  const projectViewVariants = {
    fadeIn: {
      opacity: 1,
      position: "initial",
      pointerEvents: "initial",
      display: "initial",
      position: "fixed",
      // top: "160vh",
      // left: 0,
      // pointerEvents: "initial",
    },
    hide: {
      opactiy: 0,
      // display: "none",
      position: "fixed",
      pointerEvents: "none",
    },
    show: {
      opacity: 1,
    },
  };
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
        px={{ base: 0, lg: 20 }}
        py={{ base: 0, lg: 10 }}
      >
        <Header />
      </Box>
      <Flex
        ref={ref}
        className="container"
        bgColor={useColorModeValue("light.bg", "dark.bg")}
        justifyContent="center"
        alignItems={"center"}
      >
        <Box w="100%" h="100%">
          {!activeRef && (
            <>
              <ChakraFlex
                variants={variants}
                // animate={activeRef ? "else" : "lp"}
              >
                <Hero view={view1} />
                <CTASection />
              </ChakraFlex>
            </>
          )}

          <Projects ref={view3} />
          {false && (
            <ChakraFlex
              variants={projectViewVariants}
              animate={
                activeRef && !matchesLandingPage
                  ? "show"
                  : activeRef
                  ? "fadeIn"
                  : "hide"
              }
              className="projectView"
              id="projectView"
              // pointerEvents={activeRef ? "initial" : "none"}
              // position={!matchesLandingPage ? "initial" : "fixed"}
            >
              <Flex w="100%" h="100%" p={20}>
                <Flex
                  w="40%"
                  h="100%"
                  opacity={activeRef ? 1 : 0}
                  justifyContent={"center"}
                  alignItems={"center"}
                  pr={10}
                >
                  <ChakraFlex
                    variants={projectViewVariants}
                    animate={!matchesLandingPage ? "fadeIn" : "hide"}
                  >
                    <Text color={"black"}>
                      Dolor quis nostrud incididunt ex aute dolor ullamco
                      ullamco sunt nisi ea in sint.
                    </Text>
                  </ChakraFlex>
                </Flex>
                <Flex w="60%" h="100%" id="finalView" ref={projectView} />
              </Flex>
            </ChakraFlex>
          )}
          <Footer />

          <Canvas
            onCreated={(state) => state.events.connect(ref.current)}
            className="canvas"
            id="canvasEl"
          >
            <Suspense fallback={null}>
              {!activeRef && (
                <View track={view1}>
                  <Scene />
                </View>
              )}

              {activeRef && (
                <View track={view3}>
                  <ProjectScene ref={view3} />
                  {/* ref not used as a traditional ref, but as a target */}
                </View>
              )}
              <Preload all />
            </Suspense>
          </Canvas>
        </Box>
      </Flex>
    </>
  );
}

export default App;
