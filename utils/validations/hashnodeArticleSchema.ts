import * as Yup from "yup";

export const HashnodeArticleSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  tags: Yup.array()
    .required("Tags is required")
    .max(5, "5 tags at most is allowed"),
  main_image: Yup.string().required("Thumbnail is required"),
  publishedAt: Yup.string().required("Published Time is required"),
  publicationId: Yup.object().required("Publication ID is required"),
});
