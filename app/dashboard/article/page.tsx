"use client";

import React, { useState } from "react";
import { Stack, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import WriteArticle from "./WriteArticle";
import PreviewArticle from "./PreviewArticle";

const articlePage = () => {
  const [view, setView] = useState("write")
  const [contentMarkdown, setContentMarkdown] = useState('');

  return (
    <Stack spacing={5} className="mainContainer">
      <Box bg="white" borderRadius="10px" p="18px 25px" mt={10}>
        <h1>Hello Developer</h1>
      </Box>
      <WriteArticle />
    </Stack>
  );
};

export default articlePage;
