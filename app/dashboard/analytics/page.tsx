"use client";

import {
  Box,
  SimpleGrid,
  GridItem,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { StatsBar } from "./StatsBar";
import { PerformanceChart } from "./PerformnaceChart";
import { ArticlePerTagTree } from "./ArticlePerTagTree";
import { useEffect, useState } from "react";
import { devtoAnalytics } from "@/api/Analytics";

import { VscReactions, VscComment } from "react-icons/vsc";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { PopularTags } from "./PopularTags";
import { supabase } from "@/lib/supabase";
import { useAnalyticalStore } from "@/utils/state/store";

export default function Home({ params }: { params: { session: any } }) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const analyticalD = useAnalyticalStore((state: any) => state.analyticalData);
  const updateAnalyticalData = useAnalyticalStore(
    (state: any) => state.updateAnalyticalData
  );
  console.log(analyticalD);
  const handleFetchData = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const res = await devtoAnalytics(session);
    console.log(res);
    //@ts-ignore
    if (res.error) {
      //@ts-ignore
      setError(res.error);
    } else {
      //@ts-ignore
      res.last_article_stats[0].icon = <VscReactions />;
      //@ts-ignore
      res.last_article_stats[1].icon = <VscComment />;
      //@ts-ignore
      res.last_article_stats[2].icon = <AiOutlineClockCircle />;
      //@ts-ignore
      res.last_article_stats[3].icon = <IoIosStats />;
      setData(res);
      updateAnalyticalData(res);
    }
  };

  useEffect(() => {
    if (!analyticalD) {
      handleFetchData();
    }
    setData(analyticalD);
  }, []);

  return (
    <Box className="mainContainer">
      {!data && !error && (
        <Box p="18px 25px" mt="32px">
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.100"
              size="xl"
            />
          </Center>
        </Box>
      )}
      {error && (
        <Heading
          bg="white"
          borderRadius="10px"
          p="18px 25px"
          mt={5}
          variant="tertiary-heading"
        >
          {error}
        </Heading>
      )}
      {data && (
        <SimpleGrid
          templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          spacing="40px"
        >
          <GridItem colSpan={5}>
            <Heading variant="secondary-heading" mb={2}>
              Last Article Performance
            </Heading>
            <StatsBar data={data?.last_article_stats} />
          </GridItem>
          <GridItem colSpan={{ base: 5, lg: 3 }}>
            {data && <PerformanceChart data={data.latest_article_stats} />}
          </GridItem>
          <GridItem colSpan={{ base: 5, lg: 2 }}>
            {data && (
              <PopularTags
                data={data.popular_tags.data}
                label={data.popular_tags.label}
              />
            )}
          </GridItem>
          <GridItem colSpan={5}>
            {data && <ArticlePerTagTree data={data?.articles_per_tag} />}
          </GridItem>
          <GridItem colSpan={5}>
            <Heading variant="secondary-heading" mb={2}>
              All time stats
            </Heading>
            <StatsBar data={data?.randomStats} />
          </GridItem>
        </SimpleGrid>
      )}
    </Box>
  );
}
