import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

const Features = () => {
  return (
    <Box height="100vh" width="100%" display={{ base: "none", lg: "block" }}>
      <Box
        bgGradient="linear-gradient(180deg, #8B53BC 0%, #8B54BD 100%);"
        height="100%"
        width="140%"
        position="absolute"
        zIndex="-1"
        padding="4em 4em"
        overflow="visible"
      ></Box>
      <Box padding="4em 4em">
        <Text variant="primary-text" color="gray.300">
          Suraj Vishwakarma
        </Text>
        <Heading variant="secondary-heading" color="white">
          LekhakAI has truly revolutionized the way I approach technical
          writing. With its intelligent suggestions, grammar checks, and
          formatting assistance, it has become an invaluable tool in my arsenal.
        </Heading>
      </Box>
    </Box>
  );
};

export default Features;
