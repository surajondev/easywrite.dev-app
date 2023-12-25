import React, {useState} from "react";
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
  Button,
  Flex,
  Center
} from "@chakra-ui/react";
import { Formik } from "formik";
import {
  Select,
} from "chakra-react-select";
import { tagOption } from "../../topic-generation/TagOptions";
import { addArticle } from "@/services/api";
import { supabase } from "@/lib/supabase";

const SettingPopup = ({ body }: any) => {
  const handleSubmit = async (values: any) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const devtoData = {
      title: values.title,
      body_markdown: body,
      published: true,
      series: values.series,
      canonical_url : values.canonical_url,
      description : values.description,
      tags:values.tags,
      organization_id: values.organization_id
    }

    const articleData = {
      user_id : session?.user.id,
      body : body,
      devto: devtoData,
      hashnode : null,
      published_time : values.published_time,
      is_published : true
    }
    console.log(articleData)
    const response = addArticle(articleData)
    console.log(response)
  };

  return (
    <Formik
      initialValues={{
        title: "",
        tags: "",
        description:"",
        series:"",
        organization_id:"",
        canonical_url:"",
        published_time:""
      }}
      onSubmit={(values) => handleSubmit(values)}
      // validationSchema={LoginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
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
                      type="text"
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
                    <Heading variant="tertiary-heading">Description</Heading>
                    <Input
                      variant={"form-input"}
                      name="description"
                      type="text"
                      placeholder={"description of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.description && touched.description && (
                        <Text variant="input-error-text">{errors.description}</Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Time</Heading>
                    <Input
                      variant={"form-input"}
                      name="published_time"
                      type="datetime-local"
                      placeholder={"Title of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.published_time}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.published_time && touched.published_time && (
                        <Text variant="input-error-text">{errors.published_time}</Text>
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
                        setFieldValue("tags", tagArr);
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
                      id="tag"
                      name="tag"
                      variant="filled"
                      isMulti={true}
                      colorScheme="purple"
                      onChange={(e) => {
                        const sereisArr = e.map((item) => item.value);
                        setFieldValue("series", sereisArr);
                      }}
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
                      onChange={(e) => {
                        const organizationId = e.map((item) => item.value);
                        setFieldValue("organization_id", organizationId);
                      }}
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
                  
                    <Center>
                  <Flex gap="1em">
                  <Button variant="secondary-button" bgColor="gray.300" onClick={() => handleSubmit()}>Save Draft</Button>
                  <Button variant="primary-button" onClick={() => handleSubmit()}>Publish</Button>
                  </Flex>
                  </Center>
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
