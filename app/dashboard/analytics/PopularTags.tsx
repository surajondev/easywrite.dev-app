"use client";

import { Box } from "@chakra-ui/react";
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
      height:"10%"
    },
    labels: label,
    dataLabels: {
      enabled: false,
    },
  };

  const series = data;

  return (
    <Box borderRadius="10px" bg="white">
      {data && <Chart type="donut" series={series} options={options} />}
    </Box>
  );
};
