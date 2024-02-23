"use client";

import React, { useState, useEffect } from "react";
import { Stack, Heading } from "@chakra-ui/react";
import WriteArticle from "./WriteArticle";
import DevtoSetting from "./DevtoSetting";
import HashnodeSetting from "./HashnodeSetting";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { checkIntegration } from "@/services/api";

const articlePage = () => {
  const [contentMarkdown, setContentMarkdown] = useState<any>(null);
  const [articleId, setArticleId] = useState<any>(null);
  const [articleData, setArticleData] = useState<any>(null);
  const [activeDevto, setActiveDevto] = useState<boolean>(false);
  const [activeHashnode, setActiveHashnode] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleFetchParam = async () => {
    const slugArr = pathname.split("/");
    const slug = slugArr[slugArr.length - 1];
    const {
      data: { session },
    } = await supabase.auth.getSession();

    //@ts-ignore
    const response = await checkIntegration(session?.user.id);
    console.log(response);
    setActiveDevto(response.data.devto);
    setActiveHashnode(response.data.hashnode);

    if (slug !== "new-article") {
      const { data, error } = await supabase
        .from("article")
        .select()
        .eq("article_id", slug);
      console.log(data);
      setArticleData(data);
      //@ts-ignore
      setArticleId(data[0]?.article_id);
      //@ts-ignore
      setContentMarkdown(data[0]?.body_markdown);
    } else {
      setArticleData("new-article");
      setContentMarkdown("new-article");
    }
  };

  useEffect(() => {
    handleFetchParam();
  }, []);

  return (
    <Stack spacing={5} position="relative" className="mainContainer">
      {articleData && activeDevto && (
        <DevtoSetting
          articleId={articleId}
          articleData={articleData}
          body={contentMarkdown}
          setArticleId={(e: any) => setArticleId(e)}
        />
      )}
      {!activeDevto && (
        <Heading
          bg="white"
          borderRadius="10px"
          p="18px 25px"
          variant="tertiary-heading"
        >
          Add Devto API in Platform
        </Heading>
      )}
      {articleData && activeHashnode && (
        <HashnodeSetting
          articleId={articleId}
          articleData={articleData}
          body={contentMarkdown}
          setArticleId={(e: any) => setArticleId(e)}
        />
      )}
      {!activeHashnode && (
        <Heading
          bg="white"
          borderRadius="10px"
          p="18px 25px"
          variant="tertiary-heading"
        >
          Add Hashnode API in Platform
        </Heading>
      )}
      {contentMarkdown && (
        <WriteArticle
          body={contentMarkdown}
          setContentMarkdown={(e: any) => setContentMarkdown(e)}
        />
      )}
    </Stack>
  );
};

export default articlePage;
