import express from 'express';
import { RegisterUser,ResendOTP,ReadRegisteredUserAllData,ForgotPassword,ResetPassword,ReadRegisteredUserSpecificData,DeleteRegisteredUserSpecificData,UpdateRegisteredUserSpecificData } from '../Controllers/Register.controller.js';
// import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();

//Register User:
router.post('/register',RegisterUser);
//Resend OTP
router.post('/resend_OTP',ResendOTP);
//Get all Registered User Data
router.get('/register',ReadRegisteredUserAllData);
//forgot Password:
router.post('/forgot_password',ForgotPassword);
//Reset Passoword:
router.post('/reset_password/:id/:token',ResetPassword);
//Get Specific user Data
router.get('/register/:userName',ReadRegisteredUserSpecificData);
//Update Specific User Data:
router.put('/register/:id',UpdateRegisteredUserSpecificData);
//Delete Specific User Data:
router.delete('/register/:id',DeleteRegisteredUserSpecificData);

export default router;