"use client";

import React from "react";
import { Stack, Button, Box } from "@chakra-ui/react";
import Article from "./Article";
import Link from "next/link";

const articlePage = () => {
  return (
    <Stack spacing={5} className="mainContainer">
      <Box textAlign="right">
        <Link href="/dashboard/article/new-article">
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
