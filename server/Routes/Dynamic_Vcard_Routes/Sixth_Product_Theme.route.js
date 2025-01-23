import express from 'express';
import { CreateProductThemeData,readUserProductThemeData,updateUserProductThemeData,deleteUserProductThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Sixth_Product_Theme.controller.js';

import { UserAuth } from '../../Middleware/User.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',UserAuth,CreateProductThemeData);
router.get("/:URL_Alies",UserAuth, readUserProductThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",UserAuth, updateUserProductThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",UserAuth, deleteUserProductThemeData);

export default router;