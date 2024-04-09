import React from "react";
import { Box, Text, Divider, Flex, Button, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";

const ArticleContainer = ({ article, type, error }: any) => {
  if (type === "published") {
    console.log(article);
    return (
      <Box>
        <Text variant="primary-text" pt={3}>
          {article.title}
        </Text>
        <Divider variant="primary-divider" />
      </Box>
    );
  }
  if (type === "scheduled") {
    console.log(error);
    return (
      <Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="primary-text">{article.title}</Text>
          <Flex alignItems="center" gap={5}>
            {error === "error" && (
              <IconContext.Provider
                value={{
                  color: "red",
                  size: "2.5em",
                  className: "stats-card-icon",
                }}
              >
                <MdErrorOutline />
              </IconContext.Provider>
            )}
            <Link href={`article/${article.article_id}`}>
              <Button variant="primary-button">Edit</Button>
            </Link>
          </Flex>
        </Flex>
        <Divider variant="primary-divider" />
      </Box>
    );
  }
  if (type === "draft") {
    return (
      <Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="primary-text">{article.title}</Text>
          <Link href={`article/${article.article_id}`}>
            <Button variant="primary-button">Edit</Button>
          </Link>
        </Flex>
        <Divider variant="primary-divider" />
      </Box>
    );
  }
};

export default ArticleContainer;
