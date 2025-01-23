import express from 'express';
import { CreateServiceThemeData,readUserServiceThemeData,updateUserServiceThemeData,deleteUserServiceThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Fifth_Service_Theme.controller.js';

import { UserAuth } from '../../Middleware/User.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',UserAuth,CreateServiceThemeData);
router.get("/:URL_Alies",UserAuth, readUserServiceThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",UserAuth, updateUserServiceThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",UserAuth, deleteUserServiceThemeData);

export default router;