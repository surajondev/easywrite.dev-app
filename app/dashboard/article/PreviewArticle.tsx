import React from "react";
import {
  Stack,
  Flex,
  Text,
  Heading,
  Button
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { markdownToHtml } from "@/utils/renderer/markdownToHtml";

const PreviewArticle = ({view, contentMarkdown} : any) => {

  const handlePublish = async (values: any) => {
  };

  return (
   
        <Stack spacing={10} width="100%" padding="2em 2em" bg="white" borderRadius="10px" >
            <Flex gap={4}>
          <Button variant="primary-button" onClick={() => view('write')}>Edit</Button>
          <Button variant="primary-button" onClick={() => view('preview')}>Preview</Button>
          </Flex>
          <Heading variant="tertiary-heading">Preview Article Here</Heading>

        </Stack>
      )
};

export default PreviewArticle;
