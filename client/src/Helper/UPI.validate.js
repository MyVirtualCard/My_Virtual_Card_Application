import * as Yup from "yup";

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = (str) => !str || /^\s*$/.test(str);

export let UPIDetailValidateShema = Yup.object({
  gpay: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(10, "Min 10-Digits required!")
    .max(10, "Invalid Gpay Number!")
    .required("Gpay is required!"),
    paytm: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(10, "Min 10-Digits required!")
    .max(10, "Invalid Paytm Number!")
    .required("Paytm is required!"),
    phonepay: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      value => {
        if(value){
          return !isEmptyOrWhitespace(value)
        }
    return true;
      }
    )
    .min(10, "Min 10-Digits required!")
    .max(10, "Invalid PhonePay Number!"),
});
