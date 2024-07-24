import express from 'express';
import { CreateOrder,VerifyPayment,readSpecificUserAllData } from '../Controllers/Razorpayment.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();


router.post('/create-order',verifyToken,CreateOrder);
router.post('/verify-payment',verifyToken,VerifyPayment);
 //Read Specific user all Data:
 router.get("/specificUser/:userName", verifyToken, readSpecificUserAllData);

export default router;