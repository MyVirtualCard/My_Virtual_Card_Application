import express from 'express';

const router=express.Router();
import { GetUserData,GetAllUserData } from '../Controllers/User.controller.js';
import { UserAuth } from '../Middleware/User.js';


router.get('/data',UserAuth,GetUserData);
router.get('/all-data',GetAllUserData);

export default router;
