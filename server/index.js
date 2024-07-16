import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Import necessary functions from the url and path modules
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import Caddy from "caddy";
import crypto from "crypto";
//All api route importing
import RegisterRoute from "./Routes/Register.route.js";
import VerifyOTP from './Routes/VerifyOTP.route.js'
import LoginRoute from "./Routes/Login.route.js";
import VCardURL_Route from "./Routes/VCard_URL.route.js";
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
let host_ip = "http://localhost:3001";
//App initialized
let app = express();
app.use(Caddy.connect);
// Configurations:
// Convert the URL of the current module to a filename
const __filename = fileURLToPath(import.meta.url);
// // Extract the directory name from the filename
const __dirname = path.dirname(__filename);
dotenv.config();
//Port initializing:
let PORT = process.env.PORT || 3000;
// Allow requests from your frontend domain
// const corsOptions = {
//   origin: 'https://myvirtualcard.in',  // Replace with your actual frontend domain
//   credentials: true,  // Allow cookies to be sent
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));
app.use(cors("*"));
//This will help you to send data to server in json formate:
app.use(express.json({ limit: "60mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//This will help you to allow file upload size limit
app.use(bodyParser.json({ limit: "60mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));
app.use(express.static(path.join(__dirname, "client", "dist")));

// CCAvenue Configurations
const merchant_id = process.env.MERCHANT_ID;
const access_code = process.env.ACCESS_CODE;
const working_key = process.env.WORKING_KEY;
const redirect_url = process.env.REDIRECT_URL;
const cancel_url = process.env.CANCEL_URL;

app.post('/ccavenue/initiate', (req, res) => {
  const order_id = req.body.order_id;
  const amount = req.body.amount;
  const currency = 'INR';
  const redirect_url = process.env.REDIRECT_URL;
  const cancel_url = process.env.CANCEL_URL;

  // Encrypt request parameters
  const params = `merchant_id=${merchant_id}&order_id=${order_id}&currency=${currency}&amount=${amount}&redirect_url=${redirect_url}&cancel_url=${cancel_url}`;
  const encRequest = encrypt(params, working_key);

  res.json({ encRequest, access_code });
});

function encrypt(data, working_key) {
  const m = crypto.createHash('md5');
  m.update(working_key);
  const key = m.digest();
  const iv = Buffer.alloc(16, 0); // Initialization vector
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}





















app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  res.send("Welcome to Myvirtual VCard Application");
});
// Api All Routes:
app.use("/auth", RegisterRoute);
app.use('/auth',VerifyOTP);
app.use("/currentplan", PlanDetailRoute);
app.use("/auth", LoginRoute);
app.use("/vcard_URL", VCardURL_Route);
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
app.use("/vcard", AllDataRoute);
app.use("/vcard", AllDataDeleteRoute);
//Setup Mongoose conncetion ;
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected sucessfully");
    try {
      app.listen(PORT, () => {
        console.log(`Server is listening ${host_ip}`);
      });
    } catch {
      console.log("Mongodb connection failure");
    }
  })
  .catch((error) => {
    console.log(error);
  });
