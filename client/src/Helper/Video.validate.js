import * as Yup from "yup";

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = (str) => !str || /^\s*$/.test(str);

export let VideoDetailValidateShema = Yup.object({
  Video: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(300, "Min 300-letters required!")
    .required("Embed IFrame is required!"),
});
