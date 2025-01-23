import express from 'express';
import { Get_SocialMediaDataWithURL, Create_SocialMediaData  , 
    Update_SpecificUserDataWithURL,

    Delete_SpecificUserDataWithURL,
 } from '../Controllers/SocialMedia.controller.js';
 import { UserAuth } from "../Middleware/User.js";
let router=express.Router();


router.get('/:URL_Alies',UserAuth,Get_SocialMediaDataWithURL);
router.post('/:URL_Alies',UserAuth,Create_SocialMediaData);
 //Update Specific user :
router.put("/:URL_Alies", UserAuth, Update_SpecificUserDataWithURL);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", UserAuth, Delete_SpecificUserDataWithURL);


export default router;
