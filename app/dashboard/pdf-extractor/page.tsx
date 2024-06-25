"use client";

import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import Result from "./Result";
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from "@chakra-ui/react";

interface DataInterface {
  title: string;
  expected_reactions: number;
  expected_comments: number;
  reading_time: number;
}

const Research = () => {
  const [data, setData] = useState<Array<DataInterface>>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Box className="mainContainer">
      <SearchBar
        settingData={(e: any) => setData(e)}
        settingLoading={(e: any) => setLoading(e)}
      />

      {data && <Result data={data} />}
      {!data && !loading && (
        <Box bg="white" borderRadius="10px" p="18px 25px" mt="32px">
          <Heading variant="secondary-heading">
            Topic Idea will be generated here!
          </Heading>
        </Box>
      )}
      {!data && loading && (
        <Box p="18px 25px" mt="32px">
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.100"
              size="xl"
            />
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default Research;
