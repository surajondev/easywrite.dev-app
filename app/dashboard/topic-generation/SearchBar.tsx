import {
  Box,
  Flex,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import {
  Select
} from "chakra-react-select";
import { tagOption } from "./TagOptions";
import React, { useState } from "react";
import { useFormik } from "formik";
import { BiSearch } from "react-icons/bi";
import { generateByTag, generateByText } from "@/services/api";

export const SearchBar = ({ settingData, settingLoading }: any) => {
  const [searchBy, setSearchBy] = useState<any>("text");

  const handleSubmit = async (values: any) => {
    let res;
    searchBy === "text"
      ? (res = await generateByText(values.text))
      : (res = await generateByTag(values.tag));
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
        <Flex gap="2" p="18px 25px">
          <FormControl width="30%">
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
          </FormControl>
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
          <Button type="submit" variant="primary-button" width="20%">
            Search
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
