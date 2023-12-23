import React, { useState } from "react";
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
  Avatar,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { register } from "@/services/api";
import { toast } from "react-toastify";
import { RegisterSchema } from "@/utils/validations/registerSchema";
import { supabase } from "@/lib/supabase";
import { SUPABASE_STORAGE } from "@/utils/constants/supabase";

const SignUpForm = () => {
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>();

  const handleSignin = async (values: any) => {
    // console.log(values);
    const data = await register(values);
    if (data) {
      toast.success("User Register!");
      setSubmitted(true);
    }
  };

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        profile_img: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        email: "",
        password: "",
        devto_username: "",
      }}
      onSubmit={(values) => handleSignin(values)}
      validationSchema={RegisterSchema}
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
        <Stack spacing={10} width="100%" padding="4em 4em">
          <Heading variant="secondary-heading">Create a new account</Heading>
          <Text variant="primary-text" color="gray.400">
            It's not difficult, you just have to enter some data and it's done
            right away!
          </Text>
          {!isSubmitted && (
            <Stack spacing={10}>
              <FormControl>
                <Heading variant="tertiary-heading">Full Name</Heading>
                <Flex gap="2em">
                  <Input
                    variant={"form-input"}
                    name="first_name"
                    type="text"
                    placeholder={"John"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                  <Input
                    variant={"form-input"}
                    name="last_name"
                    type="text"
                    placeholder={"Doe"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                  />
                </Flex>
                <FormLabel display="flex" justifyContent="space-between">
                  {errors.first_name && touched.first_name && (
                    <Text variant="input-error-text">{errors.first_name}</Text>
                  )}
                </FormLabel>
              </FormControl>
              <Stack>
                <Heading variant="tertiary-heading">Profile Image</Heading>
                <Flex gap={5}>
                  <Avatar
                    size={"md"}
                    src={
                      values.profile_img
                    }
                  />
                  <FormControl>
                    <Input
                      variant={"form-input-file"}
                      name="profile_img"
                      type="file"
                      onChange={async (e) => {
                        const timestamp = Date.now();
                        const { data, error } = await supabase.storage
                          .from("profileImage")
                          //@ts-ignore
                          .upload(`${timestamp}-${e.target.files[0].name}`, e.target.files[0], {
                            cacheControl: "3600",
                            upsert: false,
                          });
                        if(error){
                          console.log(error)
                          return
                        }
                        console.log(`${SUPABASE_STORAGE}profileImage/${data.path}`)
                        //@ts-ignore
                        setFileName(e.target.value)
                        setFieldValue("profile_img", `${SUPABASE_STORAGE}profileImage/${data.path}`)
                      }}
                      onBlur={handleBlur}
                      value={fileName}
                    />
                    <FormLabel display="flex" justifyContent="space-between">
                      {errors.email && touched.email && (
                        <Text variant="input-error-text">{errors.email}</Text>
                      )}
                    </FormLabel>
                  </FormControl>
                </Flex>
              </Stack>
              <FormControl>
                <Heading variant="tertiary-heading">Email Address</Heading>
                <Input
                  variant={"form-input"}
                  name="email"
                  type="email"
                  placeholder={"johndoe@email.com"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <FormLabel display="flex" justifyContent="space-between">
                  {errors.email && touched.email && (
                    <Text variant="input-error-text">{errors.email}</Text>
                  )}
                </FormLabel>
              </FormControl>
              <FormControl>
                <Heading variant="tertiary-heading">Password</Heading>
                <Input
                  variant={"form-input"}
                  name="password"
                  type="password"
                  placeholder={"*******"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <FormLabel display="flex" justifyContent="space-between">
                  {errors.password && touched.password && (
                    <Text variant="input-error-text">{errors.password}</Text>
                  )}
                </FormLabel>
              </FormControl>
              <FormControl>
                <Heading variant="tertiary-heading">Dev.to Username</Heading>
                <Input
                  variant={"form-input"}
                  name="devto_username"
                  type="text"
                  placeholder={"johndoe"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.devto_username}
                />
                <FormLabel display="flex" justifyContent="space-between">
                  {errors.devto_username && touched.devto_username && (
                    <Text variant="input-error-text">
                      {errors.devto_username}
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
                  Register
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

export default SignUpForm;
