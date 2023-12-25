"use client";

import React from "react";
import { Stack, Heading, Button, Box } from "@chakra-ui/react";
import Article from "./Article";
import Link from "next/link";

const articlePage = () => {
  return (
    <Stack spacing={5} className="mainContainer">
      <Heading
        bg="white"
        borderRadius="10px"
        p="18px 25px"
        mt={5}
        variant="tertiary-heading"
      >
        Manage Article
      </Heading>
      <Box textAlign="right">
      <Link href="/dashboard/article/write">
        <Button left="0" variant="primary-button">
          New Article
        </Button>
      </Link>
      </Box>
      <Article />
    </Stack>
  );
};

export default articlePage;
