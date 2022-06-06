import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { MotionCenter, MotionStack } from "../AnimatedComponents";
import useStore from "../customHooks/useStore";

const Card = forwardRef(({ src, title, category, tags }, ref) => {
  const activeRef = useStore((state) => state.activeRef);
  const variants = {
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  };
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <MotionCenter py={12} cursor="pointer" layout>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={activeRef ? "" : bgColor}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${src})`,
            // backgroundColor:
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={src}
            ref={ref}
          />
        </Box>
        <MotionStack
          pt={10}
          align={"center"}
          w="100%"
          variants={variants}
          animate={activeRef ? "hide" : "show"}
        >
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {category}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {title}
          </Heading>
          <Stack direction={"row"}>
            {tags.map((tag) => (
              <Text key={tag} fontSize="sm">
                {tag}
              </Text>
            ))}
          </Stack>
        </MotionStack>
      </Box>
    </MotionCenter>
  );
});
export default Card;
