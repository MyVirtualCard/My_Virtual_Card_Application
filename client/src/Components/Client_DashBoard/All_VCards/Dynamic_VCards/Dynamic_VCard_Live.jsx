import React, { useContext, useEffect, useRef, useState } from "react";
import "./Dynamic_VCard_Live.scss";
import banner from "../../../../assets/AllVCard_Image/VCard3/Banner.jpg";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiSolidPhoneCall, BiSolidVideo } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { FaDirections, FaDownload, FaShare } from "react-icons/fa";
import { MdOutgoingMail, MdSchedule } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { IoHome, IoMail } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { GrChat, GrGallery, GrMapLocation } from "react-icons/gr";
import { TbUnlink } from "react-icons/tb";
import { useFormik } from "formik";
import { RiFileCopyLine } from "react-icons/ri";
import { LiaHandPointDownSolid } from "react-icons/lia";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiSquareChevDown, CiSquareChevUp } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdMiscellaneousServices } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import * as Yup from "yup";
import vCardsJS from "vcards-js";
import ReactStars from "react-stars";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InquiryValidateSchema } from "../../../Helper/InquiryValidate";
import { AppoinmentValidateSchema } from "../../../Helper/AppoinmentValidate";

import VCard_Loader from "../../../VCard_Loader/VCard_Loader";
import URLNotFound from "../../404_Error_Page/404";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import PhoneInput from "react-phone-input-2";
import { LuView } from "react-icons/lu";
import { AppContext } from "../../../Context/AppContext";
import "react-phone-input-2/lib/style.css";
import Loader from "./LoaderPage/Loader";
const Dynamic_VCard_Live = () => {
  let navigate = useNavigate();
  let { URL_Alies, setURL_Alies, setCurrentTemplate } = useContext(AppContext);

  let style = {
    $first_back__color: "#ffffff",
    $second_back__color: "#6b6b6b",
    $third_back__color: "#303030",
    //Root Background
    $root_backgound: "#fcfdc8,#ffffff",
    //Vcard background
    $vcard_back_color: "#a1046d",

    //SVG Wave backgound

    $svg_wave_back_color: "#ffffff",
  };
  const [width, setWidth] = useState(window.innerWidth);
  //Success and error popup state
  let [successMessage, setSuccessMessage] = useState();
  let [successPopupOpen, setSuccessPopupOpen] = useState(false);
  let [errorMessage, setErrorMessage] = useState();
  let [errorPopupOpen, setErrorPopupOpen] = useState(false);
  let [InquiryLoader, setInquiryLoader] = useState(false);
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [appoinmentLoader, setappoinmentLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  let [popupBannerToggle, setPopUpBannerToggle] = useState(false);
  let [FeedbackPopup, setFeedbackPopup] = useState(false);
  let [FeedbackPopupError, setFeedbackPopupError] = useState(false);
  let [AppoinmentPopup, setAppoinmentPopup] = useState(false);
  let [AppoinmentPopupError, setAppoinmentPopupError] = useState(false);
  //create a new vCard
  var vCard = vCardsJS();

  //Gallery Functionality
  //openFullImage preview:
  function openFullImage(pic) {
    let fullImageBox = document.getElementById("fullImageBox");
    let fullImage = document.getElementById("fullImage");
    fullImageBox.style.display = "block";
    fullImage.src = pic;
    // scrollToSection(GalleryRef), setActiveMenu("Gallery");
  }
  let [scrollY, setScrollY] = useState(0);
  let innerHeight;
  let totalHeight;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      innerHeight = window.innerHeight; // Height of the viewport
      setScrollY(window.scrollY); // Number of pixels scrolled vertically
      totalHeight = innerHeight + scrollY; // Total height scrolled + viewport height
    });
  }, [openFullImage]);

  //Close FullImage Preview
  function closeFullImage() {
    let fullImageBox = document.getElementById("fullImageBox");

    fullImageBox.style.display = "none";
  }
  //Menu actions
  let [activeMenu, setActiveMenu] = useState("Home");
  let HomeRef = useRef(null);
  let AboutRef = useRef(null);
  let ServiceRef = useRef(null);
  let ProductRef = useRef(null);
  let PaymentRef = useRef(null);
  let GalleryRef = useRef(null);
  let VideoRef = useRef(null);
  let TimeRef = useRef(null);
  let TestimonialRef = useRef(null);
  let LocationRef = useRef(null);
  let FeedbackRef = useRef(null);
  let InquiryRef = useRef(null);
  let shareRef = useRef(null);
  let AppoinmentRef = useRef(null);
  let scrollToSection = (elementRef) => {
    console.log(elementRef);
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };
  let [Views, setViews] = useState(0);
  function HandleMenuDown() {
    if (activeMenu === "Home") {
      return scrollToSection(AboutRef), setActiveMenu("About");
    }
    if (activeMenu === "About") {
      return scrollToSection(ServiceRef), setActiveMenu("Service");
    }
    if (activeMenu === "Service") {
      return scrollToSection(ProductRef), setActiveMenu("Product");
    }
    if (activeMenu === "Product") {
      return scrollToSection(PaymentRef), setActiveMenu("Payment");
    }
    if (activeMenu === "Payment") {
      return scrollToSection(GalleryRef), setActiveMenu("Gallery");
    }
    if (activeMenu === "Gallery") {
      return scrollToSection(VideoRef), setActiveMenu("Video");
    }
    if (activeMenu === "Video") {
      return scrollToSection(TimeRef), setActiveMenu("Time");
    }
    if (activeMenu === "Time") {
      return scrollToSection(TestimonialRef), setActiveMenu("Testimonial");
    }
    if (activeMenu === "Testimonial") {
      return scrollToSection(LocationRef), setActiveMenu("Location");
    }
    if (activeMenu === "Location") {
      return scrollToSection(FeedbackRef), setActiveMenu("Feedback");
    }
    if (activeMenu === "Feedback") {
      return scrollToSection(InquiryRef), setActiveMenu("Inquiry");
    }
  }
  function HandleMenuUp() {
    if (activeMenu === "About") {
      return scrollToSection(HomeRef), setActiveMenu("Home");
    }
    if (activeMenu === "Service") {
      return scrollToSection(AboutRef), setActiveMenu("About");
    }
    if (activeMenu === "Product") {
      return scrollToSection(ServiceRef), setActiveMenu("Service");
    }
    if (activeMenu === "Payment") {
      return scrollToSection(ProductRef), setActiveMenu("Product");
    }
    if (activeMenu === "Gallery") {
      return scrollToSection(PaymentRef), setActiveMenu("Payment");
    }
    if (activeMenu === "Video") {
      return scrollToSection(GalleryRef), setActiveMenu("Gallery");
    }
    if (activeMenu === "Time") {
      return scrollToSection(VideoRef), setActiveMenu("Video");
    }
    if (activeMenu === "Testimonial") {
      return scrollToSection(TimeRef), setActiveMenu("Time");
    }
    if (activeMenu === "Location") {
      return scrollToSection(TestimonialRef), setActiveMenu("Testimonial");
    }
    if (activeMenu === "Feedback") {
      return scrollToSection(LocationRef), setActiveMenu("Location");
    }
    if (activeMenu === "Inquiry") {
      return scrollToSection(FeedbackRef), setActiveMenu("Feedback");
    }
  }
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  //Feedback Form Logic :
  let feedbackFormik = useFormik({
    initialValues: {
      URL_Alies: window.location.pathname,
      ClientName: "",
      ClientFeedback: "",
      ClientRatting: 0,
    },

    //Validation :
    validationSchema: Yup.object().shape({
      ClientName: Yup.string()
        .min(3, "Min 3 char required")
        .max(50, "Name must be 20 character or less")
        .required("Name is required"),
      ClientFeedback: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(400, "Feedback must be 100 character or less")
        .required("Feedback is required"),
      ClientRatting: Yup.number()
        .required("Rating is required")
        .min(1, "Rating must be at least 1 star"),
    }),
    //Form Submit :
    onSubmit: async (values) => {
      setInquiryLoader(true);
      setFeedbackLoader(true);
      await api
        .post(`/feedback${window.location.pathname}`, values)
        .then((res) => {
          setInquiryLoader(false);
          setFeedbackPopup(true);
          setInquiryLoader(false);
          setSuccessMessage(res.data.message);
          feedbackFormik.values.ClientName = "";
          feedbackFormik.values.ClientFeedback = "";
          feedbackFormik.values.ClientRatting = 0;
          setCommentOpen(false);
          setTimeout(() => {
            setFeedbackPopup(false);
          }, 2000);
          setFeedbackLoader(false);
        })
        .catch((error) => {
          setInquiryLoader(false);
          setFeedbackPopupError(true);
          setTimeout(() => {
            setFeedbackPopupError(false);
          }, 2000);
          setErrorMessage(error.response.data.message);
          setFeedbackLoader(false);
        });
    },
  });

  //Inquiry Form Logic :
  let formik = useFormik({
    initialValues: {
      URL_Alies: window.location.pathname,
      Name: "",
      Email: "",
      MobileNumber: "",
      Message: "",
    },

    //Validation :
    validationSchema: InquiryValidateSchema,
    //Form Submit :
    onSubmit: async (values) => {
      setInquiryLoader(true);
      await api
        .post(`/inquiry${window.location.pathname}`, values)
        .then((res) => {
          formik.values.Name = "";
          formik.values.Email = "";
          formik.values.MobileNumber = "";
          formik.values.Message = "";

          setSuccessPopupOpen(true);
          setInquiryLoader(false);
          setSuccessMessage(res.data.message);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 3000);
        })
        .catch((error) => {
          setInquiryLoader(false);
          setErrorPopupOpen(true);
          setTimeout(() => {
            setErrorPopupOpen(false);
          }, 3000);
          setErrorMessage(error.response.data.message);
        });
    },
  });
  //Appoinment form
  let Appoinment_formik = useFormik({
    initialValues: {
      URL_Alies: window.location.pathname,
      FullName: "",
      MobileNumber: "",
      Date: "",
      Time: "",
    },

    //Validation :
    validationSchema: AppoinmentValidateSchema,
    //Form Submit :
    onSubmit: async (values) => {
      setappoinmentLoader(true);
      await api
        .post(`/appoinment${window.location.pathname}`, values)
        .then((res) => {
          console.log(res);
          formik.values.FullName = "";
          formik.values.Time = "";
          formik.values.MobileNumber = "";
          formik.values.Date = "";

          setAppoinmentPopup(true);
          setappoinmentLoader(false);
          setSuccessMessage(res.data.message);
          setTimeout(() => {
            setAppoinmentPopup(false);
          }, 3000);
        })
        .catch((error) => {
          setappoinmentLoader(false);
          setAppoinmentPopupError(true);
          setTimeout(() => {
            setAppoinmentPopupError(false);
          }, 3000);
          setErrorMessage(error.response.data.message);
        });
    },
  });

  let [SiteLoader, setSiteLoader] = useState(true);

  let [VCard_URL_Data, setVCard_URL_Data] = useState([]);
  let [AboutData, setAboutData] = useState([]);
  let [BankData, setBankData] = useState([]);
  let [UPIData, setUPIData] = useState([]);
  let [BasicData, setBasicData] = useState([]);
  let [VCardData, setVCardData] = useState([]);
  let [GalleryData, setGalleryData] = useState([]);
  let [TestimonialData, setTestimonialData] = useState([]);
  let [ProductData, setProductData] = useState([]);
  let [VideoData, setVideoData] = useState([]);
  let [LocalVideoData, setLocalVideoData] = useState([]);
  let [ServiceData, setServiceData] = useState([]);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
  let [SocialMediaData, setSocialMediaData] = useState([]);
  let [BussinessHourData, setBussinessHourData] = useState([]);
  let [GoogleMapData, setGoogleMapData] = useState([]);
  let [PopUpBannerData, setPopUpBannerData] = useState([]);
  let [ManageContentData, setManageContent] = useState([]);

  // Styles States

  // All Style states
  let [VcardTheme, setVcardTheme] = useState([]);
  let [ImageTheme, setImageTheme] = useState([]);
  let [ButtonTheme, setButtonTheme] = useState([]);
  let [TitleTheme, setTitleTheme] = useState([]);
  let [ServiceTheme, setServiceTheme] = useState([]);
  let [ProductTheme, setProductTheme] = useState([]);
  let [TimerTheme, setTimerTheme] = useState([]);
  let [TestimonialTheme, setTestimonialTheme] = useState([]);
  let [AppoinmentTheme, setAppoinmentTheme] = useState([]);
  let [FeedbackTheme, setFeedbackTheme] = useState([]);
  const handleDownloadVCard = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${BasicData.length > 0 ? VCard_URL_Data[0].FirstName : ""}
