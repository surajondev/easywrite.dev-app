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
  Avatar,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { getProfile, updateProfile } from "@/api/Profile";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";
import { ProfileSchema } from "@/utils/validations/profileSchema";
import Link from "next/link";
import { SUPABASE_STORAGE } from "@/utils/constants/supabase";

interface ProfileDataInterface {
  first_name: string;
  last_name: string;
  profile_img: string;
  devto_username: string;
  email: string;
}

const ProfileEditForm = () => {
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<Array<ProfileDataInterface>>();
  const [session, setSession] = useState<any>();
  const [fileName, setFileName] = useState<any>();

  const handleUpdateProfile = async (values: any) => {
    const newValues = {
      session: session,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      profile_img: values.profile_img,
      devto_username: values.devto_username,
    };
    console.log(newValues);
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
    //@ts-ignore
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
        profile_img: profileData
          ? profileData[0].profile_img
          : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
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
        setFieldValue,
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
            and you are good to go!
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
                  {errors.last_name &&
                    !errors.first_name &&
                    touched.last_name && (
                      <Text variant="input-error-text">{errors.last_name}</Text>
                    )}
                </FormLabel>
              </FormControl>
              <Stack>
                <Heading variant="tertiary-heading">Profile Image</Heading>
                <Flex gap={5}>
                  <Avatar size={"md"} src={values.profile_img} />
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
                        setFileName(e.target.value);
                        setFieldValue(
                          "profile_img",
                          `${SUPABASE_STORAGE}/profileImage/${data.path}`
                        );
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
