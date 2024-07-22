import express from 'express';
import { Checkout,PaymentVerification } from '../Controllers/Razorpayment.controller.js';


let router=express.Router();


router.post('/checkout',Checkout);
router.post('/paymentVerification',PaymentVerification);

export default router;