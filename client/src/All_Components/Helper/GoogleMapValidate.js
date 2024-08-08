import * as Yup from 'yup';

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = str => !str || /^\s*$/.test(str);  

export let GoogleMapValidateSchema=Yup.object({
  
    GoogleIframe:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => {
        if(value){
            return  !isEmptyOrWhitespace(value)
        }
       return value;
    }
  ),

}
);
