import { Flex, Image, Text } from "@chakra-ui/react";
import { useRoute } from "wouter";
import useStore from "./customHooks/useStore";
import ProjectInfo from "./ProjectInfo"
const Page = () => {
  const [match, params] = useRoute("/projects/:id");
  const imgs = useStore((state) => state.imgs);
  const activeRef = useStore(state => state.activeRef)
  
  return (
    activeRef && (
      <ProjectInfo />
    )
  );
};

export default Page;
