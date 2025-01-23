import express from 'express';
import { CreateTimerThemeData,readUserTimerThemeData,updateUserTimerThemeData,deleteUserTimerThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Seventh_Timer_Theme.controller.js';

import { UserAuth } from '../../Middleware/User.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',UserAuth,CreateTimerThemeData);
router.get("/:URL_Alies",UserAuth, readUserTimerThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",UserAuth, updateUserTimerThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",UserAuth, deleteUserTimerThemeData);

export default router;