import {
  Box,
  Center,
  chakra,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraFlex = chakra(motion.div, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});
const ChakraBox = motion(Box);

const MotionGrid = motion(Grid);
const MotionGridItem = motion(GridItem);
const MotionStack = motion(Stack);

const MotionCenter = motion(Center);
const MotionBox = motion(Box);
// const ChakraImg = chakra(motion.img, {
//   shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
// });
const ChakraImg = motion(Image);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
export {
  ChakraFlex,
  MotionGrid,
  MotionGridItem,
  MotionStack,
  MotionCenter,
  ChakraBox,
  ChakraImg,
  MotionText,
  MotionHeading,
};
