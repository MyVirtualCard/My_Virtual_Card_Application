import * as Yup from 'yup';
// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = str => !str || /^\s*$/.test(str);  

export let AppoinmentValidateSchema=Yup.object({
  
  FullName:Yup.string().min(3,'Min 3 letter required!').required('FullName is required!'),

  Date: Yup.date().required('Date is required!'),
  MobileNumber:Yup.number().required('MobileNumber is required!').test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => {
        if(value){
            return  !isEmptyOrWhitespace(value)
        }
       return true;
    }
  ).min(10,'Min 10-digit required!'),
  Time: Yup.string().min(7,'Invalid Time')
    .required("Time is required!"),
}
);
