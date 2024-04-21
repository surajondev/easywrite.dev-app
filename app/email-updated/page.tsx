"use client";

import React from "react";
import { Stack, Flex } from "@chakra-ui/react";
import ChangeEmail from "./ChangeEmail";

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
        <ChangeEmail />
      </Flex>
    </Stack>
  );
};

export default changePassowrdPage;
