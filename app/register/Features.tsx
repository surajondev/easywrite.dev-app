import React from "react";
import { Box, Text, Heading, Flex } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { TfiWrite } from "react-icons/tfi";
import { SiSimpleanalytics } from "react-icons/si";
import { MdOutlineSchedule } from "react-icons/md";

const Features = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      display={{ base: "none", lg: "block" }}
      position="relative"
    >
      <Box
        bgGradient="linear-gradient(180deg, #8B53BC 0%, #8B54BD 100%);"
        height="100%"
        width="140%"
        position="absolute"
        zIndex="-1"
        padding="4em 4em"
        overflow="visible"
      ></Box>
      <Box padding="4em 4em" position="relative">
        <Box
          width={634}
          height={634}
          flexShrink={0}
          borderRadius={634}
          backgroundColor="#FFD6D6"
          position="absolute"
          filter={"blur(250px)"}
          top="20%"
          left="-20%"
          zIndex={-1}
        />
        <Flex gap={10} justifyContent="center" alignItems="center">
          {iconData &&
            iconData.map((item: any, index: any) => {
              return (
                <Box
                  background="linear-gradient(to top, #8B54BD 0%, #A16BC2 100%)"
                  borderRadius="18px"
                  width={item.boxSize}
                  height={item.boxSize}
                  display="flex"
                  marginTop={item.boxMargin}
                  justifyContent="center"
                  alignItems="center"
                  key={index}
                >
                  <IconContext.Provider
                    value={{
                      color: "white",
                      size: "2.5em",
                      className: "stats-card-icon",
                    }}
                  >
                    {item.icon}
                  </IconContext.Provider>
                </Box>
              );
            })}
        </Flex>
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

const iconData = [
  {
    icon: <></>,
    boxSize: "70px",
    boxMargin: "0px",
  },
  {
    icon: <TfiWrite />,
    boxSize: "100px",
    boxMargin: "20px",
  },
  {
    icon: <SiSimpleanalytics />,
    boxSize: "100px",
    boxMargin: "250px",
  },
  {
    icon: <MdOutlineSchedule />,
    boxSize: "100px",
    boxMargin: "100px",
  },
  {
    icon: <></>,
    boxSize: "70px",
    boxMargin: "-100px",
  },
];

export default Features;
