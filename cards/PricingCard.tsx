import React from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";

interface PricingCardProps {
  title: string;
  desc: string;
  price: number;
  features: Array<string>;
  buttonText: string;
  selected: boolean;
}

export const PricingCard = ({
  title,
  desc,
  price,
  features,
  buttonText,
  selected,
}: PricingCardProps) => {
  if (!selected) {
    return (
      <Box
        p="2em"
        boxShadow="0px 4px 9px 0px rgba(0, 0, 0, 0.1)"
        borderRadius="20px"
        backgroundColor="#FFF"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={5}
        width={{ base: "90%", lg: "32%" }}
        height="100%"
      >
        <Heading variant="secondary-heading">{title}</Heading>
        <Text variant="secondary-text" color="#A6A6A6" textAlign="center">
          {desc}
        </Text>
        <Flex>
          <Text variant="secondary-text" color="#A6A6A6" textAlign="center">
            $
          </Text>
          <Heading variant="primary-heading">{price}</Heading>
        </Flex>
        <Box backgroundColor="#F9FAFB" borderRadius="10px" p="2em" width="100%">
          <Stack spacing={{ base: 4, sm: 10 }} direction={{ base: "column" }}>
            {features &&
              features.map((item, index) => {
                return (
                  <Flex gap={2} alignItems="center" key={index}>
                    <IconContext.Provider
                      value={{ color: "#8B54BD", size: "1.5em" }}
                    >
                      <FaCircleCheck />
                      <Text variant="primary-text">{item}</Text>
                    </IconContext.Provider>
                  </Flex>
                );
              })}
            <Center>
              <Button variant="pricing-unselected-button">
                <Text variant="primary-text" color="#8B54BD">
                  {buttonText}
                </Text>
              </Button>
            </Center>
          </Stack>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        p="2em"
        boxShadow="0px 4px 9px 0px rgba(0, 0, 0, 0.1)"
        borderRadius="20px"
        backgroundColor="#8B54BD"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        gap={5}
        overflow="hidden"
        width={{ base: "90%", lg: "32%" }}
        height="100%"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="relative"
          gap={5}
          zIndex={2}
        >
          <Heading variant="secondary-heading" color="#FFF">
            {title}
          </Heading>
          <Text variant="secondary-text" color="#FFF" textAlign="center">
            {desc}
          </Text>
          <Flex>
            <Text variant="secondary-text" color="#FFF" textAlign="center">
              $
            </Text>
            <Heading variant="primary-heading" color="#FFF">
              {price}
            </Heading>
          </Flex>
        </Box>
        <Box
          top={{ sm: "21%", md: "22%", base: "25%" }}
          position="absolute"
          width="670px"
          height="670px"
          backgroundColor="#A16BC2"
          borderRadius="full"
          zIndex="1"
          overflow="hidden"
        ></Box>
        <Box
          backgroundColor="#F9FAFB"
          borderRadius="10px"
          p="2em"
          width="100%"
          zIndex={2}
        >
          <Stack spacing={{ base: 4, sm: 10 }} direction={{ base: "column" }}>
            {features &&
              features.map((item, index) => {
                return (
                  <Flex gap={2} alignItems="center" key={index}>
                    <IconContext.Provider
                      value={{ color: "#8B54BD", size: "1.5em" }}
                    >
                      <FaCircleCheck />
                      <Text variant="primary-text">{item}</Text>
                    </IconContext.Provider>
                  </Flex>
                );
              })}
            <Center>
              <Button
                variant="pricing-unselected-button"
                backgroundColor="#8B54BD"
              >
                <Text variant="primary-text" color="#FFF">
                  {buttonText}
                </Text>
              </Button>
            </Center>
          </Stack>
        </Box>
      </Box>
    );
  }
};

const features = [
  "2 Searches Daily",
  "10 topic ideasy",
  "No Topics Coverage",
  "No SEO guidance",
];
