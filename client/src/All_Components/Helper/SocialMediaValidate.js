import toast from "react-hot-toast";

//validate registerpage all data:
export const SocialMediaValidate = async(values) => {
 const error =WhatsUpNumberVerify({}, values);
  return error;
};



//Validate mobileNumber:
function WhatsUpNumberVerify(error = {}, values) {
    if (!values.WhatsUp) {
      error.WhatsUp = toast.error("WhatsUp Number Required!");
    } else if (values.WhatsUp.includes(" ")) {
      error.WhatsUp = toast.error("Wrong WhatsUp Number!..Space not been allow!");
    } else if (values.WhatsUp.length < 13) {
      error.WhatsUp = toast.error("WhatsUp Number must be 13 digits with Country code !");
    } else if (values.WhatsUp.length > 13) {
      error.WhatsUp = toast.error("Invalid WhatsUp Number!");
    }
    return error;
  }