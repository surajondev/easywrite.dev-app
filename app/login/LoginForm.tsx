import React from "react";
import {
  Stack,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Center,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { login } from "@/api/Auth";
import { LoginSchema } from "@/utils/validations/loginSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();

  const handleLogin = async (values: any) => {
    const res = await login(values);
    if (res.data) {
      router.push("/dashboard");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => handleLogin(values)}
      validationSchema={LoginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Stack spacing={10} width="100%" padding="4em 4em">
          <Heading variant="secondary-heading">Log in to your account</Heading>
          <Text variant="primary-text" color="gray.400">
            Welcome back to the LekhakAI. Login in to see the magic.
          </Text>
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
            <FormLabel mt={1} display="flex" justifyContent="space-between">
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <FormLabel mt={1} display="flex" justifyContent="space-between">
              {errors.password && touched.password && (
                <Text variant="input-error-text">{errors.password}</Text>
              )}
            </FormLabel>
          </FormControl>
          <Text variant="input-error-text">
            <Link
              href="/forgot-password"
              style={{ textDecoration: "underline" }}
            >
              Forgot Password
            </Link>
          </Text>
          <Text variant="secondary-text">
            New member?, register{" "}
            <Link href="/register" style={{ textDecoration: "underline" }}>
              here
            </Link>
          </Text>
          <Center>
            <Button
              variant="form-button"
              width="100%"
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
          </Center>
        </Stack>
      )}
    </Formik>
  );
};

export default LoginForm;
