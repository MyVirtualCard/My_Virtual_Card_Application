import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import Razorpay from "razorpay";
// Import All Routes
import AuthRoute from "./Routes/Auth.route.js";
import VerifyOTP from "./Routes/Verify_OTP.route.js";
import VCardURL_Route from './Routes/VCard_URL.route.js';
import BasicDetailRoute from "./Routes/BasicDetail.route.js";
import TemplateRoute from "./Routes/VCardTemplate.route.js";
import ServiceDetailRoute from "./Routes/Services.route.js";
import ProductDetailRoute from "./Routes/Product.route.js";
import GalleryDetailRoute from "./Routes/Gallery.route.js";
import QRCodeDetailRoute from "./Routes/QRCode.route.js";
import TestimonialDetailRoute from "./Routes/Testimonial.route.js";
import SocialMediaDetailRoute from "./Routes/SocialMedia.route.js";
import BussinessHourDetailRoute from "./Routes/BussinessHour.route.js";
import PopupBannerDetailRoute from "./Routes/PopupBanner.route.js";
import PlanDetailRoute from "./Routes/Plan.route.js";
import TermConditionRoute from "./Routes/Terms&Condition.route.js";
import PrivacyPolicyRoute from "./Routes/PrivacyPolicy.route.js";
import AllDataRoute from "./Routes/AllData_Fetch_At_Single_API.route.js";
import AllDataDeleteRoute from "./Routes/AllData_Delete_At_Single_ApI.route.js";
import RazorPaymentRoute from "./Routes/Razorpayment.router.js";
import FeedbackRoute from './Routes/Feedback.route.js';
import GoogleMapRoute from './Routes/GoogleMap.route.js';
import ManageContentRoute from './Routes/ManageContent.route.js';
import InquiryRoute from './Routes/Inquiry.route.js';
import AppoinmentRoute from './Routes/Appoinment.route.js'
//Initialize backend App With name app
const app = express();
//Creating port number for server running
const port = process.env.PORT || 3000;
//Configuration:
dotenv.config();
//This will help you to send data to server in json formate:
app.use(express.json({ limit: "60mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//This will help you to allow file upload size limit
app.use(bodyParser.json({ limit: "60mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));
app.use('/uploads', express.static('uploads'));
// Allow requests from your frontend domain

// app.use(cors({
//   origin: 'https://myvirtualcard.in',
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
// }));
//Cors Policy work in any domain:
app.use(cors("*"));
//Razorpay Instantiate:
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});


// Route Middleware
app.use("/api/user", AuthRoute);
app.use("/api/user", VerifyOTP);
app.use("/vcard_URL", VCardURL_Route);
app.use("/razorpay", RazorPaymentRoute);
app.get("/razorpay/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});
app.use("/currentplan", PlanDetailRoute);
app.use("/basicDetail", BasicDetailRoute);
app.use("/templateDetail", TemplateRoute);
app.use("/serviceDetail", ServiceDetailRoute);
app.use("/productDetail", ProductDetailRoute);
app.use("/galleryDetail", GalleryDetailRoute);
app.use("/QRCodeDetail", QRCodeDetailRoute);
app.use("/testimonialDetail", TestimonialDetailRoute);
app.use("/socialMediaDetail", SocialMediaDetailRoute);
app.use("/bussinessDetail", BussinessHourDetailRoute);
app.use("/popupBannerDetail", PopupBannerDetailRoute);
app.use("/termConditionDetail", TermConditionRoute);
app.use("/privacyPolicyDetail", PrivacyPolicyRoute);
app.use("/googlemapDetail", GoogleMapRoute);
app.use("/vcard", AllDataRoute);
app.use("/vcard", AllDataDeleteRoute);
app.use('/feedback',FeedbackRoute);
app.use('/manageContent',ManageContentRoute);
app.use('/inquiry',InquiryRoute);
app.use('/appoinment',AppoinmentRoute);
//Get Request
app.get("/", (req, res) => {
  res.send("Welcome to Backend API");
});

//Mongodb Connection:
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected sucessfully");
    try {
      app.listen(port, () => {
        console.log(`Server is listening http://localhost:${port}`);
      });
    } catch {
      console.log("Mongodb connection failure");
    }
  })
  .catch((error) => {
    console.log(error);
  });
