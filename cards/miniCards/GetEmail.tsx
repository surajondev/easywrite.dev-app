import {
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik } from "formik";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { join } from "@/services/api";
import { GetEmailSchema } from "@/utils/validations/getEmailSchema";

export const GetEmail = ({}) => {
  return (
    <Stack width="100%">
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
          <Box>
            <InputGroup variant="email-pill">
              <Input
                placeholder="Join Waitlist"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <InputRightElement>
                <IconContext.Provider value={{ color: "#8B54BD", size: "2em" }}>
                  <button onClick={() => handleSubmit()}>
                    <BsFillArrowRightCircleFill />
                  </button>
                </IconContext.Provider>
              </InputRightElement>
            </InputGroup>
            {errors.email && touched.email && (
              <Text variant="input-error-text" pl="1em" position="absolute">
                {errors.email}
              </Text>
            )}
          </Box>
        )}
      </Formik>
    </Stack>
  );
};
