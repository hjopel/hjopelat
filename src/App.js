import "./App.css";
import { Box, useColorModeValue } from "@chakra-ui/react";
import useRefs from "react-use-refs";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import {
  View,
  Preload,
  Image as Image3,
  OrbitControls,
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
  console.log(matchesLandingPage);
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
          <Page />
          {/* 
          * if projects s put in the condition above, the imgref gets lost. in projects, only display the card that is still needed if lcoation switch
          */}
          <Canvas
            onCreated={(state) => state.events.connect(ref.current)}
            className="canvas"
            ref={projectView}
          >
            <Suspense fallback={null}>
              {matchesLandingPage && (
                <View track={view1}>
                  <Scene />
                </View>
              )}

              {matchesLandingPage && activeRef && activeRef.ref && (
                <View track={projectView}>
                  <ProjectScene ref={projectView} />
                </View>
              )}
              <Preload all />
            </Suspense>
          </Canvas>
        </Box>
      </Box>
    </>
  );
}

export default App;
