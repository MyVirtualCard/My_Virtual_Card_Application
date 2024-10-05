import express from 'express';
import { CreateButtonThemeData,readUserButtonThemeData,updateUserButtonThemeData,deleteUserButtonThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Third_Button_Design.controller.js';

import { verifyToken } from '../../Middleware/verifyToken.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',verifyToken,CreateButtonThemeData);
router.get("/:URL_Alies",verifyToken, readUserButtonThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",verifyToken, updateUserButtonThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",verifyToken, deleteUserButtonThemeData);

export default router;