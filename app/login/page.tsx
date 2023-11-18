"use client";

import React from "react";
import { Flex } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import Features from "../register/Features";

const loginPage = () => {
  return (
    <Flex className="mainContainer">
      <LoginForm />
      <Features />
    </Flex>
  );
};

export default loginPage;
