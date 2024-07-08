import express from 'express';
import { LoginUser } from '../Controllers/Login.controller.js';
let router=express.Router();


//Login User:
router.post('/login',LoginUser)

export default router;
