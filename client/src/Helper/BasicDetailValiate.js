
import * as Yup from 'yup';

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = str => !str || /^\s*$/.test(str);  

export let BasicDetailValidateShema=Yup.object({
  Email:Yup.string().trim().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).required('Email is required!'),
  AlternateEmail:Yup.string().notRequired().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value =>{
  if(value){
    return !isEmptyOrWhitespace(value)
  }
  return true
    } 
  ),
  MobileNumber:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).min(10,'MobileNumber must be 10 digits !').required('MobileNumber is required!').max(10,'Invalid MobileNumber!'),
  AlternateMobileNumber:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => {
      if(value){
        return !isEmptyOrWhitespace(value)
      }
  return true;
    }
  ).min(10,'Alternate MobileNumber must be 10 digits !').max(10,'Invalid Alternate MobileNumber!'),

  Location:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).required('Address is required!'),
  Website_URL:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => {
      if(value){
        return !isEmptyOrWhitespace(value)
      }
  return true;
    }
  ).min(5,'Min 5-letters required!'),

}
);


