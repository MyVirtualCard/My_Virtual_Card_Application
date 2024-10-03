import express from 'express';
import { CreateVcardThemeData,readUserVcardThemeData,updateUserVcardThemeData,deleteUserVcardThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/First_Vcard_Theme.controller.js';

import { verifyToken } from '../../Middleware/verifyToken.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',verifyToken,CreateVcardThemeData);
router.get("/:URL_Alies",verifyToken, readUserVcardThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",verifyToken, updateUserVcardThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",verifyToken, deleteUserVcardThemeData);

export default router;