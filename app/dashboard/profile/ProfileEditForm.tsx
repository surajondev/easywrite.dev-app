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
import { updateProfile } from "@/services/api";
import { toast } from "react-toastify";
import { getProfile } from "@/services/api";
import { supabase } from "@/lib/supabase";
import { ProfileSchema } from "@/utils/validations/profileSchema";
import Link from "next/link";

interface ProfileDataInterface {
  first_name: string;
  last_name: string;
  devto_username: string;
  email: string;
}

const ProfileEditForm = () => {
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<Array<ProfileDataInterface>>();
  const [session, setSession] = useState<any>();

  const handleUpdateProfile = async (values: any) => {
    const newValues = {
      session: session,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      devto_username: values.devto_username,
    };
    const data = await updateProfile(newValues);
    if (data) {
      toast.success(data.data);
      console.log(data);
    }
  };

  const fetchProfile = async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    const data = await getProfile(session);
    setSession(session);
    console.log(data);
    setProfileData(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Formik
      initialValues={{
        first_name: profileData ? profileData[0].first_name : "",
        last_name: profileData ? profileData[0].last_name : "",
        devto_username: profileData ? profileData[0].devto_username : "",
        email: profileData ? profileData[0].email : "",
      }}
      onSubmit={(values) => handleUpdateProfile(values)}
      validationSchema={ProfileSchema}
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
          <Heading variant="secondary-heading">Edit your profile</Heading>
          <Text variant="primary-text" color="gray.400">
            Updating your profile is a breeze; simply make the desired changes,
            and you're good to go!
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
              <FormControl>
                <Heading variant="tertiary-heading">Email</Heading>
                <Input
                  variant={"form-input"}
                  name="email"
                  type="text"
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
              <Link href="/dashboard/change-password">
                <Text variant="secondary-text" color="brand.300" mt={-5}>
                  Change password
                </Text>
              </Link>
              <Center>
                <Button
                  variant="form-button"
                  width="100%"
                  onClick={() => handleSubmit()}
                >
                  Update
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

export default ProfileEditForm;
