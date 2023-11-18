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
  return (
      <Accordion
        variant="light-accordion"
        allowToggle
        bg="white"
        borderRadius="10px"
        p="18px 25px"
        mt="32px"
      >
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading variant="tertiary-heading">{data.title}</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Flex justifyContent="space-between">
              <IconContext.Provider
                value={{
                  color: "#8B53BC",
                  size: "1.5em",
                  className: "global-class-name",
                }}
              >
                <Flex>
                  <MdAddReaction />
                  <Text variant="secondary-text">
                    :{data.expected_reactions}
                  </Text>
                </Flex>
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  color: "#8B53BC",
                  size: "1.5em",
                  className: "global-class-name",
                }}
              >
                <Flex>
                  <FaComments />
                  <Text variant="secondary-text">
                    :{data.expected_comments}
                  </Text>
                </Flex>
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  color: "#8B53BC",
                  size: "1.5em",
                  className: "global-class-name",
                }}
              >
                <Flex>
                  <AiFillClockCircle />
                  <Text variant="secondary-text">
                    :{data.reading_time * 250}
                  </Text>
                </Flex>
              </IconContext.Provider>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
  );
};

export default Result;
