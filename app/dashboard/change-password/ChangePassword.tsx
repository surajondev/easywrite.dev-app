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
import { changePassword } from "@/api/Profile";
import { toast } from "react-toastify";
import { getProfile } from "@/api/Profile";
import { supabase } from "@/lib/supabase";
import { ProfileSchema } from "@/utils/validations/profileSchema";
import Link from "next/link";

const ChangePassword = () => {
  const [isSubmitted, setSubmitted] = useState<boolean>(false);

  const handleUpdateProfile = async (values: any) => {
    const data = await changePassword(values.email);
    if (data) {
      toast.success(data.data);
      console.log(data);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
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
          <Heading variant="secondary-heading">Change Password</Heading>
          <Text variant="primary-text" color="gray.400">
            A password reset email will be sent to your registered email address
            for your security.
          </Text>
          {!isSubmitted && (
            <Stack spacing={10}>
              <FormControl>
                <Heading variant="tertiary-heading">Enter Email</Heading>
                <Flex gap="2em">
                  <Input
                    variant={"form-input"}
                    name="email"
                    type="text"
                    placeholder={"johndoe@email.com"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    width={300}
                  />
                </Flex>
                <FormLabel display="flex" justifyContent="space-between">
                  {errors.email && touched.email && (
                    <Text variant="input-error-text">{errors.email}</Text>
                  )}
                </FormLabel>
              </FormControl>
              <Link href="/dashboard/profile">
                <Text variant="secondary-text" color="brand.300" mt={-5}>
                  Change Profile
                </Text>
              </Link>
              <Center>
                <Button
                  variant="form-button"
                  width="100%"
                  onClick={() => handleSubmit()}
                >
                  Send Email
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

export default ChangePassword;
