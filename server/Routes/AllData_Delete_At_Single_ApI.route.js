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
import { verifyToken } from "../Middleware/verifyToken.js";
import InquiryModel from "../Model/Inquiry.model.js";
import TermConditionModel from "../Model/Terms&Condition.model.js";
import PrivacyPolicyModel from "../Model/PrivacyPolicy.model.js";
import AppoinmentModel from "../Model/Appoinment.model.js";
router.delete(
  "/all_Data_Delete_API/:URL_Alies",
  verifyToken,
  async (req, res) => {
    try {
      let URL_Alies = req.params.URL_Alies;
      let result = {};

      //About
      let getAboutData = await AboutDetails.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["AboutDetails"] = getAboutData;

      //Bank
      let getBankData = await BankModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["BankDetails"] = getBankData;

      //Basic Details
      let getSpecificData = await BasicDetails.findOneAndDelete({
        URL_Alies: URL_Alies,
      });

      result["BasicDetails"] = getSpecificData;

      //Bussiness Hour
      let WorkingDayDetails_data = await BussinessModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["BussinessDetails"] = WorkingDayDetails_data;

      //Gallery
      let GalleryDetails_data = await GalleryModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["GalleryDetails"] = GalleryDetails_data;

      //Video
      let Videoetails_data = await VideoModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["VideoDetails"] = Videoetails_data;

      // Google Map
      let GoogleMap_data = await GoogleMapModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["GoogleMapDetails"] = GoogleMap_data;

      //ManageDetails
      let getManageContentData = await ManageContentModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["ManageContentDetails"] = getManageContentData;

      //PopUp Banner
      let PopUpBannerDetails_data = await PopupBannerModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["PopupBannerDetails"] = PopUpBannerDetails_data;

      //ProductData
      let ProductDetails_data = await ProductModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["ProductDetails"] = ProductDetails_data;

      //ServiceData
      let ServiceDetails_data = await ServiceData.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["ServiceDetails"] = ServiceDetails_data;

      //SocialMedia

      let SocialMediaDetails_data = await SocialMediaModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["SocialMediaDetails"] = SocialMediaDetails_data;

      //Testimonial

      let TestimonialDetails_data = await TestimonialModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["TestimonialDetails"] = TestimonialDetails_data;

      //UPI Payment

      let UPIDetails_data = await UPIModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["UPIDetails"] = UPIDetails_data;

      //VCardURL
      let getURLData = await Vcard_URL.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["VcardURLDetails"] = getURLData;

      //VCard Template
      let VCardTemplateDetails_data =
        await Current_VCardTemplate.findOneAndDelete({
          URL_Alies: URL_Alies,
        });
      result["VCardTemplateDetails"] = VCardTemplateDetails_data;

      //Feedback
      let FeedbackDetails_data = await FeedbackModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["FeedbackDetails"] = FeedbackDetails_data;

      //Inquiry
      let InquiryDetails_data = await InquiryModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["InquiryDetails"] = InquiryDetails_data;
      //Appoinment
      let AppinmentDetails = await AppoinmentModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["AppinmentDetails"] = AppinmentDetails;
      
      let PlanDetails_data = await currentPlan.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["currentPlan"] = PlanDetails_data;

      let PrivacyPolicy_data = await PrivacyPolicyModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["PrivacyPolicyModel"] = PrivacyPolicy_data;

      let TermsCondition_data = await TermConditionModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["TermConditionModel"] = TermsCondition_data;

      res
        .status(200)
        .json({ data: result, message: "VCard Deleted Sucessfully!" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;
