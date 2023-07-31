import { Flex, Heading, Text, Stack } from "@chakra-ui/react";
import Image from "next/image";
import FeaturesTopic from "@/public/images/FeaturesTopic.png";
import FeaturesAI from "@/public/images/FeaturesAI.png";
import FeaturesAnalytics from "@/public/images/FeaturesAnalytics.png";

interface FeaturesCardProps {
  index: number;
  title: string;
  desc: string;
}

const imageArr = [FeaturesTopic, FeaturesAI, FeaturesAnalytics];

function FeatureCard({ index, title, desc }: FeaturesCardProps) {
  return (
    <Stack
      w="full"
      direction="column"
      gap="5"
      textAlign={{ base: "center", md: "left" }}
    >
      <Stack alignItems={{ base: "center", md: "left" }}>
        <Image
          src={imageArr[index]}
          alt={`Picture of ${title}`}
          width={300}
          height={300}
        />
      </Stack>
      <Stack>
        <Heading variant="secondary-heading" color="#191A15">
          {title}
        </Heading>
      </Stack>
      <Stack>
        <Text variant="secondary-text" color="#A6A6A6">
          {desc}
        </Text>
      </Stack>
    </Stack>
  );
}

export default FeatureCard;
