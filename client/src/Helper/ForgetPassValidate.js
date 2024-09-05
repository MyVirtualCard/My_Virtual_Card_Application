import * as Yup from 'yup';
export let ForgotEmailValidateSchema=Yup.object({
    email: Yup.string().email('Invalid Email!').required('Email is required!'),
  }
  );