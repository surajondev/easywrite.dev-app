"use client";

import { Box, Heading } from "@chakra-ui/react";
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

    colors: ["#BC7AF9", "#FFA1F5", "#F8FF95", "#A6FF96"],

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
      <Heading variant="secondary-heading" mb={2} p={5}>
        Last Articles
      </Heading>
      {data && (
        <Chart
          type="bar"
          series={series}
          options={options}
          width={"100%"}
          height={"150%"}
        />
      )}
    </Box>
  );
};
