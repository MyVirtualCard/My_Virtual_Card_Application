import React, { useContext, useEffect, useRef, useState } from "react";
import "./Dynamic_VCard_PREVIEW.scss";
import banner from "../../../../assets/AllVCard_Image/VCard3/Banner.jpg";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiSolidPhoneCall, BiSolidVideo } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { FaDirections } from "react-icons/fa";
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
import { InquiryValidateSchema } from "../../../Helper/InquiryValidate";
import { AppoinmentValidateSchema } from "../../../Helper/AppoinmentValidate";
import { AppContext } from "../../../Context/AppContext";
import VCard_Loader from "../../../VCard_Loader/VCard_Loader";
import URLNotFound from "../../404_Error_Page/404";
const Dynamic_VCard_PREVIEW = () => {
  let {
    Token,
    userName,
    FormSubmitLoader,
    currentTemplate,
    setCurrentTemplate,
    currentPlan,
    setCurrentPlan,
    ShowForm,
    DynamicForm,
    setDynamicForm,
    setShowForm,
    activePlan,
    setPlanActive,
    URL_Alies,
    setURL_Alies,
    PaymentSuccessPopup,
    setPaymentSuccessPopup,
    status,
    setStatus,
    CurrentPlanActive,
    setCurrentPlanActive,
    VCardColour,
    setVCardColour,
    VCardTextColour,
    setVCardTextColour,
    SVG_Design,
    setSVG_Design,
    VcardThemeUpdateToggle,
    setVcardThemeUpdateToggle,
    BannerHeight,
    setBannerHeight,
    BannerBrightness,
    setBannerBrightness,
    LogoWidth,
    setLogoWidth,
    LogoWidthUnit,
    setLogoWidthUnit,
    LogoHeight,
    setLogoHeight,
    LogoHeightUnit,
    setLogoHeightUnit,
    LogoBorderRadius,
    setLogoBorderRadius,
    LogoBorderRadiusUnit,
    setLogoBorderRadiusUnit,
    LogoPosition,
    setLogoPosition,
    LogoTopPosition,
    setLogoTopPosition,
    LogoPositionUnit,
    setLogoPositionUnit,
    LogoLeftPosition,
    setLogoLeftPosition,
    LogoBottomPosition,
    setLogoBottomPosition,
    LogoRightPosition,
    setLogoRightPosition,
    UserDataPosition,
    setUserDataPosition,
    ImageThemeUpdateToggle,
    setImageThemeUpdateToggle,
    // 3]Btn and Icon
    BtnBackColour,
    setBtnBackColour,
    BtnTextColour,
    setBtnTextColour,
    BtnHoverColour,
    setBtnHoverColour,
    BtnHoverTextColour,
    setBtnHoverTextColour,

    ContactBtnBorderRadius,
    setContactBtnBorderRadius,
    ContactBtnUnit,
    setContactBtnUnit,
    IconBorderRadius,
    setIconBorderRadius,
    IconUnit,
    setIconUnit,
    ButtonThemeUpdateToggle,
    setButtonThemeUpdateToggle,
    // 4]Title states
    TitleColor,
    setTitleColor,
    TitleSize,
    setTitleSize,
    TitleUnit,
    setTitleUnit,
    TitleFontWeight,
    setTitleFontWeight,
    TitleFont,
    setTitleFont,
    TitlePosition,
    setTitlePosition,
    // SubTitle
    SubTitleColor,
    setSubTitleColor,
    SubTitleSize,
    setSubTitleSize,
    SubTitleUnit,
    setSubTitleUnit,
    SubTitleFontWeight,
    setSubTitleFontWeight,
    SubTitleFont,
    setSubTitleFont,
    SubTitlePosition,
    setSubTitlePosition,
    TitleThemeUpdateToggle,
    setTitleThemeUpdateToggle,
    //5] Service states
    ServiceBackColor,
    setServiceBackColor,
    ServiceTextColor,
    setServiceTextColor,
    ServiceTitleColor,
    setServiceTitleColor,
    ServiceTitleFont,
    setServiceTitleFont,
    ServiceTitleSize,
    setServiceTitleSize,
    ServiceTitleUnit,
    setServiceTitleUnit,
    ServiceFontWeight,
    setServiceFontWeight,
    ServiceTitleAlign,
    setServiceTitleAlign,
    BtnBackColor,
    setBtnBackColor,
    BtnTextColor,
    setBtnTextColor,
    BtnHoverBackColor,
    setBtnHoverBackColor,
    BtnHoverTextColor,
    setBtnHoverTextColor,
    ServiceThemeUpdateToggle,
    setServiceThemeUpdateToggle,
    // 6] Product states
    ProductBackColor,
    setProductBackColor,
    ProductTextColor,
    setProductTextColor,
    ProductTitleColor,
    setProductTitleColor,
    ProductTitleFont,
    setProductTitleFont,
    ProductTitleSize,
    setProductTitleSize,
    ProductTitleUnit,
    setProductTitleUnit,
    ProductFontWeight,
    setProductFontWeight,
    ProductTitleAlign,
    setProductTitleAlign,
    ProductBtnBackColor,
    setProductBtnBackColor,
    ProductBtnTextColor,
    setProductBtnTextColor,
    ProductBtnHoverBackColor,
    setProductBtnHoverBackColor,
    ProductBtnHoverTextColor,
    setProductBtnHoverTextColor,
    ProductThemeUpdateToggle,
    setProductThemeUpdateToggle,
    // 7]GalleryStates
    ImageBorderRadius,
    setImageBorderRadius,
    GalleryUpdateToggle,
    setGalleryUpdateToggle,
    // 8]Timer states
    TimerBackColour,
    setTimerBackColour,
    TimerTextColour,
    setTimerTextColour,
    TimerTitleColor,
    setTimerTitleColor,
    TimerSubTitleColor,
    setTimerSubTitleColor,
    TimerBoxBorderRadius,
    setTimerBoxBorderRadius,
    TimerUpdateToggle,
    setTimerUpdateToggle,
    // 9]Testimonial states
    TestimonialBackColor,
    setTestimonialBackColor,
    TestimonialTextColor,
    setTestimonialTextColor,
    TestimonialTitleColor,
    setTestimonialTitleColor,
    TestimonialClientNameColor,
    setTestimonialClientNameColor,
    TestimonialBorderRadius,
    setTestimonialBorderRadius,
    TestimonialImageBorderRadius,
    setTestimonialImageBorderRadius,
    FlexDirection,
    UserDataFlexDirection,
    UserDataJustifyContent,
    setUserDataJustifyContent,
    UserDataAlignItems,
    setUserDataAlignItems,
    setUserDataFlexDirection,
    setFlexDirection,
    TestimonialUpdateToggle,
    setTestimonialUpdateToggle,
    // 10]Appoinemnt states
    AppoinmentInputDesign,
    setAppoinmentInputDesign,
    LabelColor,
    setLabelColor,
    InputBorderColor,
    setInputBorderColor,
    InputBorderOnFocus,
    setInputBorderOnFocus,
    PlaceholderColor,
    setPlaceholderColor,
    InputError,
    setInputError,
    InputColor,
    setInputColor,
    AppoinmentUpdateToggle,
    setAppoinmentUpdateToggle,
    // 11]Feedback states
    FeedbackInputDesign,
    setFeedbackInputDesign,
    FeedbackLabelColor,
    setFeedbackLabelColor,
    FeedbackInputBorderColor,
    setFeedbackInputBorderColor,
    FeedbackInputBorderOnFocus,
    setFeedbackInputBorderOnFocus,
    FeedbackPlaceholderColor,
    setFeedbackPlaceholderColor,
    FeedbackInputError,
    setFeedbackInputError,
    FeedbackInputColor,
    setFeedbackInputColor,
    FeedbackUpdateToggle,
    setFeedbackUpdateToggle,
  } = useContext(AppContext);
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
  let AppoinmentRef = useRef(null);
  let scrollToSection = (elementRef) => {
    console.log(elementRef);
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
  let [ServiceData, setServiceData] = useState([]);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
  let [SocialMediaData, setSocialMediaData] = useState([]);
  let [BussinessHourData, setBussinessHourData] = useState([]);
  let [GoogleMapData, setGoogleMapData] = useState([]);
  let [PopUpBannerData, setPopUpBannerData] = useState([]);
  let [ManageContentData, setManageContent] = useState([]);

  // Styles States

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

  async function fetchAllData() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/vcard/allDataAPI/${URL_Alies}`)
        .then((res) => {
          console.log(res.data);
          setAboutData(res.data.data.AboutDetails);
          setBankData(res.data.data.BankDetails);
          setUPIData(res.data.data.UPIDetails);
          setVideoData(res.data.data.VideoDetails);
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
          setVcardPreviewLoader(false);
        })
        .catch((error) => {
          setVcardPreviewLoader(false);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setVcardPreviewLoader(false);
    } finally {
      setVcardPreviewLoader(false);
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
  let [isHovered, setIsHovered] = useState(false);
  let [BtnisHovered, setBtnIsHovered] = useState(false);
  let [VcardPreviewLoader, setVcardPreviewLoader] = useState(false);
  // Fetch Vcard Theme
  async function handleVcardThemeFetch() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/vcard_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardThemeUpdateToggle(false);
          } else {
            setVCardColour(res.data.data[0].VCardColour);
            setVCardTextColour(res.data.data[0].VCardTextColour);
            setSVG_Design(res.data.data[0].SVG_Design);
            setVcardThemeUpdateToggle(true);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setVcardThemeUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setVcardThemeUpdateToggle(false);
    }
  }
  // Fetch Logo Banner Theme
  async function handleImageThemeFetch() {
    setVcardPreviewLoader(true);

    try {
      await api
        .get(`/image_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setImageThemeUpdateToggle(false);
          } else {
            setBannerHeight(res.data.data[0].BannerHeight);
            setBannerBrightness(res.data.data[0].BannerBrightness);
            setLogoWidth(res.data.data[0].LogoWidth);
            setLogoWidthUnit(res.data.data[0].LogoWidthUnit);
            setLogoHeight(res.data.data[0].LogoHeight);
            setLogoHeightUnit(res.data.data[0].LogoHeightUnit);
            setLogoBorderRadius(res.data.data[0].LogoBorderRadius);
            setLogoBorderRadiusUnit(res.data.data[0].LogoBorderRadiusUnit);
            setLogoPosition(res.data.data[0].LogoPosition);
            setLogoTopPosition(res.data.data[0].LogoTopPosition);
            setLogoLeftPosition(res.data.data[0].LogoLeftPosition);
            setLogoPositionUnit(res.data.data[0].LogoPositionUnit);

            setImageThemeUpdateToggle(true);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setImageThemeUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setImageThemeUpdateToggle(false);
    } finally {
      setVcardPreviewLoader(false);
    }
  }
  // Fetch Button Theme
  async function handleButtonThemeFetch() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/button_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setButtonThemeUpdateToggle(false);
          } else {
            setBtnBackColour(res.data.data[0].BtnBackColour);
            setBtnTextColour(res.data.data[0].BtnTextColour);
            setBtnHoverColour(res.data.data[0].BtnHoverColour);
            setBtnHoverTextColour(res.data.data[0].BtnHoverTextColour);
            setContactBtnBorderRadius(res.data.data[0].ContactBtnBorderRadius);
            setContactBtnUnit(res.data.data[0].ContactBtnUnit);
            setIconBorderRadius(res.data.data[0].IconBorderRadius);
            setIconUnit(res.data.data[0].IconUnit);
            setUserDataPosition(res.data.data[0].UserDataPosition);
            setButtonThemeUpdateToggle(true);
            setVcardPreviewLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setButtonThemeUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setButtonThemeUpdateToggle(false);
    }
  }
  // Fetch Title Theme
  async function handleTitleThemeFetch() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/title_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setTitleThemeUpdateToggle(false);
          } else {
            setTitleColor(res.data.data[0].TitleColor);
            setTitleSize(res.data.data[0].TitleSize);
            setTitleUnit(res.data.data[0].TitleUnit);
            setTitleFontWeight(res.data.data[0].TitleFontWeight);
            setTitleFont(res.data.data[0].TitleFont);
            setTitlePosition(res.data.data[0].TitlePosition);

            setSubTitleColor(res.data.data[0].SubTitleColor);
            setSubTitleSize(res.data.data[0].SubTitleSize);
            setSubTitleUnit(res.data.data[0].SubTitleUnit);
            setSubTitleFontWeight(res.data.data[0].SubTitleFontWeight);
            setSubTitleFont(res.data.data[0].SubTitleFont);
            setSubTitlePosition(res.data.data[0].SubTitlePosition);
            setTitleThemeUpdateToggle(true);
            setVcardPreviewLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setTitleThemeUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setTitleThemeUpdateToggle(false);
    }
  }
  // Fetch Service Theme
  async function handleServiceThemeFetch() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/service_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setServiceThemeUpdateToggle(false);
          } else {
            setServiceBackColor(res.data.data[0].ServiceBackColor);
            setServiceTextColor(res.data.data[0].ServiceTextColor);
            setServiceTitleColor(res.data.data[0].ServiceTitleColor);
            setServiceTitleFont(res.data.data[0].ServiceTitleFont);
            setServiceTitleSize(res.data.data[0].ServiceTitleSize);
            setServiceTitleUnit(res.data.data[0].ServiceTitleUnit);
            setServiceFontWeight(res.data.data[0].ServiceFontWeight);
            setServiceTitleAlign(res.data.data[0].ServiceTitleAlign);
            setBtnBackColor(res.data.data[0].BtnBackColor);
            setBtnTextColor(res.data.data[0].BtnTextColor);
            setBtnHoverBackColor(res.data.data[0].BtnHoverBackColor);
            setBtnHoverTextColor(res.data.data[0].BtnHoverTextColor);

            setServiceThemeUpdateToggle(true);
            setVcardPreviewLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setServiceThemeUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setServiceThemeUpdateToggle(false);
    }
  }
  //Fetch Product Theme
  async function handleProductThemeFetch() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/product_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setProductThemeUpdateToggle(false);
          } else {
            setProductBackColor(res.data.data[0].ProductBackColor);
            setProductTextColor(res.data.data[0].ProductTextColor);
            setProductTitleColor(res.data.data[0].ProductTitleColor);
            setProductTitleFont(res.data.data[0].ProductTitleFont);
            setProductTitleSize(res.data.data[0].ProductTitleSize);
            setProductTitleUnit(res.data.data[0].ProductTitleUnit);
            setProductFontWeight(res.data.data[0].ProductFontWeight);
            setProductTitleAlign(res.data.data[0].ProductTitleAlign);
            setProductBtnBackColor(res.data.data[0].ProductBtnBackColor);
            setProductBtnTextColor(res.data.data[0].ProductBtnTextColor);
            setProductBtnHoverBackColor(
              res.data.data[0].ProductBtnHoverBackColor
            );
            setProductBtnHoverTextColor(
              res.data.data[0].ProductBtnHoverTextColor
            );

            setProductThemeUpdateToggle(true);
            setVcardPreviewLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setProductThemeUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setProductThemeUpdateToggle(false);
    }
  }
  // Fetch Timer Theme
  async function handleTimerThemeFetch() {
    setTimerUpdateToggle(true);
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/timer_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setTimerUpdateToggle(false);
          } else {
            setTimerBackColour(res.data.data[0].TimerBackColour);
            setTimerTitleColor(res.data.data[0].TimerTitleColor);
            setTimerSubTitleColor(res.data.data[0].TimerSubTitleColor);
            setTimerTextColour(res.data.data[0].TimerTextColour);
            setTimerBoxBorderRadius(res.data.data[0].TimerBoxBorderRadius);

            setTimerUpdateToggle(true);
            setVcardPreviewLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setTimerUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setTimerUpdateToggle(false);
    }
  }
  //Fetch Testimonial:
  async function handleTestimonialThemeFetch() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/testimonial_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setTestimonialUpdateToggle(false);
          } else {
            setTestimonialBackColor(res.data.data[0].TestimonialBackColor);
            setTestimonialTextColor(res.data.data[0].TestimonialTextColor);
            setTestimonialTitleColor(res.data.data[0].TestimonialTitleColor);
            setTestimonialClientNameColor(
              res.data.data[0].TestimonialClientNameColor
            );
            setTestimonialBorderRadius(
              res.data.data[0].TestimonialBorderRadius
            );
            setTestimonialImageBorderRadius(
              res.data.data[0].TestimonialImageBorderRadius[0]
            );
            setFlexDirection(res.data.data[0].FlexDirection);
            setUserDataFlexDirection(res.data.data[0].UserDataFlexDirection);
            setUserDataJustifyContent(res.data.data[0].UserDataJustifyContent);
            setUserDataAlignItems(res.data.data[0].UserDataAlignItems);

            setTestimonialUpdateToggle(true);
            setVcardPreviewLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setTestimonialUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setTestimonialUpdateToggle(false);
    }
  }
  //Fetch Appoinment:
  async function handleAppoinmentThemeFetch() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/appoinment_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setAppoinmentUpdateToggle(false);
          } else {
            setAppoinmentInputDesign(res.data.data[0].AppoinmentInputDesign);
            setLabelColor(res.data.data[0].LabelColor);
            setInputBorderColor(res.data.data[0].InputBorderColor);
            setInputBorderOnFocus(res.data.data[0].InputBorderOnFocus);
            setPlaceholderColor(res.data.data[0].PlaceholderColor);
            setInputColor(res.data.data[0].InputColor);
            setInputError(res.data.data[0].InputError);

            setAppoinmentUpdateToggle(true);
            setVcardPreviewLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setAppoinmentUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setAppoinmentUpdateToggle(false);
    }
  }
  useEffect(() => {
    fetchAllData();
    setTimeout(() => {
      handleVcardThemeFetch();
      handleImageThemeFetch();
      handleButtonThemeFetch();
      handleTitleThemeFetch();
      handleServiceThemeFetch();
      handleProductThemeFetch();
      handleTimerThemeFetch();
      handleTestimonialThemeFetch();
      handleAppoinmentThemeFetch();
    }, 5000);
  }, []);

  return (
    <>
      {!VcardPreviewLoader ? (
        <>
          <style>
            {`
  .Dynamic_Vcard_container{
  
  color:${VCardTextColour} !important;
  
  
  .Dynamiv_vcard_Title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${TitlePosition};
    position: relative;
  
  
    h3 {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: ${TitlePosition};
      gap: 10px;
      font-family: ${TitleFont};
      font-optical-sizing: auto;
      font-weight: ${TitleFontWeight};
      font-style: normal;
  
      font-size: ${TitleSize}${TitleUnit};
      color: ${TitleColor};
      position: relative;
  
      &::first-letter {
        font-size: 1.7rem !important;
        color: $second_back__color !important;
      }
    }
  }
  
    
  
  
  
   .Dynamic_Vcard_box{
  background-color:${VCardColour};
  color:${VCardTextColour} !important;
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
      position:relative;

      
  
  
  
      
  
     .Image_row_1 {
        width: 100%;
        max-height: auto;
        height: auto;
        position: relative;
      
        .banner_image {
          width: 100%;
           height: ${BannerHeight[0]}px;
          max-height: ${BannerHeight[0]}px;
          overflow: hidden;
          object-fit: cover;
          object-position: center;
  
          img {
            filter: brightness(${BannerBrightness}%);
          height: ${BannerHeight[0]}px;
          max-height: ${BannerHeight[0]}px;
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
            background: linear-gradient(#cd62e200 0%, ${VCardColour} 100%);
          }
        }
        .user_logo {
        width:100%;
             position: ${LogoPosition};
          top: ${LogoTopPosition}${LogoPositionUnit};
          left: ${LogoLeftPosition}${LogoPositionUnit};
          transform: translate(-${LogoLeftPosition}${LogoPositionUnit}, -${LogoTopPosition}${LogoPositionUnit});
        
         
          display: flex;
          align-items: center;
          justify-content: center;
            z-index: 2;
  
  
          img {
           
            width: ${LogoWidth}${LogoWidthUnit};
            height: ${LogoHeight}${LogoHeightUnit};
            border-radius: ${LogoBorderRadius}${LogoBorderRadiusUnit};
       
            object-fit: cover; /* Ensures image covers the area */
            object-position: top; /* Ensures head portion is not cropped */
            border: 2px solid ${VCardTextColour};
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
          }
          .svg_image {
                   position: absolute;
          bottom: ${LogoPosition == "absolute" ? "-4%" : "14%"};
          left: 0%;
          right: 0%;
          width: 100%;
          z-index: 1;
        
  
         
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
              align-items: ${UserDataPosition};
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
              justify-content: ${UserDataPosition};
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
                   background-color: ${BtnBackColour};
                color: ${BtnTextColour};
                border-radius: ${ContactBtnBorderRadius}${ContactBtnUnit};
                transition: all 0.4s linear;
                .icon {
                  font-size: 1rem;
                }
                small {
                  font-size: 0.7rem;
                  font-weight: 500;
                }
  
                &:hover {
                    background-color: ${BtnHoverColour};
                  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                  color: ${BtnHoverTextColour};
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
           color:${VCardTextColour};
  
  
          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            padding: 5px;
                 border-radius: ${IconBorderRadius}${IconUnit};
            background-color: ${BtnBackColour};
            color: ${BtnTextColour};
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
                     background-color: ${BtnBackColour};
                color: ${BtnTextColour};
                border-radius: ${ContactBtnBorderRadius}${ContactBtnUnit};
            font-weight: 550;
            font-size: 0.8rem;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.4s ease-in-out;
            &:hover {
                background-color: ${BtnHoverColour};
                  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                  color: ${BtnHoverTextColour};
              box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
              transition: all 0.4s ease-in-out;
            }
          }
        }
      }
  
  
  
      .Dynamiv_vcard_Title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  
  
    h3 {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content:${TitlePosition};
      gap: 10px;
      font-family:${TitleFont};
      font-optical-sizing: auto;
      font-weight: ${TitleFontWeight};
      font-style: normal;
  
      font-size: ${TitleSize}${TitleUnit};
      color: ${TitleColor};
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
         justify-content:${SubTitlePosition};
      gap: 10px;
      font-family:${SubTitleFont};
      font-optical-sizing: auto;
      font-weight: ${SubTitleFontWeight};
      font-style: normal;
  
      font-size: ${SubTitleSize}${SubTitleUnit};
          color: ${SubTitleColor};
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
            background-color: ${ServiceBackColor};
            color:${ServiceTextColor};
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
              justify-content: ${ServiceTitleAlign};
  
              h5 {
                font-size: ${ServiceTitleSize}${ServiceTitleUnit};
                font-weight: ${ServiceFontWeight};
                color:${ServiceTitleColor};
                font-family:${ServiceTitleFont};
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
                  color:  ${BtnTextColor};
                  background-color: ${BtnBackColor};
                  padding: 0.5rem 1rem;
                  border: 2px solid $third_text_color;
                  font-size: $root_text_size;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 5px;
  
                  &:hover {
                     color:  ${BtnHoverTextColor};
                  background-color: ${BtnHoverBackColor};
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
         background-color: ${ProductBackColor};
            color:${ProductTextColor};
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
             justify-content: ${ProductTitleAlign};
  
              h5 {
                font-size: ${ProductTitleSize}${ProductTitleUnit};
                font-weight: ${ProductFontWeight};
                color:${ProductTitleColor};
                font-family:${ProductTitleFont};
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
                   color:${ProductTextColor} !important;
      
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
                  color:  ${ProductBtnTextColor};
                  background-color: ${ProductBtnBackColor};
                  padding: 0.5rem 1rem;
                  border: 2px solid $third_text_color;
                  font-size: $root_text_size;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 5px;
  
                  &:hover {
                       color:  ${ProductBtnHoverTextColor};
                  background-color: ${ProductBtnHoverBackColor};
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
                   color: ${BtnBackColour};
  
                &:hover {
               color: ${BtnHoverColour};
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
              .icon {
                font-size: 1.2rem;
                cursor: pointer;
                color: ${BtnBackColour};
  
                &:hover {
                  color: ${BtnHoverColour};
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
            color: ${VCardTextColour};
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
                    gap: 15px;
                    width: 100%;
          
                
                    .form_group{
  
                      input{
                        background-color: transparent;
                        border:${InputBorderColor};
                        color:${InputColor};
  
                          &::placeholder{
                        color:${PlaceholderColor};
                        font-size:0.7rem;
                        }
                      }
                        label{
                        font-size:0.8rem !important;
                        }
            .labelError {
                color: ${InputError} !important;
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
                         
                            color:${InputColor};
                      }
                      select{
                        width: 100%;
                        background-color: transparent;
                         outline:none;
                    
                            color:${InputColor};
  
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
                        border: 1px solid ${InputBorderColor};
                        border-radius: 0.3rem;
                        font-size: 0.9rem;
                        letter-spacing: 1px;
  
                      &::placeholder{
                        color:${PlaceholderColor};
                        font-size:0.7rem;
                        }
                        &:focus {
                          border: 1px solid ${InputBorderOnFocus};
                        }
                        &:focus + .icon {
                          color: ${InputBorderOnFocus}; // Change icon color when input is focused
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
          
                        color: ${InputBorderColor};
                      }
                      .iconwithlabel {
                        position: absolute;
                        top: 55%;
                        left: 2%;
          
                        font-size: 1.3rem;
           color: ${InputBorderColor};
                      }
                      .iconwithanimation {
                          position: absolute;
                          top: 55%;
                          left: 2%;
            
                          font-size: 1.3rem;
            
                          color: ${InputBorderColor};
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
                        border-bottom: 1px solid ${InputBorderColor};
                        position: relative;
                        font-size: 0.9rem;
                        letter-spacing: 1px;
          
                        &:focus {
                          border-bottom: 1px solid ${InputBorderOnFocus};
                        }
                        &:focus + .icon {
                          color: ${InputBorderOnFocus}; // Change icon color when input is focused
                        }
                      }
          
                   
                      label {
                        font-size: 0.9rem;
                        font-weight: 500;
                        color: ${LabelColor};
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
          
                        color: ${InputBorderColor};
                      }
                      .iconwithlabel {
                        position: absolute;
                        top: 55%;
                        left: 2%;
          
                        font-size: 1.3rem;
          
                         color: ${InputBorderColor};
                      }
                      .iconwithanimation {
                          position: absolute;
                          top: 55%;
                          left: 2%;
            
                          font-size: 1.3rem;
            
                         color: ${InputBorderColor};
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
                        border: 1px solid ${InputBorderColor};
                        border-radius: 0.3rem;
                        font-size: 0.9rem;
                        letter-spacing: 1px;
          
                        &:focus {
                          border: 1px solid ${InputBorderOnFocus};
                        }
                        &:focus + .icon {
                          color: ${InputBorderOnFocus}; 
                        }
                        &:focus + .iconwithlabel {
                          color: ${InputBorderOnFocus};
                        }
                      }
          
                   
                      label {
                        font-size: 0.9rem;
                        font-weight: 500;
                        color: ${LabelColor};
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
          
                        color: ${InputBorderColor};
                      }
                      .icon {
                          position: absolute;
                          top: 55%;
                          left: 2%;
            
                          font-size: 1.3rem;
            
                          color: ${InputBorderColor};
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
                        border-bottom: 1px solid ${InputBorderColor};
                        position: relative;
                        font-size: 0.9rem;
                        letter-spacing: 1px;
          
                        &:focus {
                          border-bottom: 1px solid ${InputBorderOnFocus};
                        }
                        &:focus + .icon {
                          color: ${InputBorderOnFocus};
                        }
                        &:focus + .icon {
                          color: ${InputBorderOnFocus}; 
                        }
                      }
          
                   
                      label {
                        font-size: 0.9rem;
                        font-weight: 500;
                        color: ${LabelColor};
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
            
                        color: ${InputBorderColor};
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
                        border: 1px solid ${InputBorderColor};
                        border-radius: 0.3rem;
                        font-size: 0.9rem;
                        letter-spacing: 1px;
                        box-shadow: none;
                        transition: box-shadow 0.3s ease;
          
                        &:focus {
                          box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
                        }
                       
                        &:focus + .icon {
                          color: ${InputBorderOnFocus};
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
          
                        color: ${InputBorderColor};
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
                        border-bottom: 1px solid ${InputBorderColor};
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
                          border-bottom: 1px solid ${InputBorderOnFocus};
                        }
                        &:focus + .icon {
                          color: ${InputBorderOnFocus}; 
                        }
                        &:focus + .icon {
                          color: ${InputBorderOnFocus};
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
            
                           color: ${InputBorderColor};
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
                        border: 1px solid ${InputBorderColor};
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
                          color: ${InputBorderOnFocus};
                        }
                        &:focus + .icon {
                          color: ${InputBorderOnFocus}; 
                        }
                      }
          
                   
                      label {
                        font-size: 0.9rem;
                        font-weight: 500;
                        color: ${LabelColor};
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
            
                                    color: ${InputBorderColor};
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
                        border-bottom: 1px solid ${InputBorderColor};
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
                          border-bottom: 1px solid ${InputBorderOnFocus};
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
                          color: ${InputBorderOnFocus}; // Change icon color when input is focused
                        }
                        &:focus + .iconwithlabel {
                           color: ${InputBorderOnFocus};  // Change icon color when input is focused
                        }
                      }
          
                   
                      label {
                        font-size: 0.9rem;
                        font-weight: 500;
                        color: ${InputBorderColor};
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
          
                          color: ${InputBorderColor};
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
                        border: 1px solid ${InputBorderColor};
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
                            color: ${InputBorderOnFocus}; // Change icon color when input is focused
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
          
                        color: ${InputBorderColor};
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
                        background-color: rgb(122, 122, 122);
                        color: #f5f5f5;
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
                          background-color: #7e7e7e;
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
            background-color: ${TimerBackColour};
            width: 100%;
            height: 80px;
            max-height: 80px;
            min-height: 80px;
            border-radius: ${TimerBoxBorderRadius}px;
  
            .day {
              // display: block;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
  
              span {
                font-size: 0.7rem;
                font-weight: 550;
                color: ${TimerTitleColor};
  
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
                  color: ${TimerSubTitleColor};
                
                }
                span {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 0.6rem;
                  color: ${TimerTextColour};
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
                   color: ${TimerSubTitleColor};
                }
                span {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                    color: ${TimerTextColour};
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
            
            background-color:${TestimonialBackColor};
            color:${TestimonialTextColor};
            overflow-y: auto;
            margin: auto;
            display: flex;
            flex-direction: ${FlexDirection};
            align-items: center;
            justify-content: flex-start;
                border-radius: ${TestimonialBorderRadius}px;
                border-top-left-radius:${[
                  TestimonialBorderRadius.includes(",")
                    ? TestimonialBorderRadius.split(",")[0]
                    : "",
                ]}px ;
                  border-bottom-left-radius:${[
                    TestimonialBorderRadius.includes(",")
                      ? TestimonialBorderRadius.split(",")[1]
                      : "",
                  ]}px ;
                            border-top-right-radius:${[
                              TestimonialBorderRadius.includes(",")
                                ? TestimonialBorderRadius?.split(",")[2]
                                : "",
                            ]}px ;
                                    border-bottom-right-radius:${[
                                      TestimonialBorderRadius.includes(",")
                                        ? TestimonialBorderRadius?.split(",")[3]
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
         min-height: 100%
  
              .feedback_title{
                h4 {
                  font-size: 0.9rem;
                  font-weight: 550;
                  color: ${TestimonialTitleColor} !important;
                }
              }
              .feedback_message{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
           color:${TestimonialTextColor};
                small {
                  width: 100%;
                  font-size: 0.8rem;
                  
                  font-weight: 500;
                  overflow-y: scroll;
                  text-align: start !important;
         color:${TestimonialTextColor} !important;
                  &::-webkit-scrollbar {
                    display: none;
                  }
                }
              }
  
          
  
           
            }
            .user_detail {
              display: flex;
              align-items: ${UserDataAlignItems};
              flex-direction:  ${UserDataFlexDirection};
              width: 100%;
              height: 100%;
               min-height: 100%;
              flex: 0.3;
              justify-content: ${UserDataJustifyContent};
              gap: 10px;
  
              // background-color: $first_btn_back_color;
              border-bottom-left-radius: 6rem;
              border-top-left-radius: 6rem;
  
              img {
                width: 60px;
                height: 60px;
                border-radius: ${TestimonialImageBorderRadius}px;
                border-top-left-radius:${[
                  TestimonialImageBorderRadius.includes(",")
                    ? TestimonialImageBorderRadius.split(",")[0]
                    : "",
                ]}px ;
                  border-bottom-left-radius:${[
                    TestimonialImageBorderRadius.includes(",")
                      ? TestimonialImageBorderRadius.split(",")[1]
                      : "",
                  ]}px ;
                            border-top-right-radius:${[
                              TestimonialImageBorderRadius.includes(",")
                                ? TestimonialImageBorderRadius?.split(",")[2]
                                : "",
                            ]}px ;
                                    border-bottom-right-radius:${[
                                      TestimonialImageBorderRadius.includes(",")
                                        ? TestimonialImageBorderRadius?.split(
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
                  color: ${TestimonialClientNameColor};
                  font-weight: 550;
                }
                small {
                 color:${TestimonialTextColor};
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
  
  
  
  
      
        }
  
  
  
  }
  
  
  
          
   
  
  
        
          `}
          </style>
          {VCard_URL_Data.length > 0 ? (
            <div className="Dynamic_Vcard_container">
              {/* Gallery Full IMAGE */}
              <div
                className="full_image"
                id="fullImageBox"
                style={{ position: "absolute", top: scrollY }}
              >
                <div className="close_Full_Image_gallery">
                  <RiCloseLargeLine className="icon" onClick={closeFullImage} />
                </div>
                <img src={banner} alt="gallery" id="fullImage" />
              </div>
              {/* Menu Navbar */}
              {/* {VCard_URL_Data.length > 0 ? (
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
                          scrollToSection(LocationRef),
                            setActiveMenu("Location");
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
                          scrollToSection(FeedbackRef),
                            setActiveMenu("Feedback");
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
                    <CiSquareChevDown
                      onClick={HandleMenuDown}
                      className="down"
                    />
                  </div>
                </div>
              ) : (
                ""
              )} */}

              <div className="Dynamic_Vcard_box">
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
                          scrollToSection(LocationRef),
                            setActiveMenu("Location");
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
                          scrollToSection(FeedbackRef),
                            setActiveMenu("Feedback");
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
                    <CiSquareChevDown
                      onClick={HandleMenuDown}
                      className="down"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
                {/* VcardUrl and logo */}
                {VCard_URL_Data.map((data, index) => {
                  return (
                    <div className="Image_row_1" ref={HomeRef} key={index}>
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
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="svg_image">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1440 320"
                        >
                          <path
                            fill={VCardColour}
                            fill-opacity="1"
                            d={
                              SVG_Design != "" || SVG_Design.length != 0
                                ? SVG_Design.split("=")[5].split('"')[1]
                                : ""
                            }
                          ></path>
                        </svg>
                      </div>
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
                                  }?text=${encodeURIComponent(
                                    `Hi ${data.user}`
                                  )}`}
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
                                  href={`mailto:${
                                    data.Email ? data.Email : "#"
                                  }`}
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
                      return (
                        <div className="about_row_4" ref={AboutRef} key={index}>
                          <div className="Dynamiv_vcard_Title">
                            <h3>About Us</h3>
                          </div>

                          <div className="about_details">
                            <div className="detail">
                              <div className="detail_title">
                                <h5>Company Name</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{data.CompanyName || " "}</p>
                              </div>
                            </div>
                            <div className="detail">
                              <div className="detail_title">
                                <h5>Category</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{data.Category || ""}</p>
                              </div>
                            </div>
                            <div className="detail">
                              <div className="detail_title">
                                <h5>Year of Est..</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{data.Year || " "}</p>
                              </div>
                            </div>

                            <div className="detail">
                              <div className="detail_title">
                                <h5>Nature Of Business</h5>
                              </div>
                              <div className="detail_message">
                                <strong>:</strong>
                                <p>{data.Bussiness}</p>
                              </div>
                            </div>
                            {SocialMediaData.length > 0 ? (
                              <>
                                <div className="detail">
                                  <div className="detail_title">
                                    <h5>SocialMedia's</h5>
                                  </div>
                                  <div className="detail_message">
                                    <strong>:</strong>
                                    {/* SocialMedia */}
                                    {SocialMediaData.map((data, index) => {
                                      return (
                                        <div
                                          className="social_medias"
                                          key={index}
                                        >
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
                              <HtmlRenderer
                                htmlString={data.Specialities || ""}
                              />
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
                {ServiceData.length > 0 &&
                ManageContentData[0].Service == true ? (
                  <>
                    <div className="our_services" ref={ServiceRef}>
                      <div className="Dynamiv_vcard_Title">
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
                                <p>
                                  <HtmlRenderer
                                    htmlString={data.ServiceDescription}
                                  />
                                </p>
                              </div>
                              {data.ServiceURL != "" ? (
                                <div className="service_link">
                                  <a
                                    href={
                                      data.ServiceURL ? data.ServiceURL : ""
                                    }
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
                                    <HtmlRenderer
                                      htmlString={data.ServiceIcon}
                                    />
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
                {ProductData.length > 0 &&
                ManageContentData[0].Product == true ? (
                  <>
                    <div className="our_products" ref={ProductRef}>
                      <div className="Dynamiv_vcard_Title">
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
                      <div className="Dynamiv_vcard_Title">
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
                                    <RiFileCopyLine className="icon" />
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
                                      <RiFileCopyLine className="icon" />
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
                                    <RiFileCopyLine className="icon" />
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
                                    <h5>Account Type</h5>
                                  </div>
                                  <div className="detail_message">
                                    <strong>:</strong>
                                    <p>{data.AccountType}</p>
                                  </div>
                                </div>
                                <div className="detail">
                                  <div className="detail_title">
                                    <h5>IFSC code</h5>
                                  </div>
                                  <div className="detail_message">
                                    <strong>:</strong>
                                    <p>{data.IFSCCode}</p>
                                    <RiFileCopyLine className="icon" />
                                  </div>
                                </div>
                                <div className="detail">
                                  <div className="detail_title">
                                    <h5>Account Number</h5>
                                  </div>
                                  <div className="detail_message">
                                    <strong>:</strong>
                                    <p>{data.AccountNumber}</p>
                                    <RiFileCopyLine className="icon" />
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
                {GalleryData.length > 0 &&
                ManageContentData[0].Gallery == true ? (
                  <>
                    <div className="gallery" ref={GalleryRef}>
                      <div className="Dynamiv_vcard_Title">
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
                      <div className="Dynamiv_vcard_Title">
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
                    <div className="Appoinment" ref={AppoinmentRef}>
                      <div className="Dynamiv_vcard_Title">
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
                            className={`form_group ${AppoinmentInputDesign}`}
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
                              className={`${AppoinmentInputDesign}
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
                            className={`form_group ${AppoinmentInputDesign}`}
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
                              className={`${AppoinmentInputDesign}
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
                            className={`form_group ${AppoinmentInputDesign}`}
                          >
                            <label
                              htmlFor="Date"
                              className={
                                Appoinment_formik.errors.Date
                                  ? "labelError"
                                  : ""
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
                              className={` date-input ${AppoinmentInputDesign}
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
                            className={`form_group ${AppoinmentInputDesign}`}
                          >
                            <label
                              htmlFor="Time"
                              className={
                                Appoinment_formik.errors.Time
                                  ? "labelError"
                                  : ""
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
                              className={` date-input ${AppoinmentInputDesign}
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
                  </>
                ) : (
                  ""
                )}
                {/* Opentime */}
                {BussinessHourData.length > 0 &&
                ManageContentData[0].BussinessHour == true ? (
                  <>
                    <div className="time_container" ref={TimeRef}>
                      <div className="Dynamiv_vcard_Title">
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
                                <span>
                                  {BussinessHourData[0].Monday.from}AM
                                </span>
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
                                  <span>
                                    {BussinessHourData[0].Tuesday.from}AM
                                  </span>
                                </div>
                                <div className="end">
                                  <h6>Close Time</h6>
                                  <span>
                                    {BussinessHourData[0].Tuesday.to}PM
                                  </span>
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
                                  <span>
                                    {BussinessHourData[0].Wednesday.to}PM
                                  </span>
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
                                <span>
                                  {BussinessHourData[0].Thursday.from}AM
                                </span>
                              </div>
                              <div className="end">
                                <h6>Close Time</h6>
                                <span>
                                  {BussinessHourData[0].Thursday.to}PM
                                </span>
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
                                  <span>
                                    {BussinessHourData[0].Friday.from}AM
                                  </span>
                                </div>
                                <div className="end">
                                  <h6>Close Time</h6>
                                  <span>
                                    {BussinessHourData[0].Friday.to}PM
                                  </span>
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
                                  <span>
                                    {BussinessHourData[0].Saturday.to}PM
                                  </span>
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
                      <div className="Dynamiv_vcard_Title">
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
                      <div className="Dynamiv_vcard_Title">
                        <h3>Live Location</h3>
                        {/* Contact */}
                      </div>

                      <div className="google_map">
                        <HtmlRenderer
                          htmlString={GoogleMapData[0].GoogleIframe}
                        />
                      </div>
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
                    <div className="feedback_row" ref={FeedbackRef}>
                      <div className="Dynamiv_vcard_Title">
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
                          <div className="form_group">
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
                              // value={userName}
                              // onChange={(e)=>setUserName(e.target.value)}
                              value={feedbackFormik.values.ClientName}
                              onChange={feedbackFormik.handleChange}
                              onBlur={feedbackFormik.handleBlur}
                            />
                          </div>
                          <div className="form_group">
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
                              // value={userFeedback}
                              // onChange={(e)=>setUserFeedback(e.target.value)}
                              value={feedbackFormik.values.ClientFeedback}
                              onChange={feedbackFormik.handleChange}
                              onBlur={feedbackFormik.handleBlur}
                            ></textarea>
                          </div>
                          <div className="form_group">
                            <label
                              htmlFor="clientName_Input"
                              className={`${
                                feedbackFormik.errors.ClientRatting
                                  ? "error"
                                  : ""
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
                              style={{ paddingRight: "15px" }}
                              half={false}
                              color2={"#ffd700"}
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
                    <div className="Inquries" ref={InquiryRef}>
                      <div className="Dynamiv_vcard_Title">
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
                          <div className="form_group">
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
                                className={
                                  formik.errors.Name && formik.touched.Name
                                    ? "input_error"
                                    : "input_success"
                                }
                              />
                              <i className="bx bxs-user-pin"></i>
                            </div>
                          </div>
                          <div className="form_group">
                            <label
                              htmlFor="name"
                              className={
                                formik.errors.Email ? "labelError" : ""
                              }
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
                                className={
                                  formik.errors.Email && formik.touched.Email
                                    ? "input_error"
                                    : "input_success"
                                }
                              />
                              <i className="bx bxs-envelope"></i>
                            </div>
                          </div>
                          <div className="form_group">
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
                                className={
                                  formik.errors.MobileNumber &&
                                  formik.touched.MobileNumber
                                    ? "input_error"
                                    : "input_success"
                                }
                              />
                              <i className="bx bxs-phone-call"></i>
                            </div>
                          </div>
                          <div className="form_group">
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
                                className={
                                  formik.errors.Message &&
                                  formik.touched.Message
                                    ? "input_error"
                                    : "input_success"
                                }
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
                  </>
                ) : (
                  ""
                )}
                {/* Footer */}
                <div className="Footer">
                  <div className="footer_container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                    >
                      <path
                        fill={style.$second_back__color}
                        fillOpacity="1"
                        d="M0,96L24,90.7C48,85,96,75,144,58.7C192,43,240,21,288,48C336,75,384,149,432,176C480,203,528,181,576,170.7C624,160,672,160,720,154.7C768,149,816,139,864,117.3C912,96,960,64,1008,48C1056,32,1104,32,1152,53.3C1200,75,1248,117,1296,138.7C1344,160,1392,160,1416,160L1440,160L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
                      ></path>
                    </svg>
                    <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <URLNotFound />
          )}
        </>
      ) : (
        <div className="vcard_preview_loader">
          <span class="preview_loader"></span>
        </div>
      )}
    </>
  );
};

export default Dynamic_VCard_PREVIEW;
