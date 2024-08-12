import * as Yup from "yup";

const passwordRules =
  "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,}$";

// Define the maximum file size in bytes (e.g., 5MB)
const FILE_SIZE = 3 * 1024 * 1024;
const MIN_FILE_SIZE = 0.02 * 1024 * 1024;
// Define the allowed file types (e.g., jpeg and png)
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
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
  URL_Alies: Yup.string().required("URL_Alies is required!"),
  VCardName: Yup.string()
    .min(4, "Minimum 4 char required!")
    .required("VCardName is required!"),
  Description: Yup.string()
    .min(15, "Min 15 letter required!")
    .max(500, "Max 500 letter to be allowed!")
    .required("Description is required!"),
  Profile: Yup.mixed()
    .notRequired()
    .test("fileSize", "File size is too large..Max 3mb Allowed", (value) => {
      if (value) {
        return value && getProfileFileSize(value) <= FILE_SIZE;
      }
      return true;
    })
    .test(
      "fileSize",
      "File size is too small..Min 20kb required!",
      (value) => {
        if (value) {
          return value && getProfileFileSize(value) >= MIN_FILE_SIZE;
        }
        return true;
      }
    )
    .test("fileFormat", "Unsupported file format", (value) => {
      if (value) {
        return value && SUPPORTED_FORMATS.includes(getProfileFileType(value));
      }
      return true;
    }),
  ProfileAddress: Yup.string().test(
    "oneImageRequired",
    "You must upload either image1 or image2, but not both.",
    function (value) {
      const { Profile } = this.parent;
      return (Profile && !value) || (!Profile && value) || (!Profile && !value);
    }
  ),
  Banner: Yup.mixed()
    .notRequired()
    .test("fileSize", "File size is too large..Max 3mb Allowed", (value) => {
      if (value) {
        return value && getFileSize(value) <= FILE_SIZE;
      }
      return true;
    })
    .test(
      "fileSize",
      "File size is too small..Min 20kb required!",
      (value) => {
        if (value) {
          return value && getProfileFileSize(value) >= MIN_FILE_SIZE;
        }
        return true
      }
    )
    .test("fileFormat", "Unsupported file format", (value) => {
      if (value) {
        return value && SUPPORTED_FORMATS.includes(getFileType(value));
      }
      return true;
    }),
});
