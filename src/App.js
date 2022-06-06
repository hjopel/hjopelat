import "./App.css";
import { Box, useColorModeValue, Flex, Text, chakra } from "@chakra-ui/react";
import useRefs from "react-use-refs";
import { Canvas, extend } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { View, Preload, Loader } from "@react-three/drei";
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

import LoadingOverlay from "./components/Loader";
import { ChakraFlex } from "./components/AnimatedComponents";
import { AnimatePresence } from "framer-motion";
// import * as oida from "framer-motion/three"
function App() {
  const [ref, hero, project, view3, view4, view5, scrollRef] = useRefs();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    gsap.timeline().to(".lateReveal", {
      clipPath: "polygon(0 1%, 100% 0%, 100% 100%, 0% 100%)",
      stagger: 0.3,
      duration: 2,
    });
    setTimeout(() => setIsLoading(false), 3000);
  });

  const activeRef = useStore((state) => state.activeRef);

  const geometry = useMemo(() => {
    return <planeBufferGeometry args={[1, 1, 1000, 1000]} />;
  });

  // const renderImageViews = useMemo(() => {
  //   if (activeRef) {
  //     return (
  //       <View track={activeRef.ref}>
  //         <ProjectScene img={activeRef} geom={geometry} />{" "}
  //       </View>
  //     );
  //   } else {
  //     return imgs.map((img) => (
  //       <View track={img.ref} key={img.id}>
  //         <ProjectScene img={img} geom={geometry} />{" "}
  //       </View>
  //     ));
  //   }
  // }, [activeRef, imgs]);

  return (
    <>
      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>
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
          <Hero view={hero} />
          <CTASection />

          <Projects ref={project} />
          <Footer />

          <Canvas
            onCreated={(state) => state.events.connect(ref.current)}
            className="canvas"
            id="canvasEl"
          >
            <Suspense fallback={null}>
              <View track={hero}>
                <Scene />
              </View>
              <View track={project}>
                <ProjectScene />
              </View>
              {/* {renderImageViews} */}
              <Preload all />
            </Suspense>
          </Canvas>
          {/* <Loader /> */}
        </ChakraFlex>
      </ChakraFlex>
    </>
  );
}

export default App;
