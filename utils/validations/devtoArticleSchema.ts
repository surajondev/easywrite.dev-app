import * as Yup from "yup";

export const DevtoArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  tags: Yup.array()
    .required("Tags is required")
    .max(4, "4 tags at most is allowed"),
  main_image: Yup.string().required("Thumbnail is required"),
  published_time: Yup.string().required("Published Time is required"),
  organization_id: Yup.object().required("Organization ID is required"),
});
