import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const HeaderBar = () => {
  const HeaderBarItem = [
    {
      name: "Reactions",
      stat: "2,758",
      growth: "10",
    },
    {
      name: "Comments",
      stat: "7",
      growth: "10",
    },
    {
      name: "Reading Time",
      stat: "4",
      growth: "10",
    },
    {
      name: "Publish Date",
      stat: "Jun 22",
      growth: null,
    },
  ];

  return (
    <Box borderRadius="10px" bg="white">
      <Flex justifyContent="space-around" p="10px 20px">
        {HeaderBarItem.map((item, index) => (
          <Flex key={index} justifyContent="space-between" w="100%">
            <Box>
              <Text variant="secondary-text" color="gray" lineHeight={10}>
                {item.name}
              </Text>
              <Text variant="primary-text" fontSize={32} lineHeight={10}>
                {item.stat}
              </Text>
              <Text variant="secondary-text" lineHeight={10}>
                {item.growth}
              </Text>
            </Box>
            {index !== HeaderBarItem.length - 1 && (
              <Divider orientation="vertical" />
            )}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
