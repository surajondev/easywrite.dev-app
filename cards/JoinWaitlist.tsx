import { join } from "@/services/api";
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Formik } from "formik";
import { GetEmailSchema } from "@/utils/validations/getEmailSchema";
import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import { MdEmail } from "react-icons/md";

export const JoinWaitlist = () => {
  const [email, setEmail] = useState<string>("");

  const handleGetEmail = () => {
    join(email);
  };
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => join(values.email)}
      validationSchema={GetEmailSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Stack
          spacing={{ base: 3, md: 6 }}
          direction="column"
          backgroundColor="#222938"
          borderRadius="10px"
          p={{ base: "2em 2em", md: "2em 4em" }}
          justifyContent="center"
          alignItems="center"
          id="join-waitlist"
        >
          <IconContext.Provider value={{ color: "#8B54BD", size: "5em" }}>
            <MdEmail />
          </IconContext.Provider>
          <Heading variant="primary-heading" color="#FFF">
            Join Waitlist
          </Heading>
          <FormControl>
            <FormLabel display="flex" justifyContent="space-between">
              <Text variant="primary-text" color="#FFF">
                Email address
              </Text>
              {errors.email && touched.email && (
                <Text variant="input-error-text">{errors.email}</Text>
              )}
            </FormLabel>
            <Input
              variant={"light-input"}
              name="email"
              type="email"
              placeholder={"Join Waitlist"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </FormControl>
          <Button
            variant="primary-button"
            width="100%"
            onClick={() => handleSubmit()}
          >
            <Text variant="primary-text">Join Waitlist</Text>
          </Button>
        </Stack>
      )}
    </Formik>
  );
};
