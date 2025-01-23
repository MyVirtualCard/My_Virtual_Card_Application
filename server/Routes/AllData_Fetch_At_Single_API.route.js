import express from "express";

let router = express.Router();
import AboutDetails from "../Models/About.model.js";
import BankModel from "../Models/BankDetail.model.js";
import BasicDetails from "../Models/BasicDetail.model.js";
import GalleryModel from "../Models/Gallery.model.js";
import UPIModel from "../Models/UPI.model.js";
import currentPlan from "../Models/Payment.model.js";
import PopupBannerModel from "../Models/PopupBanner.model.js";
import ProductModel from "../Models/Product.model.js";
import ServiceData from "../Models/Service.model.js";
import SocialMediaModel from "../Models/SocialMedia.model.js";
import TestimonialModel from "../Models/Testimonial.model.js";
import Current_VCardTemplate from "../Models/VCardTemplate.model.js";
import Vcard_URL from "../Models/Vcard_URL.model.js";
import VideoModel from "../Models/Video.model.js";
import Youtube_Video_Model from "../Models/Youtube_Video.model.js";
// import FeedbackModel from "../Models/F";
import BussinessModel from "../Models/BussinessHour.model.js";
import GoogleMapModel from "../Models/GoogleMap.model.js";
import ManageContentModel from "../Models/ManageContent.model.js";
import { UserAuth } from "../Middleware/User.js";
// import InquiryModel from "../Models/";
// import AppoinmentModel from "../Models/App";
router.get("/allDataAPI/:URL_Alies", async (req, res) => {
  try {
    let URL_Alies = req.params.URL_Alies;
    let result = {};

    //About
    let getAboutData = await AboutDetails.find({ URL_Alies: URL_Alies });

    if (!getAboutData) {
      res.status(400).json({ message: "Specific Data Not Found" });
    } else {
      result["AboutDetails"] = getAboutData;
    }

    //Bank
    let getBankData = await BankModel.find({ URL_Alies: URL_Alies });

    if (!getBankData) {
      res.status(400).json({ message: "Specific Data Not Found" });
    } else {
      result["BankDetails"] = getBankData;
    }

    //Basic Details
    let getSpecificData = await BasicDetails.find({ URL_Alies: URL_Alies });

    if (!getSpecificData) {
      res.status(400).json({ message: "Specific Data Not Found" });
    } else {
      result["BasicDetails"] = getSpecificData;
    }

    //Bussiness Hour
    let WorkingDayDetails_data = await BussinessModel.find({
      URL_Alies: URL_Alies,
    });

    if (!WorkingDayDetails_data) {
      res.status(400).json({ message: "Bussiness Hour Data Not Found" });
    } else {
      result["BussinessDetails"] = WorkingDayDetails_data;
    }

    //Gallery
    let GalleryDetails_data = await GalleryModel.find({ URL_Alies: URL_Alies });

    if (!GalleryDetails_data) {
      res.status(400).json({ message: "Gallery Data Not Found" });
    } else {
      result["GalleryDetails"] = GalleryDetails_data;
    }
      //Youtube Video
      let Youtube_Video_data = await Youtube_Video_Model.find({ URL_Alies: URL_Alies });

      if (!Youtube_Video_data) {
        res.status(400).json({ message: "Youtube Video Not Found" });
      } else {
        result["Youtube_Videos"] = Youtube_Video_data;
      }
  
    //Video
    let Local_Video_data = await VideoModel.find({ URL_Alies: URL_Alies });

    if (!Local_Video_data) {
      res.status(400).json({ message: "Local Video Not Found" });
    } else {
      result["Local_Videos"] = Local_Video_data;
    }

    // Google Map
    let GoogleMap_data = await GoogleMapModel.find({ URL_Alies: URL_Alies });

    if (!GoogleMap_data) {
      res.status(400).json({ message: "GoogleMap Data Not Found" });
    } else {
      result["GoogleMapDetails"] = GoogleMap_data;
    }

    //ManageDetails
    let getManageContentData = await ManageContentModel.find({
      URL_Alies: URL_Alies,
    });

    if (!getManageContentData) {
      res.status(400).json({ message: "Manage Content Data Not Found" });
    } else {
      result["ManageContentDetails"] = getManageContentData;
    }

    //PopUp Banner
    let PopUpBannerDetails_data = await PopupBannerModel.find({
      URL_Alies: URL_Alies,
    });

    if (!PopUpBannerDetails_data) {
      res.status(400).json({ message: "PopUpBanner Data Not Found" });
    } else {
      result["PopupBannerDetails"] = PopUpBannerDetails_data;
    }

    //ProductData
    let ProductDetails_data = await ProductModel.find({ URL_Alies: URL_Alies });

    if (!ProductDetails_data) {
      res.status(400).json({ message: "Product Data Not Found" });
    } else {
      result["ProductDetails"] = ProductDetails_data;
    }

    //ServiceData
    let ServiceDetails_data = await ServiceData.find({ URL_Alies: URL_Alies });

    if (!ServiceDetails_data) {
      res.status(400).json({ message: "Service Data Not Found" });
    } else {
      result["ServiceDetails"] = ServiceDetails_data;
    }

    //SocialMedia

    let SocialMediaDetails_data = await SocialMediaModel.find({
      URL_Alies: URL_Alies,
    });

    if (!SocialMediaDetails_data) {
      res.status(400).json({ message: "SocialMedia Data Not Found" });
    } else {
      result["SocialMediaDetails"] = SocialMediaDetails_data;
    }

    //Testimonial

    let TestimonialDetails_data = await TestimonialModel.find({
      URL_Alies: URL_Alies,
    });

    if (!TestimonialDetails_data) {
      res.status(400).json({ message: "Testimonial Data Not Found" });
    } else {
      result["TestimonialDetails"] = TestimonialDetails_data;
    }

    //UPI Payment

    let UPIDetails_data = await UPIModel.find({
      URL_Alies: URL_Alies,
    });

    if (!UPIDetails_data) {
      res.status(400).json({ message: "UPIDetails_data Data Not Found" });
    } else {
      result["UPIDetails"] = UPIDetails_data;
    }

    //VCardURL
    let getURLData = await Vcard_URL.find({ URL_Alies: URL_Alies });

    if (!getURLData) {
      res.status(400).json({ message: "url Data Not Found" });
    } else {
      result["VcardURLDetails"] = getURLData;
    }

    //VCard Template
    // let VCardTemplateDetails_data = await Current_VCardTemplate.find({
    //   URL_Alies: URL_Alies,
    // });

    // if (!VCardTemplateDetails_data) {
    //   res.status(400).json({ message: "VCard_Template Data Not Found" });
    // } else {
    //   result["VCardTemplateDetails"] = VCardTemplateDetails_data;
    // }

    // let QRCodeDetails_data = await QRCodeModel.find({    URL_Alies: URL_Alies});

    // if (!QRCodeDetails_data) {
    //   res.status(400).json({ message: "QRCode Data Not Found" });
    // } else {
    //   result["QRCodeModel"] = QRCodeDetails_data;
    // }

    // let PlanDetails_data = await currentPlan.find({
    //   URL_Alies: URL_Alies,
    // });

    // if (!PlanDetails_data) {
    //   res.status(400).json({ message: "Plan Data Not Found" });
    // } else {
    //   result["currentPlan"] = PlanDetails_data;
    // };

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
