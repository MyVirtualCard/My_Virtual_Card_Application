import * as Yup from "yup";

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = (str) => !str || /^\s*$/.test(str);
// Define the maximum file size in bytes (e.g., 5MB)
const FILE_SIZE = 2 * 1024 * 1024;
const MIN_FILE_SIZE = 0.02 * 1024 * 1024;
// Helper function to get the file type from a base64 string
const getProductFileType = (base64String) => {
  const match = base64String.match(/^data:(.*);base64,/);
  return match ? match[1] : null;
};

// Helper function to get the file size from a base64 string
const getProductFileSize = (base64String) => {
  const stringLength = base64String.length - "data:image/png;base64,".length;
  const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
  return sizeInBytes;
};
// Define the allowed file types (e.g., jpeg and png)
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export let UPIDetailValidateShema = Yup.object({
  gpay: Yup.string()
    .trim()
    .test(
      'isEmptyOrWhitespace',
      'Content cannot be empty or just whitespace',
      value => {
          if(value){
              return  !isEmptyOrWhitespace(value)
          }
         return true;
      }
    )
    .min(10, "Min 10-Digits required!").notRequired(),
  paytm: Yup.string()
    .trim()
    .test(
      'isEmptyOrWhitespace',
      'Content cannot be empty or just whitespace',
      value => {
          if(value){
              return  !isEmptyOrWhitespace(value)
          }
         return true;
      }
    )
    .min(10, "Min 10-Digits required!")
    .notRequired(),
  phonepay: Yup.string()
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
    .min(10, "Min 10-Digits required!"),
  UPI_Type: Yup.string()
    .min(4, "Minimum 4 char required!")
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .required("Select Your UPI Type..."),
    QRCodeImage: Yup.mixed()
    .required('QRCode Image is required!')
    .test("fileSize", "File size is too large..Max 2mb Allowed", (value) => {
      if (value) {
        return value && getProductFileSize(value) <= FILE_SIZE;
      }
      return true;
    })
    .test(
      "fileSize",
      "File size is too small..Min 20kb required!",
      (value) => {
        if (value) {
          return value && getProductFileSize(value) >= MIN_FILE_SIZE;
        }
        return true;
      }
    )
    .test("fileFormat", "Unsupported file format", (value) => {
      if (value) {
        return value && SUPPORTED_FORMATS.includes(getProductFileType(value));
      }
      return true;
    }),
});
