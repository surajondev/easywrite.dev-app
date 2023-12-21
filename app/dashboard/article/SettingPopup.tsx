import React from "react";
import {
  Text,
  Stack,
  Accordion,
  AccordionItem,
  Box,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Heading,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Formik } from "formik";
import {
  Select,
} from "chakra-react-select";
import { tagOption } from "../topic-generation/TagOptions";

const SettingPopup = ({ setPopup }: any) => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        tags: "",
        series:"",
        organization_id:"",
        canonical_url:""
      }}
      onSubmit={(values) => handleSubmit(values)}
      // validationSchema={LoginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <Stack>
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
                  <Heading variant="tertiary-heading">Dev.to Setting</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack spacing={2}>
                  <FormControl>
                    <Heading variant="tertiary-heading">Title</Heading>
                    <Input
                      variant={"form-input"}
                      name="title"
                      type="title"
                      placeholder={"Title of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.title && touched.title && (
                        <Text variant="input-error-text">{errors.title}</Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Tag(Max:4)</Heading>
                    <Select
                      id="tag"
                      name="tag"
                      variant="filled"
                      isMulti={true}
                      colorScheme="purple"
                      onChange={(e) => {
                        const tagArr = e.map((item) => item.value);
                        setFieldValue("tag", tagArr);
                      }}
                      options={tagOption}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.tags && touched.tags && (
                        <Text variant="input-error-text">{errors.tags}</Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Series</Heading>
                    <Select
                      id="series"
                      name="series"
                      variant="filled"
                      colorScheme="purple"
                      onChange={handleChange}
                      options={tagOption}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.series && touched.series && (
                        <Text variant="input-error-text">{errors.series}</Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Organization</Heading>
                    <Select
                      id="organization_id"
                      name="organization_id"
                      variant="filled"
                      isMulti={true}
                      colorScheme="purple"
                      onChange={handleChange}
                      options={tagOption}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.organization_id && touched.organization_id && (
                        <Text variant="input-error-text">{errors.organization_id}</Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Canonical URL</Heading>
                    <Input
                      variant={"form-input"}
                      name="canonical_url"
                      type="canonical_url"
                      placeholder={"Title of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.canonical_url}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.canonical_url && touched.canonical_url && (
                        <Text variant="input-error-text">{errors.canonical_url}</Text>
                      )}
                    </FormLabel>
                  </FormControl>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      )}
    </Formik>
  );
};

export default SettingPopup;
