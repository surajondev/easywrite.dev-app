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
  Skeleton,
} from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";
import ArticleContainer from "./ArticleContainer";

const Article = () => {
  const [published, setPublished] = useState<any>([]);
  const [scheduled, setScheduled] = useState<any>([]);
  const [draft, setDraft] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const articleArr = [0, 1, 2, 3, 4];

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
        if (item.hashnode_data && item.devto_data) {
          return (
            item.hashnode_data.type == "published" &&
            item.devto_data.type == "published"
          );
        }

        if (item.hashnode_data && item.devto_data == null) {
          return item.hashnode_data.type == "published";
        }

        if (item.hashnode_data == null && item.devto_data) {
          return item.devto_data.type == "published";
        }
      });
      const scheduledData = data.filter((item) => {
        if (item.hashnode_data && item.devto_data) {
          return (
            (item.hashnode_data.type == "scheduled" &&
              item.devto_data.type == "scheduled") ||
            (item.hashnode_data.type == "published" &&
              item.devto_data.type == "scheduled") ||
            (item.hashnode_data.type == "scheduled" &&
              item.devto_data.type == "published")
          );
        }

        if (item.hashnode_data && item.devto_data == null) {
          return item.hashnode_data.type == "scheduled";
        }

        if (item.hashnode_data == null && item.devto_data) {
          return item.devto_data.type == "scheduled";
        }
      });
      const draftData = data.filter((item) => {
        if (item.hashnode_data && item.devto_data) {
          return (
            (item.hashnode_data.type == "scheduled" &&
              item.devto_data.type == "draft") ||
            (item.hashnode_data.type == "draft" &&
              item.devto_data.type == "scheduled") ||
            (item.hashnode_data.type == "published" &&
              item.devto_data.type == "draft") ||
            (item.hashnode_data == "draft" &&
              item.devto_data.type == "published")
          );
        }

        if (item.hashnode_data && item.devto_data == null) {
          return item.hashnode_data.type == "draft";
        }

        if (item.hashnode_data == null && item.devto_data) {
          return item.devto_data.type == "draft";
        }
      });
      setPublished(publishedData);
      setScheduled(scheduledData);
      setDraft(draftData);
      setLoading(false);
      console.log(publishedData, scheduledData, draftData);
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);

  const getError = (item: any) => {
    if (item.devto_data.error) {
      return "error";
    }
    if (item.hashnode_data.error) {
      return "error";
    }
  };

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
                    error="null"
                  />
                );
              })}
            {loading && (
              <div>
                {articleArr.map(() => {
                  return (
                    <Skeleton>
                      <div
                        style={{
                          borderRadius: "10px",
                          height: "40px",
                          marginTop: "5px",
                        }}
                      />
                    </Skeleton>
                  );
                })}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {scheduled.length > 0 &&
              scheduled.map((item: any) => {
                return (
                  <ArticleContainer
                    article={item}
                    key={item.article_id}
                    type="scheduled"
                    error={getError(item)}
                  />
                );
              })}
            {loading && (
              <div>
                {articleArr.map(() => {
                  return (
                    <Skeleton>
                      <div
                        style={{
                          borderRadius: "10px",
                          height: "40px",
                          marginTop: "5px",
                        }}
                      />
                    </Skeleton>
                  );
                })}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {draft.length > 0 &&
              draft.map((item: any) => {
                return (
                  <ArticleContainer
                    article={item}
                    key={item.article_id}
                    type="draft"
                    error="null"
                  />
                );
              })}
            {loading && (
              <div>
                {articleArr.map(() => {
                  return (
                    <Skeleton>
                      <div
                        style={{
                          borderRadius: "10px",
                          height: "40px",
                          marginTop: "5px",
                        }}
                      />
                    </Skeleton>
                  );
                })}
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Article;
