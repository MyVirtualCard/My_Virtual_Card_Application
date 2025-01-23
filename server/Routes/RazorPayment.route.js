import express from 'express';
import { CreateOrder,VerifyPayment,readSpecificUserAllData,readUserAllData} from '../Controllers/RazorPayment.controller.js';
import { UserAuth } from "../Middleware/User.js";
let router=express.Router();


router.post('/create-order',UserAuth,CreateOrder);
router.post('/verify-payment',UserAuth,VerifyPayment);
 //Read Specific user all Data:
 router.get("/specificUser/:UserName", UserAuth, readSpecificUserAllData);
 router.get("/AllData", readUserAllData);
 
export default router;