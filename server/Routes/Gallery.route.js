import express from 'express';
import { GetGalleryData, PostGalleryData,readSpecificUserAllData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserAllData,deleteSpecificUserData,deleteSpecificFileData } from '../Controllers/Gallery.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();
import { GalleryUpload } from '../Multer/Gallery_Multer.js';

router.get('/:URL_Alies',verifyToken,GetGalleryData);
router.post('/:URL_Alies',verifyToken,PostGalleryData);
 //Read Specific user all Data:
//  router.get("/specificAll/:userName", verifyToken, readSpecificUserAllData);
 //Read Specific user all Data:
 router.get("/specificID/:id", verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/updateID/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", verifyToken, deleteSpecificUserData);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:filename", verifyToken, deleteSpecificFileData);
export default router;
