import { forwardRef, ReactNode } from "react";
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import useStore from "./customHooks/useStore";

const Info = forwardRef((props, ref) =>{
  const activeRef = useStore((state) => state.activeRef);

  return (
    activeRef && (
      <Flex bg={"white"} w="100%" h="100vh" p={20}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          w="50%"
        >
          <Stack
            flex={1}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Flex
              mb={{ base: 8, md: 20 }}
              flexDir="column"
              justifyContent={"center"}
              alignItems="center"
              textAlign={"center"}
            >
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={"xl"}
                color={"gray.500"}
              >
                {activeRef.category}
              </Text>
              <Heading
                color={"black"}
                mb={5}
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                {activeRef.title}
              </Heading>
              <Text fontSize={"xl"}>
                Nulla fugiat aute ea commodo nisi nisi aliqua aute irure do.
                Aliquip eu duis occaecat ullamco cillum proident dolore
                excepteur ut consectetur mollit aliqua sit nostrud.
              </Text>
            </Flex>

            {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={"heading"}
                    fontSize={"3xl"}
                    color={"black"}
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid> */}
          </Stack>
        </Stack>
        <Flex
          w="50%"
          h="100%"
          
          ref={ref}
        ></Flex>
      </Flex>
    )
  );
} ) 
export default Info
const StatsText = ({ children }) => (
  <Text as={"span"} fontWeight={700} color={"black"}>
    {children}
  </Text>
);

const stats = [
  {
    title: "10+",
    content: (
      <>
        <StatsText>Software modules</StatsText> for detailed monitoring and
        real-time analytics
      </>
    ),
  },
  {
    title: "24/7",
    content: (
      <>
        <StatsText>Analytics</StatsText> enabled right in your dashboard without
        history limitations
      </>
    ),
  },
  {
    title: "13%",
    content: (
      <>
        <StatsText>Farms</StatsText> in North America has chosen NewLife™ as
        their management solution
      </>
    ),
  },
  {
    title: "250M+",
    content: (
      <>
        <StatsText>Plants</StatsText> currently connected and monitored by the
        NewLife™ software
      </>
    ),
  },
];
