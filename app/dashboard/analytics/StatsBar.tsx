import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import { StatsBarCard } from "./StatusBarCard";

import React from "react";

export const StatsBar = ({ data }: any) => {
  return (
    <Box>
      <SimpleGrid
        templateColumns={{
          base: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        spacing="40px"
      >
        {data &&
          data.map((item: any) => (
            <StatsBarCard
              name={item.name}
              stat={item.stat}
              icon={item.icon}
              key={item.name}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};
