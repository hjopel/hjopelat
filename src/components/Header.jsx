import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useLocation } from "wouter";
import useStore from "./customHooks/useStore";
const Links = ["About", "Projects", "Contact"];

const NavLink = ({ children }) => (
  <Link px={2} py={1} rounded={"md"} href={"#"}>
    <Heading fontSize={"xl"} fontWeight={"normal"}>
      {children}
    </Heading>
  </Link>
);

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useLocation();
  const setActiveRef = useStore((state) => state.setActiveRef);
  return (
    <>
      <Box bg={"transparent"} pb={6}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          w="100%"
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Stack
            direction={"row"}
            spacing={8}
            w="100%"
            alignItems={"center"}
            justifyContent={{ base: "flex-end", md: "space-between" }}
          >
            <Link
              px={2}
              py={1}
              rounded={"md"}
              onClick={() => {
                setActiveRef(undefined)
                setLocation("/");
              }}
            >
              <Heading fontSize={"2xl"}>hjopel</Heading>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
