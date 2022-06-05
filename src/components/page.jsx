import { Flex, Image, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useRoute } from "wouter";
import useStore from "./customHooks/useStore";
import ProjectInfo from "./ProjectInfo"
const Page = forwardRef((props, ref) => {
  const imgs = useStore((state) => state.imgs);
  const activeRef = useStore(state => state.activeRef)
  
  return (
    activeRef && (
      <ProjectInfo ref={ref} />
    )
  );
});

export default Page;
