import "./App.css";
import useRefs from "react-use-refs";
import { Canvas, extend } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { View, Preload, Loader } from "@react-three/drei";
import Projects from "./components/Projects";
// import ProjectScene from "./components/ProjectScene";
import gsap from "gsap";
import useStore from "./components/customHooks/useStore";
import Hero from "./components/Hero";
import Scene from "./components/idk";
// import CTASection from "./components/CTASection";
// import Footer from "./components/Footer";
import * as THREE from "three";
import {
  LocomotiveScrollProvider,
  useLocomotiveScroll,
} from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
// import LoadingOverlay from "./components/Loader";
import { AnimatePresence } from "framer-motion";
import ScrollTriggerProxy from "./ScrollTriggerProxy";
// import * as oida from "framer-motion/three"
function App() {
  const [ref, view1, projectView, view3, view4, view5, scrollRef] = useRefs();
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
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          // ... all available Locomotive Scroll instance options
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        }}
        containerRef={scrollRef}
      >
        {/* <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence> */}
        {/* <ChakraFlex
          w="100%"
          position={"absolute"}
          top={0}
          left={0}
          zIndex={1000}
          px={{ base: 0, lg: 20 }}
          py={{ base: 0, lg: 10 }}
        >
          <Header />
        </ChakraFlex> */}
        <ScrollTriggerProxy />
        <main data-scroll-container ref={scrollRef} className="App">
          {/* <ChakraFlex
            ref={ref}
            className="container"
            bgColor={useColorModeValue("light.bg", "dark.bg")}
            justifyContent="center"
            alignItems={"center"}
            display="flex"
            w="100%"
            h="100%"
          > */}
            {/* <ChakraFlex w="100%" h="100%" layout data-scroll-section> */}
            <Hero view={view1} />

            <Projects  />
            {/* <Footer /> */}

            <Canvas
              onCreated={(state) => state.events.connect(ref.current)}
              className="canvas"
              id="canvasEl"
            >
              <Suspense fallback={null}>
                {/* <View track={view1}>
                    <Scene />
                  </View> */}

                <Preload all />
              </Suspense>
            </Canvas>
          {/* </ChakraFlex> */}
          {/* </ChakraFlex> */}
        </main>
      </LocomotiveScrollProvider>
    </>
  );
}

export default App;
