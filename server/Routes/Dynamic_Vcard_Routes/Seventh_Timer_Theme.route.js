import express from 'express';
import { CreateTimerThemeData,readUserTimerThemeData,updateUserTimerThemeData,deleteUserTimerThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Seventh_Timer_Theme.controller.js';

import { verifyToken } from '../../Middleware/verifyToken.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',verifyToken,CreateTimerThemeData);
router.get("/:URL_Alies",verifyToken, readUserTimerThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",verifyToken, updateUserTimerThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",verifyToken, deleteUserTimerThemeData);

export default router;