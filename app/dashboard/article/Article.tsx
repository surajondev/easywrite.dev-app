import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Box,
  Text,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

const Article = () => {
  return (
    <Box bg="white" borderRadius="10px" p="18px 25px">
      <Tabs
        position="relative"
        variant="unstyled"
        zIndex="1"
      >
        <TabList>
            <Tab>
              <Text variant="secondary-text">Published</Text>
            </Tab>
            <Tab>
              <Text variant="secondary-text">Draft</Text>
            </Tab>
            <Tab>
              <Text variant="secondary-text">Scheduled</Text>
            </Tab>
            
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <Text>
              THis is the biggest heading in the world with lots of space in
              betweeen asdfdasfdsfdsafadsf badsfasdfasd fasfasdffffff fffffff
              ffffffff affgdsafdsfdsa a fdasfasd
            </Text>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Article;
