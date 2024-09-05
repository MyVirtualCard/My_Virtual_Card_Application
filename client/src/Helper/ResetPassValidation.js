import * as Yup from 'yup';

const passwordRules="^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,}$";

export let ResetPassValidateSchema=Yup.object({
    password: Yup.string().min(5).required('Password is required!').min(8)
    .matches(RegExp('(.*[a-z].*)'), 'Lowercase letter required!')
    .matches(RegExp('(.*[A-Z].*)'), 'One uppercase letter required!')
    .matches(RegExp('(.*\\d.*)'), 'One Number must Required!')
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Special char required! eg:#,*,$'),
  
  }
  );