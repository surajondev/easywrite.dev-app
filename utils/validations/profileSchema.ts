import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("First Name is required"),
  email: Yup.string().required("email is required"),
  devto_username: Yup.string().required("dev.to username is required"),
});
