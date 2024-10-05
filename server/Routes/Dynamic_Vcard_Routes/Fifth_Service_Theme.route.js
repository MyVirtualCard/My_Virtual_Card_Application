import express from 'express';
import { CreateServiceThemeData,readUserServiceThemeData,updateUserServiceThemeData,deleteUserServiceThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Fifth_Service_Theme.controller.js';

import { verifyToken } from '../../Middleware/verifyToken.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',verifyToken,CreateServiceThemeData);
router.get("/:URL_Alies",verifyToken, readUserServiceThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",verifyToken, updateUserServiceThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",verifyToken, deleteUserServiceThemeData);

export default router;