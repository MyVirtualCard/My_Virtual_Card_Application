import * as Yup from 'yup';

const passwordRules="^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,}$";

// Define the maximum file size in bytes (e.g., 5MB)
const FILE_SIZE = 3 * 1024 * 1024;
const MIN_FILE_SIZE = 0.2 * 1024 * 1024;
// Define the allowed file types (e.g., jpeg and png)
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
// Helper function to get the file type from a base64 string
const getProfileFileType = base64String => {
  const match = base64String.match(/^data:(.*);base64,/);
  return match ? match[1] : null;
};

// Helper function to get the file size from a base64 string
const getProfileFileSize = base64String => {
  const stringLength = base64String.length - 'data:image/png;base64,'.length;
  const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
  return sizeInBytes;
};
// Helper function to get the file type from a base64 string
const getFileType = base64String => {
  const match = base64String.match(/^data:(.*);base64,/);
  return match ? match[1] : null;
};

// Helper function to get the file size from a base64 string
const getFileSize = base64String => {
  const stringLength = base64String.length - 'data:image/png;base64,'.length;
  const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
  return sizeInBytes;
};

export let VCardURLValidateShema=Yup.object({
  
  URL_Alies:Yup.string().required('URL_Alies is required!'),
  VCardName: Yup.string().min(4,'Minimum 4 char required!').required('VCardName is required!'),
  Description: Yup.string().min(15,'Min 15 letter required!').max(250,'Max 250 letter to be allowed!').required('Description is required!'),
  Profile: Yup.string()
    .required('Profile is required!')
    .test(
      'fileSize',
      'File size is too large..Max 3mb Allowed',
      value => value && getProfileFileSize(value) <= FILE_SIZE
    )
    .test(
      'fileSize',
      'File size is too small..Min 220kb required!',
      value => value && getProfileFileSize(value) >= MIN_FILE_SIZE
    )
    .test(
      'fileFormat',
      'Unsupported file format',
      value => value && SUPPORTED_FORMATS.includes(getProfileFileType(value))
    ),

    Banner: Yup.string()
    .required('Banner is required!')
    .test(
      'fileSize',
    'File size is too large..Max 3mb Allowed',
      value => value && getFileSize(value) <= FILE_SIZE
    )
    .test(
      'fileSize',
      'File size is too small..Min 220kb required!',
      value => value && getProfileFileSize(value) >= MIN_FILE_SIZE
    )
    .test(
      'fileFormat',
      'Unsupported file format',
      value => value && SUPPORTED_FORMATS.includes(getFileType(value))
    ),

}
);


