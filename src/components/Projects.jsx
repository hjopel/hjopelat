import { forwardRef, useRef } from "react";
import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  Text,
  createIcon,
  Icon,
  Button,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Card from "./Projects/Card";
import useStore from "./customHooks/useStore";
import { useLocation, useRoute } from "wouter";
import { ChakraFlex, MotionGrid, MotionGridItem } from "./AnimatedComponents";
const Projects = forwardRef(({ target }, ref) => {
  const setActiveRef = useStore((state) => state.setActiveRef);
  const activeRef = useStore((state) => state.activeRef);

  const imgs = useStore((state) => state.imgs);

  const [matchesLandingPage] = useRoute("/");
  const [matchesProjectsPage, params] = useRoute("/projects/:id");

  const [location, setLocation] = useLocation();

  const variants = {
    show: {
      opacity: 1,
    },
    hide: { opacity: 0 },
    highlight: {},
  };
  return (
    <ChakraFlex
      display={"flex"}
      w="100%"
      h="auto"
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
        // opacity={matchesLandingPage ? 1 : 0}
        flexDirection={{ base: "column", lg: "row" }}
        variants={variants}
        animate={!activeRef ? "show" : "hide"}
      >
        <Heading
          fontSize={{ base: "5xl", lg: "8xl" }}
          transform={{ lg: "rotate(270deg)" }}
        >
          Projects
        </Heading>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={{ base: "100%", lg: "30%" }}
          textAlign={"center"}
          fontSize={"2xl"}
        >
          <Text>Featuring the latest projects, ideas and experiments</Text>
        </Flex>
      </ChakraFlex>
      <ChakraFlex
        display={"flex"}
        w={{ base: "100%", lg: "60%" }}
        h="100%"
        justifyContent="center"
        alignItems={"center"}
        ref={ref}
      >
        <MotionGrid
          width={"100%"}
          h="90%"
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={{ lg: 6 }}
          gridAutoRows={{ lg: "50%" }}
          justifyContent={"center"}
        >
          {imgs.map((img, idx) => {
            return (
              <MotionGridItem
                w="100%"
                key={img.src}
                h="100%"
                onClick={() => {
                  setActiveRef({
                    ...img,
                    rect: img.ref.current.getBoundingClientRect(),
                  });
                }}
                pointerEvents={activeRef ? "none" : "initial"}
                variants={variants}
                animate={activeRef ? "hide" : "show"}
              >
                <Card
                  key={img.src}
                  src={img.src}
                  title={img.title}
                  category={img.category}
                  tags={img.tags}
                  ref={img.ref}
                />
              </MotionGridItem>
            );
          })}
        </MotionGrid>
      </ChakraFlex>
    </ChakraFlex>
  );
});

export default Projects;
