import * as Yup from 'yup';
// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = str => !str || /^\s*$/.test(str);  

export let InquiryValidateSchema=Yup.object({
  
  Name:Yup.string().min(3,'Min 3 letter required!').required('Name is required!'),

  Email: Yup.string().email('Invalid Email!').required('Email is required!'),
  MobileNumber:Yup.number().notRequired().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => {
        if(value){
            return  !isEmptyOrWhitespace(value)
        }
       return true;
    }
  ).min(10,'Min 10-digit required!'),
  Message: Yup.string()
    .min(15, "Min 15 letter required!")
    .max(500, "Max 500 letter to be allowed!")
    .required("Description is required!"),
}
);
