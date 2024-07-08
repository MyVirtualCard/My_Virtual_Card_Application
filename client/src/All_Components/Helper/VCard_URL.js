import toast from "react-hot-toast";

//validate registerpage all data:
export const VCardURLValidate = async(values) => {
 const error = VCardNameVerify({}, values);
 VCardURLVerify({},values);
  OccupationVerify({}, values);
  DescriptionVerify({}, values);
  return error;
};
//Validate URL:
function VCardURLVerify(error = {}, values) {
    if (!values.URL_Alies) {
      error.URL_Alies = toast.error("URL Name Required!");
    }
    if(values.URL_Alies.includes(" ")) {
        error.URL_Alies = toast.error("Spaces not been allow for URL!");
      }
    return error;
  }
//Validate First Name:
function VCardNameVerify(error = {}, values) {
  if (!values.VCardName) {
    error.VCardName = toast.error("VCardName Required!");
  }
  return error;
}
//Validate Last Name:
function OccupationVerify(error = {}, values) {
  if (!values.Occupation) {
    error.Occupation = toast.error("Occupation Required!");
  }
  return error;
}
//Validate Last Name:
function DescriptionVerify(error = {}, values) {
  if(values.Description.includes(undefined)){
    error.Description = toast.error("Description Required!");
  }
 else if (values.Description.length >0 && values.Description.length < 10) {
    error.Description = toast.error(
      "Description must be min 10 letters required!"
    );
  } else if (values.Description.length > 50) {
    error.Description = toast.error("Description allow max 50 letters only!");
  }
  return error;
};


