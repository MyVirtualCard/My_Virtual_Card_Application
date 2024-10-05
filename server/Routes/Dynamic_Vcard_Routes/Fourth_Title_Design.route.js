import express from 'express';
import { CreateTitleThemeData,readUserTitleThemeData,updateUserTitleThemeData,deleteUserTitleThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Fourth_Title_Design.controller.js';

import { verifyToken } from '../../Middleware/verifyToken.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',verifyToken,CreateTitleThemeData);
router.get("/:URL_Alies",verifyToken, readUserTitleThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",verifyToken, updateUserTitleThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",verifyToken, deleteUserTitleThemeData);

export default router;