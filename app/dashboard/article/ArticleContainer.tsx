import React from "react";
import {
  Box,
  Text,
  Divider,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { deleteArticle } from "@/api/Article";

const ArticleContainer = ({ article, type, error, reload }: any) => {
  const handleDelete = async (id: string) => {
    console.log(id);
    const res = await deleteArticle(id);
    console.log(res);
    reload();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
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
              <span style={{ fontWeight: "700" }}>{article.title}</span>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              bg="#FF0000"
              variant="primary-button"
              onClick={() => handleDelete(article.article_id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
          {(type === "scheduled" || type === "draft") && (
            <Link href={`article/${article.article_id}`}>
              <Button variant="primary-button">Edit</Button>
            </Link>
          )}
          <Button bg="#FF0000" variant="primary-button" onClick={onOpen}>
            Delete
          </Button>
        </Flex>
      </Flex>
      <Divider variant="primary-divider" />
    </Box>
  );
};

export default ArticleContainer;
