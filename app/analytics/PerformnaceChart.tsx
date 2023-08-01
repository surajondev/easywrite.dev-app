import { Box } from "@chakra-ui/react";
import React from "react";
import Chart from "react-apexcharts";

export const PerformanceChart = ({ data }: any) => {
  console.log(data);

  const options = {
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
