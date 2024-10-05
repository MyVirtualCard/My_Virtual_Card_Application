import express from 'express';
import { CreateImageThemeData,readUserImageThemeData,updateUserImageThemeData,deleteUserImageThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Second_Banner_Logo.controller.js';

import { verifyToken } from '../../Middleware/verifyToken.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',verifyToken,CreateImageThemeData);
router.get("/:URL_Alies",verifyToken, readUserImageThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",verifyToken, updateUserImageThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",verifyToken, deleteUserImageThemeData);

export default router;