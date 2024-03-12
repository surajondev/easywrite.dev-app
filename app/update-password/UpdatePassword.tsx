import React, { useEffect, useState } from "react";
import {
  Stack,
  Heading,
  Text,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  Center,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { updatePassword } from "@/services/api";
import { toast } from "react-toastify";
import { getProfile } from "@/services/api";
import { supabase } from "@/lib/supabase";
import { ProfileSchema } from "@/utils/validations/profileSchema";
import Link from "next/link";

const UpdatePassword = () => {
  const [isSubmitted, setSubmitted] = useState<boolean>(false);

  const handleUpdateProfile = async (values: any) => {
    const { data, error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      console.log(error);
    }

    if (data) {
      toast.success("Password successfully reset");
      console.log(data);
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        confirm_password: "",
      }}
      onSubmit={(values) => handleUpdateProfile(values)}
      // validationSchema={ProfileSchema}
      enableReinitialize
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
          spacing={10}
          width="100%"
          flexDir="column"
          alignItems="center"
          padding="4em 4em"
        >
          <Heading variant="secondary-heading">Update Password</Heading>
          <Text variant="primary-text" color="gray.400">
            Enter the new password below to update the existing password.
          </Text>
          {!isSubmitted && (
            <Stack spacing={5}>
              <FormControl>
                <Heading variant="tertiary-heading">Enter Password</Heading>
                <Flex gap="2em">
                  <Input
                    variant={"form-input"}
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    width={300}
                  />
                </Flex>
                <FormLabel display="flex" justifyContent="space-between">
                  {errors.password && touched.password && (
                    <Text variant="input-error-text">{errors.password}</Text>
                  )}
                </FormLabel>
              </FormControl>
              <FormControl>
                <Heading variant="tertiary-heading">Confirm Password</Heading>
                <Flex gap="2em">
                  <Input
                    variant={"form-input"}
                    name="confirm_password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_password}
                    width={300}
                  />
                </Flex>
                <FormLabel display="flex" justifyContent="space-between">
                  {errors.confirm_password && touched.confirm_password && (
                    <Text variant="input-error-text">
                      {errors.confirm_password}
                    </Text>
                  )}
                  {touched.confirm_password &&
                    values.confirm_password !== values.password && (
                      <Text variant="input-error-text">
                        Password does not match
                      </Text>
                    )}
                </FormLabel>
              </FormControl>
              <Center>
                <Button
                  variant="form-button"
                  width="100%"
                  onClick={() => handleSubmit()}
                >
                  Reset Password
                </Button>
              </Center>
            </Stack>
          )}
          {isSubmitted && <AlertContainer />}
        </Stack>
      )}
    </Formik>
  );
};

const AlertContainer = () => {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      backgroundColor="brand.300"
    >
      <AlertIcon boxSize="40px" mr={0} color="white" />
      <AlertTitle mt={4} mb={1} fontSize="lg" color="white">
        User Registered!
      </AlertTitle>
      <AlertDescription maxWidth="sm" color="whiteAlpha.600">
        Check your email to confirm it before login.
      </AlertDescription>
    </Alert>
  );
};

export default UpdatePassword;
