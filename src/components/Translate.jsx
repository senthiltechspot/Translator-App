import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import InpTranslate from "./InpTranslate";

const Translate = () => {
  return (
    <div>
      <Flex p="7px" gap="7px">
        <Box flex="1" boxShadow="dark-lg" p="6" rounded="md" >
          <InpTranslate align="center" justify="center" />
        </Box>
        {/* <Box flex="1" boxShadow="dark-lg" p="6" rounded="md" bg="white" >
          <DisplayTranslate />
        </Box> */}
        {/* <Center
          w="50%"
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="white"
        ></Center> */}
      </Flex>
    </div>
  );
};

export default Translate;
