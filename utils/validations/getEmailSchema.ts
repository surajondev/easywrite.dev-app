import * as Yup from "yup";

export const GetEmailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .email("Must be a valid email"),
});
