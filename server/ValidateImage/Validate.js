import yup from 'yup'

// Define a Yup schema for validation
export const imageSchema = yup.object().shape({
  image: yup
    .mixed()
    .required('File is required')
    .test('fileSize', 'File size too large', (value) => value && value.size <= 1024 * 1024 * 3) // 3MB limit
    .test('fileType', 'Unsupported File Format', (value) => {
      return value && ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.mimetype);
    }),
});