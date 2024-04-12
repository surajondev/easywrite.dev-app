"use client";

import {
  Box,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Flex,
  Button,
  Divider,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { devtoAnalytics } from "@/services/api";
import { PerformanceChart } from "./analytics/PerformnaceChart";
import { VscReactions, VscComment } from "react-icons/vsc";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useAnalyticalStore, useArticleStore } from "@/utils/state/store";

function Dashboard({ params }: { params: { session: any } }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [articleData, setArticleData] = useState<any>(null);
  const analyticalD = useAnalyticalStore((state: any) => state.analyticalData);
  const analyticalError = useAnalyticalStore(
    (state: any) => state.analyticalError
  );
  const updateAnalyticalError = useAnalyticalStore(
    (state: any) => state.updateAnalyticalError
  );
  const updateAnalyticalData = useAnalyticalStore(
    (state: any) => state.updateAnalyticalData
  );
  const articleD = useArticleStore((state: any) => state.articleData);
  const updateArticleData = useArticleStore(
    (state: any) => state.updateArticleData
  );

  const handleFetchData = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const res = await devtoAnalytics(session);
    if (res.error) {
      setError(res.error);
      updateAnalyticalError(res.error);
      // console.log(res.error);
    } else {
      res.last_article_stats[0].icon = <VscReactions />;
      res.last_article_stats[1].icon = <VscComment />;
      res.last_article_stats[2].icon = <AiOutlineClockCircle />;
      res.last_article_stats[3].icon = <IoIosStats />;
      console.log(res);
      setData(res);
      updateAnalyticalData(res);
    }
    const { data, error } = await supabase
      .from("article")
      .select()
      .eq("user_id", session?.user.id);
    if (error) {
      console.log(error);
    }
    console.log("data", data);
    setArticleData(data);
    updateArticleData(data);
  };

  useEffect(() => {
    if (!articleD && !analyticalD) {
      handleFetchData();
    }
    if (articleD && analyticalD) {
      console.log("running-else");
      setArticleData(articleD);
      setData(analyticalD);
    }
    if (articleD && !analyticalD) {
      console.log("running-articleD");
      setArticleData(articleD);
      setError(analyticalError);
    }
    if (!articleD && analyticalD) {
      console.log("running-analyticalD");
      setData(analyticalD);
    }
  }, []);

  return (
    <Box className="mainContainer">
      <SimpleGrid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        spacing="40px"
      >
        <GridItem colSpan={{ sm: 5, lg: 3 }}>
          {data && <PerformanceChart data={data.latest_article_stats} />}
          {error && (
            <Box borderRadius="10px" bg="white" height="100%">
              <Heading variant="secondary-heading" mb={2} p={5}>
                Last Articles
              </Heading>
              <Text variant="primary-text" pl={3} pb={5}>
                {error}
              </Text>
            </Box>
          )}
          {!data && !error && (
            <Skeleton>
              <div style={{ borderRadius: "10px", height: "400px" }} />
            </Skeleton>
          )}
        </GridItem>
        <GridItem colSpan={{ sm: 5, lg: 2 }}>
          {articleData && (
            <Box borderRadius="10px" bg="white" height="100%">
              <Heading variant="secondary-heading" mb={2} p={5}>
                Articles
              </Heading>
              {articleData &&
                articleData.map((item: any, index: any) => {
                  if (index < 5) {
                    return (
                      <Box pb={5} key={index}>
                        <Text variant="primary-text" pl={5} pr={3}>
                          {item.title}
                        </Text>
                        <Center>
                          <Divider width="80%" variant="primary-divider" />
                        </Center>
                      </Box>
                    );
                  }
                })}
            </Box>
          )}
          {!articleData && (
            <Skeleton>
              <div style={{ borderRadius: "10px", height: "400px" }} />
            </Skeleton>
          )}
        </GridItem>
        <GridItem colSpan={5}>
          <Flex
            borderRadius="10px"
            bg="linear-gradient(to right, #7551FF 0%, #FF69B4   100%)"
            gap={30}
            justifyContent="space-between"
            pl={10}
            pr={10}
            pt={20}
            pb={20}
          >
            <Box>
              <Text color="white" variant="primary-text">
                Generate trending technical article ideas backed by data,
                helping you write content people actually want to read and
                engage with.
              </Text>
            </Box>
            <Box>
              <Button variant="primary-button" backgroundColor="#7551FF">
                <Link href="/dashboard/topic-generation">Go To Topic Gen</Link>
              </Button>
            </Box>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
