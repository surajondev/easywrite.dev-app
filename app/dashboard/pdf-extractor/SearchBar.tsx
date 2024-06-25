import {
  Box,
  SimpleGrid,
  GridItem,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import { BiSearch } from "react-icons/bi";
import { addData, pdfAnswer } from "@/api/TopicGeneration";

export const SearchBar = ({ settingData, settingLoading }: any) => {
  const handleSubmit = async (values: any) => {
    let res;
    res = await pdfAnswer(values.text);
    settingData(res);
    settingLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      pdfFile: "",
      text: "",
    },
    onSubmit: (values) => {
      settingLoading(true);
      settingData(null);
      handleSubmit(values);
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box bgColor="white" borderRadius="10px" marginBottom={10}>
          <SimpleGrid
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            spacing="10px"
            padding="1.5em 1em"
          >
            <GridItem colSpan={{ base: 6, lg: 6 }}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BiSearch />
                  </InputLeftElement>
                  <Input
                    id="pdfFile"
                    name="pdfFile"
                    type="text"
                    variant="filled"
                    placeholder="Search Topic"
                    onChange={formik.handleChange}
                    value={formik.values.pdfFile}
                  />
                </InputGroup>
              </FormControl>
            </GridItem>
            <GridItem colSpan={6} textAlign="center">
              <Button
                onClick={() => {
                  addData(formik.values.pdfFile);
                }}
                variant="primary-button"
                width={{ base: "50%", lg: "30%" }}
              >
                Subit File
              </Button>
            </GridItem>
          </SimpleGrid>
        </Box>
        <Box bgColor="white" borderRadius="10px">
          <SimpleGrid
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            spacing="10px"
            padding="1.5em 1em"
          >
            <GridItem colSpan={{ base: 6, lg: 6 }}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BiSearch />
                  </InputLeftElement>
                  <Input
                    id="text"
                    name="text"
                    type="text"
                    variant="filled"
                    placeholder="Search Topic"
                    onChange={formik.handleChange}
                    value={formik.values.text}
                  />
                </InputGroup>
              </FormControl>
            </GridItem>
            <GridItem colSpan={6} textAlign="center">
              <Button
                type="submit"
                variant="primary-button"
                width={{ base: "50%", lg: "30%" }}
              >
                Search
              </Button>
            </GridItem>
          </SimpleGrid>
        </Box>
      </form>
    </div>
  );
};
