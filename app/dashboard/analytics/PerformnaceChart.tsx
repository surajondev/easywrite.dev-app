"use client";

import { Box } from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";

export const PerformanceChart = ({ data }: any) => {

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: true,
      },
    },

    xaxis: {
      labels: {
        trim: true,
      },
      categories: data?.title,
    },
  };

  const series = [data?.reactions, data?.comments];

  return (
    <Box borderRadius="10px" bg="white">
      {data && <Chart type="bar" series={series} options={options} />}
    </Box>
  );
};