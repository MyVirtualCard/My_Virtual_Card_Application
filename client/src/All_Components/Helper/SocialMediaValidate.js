

  
import * as Yup from 'yup';

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = str => !str || /^\s*$/.test(str);  

export let SocialMediaValidateSchema=Yup.object({
  
  WhatsUp:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).min(10,'WhatsApp Number must be 10 digits !').required('WhatsApp Number is required!').max(13,'Invalid WhatsApp Number!'),

}
);


