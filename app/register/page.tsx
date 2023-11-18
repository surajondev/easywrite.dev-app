"use client";

import React from "react";
import { Flex } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import Features from "./Features";

const page = () => {
  return (
    <Flex className="mainContainer">
      <RegisterForm />
      <Features />
    </Flex>
  );
};

export default page;
