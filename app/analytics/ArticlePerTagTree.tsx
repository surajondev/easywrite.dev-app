import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

export const ArticlePerTagTree = ({ data }: any) => {
  const series = [
    {
      data: data,
    },
  ];

  const options = {
    chart: {
      type: "treemap",
    },
  };

  return (
    <Box borderRadius="10px" bg="white">
      <Chart type="treemap" series={series} options={options} />
    </Box>
  );
};
