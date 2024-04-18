import {
  Box,
  SimpleGrid,
  GridItem,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { tagOption } from "./DevtoTagOptions";
import React, { useState } from "react";
import { useFormik } from "formik";
import { BiSearch } from "react-icons/bi";
import { generateByTag, generateByText } from "@/api/TopicGeneration";

export const SearchBar = ({ settingData, settingLoading }: any) => {
  const [searchBy, setSearchBy] = useState<any>("text");
  const [platform, setPlatform] = useState<any>("devto");

  const handleSubmit = async (values: any) => {
    let res;
    searchBy === "text"
      ? (res = await generateByText(values.text, platform))
      : (res = await generateByTag(values.tag, platform));
    settingData(res);
    settingLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      text: "",
      tag: "",
    },
    onSubmit: (values) => {
      settingLoading(true);
      settingData(null);
      handleSubmit(values);
      console.log(values);
    },
  });

  return (
    <Box bg="white" borderRadius="10px">
      <form onSubmit={formik.handleSubmit}>
        <SimpleGrid
          templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          spacing="10px"
          padding="1.5em 1em"
        >
          <GridItem colSpan={{ base: 6, lg: 2 }}>
            <FormControl width="100%">
              <Flex
                width="100%"
                justifyContent={{ lg: "start", base: "space-between" }}
                gap="10px"
              >
                <Select
                  onChange={(e) => setSearchBy(e?.value)}
                  defaultValue={{
                    label: "Search by Text",
                    value: "text",
                  }}
                  options={[
                    {
                      label: "Search by Text",
                      value: "text",
                    },
                    {
                      label: "Search by Tag",
                      value: "tag",
                    },
                  ]}
                />
                <Select
                  onChange={(e) => setPlatform(e?.value)}
                  defaultValue={{
                    label: "Platform Devto",
                    value: "devto",
                  }}
                  options={[
                    {
                      label: "Platform Devto",
                      value: "devto",
                    },
                    {
                      label: "Platform Hashnode",
                      value: "hashnode",
                    },
                  ]}
                />
              </Flex>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 6, lg: 4 }}>
            <FormControl>
              {searchBy === "text" && (
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BiSearch />
                  </InputLeftElement>
                  <Input
                    id="text"
                    name="text"
                    type="text"
                    variant="filled"
                    placeholder="Generate topic ideas"
                    onChange={formik.handleChange}
                    value={formik.values.text}
                  />
                </InputGroup>
              )}
              {searchBy === "tag" && (
                <Select
                  id="tag"
                  name="tag"
                  variant="filled"
                  isMulti={true}
                  colorScheme="purple"
                  onChange={(e) => {
                    const tagArr = e.map((item) => item.value);
                    formik.setFieldValue("tag", tagArr);
                  }}
                  options={tagOption}
                />
              )}
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
      </form>
    </Box>
  );
};
