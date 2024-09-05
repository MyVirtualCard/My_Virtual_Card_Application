import express from "express";

let router = express.Router();
import Vcard_URL from "../Model/Vcard_URL.model.js";
import BasicDetails from "../Model/BasicDetail.model.js";
import GalleryModel from "../Model/Gallery.model.js";
import TotalLikes from "../Model/Likes.model.js";
import currentPlan from "../Model/Plan.model.js";
import PopupBannerModel from "../Model/PopupBanner.model.js";
import ProductModel from "../Model/Products.model.js";
import ServiceData from "../Model/Services.model.js";
import SocialMediaModel from "../Model/SocialMedia.model.js";
import TestimonialModel from "../Model/Testimonial.model.js";
import Current_VCardTemplate from "../Model/VCardTemplate.model.js";
import PrivacyPolicyModel from "../Model/PrivacyPolicy.model.js";
import TermConditionModel from "../Model/Terms&Condition.model.js";
import { verifyToken } from "../Middleware/verifyToken.js";

router.delete(
  "/all_Data_Delete_API/:URL_Alies",
  verifyToken,
  async (req, res) => {
    try {
      let URL_Alies = req.params.URL_Alies;
      let result = {};

      let getURLData = await Vcard_URL.findOneAndDelete({
        URL_Alies: URL_Alies,
      });
      result["Vcard_URL"] = getURLData;
      let getSpecificData = await BasicDetails.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["BasicDetails"] = getSpecificData;
      let ServiceDetails_data = await ServiceData.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["ServiceData"] = ServiceDetails_data;
      let ProductDetails_data = await ProductModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["ProductModel"] = ProductDetails_data;

      let GalleryDetails_data = await GalleryModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["GalleryModel"] = GalleryDetails_data;

      let SocialMediaDetails_data = await SocialMediaModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["SocialMediaModel"] = SocialMediaDetails_data;

      let TestimonialDetails_data = await TestimonialModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["TestimonialModel"] = TestimonialDetails_data;
      let PopUpBannerDetails_data = await PopupBannerModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["PopupBannerModel"] = PopUpBannerDetails_data;

      let PrivacyPolicy_data = await PrivacyPolicyModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["PrivacyPolicyModel"] = PrivacyPolicy_data;

      let TermsCondition_data = await TermConditionModel.findOneAndDelete({
        URL_Alies: req.params.URL_Alies,
      });
      result["TermConditionModel"] = TermsCondition_data;

      let VCardTemplateDetails_data =
        await Current_VCardTemplate.findOneAndDelete({
          URL_Alies: req.params.URL_Alies,
        });
      result["Current_VCardTemplate"] = VCardTemplateDetails_data;
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
