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
  Box
} from "@chakra-ui/react";
import { Formik } from "formik";
import { markdownToHtml } from "@/utils/renderer/markdownToHtml";

const WriteArticle = () => {
  const [view, setView] = useState('write')

  const handlePublish = async (values: any) => {
  };

    return (
      <Formik
        initialValues={{
          content:"",
        }}
        onSubmit={(values) => handlePublish(values)}
      //   validationSchema={LoginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          
          <Stack spacing={10} width="100%" padding="2em 2em" bg="white" borderRadius="10px" >
            <Flex gap={4}>
            <Button variant="primary-button" onClick={() => setView('write')}>Edit</Button>
            <Button variant="primary-button" onClick={() => setView('preview')}>Preview</Button>
            </Flex>
            {
              view === "write" && 
              <FormControl>
              <Heading variant="tertiary-heading">Write Article Here</Heading>
              <Textarea
                variant={"content-textarea"}
                name="content"
                size="lg"
                placeholder={"write article here...."}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                mt={5}
                height={400}
              />
              <FormLabel mt={1} display="flex" justifyContent="space-between">
                {errors.content && touched.content && (
                  <Text variant="input-error-text">{errors.content}</Text>
                )}
              </FormLabel>
            </FormControl>
            }

            {
              view === "preview" && 
              <PreviewArticle contentMarkdown={values.content}/>
            }
            
          </Stack>
        )}
      </Formik>
    );
    
}

const PreviewArticle = ({contentMarkdown}:any) => {
  const content = markdownToHtml(contentMarkdown);
  return(
            <Box>
              <Heading variant="tertiary-heading">Preview Article Here</Heading>
              <div
			className="hashnode-content-style mx-auto w-full px-5 md:max-w-screen-md"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
              </Box>
  )
}

export default WriteArticle;
