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
  };

  return (
    <Box borderRadius="10px" bg="white">
      <Heading variant="secondary-heading" mb={2} p={5}>
        Articles Per Tag
      </Heading>
      {data && <Chart type="treemap" series={series} options={options} />}
    </Box>
  );
};
