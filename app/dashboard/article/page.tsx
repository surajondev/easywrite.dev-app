"use client";

import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import WriteArticle from "./WriteArticle";
import SettingPopup from "./SettingPopup";

const articlePage = () => {
  const [view, setView] = useState("write")
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [Popup, setPopup] = useState(false);

  return (
    <Stack spacing={5} position="relative" className="mainContainer">
        <SettingPopup />
      <WriteArticle setPopup={setPopup}/>
    </Stack>
  );
};

export default articlePage;
