import express from 'express';
import { CreateImageThemeData,readUserImageThemeData,updateUserImageThemeData,deleteUserImageThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Second_Banner_Logo.controller.js';
import { UserAuth } from '../../Middleware/User.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',UserAuth,CreateImageThemeData);
router.get("/:URL_Alies",UserAuth, readUserImageThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",UserAuth, updateUserImageThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",UserAuth, deleteUserImageThemeData);

export default router;