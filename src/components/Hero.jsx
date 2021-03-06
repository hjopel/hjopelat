import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { ChakraFlex } from "./AnimatedComponents";
import gsap from "gsap";
import useStore from "./customHooks/useStore";

function App({ view }) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     gsap.timeline().to(
  //       ".lateReveal",
  //       {
  //         clipPath: "polygon(0 1%, 100% 0%, 100% 100%, 0% 100%)",
  //         stagger: 0.3,
  //         duration: 2,
  //       },
  //       5000
  //     );
  //   });
  // });

  return (
    <ChakraFlex>
      <Flex
        display="flex"
        w="100%"
        h="100vh"
        ref={view}
        id={"view1"}
        cursor="none"
      />
      <Flex
        display="flex"
        w="100%"
        h="100vh"
        zIndex={1000}
        position="absolute"
        top={0}
        left={0}
        pointerEvents={"none"}
        px={20}
        py={10}
        flexDirection="column"
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          className="lateReveal"
          textAlign={"center"}
        >
          <Heading className="outline" fontSize={"8xl"}>
            Creative Developer
          </Heading>
          <Text fontSize={"2xl"}>creating memorable sites & experiences</Text>
        </Flex>
      </Flex>
    </ChakraFlex>
  );
}

export default App;
