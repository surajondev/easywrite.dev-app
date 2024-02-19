import React from "react";
import { Box, Text, Divider, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const ArticleContainer = ({ article, type }: any) => {
  if (type === "published") {
    console.log(article)
    return <Box>
      <Text variant="primary-text">{article.title}</Text>
      <Divider variant="primary-divider"/>
    </Box>;
  }
  if (type === "scheduled") {
    return <Box>
      <Flex justifyContent="space-between" alignItems="center">
    <Text variant="primary-text">{article.title}</Text>
    <Link href={`article/${article.article_id}`}>
    <Button variant="primary-button">Edit</Button>
    </Link>
    </Flex>
    <Divider variant="primary-divider"/>
  </Box>;
  }
  if (type === "draft") {
    return <Box>
    <Flex justifyContent="space-between" alignItems="center">
  <Text variant="primary-text">{article.title}</Text>
  <Link href={`article/${article.article_id}`}>
  <Button variant="primary-button">Edit</Button>
  </Link>
  </Flex>
  <Divider variant="primary-divider"/>
</Box>;
  }
};

export default ArticleContainer;
