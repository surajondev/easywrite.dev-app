import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { IconContext } from "react-icons/lib";
import { StackDirection, Box } from "@chakra-ui/react";
import { StaticImageData } from "next/image";

interface MiniDisplayCardProps {
  title: String;
  subTitle: String | null;
  cardImage?: StaticImageData | null;
  icon: JSX.Element | null;
  flexD: StackDirection;
}

export const MiniDisplayCard = ({
  title,
  subTitle,
  cardImage,
  icon,
  flexD,
}: MiniDisplayCardProps) => {
  return (
    <Stack
      backgroundColor="#FFF"
      align={"center"}
      spacing={{ base: 5, md: 5 }}
      py="2"
      px="5"
      direction={flexD}
      borderRadius="10px"
      boxShadow="0px 4px 9px 0px rgba(0, 0, 0, 0.1)"
    >
      {cardImage && (
        <Box borderRadius="50%" overflow="hidden">
          <Image alt="Hero Image" src={cardImage} width={30} height={30} />
        </Box>
      )}
      <Stack>
        <Text variant="secondary-text">{title}</Text>
        {subTitle && (
          <Text variant="secondary-text" fontSize="12px" color="#A6A6A6">
            {subTitle}
          </Text>
        )}
      </Stack>
      {icon && (
        <IconContext.Provider value={{ color: "#8B54BD", size: "30px" }}>
          {icon}
        </IconContext.Provider>
      )}
    </Stack>
  );
};
