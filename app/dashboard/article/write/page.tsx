"use client";

import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import WriteArticle from "./WriteArticle";
import SettingPopup from "./SettingPopup";

const articlePage = () => {
  const [contentMarkdown, setContentMarkdown] = useState('');

  return (
    <Stack spacing={5} position="relative" className="mainContainer">
      <SettingPopup body={contentMarkdown}/>
      <WriteArticle setContentMarkdown={(e:any) => setContentMarkdown(e)}/>
    </Stack>
  );
};

export default articlePage;
