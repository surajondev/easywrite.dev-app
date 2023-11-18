"use client";

import React from "react";
import { Stack, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import ProfileEditForm from "./ProfileEditForm";

const loginPage = () => {
  return (
    <Stack spacing={5} className="mainContainer">
      <Flex bg="white" borderRadius="10px" p="18px 25px" mt={16}>
        <ProfileEditForm />
      </Flex>
    </Stack>
  );
};

export default loginPage;
