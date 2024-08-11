
import * as Yup from 'yup';

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = str => !str || /^\s*$/.test(str);  

export let BasicDetailValidateShema=Yup.object({
  
  FirstName:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).min(3,'Min 3-char required!').required('FirstName is required!'),
  LastName:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).min(1,'Min 1-char required!').required('LastName is required!'),
  Email:Yup.string().test(
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
  ).min(10,'Min 10-digit required!').required('MobileNumber is required!'),
  Location:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).required('Location is required!'),
  Profession:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).required('Profession is required!'),

}
);


