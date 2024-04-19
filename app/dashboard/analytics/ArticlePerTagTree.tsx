"use client";

import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";

export const ArticlePerTagTree = ({ data }: any) => {
  const series = [
    {
      data: data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "treemap",
    },
    colors: ["#BC7AF9", "#FFA1F5", "#F8FF95", "#A6FF96"],
  };

  return (
    <Box borderRadius="10px" bg="white">
      <Heading variant="secondary-heading" mb={2} p={5}>
        Articles Per Tag
      </Heading>
      {data && (
        <Chart
          type="treemap"
          series={series}
          options={options}
          width={"100%"}
          height={"250%"}
        />
      )}
    </Box>
  );
};
