import React, { useState } from "react";
import {
  Stack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Formik } from "formik";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import Markdown from "react-markdown";
import MarkdownTheme from "@/theme/MarkdownTheme";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteArticle } from "@/api/Article";
import { useRouter } from "next/navigation";

const WriteArticle = ({ body, setContentMarkdown, articleData }: any) => {
  const router = useRouter();
  const [view, setView] = useState("write");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [Popup, setPopup] = useState(false)
  console.log(articleData);
  const handleDelete = async (id: string) => {
    console.log(id);
    const res = await deleteArticle(id);
    router.push("/dashboard/article");
    console.log(res);
  };

  return (
    <Formik
      initialValues={{
        content: body !== "new-article" ? body : "",
      }}
      onSubmit={(values) => console.log(values)}
      //   validationSchema={LoginSchema}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <Stack
          spacing={10}
          width="100%"
          padding="2em 2em"
          bg="white"
          borderRadius="10px"
        >
          {articleData !== "new-article" && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Text variant="primary-text">Delete the article</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text variant="secondary-text">
                    Do you want to delete{" "}
                    <span style={{ fontWeight: "700" }}>
                      {articleData[0].title}
                    </span>
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    bg="#FF0000"
                    variant="primary-button"
                    onClick={() => handleDelete(articleData[0].article_id)}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          <Flex gap={4}>
            <Button variant="primary-button" onClick={() => setView("write")}>
              Edit
            </Button>
            <Button variant="primary-button" onClick={() => setView("preview")}>
              Preview
            </Button>
            {articleData !== "new-article" && (
              <Button bg="#FF0000" variant="primary-button" onClick={onOpen}>
                Delete
              </Button>
            )}
          </Flex>
          {view === "write" && (
            <FormControl>
              <Heading variant="tertiary-heading">Write Article Here</Heading>
              <Textarea
                variant={"content-textarea"}
                name="content"
                size="lg"
                placeholder={"write article here...."}
                onChange={(e) => {
                  setFieldValue("content", e.target.value);
                  setContentMarkdown(e.target.value);
                  console.log(e.target.value);
                }}
                onBlur={handleBlur}
                value={values.content}
                mt={5}
                height={400}
              />
              <FormLabel mt={1} display="flex" justifyContent="space-between">
                {errors.content && touched.content && (
                  <Text variant="input-error-text"></Text>
                )}
              </FormLabel>
            </FormControl>
          )}

          {view === "preview" && (
            <PreviewArticle contentMarkdown={values.content} />
          )}
        </Stack>
      )}
    </Formik>
  );
};

const PreviewArticle = ({ contentMarkdown }: any) => {
  return (
    <Box>
      {/* @ts-ignore */}
      <Markdown components={ChakraUIRenderer(MarkdownTheme)} skipHtml>
        {contentMarkdown}
      </Markdown>
    </Box>
  );
};

export default WriteArticle;
