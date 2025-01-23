import * as Yup from "yup";

const passwordRules =
  "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,}$";
// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = (str) => !str || /^\s*$/.test(str);
export let RegisterValidateSchema = Yup.object({
  UserName: Yup.string()
    .min(3, "Min 3 letter required!")
    .max(15, "Max length crossed!")
    .required("UserName is required!"),
  FullName: Yup.string()
    .min(4, "Minimum 4 char required!")
    .required("FullName is required!"),
  // lastName: Yup.string().min(1,'Min 1 letter required!').required('LastName is required!').matches(/^[a-zA-Z0-9]+$/, 'This field cannot contain white space and special character!'),
  Email: Yup.string().email("Invalid Email!").required("Email is required!"),
  // MobileNumber: Yup.string().test(
  //   'isEmptyOrWhitespace',
  //   'Content cannot be empty or just whitespace',
  //   value => !isEmptyOrWhitespace(value)
  // ).min(10,'MobileNumber must be 10 digits !').required('Mobile Number is required!'),
  Password: Yup.string()
    .min(5)
    .required("Password is required!")
    .min(8)
    .matches(RegExp("(.*[a-z].*)"), "Lowercase letter required!")
    .matches(RegExp("(.*[A-Z].*)"), "One uppercase letter required!")
    .matches(RegExp("(.*\\d.*)"), "One Number must Required!")
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "Special char required! eg:#,*,$"
    ),
  Terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});
export let ResellerRegisterValidateSchema = Yup.object({
  UserName: Yup.string()
    .min(3, "Min 3 letter required!")
    .max(15, "Max length crossed!")
    .required("UserName is required!"),
  FullName: Yup.string()
    .min(4, "Minimum 4 char required!")
    .required("FullName is required!"),
  // lastName: Yup.string().min(1,'Min 1 letter required!').required('LastName is required!').matches(/^[a-zA-Z0-9]+$/, 'This field cannot contain white space and special character!'),
  Email: Yup.string().email("Invalid Email!").required("Email is required!"),
  MobileNumber: Yup.string().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).min(10,'MobileNumber must be 10 digits !').required('Mobile Number is required!'),
  Password: Yup.string()
    .min(5)
    .required("Password is required!")
    .min(8)
    .matches(RegExp("(.*[a-z].*)"), "Lowercase letter required!")
    .matches(RegExp("(.*[A-Z].*)"), "One uppercase letter required!")
    .matches(RegExp("(.*\\d.*)"), "One Number must Required!")
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "Special char required! eg:#,*,$"
    ),
  Terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});
export let ResellerClientRegisterValidateSchema = Yup.object({
  // Reseller: Yup.string()
  //   .min(3, "Min 3 letter required!")
  //   .max(15, "Max length crossed!")
  //   .required("Reseller is required!"),
  UserName: Yup.string()
    .min(3, "Min 3 letter required!")
    .max(15, "Max length crossed!")
    .required("UserName is required!"),
  FullName: Yup.string()
    .min(4, "Minimum 4 char required!")
    .required("FullName is required!"),
  Email: Yup.string().email("Invalid Email!").required("Email is required!"),
  MobileNumber: Yup.string()
    .test(
      "isEmptyOrWhitespace",
      "Content cannot be empty or just whitespace",
      (value) => !isEmptyOrWhitespace(value)
    )
    .min(10, "MobileNumber must be 10 digits !")
    .required("Mobile Number is required!"),
  Password: Yup.string()
    .min(5)
    .required("Password is required!")
    .min(8)
    .matches(RegExp("(.*[a-z].*)"), "Lowercase letter required!")
    .matches(RegExp("(.*[A-Z].*)"), "One uppercase letter required!")
    .matches(RegExp("(.*\\d.*)"), "One Number must Required!")
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "Special char required! eg:#,*,$"
    ),
});

export let LoginValidateSchema = Yup.object({
  // MobileNumber: Yup.string().required('Mobile Number is required!'),
  Email: Yup.string().email("Invalid Email!").required("Email is required!"),
  Password: Yup.string()
    .min(5)
    .required("Password is required!")
    .min(8)
    .matches(RegExp("(.*[a-z].*)"), "Lowercase letter required!")
    .matches(RegExp("(.*[A-Z].*)"), "One uppercase letter required!")
    .matches(RegExp("(.*\\d.*)"), "One Number must Required!")
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "Special char required! eg:#,*,$"
    ),
});
export let Reseller_Client_Login_ValidateSchema = Yup.object({
  UserName: Yup.string().required("UserName is required!"),
});
export let SAdminLoginValidateSchema = Yup.object({
  email: Yup.string().email("Invalid Email!").required("Email is required!"),
  // mobileNumber: Yup.string().required('Mobile Number is required!'),
  password: Yup.string()
    .min(5)
    .required("Password is required!")
    .min(8)
    .matches(RegExp("(.*[a-z].*)"), "Lowercase letter required!")
    .matches(RegExp("(.*[A-Z].*)"), "One uppercase letter required!")
    .matches(RegExp("(.*\\d.*)"), "One Number must Required!")
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "Special char required! eg:#,*,$"
    ),
});
