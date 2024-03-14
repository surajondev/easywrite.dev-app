"use client";

import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";

interface PopularTagsInterface {
  data: number[];
  label: string[];
}

export const PopularTags = ({ data, label }: PopularTagsInterface) => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      height: "10%",
    },
    colors: ["#BC7AF9", "#FFA1F5", "#F8FF95", "#A6FF96", "#CAEDFF"],
    labels: label,
    dataLabels: {
      enabled: false,
    },
  };

  const series = data;

  return (
    <Box borderRadius="10px" bg="white" height="100%">
      <Heading variant="secondary-heading" mb={2} p={4}>
        Popular Tags
      </Heading>
      {data && <Chart type="donut" series={series} options={options} />}
    </Box>
  );
};
