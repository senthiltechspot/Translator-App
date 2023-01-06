import React from "react";

import { Text, Box } from "@chakra-ui/react";

const DisplayTranslate = (props) => {
  return (
    <div>
      {/* {console.log("Dipaly comp", props.data)} */}
      <h1>Language Detected "{props.data && props.data.source}" </h1>
      <Box border="1px" p="3" rounded="md" borderColor="white.200">
        <Text fontWeight="extrabold">Transulated Text</Text>
        <hr />
        <br />
        <p>{props.data && props.data.translated}</p>
      </Box>
    </div>
  );
};

export default DisplayTranslate;
