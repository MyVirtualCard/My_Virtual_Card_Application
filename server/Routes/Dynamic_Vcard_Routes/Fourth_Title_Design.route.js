import express from 'express';
import { CreateTitleThemeData,readUserTitleThemeData,updateUserTitleThemeData,deleteUserTitleThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Fourth_Title_Design.controller.js';

import { UserAuth } from '../../Middleware/User.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',UserAuth,CreateTitleThemeData);
router.get("/:URL_Alies",UserAuth, readUserTitleThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",UserAuth, updateUserTitleThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",UserAuth, deleteUserTitleThemeData);

export default router;