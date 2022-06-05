import "./App.css";
import { Box, useColorModeValue, Flex, Text, chakra } from "@chakra-ui/react";
import useRefs from "react-use-refs";
import { Canvas, extend } from "@react-three/fiber";
import { Suspense, useEffect, useCallback, useRef } from "react";
import { View, Preload } from "@react-three/drei";
import Header from "./components/Header";
import Projects from "./components/Projects";
import ProjectScene from "./components/ProjectScene";
import gsap from "gsap";
import useStore from "./components/customHooks/useStore";
import Hero from "./components/Hero";
import Scene from "./components/idk";
import CTASection from "./components/CTASection";
import { useRoute } from "wouter";
import Footer from "./components/Footer";
import * as THREE from "three";

import { ChakraFlex } from "./components/AnimatedComponents";
// import * as oida from "framer-motion/three"
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

  return (
    <>
      <ChakraFlex
        w="100%"
        position={"absolute"}
        top={0}
        left={0}
        zIndex={1000}
        px={{ base: 0, lg: 20 }}
        py={{ base: 0, lg: 10 }}
      >
        <Header />
      </ChakraFlex>
      <ChakraFlex
        ref={ref}
        className="container"
        bgColor={useColorModeValue("light.bg", "dark.bg")}
        justifyContent="center"
        alignItems={"center"}
        display="flex"
      >
        <ChakraFlex w="100%" h="100%" layout>
          <Hero view={view1} />
          <CTASection />

          <Projects ref={view3} />
          <Footer />

          <Canvas
            onCreated={(state) => state.events.connect(ref.current)}
            className="canvas"
            id="canvasEl"
          >
            {/* <layoutCamera /> */}
            {/* <LayoutCamera /> */}
            <Suspense fallback={null}>
              <View track={view1}>
                <Scene />
              </View>

              {false && (
                <View track={view3}>
                  <ProjectScene ref={view3} />
                  {/* ref not used as a traditional ref, but as a target */}
                </View>
              )}
              <Preload all />
            </Suspense>
          </Canvas>
        </ChakraFlex>
      </ChakraFlex>
    </>
  );
}

export default App;
