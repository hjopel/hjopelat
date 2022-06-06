import { forwardRef, useEffect, useState } from "react";
import { useColorModeValue, Flex } from "@chakra-ui/react";
import useStore from "./customHooks/useStore";
import { useLocation, useRoute } from "wouter";
import {
  ChakraBox,
  ChakraFlex,
  ChakraImg,
  MotionCenter,
  MotionGrid,
  MotionGridItem,
  MotionHeading,
  MotionText,
} from "./AnimatedComponents";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
const descItems = ["a job", "a project", "something to code"];

const Projects = forwardRef(({ target }, pRef) => {
  const activeRef = useStore((state) => state.activeRef);

  return (
    <>
    <Flex
        display="flex"
        w="100%"
        h="100vh"
        ref={pRef}
        id={"pRef"}
        // cursor="none"
        // bgColor={"blue.100"}
        // pointerEvents="none"
        // onWheel={e => console.log(e)}
      />
      {/* <ChakraFlex
        display={"flex"}
        w="100%"
        h="100vh"
        flexDirection={{ base: "column", lg: "row" }}
        className="projects"
        justifyContent={"center"}
        alignItems="center"
        // position="absolute"
        pointerEvents={"none"}
      >
        <ChakraFlex
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          w={{ base: "100%", lg: "40%" }}
          h="100%"
          py={20}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <AnimatePresence exitBeforeEnter>
            <MotionHeading
              fontSize={{ base: "5xl", lg: "8xl" }}
              transform={{ lg: "rotate(270deg)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0 }}
              key={activeRef ? activeRef.title : "Projects"}
              width="70%"
              // bgColor="blue.100"
              textAlign="center"
            >
              {activeRef ? activeRef.title : "Projects"}
            </MotionHeading>
          </AnimatePresence>
          <ChakraBox
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            w={{ base: "100%", lg: "30%" }}
            textAlign={"center"}
            fontSize={"2xl"}
            transform={{ lg: "translateX(-50%)" }}
          >
            <AnimatePresence>
              <MotionText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                w="100%"
              >
                Featuring the latest projects, ideas and experiments
              </MotionText>
            </AnimatePresence>
          </ChakraBox>
        </ChakraFlex>
        <ChakraFlex
          display={"flex"}
          w={{ base: "100%", lg: "60%" }}
          h="80vh"
          justifyContent="center"
          alignItems={"center"}
          opacity={0.1}
        ></ChakraFlex>
      </ChakraFlex> */}
    </>
  );
});

export default Projects;
