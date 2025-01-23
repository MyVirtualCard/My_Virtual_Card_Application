import * as Yup from "yup";
// Define the maximum file size in bytes (e.g., 5MB)
const FILE_SIZE = 3 * 1024 * 1024;
const MIN_FILE_SIZE = 0.02 * 1024 * 1024;
// Define the allowed file types (e.g., jpeg and png)
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
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


export let ProductValidateShema = Yup.object({

    ProductName: Yup.string()
    .min(4, "Minimum 4 char required!")
    .required("ProductName is required!"),
    ProductDescription: Yup.string()
    .min(15, "Min 15 letter's required!")
    .max(2500, "Max 2500 letter to be allowed!")
    .required("ProductDescription is required!"),
    ProductPrice:Yup.number().required('Product price required!'),
    // ProductImage: Yup.mixed()
    // .notRequired()
    // .test("fileSize", "File size is too large..Max 3mb Allowed", (value) => {
    //   if (value) {
    //     return value && getProductFileSize(value) <= FILE_SIZE;
    //   }
    //   return true;
    // })
    // .test(
    //   "fileSize",
    //   "File size is too small..Min 20kb required!",
    //   (value) => {
    //     if (value) {
    //       return value && getProductFileSize(value) >= MIN_FILE_SIZE;
    //     }
    //     return true;
    //   }
    // )
    // .test("fileFormat", "Unsupported file format", (value) => {
    //   if (value) {
    //     return value && SUPPORTED_FORMATS.includes(getProductFileType(value));
    //   }
    //   return true;
    // }),


});
