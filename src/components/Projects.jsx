import { forwardRef, useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
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
  const setActiveRef = useStore((state) => state.setActiveRef);
  const activeRef = useStore((state) => state.activeRef);

  const imgs = useStore((state) => state.imgs);
  return (
    <ChakraFlex
      display={"flex"}
      w="100%"
      h="100vh"
      flexDirection={{ base: "column", lg: "row" }}
      // py={10}
      className="projects"
      justifyContent={"center"}
      alignItems="center"
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
        ref={pRef}
      >
        <AnimateSharedLayout>
          <ChakraFlex
            display={"flex"}
            layout
            w="100%"
            h="80%"
            flexDir={{ base: "column", lg: "row"}}
            gap={{ base: 20, lg: 4 }}
            // flexWrap={{ lg: "wrap" }}
            overflow="scroll"
          >
            {imgs.map((img) => (
              <AnimatePresence key={img.id}>
                <ProjectCard img={img} />
              </AnimatePresence>
            ))}
          </ChakraFlex>
        </AnimateSharedLayout>
      </ChakraFlex>
    </ChakraFlex>
  );
});

const ProjectCard = ({ img }) => {
  const setActiveRef = useStore((state) => state.setActiveRef);
  const activeRef = useStore((state) => state.activeRef);
  const [isOpen, setIsOpen] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  return (
    <ChakraBox
      layout
      cursor="pointer"
      initial={{ opacity: 0 }}
      animate={
        isOpen ? { opacity: 1, width: "100%" } : { opacity: 1, width: "30%" }
      }
      exit={{ opacity: 0 }}
      id={img.id}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setIsOpen(!isOpen);
        if (isOpen) {
          setActiveRef(undefined);
        } else {
          setActiveRef(img);
        }
      }}
      // transition={{duration: 3}}
    >
      <MotionCenter w="100%" layout>
        <ChakraBox
          role={"group"}
          p={6}
          bg={bg}
          boxShadow={"2xl"}
          rounded={"lg"}
          zIndex={1}
          layout
        >
          <ChakraBox
            display="flex"
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"100%"}
            layout
          >
            <ChakraBox
              display="flex"
              ref={img.ref}
              layout
              w="full"
              h="full"
            >
              <ChakraImg
                rounded={"lg"}
                objectFit={"cover"}
                src={img.src}
                width={282}
                height={230}
              />
              <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
            </ChakraBox>
          </ChakraBox>
        </ChakraBox>
      </MotionCenter>
    </ChakraBox>
  );
};
function Content() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="row" />
      <div className="row" />
      <div className="row" />
    </motion.div>
  );
}
export default Projects;
