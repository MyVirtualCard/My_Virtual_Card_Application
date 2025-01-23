import express from "express";

let router = express.Router();
import VcardThemeModel from "../../Models/Dynamic_Vcard_Models/First_Vcard_Theme.model.js";
import Dynmaic_Logo_Banner_Model from "../../Models/Dynamic_Vcard_Models/Second_Banner_Logo.model.js";
import Dynamic_Button_Icon_Model from "../../Models/Dynamic_Vcard_Models/Third_Button_Design.model.js";
import Dynamic_Title_Model from "../../Models/Dynamic_Vcard_Models/Fourth_Title_Design.model.js";
import ServiceThemeModel from "../../Models/Dynamic_Vcard_Models/Fifth_Service_Theme.model.js";
import ProductThemeModel from "../../Models/Dynamic_Vcard_Models/Sixth_Product_Theme.model.js";
import Dynamic_Timer_Theme_Model from "../../Models/Dynamic_Vcard_Models/Seventh_Timer_Theme.model.js";
import TestimonialThemeModel from "../../Models/Dynamic_Vcard_Models/Eight_Testimonial.model.js";
import AppoinmentThemeModel from "../../Models/Dynamic_Vcard_Models/Nine_Appoinment.model.js";
import FeedbackThemeModel from "../../Models/Dynamic_Vcard_Models/Tenth_Feedback.model.js";
router.get("/style/:URL_Alies", async (req, res) => {
  try {
    let URL_Alies = req.params.URL_Alies;
    let result = {};

    //About
    let getVcardThemeData = await VcardThemeModel.find({ URL_Alies: URL_Alies });

    if (!getVcardThemeData) {
      res.status(400).json({ message: "Vcard Theme Data Not Found" });
    } else {
      result["FirstVcardTheme"] = getVcardThemeData;
    }

    //Bank
    let SecondImagesTheme = await Dynmaic_Logo_Banner_Model.find({ URL_Alies: URL_Alies });

    if (!SecondImagesTheme) {
      res.status(400).json({ message: "Images Theme Data Not Found" });
    } else {
      result["SecondImagesTheme"] = SecondImagesTheme;
    }

    //Basic Details
    let ThirdButtonTheme = await Dynamic_Button_Icon_Model.find({ URL_Alies: URL_Alies });

    if (!ThirdButtonTheme) {
      res.status(400).json({ message: "Button Theme Data Not Found" });
    } else {
      result["ThirdButtonTheme"] = ThirdButtonTheme;
    }

    //Bussiness Hour
    let FourthTitleTheme = await Dynamic_Title_Model.find({
      URL_Alies: URL_Alies,
    });

    if (!FourthTitleTheme) {
      res.status(400).json({ message: "Title Theme Data Not Found" });
    } else {
      result["FourthTitleTheme"] = FourthTitleTheme;
    }

    //Gallery
    let FifthServiceTheme = await ServiceThemeModel.find({ URL_Alies: URL_Alies });

    if (!FifthServiceTheme) {
      res.status(400).json({ message: "Service Theme Data Not Found" });
    } else {
      result["FifthServiceTheme"] = FifthServiceTheme;
    }
    //Video
    let SixthProductTheme = await ProductThemeModel.find({ URL_Alies: URL_Alies });

    if (!SixthProductTheme) {
      res.status(400).json({ message: "Product Theme Data Not Found" });
    } else {
      result["SixthProductTheme"] = SixthProductTheme;
    }

    // Google Map
    let SeventhTimerTheme = await Dynamic_Timer_Theme_Model.find({ URL_Alies: URL_Alies });

    if (!SeventhTimerTheme) {
      res.status(400).json({ message: "Timer Theme Data Not Found" });
    } else {
      result["SeventhTimerTheme"] = SeventhTimerTheme;
    }

    //ManageDetails
    let EighthTestimonialTheme = await TestimonialThemeModel.find({
      URL_Alies: URL_Alies,
    });

    if (!EighthTestimonialTheme) {
      res.status(400).json({ message: "Testimonial Theme Data Not Found" });
    } else {
      result["EighthTestimonialTheme"] = EighthTestimonialTheme;
    }

    //PopUp Banner
    let NinethAppoinmentTheme = await AppoinmentThemeModel.find({
      URL_Alies: URL_Alies,
    });

    if (!NinethAppoinmentTheme) {
      res.status(400).json({ message: "Appoinment Theme Data Not Found" });
    } else {
      result["NinethAppoinmentTheme"] = NinethAppoinmentTheme;
    }

    let TenthFeedbackTheme = await FeedbackThemeModel.find({
      URL_Alies: URL_Alies,
    });

    if (!TenthFeedbackTheme) {
      res.status(400).json({ message: "Feedback Theme Data Not Found" });
    } else {
      result["TenthFeedbackTheme"] = TenthFeedbackTheme;
    }


    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
