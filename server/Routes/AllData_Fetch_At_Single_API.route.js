import express from "express";

let router = express.Router();
import AboutDetails from "../Model/About.model.js";
import BankModel from "../Model/Bank.model.js";
import BasicDetails from "../Model/BasicDetail.model.js";
import GalleryModel from "../Model/Gallery.model.js";
import UPIModel from "../Model/UPI.model.js";
import currentPlan from "../Model/Plan.model.js";
import PopupBannerModel from "../Model/PopupBanner.model.js";
import ProductModel from "../Model/Products.model.js";
import ServiceData from "../Model/Services.model.js";
import SocialMediaModel from "../Model/SocialMedia.model.js";
import TestimonialModel from "../Model/Testimonial.model.js";
import Current_VCardTemplate from "../Model/VCardTemplate.model.js";
import Vcard_URL from "../Model/Vcard_URL.model.js";
import VideoModel from "../Model/Video.model.js";
import FeedbackModel from "../Model/Feedback.model.js";
import BussinessModel from "../Model/BussinessHour.model.js";
import GoogleMapModel from "../Model/GoogleMap.model.js";
import ManageContentModel from "../Model/ManageContent.model.js";
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
      result["BussinessModel"] = WorkingDayDetails_data;
    }

    //Gallery
    let GalleryDetails_data = await GalleryModel.find({ URL_Alies: URL_Alies });

    if (!GalleryDetails_data) {
      res.status(400).json({ message: "Gallery Data Not Found" });
    } else {
      result["GalleryDetails"] = GalleryDetails_data;
    }
    //Video
    let Videoetails_data = await VideoModel.find({ URL_Alies: URL_Alies });

    if (!Videoetails_data) {
      res.status(400).json({ message: "Video Data Not Found" });
    } else {
      result["VideoDetails"] = Videoetails_data;
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
    let VCardTemplateDetails_data = await Current_VCardTemplate.find({
      URL_Alies: URL_Alies,
    });

    if (!VCardTemplateDetails_data) {
      res.status(400).json({ message: "VCard_Template Data Not Found" });
    } else {
      result["VCardTemplateDetails"] = VCardTemplateDetails_data;
    }

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
