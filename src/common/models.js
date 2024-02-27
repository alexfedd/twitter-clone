import * as yup from "yup";

export const postSchema = yup.object().shape({
    content: yup.string().required(),
  });