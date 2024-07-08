import toast from "react-hot-toast";

//validate registerpage all data:
export const RegisterValidate = (values) => {
  const error = firstNameVerify({}, values);
  userNameVerify({},values)
  lastNameVerify({}, values);
  emailVerify({}, values);
  passwordVerify({}, values);
  // mobileNumberVerify({}, values);

  return error;
};
//Validate UserName:
function userNameVerify(error = {}, values) {
  if (!values.userName) {
    error.userName = toast.error("userName Required!");
  } else if (values.userName.includes(" ")) {
    error.userName = toast.error("Invalid userName.Spaces not been allow!");
  }
  return error;
}
//Validate First Name:
function firstNameVerify(error = {}, values) {
  if (!values.firstName) {
    error.firstName = toast.error("FirstName Required!");
  } else if (values.firstName.includes(" ")) {
    error.firstName = toast.error("Invalid FirstName!");
  }
  return error;
}
//Validate Last Name:
function lastNameVerify(error = {}, values) {
  if (!values.lastName) {
    error.lastName = toast.error("LastName Required!");
  } else if (values.lastName.includes(" ")) {
    error.lastName = toast.error("Invalid LastName!");
  }
  return error;
}
//Validate Last Name:
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email!");
  }
  // else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.i.test(values.email)) {
  //   error.email = toast.error("Invalid Email Address!");
  // }
  return error;
}
//Validate password:
function mobileNumberVerify(error = {}, values) {
  if (!values.mobileNumber) {
    error.mobileNumber = toast.error("MobileNumber Required!");
  } else if (values.mobileNumber.includes(" ")) {
    error.mobileNumber = toast.error("Wrong MobileNumber!");
  } else if (values.mobileNumber.length <= 9) {
    error.mobileNumber = toast.error("MobileNumber must be 10 digits !");
  } else if (values.mobileNumber.length > 10) {
    error.mobileNumber = toast.error("Invalid MobileNumber!");
  }
  return error;
}

//Validate password:
function passwordVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password!");
  } else if (values.password.length <= 4) {
    error.password = toast.error("Password must be more than 4 letters!");
  }
  //   else if (!specialChars.test(values.password)) {
  //     error.password = toast.error("Password must have special characters(#,*)!");
  //   }
  return error;
}
