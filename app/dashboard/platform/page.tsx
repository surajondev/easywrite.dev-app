"use client";

import React from "react";
import { Stack, Heading, Grid, GridItem } from "@chakra-ui/react";
import Platform from "./Platform";

const changePassowrdPage = () => {
  return (
    <Stack spacing={5} className="mainContainer">
      <Heading bg="white" borderRadius="10px" p="18px 25px" mt={5} variant="tertiary-heading">
        Integrate Platform 
      </Heading>
      <Platform />
    </Stack>
  );
};

export default changePassowrdPage;
