import {
  Box,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Accordion,
  Heading,
  AccordionItem,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IconContext } from "react-icons";
import { MdAddReaction } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";

// interface ResultInterface {
//   title: string;
//   expectedReactions: number;
// }

const Result = ({ data }: any) => {
  console.log(data);
  return (
    <Accordion
      variant="light-accordion"
      bg="white"
      borderRadius="10px"
      p="18px 25px"
      mt="32px"
    >
      <AccordionItem>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <Heading variant="tertiary-heading">{data.answer}</Heading>
          </Box>
        </AccordionButton>
      </AccordionItem>
    </Accordion>
  );
};

export default Result;
