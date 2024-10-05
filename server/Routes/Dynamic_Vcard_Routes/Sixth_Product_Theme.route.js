import express from 'express';
import { CreateProductThemeData,readUserProductThemeData,updateUserProductThemeData,deleteUserProductThemeData } from '../../Controllers/Dynamic_Vcard_Controllers/Sixth_Product_Theme.controller.js';

import { verifyToken } from '../../Middleware/verifyToken.js';
let router=express.Router();

//Routes:
router.post('/:URL_Alies',verifyToken,CreateProductThemeData);
router.get("/:URL_Alies",verifyToken, readUserProductThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies",verifyToken, updateUserProductThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",verifyToken, deleteUserProductThemeData);

export default router;