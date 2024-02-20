import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Box,
  Text,
} from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";
import ArticleContainer from "./ArticleContainer";

const Article = () => {
  const [published, setPublished] = useState<any>([]);
  const [scheduled, setScheduled] = useState<any>([]);
  const [draft, setDraft] = useState<any>([]);

  const fetchArticle = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from("article")
      .select()
      .eq("user_id", session?.user.id);

    console.log("data", data);

    if (data) {
      const publishedData = data.filter((item) => {
        return (
          (item.hashnode_data == null && item.devto_data.type == "published") ||
          (item.hashnode_data.type == "published" &&
            item.devto_data.type == null) ||
          (item.hashnode_data.type == "published" &&
            item.devto_data.type == "published")
        );
      });
      const scheduledData = data.filter((item) => {
        return (
          (item.hashnode_data == null && item.devto_data.type == "scheduled") ||
          (item.hashnode_data == "scheduled" && item.devto_data.type == null) ||
          (item.hashnode_data.type == "scheduled" &&
            item.devto_data.type == "scheduled") ||
          (item.hashnode_data.type == "published" &&
            item.devto_data.type == "scheduled") ||
          (item.hashnode_data.type == "scheduled" &&
            item.devto_data.type == "published")
        );
      });
      const draftData = data.filter((item) => {
        return (
          (item.hashnode_data == null && item.devto_data.type == "draft") ||
          (item.hashnode_data.type == "draft" &&
            item.devto_data.type == null) ||
          (item.hashnode_data.type == "scheduled" &&
            item.devto_data.type == "draft") ||
          (item.hashnode_data.type == "draft" &&
            item.devto_data.type == "scheduled") ||
          (item.hashnode_data.type == "published" &&
            item.devto_data.type == "draft") ||
          (item.hashnode_data == "draft" && item.devto_data.type == "published")
        );
      });
      setPublished(publishedData);
      setScheduled(scheduledData);
      setDraft(draftData);
      console.log(publishedData, scheduledData, draftData);
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <Box bg="white" borderRadius="10px" p="18px 25px">
      <Tabs position="relative" variant="unstyled" zIndex="1">
        <TabList>
          <Tab>
            <Text variant="secondary-text">Published</Text>
          </Tab>
          <Tab>
            <Text variant="secondary-text">Scheduled</Text>
          </Tab>
          <Tab>
            <Text variant="secondary-text">Draft</Text>
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
            {published.length > 0 &&
              published.map((item: any) => {
                return (
                  <ArticleContainer
                    article={item}
                    key={item.article_id}
                    type="published"
                  />
                );
              })}
          </TabPanel>
          <TabPanel>
            {scheduled.length > 0 &&
              scheduled.map((item: any) => {
                return (
                  <ArticleContainer
                    article={item}
                    key={item.article_id}
                    type="scheduled"
                  />
                );
              })}
          </TabPanel>
          <TabPanel>
            {draft.length > 0 &&
              draft.map((item: any) => {
                return (
                  <ArticleContainer
                    article={item}
                    key={item.article_id}
                    type="draft"
                  />
                );
              })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Article;
