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
import { tagOption } from "../../topic-generation/DevtoTagOptions";
import { addArticle, updateDevtoArticle } from "@/services/api";
import { supabase } from "@/lib/supabase";
import { SUPABASE_STORAGE } from "@/utils/constants/supabase";
import { DevtoArticleSchema } from "@/utils/validations/devtoArticleSchema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";

const DevtoSetting = ({
  articleData,
  body,
  setArticleId,
  articleId,
  setArticleData,
}: any) => {
  const [fileName, setFileName] = useState<any>(null);
  const [imgURL, setImgURL] = useState<any>(null);
  const [devtoPublication, setDevtoPublication] = useState<any>(null);
  const [timeStampTZ, setTimeStampTZ] = useState<any>(null);

  const router = useRouter();

  const handleSubmit = async (values: any, type: string) => {
    if (body == "new-article") {
      toast.error("There is no article body");
      return;
    }

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
      organization_id: values.organization_id.value,
    };

    const devto_data = {
      type: "scheduled",
      error: "",
    };

    const timestamp = new Date(values.published_time);

    const articleData = {
      user_id: session?.user.id,
      devto: devtoData,
      title: values.title,
      tags_devto: values.tags_label,
      organization_id: values.organization_id,
      devto_time: timestamp,
      body_markdown: body,
      devto_data,
    };
    console.log(articleData);
    const response = await addArticle(articleData);
    if (response) {
      console.log(response[0]);
      setArticleId(response[0].article_id);
      setArticleData(response);
    }
  };

  const handleUpdate = async (values: any) => {
    if (body == "new-article") {
      toast.error("There is no article body");
      return;
    }

    const devtoData = {
      title: values.title,
      body_markdown: body,
      published: true,
      series: values.series,
      canonical_url: values.canonical_url,
      description: values.description,
      main_image: values.main_image,
      tags: values.tags,
      organization_id: values.organization_id.value,
    };

    const devto_data = {
      type: "scheduled",
      error: "",
    };

    const timestamp = new Date(values.published_time);

    const articleData = {
      article_id: articleId,
      title: values.title,
      devto: devtoData,
      tags_devto: values.tags_label,
      organization_id: values.organization_id,
      body_markdown: body,
      devto_time: timestamp,
      devto_data,
    };
    console.log(articleData);
    const response = await updateDevtoArticle(articleData);
    if (response) {
      console.log(response[0]);
      setArticleId(response[0].article_id);
      setArticleData(response);
    }
  };

  const handleFetchDevtoPublication = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from("devto_key")
      .select(
        `
    label,
    organization_id
  `
      )
      .eq("user_id", session?.user.id);

    if (data !== null) {
      const newArray = data[0].organization_id.map((item: any, index: any) => {
        return {
          label: data[0].label[index],
          value: data[0].organization_id[index],
        };
      });

      if (articleData !== "new-article" && articleData[0].devto != null) {
        console.log("devto", articleData[0].devto.main_image);
        setImgURL(articleData[0].devto.main_image);

        const dateObject = new Date(articleData[0].devto_time);

        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Use 24-hour format
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Replace with your desired time zone
        };

        // Format the date as a string using toLocaleString
        //@ts-ignore
        const formattedDateString = dateObject.toLocaleString("en-US", options);
        function convertDateFormat(dateTimeStr: any) {
          // Split the date and time parts
          let [datePart, timePart] = dateTimeStr.split(", ");

          // Reformat the date from DD/MM/YYYY to YYYY-MM-DD
          let [day, month, year] = datePart.split("/");
          let formattedDate = `${year}-${month}-${day}`;

          // Combine the reformatted date with the time
          return `${formattedDate} ${timePart}`;
        }

        const datetime = convertDateFormat(formattedDateString);

        setTimeStampTZ(datetime);
        console.log("toLocale", datetime);
      }

      console.log(newArray);
      setDevtoPublication(newArray);
    }
  };

  useEffect(() => {
    console.log(articleData);
    handleFetchDevtoPublication();
  }, []);

  return (
    <Formik
      initialValues={{
        title:
          articleData !== "new-article" && articleData[0].devto != null
            ? articleData[0].devto.title
            : "",
        tags:
          articleData !== "new-article" && articleData[0].devto != null
            ? articleData[0].devto.tags
            : "",
        tags_label:
          articleData !== "new-article" && articleData[0].devto != null
            ? articleData[0].tags_devto
            : "",
        description:
          articleData !== "new-article" && articleData[0].devto != null
            ? articleData[0].devto.description
            : "",
        series:
          articleData !== "new-article" && articleData[0].devto != null
            ? articleData[0].devto.series
            : "",
        main_image:
          articleData !== "new-article" && articleData[0].devto != null
            ? articleData[0].devto.main_image
            : "",
        organization_id:
          articleData !== "new-article" && articleData[0].devto != null
            ? articleData[0].organization_id
            : "",
        canonical_url:
          articleData !== "new-article" && articleData[0].devto != null
            ? articleData[0].devto.canonical_url
            : "",
        published_time: timeStampTZ ? timeStampTZ : "",
      }}
      enableReinitialize={true}
      //@ts-ignore
      onSubmit={(values, type: string) => handleSubmit(values, type)}
      validationSchema={DevtoArticleSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
      }: {
        values: any;
        errors: any;
        touched: any;
        handleChange: any;
        handleSubmit: any;
        handleBlur: any;
        setFieldValue: any;
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
                <Flex justifyContent="space-between" width="100%">
                  <Box as="span" flex="1" textAlign="left">
                    <Heading variant="tertiary-heading">Dev.to Setting</Heading>
                  </Box>
                  {articleData[0].devto_data != null &&
                    articleData[0].devto_data.error && (
                      <IconContext.Provider
                        value={{
                          color: "red",
                          size: "1.5em",
                          className: "stats-card-icon",
                        }}
                      >
                        <MdErrorOutline />
                      </IconContext.Provider>
                    )}
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack spacing={2}>
                  {articleData[0].devto_data != null &&
                    articleData[0].devto_data.error && (
                      <IconContext.Provider
                        value={{
                          color: "red",
                          size: "1.5em",
                          className: "stats-card-icon",
                        }}
                      >
                        <Text variant="input-error-text">
                          {articleData[0].devto_data.error.response.data.error}
                        </Text>
                      </IconContext.Provider>
                    )}
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
                        //@ts-ignore
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
                          const path = data.path.replace(/ /g, "%20");
                          console.log(
                            `${SUPABASE_STORAGE}/profileImage/${path}`
                          );
                          //@ts-ignore
                          // setFileName(e.target.value);
                          setImgURL(`${SUPABASE_STORAGE}/profileImage/${path}`);
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
                        //@ts-ignore
                        <Text variant="input-error-text">
                          {errors.published_time}
                        </Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Tag(Max:4)</Heading>
                    <Select
                      id="tags_label"
                      name="tags_label"
                      variant="filled"
                      isMulti={true}
                      colorScheme="purple"
                      value={values.tags_label}
                      onChange={(e) => {
                        //@ts-ignore
                        setFieldValue("tags_label", e);
                        console.log(e);
                        //@ts-ignore
                        const tagArr = e.map((item) => item.value);
                        setFieldValue("tags", tagArr);
                      }}
                      //@ts-ignore
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
                        <Text variant="input-error-text"></Text>
                      )}
                    </FormLabel>
                  </FormControl>
                  <FormControl>
                    <Heading variant="tertiary-heading">Organization</Heading>
                    <Select
                      id="organization_id"
                      name="organization_id"
                      variant="filled"
                      isMulti={false}
                      colorScheme="purple"
                      value={values.organization_id}
                      onChange={(e) => {
                        console.log(e);
                        setFieldValue("organization_id", e);
                      }}
                      options={devtoPublication}
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
                  </FormControl>

                  <Center>
                    <Flex gap="1em">
                      <Button
                        variant="secondary-button"
                        bgColor="gray.300"
                        onClick={() => handleSubmit(values, "draft")}
                      >
                        Save Draft
                      </Button>
                      {articleId === null ? (
                        <Button
                          variant="primary-button"
                          onClick={() => handleSubmit(values, "schedule")}
                        >
                          Schedule
                        </Button>
                      ) : (
                        <Button
                          variant="primary-button"
                          onClick={() => handleUpdate(values)}
                        >
                          Update
                        </Button>
                      )}
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
