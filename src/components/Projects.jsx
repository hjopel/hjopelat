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
const Projects = forwardRef((props, ref) => {
  const setActiveRef = useStore((state) => state.setActiveRef);
  const activeRef = useStore((state) => state.activeRef);

  const imgs = useStore(state => state.imgs)

  const [matchesLandingPage] = useRoute("/");
  const [matchesProjectsPage, params] = useRoute("/projects/:id");

  const [location, setLocation] = useLocation();
  return (
    <Flex w="100%" h="100vh" flexDirection="row" ref={ref} className="projects">
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w="40%"
        h="100vh"
        p={20}
        opacity={matchesLandingPage ? 1 : 0}
      >
        <Heading fontSize={"8xl"} transform="rotate(270deg)">
          Projects
        </Heading>
        <Flex
          justifyContent={"flex-start"}
          alignItems={"center"}
          w="30%"
          textAlign={"center"}
          fontSize={"2xl"}
        >
          <Text>Featuring the latest projects, ideas and experiments</Text>
        </Flex>
      </Flex>
      <Flex w="60%" h="100vh" justifyContent="center" alignItems={"center"}>
        <Grid
          width={"100%"}
          h="90%"
          templateColumns={"repeat(3, 1fr)"}
          gap={6}
          gridAutoRows="50%"
          justifyContent={"center"}
        >
          {imgs.map((img, idx) => {
            return (
              <GridItem
                w="100%"
                key={img.src}
                h="100%"
                onClick={() => {
                  setActiveRef({...img, rect: img.ref.current.getBoundingClientRect()});
                }}
                opacity={!activeRef  ? 1 : 0}
                // opacity={0.1}
              >
                <Card
                  key={img.src}
                  src={img.src}
                  title={img.title}
                  category={img.category}
                  tags={img.tags}
                  ref={img.ref}
                />
              </GridItem>
            );
          })}
        </Grid>
      </Flex>
    </Flex>
  );
});

export default Projects;
