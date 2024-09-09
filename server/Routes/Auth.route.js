import express from 'express';
import multer from 'multer';
let router=express.Router();


import { PostUserData,GetUserData ,ResendOTP,LoginUser,ForgotPassword,ResetPassword, ReadRegisteredUserSpecificData,UpdateRegisteredUserSpecificData,DeleteRegisteredUserSpecificData} from '../Controllers/Auth.Controller.js';

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/Register_Image/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
// Handle multiple file fields
const uploadFields = upload.fields([
  { name: 'profile', maxCount: 1 }, // One profile image
]);
//Routes
// Register
router.post('/register', uploadFields,PostUserData)
router.get('/register',GetUserData);
//SpecificUser Data
router.get('/register_specific_data/:userName',ReadRegisteredUserSpecificData);
//Update SpecificUser Data:
router.put('/register_specific_data/:id',uploadFields,UpdateRegisteredUserSpecificData);
//Delete SpecificUser Data:
router.delete('/register_specific_data/:id',DeleteRegisteredUserSpecificData);
//Resend OTP
router.post('/resend_OTP',ResendOTP);
//forgot Password:
router.post('/forgot_password',ForgotPassword);
//Reset Passoword:
router.post('/reset_password/:id/:token',ResetPassword);
// Login
router.post('/login',LoginUser)


export default router;