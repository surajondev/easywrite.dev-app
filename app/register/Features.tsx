import React from "react";
import { Box, Text, Heading, Flex } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { TfiWrite } from "react-icons/tfi";
import { SiSimpleanalytics } from "react-icons/si";
import { MdOutlineSchedule } from "react-icons/md";
import { BiLogoDevTo } from "react-icons/bi";
import { FaHashnode } from "react-icons/fa6";

const Features = () => {
  return (
    <Box
      minHeight="100vh"
      width="50%"
      display={{ base: "none", lg: "block" }}
      position="relative"
    >
      <Box
        bgGradient="linear-gradient(180deg, #8B53BC 0%, #8B54BD 100%);"
        minHeight="100%"
        width="500%"
        position="absolute"
        zIndex="-1"
        padding="4em 4em"
        overflow="hidden"
      ></Box>
      <Box
        width={534}
        height={534}
        flexShrink={0}
        borderRadius={634}
        backgroundColor="#FFD6D6"
        position="absolute"
        filter={"blur(250px)"}
        top="20%"
        // left="-20%"
        zIndex={-1}
        overflow="hidden"
      />
      <Flex
        padding="0em 4em"
        position="relative"
        flexDir="column"
        gap={20}
        height="100%"
      >
        <Flex
          gap={5}
          justifyContent="center"
          alignItems="center"
          marginLeft={100}
        >
          {iconData &&
            iconData.map((item: any, index: any) => {
              return (
                <Box
                  background="linear-gradient(to top, #8B54BD 0%, #A16BC2 100%)"
                  borderRadius="18px"
                  padding={item.boxSize}
                  display="flex"
                  marginLeft={item.boxMarginLeft}
                  marginTop={item.boxMarginTop}
                  justifyContent="center"
                  alignItems="center"
                  filter={`blur(${item.blur}px)`}
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
        <Box>
          <Text variant="primary-text" color="gray.200">
            Suraj Vishwakarma
          </Text>
          <Heading variant="secondary-heading" color="white" marginBottom={10}>
            LekhakAI has truly revolutionized the way I approach technical
            writing.
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};

const iconData = [
  {
    icon: <></>,
    boxSize: "30px",
    boxMarginTop: "0px",
    boxMarginLeft: "0px",
    blur: 2,
  },
  {
    icon: <FaHashnode />,
    boxSize: "10px",
    boxMarginTop: "250px",
    boxMarginLeft: "10px",
    blur: 0,
  },
  {
    icon: <TfiWrite />,
    boxSize: "20px",
    boxMarginTop: "20px",
    boxMarginLeft: "0px",
    blur: 0,
  },
  {
    icon: <SiSimpleanalytics />,
    boxSize: "20px",
    boxMarginTop: "250px",
    boxMarginLeft: "0px",
    blur: 0,
  },
  {
    icon: <MdOutlineSchedule />,
    boxSize: "20px",
    boxMarginTop: "50px",
    boxMarginLeft: "0px",
    blur: 0,
  },
  {
    icon: <BiLogoDevTo />,
    boxSize: "10px",
    boxMarginTop: "250px",
    boxMarginLeft: "-70px",
    blur: 0,
  },
  {
    icon: <></>,
    boxSize: "30px",
    boxMarginTop: "-100px",
    boxMarginLeft: "0px",
    blur: 2,
  },
  {
    icon: <></>,
    boxSize: "30px",
    boxMarginTop: "100px",
    boxMarginLeft: "0px",
    blur: 3,
  },
];

export default Features;
