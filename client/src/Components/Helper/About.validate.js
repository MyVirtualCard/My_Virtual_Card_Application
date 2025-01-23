import * as Yup from "yup";

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = (str) => !str || /^\s*$/.test(str);

export let AboutDetailValidateShema = Yup.object().shape({
  CompanyName: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(10, "Min 10-letters required!")
    .required("CompanyName is required!"),
  Category: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(5, "Min 5-letters required!")
    .required("Category is required!"),
  Year: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(4, "Min 4-letters required!")
    .required("Year is required!"),
  // Bussiness: Yup.string()
  //   .required("Bussiness is required!"),
  Specialities: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(100, "Min 100 letters required!")
    .required("Features is required!"),
});
