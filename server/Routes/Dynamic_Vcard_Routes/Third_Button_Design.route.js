import express from 'express';
import { CreateButtonThemeData,readUserButtonThemeData,updateUserButtonThemeData,deleteUserButtonThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Third_Button_Design.controller.js';
import { UserAuth } from '../../Middleware/User.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',UserAuth,CreateButtonThemeData);
router.get("/:URL_Alies",UserAuth, readUserButtonThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",UserAuth, updateUserButtonThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",UserAuth, deleteUserButtonThemeData);

export default router;