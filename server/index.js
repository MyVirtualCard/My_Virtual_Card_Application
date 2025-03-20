import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Razorpay from "razorpay";
import path from 'path';
import { fileURLToPath } from "url";

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
import { ConnectDB } from "./config/mongodb.js";

//Creating App :
const app = express();
//Creating PORT:
const port = process.env.PORT || 3000;
ConnectDB();
// Our App Middlewares
app.use(express.json({ limit: "60mb" }));
app.use(bodyParser.json({ limit: "60mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: 'https://myvirtualcard.in',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials:true
}));
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials:true
// }));
// app.use(cors('*'));

//Razorpay Instantiate:
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
//Importing All Routes Middleware

import UserAuthRoute from "./Routes/UserAuth.route.js";
import UserRoute from "./Routes/User.route.js";
import VCardURL_Route from "./Routes/Vcard_URL.route.js";
import RazorPaymentRoute from "./Routes/RazorPayment.route.js";
import FreePlanRoute from './Routes/FreePlan.route.js'
import TemplateRoute from "./Routes/VCardTemplate.route.js";
import BasicDetailRoute from "./Routes/BasicDetail.route.js";
import AboutDetailRoute from "./Routes/About.route.js";
import SocialMediaDetailRoute from "./Routes/SocialMedia.route.js";
import ServiceDetailRoute from "./Routes/Service.route.js";
import ProductDetailRoute from "./Routes/Product.route.js";
import BankDetailRoute from "./Routes/BankDetail.route.js";
import UPIDetailRoute from "./Routes/UPI.route.js";
import GalleryDetailRoute from "./Routes/Gallery.route.js";
import VideoDetailRoute from "./Routes/Video.route.js";
import Youtube_VideoVideoDetailRoute from "./Routes/Youtube_Video.route.js";
import TestimonialDetailRoute from "./Routes/Testimonial.route.js";
import GoogleMapRoute from "./Routes/GoogleMap.route.js";
import PopupBannerDetailRoute from "./Routes/PopupBanner.route.js";
import BussinessHourDetailRoute from "./Routes/BussinessHour.route.js";
import ManageContentRoute from "./Routes/ManageContent.route.js";
import AllDataRoute from "./Routes/AllData_Fetch_At_Single_API.route.js";
import AllDataDeleteRoute from "./Routes/AllData_Delete_At_Single_ApI.route.js";
// Import Dynmaic Routes;
import FirstTheme from './Routes/Dynamic_Vcard_Routes/First_Vcard_Theme.route.js';
import SecondTheme from './Routes/Dynamic_Vcard_Routes/Second_Banner_Logo.route.js';
import ThirdTheme from './Routes/Dynamic_Vcard_Routes/Third_Button_Design.route.js';
import FourthTheme from './Routes/Dynamic_Vcard_Routes/Fourth_Title_Design.route.js';
import FifthTheme from './Routes/Dynamic_Vcard_Routes/Fifth_Service_Theme.route.js';
import SixthTheme from './Routes/Dynamic_Vcard_Routes/Sixth_Product_Theme.route.js';
import SeventhTheme from './Routes/Dynamic_Vcard_Routes/Seventh_Timer_Theme.route.js';
import EighthTheme from './Routes/Dynamic_Vcard_Routes/Eight_Testimonial.route.js';
import NinethTheme from './Routes/Dynamic_Vcard_Routes/Nine_Appoinment.route.js';
import TenthTheme from './Routes/Dynamic_Vcard_Routes/Tenth_Feedback.route.js';
import AllStyleTheme from './Routes/Dynamic_Vcard_Routes/AllStyle_Fetch_At_Single_Route.js'
import ViewsRouter from './Routes/Views.router.js'
//Reseller
import ResellerAuthRoute from "./Routes/Reseller_Routes/ResellerAuth.route.js";
import ResellerPaymentRoute from "./Routes/Reseller_Routes/ResellerPayment.route.js";
import ResellerClientsRoute from './Routes/Reseller_Routes/Reseller_Client.route.js';

//API EndPoints:
//GET
app.get("/", (req, res) => {
  res.send("API Is Working Fine👏");
});
app.use("/api/auth", UserAuthRoute);
app.use("/api/user", UserRoute);
app.use("/vcard_url", VCardURL_Route);
app.use("/razorpay", RazorPaymentRoute);
app.use("/freeplan", FreePlanRoute);
app.use("/templateDetail", TemplateRoute);
app.use("/basicDetail", BasicDetailRoute);
app.use("/aboutDetail", AboutDetailRoute);
app.use("/socialMediaDetail", SocialMediaDetailRoute);
app.use("/serviceDetail", ServiceDetailRoute);
app.use("/productDetail", ProductDetailRoute);
app.use("/upiDetail", UPIDetailRoute);
app.use("/bankDetail", BankDetailRoute);
app.use("/galleryDetail", GalleryDetailRoute);
app.use("/videoDetail", VideoDetailRoute);
app.use("/youtubeDetail", Youtube_VideoVideoDetailRoute);
app.use("/testimonialDetail", TestimonialDetailRoute);
app.use("/googlemapDetail", GoogleMapRoute);
app.use("/popupBannerDetail", PopupBannerDetailRoute);
app.use("/bussinessDetail", BussinessHourDetailRoute);
app.use("/manageContent", ManageContentRoute);
app.use("/vcard", AllDataRoute);
app.use("/vcard", AllDataDeleteRoute);
//Dynamic Middlewares
app.use('/vcard_theme',FirstTheme);
app.use('/image_theme',SecondTheme);
app.use('/button_theme',ThirdTheme);
app.use('/title_theme',FourthTheme);
app.use('/service_theme',FifthTheme);
app.use('/product_theme',SixthTheme);
app.use('/timer_theme',SeventhTheme);
app.use('/testimonial_theme',EighthTheme);
app.use('/appoinment_theme',NinethTheme);
app.use('/feedback_theme',TenthTheme);
app.use('/dynamicVCard',AllStyleTheme);
app.use("/views", ViewsRouter);
//Reseller
app.use("/api/auth/reseller", ResellerAuthRoute);
app.use('/api/auth/resellerClient',ResellerClientsRoute)
app.use("/razorpay/reseller", ResellerPaymentRoute);
//Server Listening to 3000 or 3001
app.listen(port, () => {
  console.log(`Server listening on Port : ${port}😇`);
});
