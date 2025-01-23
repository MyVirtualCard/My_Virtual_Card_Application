import * as Yup from "yup";

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = (str) => !str || /^\s*$/.test(str);
export let BankDetailValidateShema = Yup.object({
  HolderName: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(3, "Min 3-char required!")
    .required("HolderName is required!"),
    IFSCCode: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(11, "Min 11-alphanumeric code required!")
    .max(12, "Invalid IFSC Code Number!")
    .required("IFSC Code is required!"),
    AccountNumber: Yup.string()
    .trim()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => {
        if (value) {
          return !isEmptyOrWhitespace(value);
        }
        return true;
      }
    )
    .min(11, "Min 11-alphanumeric code required!")
    .max(14, "Invalid Account Number!").required("AccountNumber is required!"),
    BankName: Yup.string()
    .min(2, "Minimum 4 char required!")
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .required("BankName is required!"),
    
});
