"use client";

import React from "react";
import { Stack, Flex } from "@chakra-ui/react";
import EmailUpdated from "./EmailUpdated";

const changePassowrdPage = () => {
  return (
    <Stack spacing={5} className="mainContainer">
      <Flex
        bg="white"
        borderRadius="10px"
        borderColor="gray.400"
        borderWidth="2px"
        p="18px 25px"
        mt={16}
      >
        <EmailUpdated />
      </Flex>
    </Stack>
  );
};

export default changePassowrdPage;
