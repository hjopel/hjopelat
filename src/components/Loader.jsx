import { Heading, Flex, Box, Stack } from "@chakra-ui/react";
import {
  ChakraBox,
  ChakraFlex,
  MotionHeading,
  MotionText,
} from "./AnimatedComponents";
import Turtle from "./LoggerheadTurtle";

const Loader = () => {
  const textVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,

      transition: {
        duration: 1,
        yoyo: Infinity, // repeats infinite times
        ease: "easeInOut",
      },
    },
  };
  return (
    <ChakraFlex
      //   style={{ touchAction: "none" }}
      zIndex={10000}
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      //   pointerEvents={"none"}
      overflow="hidden"
      initial={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: "100%",
        opacity: 0,
      }}
      transition={{
        duration: 2,
      }}
      id="loader"
    >
      <Flex
        w="100%"
        h="100%"
        bgColor="white"
        justify={"center"}
        alignItems="center"
        flexWrap={"wrap"}
      >
        <Stack direction={"column"} justify="center" align={"center"}>
          <Turtle />
          <MotionHeading
            variants={textVariants}
            initial="hidden"
            animate="visible"
            fontWeight="thin"
          >
            save the turtles
          </MotionHeading>
        </Stack>
      </Flex>
    </ChakraFlex>
  );
};

export default Loader;
