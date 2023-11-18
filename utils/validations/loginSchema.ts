import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Must be a valid email"),
  password: Yup.string().required("Password is Required"),
});
