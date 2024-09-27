import * as Yup from "yup";

const passwordRules =
  "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,}$";
// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = (str) => !str || /^\s*$/.test(str);
// Define the maximum file size in bytes (e.g., 5MB)
const FILE_SIZE = 3 * 1024 * 1024;
const MIN_FILE_SIZE = 0.02 * 1024 * 1024;
// Define the allowed file types (e.g., jpeg and png)
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
// Helper function to get the file type from a base64 string
const getProfileFileType = (base64String) => {
  const match = base64String.match(/^data:(.*);base64,/);
  return match ? match[1] : null;
};

// Helper function to get the file size from a base64 string
const getProfileFileSize = (base64String) => {
  const stringLength = base64String.length - "data:image/png;base64,".length;
  const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
  return sizeInBytes;
};
// Helper function to get the file type from a base64 string
const getFileType = (base64String) => {
  const match = base64String.match(/^data:(.*);base64,/);
  return match ? match[1] : null;
};

// Helper function to get the file size from a base64 string
const getFileSize = (base64String) => {
  const stringLength = base64String.length - "data:image/png;base64,".length;
  const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
  return sizeInBytes;
};

export let VCardURLValidateShema = Yup.object({
  URL_Alies: Yup.string().matches(/^[A-Za-z0-9-]*$/, 'Only letters, numbers, and hyphens are allowed.')
    .required("URL_Alies is required!"),
  VCardName: Yup.string()
    .min(4, "Minimum 4 char required!")
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .required("Select Your Category.."),
  FirstName: Yup.string()
    .min(3, "Minimum 3 char required!")
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .required("FirstName is required!"),
  LastName: Yup.string()
    .min(1, "Minimum 1 char required!")
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .required("LastName is required!"),
  Profession: Yup.string()
    .min(10, "Minimum 10 char required!")
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .required("Profession is required!"),
  // Profile: Yup
  // .mixed()
  // .required('An image is required')
  // .test(
  //   'fileSize',
  //   'File too large, maximum size is 2MB',
  //   value => value && value.size <= FILE_SIZE
  // )
  // .test(
  //   'fileFormat',
  //   'Unsupported format, only jpg, jpeg, and png are allowed',
  //   value => value && SUPPORTED_FORMATS.includes(value.type)
  // ),
  ProfileAddress: Yup.string().test(
    "oneImageRequired",
    "You must upload either image1 or image2, but not both.",
    function (value) {
      const { Profile } = this.parent;
      return (Profile && !value) || (!Profile && value) || (!Profile && !value);
    }
  ),
  // Banner: Yup
  // .mixed()
  // .required('An image is required')
  // .test(
  //   'fileSize',
  //   'File too large, maximum size is 2MB',
  //   value => value && value.size <= FILE_SIZE
  // )
  // .test(
  //   'fileFormat',
  //   'Unsupported format, only jpg, jpeg, and png are allowed',
  //   value => value && SUPPORTED_FORMATS.includes(value.type)
  // ),
});
