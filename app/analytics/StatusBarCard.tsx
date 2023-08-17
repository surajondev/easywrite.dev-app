import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IconContext } from "react-icons";

interface StatsBarCardInterface {
  icon: JSX.Element | null;
  stat: string;
  name: string;
}

export const StatsBarCard = ({ icon, stat, name }: StatsBarCardInterface) => {
  return (
    <Box bg="white" padding="10px 20px" borderRadius="10px">
      <Flex gap="1em">
        {icon && (
          <IconContext.Provider
            value={{
              color: "#8B54BD",
              size: "2em",
              className: "stats-card-icon",
            }}
          >
            {icon}
          </IconContext.Provider>
        )}
        <Box>
          <Text variant="subTitle-text" color="gray">
            {name}
          </Text>
          <Text variant="primary-text" fontSize="24px" color="black">
            {stat}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
