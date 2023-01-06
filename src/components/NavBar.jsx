import React from "react";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  useColorMode,
  Stack,
  Switch,
} from "@chakra-ui/react";

const NavBar = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <div>
      <Flex minWidth="max-content" alignItems="center" gap="2" p="10px">
        <Box p="2">
          <Heading size="md">Translator App</Heading>
        </Box>
        <Spacer />

        <Stack direction="row">
          <Switch colorScheme="teal" size="lg" onChange={toggleColorMode} />
        </Stack>
      </Flex>
    </div>
  );
};

export default NavBar;
