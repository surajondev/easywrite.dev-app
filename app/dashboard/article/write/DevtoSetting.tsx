import React, { useState } from "react";
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
  Image,
  Button,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { Select } from "chakra-react-select";
import { tagOption } from "../../topic-generation/TagOptions";
import { addArticle, updateDevtoArticle } from "@/services/api";
import { supabase } from "@/lib/supabase";
import { SUPABASE_STORAGE } from "@/utils/constants/supabase";

const DevtoSetting = ({ body, setArticleId, articleId }: any) => {
  const [fileName, setFileName] = useState<any>(null);
  const [imgURL, setImgURL] = useState<any>(null);

  const handleSubmit = async (values: any) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const devtoData = {
      title: values.title,
      body_markdown: body,
      published: true,
      series: values.series,
      canonical_url: values.canonical_url,
      description: values.description,
      main_image: values.main_image,
      tags: values.tags,
      organization_id: values.organization_id,
    };

    const articleData = {
      user_id: session?.user.id,
      devto: devtoData,
    };
    console.log(articleData)
    const response = await addArticle(articleData);
    if(response){
      console.log(response[0])
      setArticleId(response[0].article_id)
    }
  };

  const handleUpdate = async (values: any) => {

    const devtoData = {
      title: values.title,
      body_markdown: body,
      published: true,
      series: values.series,
      canonical_url: values.canonical_url,
      description: values.description,
      main_image: values.main_image,
      tags: values.tags,
      organization_id: values.organization_id,
    };

    const articleData = {
      article_id: articleId,
      devto: devtoData,
    };
    console.log(articleData)
    const response = await updateDevtoArticle(articleData);
    if(response){
      console.log(response[0])
      setArticleId(response[0].article_id)
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        tags: "",
        description: "",
        series: "",
        main_image: "",
        organization_id: "",
        canonical_url: "",
        published_time: "",
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
                      placeholder={"Description of the Article"}
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
                        <Text variant="input-error-text">
                          {errors.description}
                        </Text>
                      )}
                    </FormLabel>
                  </FormControl>
                    <Heading variant="tertiary-heading">Thumbnail</Heading>
                  <Stack>
                     { imgURL != null && 
                     <div><Image
                      width={{base:"100%", md:"60%", lg:"40%"}}
                      objectFit="cover"
                      src={imgURL}
                      alt={values.title}
                      />
                      </div>
                    }
                    <FormControl>
                      <Input
                        variant={"form-input-file"}
                        name="main_image"
                        type="file"
                        onChange={async (e) => {
                          const timestamp = Date.now();
                          const { data, error } = await supabase.storage
                            .from("profileImage")
                            //@ts-ignore
                            .upload(
                              //@ts-ignore
                              `${timestamp}-${e.target.files[0].name}`,
                              //@ts-ignore
                              e.target.files[0],
                              {
                                cacheControl: "3600",
                                upsert: false,
                              }
                            );
                          if (error) {
                            console.log(error);
                            return;
                          }
                          console.log(
                            `${SUPABASE_STORAGE}/profileImage/${data.path}`
                          );
                          //@ts-ignore
                          // setFileName(e.target.value);
                          setImgURL(`${SUPABASE_STORAGE}/profileImage/${data.path}`)
                          setFieldValue(
                            "main_image",
                            `${SUPABASE_STORAGE}/profileImage/${data.path}`
                          );
                        }}
                        onBlur={handleBlur}
                        value={fileName}
                      />
                      <FormLabel display="flex" justifyContent="space-between">
                        {errors.main_image && touched.main_image && (
                          <Text variant="input-error-text">
                            {errors.main_image}
                          </Text>
                        )}
                      </FormLabel>
                    </FormControl>
                  </Stack>
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
                        <Text variant="input-error-text">
                          {errors.published_time}
                        </Text>
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
                    <Input
                      variant={"form-input"}
                      name="series"
                      type="text"
                      placeholder={"Serie of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.series}
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
                    <Input
                      variant={"form-input"}
                      name="organization_id"
                      type="text"
                      placeholder={"Organization"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.organization_id}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.organization_id && touched.organization_id && (
                        <Text variant="input-error-text">
                          {errors.organization_id}
                        </Text>
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
                        <Text variant="input-error-text">
                          {errors.canonical_url}
                        </Text>
                      )}
                    </FormLabel>
                  </FormControl>

                  <Center>
                    <Flex gap="1em">
                      <Button
                        variant="secondary-button"
                        bgColor="gray.300"
                        onClick={() => handleSubmit()}
                      >
                        Save Draft
                      </Button>
                      {
                        articleId === null ?
                        <Button
                        variant="primary-button"
                        onClick={() => handleSubmit()}
                      >
                        Publish
                      </Button>
                    :
                    <Button
                        variant="primary-button"
                        onClick={() => handleUpdate(values)}
                      >
                        Update
                      </Button>

                    }
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

export default DevtoSetting;
