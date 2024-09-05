import express from 'express';
import multer from 'multer';
let router=express.Router();


import { PostUserData,GetUserData ,ResendOTP,LoginUser, ReadRegisteredUserSpecificData,UpdateRegisteredUserSpecificData} from '../Controllers/Auth.Controller.js';

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

//Routes
// Register
router.post('/register', upload.single('profile'),PostUserData)
router.get('/register',GetUserData);
//SpecificUser Data
router.get('/register_specific_data/:userName',ReadRegisteredUserSpecificData);
//Update SpecificUser Data:
router.put('/register_specific_data/:id',upload.single('profile'),UpdateRegisteredUserSpecificData);
//Resend OTP
router.post('/resend_OTP',ResendOTP);
// Login
router.post('/login',LoginUser)


export default router;