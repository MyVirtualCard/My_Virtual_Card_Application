import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Import necessary functions from the url and path modules
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import Caddy from 'caddy';

//All api route importing
import RegisterRoute from "./Routes/Register.route.js";
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
//Cors Policy connect frontend and backend with same port:
// Allow requests from specific origins (replace with your frontend URL)
// const allowedOrigins = ['http://myvirtualcard.in', 'http://www.myvirtualcard.in','https://myvirtualcard.in', 'https://www.myvirtualcard.in','http://143.110.186.19:5173'];


// // Allow requests from specific origins
// const corsOptions = {
//   origin: 'https://www.myvirtualcard.in,http://localhost:5173', // Replace with your frontend domain
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // if you need to send cookies or authentication headers
//   optionsSuccessStatus: 204
// };

// app.use(cors(corsOptions));
app.use(cors('*'))
//This will help you to send data to server in json formate:
app.use(express.json({ limit: "60mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//This will help you to allow file upload size limit
app.use(bodyParser.json({ limit: "60mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));
app.use(express.static(path.join(__dirname, "client",'dist')));
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  res.send('Welcome to Myvirtual VCard Application')
});
app.get("/demo_purpose", (req, res) => {
  res.json({
    products: [
      {
        id: 167,
        title: "300 Touring", // sorted by title in ascending order
        price: 28999.99,
        /* rest product data */
      },
      {
        id: 99,
        title: "Amazon Echo Plus", // sorted by title in ascending order
        price: 99.99,
        /* rest product data */
      },

      // 30 items
    ],
    total: 194,
    skip: 0,
    limit: 30,
  });
});

// Api All Routes:
app.use("/auth", RegisterRoute);
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
        console.log(`Server is listening http://localhost:${PORT} number`);
      });
    } catch {
      console.log("Mongodb connection failure");
    }
  })
  .catch((error) => {
    console.log(error);
  });
