import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("First Name is required"),
  profile_img: Yup.string().required("First Name is required"),
  email: Yup.string()
    .required("Email is Required")
    .email("Must be a valid email"),
  password: Yup.string()
    .required("Password is Required")
    .min(7, "Must be greater than 6"),
  devto_username: Yup.string().required("dev.to username is required"),
});