TEL;TYPE=cell:${BasicData.length > 0 ? BasicData[0].MobileNumber : ""}
EMAIL:${BasicData.length > 0 ? BasicData[0].Email : ""}
END:VCARD
  `;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    vCard.photo.attachFromUrl(
      `${VCard_URL_Data.length > 0 ? VCard_URL_Data[0].Profile : ""}`,
      "JPEG"
    );
    link.download = `${
      VCard_URL_Data.length > 0 ? VCard_URL_Data[0].FirstName : "card.vcf"
    }.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const currentUrl = window.location.pathname; // Full URL
  useEffect(() => {
    try {
      api
        .get(`/templateDetail${currentUrl}}`)
        .then((res) => {
          if (res.data?.data?.length > 0) {
            setURL_Alies(res.data?.data[0].URL_Alies);
            setCurrentTemplate(res.data?.data[0].currentTemplate);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);
  async function fetchAllData() {
    try {
      await api
        .get(`/vcard/allDataAPI${currentUrl}`)
        .then((res) => {
          setURL_Alies(window.location.pathname.split("/")[1]);
          setAboutData(res.data.data.AboutDetails);
          setBankData(res.data.data.BankDetails);
          setUPIData(res.data.data.UPIDetails);
          setVideoData(res.data.data.Youtube_Videos);
          setLocalVideoData(res.data.data.Local_Videos);
          setGoogleMapData(res.data.data.GoogleMapDetails);
          setVCard_URL_Data(res.data.data.VcardURLDetails);
          setBasicData(res.data.data.BasicDetails);
          setSocialMediaData(res.data.data.SocialMediaDetails);
          setGalleryData(res.data.data.GalleryDetails);
          setTestimonialData(res.data.data.TestimonialDetails);
          setServiceData(res.data.data.ServiceDetails);
          setProductData(res.data.data.ProductDetails);

          setBussinessHourData(res.data.data.BussinessDetails);
          setPopUpBannerData(res.data.data.PopupBannerDetails);
          setManageContent(res.data.data.ManageContentDetails);

          setTimeout(() => {
            // window.scrollTo(0, 0);
            setPopUpBannerToggle(true);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
      await api
        .get(`/dynamicVCard/style${currentUrl}`)
        .then((res) => {
          setVcardTheme(res.data.data.FirstVcardTheme);
          setButtonTheme(res.data.data.ThirdButtonTheme);
          setTitleTheme(res.data.data.FourthTitleTheme);
          setImageTheme(res.data.data.SecondImagesTheme);
          setServiceTheme(res.data.data.FifthServiceTheme);
          setProductTheme(res.data.data.SixthProductTheme);
          setAppoinmentTheme(res.data.data.NinethAppoinmentTheme);
          setFeedbackTheme(res.data.data.TenthFeedbackTheme);
          setTimerTheme(res.data.data.SeventhTimerTheme);
          setTestimonialTheme(res.data.data.EighthTestimonialTheme);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setSiteLoader(false);
    }
  }
  useEffect(() => {
    api
      .get(`/feedback${window.location.pathname}`)
      .then((res) => {
        setAllFeedBacks(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [InquiryLoader]);
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  async function ViewCount() {
    try {
      await api
        .post(`/views${window.location.pathname}`, {
          URL_Alies: URL_Alies,
          pageUrl: window.location.pathname,
        })
        .then((res) => {
          setViews(res.data.viewCount);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllData();
    let viewsCount = setTimeout(() => {
      ViewCount();
    }, 2000);
    // Cleanup function to clear the timeout when the component unmounts or after 2 seconds
    return () => {
      clearTimeout(viewsCount);
      console.log("Timeout cleared");
    };
  }, []);

  const [copied, setCopied] = useState(false);
  const handleCopyURL = () => {
    setCopied(true);
    toast.success("Link Copied!");
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };
  const handleCopyMobileNumber = () => {
    setCopied(true);
    toast.success("Link Copied!");
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };
  // Using useLocation to get the current path
  const location = useLocation();

  // Full URL or just the pathname for the QR code
  const currentPath = window.location.origin + location.pathname;

  // Create a reference to the QRCode element
  const qrRef = useRef(null);

  // Function to download the SVG
  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  // Function to share the QR code as an SVG
  const shareQRCodeAsSVG = () => {
    const svgElement = qrRef.current.querySelector("svg");

    // Serialize the SVG content into a string
    const svgData = new XMLSerializer().serializeToString(svgElement);

    // Create a Blob from the SVG string
    const blob = new Blob([svgData], { type: "image/svg+xml" });

    const file = new File([blob], "qrcode.svg", { type: "image/svg+xml" });

    if (navigator.share) {
      navigator
        .share({
          title: "QR Code",
          text: "Here is the QR code for the path: " + currentPath,
          files: [file], // Sharing the SVG file
        })
        .then(() => console.log("Sharing successful"))
        .catch((err) => console.log("Sharing failed", err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };
  // State to store the phone number
  const [phoneNumber, setPhoneNumber] = useState("");

  // Generate the WhatsApp URL and share the profile
  const handleShareWhatsApp = () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number");
      return;
    }
    // Format the message
    const message = `Hello! Check out my profile: ${
      VCard_URL_Data[0].FirstName
    }. You can view it here: ${window.location.origin + location.pathname}`;

    // Properly encode the text for the URL
    const encodedMessage = encodeURIComponent(message);
    // WhatsApp API URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Open the WhatsApp link (this works on mobile and desktop)
    window.open(whatsappUrl, "_blank");
  };
  const backgroundColorStyle = {
    background: VcardTheme[0]?.LinearGradient
      ? `linear-gradient(90deg, ${VcardTheme[0]?.DesktopViewBackColor}, ${VcardTheme[0]?.DesktopViewBackColor2})`
      : VcardTheme[0]?.DesktopViewBackColor,
  };
  const backgroundImageStyle = {
    backgroundImage: `url(${VcardTheme[0]?.WebsiteBackImageAddress})`,
    width: "100vw",
    maxHeight: "100vh",
    height: "auto",
    position: "absolute !important",
    top: 0,
    left: 0,
  };
  // Show loading spinner or message while loading
  if (SiteLoader) {
    return <Loader />;
  }

  return (
    <>
      {VcardTheme.length > 0 &&
      ButtonTheme.length > 0 &&
      TitleTheme.length > 0 &&
      ImageTheme.length > 0 &&
      ServiceTheme.length > 0 &&
      ProductTheme.length > 0 &&
      AppoinmentTheme.length > 0 &&
      FeedbackTheme.length > 0 &&
      TimerTheme.length > 0 &&
      TestimonialTheme.length > 0 ? (
        <>
          <style>
            {`
.Dynamic_Vcard_Live_Container{


.Dynamic_Vcard_Live_Title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${TitleTheme[0].TitlePosition};
  position: relative;


  h3 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${TitleTheme[0].TitlePosition};
    gap: 10px;
    font-family: ${TitleTheme[0].TitleFont};
    font-optical-sizing: auto;
    font-weight: ${TitleTheme[0].TitleFontWeight};
    font-style: normal;

    font-size: ${TitleTheme[0].TitleSize}${TitleTheme[0].TitleUnit};
    color: ${TitleTheme[0].TitleColor};
    position: relative;

    &::first-letter {
      font-size: 1.7rem !important;
      color: $second_back__color !important;
    }
  }
}

  .menu_navbar_box {
    width: 70px;
    height: 100%;
    min-height: 100%;
    background-color:${VcardTheme[0].VCardColour};
    position: fixed;
    top: 0%;
    right: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color:${VcardTheme[0].VCardTextColour};
    .up_btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0.08;
      font-size: 2.5rem;
      font-weight: bold;
      background-color: ${ButtonTheme[0].BtnBackColour};
      color: ${ButtonTheme[0].BtnTextColour};
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      .icon {
        @media screen and (max-width: 650px) {
          transform: rotate(-90deg);
          font-size: 1.5rem;
        }
      }
      &:hover {
        color:${VcardTheme[0].VCardColour};
        transition: all 0.3s ease-in-out;
      }
      @media screen and (max-width: 650px) {
        height: 100%;
        flex: 0.1;
        display: flex;
        border-radius: 0px;
        border-top-left-radius: 0rem;
        border-bottom-left-radius: 0rem;
        flex-direction: row !important;
      }
    }
    .hideUpArrow {
      opacity: 1;
      cursor: not-allowed;
    }
    .all_menus {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      gap: 1rem;
      flex: 0.8;
      padding: 0.5rem;
      width: 100%;
      overflow-y: scroll;

      .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
        cursor: pointer;

        padding: 5px 10px;

        border-radius: 5px;
        transition: 1ll 0.5s ease-in-out;

        .icon {
          font-size: 1.2rem;
          @media screen and (max-width: 650px) {
            font-size: 1rem;
          }
        }
        p {
          font-size: 0.6rem;
          font-weight: 550;
          @media screen and (max-width: 650px) {
            font-size: 0.6rem;
          }
        }
        &:hover {
          color: ${ButtonTheme[0].BtnTextColour};
          background-color: ${ButtonTheme[0].BtnBackColour};
          transition: 1ll 0.5s ease-in-out;
        }
      }
      .menuActive {
             color: ${ButtonTheme[0].BtnTextColour};
          background-color: ${ButtonTheme[0].BtnBackColour};
      }
      &::-webkit-scrollbar {
        display: none;
      }
      @media screen and (max-width: 650px) {
        height: 100%;
        width: 100%;
        flex: 0.8;
        display: flex;
        flex-direction: row !important;
      }
    }
    .down_btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
           flex: 0.08;
      font-size: 2.5rem;
      font-weight: bold;
         background-color: ${ButtonTheme[0].BtnBackColour};
      color: ${ButtonTheme[0].BtnTextColour};
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease-in-out;

      .down {
        @media screen and (max-width: 650px) {
          transform: rotate(-90deg);
          font-size: 1.5rem;
        }
      }
      &:hover {
        color:${VcardTheme[0].VCardColour};
        transition: all 0.3s ease-in-out;
      }
      @media screen and (max-width: 650px) {
        height: 100%;
        flex: 0.1;
        display: flex;
        border-radius: 0px;
        border-top-right-radius: 0rem;
        border-bottom-right-radius: 0rem;
        flex-direction: row !important;
      }
    }
    .hideDownArrow {
      opacity: 1;
      cursor: not-allowed;
    }
    @media screen and (max-width: 1000px) {
      position: fixed;
      top: 15%;
      right: 5%;
    }
    @media screen and (max-width: 700px) {
      position: fixed;
      top: 15%;
      right: 1%;
    }
    @media screen and (max-width: 650px) {
      position: fixed;
      top: 96.7%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 50px;
      min-height: 50px;
      align-items: center;
      justify-content: space-between;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
        rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    }
  }



 .Dynamic_Vcard_Live_box{
background-color:${VcardTheme[0].VCardColour};
color:${VcardTheme[0].VCardTextColour} !important;
    width: 450px;
    max-width: 450px;
    margin-top: 0.5rem;
    height: auto;
    overflow-x: hidden;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  justify-content: flex-start;
    filter: drop-shadow(0px 4px 5px #383838a6);



    

   .Image_row_1 {
      width: 100%;
      max-height: auto;
      height: auto;
      position: relative;


         .views_count{
        position: absolute;
        top: -3%;
        left: 0%;
     
        z-index: 10;
    color: ${ButtonTheme[0].BtnTextColour};
    

        p{
          letter-spacing: 1px;
          margin: 0.5rem auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 5px;
          font-size: 0.7rem;
    background-color: ${ButtonTheme[0].BtnBackColour};
    border-bottom-right-radius:1rem;

    padding:0.4rem 0.7rem;
          .icon{
            font-size: 1rem;
          }
        }

      
      }
      .banner_image {
        width: 100%;
         height: ${ImageTheme[0].BannerHeight[0]}px;
        max-height: ${ImageTheme[0].BannerHeight[0]}px;
        overflow: hidden;
        object-fit: cover;
        object-position: center;

        img {
          filter: brightness(${ImageTheme[0].BannerBrightness}%);
        height: ${ImageTheme[0].BannerHeight[0]}px;
        max-height: ${ImageTheme[0].BannerHeight[0]}px;
          width: 100%;
          object-fit: cover; /* Ensures image covers the area */
          object-position: top; /* Ensures head portion is not cropped */
        }
        .overlay {
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 50%;
          background:${
            VcardTheme[0].SVG_Design.length < 10
              ? `linear-gradient(#cd62e200 0%, ${VcardTheme[0].VCardColour} 100%);`
              : ""
          }
        }
      }
      .user_logo {
   
      position: ${ImageTheme[0].LogoPosition};
      top: ${ImageTheme[0].LogoTopPosition}${ImageTheme[0].LogoPositionUnit};
      left: ${ImageTheme[0].LogoLeftPosition}${ImageTheme[0].LogoPositionUnit};
        transform: translate(-${ImageTheme[0].LogoLeftPosition}${
              ImageTheme[0].LogoPositionUnit
            }, -${ImageTheme[0].LogoTopPosition}${
              ImageTheme[0].LogoPositionUnit
            });
      
       
        // display: flex;
        // align-items: center;
        // justify-content: center;
          z-index: 2;


        img {
         
          width: ${
            ImageTheme[0]?.LogoWidth
          }${ImageTheme[0]?.LogoWidthUnit.toLowerCase()} !important;
          height: ${
            ImageTheme[0]?.LogoHeight
          }${ImageTheme[0]?.LogoHeightUnit.toLowerCase()} !important;
          border-radius: ${ImageTheme[0].LogoBorderRadius}${
              ImageTheme[0].LogoBorderRadiusUnit
            } !important;
     
          object-fit: cover; /* Ensures image covers the area */
          object-position: top; /* Ensures head portion is not cropped */
          // border: 2px solid ${VcardTheme[0].VCardColour} !important;
          box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
          animation: profileBorder 5s infinite linear;
          @keyframes profileBorder {
            0% {
              border: 3px solid $card_back_colour;

              transform: translateY(0px);
            }
            25% {
              border: 3px solid #ffffff;

              transform: translateY(-5px);
            }
            50% {
              border: 3px solid #ffffff;

              transform: translateY(-10px);
            }
            75% {
              border: 3px solid rgb(255, 255, 255);

              transform: translateY(-5px);
            }
            100% {
              border: 3px solid $card_back_colour;

              transform: translateY(0px);
            }
          }
        }

           .Animation-1 {
            width: 100px;
            height: 100px;
           border-radius: ${ImageTheme[0].LogoBorderRadius}${
              ImageTheme[0].LogoBorderRadiusUnit
            };
            object-fit: cover;
            object-position: top;

            animation: logoAnime1 3s linear infinite;

            @keyframes logoAnime1 {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(10px);
              }
              100% {
                transform: translateY(0px);
              }
            }
          }

    .Animation-2 {
            width: 100px;
            height: 100px;
          border-radius: ${ImageTheme[0].LogoBorderRadius}${
              ImageTheme[0].LogoBorderRadiusUnit
            };
             filter: grayscale(10);
            object-fit: cover;
            object-position: top;
            animation: logoAnime2 5s linear infinite;

            @keyframes logoAnime2 {
              0% {
                transform: translateY(0px);
                  filter: grayscale(0);
                
              }
              25% {
                transform: translateY(10px);
            filter: grayscale(10);
                filter: drop-shadow(0px 14px 15px rgba(0, 0, 0, 0.4));
              }
              100% {
                transform: translateY(0px);
                  filter: grayscale(0);
              }
            }
          }

   .Animation-3 {
            width: 100px;
            height: 100px;
             border-radius: ${ImageTheme[0].LogoBorderRadius}${
              ImageTheme[0].LogoBorderRadiusUnit
            };
            object-fit: cover;
            object-position: top;
            animation: logoAnime3 6s linear infinite;

            @keyframes logoAnime3 {
              0% {
                scale: 1;
                border-radius: 0px;
              }
              50% {
                scale: 1;
                border-radius: 50%;
              }
              100% {
                scale: 1;
                border-radius: 0px;
              }
            }
          }

  .Animation-4 {
            width: 100px;
            height: 100px;
           border-radius: ${ImageTheme[0].LogoBorderRadius}${
              ImageTheme[0].LogoBorderRadiusUnit
            };
            object-fit: cover;
            object-position: top;
            border: 3px solid transparent;
            animation: logoAnime4 6s linear infinite;

            @keyframes logoAnime4 {
              0% {
                border-color: brown;
              }
              25% {
                border-color: #fff;
              }
              50% {
                border-color: green;
              }
              75% {
                border-color: yellow;
              }
              100% {
                border-color: royalblue;
              }
            }
          }


             .Animation-5 {
            width: 100px;
            height: 100px;
            border-radius: ${ImageTheme[0].LogoBorderRadius}${
              ImageTheme[0].LogoBorderRadiusUnit
            };
            object-fit: cover;
            object-position: top;
            border: 3px solid transparent;
            animation: logoAnime5 6s linear infinite;

            @keyframes logoAnime5 {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
              100% {
                transform: scale(1);
              }
            }
          }

            .Animation-6 {
            width: 100px;
            height: 100px;
            border-radius: ${ImageTheme[0].LogoBorderRadius}${
              ImageTheme[0].LogoBorderRadiusUnit
            };
            object-fit: cover;
            object-position: top;

            &:hover {
              animation: logoAnime6 6s linear infinite;
            }

            @keyframes logoAnime6 {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          }


        }
        .svg_image {
                 position: absolute;
        bottom: ${ImageTheme[0].LogoPosition == "absolute" ? "-4%" : ""};
        left: 0%;
        right: 0%;
        width: 100%;
        z-index: 1;
      display:${ImageTheme[0].LogoPosition == "absolute" ? "block" : "none"};

       
        }
      }
    }
        



  .basic_row_2 {
      padding: 0.5rem 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      position: relative;

      .user_details {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;

        .user_data {
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          flex: 1;
          gap: 15px;
          width: 100%;
          height: 100%;

          .user_information {
            display: flex;
            flex: 0.5;
            width: 100%;
            flex-direction: column;
            align-items: ${ButtonTheme[0].UserDataPosition};
            justify-content: center;

            h2 {
              font-size: 1.2rem;
              font-weight: 600;
              letter-spacing: 1px;
              color: ${VcardTheme[0].VCardTextColour};
            }

            p {
              font-size: 0.9rem;
              font-weight: 500;
               color: ${VcardTheme[0].VCardTextColour};
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 0rem;
              // animation: professionAnime 15s infinite linear;

              img {
                width: 40px;
                height: 40px;
                object-fit: cover;
                object-position: center;

                @media screen and (max-width: 600px) {
                  width: 25px;
                  height: 25px;
                }
              }
            }
          }
       
          .contacts_btns {
            display: flex;
            align-items: center;
            justify-content: ${ButtonTheme[0].UserDataPosition};
            gap: 10px;
            width: 100%;
            flex-wrap: wrap;

            a {
              text-decoration: none;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 5px;
              padding: 0.4rem 1rem;
                 background-color: ${ButtonTheme[0].BtnBackColour};
              color: ${ButtonTheme[0].BtnTextColour};
              border-radius: ${ButtonTheme[0].ContactBtnBorderRadius}${
              ButtonTheme[0].ContactBtnUnit
            };
              transition: all 0.4s linear;
              .icon {
                font-size: 1rem;
              }
              small {
                font-size: 0.7rem;
                font-weight: 600;
              }

              &:hover {
                  background-color: ${ButtonTheme[0].BtnHoverColour};
                filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                color: ${ButtonTheme[0].BtnHoverTextColour};
                filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                scale: 1.05;
                transition: all 0.4s linear;
              }
            }
          }

          @media screen and (max-width: 600px) {
            align-items: flex-start;
          }
        }
      }
    }



   .contact_row_3 {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;

 
      a {
        text-decoration: none;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 15px;
         color:${VcardTheme[0].VCardTextColour};


        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          padding: 5px;
               border-radius: ${ButtonTheme[0].IconBorderRadius}${
              ButtonTheme[0].IconUnit
            };
          background-color: ${ButtonTheme[0].BtnBackColour};
          color: ${ButtonTheme[0].BtnTextColour};
        }
        .contact_data {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 2px;

          small {
            font-size: 0.7rem;
            font-weight: 600;
            color: $first_text_color;
          }
          p {
            font-size: 0.9rem;
            font-weight: 500;
          }
        }
      }

      .add_to_contact {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.3rem auto;

        button {
          padding: 7px 2rem;
                   background-color: ${ButtonTheme[0].BtnBackColour};
              color: ${ButtonTheme[0].BtnTextColour};
              border-radius: ${ButtonTheme[0].ContactBtnBorderRadius}${
              ButtonTheme[0].ContactBtnUnit
            };
          font-weight: 550;
          font-size: 0.8rem;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.4s ease-in-out;
          &:hover {
              background-color: ${ButtonTheme[0].BtnHoverColour};
                filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                color: ${ButtonTheme[0].BtnHoverTextColour};
            box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
            transition: all 0.4s ease-in-out;
          }
        }
      }
    }



    .Dynamic_Vcard_Live_Title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;


  h3 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:${TitleTheme[0].TitlePosition};
    gap: 10px;
    font-family:${TitleTheme[0].TitleFont};
    font-optical-sizing: auto;
    font-weight: ${TitleTheme[0].TitleFontWeight};
    font-style: normal;

    font-size: ${TitleTheme[0].TitleSize}${TitleTheme[0].TitleUnit};
    color: ${TitleTheme[0].TitleColor};
    position: relative;

    &::first-letter {
      font-size: 1.7rem !important;
      color: $second_back__color !important;
    }
  }
}
    


.Dynamiv_vcard_sub_Title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;


  h3 {
    width: 100%;
    display: flex;
    align-items: center;
       justify-content:${TitleTheme[0].SubTitlePosition};
    gap: 10px;
    font-family:${TitleTheme[0].SubTitleFont};
    font-optical-sizing: auto;
    font-weight: ${TitleTheme[0].SubTitleFontWeight};
    font-style: normal;

    font-size: ${TitleTheme[0].SubTitleSize}${TitleTheme[0].SubTitleUnit};
        color: ${TitleTheme[0].SubTitleColor};
    position: relative;
  }
}



   .our_services {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;


      .All_Services {
        width: 100%;
        height: auto;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        .Service {
          width: 100%;
          padding: 1rem;
          background-color: ${ServiceTheme[0].ServiceBackColor};
          color:${ServiceTheme[0].ServiceTextColor} !important;
          border-radius: 3px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;

          .service_title {
            display: flex;
            align-items: center;
            justify-content: ${ServiceTheme[0].ServiceTitleAlign};

            h5 {
              font-size: ${ServiceTheme[0].ServiceTitleSize}${
              ServiceTheme[0].ServiceTitleUnit
            };
              font-weight: ${ServiceTheme[0].ServiceFontWeight};
              color:${ServiceTheme[0].ServiceTitleColor};
              font-family:${ServiceTheme[0].ServiceTitleFont};
            }
          }

          .service_description {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 10px;
            font-size: $root_text_size;
            font-weight: $root_font_weight;
            color: ${ServiceTheme[0].ServiceTextColor} !important;

            span{
                        color: ${ServiceTheme[0].ServiceTextColor} !important;
            }
          }
          .service_link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            a {
              text-decoration: none;
              color: $link_text_color;
              font-size: $root_text_size;
              font-weight: $root_font_weight;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;

              &:hover {
                text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
              }
            }
          }
          .service_image {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;

            img {
              width: 100%;
              height: 250px;
              object-fit: cover;
              object-position: center;
            }
          }

          .service_action {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .service_price {
              display: flex;
              align-items: center;
              justify-content: flex-start;

              h5 {
                font-size: 1.1rem;
                font-weight: 600;
              }
              p {
                font-size: 1rem;
                font-weight: 550;
              }
            }
            .service_enquiry {
              display: flex;
              align-items: center;
              justify-content: center;

              a {
                text-decoration: none;
                color:  ${ServiceTheme[0].BtnTextColor};
                background-color: ${ServiceTheme[0].BtnBackColor};
                padding: 0.5rem 1rem;
                border: 2px solid $third_text_color;
                font-size: $root_text_size;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;

                &:hover {
                   color:  ${ServiceTheme[0].BtnHoverTextColor};
                background-color: ${ServiceTheme[0].BtnHoverBackColor};
                }
              }
            }
          }
        }
      }
    }




        .our_products {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;


      .All_Products {
        width: 100%;
        height: auto;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        .Product {
          width: 100%;
          padding: 1rem;
       background-color: ${ProductTheme[0].ProductBackColor};
          color:${ProductTheme[0].ProductTextColor};
          border-radius: 3px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;

          .product_title {
            display: flex;
            align-items: center;
           justify-content: ${ProductTheme[0].ProductTitleAlign};

            h5 {
              font-size: ${ProductTheme[0].ProductTitleSize}${
              ProductTheme[0].ProductTitleUnit
            };
              font-weight: ${ProductTheme[0].ProductFontWeight};
              color:${ProductTheme[0].ProductTitleColor};
              font-family:${ProductTheme[0].ProductTitleFont};
            }
          }

          .product_description {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 10px;
            font-size: $root_text_size;
            font-weight: $root_font_weight;
            color:${ProductTheme[0].ProductTextColor} !important;

          span{
          color:${ProductTheme[0].ProductTextColor} !important;
            }
    
          }
          .product_link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            a {
              text-decoration: none;
              color: $link_text_color;
              font-size: $root_text_size;
              font-weight: $root_font_weight;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;

              &:hover {
                text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
              }
            }
          }
          .product_image {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;

            img {
              width: 100%;
              height: 200px;
              object-fit: cover;

              object-position: center;
            }
          }

          .product_action {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .product_price {
              display: flex;
              align-items: center;
              justify-content: flex-start;

              h5 {
                font-size: 1.1rem;
                font-weight: 600;
              }
              p {
                font-size: 1rem;
                font-weight: 550;
              }
            }
            .product_enquiry {
              display: flex;
              align-items: center;
              justify-content: center;

              a {
                text-decoration: none;
                color:  ${ProductTheme[0].ProductBtnTextColor};
                background-color: ${ProductTheme[0].ProductBtnBackColor};
                padding: 0.5rem 1rem;
                border: 2px solid $third_text_color;
                font-size: $root_text_size;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;

                &:hover {
                     color:  ${ProductTheme[0].ProductBtnHoverTextColor};
                background-color: ${ProductTheme[0].ProductBtnHoverBackColor};
                }
              }
            }
          }
        }
      }
    }




       .Payment {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;


      .payment_details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-items: flex-start;
        gap: 10px;
        width: 100%;

        .detail {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex: 1;
          width: 100%;

          .detail_title {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            font-size: 1rem;
            font-weight: 550;
            flex: 0.4;

            h5 {
              font-size: 0.8rem;
              font-weight: 600;
            }
          }

          .detail_message {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 5px;

            font-weight: 550;
            flex: 0.6;

            p {
              font-size: 0.8rem;
              font-weight: 500;
            }
  .bussiness{
                font-size: 0.8rem;
              font-weight: 500;
              background-color: ${ButtonTheme[0].BtnBackColour};
              color: ${ButtonTheme[0].BtnTextColour};
              border-radius: ${ButtonTheme[0].ContactBtnBorderRadius}${
              ButtonTheme[0].ContactBtnUnit
            };
              }
            .icon {
              font-size: 1.2rem;
              cursor: pointer;
                 color: ${ButtonTheme[0].BtnBackColour};

              &:hover {
             color: ${ButtonTheme[0].BtnHoverColour};
              }
            }
          }
        }
      }

      .sub_title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        // margin-bottom: 1rem;

        h3 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;

          font-weight: 550;
          font-family: "Montserrat", sans-serif;
          font-optical-sizing: auto;

          font-style: normal;
          font-size: 1.05rem !important;
          color: $sub_title_color;
          position: relative;
        }
      }
      .account_details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-items: flex-start;
        gap: 10px;
        width: 100%;

        .detail {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex: 1;
          width: 100%;

          .detail_title {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            font-size: 1rem;
            font-weight: 550;
            flex: 0.4;

            h5 {
              font-size: 0.8rem;
              font-weight: 600;
            }
          }

          .detail_message {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 5px;

            font-weight: 550;
            flex: 0.6;

            p {
              font-size: 0.8rem;
              font-weight: 500;
            }
                .bussiness{
                font-size: 0.8rem;
              font-weight: 500;
              background-color: ${ButtonTheme[0].BtnBackColour};
              color: ${ButtonTheme[0].BtnTextColour};
              border-radius: ${ButtonTheme[0].ContactBtnBorderRadius}${
              ButtonTheme[0].ContactBtnUnit
            };
              }
            .icon {
              font-size: 1.2rem;
              cursor: pointer;
              color: ${ButtonTheme[0].BtnBackColour};

              &:hover {
                color: ${ButtonTheme[0].BtnHoverColour};
              }
            }
          }
        }
      }
      .qr_code_upi_name {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        // margin-bottom: 1rem;

        h4 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;

          font-weight: 550;
          font-family: "Montserrat", sans-serif;
          font-optical-sizing: auto;

          font-style: normal;
          font-size: 0.7rem !important;
          color: ${VcardTheme[0].VCardTextColour};
          position: relative;
        }
      }
      .qr_image_box {
        width: 60%;
        height: auto;
      
  
        border-radius: 10px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .user_name {
          display: flex;
          align-items: center;
          justify-content: center;

          h4 {
            font-size: 1rem;
            font-weight: 550;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
          }
        }
        .qr_image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 80%;
            height: 100%;
            object-fit: cover;
            margin: auto;
          }
        }
      }
    }


.Appoinment {
              padding: 1rem;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              gap: 1rem;
              position: relative;
        
           
              .popup_message_container {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2;
                position: absolute;
                top: 10%;
                left: 20%;
        
                .popup_success_box {
                  // display: 300px;
                  z-index: 2;
        
                  background-color: #fff;
                  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
                    rgb(209, 213, 219) 0px 0px 0px 1px inset;
                  border-radius: 5px;
                  padding: 0.5px 1rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 1rem;
                  position: relative;
                  transition: transform 0.5s ease-in-out;
                  z-index: -1;
                  .popup_close {
                    i {
                      font-size: 1.4rem;
                      font-weight: 600;
                      color: rgb(255, 79, 79);
                      cursor: pointer;
                      transition: all 0.5s ease;
                      &:hover {
                        transform: rotate(90deg);
                        transition: all 0.5s ease;
                      }
                    }
                  }
                  .popup_message {
                    font-size: 0.9rem;
                    color: #525252;
                    font-weight: 550;
                  }
                }
                #successOpen {
                  transform: translateX(0px);
                  transition: transform 0.5s ease-in-out;
                }
                #successClose {
                  transform: translateX(500px);
        
                  transition: transform 0.5s ease-in-out;
                }
                .popup_error_box {
                  display: inline-block;
                  height: 40px;
                  background-color: rgb(255, 177, 141) !important;
                  border-radius: 5px;
                  padding: 0px 3rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 3rem;
                  position: relative;
                  z-index: -1;
                  .popup_close {
                    i {
                      font-size: 1.4rem;
                      color: rgb(255, 255, 255);
                      font-weight: 600;
                      cursor: pointer;
                      transition: all 0.5s ease;
                      &:hover {
                        transform: rotate(90deg);
                        transition: all 0.5s ease;
                      }
                    }
                  }
                  .popup_message {
                    font-size: 0.9rem;
                    color: #494949;
                    font-weight: 550;
                  }
                }
              }
              .appinment_form_container {
                width: 100%;
        
                form {
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  justify-content: flex-start;
                  gap: 5px;
                  width: 100%;
        
              
                  .form_group{

                    input{
                      background-color: transparent;
                      border:${AppoinmentTheme[0].InputBorderColor};
                      color:${AppoinmentTheme[0].InputColor};

                        &::placeholder{
                      color:${AppoinmentTheme[0].PlaceholderColor};
                      font-size:0.7rem;
                      }
                    }
                      label{
                      font-size:0.8rem !important;
                      color:${AppoinmentTheme[0].LabelColor} !important;
                      }
          .labelError {
              color: ${AppoinmentTheme[0].InputError} !important;
              font-family: 500;
              font-size: 0.6rem;
            }

            .input_error {
              border: 1px solid red  !important;
              border-radius: 5px;
            }

            .error {
              position: absolute;
              top: 12%;
              right: 0%;
              color: $error_text_color;
              font-size: 0.7rem;
              padding: 5px 0px 0px 0px;
            }

            .desc_error {
              position: absolute;
              top: 0%;
              right: 0%;
              color: $error_text_color;
              font-size: 0.7rem;
              padding: 5px 0px 0px 0px;
            }
                    input[type=date]{
                      width: 100%;
                      outline:none;
                       
                          color:${AppoinmentTheme[0].InputColor};
                    }
                    select{
                      width: 100%;
                      background-color: transparent;
                       outline:none;
                  
                          color:${AppoinmentTheme[0].InputColor};

                          option{
                          color:gray;
                          }
                    }
                  }
                  .Design1 {
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design1 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: 1px solid ${AppoinmentTheme[0].InputBorderColor};
                      border-radius: 0.3rem;
                      font-size: 0.9rem;
                      letter-spacing: 1px;

                    &::placeholder{
                      color:${AppoinmentTheme[0].PlaceholderColor};
                      font-size:0.7rem;
                      }
                      &:focus {
                        border: 1px solid ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        };
                      }
                      &:focus + .icon {
                        color: ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        }; // Change icon color when input is focused
                      }
                    }
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                        color:${AppoinmentTheme[0].LabelColor} !important;
                      display: none;
        
                      sup {
                          color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                    .icon {
                      position: absolute;
                      top: 20%;
                      left: 2%;
        
                      font-size: 1.3rem;
        
                      color: ${AppoinmentTheme[0].InputBorderColor};
                    }
                    .iconwithlabel {
                      position: absolute;
                      top: 55%;
                      left: 2%;
        
                      font-size: 1.3rem;
         color: ${AppoinmentTheme[0].InputBorderColor};
                    }
                    .iconwithanimation {
                        position: absolute;
                        top: 55%;
                        left: 2%;
          
                        font-size: 1.3rem;
          
                        color: ${AppoinmentTheme[0].InputBorderColor};
                      }
                  }
                  .Design2 {
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design2 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: none;
                      border-bottom: 1px solid ${
                        AppoinmentTheme[0].InputBorderColor
                      };
                      position: relative;
                      font-size: 0.9rem;
                      letter-spacing: 1px;
        
                      &:focus {
                        border-bottom: 1px solid ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        };
                      }
                      &:focus + .icon {
                        color: ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        }; // Change icon color when input is focused
                      }
                    }
        
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                      color: ${AppoinmentTheme[0].LabelColor};
                      display: none;
        
                      sup {
                          color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                    .icon {
                      position: absolute;
                      top: 20%;
                      left: 2%;
        
                      font-size: 1.3rem;
        
                      color: ${AppoinmentTheme[0].InputBorderColor};
                    }
                    .iconwithlabel {
                      position: absolute;
                      top: 55%;
                      left: 2%;
        
                      font-size: 1.3rem;
        
                       color: ${AppoinmentTheme[0].InputBorderColor};
                    }
                    .iconwithanimation {
                        position: absolute;
                        top: 55%;
                        left: 2%;
          
                        font-size: 1.3rem;
          
                       color: ${AppoinmentTheme[0].InputBorderColor};
                      }
                  }
                  .Design3 {
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design3 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: 1px solid ${AppoinmentTheme[0].InputBorderColor};
                      border-radius: 0.3rem;
                      font-size: 0.9rem;
                      letter-spacing: 1px;
        
                      &:focus {
                        border: 1px solid ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        };
                      }
                      &:focus + .icon {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus}; 
                      }
                      &:focus + .iconwithlabel {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus};
                      }
                    }
        
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                      color: ${AppoinmentTheme[0].LabelColor};
                      display: block;
        
                      sup {
                           color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                  
                    .icon {
                      position: absolute;
                      top: 55%;
                      left: 2%;
        
                      font-size: 1.3rem;
        
                      color: ${AppoinmentTheme[0].InputBorderColor};
                    }
                    .icon {
                        position: absolute;
                        top: 55%;
                        left: 2%;
          
                        font-size: 1.3rem;
          
                        color: ${AppoinmentTheme[0].InputBorderColor};
                      }
                  }
                  .Design4 {
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design4 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: none;
                      border-bottom: 1px solid ${
                        AppoinmentTheme[0].InputBorderColor
                      };
                      position: relative;
                      font-size: 0.9rem;
                      letter-spacing: 1px;
        
                      &:focus {
                        border-bottom: 1px solid ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        };
                      }
                      &:focus + .icon {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus};
                      }
                      &:focus + .icon {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus}; 
                      }
                    }
        
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                      color: ${AppoinmentTheme[0].LabelColor};
                      display: block;
        
                      sup {
                           color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                   
                    
                    .icon {
                        position: absolute;
                        top: 55%;
                        left: 2%;
          
                        font-size: 1.3rem;
          
                      color: ${AppoinmentTheme[0].InputBorderColor};
                      }
                  }
                  .Design5 {
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design5 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: 1px solid ${AppoinmentTheme[0].InputBorderColor};
                      border-radius: 0.3rem;
                      font-size: 0.9rem;
                      letter-spacing: 1px;
                      box-shadow: none;
                      transition: box-shadow 0.3s ease;
        
                      &:focus {
                        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
                      }
                     
                      &:focus + .icon {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus};
                      }
                    }
        
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                         color:${AppoinmentTheme[0].LabelColor} !important;
                      display: block;
        
                      sup {
                        color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                   
                    .icon {
                      position: absolute;
                      top: 55%;
                      left: 2%;
        
                      font-size: 1.3rem;
        
                      color: ${AppoinmentTheme[0].InputBorderColor};
                    }
                                }
                  .Design6 {
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design6 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: none;
                      border-bottom: 1px solid ${
                        AppoinmentTheme[0].InputBorderColor
                      };
                      position: relative;
                      font-size: 0.9rem;
                      letter-spacing: 1px;
        
                      &::placeholder {
                        transition: opacity 0.4s ease;
                        opacity: 1;
                      }
        
                      &:focus::placeholder {
                        opacity: 0;
                      }
                      &:focus {
                        border-bottom: 1px solid ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        };
                      }
                      &:focus + .icon {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus}; 
                      }
                      &:focus + .icon {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus};
                      }
                    }
        
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                         color:${AppoinmentTheme[0].LabelColor} !important;
                      display: block;
        
                      sup {
                           color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                    
                 
                   
                    .icon {
                        position: absolute;
                        top: 55%;
                        left: 2%;
          
                        font-size: 1.3rem;
          
                         color: ${AppoinmentTheme[0].InputBorderColor};
                      }
                  }
                  .Design7 {
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design7 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: 1px solid ${AppoinmentTheme[0].InputBorderColor};
                      border-radius: 0.3rem;
                      font-size: 0.9rem;
                      letter-spacing: 1px;
                      box-shadow: none;
                      transition: box-shadow 0.3s ease;
        
                      @keyframes shake {
                        0%,
                        100% {
                          transform: translateX(0);
                        }
                        20%,
                        60% {
                          transform: translateX(-5px);
                        }
                        40%,
                        80% {
                          transform: translateX(0px);
                        }
                      }
        
                      &:focus {
                        animation: shake 1s ease-in-out;
                        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
                      }
                      &:focus + .icon {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus};
                      }
                      &:focus + .icon {
                        color: ${AppoinmentTheme[0].InputBorderOnFocus}; 
                      }
                    }
        
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                      color: ${AppoinmentTheme[0].LabelColor};
                      display: block;
        
                      sup {
                        color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                 
                   
                    .icon {
                        position: absolute;
                        top: 55%;
                        left: 2%;
          
                        font-size: 1.3rem;
          
                                  color: ${AppoinmentTheme[0].InputBorderColor};
                      }
                  }
                  .Design8{
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design8 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: none;
                      border-bottom: 1px solid ${
                        AppoinmentTheme[0].InputBorderColor
                      };
                      position: relative;
                      font-size: 0.9rem;
                      letter-spacing: 1px;
        
                      &::placeholder {
                        transition: opacity 0.4s ease;
                        opacity: 1; // Full opacity by default
                      }
        
                      &:focus::placeholder {
                        opacity: 0; // Fades out the placeholder when focused
                      }
        
                      &:focus {
                        border-bottom: 1px solid ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        };
                        animation: bounce 1s ease-in-out;
                      }
                      @keyframes bounce {
                        0%,
                        20%,
                        50%,
                        80%,
                        100% {
                          transform: translateY(0);
                        }
                        40% {
                          transform: translateY(-5px);
                        }
                        60% {
                          transform: translateY(-2px);
                        }
                      }
                      &:focus + .icon {
                        color: ${
                          AppoinmentTheme[0].InputBorderOnFocus
                        }; // Change icon color when input is focused
                      }
                      &:focus + .iconwithlabel {
                         color: ${
                           AppoinmentTheme[0].InputBorderOnFocus
                         };  // Change icon color when input is focused
                      }
                    }
        
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                      color: ${AppoinmentTheme[0].InputBorderColor};
                      display: block;
        
                      sup {
                          color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                  
                    .icon {
                      position: absolute;
                      top: 55%;
                      left: 2%;
        
                      font-size: 1.3rem;
        
                        color: ${AppoinmentTheme[0].InputBorderColor};
                    }
               
                  }
                  .Design9{
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 100%;
                    position: relative;
        
                    .Design9 {
                      padding: 0.5rem 2rem;
                      outline: none;
                      width: 100%;
                      border: 1px solid ${AppoinmentTheme[0].InputBorderColor};
                      border-radius: 0.3rem;
                      font-size: 0.9rem;
                      letter-spacing: 1px;
                      box-shadow: none;
                      transition: box-shadow 0.3s ease;
        
                      @keyframes shake {
                        0%,
                        100% {
                          transform: translateY(0);
                        }
                        20%,
                        60% {
                          transform: translateY(-3px);
                        }
                        40%,
                        80% {
                          transform: translateY(0px);
                        }
                      }
                      @keyframes rotate {
                          from {
                            transform: rotate(0deg);
                          }
                          to {
                            transform: rotate(360deg);
                          }
                        }
        
                      &:focus {
                        animation: shake 1s ease-in-out;
                        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); // Blue glowing effect on focus
                      }
                    
                      &:focus + .icon {
                          color: ${
                            AppoinmentTheme[0].InputBorderOnFocus
                          }; // Change icon color when input is focused
                          animation: rotate 0.5s ease-in-out;
                        }
                    }
                 
                    label {
                      font-size: 0.9rem;
                      font-weight: 500;
                        color:${AppoinmentTheme[0].LabelColor} !important;
                      display: block;
        
                      sup {
                           color:${AppoinmentTheme[0].InputError} !important;
                        font-size: 1rem;
                      }
                    }
                    .slideLabel {
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        transition: all 0.3s ease;
                        pointer-events: none;
                      }
                 
                    .icon {
                      position: absolute;
                      top: 55%;
                      left: 2%;
        
                      font-size: 1.3rem;
        
                      color: ${AppoinmentTheme[0].InputBorderColor};
                    }
                   
                  }
                  .form_submit {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                    margin: 1rem auto;
                    width: 100%;
        
                    button {
                      display: flex;
                      align-self: center;
                      justify-content: center;
                      gap: 0.5rem;
                      // width: 100%;
                      outline: none;
                      padding: 6px 1rem;
                      background-color: ${ButtonTheme[0].BtnBackColour};
                      color: ${ButtonTheme[0].BtnTextColour};
                      font-size: 0.8rem;
                      border-radius: 0.3rem;
                      font-weight: 500;
        
                      transition: all 0.4s ease-in;
        
                      span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.9rem;
                      }
                      .inquiryloader {
                        width: 18px;
                        height: 18px;
                        border: 2px solid #fff;
                        border-bottom-color: transparent;
                        border-radius: 50%;
                        display: inline-block;
                        box-sizing: border-box;
                        animation: rotation 1s linear infinite;
                      }
        
                      @keyframes rotation {
                        0% {
                          transform: rotate(0deg);
                        }
                        100% {
                          transform: rotate(360deg);
                        }
                      }
                      &:hover {
                        background-color: ${ButtonTheme[0].BtnHoverColour};
                        color:${ButtonTheme[0].BtnHoverTextColour};
                        filter: drop-shadow(0px 4px 5px rgba(109, 109, 109, 0.4));
                      }
        
                      &:nth-child(2) {
                        background-color: royalblue;
        
                        &:hover {
                          background-color: rgb(248, 137, 118);
                        }
                      }
                    }
                  }
                }
              }
            }



        .time_container {
      width: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .time_list_container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        place-items: center;
        gap: 1rem 1rem;
        margin: 1rem auto;

        .time_list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 5px 1rem 5px 1rem;
          background-color: ${TimerTheme[0].TimerBackColour};
          width: 100%;
          height: 80px;
          max-height: 80px;
          min-height: 80px;
          border-radius: ${TimerTheme[0].TimerBoxBorderRadius}px;

          .day {
            // display: block;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;

            span {
              font-size: 0.7rem;
              font-weight: 550;
              color: ${TimerTheme[0].TimerTitleColor};

              &::after {
                content: "";
                display: block;
                height: 1px;
                background-color: $second_text_color;
                width: 100%;
              }
            }
          }
          .time {
            width: 100%;
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-top: 0px;
            // background-color: #fff;

            .start {
            width:50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 5px;

              h6 {
              width:100%;
              display: flex;
           
              align-items: center;
              justify-content: center;
                font-size: 0.5rem;
                font-weight: 600;
                color: ${TimerTheme[0].TimerSubTitleColor};
              
              }
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.6rem;
                color: ${TimerTheme[0].TimerTextColour};
                font-weight: 550;
              }
            }
            .end {
            width:50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 5px;
              
              h6 {
                width:100%;
              display: flex;
           
              align-items: center;
              justify-content: center;
                font-size: 0.5rem;
                font-weight: 500;
                 color: ${TimerTheme[0].TimerSubTitleColor};
              }
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                  color: ${TimerTheme[0].TimerTextColour};
                font-size: 0.6rem;
                font-weight: 550;
              }
            }
          }
          //    @media screen and (max-width:600px){
          //     height: 150px;
          //    }
        }
        @media screen and (max-width: 700px) {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }
    }


        .testimonial {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      position: relative;
    

      .testimonial_container {
        margin: 1rem auto;
        width: 100%;
        height:auto;
        min-height: 150px;

        .testimonial_list {
          margin: 1rem 1rem;
          width: 100%;
          height: auto;
          min-height: 150px;
          
          background-color:${TestimonialTheme[0].TestimonialBackColor};
          color:${TestimonialTheme[0].TestimonialTextColor};
          overflow-y: auto;
          margin: auto;
          display: flex;
          flex-direction: ${TestimonialTheme[0].FlexDirection};
          align-items: center;
          justify-content: flex-start;
              border-radius: ${TestimonialTheme[0].TestimonialBorderRadius}px;
              border-top-left-radius:${
                TestimonialTheme[0].TestimonialBorderRadius.includes(",")
                  ? TestimonialTheme[0].TestimonialBorderRadius.split(",")[0]
                  : ""
              }px;
                border-bottom-left-radius:${[
                  TestimonialTheme[0].TestimonialBorderRadius.includes(",")
                    ? TestimonialTheme[0].TestimonialBorderRadius.split(",")[1]
                    : "",
                ]}px ;
                          border-top-right-radius:${[
                            TestimonialTheme[0].TestimonialBorderRadius.includes(
                              ","
                            )
                              ? TestimonialTheme[0].TestimonialBorderRadius?.split(
                                  ","
                                )[2]
                              : "",
                          ]}px ;
                                  border-bottom-right-radius:${[
                                    TestimonialTheme[0].TestimonialBorderRadius.includes(
                                      ","
                                    )
                                      ? TestimonialTheme[0].TestimonialBorderRadius?.split(
                                          ","
                                        )[3]
                                      : "",
                                  ]}px ; 
padding:10px;
          position: relative;

          .client_feedback {
            width: 100%;
            flex: 0.7;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction:column;
            gap: 10px;
            padding: 10px;
            height: 100%;
       min-height: 100%;

            .feedback_title{
            color: ${TestimonialTheme[0].TestimonialTitleColor} !important;
              h4 {
                font-size: 0.9rem;
                font-weight: 550;
                color: ${TestimonialTheme[0].TestimonialTitleColor} !important;
              }
            }
            .feedback_message{
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
         color:${TestimonialTheme[0].TestimonialTextColor};
              small {
                width: 100%;
                font-size: 0.8rem;
                
                font-weight: 500;
                overflow-y: scroll;
                text-align: start !important;
       color:${TestimonialTheme[0].TestimonialTextColor} !important;
                &::-webkit-scrollbar {
                  display: none;
                }
              }
            }

        

         
          }
          .user_detail {
            display: flex;
            align-items: ${TestimonialTheme[0].UserDataAlignItems};
            flex-direction:  ${TestimonialTheme[0].UserDataFlexDirection};
            width: 100%;
            height: 100%;
             min-height: 100%;
            flex: 0.3;
            justify-content: ${TestimonialTheme[0].UserDataJustifyContent};
            gap: 10px;

            // background-color: $first_btn_back_color;
            border-bottom-left-radius: 6rem;
            border-top-left-radius: 6rem;

            img {
              width: 60px;
              height: 60px;
              border-radius: ${
                TestimonialTheme[0].TestimonialImageBorderRadius
              }px;
              border-top-left-radius:${[
                TestimonialTheme[0].TestimonialImageBorderRadius.includes(",")
                  ? TestimonialTheme[0].TestimonialImageBorderRadius.split(
                      ","
                    )[0]
                  : "",
              ]}px ;
                border-bottom-left-radius:${[
                  TestimonialTheme[0].TestimonialImageBorderRadius.includes(",")
                    ? TestimonialTheme[0].TestimonialImageBorderRadius.split(
                        ","
                      )[1]
                    : "",
                ]}px ;
                          border-top-right-radius:${[
                            TestimonialTheme[0].TestimonialImageBorderRadius.includes(
                              ","
                            )
                              ? TestimonialTheme[0].TestimonialImageBorderRadius?.split(
                                  ","
                                )[2]
                              : "",
                          ]}px ;
                                  border-bottom-right-radius:${[
                                    TestimonialTheme[0].TestimonialImageBorderRadius.includes(
                                      ","
                                    )
                                      ? TestimonialTheme[0].TestimonialImageBorderRadius?.split(
                                          ","
                                        )[3]
                                      : "",
                                  ]}px ; 
              object-fit: cover;
              object-position: center;
              border: 1px solid $second_back__color;
            }
                        
            .client_name {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;

              h4 {
                font-size: 0.8rem;
                color: ${TestimonialTheme[0].TestimonialClientNameColor};
                font-weight: 550;
              }
              small {
               color:${TestimonialTheme[0].TestimonialTextColor};
                font-size: 0.7rem;

                font-weight: 550;
              }
            }

          }

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }


               .feedback_row {
      width: 100%;
      padding: 0rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0rem;
      align-items: center;
      justify-content: center;
      position: relative;

      .popup_message_container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;

        .popup_success_box {
          display: inline-block;
          width: auto;
      
          background-color: rgb(255, 255, 255);
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
            rgb(209, 213, 219) 0px 0px 0px 1px inset;
          padding: 0.7px 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          position: relative;
          font-size: 0.7rem;
          font-weight: 500;
          transition: all 0.5s ease-in-out;
          z-index: -1;

          .popup_close {
            i {
              font-size: 1.4rem;
              font-weight: 600;
              color: rgb(255, 101, 101);
              cursor: pointer;
              transition: all 0.5s ease;
              &:hover {
                transform: rotate(90deg);
                transition: all 0.5s ease;
              }
            }
            .icon {
              font-size: 1.2rem;
              color: #2cc478;
            }
          }
          .popup_message {
            font-size: 0.9rem;
            color: rgb(48, 48, 48);
            font-weight: 500;
          }
        }
        #successOpen {
          scale: 1;
          opacity: 1;
          transition: all 0.5s ease-in-out;
        }
        #successClose {
          scale: 0;
          opacity: 0;

          transition: all 0.5s ease-in-out;
        }
        .popup_error_box {
          display: inline-block;
          height: 40px;
          background-color: rgb(255, 177, 141) !important;
          border-radius: 5px;
          padding: 0px 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          position: relative;
          z-index: -1;
          .popup_close {
            i {
              font-size: 1.4rem;
              color: rgb(255, 255, 255);
              font-weight: 600;
              cursor: pointer;
              transition: all 0.5s ease;
              &:hover {
                transform: rotate(90deg);
                transition: all 0.5s ease;
              }
            }
          }
          .popup_message {
            font-size: 0.9rem;
            color: #2cc478;
            font-weight: 550;
          }
        }
      }
   
      .Feedback_container_message {
        width: 100%;
        height: auto;
        // padding: 0rem 0.5rem;
        margin: 0rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .feeback_title {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          justify-content: space-between;
          gap: 10px;
          z-index: 800;

          button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            // padding: 0.7rem 1rem;
            font-size: 0.7rem;
            color: $first_btn_back_color;
            background: transparent;
            cursor: pointer;
            outline: none;
            border: transparent;
            font-weight: 600;
            position: relative;
            padding-top: 1rem;

            i {
              font-size: 1.4rem;
              color: rgb(43, 43, 43);
            }

            .count {
              position: absolute;
              right: -7%;
              top: 20%;

              font-size: 0.8rem;

              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              color: #474747;

              border-radius: 50%;
            }
          }
          .feedBack_loader {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: block;
            margin: 15px auto;
            position: relative;
            color: #253bff;
            left: -100px;
            box-sizing: border-box;
            animation: shadowRolling 2s linear infinite;
          }

          @keyframes shadowRolling {
            0% {
              box-shadow: 0px 0 rgba(255, 255, 255, 0),
                0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
                0px 0 rgba(255, 255, 255, 0);
            }
            12% {
              box-shadow: 100px 0 rgb(76, 247, 176),
                0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
                0px 0 rgba(255, 255, 255, 0);
            }
            25% {
              box-shadow: 110px 0 rgb(107, 98, 233), 100px 0 rgb(75, 45, 243),
                0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
            }
            36% {
              box-shadow: 120px 0 rgb(94, 236, 255), 110px 0 rgb(226, 253, 72),
                100px 0 rgb(219, 99, 119), 0px 0 rgba(255, 255, 255, 0);
            }
            50% {
              box-shadow: 130px 0 rgb(240, 135, 49), 120px 0 rgb(56, 163, 74),
                110px 0 rgb(99, 95, 95), 100px 0 rgb(135, 111, 221);
            }
            62% {
              box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 white,
                120px 0 white, 110px 0 white;
            }
            75% {
              box-shadow: 200px 0 rgba(255, 255, 255, 0),
                200px 0 rgba(255, 255, 255, 0), 130px 0 white, 120px 0 white;
            }
            87% {
              box-shadow: 200px 0 rgba(255, 255, 255, 0),
                200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
                130px 0 white;
            }
            100% {
              box-shadow: 200px 0 rgba(255, 255, 255, 0),
                200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
                200px 0 rgba(255, 255, 255, 0);
            }
          }
        }
        .comment_box {
          width: 100%;
          max-height: 300px;
          height: auto;
          overflow: scroll;

          margin: 1rem auto;
          background: transparent;
    
          background: transparent;

          border-radius: 5px;
          position: relative;

          .comment_box_title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            background-color: royalblue;
            color: #fff;
            font-weight: 400;
            display: none;
          }
          .message {
            width: 100%;
            padding: 10px;
            border-bottom: 2px solid rgb(238, 237, 237);
            position: relative;
            .user_detail {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 1rem;

              .details {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 5px;

                .userName {
                  p {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-size: 1.1rem;

                    color: rgb(22, 22, 22);
                    letter-spacing: 1px;
                    font-weight: 550;

                    i {
                      color: rgb(94, 94, 94);
                      font-size: 1.4rem;
                    }

                    &::first-letter {
                      text-transform: uppercase !important;
                    }
                  }
                }
                .stars {
                  .ratting_container1 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.3rem;

                    span {
                      i {
                        font-size: 1.2rem;
                        cursor: pointer;
                        color: lightgray;
                        transition: all 0.4s ease-in-out;

                
                      }

                      .highlight1 {
                        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                        color: gold;
                      }
                    }
                  }

                  #noRatting {
                    span:nth-child(1),
                    span:nth-child(2),
                    span:nth-child(3),
                    span:nth-child(4),
                    span:nth-child(5) {
                      i {
                        text-decoration: line-through;
                        text-decoration-color: #ff2525;
                      }
                    }
                  }

                  #singleRatting {
                    span:nth-child(1) {
                      i {
                        color: #f7c52a;
                        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                      }
                    }
                  }
                  #doubleRatting {
                    span:nth-child(1),
                    span:nth-child(2) {
                      i {
                        color: #f7c52a;
                        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                      }
                    }
                  }
                  #ThreeRatting {
                    span:nth-child(1),
                    span:nth-child(2),
                    span:nth-child(3) {
                      i {
                        color: #f7c52a;
                        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                      }
                    }
                  }
                  #fourRatting {
                    span:nth-child(1),
                    span:nth-child(2),
                    span:nth-child(3),
                    span:nth-child(4) {
                      i {
                        color: #f7c52a;
                        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                      }
                    }
                  }
                  #fullRatting {
                    span:nth-child(1),
                    span:nth-child(2),
                    span:nth-child(3),
                    span:nth-child(4),
                    span:nth-child(5) {
                      i {
                        color: #f7c52a;
                        filter: drop-shadow(
                          0px 4px 5px rgba(165, 165, 165, 0.4)
                        );
                      }
                    }
                  }
                }
              }
            }
            .comments {
              margin: 10px auto;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 10px;
              width: 100%;

              i {
                color: royalblue;
                font-size: 1.4rem;
              }
              span {
                font-size: 0.9rem;
                color: #272727;
              }
            }

            .date {
              position: absolute;
              right: 2%;
              top: 15%;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              font-size: 0.9rem;
              color: rgb(68, 68, 68);

              i {
                color: darkcyan;
                font-size: 1.1rem;
              }
            }
          }

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }

      .feedback_container {
        width: 100%;
        position: relative;


        form {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: auto;
          padding: 0px 0.5rem 0rem 0.5rem;


          .feedback_svg {
            position: absolute;
            top: -4%;
            right: 0%;

            img {
              width: 100px;
              object-fit: cover;
              object-position: center;

              @media (max-width: 600px) {
                width: 90px;
              }
            }

            @media (max-width: 600px) {
              top: -0%;
            }
          }
          .form_group {
            margin: 10px auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 95%;
            position: relative;
            margin: 0.2rem 0.2rem;

            .error {
              font-size: 0.6rem;
              color: $error_text_color !important;
              -webkit-text-fill-color: ${FeedbackTheme[0]?.FeedbackInputError};
              letter-spacing: 1px;
      
              display: flex;
              align-items: center;
              font-weight: 550;
              justify-content: flex-start;
            }
            label {
              display: flex;
              align-items: center;
              justify-content: flex-start;

              left: 5%;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
     
              -webkit-text-fill-color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              font-size: 0.6rem !important;
              font-weight: 550;

              border-radius: 4px;

              span {
                font-size: 1rem;
                color: $error_text_color !important;
                -webkit-text-fill-color: ${
                  FeedbackTheme[0]?.FeedbackInputError
                };
                sup {
                  color: ${FeedbackTheme[0]?.FeedbackInputError} !important;
                }
              }

              @media screen and (max-width: 800px) {
                left: 5%;
              }
            }

            input
             {
              width: 100%;
       
       background-color: transparent;
    outline: none;
color:${FeedbackTheme[0]?.FeedbackInputColor} !important;
              transition: all 0.3s ease;
              &::placeholder {
                font-size: 0.6rem;
                color: ${FeedbackTheme[0]?.FeedbackPlaceholderColor};
                letter-spacing: 1px;
                font-weight: 400;
              }
              &:focus {
                background-color: transparent;
   
                background-origin: border-box;
                background-clip: padding-box, border-box;
                transition: all 0.3s ease;
              }

              @media screen and (max-width: 800px) {
                padding: 0.8rem 2rem;
                width: 100%;
                background-color: transparent;
              }
            }

            .ratting_container {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 0.5rem;

              span {
                i {
                  font-size: 1.5rem;
                  cursor: pointer;
                  color: rgb(255, 168, 54);
                  transition: all 0.4s ease-in-out;

        
                }
                .highlight {
                  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                  color: gold;
                }
              }
            }
            textarea {
              width: 100%;
              padding: 0.7rem 2rem;
     
    
   
              background-color: transparent;
        

    
              outline: none;

              transition: all 0.3s ease;
              caret-color : ${FeedbackTheme[0].FeedbackInputColor};
              &::placeholder {
                font-size: 0.6rem;
                color: ${FeedbackTheme[0]?.FeedbackPlaceholderColor};
                letter-spacing: 1px;
                font-weight: 400;
              }
              &:focus {
      
                background-color: transparent;
    

      
                transition: all 0.3s ease;
              }

              @media screen and (max-width: 800px) {
                padding: 0.8rem 2rem;
                width: 100%;
                background-color: transparent;
              }
            }

            .icon {
              position: absolute;
              left: 1%;
              top: 63%;

              img {
                width: 25px;
                height: 25px;
              }
              i {
                font-size: 1.4rem;
             
              }

              @media screen and (max-width: 800px) {
                position: absolute;
                left: 2%;
                top: 25%;
              }
            }
            .show_pass {
              position: absolute;
              right: 2%;
              top: 25%;

              i {
                font-size: 1.4rem;
                color: skyblue;
                cursor: pointer;
              }

              @media screen and (max-width: 800px) {
                position: absolute;
                right: 2%;
                top: 25%;
              }
            }

            @media screen and (max-width: 900px) {
              margin: 0.8rem auto;
            }
          }
          .Design1 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design1 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;

            &::placeholder{
              color:${FeedbackTheme[0]?.FeedbackPlaceholderColor};
              font-size:0.7rem;
              }
              &:focus {
                border: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                }; // Change icon color when input is focused
              }
            }
         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: gray;
              display: none;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
            .icon {
              position: absolute;
              top: 20%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .iconwithlabel {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;
 color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .iconwithanimation {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design2 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design2 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: none;
              border-bottom: 1px solid ${
                FeedbackTheme[0]?.FeedbackInputBorderColor
              };
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border-bottom: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                }; // Change icon color when input is focused
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              display: none;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
            .icon {
              position: absolute;
              top: 20%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .iconwithlabel {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

               color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .iconwithanimation {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
               color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design3 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design3 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus}; 
              }
              &:focus + .iconwithlabel {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
          
            .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design4 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design4 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: none;
              border-bottom: 1px solid ${
                FeedbackTheme[0]?.FeedbackInputBorderColor
              };
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border-bottom: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus}; 
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
           
            
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design5 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design5 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;
              box-shadow: none;
              transition: box-shadow 0.3s ease;

              &:focus {
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
              }
             
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: gray;
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
           
            .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
                        }
          .Design6 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design6 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: none;
              border-bottom: 1px solid ${
                FeedbackTheme[0]?.FeedbackInputBorderColor
              };
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &::placeholder {
                transition: opacity 0.4s ease;
                opacity: 1;
              }

              &:focus::placeholder {
                opacity: 0;
              }
              &:focus {
                border-bottom: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus}; 
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: gray;
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
            
         
           
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                 color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design7 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design7 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;
              box-shadow: none;
              transition: box-shadow 0.3s ease;

              @keyframes shake {
                0%,
                100% {
                  transform: translateX(0);
                }
                20%,
                60% {
                  transform: translateX(-5px);
                }
                40%,
                80% {
                  transform: translateX(0px);
                }
              }

              &:focus {
                animation: shake 1s ease-in-out;
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus}; 
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
         
           
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                          color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design8{
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design8 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: none;
              border-bottom: 1px solid ${
                FeedbackTheme[0]?.FeedbackInputBorderColor
              };
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &::placeholder {
                transition: opacity 0.4s ease;
                opacity: 1; // Full opacity by default
              }

              &:focus::placeholder {
                opacity: 0; // Fades out the placeholder when focused
              }

              &:focus {
                border-bottom: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
                animation: bounce 1s ease-in-out;
              }
              @keyframes bounce {
                0%,
                20%,
                50%,
                80%,
                100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-5px);
                }
                60% {
                  transform: translateY(-2px);
                }
              }
              &:focus + .icon {
                color: ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                }; // Change icon color when input is focused
              }
              &:focus + .iconwithlabel {
                 color: ${
                   FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                 };  // Change icon color when input is focused
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
          
            .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

                color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
       
          }
          .Design9{
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design9 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;
              box-shadow: none;
              transition: box-shadow 0.3s ease;

              @keyframes shake {
                0%,
                100% {
                  transform: translateY(0);
                }
                20%,
                60% {
                  transform: translateY(-3px);
                }
                40%,
                80% {
                  transform: translateY(0px);
                }
              }
              @keyframes rotate {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }

              &:focus {
                animation: shake 1s ease-in-out;
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); // Blue glowing effect on focus
              }
            
              &:focus + .icon {
                  color: ${
                    FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                  }; // Change icon color when input is focused
                  animation: rotate 0.5s ease-in-out;
                }
            }
         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: gray;
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
         
            .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
           
          }
          .form_actions {
            margin: 1rem auto;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 1rem auto;

            button {
              margin-right: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
               background-color: ${ButtonTheme[0].BtnBackColour};
                      color: ${ButtonTheme[0].BtnTextColour};
              filter: none;
              width: auto;
              padding: 10px 1rem;
              outline: none;
              border: transparent;

              font-weight: 500;
              letter-spacing: 1px;
              font-size: 0.6rem;
              border-radius: 5px;
              cursor: pointer;
              color: $third_text_color;
              transition: all 0.4s ease-in;

              span {
                font-size: 1.2rem;
              }
              .form_loader,
              .form_loader:before,
              .form_loader:after {
                border-radius: 50%;
                width: 1em;
                height: 1em;
                animation-fill-mode: both;
                animation: bblFadInOut 1.8s infinite ease-in-out;
              }
              .form_loader {
                color: #fff;
                font-size: 7px;
                position: relative;
                text-indent: -9999em;
                transform: translateZ(0);
                animation-delay: -0.16s;
              }
              .form_loader:before,
              .form_loader:after {
                content: "";
                position: absolute;
                top: 0;
              }
              .form_loader:before {
                left: -3.5em;
                animation-delay: -0.32s;
              }
              .form_loader:after {
                left: 3.5em;
              }

              @keyframes bblFadInOut {
                0%,
                80%,
                100% {
                  box-shadow: 0 2.5em 0 -1.3em;
                }
                40% {
                  box-shadow: 0 2.5em 0 0;
                }
              }

              &:hover {
                  background-color: ${ButtonTheme[0].BtnHoverColour};
                        color:${ButtonTheme[0].BtnHoverTextColour};
                font-weight: 550;
                transition: all 0.4s ease-in;
              }
            }
          }
        }
      }
    }



   .Inquries {
     
      width: 100%;
      padding: 0rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0rem;
      align-items: center;
      justify-content: center;
      position: relative;

   

      .popup_message_container {
        // position: relative;
    position: absolute;
    right: 3%;
    top: 5%;
        .popup_success_box {
          display: inline-block;
     
          background-color: rgb(255, 255, 255);
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
          border-radius: 5px;
          padding: 0.6px 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          position: relative;
          transition: transform 0.5s ease-in-out;
          z-index: -1;
          .popup_close {
        
    
            i {
              font-size: 1.4rem;
              font-weight: 600;
              color: rgb(255, 76, 76);
              cursor: pointer;
              transition: all 0.5s ease;
              &:hover {
                transform: rotate(90deg);
                transition: all 0.5s ease;
              }
            }
          }
          .popup_message {
            font-size: 0.9rem;
            color: #4b4b4b;
            font-weight: 550;
          }
        }
        #successOpen{
          transform: translateX(0px);
          transition: transform 0.5s ease-in-out;
        }
        #successClose{
          transform: translateX(500px);
          
          transition: transform 0.5s ease-in-out;
        }
        .popup_error_box {
          display: inline-block;
          height: 40px;
          background-color: rgb(255, 177, 141) !important;
          border-radius: 5px;
          padding: 0px 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          position: relative;
    z-index: -1;
 
          .popup_close {
    
            i {
              font-size: 1.4rem;
              color: rgb(255, 255, 255);
              font-weight: 600;
              cursor: pointer;
              transition: all 0.5s ease;
              &:hover {
                transform: rotate(90deg);
                transition: all 0.5s ease;
              }
            }
          }
          .popup_message {
            font-size: 0.9rem;
            color: #494949;
            font-weight: 550;
          }
        }
      }
      .inquiries_container5 {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        margin: auto;
    
        form {
          width: 90%;
          padding: 10px 0px;

          margin: auto;
          .form_group {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 10px;
            margin-bottom: 10px;
            margin: 10px auto;

            label {
                   font-size: 0.7rem !important;
              letter-spacing: 1px;
               color: ${FeedbackTheme[0]?.FeedbackLabelColor};
     
              -webkit-text-fill-color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              font-weight: 550;
            }
            .input {
              width: 100%;
              position: relative;
              input,
              textarea {
                width: 100%;
                padding: 0.9rem 2.5rem;
                outline: none;
                
            
                background-color: transparent;
                color:${FeedbackTheme[0]?.FeedbackInputColor} !important;
               
                caret-color: ${FeedbackTheme[0]?.FeedbackInputColor} ;

                &::placeholder {
                    color: ${
                      FeedbackTheme[0]?.FeedbackPlaceholderColor
                    } !important;
                  letter-spacing: 1px;
                  font-size: 0.7rem;
                }
              }

              i {
                position: absolute;
                left: 2%;
                font-size: 1.5rem;
                color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
                top: 30%;
              }
            }
            .labelError{
              color:  ${FeedbackTheme[0]?.FeedbackInputError} !important;
              font-weight: 450;
            }
       

            .input_error {
            
              border-radius: 5px;
            }
           
            .error {
              position: absolute;
              top: 12%;
              right: 0%;
              color:  ${FeedbackTheme[0]?.FeedbackInputError};
            
              font-size: 0.7rem;
              padding: 5px 0px 0px 0px;
            }
    
            .desc_error {
              position: absolute;
              top: 0%;
              right: 0%;
          color: ${FeedbackTheme[0]?.FeedbackInputError} !important;
              font-size: 0.7rem;
              padding: 5px 0px 0px 0px;
            }
          }

          .Design1 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design1 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;

            &::placeholder{
              color:${FeedbackTheme[0]?.FeedbackPlaceholderColor};
              font-size:0.7rem;
              }
              &:focus {
                border: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                }; // Change icon color when input is focused
              }
            }
         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: gray;
              display: none;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
            .icon {
              position: absolute;
              top: 20%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .iconwithlabel {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;
 color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .iconwithanimation {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design2 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design2 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: none;
              border-bottom: 1px solid ${
                FeedbackTheme[0]?.FeedbackInputBorderColor
              };
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border-bottom: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                }; // Change icon color when input is focused
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              display: none;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
            .icon {
              position: absolute;
              top: 20%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .iconwithlabel {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

               color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .iconwithanimation {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
               color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design3 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design3 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus}; 
              }
              &:focus + .iconwithlabel {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
          
            .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design4 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design4 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: none;
              border-bottom: 1px solid ${
                FeedbackTheme[0]?.FeedbackInputBorderColor
              };
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border-bottom: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus}; 
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
           
            
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design5 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design5 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;
              box-shadow: none;
              transition: box-shadow 0.3s ease;

              &:focus {
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
              }
             
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: gray;
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
           
            .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
                        }
          .Design6 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design6 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: none;
              border-bottom: 1px solid ${
                FeedbackTheme[0]?.FeedbackInputBorderColor
              };
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &::placeholder {
                transition: opacity 0.4s ease;
                opacity: 1;
              }

              &:focus::placeholder {
                opacity: 0;
              }
              &:focus {
                border-bottom: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus}; 
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: gray;
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
            
         
           
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                 color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design7 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design7 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;
              box-shadow: none;
              transition: box-shadow 0.3s ease;

              @keyframes shake {
                0%,
                100% {
                  transform: translateX(0);
                }
                20%,
                60% {
                  transform: translateX(-5px);
                }
                40%,
                80% {
                  transform: translateX(0px);
                }
              }

              &:focus {
                animation: shake 1s ease-in-out;
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackTheme[0]?.FeedbackInputBorderOnFocus}; 
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackLabelColor};
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
         
           
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                          color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              }
          }
          .Design8{
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design8 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: none;
              border-bottom: 1px solid ${
                FeedbackTheme[0]?.FeedbackInputBorderColor
              };
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &::placeholder {
                transition: opacity 0.4s ease;
                opacity: 1; // Full opacity by default
              }

              &:focus::placeholder {
                opacity: 0; // Fades out the placeholder when focused
              }

              &:focus {
                border-bottom: 1px solid ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                };
                animation: bounce 1s ease-in-out;
              }
              @keyframes bounce {
                0%,
                20%,
                50%,
                80%,
                100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-5px);
                }
                60% {
                  transform: translateY(-2px);
                }
              }
              &:focus + .icon {
                color: ${
                  FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                }; // Change icon color when input is focused
              }
              &:focus + .iconwithlabel {
                 color: ${
                   FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                 };  // Change icon color when input is focused
              }
            }

         
            label {
               font-size: 0.7rem !important;
              font-weight: 500;
              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
          
            .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

                color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
       
          }
          .Design9{
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 100%;
            position: relative;

            .Design9 {
              padding: 0.5rem 2rem;
              outline: none;
              width: 100%;
              border: 1px solid ${FeedbackTheme[0]?.FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;
              box-shadow: none;
              transition: box-shadow 0.3s ease;

              @keyframes shake {
                0%,
                100% {
                  transform: translateY(0);
                }
                20%,
                60% {
                  transform: translateY(-3px);
                }
                40%,
                80% {
                  transform: translateY(0px);
                }
              }
              @keyframes rotate {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }

              &:focus {
                animation: shake 1s ease-in-out;
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); // Blue glowing effect on focus
              }
            
              &:focus + .icon {
                  color: ${
                    FeedbackTheme[0]?.FeedbackInputBorderOnFocus
                  }; // Change icon color when input is focused
                  animation: rotate 0.5s ease-in-out;
                }
            }
         
            label {
                 font-size: 0.7rem !important;
              font-weight: 500;
              color: gray;
              display: block;

              sup {
                color: red;
                font-size: 1rem;
              }
            }
            .slideLabel {
                position: absolute;
                left: 10px;
                top: 10px;
                transition: all 0.3s ease;
                pointer-events: none;
              }
         
            .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

              color: ${FeedbackTheme[0]?.FeedbackInputBorderColor};
            }
           
          }
          
          .form_actions {
            // padding: 0px 1rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 1rem auto;

            button {
              width: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              background-color: ${ButtonTheme[0].BtnBackColour};
                      color: ${ButtonTheme[0].BtnTextColour};
              
              padding: 8px 1rem;
              outline: none;
              border: transparent;

              font-weight: 450;
              letter-spacing: 1px;
              font-size: 0.7rem;
              border-radius: 5px;
              cursor: pointer;

              transition: all 0.4s ease-in;

              img {
                width: 20px;
                height: 20px;
              }
              .form_loader,
              .form_loader:before,
              .form_loader:after {
                border-radius: 50%;
                width: 1em;
                height: 1em;
                animation-fill-mode: both;
                animation: bblFadInOut 1.8s infinite ease-in-out;
              }
              .form_loader {
                color: #fff;
                font-size: 7px;
                position: relative;
                text-indent: -9999em;
                transform: translateZ(0);
                animation-delay: -0.16s;
              }
              .form_loader:before,
              .form_loader:after {
                content: "";
                position: absolute;
                top: 0;
              }
              .form_loader:before {
                left: -3.5em;
                animation-delay: -0.32s;
              }
              .form_loader:after {
                left: 3.5em;
              }

              @keyframes bblFadInOut {
                0%,
                80%,
                100% {
                  box-shadow: 0 2.5em 0 -1.3em;
                }
                40% {
                  box-shadow: 0 2.5em 0 0;
                }
              }

              &:hover {
                   background-color: ${ButtonTheme[0].BtnHoverColour};
                        color:${ButtonTheme[0].BtnHoverTextColour};

                transition: all 0.4s ease-in;
                filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.5));
               
              }
            }
          }
        }
      }
    }


        .share{
          width: 100%;
          padding: 0rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          padding-bottom: 4rem;
          color:${VcardTheme[0].VCardTextColour} !important;
  
    
          .input{
            width: 100%;
            position: relative;
            
    
            input{
              padding: 0.6rem 1rem;
              outline: none;
              width: 100%;
              border: 1px solid ${VcardTheme[0].VCardTextColour};
              background-color: transparent;
              font-size: 0.9rem;
              font-weight: 500;
              color: ${VcardTheme[0].VCardTextColour};
              position: relative;
            }
    
            .icon{
              position: absolute;
              right: 4%;
              top: 15%;
              font-size: 1.5rem;
              cursor: pointer;
              
    
              &:hover{
                color: royalblue;
              }
            }
          }
    .qr_code{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
    
      .qr_actions{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        gap: 10px;
        margin: 1rem auto;
    
        button{
          padding: 0.5rem 2rem;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: ${ButtonTheme[0].BtnBackColour};
          color: ${ButtonTheme[0].BtnTextColour};
          border-radius: 0.3rem;
    
          &:hover{
              background-color: ${ButtonTheme[0].BtnHoverColour};
          color: ${ButtonTheme[0].BtnHoverTextColour};
          }
        }
    
      }
    }
    .share_input{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      position: relative;
 
    label{
      font-size: 0.8rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;
    }
      .whatsup_input{
        width: 100%;
        position: relative;
    
   
        .country-list {
          position: absolute;
          top: -215px;
        background-color: ${ButtonTheme[0].BtnBackColour};

          color:${ButtonTheme[0].BtnTextColour};

           overflow-y: scroll;
           border-radius:10px;

           &::-webkit-scrollbar{
        display: none;
      }
        }
        .mobileNumber_input{
          width: 100%;
          display: flex;
          background-color: transparent;
          .form-control {
            width: 100% !important;
            padding: 0.5rem 4rem !important;
        background-color: transparent;
           color: ${VcardTheme[0].VCardTextColour};
            input{
              padding: 0.5rem 4rem !important;
              }
          }
    
          .form-control {
            width: 100% !important;
            padding: 0.6rem 1rem;
      
          
          }
      
        }
    
        button{
          position: absolute;
          top: 0%;
          right: 0%;
          font-size: 0.7rem;
       
          padding: 0.45rem 1rem;
             background-color: ${ButtonTheme[0].BtnBackColour};

          color:${ButtonTheme[0].BtnTextColour};
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
    
          .bxl-whatsapp{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
          }

          &:hover{
                    background-color: ${ButtonTheme[0].BtnHoverColour};
          color: ${ButtonTheme[0].BtnHoverTextColour};
          }
        }
      }
    
    }
        }



    
      }

  &::-webkit-scrollbar {
    width: 6px !important;
    height: 4px !important;

    background-color:${VcardTheme[0].DesktopViewBackColor} !important;
    display:none !important;
    // z-index: 100;

    @media screen and (max-width:650px){
      display: none !important;
    }
  }
  &::-webkit-scrollbar-thumb {
    width: 6px !important;
    height: 4px !important;
    border-radius: 1px !important;
    z-index: 10;
    cursor: pointer;
       background-color: ${VcardTheme[0].VCardTextColour};

    &:hover {
      background-color: rgb(36, 231, 222);
    }
  }

}



        
 


      
        `}
          </style>
        </>
      ) : (
        <>
          <style>
            {`
    .Dynamic_Vcard_Live_Container {
  width: 100vw;
  min-height: 100vh;
  height: auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: auto;
  // color: #303030;
  overflow-y: scroll;
  overflow-x: hidden;
  background-image: url("");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background: linear-gradient(90deg, $root_backgound 50%, $root_backgound 50%);



  .full_image {
    // top: 50%;
    // left: 50%;

    // right: 50%;
    // transform: translate(-50%,-50%);
    display: none;
    z-index: 500;

    margin: auto;
    width: 100%;
    height: 800px;
    background: linear-gradient($vcard_back_color, $vcard_back_color);
z-index: 1;


    .close_Full_Image_gallery {
      position: absolute;
      width: 100%;
  
      left: 90%;
      top: 5%;
      z-index: 10;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        color: red;
        z-index: 10;

        cursor: pointer;
        place-items: center;
        transition: all 0.3s ease-in-out;

        &:hover {
          filter: drop-shadow(0px 4px 5px rgba(255, 156, 117, 0.6));
          scale: 1.2;
          transition: all 0.3s ease-in-out;
        }
      }
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
        width: auto;
        height: auto;
      filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.5));
      border-radius: 5px;
      z-index: 1000;
      object-fit: cover;
      z-index: 1;

      @media (max-width: 600px) {
        width: 70%;
        height: 150px;
      }
    }
  }

  .menu_navbar_box {
    width: 80px;
    height: 100%;
    min-height: 100%;
    background-color: $vcard_back_color;
    position: fixed;
    top: 0%;
    right: 0%;
    border-top-left-radius: 4rem;
    border-bottom-left-radius: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .up_btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0.1;
      font-size: 2.5rem;
      font-weight: bold;
      background-color: tomato;
      border-top-left-radius: 0rem;
      border-top-right-radius: 0rem;
      color: $vcard_back_color;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      .icon {
        @media screen and (max-width: 650px) {
          transform: rotate(-90deg);
          font-size: 1.5rem;
        }
      }
      &:hover {
        background: linear-gradient(120deg, #686868 40%, #686868 60%);
        transition: all 0.3s ease-in-out;
      }
      @media screen and (max-width: 650px) {
        height: 100%;
        flex: 0.1;
        display: flex;
        border-radius: 0px;
        border-top-left-radius: 0rem;
        border-bottom-left-radius: 0rem;
        flex-direction: row !important;
      }
    }
    .hideUpArrow {
      opacity: 1;
      cursor: not-allowed;
    }
    .all_menus {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      gap: 1rem;
      flex: 0.8;
      padding: 0.5rem;
      width: 100%;
      overflow-y: scroll;

      .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
        cursor: pointer;

        padding: 5px 10px;

        border-radius: 10px;
        transition: 1ll 0.5s ease-in-out;

        .icon {
          font-size: 1.4rem;
          @media screen and (max-width: 650px) {
            font-size: 1rem;
          }
        }
        p {
          font-size: 0.7rem;
          font-weight: 550;
          @media screen and (max-width: 650px) {
            font-size: 0.6rem;
          }
        }
        &:hover {
          color: $vcard_back_color;
          background-color: $first_back__color;
          transition: 1ll 0.5s ease-in-out;
        }
      }
      .menuActive {
        color: $vcard_back_color;
        background-color: $first_back__color;
      }
      &::-webkit-scrollbar {
        display: none;
      }
      @media screen and (max-width: 650px) {
        height: 100%;
        width: 100%;
        flex: 0.8;
        display: flex;
        flex-direction: row !important;
      }
    }
    .down_btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0.1;
      font-size: 2.5rem;
      font-weight: bold;
      background-color: tomato;
      border-bottom-left-radius: 0rem;
      border-bottom-right-radius: 0rem;
      color: $vcard_back_color;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease-in-out;

      .down {
        @media screen and (max-width: 650px) {
          transform: rotate(-90deg);
          font-size: 1.5rem;
        }
      }
      &:hover {
        background: linear-gradient(120deg, #686868 40%, #686868 60%);
        transition: all 0.3s ease-in-out;
      }
      @media screen and (max-width: 650px) {
        height: 100%;
        flex: 0.1;
        display: flex;
        border-radius: 0px;
        border-top-right-radius: 0rem;
        border-bottom-right-radius: 0rem;
        flex-direction: row !important;
      }
    }
    .hideDownArrow {
      opacity: 1;
      cursor: not-allowed;
    }
    @media screen and (max-width: 1000px) {
      position: fixed;
      top: 15%;
      right: 5%;
    }
    @media screen and (max-width: 700px) {
      position: fixed;
      top: 15%;
      right: 1%;
    }
    @media screen and (max-width: 650px) {
      position: fixed;
      top: 96.7%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 50px;
      min-height: 50px;
      align-items: center;
      justify-content: space-between;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
        rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    }
  }

  .Dynamic_Vcard_Live_box {
    width: 450px;
    max-width: 450px;
    margin-top: 0.5rem;
    height: auto;
    overflow-x: hidden;
   background-color: #161616;
   color:#fff  !important;
    filter: drop-shadow(0px 4px 5px #383838a6);
   
    .Image_row_1 {
      width: 100%;
      max-height: 300px;
      height: 300px;
      position: relative;

      
      .slide_svg {
        position: absolute;
        width: 100%;
        bottom: -6px;

        svg {
          transform: rotate(0deg);
          height: 150px;
        }
        .overlay {
          position: relative;
          top: -3px;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(#cd62e200 0%, $vcard_back_color 100%);
        }
      }
             .views_count{
        position: absolute;
        top: -0%;
        left: 1%;
     
        z-index: 10;
        color: #fff;
    

        p{
          letter-spacing: 1px;
          margin: 0.5rem auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 5px;
          font-size: 0.8rem;

          .icon{
            font-size: 1rem;
          }
        }

        &::before{
          content: '';
          position: absolute;
          background-color: royalblue;
          width: 350px;
          height: 250px;
          z-index: -1;
          transform: rotate(60deg) translateY(30px) translateX(-290px);
        }
      }
      .banner_image {
        width: 100%;
        max-height: 300px;
        height: 100%;
        overflow: hidden;
        object-fit: cover;
        object-position: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensures image covers the area */
          object-position: top; /* Ensures head portion is not cropped */
        }
        .overlay {
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(#cd62e200 0%, $vcard_back_color 100%);
        }
      }
      .user_logo {
        position: absolute;
        bottom: -5%;
        left: 5%;
        transform: translate(-5%, -5%);
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          // border-top-left-radius: 2.5rem;
          object-fit: cover; /* Ensures image covers the area */
          object-position: top; /* Ensures head portion is not cropped */
          border: 3px solid $card_back_colour;
          box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
          animation: profileBorder 5s infinite linear;
          @keyframes profileBorder {
            0% {
              border: 3px solid $card_back_colour;

              transform: translateY(0px);
            }
            25% {
              border: 3px solid #ffffff;

              transform: translateY(-5px);
            }
            50% {
              border: 3px solid #ffffff;

              transform: translateY(-10px);
            }
            75% {
              border: 3px solid rgb(255, 255, 255);

              transform: translateY(-5px);
            }
            100% {
              border: 3px solid $card_back_colour;

              transform: translateY(0px);
            }
          }
        }

        .svg_image {
          position: absolute;
          z-index: 1;

          img {
            width: 200px;
            height: 200px;
            border: none;
            filter: drop-shadow(0px 4px 5px #ffffffa1);
            animation: profileSVGAnime 5s infinite linear;
            @keyframes profileSVGAnime {
              0% {
                transform: rotate(0deg);
                // scale: 0;
              }
              25% {
                transform: rotate(90deg);
                // scale: 0.3;
              }
              50% {
                transform: rotate(180deg);
                // scale: 1;
              }
              75% {
                transform: rotate(270deg);
                // scale: 0.9;
              }
              100% {
                transform: rotate(360deg);
                // scale: 0;
              }
            }
          }
        }
      }
      .svg_image {
        position: absolute;
bottom: -5%;
left: 0%;
right: 0%;
width: 100%;
z-index: 1;


}
    }
  
    .basic_row_2 {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      position: relative;

      .user_details {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;

        .user_data {
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          flex: 1;
          gap: 15px;
          width: 100%;
          height: 100%;

          .user_information {
            display: flex;
            flex: 0.5;
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            h2 {
              font-size: 1.2rem;
              font-weight: 500;
              letter-spacing: 1px;
              color: $first_text_color;
            }

            p {
              font-size: 0.9rem;
              font-weight: 500;
              color: $first_text_color;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 0rem;
             

              img {
                width: 40px;
                height: 40px;
                object-fit: cover;
                object-position: center;

                @media screen and (max-width: 600px) {
                  width: 25px;
                  height: 25px;
                }
              }
            }
          }
  
          .contacts_btns {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            width: 100%;
            flex-wrap: wrap;
             color:#fff  !important;
            a {
              text-decoration: none;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 5px;
              padding: 0.4rem 1rem;
              background-color: #fff;
              color: gray;
              border-radius: 2rem;
              transition: all 0.4s linear;
              .icon {
                font-size: 1rem;
              }
              small {
                font-size: 0.7rem;
                font-weight: 500;
              }

              &:hover {
                background-color: $second_btn_back_color;
                filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                scale: 1.05;
                transition: all 0.4s linear;
              }
            }
          }

          @media screen and (max-width: 600px) {
            align-items: flex-start;
          }
        }
      }
    }


    .contact_row_3 {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;

   
      a {
        text-decoration: none;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 15px;
        color: #fff;

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          padding: 5px;
          border-radius: 5px;
          background-color: $second_back__color;
          color: $third_text_color;
        }
        .contact_data {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 2px;

          small {
            font-size: 0.7rem;
            font-weight: 600;
            color: $first_text_color;
          }
          p {
            font-size: 0.9rem;
            font-weight: 500;
          }
        }
      }

      .add_to_contact {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.3rem auto;

        button {
          padding: 7px 2rem;
          color: $third_text_color;
          background-color: $second_back__color;
          font-weight: 550;
          font-size: 0.8rem;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.4s ease-in-out;
          &:hover {
            background-color: $first_btn_back_color;
            color: $third_btn_text_color;
            box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
            transition: all 0.4s ease-in-out;
          }
        }
      }
    }

    .about_row_4 {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;
      
      .about_details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-items: flex-start;
        gap: 15px;
        width: 100%;

        .detail {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex: 1;
          width: 100%;

          .detail_title {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            font-size: 1rem;
            font-weight: 550;
            flex: 0.4;

            h5 {
              font-size: 0.8rem;
              font-weight: 600;
            }
          }

          .detail_message {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 5px;

            font-weight: 550;
            flex: 0.6;
            strong {
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
            }
            p {
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              font-size: 0.8rem;
              font-weight: 500;
     
            }
       
            .social_medias {
              display: flex;

              align-items: center;
              justify-content: flex-start;
              flex-direction: row !important;
              gap: 1.3rem;
              width: 100%;
              margin-left: 5px;

              a {
                text-decoration: none;
                color: ${third_text_color};
                display: flex;
                align-items: center;
                justify-content: center;

               
                position: relative;
        
                transition: all 0.3s ease-in-out;

                i {
                  z-index: 2;
                  font-size: 1rem;
                  font-weight: 500;
                  color: $social_media_icon_color;
                  transition: all 0.3s ease-in-out;
                  position: relative;
                }
              
                .social_media_svg1 {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);

                  #sw-js-blob-svg {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 35px;
                 

                    z-index: 1;
                    transition: all 0.3s ease-in-out;

                    #stop1 {
                      stop-color: #5365ff;
                    }
                    #stop2 {
                      stop-color: #5365ff;
                    }
                  }
                }
               
                .social_media_svg2 {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);

                  #sw-js-blob-svg {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 35px;
                    // height: 120px;

                    z-index: 1;
                    transition: all 0.3s ease-in-out;

                    #stop3 {
                      stop-color: #ff004d;
                    }
                    #stop4 {
                      stop-color: #f500da;
                    }
                  }
                }
             
                .social_media_svg3 {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);

                  #sw-js-blob-svg {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 35px;
                    // height: 120px;

                    z-index: 1;
                    transition: all 0.3s ease-in-out;

                    #stop5 {
                      stop-color: #10b856;
                    }
                    #stop6 {
                      stop-color: #10b856;
                    }
                  }
                }
              
                .social_media_svg6 {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);

                  #sw-js-blob-svg6 {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 35px;
                    // height: 120px;

                    z-index: 1;
                    transition: all 0.3s ease-in-out;

                    #stop11 {
                      stop-color: #4da6e9;
                    }
                    #stop12 {
                      stop-color: #4da6e9;
                    }
                  }
                }
              
                .social_media_svg4 {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);

                  #sw-js-blob-svg {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 35px;
                    // height: 120px;

                    z-index: 1;
                    transition: all 0.3s ease-in-out;

                    #stop7 {
                      stop-color: #ff777b;
                    }
                    #stop8 {
                      stop-color: #ff656a;
                    }
                  }
                }
              
                .social_media_svg5 {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);

                  #sw-js-blob-svg5 {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 35px;
                    // height: 120px;

                    z-index: 1;
                    transition: all 0.3s ease-in-out;

                    #stop9 {
                      stop-color: #a5a5a5;
                    }
                    #stop10 {
                      stop-color: #999999;
                    }
                  }
                }
                small {
                  display: none;
                  position: absolute;
                  transition: all 0.4s ease-in-out;
                }

                &:hover {
                  scale: 1.1;
                  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                  transition: all 0.3s ease-in-out;
                  .social_media_svg {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    img {
                      position: relative;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      width: 60px;

                      // height: 140px;
                    }
                  }
                }
              }
            }
            .icon {
              font-size: 1.2rem;
              cursor: pointer;
              color: rgb(104, 104, 104);
            }
          }
        }
      }
     
      .specialities {
        width: 98%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
        font-size: 0.9rem;

        p{
          width: 100%;
          font-size: $root_text_size;
        }

        ul {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;
          margin: auto;
          width: 90%;

          font-size: 1.3rem;

          li {
            font-size: $root_text_size;
            font-weight: $root_font_weight;
          }
        }
      }
    }

    .our_services {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;


      .All_Services {
        width: 100%;
        height: auto;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        .Service {
          width: 100%;
          padding: 1rem;
          background-color: $service_back_color;
          border-radius: 3px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;

          .service_title {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            h5 {
              font-size: 1.1rem;
              font-weight: 550;
            }
          }

          .service_description {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 10px;
            font-size: $root_text_size;
            font-weight: $root_font_weight;
            color: $first_text_color;
          }
          .service_link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            a {
              text-decoration: none;
              color: $link_text_color;
              font-size: $root_text_size;
              font-weight: $root_font_weight;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;

              &:hover {
                text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
              }
            }
          }
          .service_image {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;

            img {
              width: 100%;
              height: 250px;
              object-fit: cover;
              object-position: center;
            }
          }

          .service_action {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .service_price {
              display: flex;
              align-items: center;
              justify-content: flex-start;

              h5 {
                font-size: 1.1rem;
                font-weight: 600;
              }
              p {
                font-size: 1rem;
                font-weight: 550;
              }
            }
            .service_enquiry {
              display: flex;
              align-items: center;
              justify-content: center;

              a {
                text-decoration: none;
                color: $third_text_color;
                background-color: $first_btn_back_color;
                padding: 0.5rem 1rem;
                border: 2px solid $third_text_color;
                font-size: $root_text_size;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;

                &:hover {
                  background-color: $second_btn_back_color;
                }
              }
            }
          }
        }
      }
    }

    .our_products {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;


      .All_Products {
        width: 100%;
        height: auto;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        .Product {
          width: 100%;
          padding: 1rem;
          background-color: $product_back_color;
          border-radius: 3px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;

          .product_title {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            h5 {
              font-size: 1.1rem;
              font-weight: 550;
              color: $product_title_color;
            }
          }

          .product_description {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 10px;
            font-size: $root_text_size;
            font-weight: $root_font_weight;
            color: $first_text_color;
          }
          .product_link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            a {
              text-decoration: none;
              color: $link_text_color;
              font-size: $root_text_size;
              font-weight: $root_font_weight;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;

              &:hover {
                text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
              }
            }
          }
          .product_image {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;

            img {
              width: 100%;
              height: 200px;
              object-fit: cover;

              object-position: center;
            }
          }

          .product_action {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .product_price {
              display: flex;
              align-items: center;
              justify-content: flex-start;

              h5 {
                font-size: 1.1rem;
                font-weight: 600;
              }
              p {
                font-size: 1rem;
                font-weight: 550;
              }
            }
            .product_enquiry {
              display: flex;
              align-items: center;
              justify-content: center;

              a {
                text-decoration: none;
                color: $third_text_color;
                background-color: $first_btn_back_color;
                padding: 0.5rem 1rem;
                border: 2px solid $third_text_color;
                font-size: $root_text_size;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;

                &:hover {
                  background-color: $second_btn_back_color;
                }
              }
            }
          }
        }
      }
    }

    .Payment {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;


      .payment_details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-items: flex-start;
        gap: 10px;
        width: 100%;

        .detail {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex: 1;
          width: 100%;

          .detail_title {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            font-size: 1rem;
            font-weight: 550;
            flex: 0.4;

            h5 {
              font-size: 0.8rem;
              font-weight: 600;
            }
          }

          .detail_message {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 5px;

            font-weight: 550;
            flex: 0.6;

            p {
              font-size: 0.8rem;
              font-weight: 500;
            }

            .icon {
              font-size: 1.2rem;
              cursor: pointer;
              color: rgb(104, 104, 104);

              &:hover {
                color: royalblue;
              }
            }
          }
        }
      }

      .sub_title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        // margin-bottom: 1rem;

        h3 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;

          font-weight: 550;
          font-family: "Montserrat", sans-serif;
          font-optical-sizing: auto;

          font-style: normal;
          font-size: 1.05rem !important;
          color: $sub_title_color;
          position: relative;
        }
      }
      .account_details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-items: flex-start;
        gap: 10px;
        width: 100%;

        .detail {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex: 1;
          width: 100%;

          .detail_title {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            font-size: 1rem;
            font-weight: 550;
            flex: 0.4;

            h5 {
              font-size: 0.8rem;
              font-weight: 600;
            }
          }

          .detail_message {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 5px;

            font-weight: 550;
            flex: 0.6;

            p {
              font-size: 0.8rem;
              font-weight: 500;
            }
            .bussiness{
                font-size: 0.8rem;
              font-weight: 500;
              background-color: ${ButtonTheme[0].BtnBackColour} !important;
              color: ${ButtonTheme[0].BtnTextColour};
              border-radius: ${ButtonTheme[0].ContactBtnBorderRadius}${ButtonTheme[0].ContactBtnUnit};
              }
            .icon {
              font-size: 1.2rem;
              cursor: pointer;
              color: rgb(104, 104, 104);

              &:hover {
                color: royalblue;
              }
            }
          }
        }
      }
      .qr_code_upi_name {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        // margin-bottom: 1rem;

        h4 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;

          font-weight: 550;
          font-family: "Montserrat", sans-serif;
          font-optical-sizing: auto;

          font-style: normal;
          font-size: 0.9rem !important;
          color: $sub_title_color;
          position: relative;
        }
      }
      .qr_image_box {
        width: 60%;
        height: auto;
      
  
        border-radius: 10px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .user_name {
          display: flex;
          align-items: center;
          justify-content: center;

          h4 {
            font-size: 1rem;
            font-weight: 550;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
          }
        }
        .qr_image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 80%;
            height: 100%;
            object-fit: cover;
            margin: auto;
          }
        }
      }
    }


    .gallery {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;



      .all_gallerys {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        // grid-template-columns: 1fr 1fr 1fr;
        gap: 0.5rem;
        place-items: center;
        margin: auto;

        .gallery_image {
          width: 100%;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            cursor: pointer;
            width: 100%;
            height: 150px;
            border-radius: 10px;
            box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
            object-fit: cover;
            transition: all 0.3s ease;
            &:hover {
              opacity: 0.7;
              transition: all 0.3s ease;
            }
          }
        }
      }
    }
    
    .video {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;

   

      .videos_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        margin: auto;

        .video_image {
          width: 100%;

          iframe {
            width: 100%;
            height: 200px;
          }
        }
      }
    }
    
       .Appoinment {
        padding: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 1rem;
        position: relative;
  

        .popup_message_container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          position: absolute;
          top: 10%;
          left: 20%;
        
            .popup_success_box {
              // display: 300px;
              z-index: 2;
           
              background-color: #fff;
              box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
              border-radius: 5px;
              padding: 0.5px 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 1rem;
              position: relative;
              transition: transform 0.5s ease-in-out;
              z-index: -1;
              .popup_close {
            
        
                i {
                  font-size: 1.4rem;
                  font-weight: 600;
                  color: rgb(255, 79, 79);
                  cursor: pointer;
                  transition: all 0.5s ease;
                  &:hover {
                    transform: rotate(90deg);
                    transition: all 0.5s ease;
                  }
                }
              }
              .popup_message {
                font-size: 0.9rem;
                color: #525252;
                font-weight: 550;
              }
            }
            #successOpen{
              transform: translateX(0px);
              transition: transform 0.5s ease-in-out;
            }
            #successClose{
              transform: translateX(500px);
              
              transition: transform 0.5s ease-in-out;
            }
            .popup_error_box {
              display: inline-block;
              height: 40px;
              background-color: rgb(255, 177, 141) !important;
              border-radius: 5px;
              padding: 0px 3rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 3rem;
              position: relative;
        z-index: -1;
              .popup_close {
        
                i {
                  font-size: 1.4rem;
                  color: rgb(255, 255, 255);
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.5s ease;
                  &:hover {
                    transform: rotate(90deg);
                    transition: all 0.5s ease;
                  }
                }
              }
              .popup_message {
                font-size: 0.9rem;
                color: #494949;
                font-weight: 550;
              }
            }
          }
        .appinment_form_container {
          width: 100%;
    
          form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding:0rem 1rem;
            width: 100%;
  
            .form_group {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
              position: relative;
              gap: 5px;
              padding: 0.5rem 0px;
  
              label {
                font-size: 0.8rem;
                font-weight: 550;
                letter-spacing: 1px;
              }
              .labelError{
                color: $error_text_color;
                font-family: 500;
                font-size: 0.6rem;
              }
         
  
              .input_error {
                border: 1px solid $error_text_color !important;
                border-radius: 5px;
              }
            
              .error {
                position: absolute;
                top: 12%;
                right: 0%;
                color: $error_text_color;
                font-size: 0.7rem;
                padding: 5px 0px 0px 0px;
              }
      
              .desc_error {
                position: absolute;
                top: 0%;
                right: 0%;
                color: $error_text_color;
                font-size: 0.7rem;
                padding: 5px 0px 0px 0px;
              }
              input[type=date],input[type=text],input[type=tel] {
                width: 100%;
                outline: none;
                padding: 10px 1rem;
                border-radius: 0.2rem;
                background-color: transparent;
                border: 1px solid #4b4b4b;
                color: rgb(77, 77, 77);
                &::placeholder {
                  color: rgb(71, 71, 71);
                }
              }
  
              select {
                width: 100%;
                outline: none;
                padding: 8px 1rem;
                background-color: transparent;
                border: 1px solid #4d4d4d;
                color: rgb(100, 100, 100);
              font-weight: 500;
  
              option{
                color: rgb(59, 59, 59);
                width: 100%;
                font-size: 0.8rem;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: center;
                // background-color: #ffffff;
              }
              }
            }
            .form_submit {
              display: flex;
              align-items: center;
              justify-content: space-between;
             gap: 2rem;
              // margin: 1rem auto;
              width: 100%;
  
              button {
                display: flex;
                align-self: center;
                justify-content: center;
                gap: 0.5rem;
                // width: 100%;
                outline: none;
                padding: 6px 1rem;
                background-color: $first_btn_back_color;
                color: #fff;
                font-size: 0.8rem;
                border-radius: 0.3rem;
                font-weight: 500;
  
                transition: all 0.4s ease-in;
  
                span {
                  display: flex;
                  align-items: center;
                  justify-content: center;
               font-size: 0.9rem;
                }
                .inquiryloader {
                  width: 18px;
                  height: 18px;
                  border: 2px solid #FFF;
                  border-bottom-color: transparent;
                  border-radius: 50%;
                  display: inline-block;
                  box-sizing: border-box;
                  animation: rotation 1s linear infinite;
                  }
              
                  @keyframes rotation {
                  0% {
                      transform: rotate(0deg);
                  }
                  100% {
                      transform: rotate(360deg);
                  }
                  } 
                &:hover {
                  background-color: #7e7e7e;
                  filter: drop-shadow(0px 4px 5px rgba(109, 109, 109, 0.4));
                }
  
                &:nth-child(2){
                  background-color: royalblue;
              
  
                  &:hover{
                    background-color: rgb(248, 137, 118);
                  }
                }
              }
            }
          }
        }
      }
      
  
    .time_container {
      width: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .time_list_container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        place-items: center;
        gap: 1rem 1rem;
        margin: 1rem auto;

        .time_list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 5px 1rem 5px 1rem;
          background-color: $first_back__color;
          width: 100%;
          height: 80px;
          max-height: 80px;
          min-height: 80px;
          border-radius: 0.5rem;

          .day {
            // display: block;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;

            span {
              font-size: 0.7rem;
              font-weight: 550;
              color: $third_text_color;

              &::after {
                content: "";
                display: block;
                height: 1px;
                background-color: $second_text_color;
                width: 100%;
              }
            }
          }
          .time {
            width: 100%;
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            margin-top: 10px;
            // background-color: #fff;

            .start {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 5px;
              h6 {
                font-size: 0.6rem;
                font-weight: 600;
                color: $third_text_color;
              }
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.6rem;
                color: $third_text_color;
                font-weight: 550;
              }
            }
            .end {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 5px;
              h6 {
                font-size: 0.6rem;
                font-weight: 500;
                color: $third_text_color;
              }
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                color: $third_text_color;
                font-size: 0.6rem;
                font-weight: 550;
              }
            }
          }
          //    @media screen and (max-width:600px){
          //     height: 150px;
          //    }
        }
        @media screen and (max-width: 700px) {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  
    .testimonial {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      position: relative;

 

      .testimonial_container {
        margin: 1rem auto;
        width: 100%;
        height: 180px;
        min-height: 180px;

        .testimonial_list {
          margin: 1rem 1rem;
          width: 100%;
          height: 180px;
          min-height: 180px;
          // background: linear-gradient(90deg,$first_back__color 50%,$social_media_icon_color 50%);
          background-color: $third_back__color;
          // box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
          overflow-y: auto;
          margin: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          border-radius: 0.5rem;

          position: relative;

          .client_feedback {
            width: 100%;
            flex: 0.6;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 10px;

            small {
              width: 100%;
              font-size: 0.8rem;
              color: $third_text_color;
              font-weight: 500;
              overflow-y: scroll;
              text-align: start;

              &::-webkit-scrollbar {
                display: none;
              }
            }
          }
          .client_detail {
            display: flex;
            align-items: center;
            flex-direction: column-reverse;
            width: 100%;
            height: 100%;
            flex: 0.4;
            justify-content: center;
            gap: 10px;

            background-color: $second_back__color;
            // border-bottom-left-radius: 6rem;
            // border-bottom-right-radius: 6rem;
            box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
            img {
              width: 60px;
              height: 60px;
              border-radius: 0.5rem;
              object-fit: cover;
              object-position: center;
              border: 1px solid $second_back__color;
            }

            .client_name {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;

              h4 {
                font-size: 0.8rem;
                color: $third_text_color;
                font-weight: 550;
                border: 1px solid $second_back__color;
              }
              small {
                color: yellow;
                font-size: 0.7rem;

                font-weight: 550;
              }
            }
          }

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  
    .google_map_container {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;


      .google_map {
        width: 100%;

        iframe {
          width: 100% !important;
          height: 250px !important;
          border: none !important;
          margin: 1rem auto;
          border-radius: 0.5rem;
          filter: drop-shadow(0px 4px 5px rgba(56, 56, 56, 0.527));
        }
      }
    }
 
    .feedback_row {
      width: 100%;
      padding: 0rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0rem;
      align-items: center;
      justify-content: center;
      position: relative;

//Popup Container
      .popup_message_container {
        position: absolute;
        top: -3%;
        left: 22%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

        .popup_success_box {
          display: inline-block;
          width: auto;
          // height: 35px;
          background-color: rgb(255, 255, 255);
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
          padding: 0.7px 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          position: relative;
          font-size: 0.7rem;
          font-weight: 500;
          transition: transform 0.5s ease-in-out;
          z-index: -1;
     
          .popup_close {
        
    
            i {
              font-size: 1.4rem;
              font-weight: 600;
              color: rgb(255, 101, 101);
              cursor: pointer;
              transition: all 0.5s ease;
              &:hover {
                transform: rotate(90deg);
                transition: all 0.5s ease;
              }
            }
            .icon{
              font-size: 1.2rem;
              color: #2cc478;
            }
          }
          .popup_message {
            font-size: 0.9rem;
            color: rgb(48, 48, 48);
            font-weight: 500;
          }
        }
        #successOpen{
          transform: translateX(0px);
          transition: transform 0.5s ease-in-out;
        }
        #successClose{
          transform: translateX(500px);
          
          transition: transform 0.5s ease-in-out;
        }
        .popup_error_box {
          display: inline-block;
          height: 40px;
          background-color: rgb(255, 177, 141) !important;
          border-radius: 5px;
          padding: 0px 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          position: relative;
    z-index: -1;
          .popup_close {
    
            i {
              font-size: 1.4rem;
              color: rgb(255, 255, 255);
              font-weight: 600;
              cursor: pointer;
              transition: all 0.5s ease;
              &:hover {
                transform: rotate(90deg);
                transition: all 0.5s ease;
              }
            }
          }
          .popup_message {
            font-size: 0.9rem;
            color: #2cc478;
            font-weight: 550;
          }
        }
      }
    //Feedback message
    .Feedback_container_message {
      width: 100%;
      height: auto;
      // padding: 0rem 0.5rem;
      margin: 0rem auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .feeback_title {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: space-between;
        gap: 10px;
        z-index: 800;
     

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          // padding: 0.7rem 1rem;
          font-size: 0.7rem;
          color: $first_btn_back_color;
          background: transparent;
          cursor: pointer;
          outline: none;
          border: transparent;
          font-weight: 600;
          position: relative;

          i {
            font-size: 1.4rem;
            color: rgb(43, 43, 43);
          }

          .count{
            position: absolute;
            right: -7%;
            top: -8%;
         
            font-size: 0.8rem;
          
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #474747;
           
            border-radius: 50%;
          }
        }
        .feedBack_loader {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: block;
          margin: 15px auto;
          position: relative;
          color: #253bff;
          left: -100px;
          box-sizing: border-box;
          animation: shadowRolling 2s linear infinite;
        }

        @keyframes shadowRolling {
          0% {
            box-shadow: 0px 0 rgba(255, 255, 255, 0),
              0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
              0px 0 rgba(255, 255, 255, 0);
          }
          12% {
            box-shadow: 100px 0 rgb(76, 247, 176),
              0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
              0px 0 rgba(255, 255, 255, 0);
          }
          25% {
            box-shadow: 110px 0 rgb(107, 98, 233), 100px 0 rgb(75, 45, 243),
              0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
          }
          36% {
            box-shadow: 120px 0 rgb(94, 236, 255), 110px 0 rgb(226, 253, 72),
              100px 0 rgb(219, 99, 119), 0px 0 rgba(255, 255, 255, 0);
          }
          50% {
            box-shadow: 130px 0 rgb(240, 135, 49), 120px 0 rgb(56, 163, 74),
              110px 0 rgb(99, 95, 95), 100px 0 rgb(135, 111, 221);
          }
          62% {
            box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 white,
              120px 0 white, 110px 0 white;
          }
          75% {
            box-shadow: 200px 0 rgba(255, 255, 255, 0),
              200px 0 rgba(255, 255, 255, 0), 130px 0 white, 120px 0 white;
          }
          87% {
            box-shadow: 200px 0 rgba(255, 255, 255, 0),
              200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
              130px 0 white;
          }
          100% {
            box-shadow: 200px 0 rgba(255, 255, 255, 0),
              200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
              200px 0 rgba(255, 255, 255, 0);
          }
        }
      }
      .comment_box {
        width: 100%;
        max-height: 300px;
        height: auto;
        overflow: scroll;
    
        margin: 1rem auto;
        background: transparent;
        // border: 1px solid rgb(187, 187, 187);
        background: transparent;
        // background: linear-gradient(#6d6d6d, #6d6d6d);
        border-radius: 5px;
        position: relative;

        .comment_box_title{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background-color: royalblue;
          color: #fff;
          font-weight: 400;
          display: none;
        }
        .message {
          width: 100%;
          padding: 10px;
          border-bottom: 2px solid rgb(238, 237, 237);
          position: relative;
          .user_detail {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1rem;

           
            .details {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
              gap: 5px;

              .userName {
                p {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                  font-size: 1.1rem;
               
                  color: rgb(22, 22, 22);
                  letter-spacing: 1px;
                  font-weight: 550;

                  i {
                    color: rgb(94, 94, 94);
                    font-size: 1.4rem;
                  }

                  &::first-letter{
                    text-transform: uppercase !important;
                  }
                }
              }
              .stars {
                .ratting_container1 {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.3rem;

                  span {
                    i {
                      font-size: 1.2rem;
                      cursor: pointer;
                      color: lightgray;
                      transition: all 0.4s ease-in-out;

                      // &:hover{
                      //  filter: drop-shadow(0px 4px 5px rgba(0,0,0,0.4));
                      //  color: rgb(86, 252, 86);
                      //  transition: all 0.4s ease-in-out;

                      // }
                    }

                    .highlight1 {
                      filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                      color: gold;
                    }
                  }
                }

                #noRatting {
                  span:nth-child(1),
                  span:nth-child(2),
                  span:nth-child(3),
                  span:nth-child(4),
                  span:nth-child(5) {
                    i {
                      text-decoration: line-through;
                      text-decoration-color: #ff2525;
                    }
                  }
                }

                #singleRatting {
                  span:nth-child(1) {
                    i {
                      color: #F7C52A;
                      filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                    }
                  }
                }
                #doubleRatting {
                  span:nth-child(1),
                  span:nth-child(2) {
                    i {
                      color: #F7C52A;
                      filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                    }
                  }
                }
                #ThreeRatting {
                  span:nth-child(1),
                  span:nth-child(2),
                  span:nth-child(3) {
                    i {
                      color: #F7C52A;
                      filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                    }
                  }
                }
                #fourRatting {
                  span:nth-child(1),
                  span:nth-child(2),
                  span:nth-child(3),
                  span:nth-child(4) {
                    i {
                      color: #F7C52A;
                      filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                    }
                  }
                }
                #fullRatting {
                  span:nth-child(1),
                  span:nth-child(2),
                  span:nth-child(3),
                  span:nth-child(4),
                  span:nth-child(5) {
                    i {
                      color: #F7C52A;
                      filter: drop-shadow(0px 4px 5px rgba(165, 165, 165, 0.4));
                    }
                  }
                }
              }
            }
          }
          .comments {
          
            margin: 10px auto;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            width: 100%;

            i {
              color: royalblue;
              font-size: 1.4rem;
            }
            span {
              font-size: 0.9rem;
              color: #272727;
            }
          }

          .date{
            position:absolute ;
        right: 2%;
        top: 15%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 0.9rem;
            color: rgb(68, 68, 68);

            i{
              color: darkcyan;
              font-size: 1.1rem;
            }

          }
        }

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
      //Feedback Form
      .feedback_container {
        width: 100%;
        position: relative;
        // margin-top: 0.5rem;

    
        form {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: auto;
          padding: 0px 0.5rem 0rem 0.5rem;

          //  filter: drop-shadow(4px 4px 5px rgba(82, 81, 81, 0.582));

          .feedback_svg {
            position: absolute;
            top: -4%;
            right: 0%;

            img {
              width: 100px;
              object-fit: cover;
              object-position: center;

              @media (max-width: 600px) {
                width: 90px;
              }
            }

            @media (max-width: 600px) {
              top: -0%;
            }
          }
          .form_group {
            margin: 10px auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 95%;
            position: relative;
            margin: 0.2rem 0.2rem;

            .error {
              font-size: 0.6rem;
              color: $error_text_color !important;
              -webkit-text-fill-color: $error_text_color;
              letter-spacing: 1px;
              // width: 100%;
              display: flex;
              align-items: center;
              font-weight: 550;
              justify-content: flex-start;
            }
            label {
              display: flex;
              align-items: center;
              justify-content: flex-start;

              left: 5%;
              color: $first_text_color;
              // background: linear-gradient(#000,tomato);
              -webkit-text-fill-color: $first_text_color;
              font-size: 0.7rem;
              font-weight: 550;

              border-radius: 4px;

              span {
                font-size: 1rem;
                color: $error_text_color !important;
                -webkit-text-fill-color: $error_text_color;
                sup {
                  color: $error_text_color !important;
                }
              }

              @media screen and (max-width: 800px) {
                left: 5%;
              }
            }

            input,
            .ratting_container {
              width: 100%;
              padding: 0.7rem 1rem;
              // border: 2px solid rgb(177, 238, 128);

              border-radius: 0.5rem;
              background-color: transparent;
              border: 1px solid $first_back__color;
              color: $first_text_color;
              background-origin: border-box;
              background-clip: padding-box, border-box;
              border-radius: 0.3rem;
              outline: none;
              caret-color: $first_text_color;

              transition: all 0.3s ease;
              &::placeholder {
                font-size: 0.6rem;
                color: $first_text_color;
                letter-spacing: 1px;
                font-weight: 400;
              }
              &:focus {
                border: double 2px transparent;
                border-radius: 0.3rem;
                background-color: transparent;
                border: 1px solid $first_text_color;
                background-origin: border-box;
                background-clip: padding-box, border-box;
                transition: all 0.3s ease;
              }

              @media screen and (max-width: 800px) {
                padding: 0.8rem 2rem;
                width: 100%;
                background-color: transparent;
              }
            }

            .ratting_container {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 0.5rem;

              span {
                i {
                  font-size: 1.5rem;
                  cursor: pointer;
                  color: rgb(255, 168, 54);
                  transition: all 0.4s ease-in-out;

                  // &:hover{
                  //  filter: drop-shadow(0px 4px 5px rgba(0,0,0,0.4));
                  //  color: rgb(86, 252, 86);
                  //  transition: all 0.4s ease-in-out;

                  // }
                }
                .highlight {
                  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                  color: gold;
                }
              }
            }
            textarea {
              width: 100%;
              padding: 1rem;
              caret-color: $first_text_color;
              color: $first_text_color;
              border: double 1px transparent;
              border-radius: 0.5rem;
              background-color: transparent;
              border: 1px solid $first_back__color;
              background-origin: border-box;
              background-clip: padding-box, border-box;
              border-radius: 0.3rem;
              outline: none;

              transition: all 0.3s ease;
              &::placeholder {
                font-size: 0.6rem;
                color: $first_text_color;
                letter-spacing: 1px;
                font-weight: 400;
              }
              &:focus {
                border: double 2px transparent;
                border-radius: 0.3rem;
                background-color: transparent;
                border: 1px solid $first_text_color;

                background-origin: border-box;
                background-clip: padding-box, border-box;
                transition: all 0.3s ease;
              }

              @media screen and (max-width: 800px) {
                padding: 0.8rem 2rem;
                width: 100%;
                background-color: transparent;
              }
            }
        
            .icon {
              position: absolute;
              left: 1%;
              top: 63%;

              img {
                width: 25px;
                height: 25px;
              }
              i {
                font-size: 1.4rem;
                color: skyblue;
              }

              @media screen and (max-width: 800px) {
                position: absolute;
                left: 2%;
                top: 25%;
              }
            }
            .show_pass {
              position: absolute;
              right: 2%;
              top: 25%;

              i {
                font-size: 1.4rem;
                color: skyblue;
                cursor: pointer;
              }

              @media screen and (max-width: 800px) {
                position: absolute;
                right: 2%;
                top: 25%;
              }
            }

            @media screen and (max-width: 900px) {
              margin: 0.8rem auto;
            }
          }
          .form_actions {
            margin: 1rem auto;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 1rem auto;

            button {
              margin-right: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              background-color: $first_btn_back_color;
              filter: none;
              width: auto;
              padding: 10px 1rem;
              outline: none;
              border: transparent;

              font-weight: 500;
              letter-spacing: 1px;
              font-size: 0.6rem;
              border-radius: 5px;
              cursor: pointer;
              color: $third_text_color;
              transition: all 0.4s ease-in;

              span {
                font-size: 1.2rem;
              }
              .form_loader,
              .form_loader:before,
              .form_loader:after {
                border-radius: 50%;
                width: 1em;
                height: 1em;
                animation-fill-mode: both;
                animation: bblFadInOut 1.8s infinite ease-in-out;
              }
              .form_loader {
                color: #fff;
                font-size: 7px;
                position: relative;
                text-indent: -9999em;
                transform: translateZ(0);
                animation-delay: -0.16s;
              }
              .form_loader:before,
              .form_loader:after {
                content: "";
                position: absolute;
                top: 0;
              }
              .form_loader:before {
                left: -3.5em;
                animation-delay: -0.32s;
              }
              .form_loader:after {
                left: 3.5em;
              }

              @keyframes bblFadInOut {
                0%,
                80%,
                100% {
                  box-shadow: 0 2.5em 0 -1.3em;
                }
                40% {
                  box-shadow: 0 2.5em 0 0;
                }
              }

              &:hover {
                background-color: $second_back__color;
                color: $third_text_color;
                font-weight: 550;
                transition: all 0.4s ease-in;
              }
            }
          }
        }
      }

        .share{
          width: 100%;
          padding: 0rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          padding-bottom: 4rem;
  
    
          .input{
            width: 100%;
            position: relative;
            
    
            input{
              padding: 0.6rem 1rem;
              outline: none;
              width: 100%;
              border: 1px solid gray;
              background-color: transparent;
              font-size: 0.9rem;
              font-weight: 500;
              color: gray;
              position: relative;
            }
    
            .icon{
              position: absolute;
              right: 4%;
              top: 15%;
              font-size: 1.5rem;
              cursor: pointer;
    
              &:hover{
                color: royalblue;
              }
            }
          }
    .qr_code{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
    
      .qr_actions{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        gap: 10px;
        margin: 1rem auto;
    
        button{
          padding: 0.5rem 2rem;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: #6ebe4b;
          color: #fff;
          border-radius: 0.3rem;
    
          &:hover{
            background-color: gray;
          }
        }
    
      }
    }
    .share_input{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      position: relative;
    
    label{
      font-size: 0.7rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 600;
    }
      .whatsup_input{
        width: 100%;
        position: relative;
    
    
        .country-list {
          position: absolute;
          top: -230px;
      
          
      
        }
        .mobileNumber_input{
          width: 100%;
          display: flex;
        
          .form-control {
            width: 100% !important;
            padding: 0.5rem 4rem !important;
      
            input{
              padding: 0.5rem 4rem !important;
              }
          }
    
          .form-control {
            width: 100% !important;
            padding: 0.6rem 1rem;
      
          
          }
      
        }
    
        button{
          position: absolute;
          top: 0%;
          right: 0%;
          font-size: 0.7rem;
          background-color: #10b856;
          padding: 0.45rem 1rem;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
    
          .bxl-whatsapp{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
          }
        }
      }
    
    }
        }


    .Footer {
      position: relative;
      bottom: 0%;
      width: 100%;
      margin-top: 3rem;
      .dynamic_footer_container {
        width: 100%;

        min-height: 50px;
        height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 5px;

        justify-content: center;
        padding: 0px 0px;
        z-index: 600;
        background-color: #ffffff;
        small{
          font-size: 0.7rem;
          font-weight: 600;
          color: royalblue;
        }

        p {
          font-size: 0.8rem;

          display: flex;
          align-items: center;
          justify-content: center;
         
          font-weight: 600;
          letter-spacing: 1px;

          @media (max-width: 600px) {
            font-size: 0.7rem;
          }
        }
        .dynamic_footer_svg {
          position: absolute;
          z-index: -1;
          bottom: 25%;
          left: 0%;
          width: 100%;
         
        }
      }
    }
    @media screen and (max-width: 600px) {
      width: 100vw !important;
      min-width: 100vw;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-top: 0rem;
    }
  }
  &::-webkit-scrollbar {
    width: 6px !important;
    height: 4px !important;

     background-color:${VcardTheme[0].DesktopViewBackColor} !important;
    @media screen and (max-width:650px){
      display: none !important;
    }
  }
  &::-webkit-scrollbar-thumb {
    width: 6px !important;
    height: 4px !important;
    border-radius: 10px;
    z-index: 10;
    cursor: pointer;
    background-color: #fff !important;

    &:hover {
      background-color: rgb(36, 231, 222);
    }
  }
}
    `}
          </style>
        </>
      )}

      {VCard_URL_Data.length > 0 ? (
        <div
          className="Dynamic_Vcard_Live_Container"
          style={
            VcardTheme[0]?.WebsiteBackgroundType === "Background-Color"
              ? backgroundColorStyle
              : backgroundImageStyle
          }
        >
          {/* Gallery Full IMAGE */}
          <div
            className="dynamic_full_image"
            id="fullImageBox"
            style={{ top: scrollY }}
          >
            <div className="close_Full_Image_gallery">
              <RiCloseLargeLine className="icon" onClick={closeFullImage} />
            </div>
            <img src={banner} alt="gallery" id="fullImage" />
          </div>
          {/* Menu Navbar */}
          {VCard_URL_Data.length > 0 ? (
            <div className="menu_navbar_box">
              <div
                className={`up_btn ${
                  activeMenu === "Home" ? "hideUpArrow" : ""
                }`}
              >
                <CiSquareChevUp onClick={HandleMenuUp} className="icon" />
              </div>
              <div className="all_menus">
                <div
                  className={`menu ${
                    activeMenu === "Home" ? "menuActive" : ""
                  }`}
                  onClick={() => {
                    scrollToSection(HomeRef), setActiveMenu("Home");
                  }}
                >
                  <IoHome className="icon" />
                  <p>Home</p>
                </div>
                {AboutData.length > 0 ? (
                  <div
                    className={`menu ${
                      activeMenu === "About" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(AboutRef), setActiveMenu("About");
                    }}
                  >
                    <BiSolidUserDetail className="icon" />
                    <p>About</p>
                  </div>
                ) : (
                  ""
                )}
                {ServiceData.length > 0 &&
                ManageContentData[0].Service == true ? (
                  <div
                    className={`menu ${
                      activeMenu === "Service" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(ServiceRef), setActiveMenu("Service");
                    }}
                  >
                    <MdMiscellaneousServices className="icon" />
                    <p>Service</p>
                  </div>
                ) : (
                  ""
                )}
                {ProductData.length > 0 &&
                ManageContentData[0].Product == true ? (
                  <div
                    className={`menu ${
                      activeMenu === "Product" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(ProductRef), setActiveMenu("Product");
                    }}
                  >
                    <AiFillProduct className="icon" />
                    <p>Product</p>
                  </div>
                ) : (
                  ""
                )}
                {UPIData.length > 0 || BankData.length > 0 ? (
                  <div
                    className={`menu ${
                      activeMenu === "Payment" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(PaymentRef), setActiveMenu("Payment");
                    }}
                  >
                    <GiTakeMyMoney className="icon" />
                    <p>Payment</p>
                  </div>
                ) : (
                  ""
                )}
                {GalleryData.length > 0 &&
                ManageContentData[0].Gallery == true ? (
                  <div
                    className={`menu ${
                      activeMenu === "Gallery" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(GalleryRef), setActiveMenu("Gallery");
                    }}
                  >
                    <GrGallery className="icon" />
                    <p>Gallery</p>
                  </div>
                ) : (
                  ""
                )}
                {VideoData.length > 0 ? (
                  <div
                    className={`menu ${
                      activeMenu === "Video" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(VideoRef), setActiveMenu("Video");
                    }}
                  >
                    <BiSolidVideo className="icon" />
                    <p>Videos</p>
                  </div>
                ) : (
                  ""
                )}
                {(VCard_URL_Data.length > 0 &&
                  ManageContentData[0].Appoinment == true &&
                  ServiceData.length > 0) ||
                ProductData.length > 0 ? (
                  <div
                    className={`menu ${
                      activeMenu === "Appoinment" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(AppoinmentRef),
                        setActiveMenu("Appoinment");
                    }}
                  >
                    <FaUserGroup className="icon" />
                    <p>Appoinment</p>
                  </div>
                ) : (
                  ""
                )}
                {BussinessHourData.length > 0 &&
                ManageContentData[0].BussinessHour == true ? (
                  <div
                    className={`menu ${
                      activeMenu === "Time" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(TimeRef), setActiveMenu("Time");
                    }}
                  >
                    <MdSchedule className="icon" />
                    <p>Time</p>
                  </div>
                ) : (
                  ""
                )}
                {TestimonialData.length > 0 &&
                ManageContentData[0].Testimonial == true ? (
                  <div
                    className={`menu ${
                      activeMenu === "Testimonial" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(TestimonialRef),
                        setActiveMenu("Testimonial");
                    }}
                  >
                    <MdOutlineRateReview className="icon" />
                    <p>Testi..al</p>
                  </div>
                ) : (
                  ""
                )}
                {GoogleMapData.length > 0 &&
                ManageContentData[0].GoogleMap == true ? (
                  <div
                    className={`menu ${
                      activeMenu === "Location" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(LocationRef), setActiveMenu("Location");
                    }}
                  >
                    <GrMapLocation className="icon" />
                    <p>Location</p>
                  </div>
                ) : (
                  ""
                )}
                {VCard_URL_Data.length > 0 &&
                BasicData.length > 0 &&
                SocialMediaData.length > 0 &&
                ManageContentData[0].FeedbackForm == true ? (
                  <div
                    className={`menu ${
                      activeMenu === "Feedback" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(FeedbackRef), setActiveMenu("Feedback");
                    }}
                  >
                    <VscFeedback className="icon" />
                    <p>Feedback</p>
                  </div>
                ) : (
                  ""
                )}
                {VCard_URL_Data.length > 0 &&
                BasicData.length > 0 &&
                SocialMediaData.length > 0 &&
                ManageContentData[0].InquiryForm == true ? (
                  <div
                    className={`menu ${
                      activeMenu === "Inquiry" ? "menuActive" : ""
                    }`}
                    onClick={() => {
                      scrollToSection(InquiryRef), setActiveMenu("Inquiry");
                    }}
                  >
                    <TbMessageChatbotFilled className="icon" />
                    <p>Inquries</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className={`down_btn ${
                  activeMenu === "Inquiry" ? "hideDownArrow" : ""
                }`}
              >
                <CiSquareChevDown onClick={HandleMenuDown} className="down" />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="Dynamic_Vcard_Live_box">
            {/* VcardUrl and logo */}
            {VCard_URL_Data.map((data, index) => {
              return (
                <div className="Image_row_1" ref={HomeRef} key={index}>
                  <div className="views_count">
                    <p>
                      {/* <LuView className="icon" /> */}
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/arcade/64/group.png"
                        alt="group"
                      />
                      Views:
                      <strong>{Views}</strong>
                    </p>
                  </div>
                  <div className="banner_image">
                    {data.BannerType == "Paste_ImageAddress" ? (
                      <>
                        <img
                          src={
                            data.BannerAddress ||
                            "https://img.freepik.com/premium-psd/isolated-realistic-shiny-metalic-orange-luxury-city-taxi-cab-car-from-left-front-view_16145-9734.jpg?w=996"
                          }
                          alt="banner"
                        />
                      </>
                    ) : (
                      ""
                    )}
                    {data.BannerType == "ImageUpload" ? (
                      <img
                        src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                          data.Banner
                        }`}
                        alt="banner"
                      />
                    ) : (
                      ""
                    )}
                    <div className="overlay"></div>
                  </div>
                  <div className="user_logo">
                    {data.ProfileType == "ImageUpload" ? (
                      <img
                        src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                          data.Profile
                        }`}
                        alt="user_logo"
                        className={`${
                          ImageTheme.length > 0
                            ? ImageTheme[0].LogoImageAnimation
                            : ""
                        }`}
                      />
                    ) : (
                      ""
                    )}
                    {data.ProfileType == "Paste_ImageAddress" ? (
                      <img
                        src={
                          data.ProfileAddress ||
                          "https://img.freepik.com/premium-photo/asian-man-wearing-trendy-fashion-clothes_148840-7198.jpg?w=900"
                        }
                        alt="user_logo"
                        className={`${
                          ImageTheme.length > 0
                            ? ImageTheme[0].LogoImageAnimation
                            : ""
                        }`}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {VcardTheme.length > 0 ? (
                    <div className="svg_image">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                      >
                        <path
                          fill={
                            VcardTheme.length > 0
                              ? VcardTheme[0].VCardColour
                              : "#fff"
                          }
                          fill-opacity="1"
                          d={
                            VcardTheme[0].SVG_Design != "" ||
                            VcardTheme[0].SVG_Design.length != 0
                              ? VcardTheme[0].SVG_Design.split("=")[5].split(
                                  '"'
                                )[1]
                              : ""
                          }
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}

            {/* basic Details */}
            <div className="basic_row_2">
              <div className="user_details">
                <div className="user_data">
                  {VCard_URL_Data.length > 0 ? (
                    <>
                      {VCard_URL_Data.map((data, index) => {
                        return (
                          <div className="user_information" key={index}>
                            <h2>
                              {data.FirstName || "John"} &nbsp;
                              {data.LastName || " Wick"}
                            </h2>
                            <p>{data.Profession || "Corporate Company"}</p>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}

                  {/* Actions */}
                  {BasicData.length > 0 ? (
                    <>
                      {BasicData.map((data, index) => {
                        return (
                          <div className="contacts_btns" key={index}>
                            {/* Call */}
                            <a
                              href={`tel:+91${
                                data.MobileNumber ? data.MobileNumber : "#"
                              }`}
                              target="_blank"
                            >
                              <BiSolidPhoneCall className="icon" />

                              <small>Call</small>
                            </a>
                            {/* Whatsup */}
                            <a
                              href={`https://wa.me/+91${
                                data.MobileNumber
                              }?text=${encodeURIComponent(`Hi ${data.user}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <RiWhatsappFill className="icon" />

                              <small>Whatsapp</small>
                            </a>
                            {/* Direction */}
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${
                                data.Location
                                  ? data.Location
                                  : "No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017"
                              }`}
                              target="_blank"
                            >
                              <FaDirections className="icon" />

                              <small>Direction</small>
                            </a>
                            {/* Mail */}
                            <a
                              href={`mailto:${data.Email ? data.Email : "#"}`}
                              target="_blank"
                            >
                              <MdOutgoingMail className="icon" />

                              <small>Mail</small>
                            </a>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* Contact Details */}
            {BasicData.length > 0 &&
            ManageContentData[0].ContactDetails == true ? (
              <>
                {BasicData.map((data, index) => {
                  return (
                    <div className="contact_row_3" key={index}>
                      {/* Location */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${
                          data.Location
                            ? data.Location
                            : "No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017"
                        }`}
                        target="_blank"
                      >
                        <div className="icon">
                          <MdLocationPin />
                        </div>
                        <div className="contact_data">
                          <small>Address</small>
                          <p>{data.Location}</p>
                        </div>
                      </a>
                      {/* Mail */}
                      <a
                        href={`mailto:${data.Email ? data.Email : "#"}`}
                        target="_blank"
                      >
                        <div className="icon">
                          <IoMail />
                        </div>
                        <div className="contact_data">
                          <small>Email</small>
                          <p>{data.Email ? `${data.Email}` : ""}</p>
                          <p>
                            {data.AlternateEmail != null
                              ? `${data.AlternateEmail}`
                              : ""}
                          </p>
                        </div>
                      </a>
                      {/* Website */}
                      {data.Website_URL.length > 0 ? (
                        <a href={data.Website_URL} target="_blank">
                          <div className="icon">
                            <FaGlobe />
                          </div>
                          <div className="contact_data">
                            <small>Website</small>
                            <p>{data.Website_URL}</p>
                          </div>
                        </a>
                      ) : (
                        ""
                      )}

                      {/* PhoneNumber */}
                      <a
                        href={`tel:+91${
                          data.MobileNumber ? data.MobileNumber : "#"
                        }`}
                        target="_blank"
                      >
                        <div className="icon">
                          <BiSolidPhoneCall />
                        </div>
                        <div className="contact_data">
                          <small>MobileNumber</small>

                          <p>
                            {data.MobileNumber
                              ? `(+91)- ${data.MobileNumber}`
                              : ""}
                          </p>
                          <p>
                            {data.AlternateMobileNumber != null
                              ? `(+91)- ${data.AlternateMobileNumber}`
                              : ""}
                          </p>
                        </div>
                      </a>
                      {/* AddtoContact */}
                      <div className="add_to_contact">
                        <button onClick={handleDownloadVCard}>
                          Add to Contact<i className="bx bxs-contact"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}

            {/* About US */}
            {AboutData.length > 0 ? (
              <>
                {AboutData.map((data, index) => {
                  console.log(
                    data.Bussiness.map((data, index) => {
                      return data + ",";
                    })
                  );
                  return (
                    <div className="about_row_4" ref={AboutRef} key={index}>
                      <div className="Dynamic_Vcard_Live_Title">
                        <h3>About Us</h3>
                      </div>

                      <div className="about_details">
                        <div className="detail">
                          <div className="detail_title">
                            <h5>Company Name</h5>
                            <strong>:</strong>
                          </div>
                          <div className="detail_message">
                            <p>{data.CompanyName || " "}</p>
                          </div>
                        </div>
                        <div className="detail">
                          <div className="detail_title">
                            <h5>Category</h5>
                            <strong>:</strong>
                          </div>
                          <div className="detail_message">
                            <p>{data.Category || ""}</p>
                          </div>
                        </div>
                        <div className="detail">
                          <div className="detail_title">
                            <h5>Year of Est..</h5>
                            <strong>:</strong>
                          </div>
                          <div className="detail_message">
                            <p>{data.Year || " "}</p>
                          </div>
                        </div>

                        <div className="detail">
                          <div className="detail_title_bussiness">
                            <h5>Nature Of Business</h5>
                            <strong>:</strong>
                          </div>
                          <div className="detail_message_bussiness">
                            {data.Bussiness.map((data, index) => {
                              return (
                                <p
                                  className="bussiness"
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      ButtonTheme[0].BtnBackColour,
                                    borderRadius: "2px",
                                    padding: "5px",
                                    width: "max-content",
                                    color: ButtonTheme[0].BtnTextColour,
                                  }}
                                >
                                  {data + "  "}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                        {SocialMediaData.length > 0 ? (
                          <>
                            <div className="detail">
                              <div className="detail_title">
                                <h5>SocialMedia's</h5>
                                <strong>:</strong>
                              </div>
                              <div className="detail_message">
                                {/* SocialMedia */}
                                {SocialMediaData.map((data, index) => {
                                  return (
                                    <div className="social_medias" key={index}>
                                      {data.Facebook != "" ? (
                                        <a
                                          href={data.Facebook}
                                          target="_blank"
                                          className="social_media_icon"
                                        >
                                          <i className="bx bxl-facebook"></i>
                                          <small>Facebook</small>
                                          <div className="social_media_svg1">
                                            <svg
                                              id="sw-js-blob-svg"
                                              viewBox="0 0 100 100"
                                              xmlns="http://www.w3.org/2000/svg"
                                              version="1.1"
                                            >
                                              <defs>
                                                <linearGradient
                                                  id="sw-gradient"
                                                  x1="0"
                                                  x2="1"
                                                  y1="1"
                                                  y2="0"
                                                >
                                                  <stop
                                                    id="stop1"
                                                    stopColor="rgba(248, 117, 55, 1)"
                                                    offset="0%"
                                                  ></stop>
                                                  <stop
                                                    id="stop2"
                                                    stopColor="rgba(251, 168, 31, 1)"
                                                    offset="100%"
                                                  ></stop>
                                                </linearGradient>
                                              </defs>
                                              <path
                                                fill="url(#sw-gradient)"
                                                d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                                                width="100%"
                                                height="100%"
                                                transform="translate(50 50)"
                                                strokeWidth="0"
                                                style={{ transition: 0.3 }}
                                              ></path>
                                            </svg>
                                          </div>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.Instagram != "" ? (
                                        <a
                                          href={data.Instagram}
                                          target="_blank"
                                          className="social_media_icon"
                                        >
                                          <i className="bx bxl-instagram-alt"></i>
                                          <div className="social_media_svg2">
                                            <svg
                                              id="sw-js-blob-svg"
                                              viewBox="0 0 100 100"
                                              xmlns="http://www.w3.org/2000/svg"
                                              version="1.1"
                                            >
                                              <defs>
                                                <linearGradient
                                                  id="sw-gradient2"
                                                  x1="0"
                                                  x2="1"
                                                  y1="1"
                                                  y2="0"
                                                >
                                                  <stop
                                                    id="stop3"
                                                    stopColor="rgba(248, 117, 55, 1)"
                                                    offset="0%"
                                                  ></stop>
                                                  <stop
                                                    id="stop4"
                                                    stopColor="rgba(251, 168, 31, 1)"
                                                    offset="100%"
                                                  ></stop>
                                                </linearGradient>
                                              </defs>
                                              <path
                                                fill="url(#sw-gradient2)"
                                                d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                                                width="100%"
                                                height="100%"
                                                transform="translate(50 50)"
                                                strokeWidth="0"
                                                style={{ transition: 0.3 }}
                                              ></path>
                                            </svg>
                                          </div>
                                          <small>Instagram</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.LinkedIn != "" ? (
                                        <a
                                          href={data.LinkedIn}
                                          target="_blank"
                                          className="social_media_icon"
                                        >
                                          <i className="bx bxl-linkedin"></i>
                                          <div className="social_media_svg4">
                                            <svg
                                              id="sw-js-blob-svg"
                                              viewBox="0 0 100 100"
                                              xmlns="http://www.w3.org/2000/svg"
                                              version="1.1"
                                            >
                                              <defs>
                                                <linearGradient
                                                  id="sw-gradient4"
                                                  x1="0"
                                                  x2="1"
                                                  y1="1"
                                                  y2="0"
                                                >
                                                  <stop
                                                    id="stop7"
                                                    stopColor="rgba(248, 117, 55, 1)"
                                                    offset="0%"
                                                  ></stop>
                                                  <stop
                                                    id="stop8"
                                                    stopColor="rgba(251, 168, 31, 1)"
                                                    offset="100%"
                                                  ></stop>
                                                </linearGradient>
                                              </defs>
                                              <path
                                                fill="url(#sw-gradient4)"
                                                d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                                                width="100%"
                                                height="100%"
                                                transform="translate(50 50)"
                                                strokeWidth="0"
                                                style={{ transition: 0.3 }}
                                              ></path>
                                            </svg>
                                          </div>
                                          <small>LinkedIn</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.WhatsUp != "" ? (
                                        <a
                                          href={`https://wa.me/+91${data.WhatsUp}?text=Welcome to Aristostech Team!, How can we assest u ?`}
                                          target="_blank"
                                          className="social_media_icon"
                                        >
                                          <i className="bx bxl-whatsapp"></i>
                                          <div className="social_media_svg3">
                                            <svg
                                              id="sw-js-blob-svg"
                                              viewBox="0 0 100 100"
                                              xmlns="http://www.w3.org/2000/svg"
                                              version="1.1"
                                            >
                                              <defs>
                                                <linearGradient
                                                  id="sw-gradient3"
                                                  x1="0"
                                                  x2="1"
                                                  y1="1"
                                                  y2="0"
                                                >
                                                  <stop
                                                    id="stop5"
                                                    stopColor="rgba(248, 117, 55, 1)"
                                                    offset="0%"
                                                  ></stop>
                                                  <stop
                                                    id="stop6"
                                                    stopColor="rgba(251, 168, 31, 1)"
                                                    offset="100%"
                                                  ></stop>
                                                </linearGradient>
                                              </defs>
                                              <path
                                                fill="url(#sw-gradient3)"
                                                d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                                                width="100%"
                                                height="100%"
                                                transform="translate(50 50)"
                                                strokeWidth="0"
                                                style={{ transition: 0.3 }}
                                              ></path>
                                            </svg>
                                          </div>
                                          <small>Whatsup</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}

                                      {data.Twiter != "" ? (
                                        <a
                                          href={data.Twiter}
                                          target="_blank"
                                          className="social_media_icon"
                                        >
                                          <i className="bx bxl-twitter"></i>
                                          <div className="social_media_svg6">
                                            <svg
                                              id="sw-js-blob-svg6"
                                              viewBox="0 0 100 100"
                                              xmlns="http://www.w3.org/2000/svg"
                                              version="1.1"
                                            >
                                              <defs>
                                                <linearGradient
                                                  id="sw-gradient6"
                                                  x1="0"
                                                  x2="1"
                                                  y1="1"
                                                  y2="0"
                                                >
                                                  <stop
                                                    id="stop11"
                                                    stopColor="rgba(248, 117, 55, 1)"
                                                    offset="0%"
                                                  ></stop>
                                                  <stop
                                                    id="stop12"
                                                    stopColor="rgba(251, 168, 31, 1)"
                                                    offset="100%"
                                                  ></stop>
                                                </linearGradient>
                                              </defs>
                                              <path
                                                fill="url(#sw-gradient6)"
                                                d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                                                width="100%"
                                                height="100%"
                                                transform="translate(50 50)"
                                                strokeWidth="0"
                                                style={{ transition: 0.3 }}
                                              ></path>
                                            </svg>
                                          </div>
                                          <small>Twiter</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="Dynamiv_vcard_sub_Title">
                        <h3>Our Specialities</h3>
                      </div>
                      <div className="specialities">
                        <p>
                          <HtmlRenderer htmlString={data.Specialities || ""} />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}

            {/* Our Services */}
            {ServiceData.length > 0 && ManageContentData[0].Service == true ? (
              <>
                <div className="our_services" ref={ServiceRef}>
                  <div className="Dynamic_Vcard_Live_Title">
                    <h3>Our Services</h3>
                  </div>
                  <div className="All_Services">
                    {/* Service */}
                    {ServiceData.map((data, index) => {
                      return (
                        <div className="Service" key={index}>
                          <div className="service_title">
                            <h5> {data.ServiceName || "No Title"}</h5>
                          </div>
                          <div className="service_description">
                            <p
                              style={{
                                color: `${ServiceTheme[0].ServiceTextColor} !important`,
                              }}
                            >
                              <HtmlRenderer
                                htmlString={data.ServiceDescription}
                              />
                            </p>
                          </div>
                          {data.ServiceURL != "" ? (
                            <div className="service_link">
                              <a
                                href={data.ServiceURL ? data.ServiceURL : ""}
                                target="_blank"
                              >
                                For More Details <TbUnlink />
                              </a>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="service_image">
                            {data.ServiceType == "Icon_Tag" ? (
                              <>
                                <HtmlRenderer htmlString={data.ServiceIcon} />
                              </>
                            ) : (
                              ""
                            )}
                            {data.ServiceType == "ImageUpload" ? (
                              <>
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_BACKEND_API_URL
                                  }/${data.ServiceImage}`}
                                  alt="Service Upload Image"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {data.ServiceType == "Image_Address_Link" ? (
                              <>
                                <img
                                  src={data.ServiceAddress}
                                  alt="ServiceAddressImage"
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="service_action">
                            {data.ServicePrice != "" ? (
                              <div className="service_price">
                                <h5>Price : &nbsp;</h5>
                                <p>₹{data.ServicePrice}</p>
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="service_enquiry">
                              <a
                                href={`https://wa.me/+91${
                                  BasicData[0].MobileNumber
                                }?text=${encodeURIComponent(
                                  `Hi ${BasicData[0].user}`
                                )}`}
                                target="_blank"
                                className="service_button"
                              >
                                Enquire Now <GrChat />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Our Product */}
            {ProductData.length > 0 && ManageContentData[0].Product == true ? (
              <>
                <div className="our_products" ref={ProductRef}>
                  <div className="Dynamic_Vcard_Live_Title">
                    <h3>Our Products</h3>
                  </div>
                  <div className="All_Products">
                    {/* Product */}
                    {ProductData.map((data, index) => {
                      return (
                        <div className="Product" key={index}>
                          <div className="product_image">
                            {data.ProductType == "ImageUpload" ? (
                              <img
                                src={`${
                                  import.meta.env.VITE_APP_BACKEND_API_URL
                                }/${data.ProductImage}`}
                                alt="product"
                              />
                            ) : (
                              ""
                            )}
                            {data.ProductType == "Image_Address_Link" ? (
                              <img
                                src={
                                  data.ProductImageLink != undefined ||
                                  data.ProductImageLink != null
                                    ? data.ProductImageLink
                                    : `https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114181.jpg?t=st=1722480930~exp=1722484530~hmac=b3e99f19f2f2261ec0d7c5f1da8914dbfa376f325e37125598579ea7d7eced3b&w=900`
                                }
                                alt="product"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="product_action">
                            {data.ProductPrice != null ? (
                              <div className="product_price">
                                <h5>Price : &nbsp;</h5>
                                <p>₹{data.ProductPrice}</p>
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="product_enquiry">
                              <a
                                href={`https://wa.me/+91${
                                  BasicData[0].MobileNumber
                                }?text=${encodeURIComponent(
                                  `Hi ${BasicData[0].user}`
                                )}`}
                                target="_blank"
                                className="product_button"
                              >
                                Enquire Now <GrChat />
                              </a>
                            </div>
                          </div>
                          <div className="product_title">
                            <h5> {data.ProductName || "No Title"}</h5>
                          </div>
                          <div className="product_description">
                            <p>
                              <HtmlRenderer
                                htmlString={data.ProductDescription}
                              />
                            </p>
                          </div>
                          {data.ProductURL != "" ? (
                            <div className="product_link">
                              <a href={data.ProductURL} target="_blank">
                                For More Details <TbUnlink />
                              </a>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Payment */}
            {UPIData.length > 0 || BankData.length > 0 ? (
              <>
                <div className="Payment" ref={PaymentRef}>
                  <div className="Dynamic_Vcard_Live_Title">
                    <h3>For Payment</h3>
                  </div>
                  {UPIData.length > 0 ? (
                    <>
                      {UPIData.map((data, index) => {
                        return (
                          <div className="payment_details" key={index}>
                            <div className="detail">
                              <div className="detail_title">
                                <h5>Paytm Number</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{`+91-${data.paytm}`}</p>
                                <CopyToClipboard
                                  text={data.paytm}
                                  onCopy={handleCopyMobileNumber}
                                >
                                  <i className="bx bx-copy icon"></i>
                                </CopyToClipboard>
                              </div>
                            </div>
                            {data.phonepay != "" ? (
                              <div className="detail">
                                <div className="detail_title">
                                  <h5>PhonePay Number</h5>
                                </div>
                                <div className="detail_message">
                                  <strong>:</strong>
                                  <p>{`+91-${data.phonepay}`}</p>
                                  <CopyToClipboard
                                    text={data.phonepay}
                                    onCopy={handleCopyMobileNumber}
                                  >
                                    <i className="bx bx-copy icon"></i>
                                  </CopyToClipboard>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="detail">
                              <div className="detail_title">
                                <h5>Google Pay Number</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{`+91-${data.gpay}`}</p>
                                <CopyToClipboard
                                  text={data.gpay}
                                  onCopy={handleCopyMobileNumber}
                                >
                                  <i className="bx bx-copy icon"></i>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}

                  {BankData.length > 0 ? (
                    <>
                      <div className="Dynamiv_vcard_sub_Title">
                        <h3>Account Details</h3>
                      </div>
                      {BankData.map((data, index) => {
                        return (
                          <div className="account_details" key={index}>
                            <div className="detail">
                              <div className="detail_title">
                                <h5>Account Holder Name</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{data.HolderName}</p>
                              </div>
                            </div>
                            <div className="detail">
                              <div className="detail_title">
                                <h5>Bank Name</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{data.BankName}</p>
                              </div>
                            </div>

                            <div className="detail">
                              <div className="detail_title">
                                <h5>IFSC code</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{data.IFSCCode}</p>
                                <CopyToClipboard
                                  text={data.IFSCCode}
                                  onCopy={handleCopyMobileNumber}
                                >
                                  <i className="bx bx-copy icon"></i>
                                </CopyToClipboard>
                              </div>
                            </div>
                            <div className="detail">
                              <div className="detail_title">
                                <h5>Account Number</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{data.AccountNumber}</p>
                                <CopyToClipboard
                                  text={data.AccountNumber}
                                  onCopy={handleCopyMobileNumber}
                                >
                                  <i className="bx bx-copy icon"></i>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}

                  {UPIData.length > 0 ? (
                    <>
                      <div className="Dynamiv_vcard_sub_Title">
                        <h3>QR Code</h3>
                      </div>
                      {UPIData.map((data, index) => {
                        return (
                          <>
                            <div className="qr_code_upi_name" key={index}>
                              <h4>{data.UPI_Type}</h4>
                            </div>
                            <div className="qr_image_box">
                              {/* <div className="user_name">
                            <h4>
                              To John Wick <LiaHandPointDownSolid />
                            </h4>
                          </div> */}
                              <div className="qr_image">
                                <img
                                  src={
                                    data.QRCodeImage
                                      ? data.QRCodeImage
                                      : "https://img.freepik.com/premium-vector/qr-code-white-box-circle_78370-5879.jpg?w=740"
                                  }
                                  alt="qrcode"
                                />
                              </div>
                              {/* <div className="quote">
                            <small>Scan with pay any UPI App</small>
                          </div> */}
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}

            {/* Gallery */}
            {GalleryData.length > 0 && ManageContentData[0].Gallery == true ? (
              <>
                <div className="gallery" ref={GalleryRef}>
                  <div className="Dynamic_Vcard_Live_Title">
                    <h3>Gallery</h3>
                  </div>

                  <div className="all_gallerys">
                    {GalleryData.map((data, index) => {
                      return (
                        <div className="gallery_image" key={index}>
                          {data.GalleryType == "ImageUpload" ? (
                            <img
                              src={`${
                                import.meta.env.VITE_APP_BACKEND_API_URL
                              }/${data.GalleryImage}`}
                              alt="developer"
                              onClick={(e) => openFullImage(e.target.src)}
                            />
                          ) : (
                            ""
                          )}
                          {data.GalleryType == "Image_Address_URL" ? (
                            <img
                              src={
                                data.GalleryImageURL ||
                                "https://i0.wp.com/www.aristostechindia.com/wp-content/uploads/2023/12/Mobilebannerhojo-3.png?fit=1030%2C679&ssl=1"
                              }
                              alt="developer"
                              onClick={(e) => openFullImage(e.target.src)}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Videos */}
            {VideoData.length > 0 ? (
              <>
                <div className="video" ref={VideoRef}>
                  <div className="Dynamic_Vcard_Live_Title">
                    <h3>Videos</h3>
                  </div>

                  <div className="videos_container">
                    {VideoData.map((data, index) => {
                      return (
                        <div className="video_image" key={index}>
                          <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${
                              data.Video.split("/")[3]
                            }`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {/* //Appinment */}
            {(VCard_URL_Data.length > 0 &&
              ManageContentData[0].Appoinment == true &&
              ServiceData.length > 0) ||
            ProductData.length > 0 ? (
              <>
                {AppoinmentTheme.length > 0 ? (
                  <div className="Appoinment" ref={AppoinmentRef}>
                    <div className="Dynamic_Vcard_Live_Title">
                      <h3>Appoinment</h3>
                    </div>
                    {/* Success and Error Popup */}
                    <div className="popup_message_container">
                      <div
                        className="popup_success_box"
                        id={AppoinmentPopup ? "successOpen" : "successClose"}
                      >
                        <div className="popup_message">{successMessage}</div>
                        <div
                          className="popup_close"
                          onClick={() => setAppoinmentPopup(false)}
                        >
                          <i className="bx bx-x"></i>
                        </div>
                      </div>

                      {AppoinmentPopupError ? (
                        <div className="popup_error_box">
                          <div className="popup_message">{errorMessage}</div>
                          <div
                            className="popup_close"
                            onClick={() => setAppoinmentPopupError(false)}
                          >
                            <i className="bx bx-x"></i>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="appinment_form_container">
                      <form
                        className="appinment_form"
                        onSubmit={Appoinment_formik.handleSubmit}
                      >
                        <div
                          className={`form_group ${AppoinmentTheme[0].AppoinmentInputDesign}`}
                        >
                          <label
                            htmlFor="FullName"
                            className={
                              Appoinment_formik.errors.FullName
                                ? "labelError"
                                : ""
                            }
                          >
                            {Appoinment_formik.errors.FullName
                              ? Appoinment_formik.errors.FullName
                              : `FullName`}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <input
                            type="text"
                            name="FullName"
                            id="FullName"
                            placeholder="Enter Your FullName"
                            value={Appoinment_formik.values.FullName}
                            onChange={Appoinment_formik.handleChange}
                            className={`${AppoinmentTheme[0].AppoinmentInputDesign}
                         ${Appoinment_formik.errors.FullName} &&
                         ${Appoinment_formik.touched.FullName}
                           ? "input_error"
                           : "input_success"
                       `}
                            //  className="date-input"
                          />
                          <div className="icon">
                            <i className="bx bxs-user"></i>
                          </div>
                        </div>
                        <div
                          className={`form_group ${AppoinmentTheme[0].AppoinmentInputDesign}`}
                        >
                          <label
                            htmlFor="MobileNumber"
                            className={
                              Appoinment_formik.errors.MobileNumber
                                ? "labelError"
                                : ""
                            }
                          >
                            {Appoinment_formik.errors.MobileNumber
                              ? Appoinment_formik.errors.MobileNumber
                              : `MobileNumber`}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <input
                            type="tel"
                            name="MobileNumber"
                            id="MobileNumber"
                            placeholder="Enter Your MobileNumber"
                            value={Appoinment_formik.values.MobileNumber}
                            onChange={Appoinment_formik.handleChange}
                            className={`${AppoinmentTheme[0].AppoinmentInputDesign}
                         ${Appoinment_formik.errors.MobileNumber} &&
                         ${Appoinment_formik.touched.MobileNumber}
                           ? "input_error"
                           : "input_success"
                       `}
                          />
                          <div className="icon">
                            <i className="bx bx-mobile"></i>
                          </div>
                        </div>
                        <div
                          className={`form_group ${AppoinmentTheme[0].AppoinmentInputDesign}`}
                        >
                          <label
                            htmlFor="Date"
                            className={
                              Appoinment_formik.errors.Date ? "labelError" : ""
                            }
                          >
                            {Appoinment_formik.errors.Date
                              ? Appoinment_formik.errors.Date
                              : `Date`}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <input
                            type="date"
                            name="Date"
                            id="Date"
                            placeholder="Enter Your date"
                            value={Appoinment_formik.values.Date}
                            onChange={Appoinment_formik.handleChange}
                            className={` date-input ${
                              AppoinmentTheme[0].AppoinmentInputDesign
                            }
                             ${
                               Appoinment_formik.errors.Date &&
                               Appoinment_formik.touched.Date
                             }
                               ? "input_error"
                               : "input_success"
                           `}
                          />
                          <div className="icon">
                            <i className="bx bxs-calendar"></i>
                          </div>
                        </div>
                        <div
                          className={`form_group ${AppoinmentTheme[0].AppoinmentInputDesign}`}
                        >
                          <label
                            htmlFor="Time"
                            className={
                              Appoinment_formik.errors.Time ? "labelError" : ""
                            }
                          >
                            {Appoinment_formik.errors.Time
                              ? Appoinment_formik.errors.Time
                              : `Time`}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <select
                            name="Time"
                            id="Time"
                            placeholder="Enter Your Time"
                            value={Appoinment_formik.values.Time}
                            onChange={Appoinment_formik.handleChange}
                            className={` date-input ${
                              AppoinmentTheme[0].AppoinmentInputDesign
                            }
                             ${
                               Appoinment_formik.errors.Time &&
                               Appoinment_formik.touched.Time
                             }
                               ? "input_error"
                               : "input_success"
                           `}
                          >
                            <option value="">Select Your Time</option>
                            <option value="9:00 AM">9:00 AM</option>
                            <option value="9:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="11:00 AM">12:00 AM</option>
                            <option value="01:00 PM">01:00 PM</option>
                            <option value="01:00 PM">02:00 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                            <option value="03:00 PM">04:00 PM</option>
                            <option value="03:00 PM">05:00 PM</option>
                            <option value="03:00 PM">06:00 PM</option>
                          </select>
                          <div className="icon">
                            <i className="bx bxs-time-five"></i>
                          </div>
                        </div>
                        <div className="form_submit">
                          <button type="submit" className="submit-btn">
                            {appoinmentLoader ? (
                              <span className="inquiryloader"></span>
                            ) : (
                              <span className="material-symbols-outlined">
                                send
                              </span>
                            )}
                            Book Now
                          </button>
                          <button
                            type="button"
                            className="submit-btn"
                            onClick={Appoinment_formik.resetForm}
                          >
                            <span className="material-symbols-outlined">
                              clear_all
                            </span>
                            clear
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
            {/* Opentime */}
            {BussinessHourData.length > 0 &&
            ManageContentData[0].BussinessHour == true ? (
              <>
                <div className="time_container" ref={TimeRef}>
                  <div className="Dynamic_Vcard_Live_Title">
                    <h3>Open&Close Time</h3>
                    {/* Contact */}
                  </div>
                  <div className="time_list_container">
                    {BussinessHourData[0].Monday.from.length > 0 &&
                    BussinessHourData[0].Monday.to.length > 0 ? (
                      <div className="time_list">
                        <div className="day">
                          <span>Monday</span>
                        </div>
                        <div className="time">
                          <div className="start">
                            <h6>Open Time</h6>
                            <span>{BussinessHourData[0].Monday.from}AM</span>
                          </div>
                          <div className="end">
                            <h6>Close Time</h6>
                            <span>{BussinessHourData[0].Monday.to}PM</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {BussinessHourData[0].Tuesday.from.length > 0 &&
                    BussinessHourData[0].Tuesday.to.length > 0 ? (
                      <>
                        <div className="time_list">
                          <div className="day">
                            <span>Tuesday</span>
                          </div>
                          <div className="time">
                            <div className="start">
                              <h6>Open Time</h6>
                              <span>{BussinessHourData[0].Tuesday.from}AM</span>
                            </div>
                            <div className="end">
                              <h6>Close Time</h6>
                              <span>{BussinessHourData[0].Tuesday.to}PM</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {BussinessHourData[0].Wednesday.from.length > 0 &&
                    BussinessHourData[0].Wednesday.to.length > 0 ? (
                      <>
                        <div className="time_list">
                          <div className="day">
                            <span>Wednesday</span>
                          </div>
                          <div className="time">
                            <div className="start">
                              <h6>Open Time</h6>
                              <span>
                                {BussinessHourData[0].Wednesday.from}AM
                              </span>
                            </div>
                            <div className="end">
                              <h6>Close Time</h6>
                              <span>{BussinessHourData[0].Wednesday.to}PM</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {BussinessHourData[0].Thursday.from.length > 0 &&
                    BussinessHourData[0].Thursday.to.length > 0 ? (
                      <div className="time_list">
                        <div className="day">
                          <span>Thursday</span>
                        </div>
                        <div className="time">
                          <div className="start">
                            <h6>Open Time</h6>
                            <span>{BussinessHourData[0].Thursday.from}AM</span>
                          </div>
                          <div className="end">
                            <h6>Close Time</h6>
                            <span>{BussinessHourData[0].Thursday.to}PM</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {BussinessHourData[0].Friday.from.length > 0 &&
                    BussinessHourData[0].Friday.to.length > 0 ? (
                      <>
                        <div className="time_list">
                          <div className="day">
                            <span>Friday</span>
                          </div>
                          <div className="time">
                            <div className="start">
                              <h6>Open Time</h6>
                              <span>{BussinessHourData[0].Friday.from}AM</span>
                            </div>
                            <div className="end">
                              <h6>Close Time</h6>
                              <span>{BussinessHourData[0].Friday.to}PM</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {(BussinessHourData[0].Saturday.from.length > 0 &&
                      BussinessHourData[0].Saturday.to.length > 0) ||
                    BussinessHourData[0].Sunday.from.length > 0 ||
                    BussinessHourData[0].Sunday.from.length ? (
                      <>
                        <div className="time_list">
                          <div className="day">
                            <span>Weekend Days</span>
                          </div>
                          <div className="time">
                            <div className="start">
                              <h6>Open Time</h6>
                              <span>
                                {BussinessHourData[0].Saturday.from}AM
                              </span>
                            </div>
                            <div className="end">
                              <h6>Close Time</h6>
                              <span>{BussinessHourData[0].Saturday.to}PM</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Testimonials */}
            {TestimonialData.length > 0 &&
            ManageContentData[0].Testimonial == true ? (
              <>
                <div className="testimonial" ref={TestimonialRef}>
                  <div className="Dynamic_Vcard_Live_Title">
                    <h3>Testimonial</h3>
                    {/* <span className="material-symbols-outlined">share_reviews</span> */}
                  </div>
                  <div className="testimonial_container">
                    <Carousel
                      showThumbs={false}
                      showStatus={true}
                      infiniteLoop
                      autoPlay
                    >
                      {TestimonialData.map((data, index) => {
                        return (
                          <div className="testimonial_list" key={index}>
                            <div className="client_feedback">
                              <div className="feedback_title">
                                <h4>Feedback</h4>
                              </div>
                              <div className="feedback_message">
                                <small>
                                  {data.ClientFeedback ||
                                    ` Lorem ipsum dolor, sit amet consectetur adipisicing
                              elit. Vel repellendus a ut! Architecto quis error
                              porro nemo beatae perspiciatis omnis?`}
                                </small>
                              </div>
                            </div>
                            <div className="user_detail">
                              <img
                                src={
                                  data.ClientImage ||
                                  "https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                                }
                                alt="clientImage"
                              />

                              <div className="client_name">
                                <h4>{data.ClientName}</h4>
                                <small>-Member</small>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Carousel>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* GoogleMap */}

            {GoogleMapData.length > 0 &&
            ManageContentData[0].GoogleMap == true ? (
              <>
                <div className="google_map_container">
                  <div className="Dynamic_Vcard_Live_Title">
                    <h3>Location</h3>
                    {/* Contact */}
                  </div>

                  <div
                    className="google_map"
                    dangerouslySetInnerHTML={{
                      __html: GoogleMapData[0].GoogleIframe,
                    }}
                  ></div>
                </div>
              </>
            ) : (
              ""
            )}
            {/* Feedback */}
            {VCard_URL_Data.length > 0 &&
            BasicData.length > 0 &&
            SocialMediaData.length > 0 &&
            ManageContentData[0].FeedbackForm == true ? (
              <>
                {FeedbackTheme.length > 0 ? (
                  <div className="feedback_row" ref={FeedbackRef}>
                    <div className="Dynamic_Vcard_Live_Title">
                      <h3>Feedback</h3>
                    </div>
                    {/* Success and Error Popup */}
                    <div className="popup_message_container">
                      <div
                        className="popup_success_box"
                        id={FeedbackPopup ? "successOpen" : "successClose"}
                      >
                        <div className="popup_message">{successMessage}</div>
                        <div
                          className="popup_close"
                          onClick={() => setFeedbackPopup(false)}
                        >
                          <TiTick className="icon" />
                        </div>
                      </div>

                      {FeedbackPopupError ? (
                        <div className="popup_error_box">
                          <div className="popup_message">{errorMessage}</div>
                          <div
                            className="popup_close"
                            onClick={() => setFeedbackPopupError(false)}
                          >
                            <i className="bx bx-x"></i>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* //Feedback messages */}
                    <div className="Feedback_container_message">
                      <div className="feeback_title">
                        {commentOpen ? (
                          <button onClick={() => setCommentOpen(false)}>
                            <span className="material-symbols-outlined">
                              thumbs_up_down
                            </span>
                            Hide All Feedbacks
                          </button>
                        ) : (
                          <button onClick={() => setCommentOpen(true)}>
                            <span className="material-symbols-outlined">
                              thumbs_up_down
                            </span>
                            See All Feedbacks
                            <i className="bx bxs-bell-ring bx-tada"></i>
                            <div className="count">{AllFeedBacks.length}</div>
                          </button>
                        )}

                        {feedbackLoader ? (
                          <span className="feedBack_loader"></span>
                        ) : (
                          ""
                        )}
                      </div>

                      {commentOpen ? (
                        <div className="comment_box">
                          <div className="comment_box_title">
                            <h5>Client's All Feedbacks</h5>
                          </div>
                          {AllFeedBacks.map((data, index) => {
                            return (
                              <div className="message" key={index}>
                                <div className="user_detail">
                                  <div className="details">
                                    <div className="userName">
                                      <p>
                                        {data.ClientName}
                                        <i className="bx bxs-user-check"></i>
                                      </p>
                                    </div>
                                    <div className="stars">
                                      <div
                                        className="ratting_container1"
                                        data-rating={data.ClientRatting}
                                        name="currentRatting"
                                        // id="currentRatting"
                                        id={
                                          data.ClientRatting == 0
                                            ? "noRatting"
                                            : "" || data.ClientRatting == 1
                                            ? "singleRatting"
                                            : "" || data.ClientRatting == 2
                                            ? "doubleRatting"
                                            : "" || data.ClientRatting == 3
                                            ? "ThreeRatting"
                                            : "" || data.ClientRatting == 4
                                            ? "fourRatting"
                                            : "" || data.ClientRatting == 5
                                            ? "fullRatting"
                                            : ""
                                        }
                                        value={data.ClientRatting}
                                      >
                                        <span className="ratting_star">
                                          <i
                                            className="bx bxs-star star1"
                                            data-rating="1"
                                          ></i>
                                        </span>
                                        <span className="ratting_star">
                                          <i
                                            className="bx bxs-star star1"
                                            data-rating="2"
                                          ></i>
                                        </span>
                                        <span className="ratting_star">
                                          <i
                                            className="bx bxs-star star1"
                                            data-rating="3"
                                          ></i>
                                        </span>
                                        <span className="ratting_star">
                                          <i
                                            className="bx bxs-star star1"
                                            data-rating="4"
                                          ></i>
                                        </span>
                                        <span className="ratting_star">
                                          <i
                                            className="bx bxs-star star1"
                                            data-rating="5"
                                          ></i>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="comments">
                                  <i className="bx bx-chat"></i>
                                  <span>{data.ClientFeedback}</span>
                                </div>

                                <div className="date">
                                  <i className="bx bx-calendar"></i>
                                  <p>
                                    {" "}
                                    {data.createdAt
                                      .slice(0, 10)
                                      .split("-")
                                      .reverse()
                                      .join("-")}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="feedback_container">
                      <form action="" onSubmit={feedbackFormik.handleSubmit}>
                        <div
                          className={`form_group ${FeedbackTheme[0]?.FeedbackInputDesign}`}
                        >
                          <label
                            htmlFor="clientName_Input"
                            className={`${
                              feedbackFormik.errors.ClientName ? "error" : ""
                            } `}
                          >
                            {feedbackFormik.touched.ClientName &&
                            feedbackFormik.errors.ClientName
                              ? feedbackFormik.errors.ClientName
                              : "Your Name"}
                            <span>
                              <sup>*</sup>
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Name"
                            name="ClientName"
                            id="ClientName"
                            className={FeedbackTheme[0]?.FeedbackInputDesign}
                            // value={userName}
                            // onChange={(e)=>setUserName(e.target.value)}
                            value={feedbackFormik.values.ClientName}
                            onChange={feedbackFormik.handleChange}
                            onBlur={feedbackFormik.handleBlur}
                          />
                          <div className="icon">
                            <i className="bx bxs-user"></i>
                          </div>
                        </div>
                        <div
                          className={`form_group ${FeedbackTheme[0]?.FeedbackInputDesign}`}
                        >
                          <label
                            htmlFor="clientFeedBack_Input"
                            className={`${
                              feedbackFormik.errors.ClientFeedback
                                ? "error"
                                : ""
                            } `}
                          >
                            {feedbackFormik.touched.ClientFeedback &&
                            feedbackFormik.errors.ClientFeedback
                              ? feedbackFormik.errors.ClientFeedback
                              : "Your FeedBack"}
                            <span>
                              <sup>*</sup>
                            </span>
                          </label>
                          <textarea
                            id="ClientFeedback"
                            name="ClientFeedback"
                            cols="30"
                            rows="2"
                            placeholder="Enter your Feedback"
                            className={FeedbackTheme[0]?.FeedbackInputDesign}
                            // value={userFeedback}
                            // onChange={(e)=>setUserFeedback(e.target.value)}
                            value={feedbackFormik.values.ClientFeedback}
                            onChange={feedbackFormik.handleChange}
                            onBlur={feedbackFormik.handleBlur}
                          ></textarea>
                          <div className="icon">
                            <i className="bx bx-message-square-detail"></i>
                          </div>
                        </div>
                        <div className="form_group">
                          <label
                            htmlFor="clientName_Input"
                            className={`${
                              feedbackFormik.errors.ClientRatting ? "error" : ""
                            } `}
                          >
                            {feedbackFormik.touched.ClientRatting &&
                            feedbackFormik.errors.ClientRatting
                              ? feedbackFormik.errors.ClientRatting
                              : "Ratting"}
                            <span>
                              <sup>*</sup>
                            </span>
                          </label>

                          <ReactStars
                            count={5}
                            value={feedbackFormik.values.ClientRatting}
                            onChange={(newRating) => {
                              // Directly use Formik's handleChange by creating an event-like object for the rating field
                              feedbackFormik.handleChange({
                                target: {
                                  name: "ClientRatting",
                                  value: newRating,
                                },
                              });
                            }}
                            size={44}
                            style={{ paddingRight: "10px" }}
                            half={false}
                            color2={
                              FeedbackTheme[0]?.FeedbackInputColor
                                ? FeedbackTheme[0].FeedbackInputColor
                                : "#ffd700"
                            }
                          />
                        </div>
                        <div className="form_actions">
                          <button type="submit">
                            <span className="material-symbols-outlined">
                              send
                            </span>
                            Send Feedback
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              " "
            )}
            {/* Inquries */}
            {VCard_URL_Data.length > 0 &&
            BasicData.length > 0 &&
            SocialMediaData.length > 0 &&
            ManageContentData[0].InquiryForm == true ? (
              <>
                {FeedbackTheme.length > 0 ? (
                  <div className="Inquries" ref={InquiryRef}>
                    <div className="Dynamic_Vcard_Live_Title">
                      <h3>Inquries</h3>
                    </div>
                    {/* Success and Error Popup */}
                    <div className="popup_message_container">
                      <div
                        className="popup_success_box"
                        id={successPopupOpen ? "successOpen" : "successClose"}
                      >
                        <div className="popup_message">{successMessage}</div>
                        <div
                          className="popup_close"
                          onClick={() => setSuccessPopupOpen(false)}
                        >
                          <i className="bx bx-x"></i>
                        </div>
                      </div>

                      {errorPopupOpen ? (
                        <div className="popup_error_box">
                          <div className="popup_message">{errorMessage}</div>
                          <div
                            className="popup_close"
                            onClick={() => setErrorPopupOpen(false)}
                          >
                            <i className="bx bx-x"></i>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="inquiries_container5">
                      <form action="" onSubmit={formik.handleSubmit}>
                        <div
                          className={`form_group ${FeedbackTheme[0].FeedbackInputDesign}`}
                        >
                          <label
                            htmlFor="name"
                            className={formik.errors.Name ? "labelError" : ""}
                          >
                            {formik.errors.Name ? formik.errors.Name : `Name`}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <div className="input">
                            <input
                              type="text"
                              placeholder="Your Name"
                              name="Name"
                              id="Name"
                              value={formik.values.Name}
                              onChange={formik.handleChange}
                              className={`${FeedbackTheme[0].FeedbackInputDesign}
                          ${formik.errors.Name} && ${formik.touched.Name}
                            ? "input_error"
                            : "input_success"
                        `}
                            />
                            <i className="bx bxs-user-pin"></i>
                          </div>
                        </div>
                        <div
                          className={`form_group ${FeedbackTheme[0].FeedbackInputDesign}`}
                        >
                          <label
                            htmlFor="name"
                            className={formik.errors.Email ? "labelError" : ""}
                          >
                            {formik.errors.Email
                              ? formik.errors.Email
                              : `Email`}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <div className="input">
                            <input
                              type="email"
                              placeholder="Your Email"
                              name="Email"
                              id="Email"
                              value={formik.values.Email}
                              onChange={formik.handleChange}
                              className={`${FeedbackTheme[0].FeedbackInputDesign}
                          ${formik.errors.Email} && ${formik.touched.Email}
                            ? "input_error"
                            : "input_success"
                        `}
                            />
                            <i className="bx bxs-envelope"></i>
                          </div>
                        </div>
                        <div
                          className={`form_group ${FeedbackTheme[0].FeedbackInputDesign}`}
                        >
                          <label
                            htmlFor="name"
                            className={
                              formik.errors.MobileNumber ? "labelError" : ""
                            }
                          >
                            {formik.errors.MobileNumber
                              ? formik.errors.MobileNumber
                              : `MobileNumber`}
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                          </label>
                          <div className="input">
                            <input
                              type="tel"
                              placeholder="Enter Mobile Number"
                              name="MobileNumber"
                              id="MobileNumber"
                              value={formik.values.MobileNumber}
                              onChange={formik.handleChange}
                              className={`${FeedbackTheme[0].FeedbackInputDesign}
                          ${formik.errors.MobileNumber} &&
                          ${formik.touched.MobileNumber}
                            ? "input_error"
                            : "input_success"
                        `}
                            />
                            <i className="bx bxs-phone-call"></i>
                          </div>
                        </div>
                        <div
                          className={`form_group ${FeedbackTheme[0].FeedbackInputDesign}`}
                        >
                          <label
                            htmlFor="name"
                            className={
                              formik.errors.Message ? "labelError" : ""
                            }
                          >
                            {formik.errors.Message
                              ? formik.errors.Message
                              : `Message`}
                            <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <div className="input">
                            <textarea
                              name="Message"
                              id="Message"
                              value={formik.values.Message}
                              onChange={formik.handleChange}
                              className={` ${
                                FeedbackTheme[0].FeedbackInputDesign
                              }
                          ${formik.errors.Message && formik.touched.Message}
                            ? "input_error"
                            : "input_success"
                        `}
                              cols="30"
                              rows="4"
                              placeholder="Enter Your Message Here..."
                            ></textarea>

                            <i className="bx bxs-message-dots"></i>
                          </div>
                        </div>
                        <div className="form_actions">
                          <button type="submit">
                            {InquiryLoader ? (
                              <span className="inquiryloader"></span>
                            ) : (
                              <span className="material-symbols-outlined">
                                send
                              </span>
                            )}
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            {/* Share */}
            <div className="share" ref={shareRef}>
              <div className="Dynamic_Vcard_Live_Title">
                <h3>Share</h3>
              </div>
              <div className="input">
                <input
                  type="text"
                  value={`${import.meta.env.VITE_CLIENT_DOMAIN_URL}${
                    window.location.pathname
                  }`}
                />
                <div className="icon">
                  <CopyToClipboard
                    text={`${import.meta.env.VITE_CLIENT_DOMAIN_URL}/${
                      window.location.pathname
                    }`}
                    onCopy={handleCopyURL}
                  >
                    <i className="bx bx-copy"></i>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="qr_code" ref={qrRef}>
                <QRCodeSVG value={currentPath} size={156} level={"H"} />
                <div className="qr_actions">
                  <button onClick={shareQRCodeAsSVG}>
                    Share <FaShare />{" "}
                  </button>
                  <button onClick={downloadQRCode}>
                    Download <FaDownload />
                  </button>
                </div>
              </div>
              <div className="share_input">
                <label>Share profile to any whatsapp number:</label>
                <div className="whatsup_input">
                  <PhoneInput
                    country={"in"} // Default country
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    enableSearch={true} // Search country by name
                    className="mobileNumber_input"
                  />
                  <button onClick={handleShareWhatsApp}>
                    <i className="bx bxl-whatsapp"></i>Share
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="Footer" style={{ color: "#000" }}>
              <div className="dynamic_footer_container">
                <svg
                  className="dynamic_footer_svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#fff"
                    fillOpacity="1"
                    d="M0,96L24,90.7C48,85,96,75,144,58.7C192,43,240,21,288,48C336,75,384,149,432,176C480,203,528,181,576,170.7C624,160,672,160,720,154.7C768,149,816,139,864,117.3C912,96,960,64,1008,48C1056,32,1104,32,1152,53.3C1200,75,1248,117,1296,138.7C1344,160,1392,160,1416,160L1440,160L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
                  ></path>
                </svg>

                <small>Powered By Arsitostech India Pvt Limited</small>
                <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <URLNotFound />
      )}
    </>
  );
};

export default Dynamic_VCard_Live;
