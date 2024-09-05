import * as Yup from 'yup';

const passwordRules="^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,}$";
// Custom method to check if the string is empty or contains only whitespace
const isEmptyOrWhitespace = str => !str || /^\s*$/.test(str);  
export let RegisterValidateSchema=Yup.object({
  
  userName:Yup.string().min(3,'Min 3 letter required!').max(10,"Max length crossed!").required('UserName is required!'),
  firstName: Yup.string().min(4,'Minimum 4 char required!').required('FirstName is required!'),
  // lastName: Yup.string().min(1,'Min 1 letter required!').required('LastName is required!').matches(/^[a-zA-Z0-9]+$/, 'This field cannot contain white space and special character!'),
  email: Yup.string().email('Invalid Email!').required('Email is required!'),
  mobileNumber: Yup.number().test(
    'isEmptyOrWhitespace',
    'Content cannot be empty or just whitespace',
    value => !isEmptyOrWhitespace(value)
  ).min(10,'MobileNumber must be 10 digits !').required('Mobile Number is required!'),
  password: Yup.string().min(5).required('Password is required!').min(8)
  .matches(RegExp('(.*[a-z].*)'), 'Lowercase letter required!')
  .matches(RegExp('(.*[A-Z].*)'), 'One uppercase letter required!')
  .matches(RegExp('(.*\\d.*)'), 'One Number must Required!')
  .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Special char required! eg:#,*,$'),
  terms: Yup.boolean()
  .oneOf([true], 'You must accept the terms and conditions')
  .required('You must accept the terms and conditions'),

}
);


export let LoginValidateSchema=Yup.object({
  mobileNumber: Yup.string().min(10,'Min 10 digit required!').required('MobileNumber is required!'),
  // mobileNumber: Yup.string().required('Mobile Number is required!'),
  password: Yup.string().min(5).required('Password is required!').min(8)
  .matches(RegExp('(.*[a-z].*)'), 'Lowercase letter required!')
  .matches(RegExp('(.*[A-Z].*)'), 'One uppercase letter required!')
  .matches(RegExp('(.*\\d.*)'), 'One Number must Required!')
  .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Special char required! eg:#,*,$'),

}
);