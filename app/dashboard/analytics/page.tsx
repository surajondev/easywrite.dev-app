"use client";

import { Box, SimpleGrid, GridItem, Heading } from "@chakra-ui/react";
import { StatsBar } from "./StatsBar";
import { PerformanceChart } from "./PerformnaceChart";
import { ArticlePerTagTree } from "./ArticlePerTagTree";
import { useEffect, useState } from "react";
import { devtoAnalytics } from "@/services/api";

import { VscReactions, VscComment } from "react-icons/vsc";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { PopularTags } from "./PopularTags";
import { supabase } from "@/lib/supabase";

export default function Home({params} : {params: {session: any}}) {
  const [data, setData] = useState<any>();

  const handleFetchData = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    const res = await devtoAnalytics(session);
    res.last_article_stats[0].icon = <VscReactions />;
    res.last_article_stats[1].icon = <VscComment />;
    res.last_article_stats[2].icon = <AiOutlineClockCircle />;
    res.last_article_stats[3].icon = <IoIosStats />;
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <Box className="mainContainer">
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
        <GridItem colSpan={3}>
          <Heading variant="secondary-heading" mb={2}>
            Last 5 Article
          </Heading>
          {data && <PerformanceChart data={data.latest_article_stats} />}
        </GridItem>
        <GridItem colSpan={2}>
          <Heading variant="secondary-heading" mb={2}>
            Popular Tags
          </Heading>
          {data && (
            <PopularTags
              data={data.popular_tags.data}
              label={data.popular_tags.label}
            />
          )}
        </GridItem>
        <GridItem colSpan={5}>
          <Heading variant="secondary-heading" mb={2}>
            Articles Per Tag
          </Heading>
          {data && <ArticlePerTagTree data={data?.articles_per_tag} />}
        </GridItem>
        <GridItem colSpan={5}>
          <Heading variant="secondary-heading" mb={2}>
            All time stats
          </Heading>
          <StatsBar data={data?.randomStats} />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
