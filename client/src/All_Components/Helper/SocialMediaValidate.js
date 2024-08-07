// import toast from "react-hot-toast";

// //validate registerpage all data:
// export const SocialMediaValidate = async(values) => {
//  const error =WhatsUpNumberVerify({}, values);
//   return error;
// };



// //Validate mobileNumber:
// function WhatsUpNumberVerify(error = {}, values) {
//     if (!values.WhatsUp) {
//       error.WhatsUp = toast.error("WhatsUp Number Required!");
//     } else if (values.WhatsUp.includes(" ")) {
//       error.WhatsUp = toast.error("Wrong WhatsUp Number!..Space not been allow!");
//     } else if (values.WhatsUp.length < 13) {
//       error.WhatsUp = toast.error("WhatsUp Number must be 13 digits with Country code !");
//     } else if (values.WhatsUp.length > 13) {
//       error.WhatsUp = toast.error("Invalid WhatsUp Number!");
//     }
//     return error;
//   }


  
import * as Yup from 'yup';

// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = str => !str || /^\s*$/.test(str);  

export let SocialMediaValidateSchema=Yup.object({
  
  WhatsUp:Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).min(13,'WhatsUp Number must be 13 digits with Country code !').required('WhatsUp is required!').max(13,'Invalid WhatsUp Number!'),

}
);


