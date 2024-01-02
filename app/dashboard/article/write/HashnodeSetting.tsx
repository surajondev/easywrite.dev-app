import React, { useState, useEffect } from "react";
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
import { tagOption } from "../../topic-generation/HashnodeTagOptions";
import { addArticle, updateHashnodeArticle } from "@/services/api";
import { supabase } from "@/lib/supabase";
import { SUPABASE_STORAGE } from "@/utils/constants/supabase";

const HashnodeSetting = ({ body, articleId, setArticleId }: any) => {
  const [fileName, setFileName] = useState<any>(null);
  const [imgURL, setImgURL] = useState<any>(null);
  const [hashnodePublication, setHashnodePublication] = useState<any>(null);

  const handleSubmit = async (values: any) => {

    const tagsArr = values.tags.map((e : string) =>{ return(
      {
        "_id":e
      }
    )}) 
    
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const getSlug = () => {
        const lowerCase = values.title.toLowerCase()
        var slug = lowerCase.replace(/ /g, '-');
        return slug
    }

    const tagsArray = values.tags

    const hashnodeData = {
      title: values.title,
      contentMarkdown: body,
      isRepublished: {
        originalArticleURL: values.originalArticleURL
      },
      subtitle: values.subtitle,
      coverImageURL: values.main_image,
      slug:getSlug(),
      tags: tagsArr,
      isPartOfPublication: {publicationId : values.publicationId},
    };

    const hashnode_data = {
        type:"schueduled",
        error:"",
    }

    const articleData = {
      user_id: session?.user.id,
      hashnode: hashnodeData,
      hashnode_data
    };
    console.log(articleData);
    const response = await addArticle(articleData);
    if(response){
        console.log(response)
        setArticleId(response[0].articleId)
      }
  };

  const handleUpdate = async (values: any) => {
    const getSlug = () => {
        const lowerCase = values.title.toLowerCase()
        var slug = lowerCase.replace(/ /g, '-');
        return slug
    }

    const tagsArr = values.tags.map((e : string) =>{ return(
      {
        "_id":e
      }
    )}) 

    const hashnodeData = {
      title: values.title,
      contentMarkdown: body,
      subtitle: values.subtitle,
      coverImageURL: values.main_image,
      slug:getSlug(),
      tags: tagsArr,
      isPartOfPublication: {publicationId : "658d492fd5ca6e025263a309"},
    };

    if(values.originalArticleURL){
      //@ts-ignore
      hashnodeData.isRepublished = {
        originalArticleURL: values.orgioriginalArticleURL
      }
    }

    const hashnode_data = {
      type:"schueduled",
      error:"",
  }

    const articleData = {
      article_id: articleId,
      hashnode: hashnodeData,
      hashnode_data
    };
    console.log(articleData);
    const response = await updateHashnodeArticle(articleData)
    if(response){
        console.log(response)
      }
  };

  const handleFetchHashnodePublication = async () => {
    const { data, error } = await supabase
  .from('hashnode_key')
  .select(`
    label,
    value
  `)

  if(data !== null){
    const newArray = data[0].value.map(() => {
      return ({
        "label":data[0].label,
        "value":data[0].value
      })
    })

    setHashnodePublication(newArray)
  }
  }


  useEffect(()=> {
    handleFetchHashnodePublication()
  },[])

  return (
    <Formik
      initialValues={{
        title: "",
        tags: "",
        subtitle: "",
        seriesId: "",
        main_image: "",
        publicationId: "",
        originalArticleURL: "",
        publishedAt: "",
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
          >
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading variant="tertiary-heading">Hashnode Setting</Heading>
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
                    <Heading variant="tertiary-heading">subtitle</Heading>
                    <Input
                      variant={"form-input"}
                      name="subtitle"
                      type="text"
                      placeholder={"subtitle of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subtitle}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.subtitle && touched.subtitle && (
                        <Text variant="input-error-text">
                          {errors.subtitle}
                        </Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <Heading variant="tertiary-heading">Thumbnail</Heading>
                  <Stack>
                    {imgURL != null && (
                      <div>
                        <Image
                          width={{ base: "100%", md: "60%", lg: "40%" }}
                          objectFit="cover"
                          src={imgURL}
                          alt={values.title}
                        />
                      </div>
                    )}
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
                          const path =  data.path.replace(/ /g, '%20');
                          console.log(
                            `${SUPABASE_STORAGE}/profileImage/${path}`
                          );
                          //@ts-ignore
                          // setFileName(e.target.value);
                          setImgURL(
                            `${SUPABASE_STORAGE}/profileImage/${path}`
                          );
                          setFieldValue(
                            "main_image",
                            `${SUPABASE_STORAGE}/profileImage/${path}`
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
                      name="publishedAt"
                      type="datetime-local"
                      placeholder={"Title of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.publishedAt}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.publishedAt && touched.publishedAt && (
                        <Text variant="input-error-text">
                          {errors.publishedAt}
                        </Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Tag(Max:5)</Heading>
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
                    <Heading variant="tertiary-heading">Publication</Heading>
                    <Select
                      id="publicationId"
                      name="publicationId"
                      variant="filled"
                      isMulti={false}
                      colorScheme="purple"
                      onChange={(e) => {
                        setFieldValue("publicationId", e);
                      }}
                      options={hashnodePublication}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.publicationId && touched.publicationId && (
                        <Text variant="input-error-text">{errors.publicationId}</Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Canonical URL</Heading>
                    <Input
                      variant={"form-input"}
                      name="originalArticleURL"
                      type="originalArticleURL"
                      placeholder={"Title of the Article"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.originalArticleURL}
                    />
                    <FormLabel
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {errors.originalArticleURL &&
                        touched.originalArticleURL && (
                          <Text variant="input-error-text">
                            {errors.originalArticleURL}
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

export default HashnodeSetting;
