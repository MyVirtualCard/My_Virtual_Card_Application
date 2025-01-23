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
// import FeedbackModel from "../Models/F";
import BussinessModel from "../Models/BussinessHour.model.js";
import GoogleMapModel from "../Models/GoogleMap.model.js";
import ManageContentModel from "../Models/ManageContent.model.js";
import { UserAuth } from "../Middleware/User.js";
// import InquiryModel from "../Models/";
import AppoinmentModel from "../Models/Appoinment.model.js";
router.delete(
  "/all_Data_Delete_API/:URL_Alies",
  UserAuth,
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
      // let FeedbackDetails_data = await FeedbackModel.findOneAndDelete({
      //   URL_Alies: URL_Alies,
      // });
      // result["FeedbackDetails"] = FeedbackDetails_data;

      //Inquiry
      // let InquiryDetails_data = await InquiryModel.findOneAndDelete({
      //   URL_Alies: URL_Alies,
      // });
      // result["InquiryDetails"] = InquiryDetails_data;
      //Appoinment
      let AppinmentDetails = await AppoinmentModel.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["AppinmentDetails"] = AppinmentDetails;
      
      let PlanDetails_data = await currentPlan.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["currentPlan"] = PlanDetails_data;

      // let PrivacyPolicy_data = await PrivacyPolicyModel.findOneAndDelete({
      //   URL_Alies: req.params.URL_Alies,
      // });
      // result["PrivacyPolicyModel"] = PrivacyPolicy_data;

      // let TermsCondition_data = await TermConditionModel.findOneAndDelete({
      //   URL_Alies: req.params.URL_Alies,
      // });
      // result["TermConditionModel"] = TermsCondition_data;

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
