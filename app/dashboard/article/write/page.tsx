"use client";

import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import WriteArticle from "./WriteArticle";
import DevtoSetting from "./DevtoSetting";
import HashnodeSetting from "./HashnodeSetting";
import { create } from 'zustand'

const articlePage = () => {
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [articleId, setArticleId] = useState(null);

  return (
    <Stack spacing={5} position="relative" className="mainContainer">
      <DevtoSetting articleId={articleId} body={contentMarkdown} setArticleId={(e:any) => setArticleId(e)}/>
      <HashnodeSetting articleId={articleId} body={contentMarkdown} setArticleId={(e:any) => setArticleId(e)}/>
      <WriteArticle setContentMarkdown={(e:any) => setContentMarkdown(e)}/>
    </Stack>
  );
};

export default articlePage;
