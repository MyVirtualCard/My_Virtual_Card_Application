import express from 'express';
import { CreateVcardThemeData,readUserVcardThemeData,updateUserVcardThemeData,deleteUserVcardThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/First_Vcard_Theme.controller.js';
import { UserAuth } from '../../Middleware/User.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',UserAuth,CreateVcardThemeData);
router.get("/:URL_Alies",UserAuth, readUserVcardThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",UserAuth, updateUserVcardThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",UserAuth, deleteUserVcardThemeData);

export default router;