import React, { useContext, useEffect, useRef, useState } from "react";
import "./DynamicVcard.scss";

import product1 from "../../../../../assets/AllVCard_Image/Doctor/product_1.png";

//service Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
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
import { Cursor } from "react-simple-typewriter";
// import { filter } from "lodash";
import { translate } from "react-range/lib/utils";
import { color } from "framer-motion";
import { toast } from "react-toastify";
import ReactStars from "react-stars";
import axios from "axios";
import { AppoinmentValidateSchema } from "../../../../Helper/AppoinmentValidate";
import { AppContext } from "../../../../Context/AppContext";
const DynamicVcard = () => {
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
    WebsiteBackgroundType,
    setWebsiteBackgroundType,
    WebsiteBackImageAddress,
    setWebsiteBackImageAddress,
    LinearGradient,
    setLinearGradient,
    DesktopViewBackColor2,
    setDesktopViewBackColor2,
    DesktopViewBackColor,
    setDesktopViewBackColor,
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
    LogoImageAnimation,
    setLogoImageAnimation,
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

    // Inquiry states
    InquiryInputDesign,
    setInquiryInputDesign,
    InquiryLabelColor,
    setInquiryLabelColor,
    InquiryInputBorderColor,
    setInquiryInputBorderColor,
    InquiryInputBorderOnFocus,
    setInquiryInputBorderOnFocus,
    InquiryPlaceholderColor,
    setInquiryPlaceholderColor,
    InquiryInputError,
    setInquiryInputError,
    InquiryInputColor,
    setInquiryInputColor,
    InquiryUpdateToggle,
    setInquiryUpdateToggle,
  } = useContext(AppContext);
  let [isHovered, setIsHovered] = useState(false);
  let [BtnisHovered, setBtnIsHovered] = useState(false);
  let [VcardPreviewLoader, setVcardPreviewLoader] = useState(false);
  let Dynamic_Style = {
    $first_back__color: "gray",
    $second_back__color: "#6b6b6b",
    $third_back__color: "#303030",
    //Root Background
    $root_backgound: "#fcfdc8,#ffffff",
    //Vcard background
    $vcard_back_color: VCardColour,
    $vcard_text_color: VCardTextColour,

    //SVG Wave backgound

    $svg_wave_back_color: VCardColour,
  };

  // Define the inline styles as a JavaScript object
  const styles = {
    link: {
      color: VCardTextColour,
      textDecoration: "none",
      Cursor: "pointer",
    },
    Slide1: {
      height: `${BannerHeight[0]}px`,
      minHeight: `${BannerHeight[0]}px`,
      width: "100%",
      objectFit: "cover",
      objectPostition: "top",

      bannerImg: {
        filter: `brightness(${BannerBrightness}%)`,
        height: `${BannerHeight[0]}px`,
        minHeight: `${BannerHeight[0]}px`,
        width: "100%",
        objectFit: "cover",
        objectPostition: "top",
      },

      logoImg: {
        height: `${LogoHeight}${LogoHeightUnit}`,
        minHeight: `${LogoHeight}${LogoHeightUnit}`,
        width: `${LogoWidth}${LogoWidthUnit}`,
        objectFit: "cover",
        objectPostition: "top",
        position: `${LogoPosition}`,
        top: `${LogoTopPosition}${LogoPositionUnit}`,
        left: `${LogoLeftPosition}${LogoPositionUnit}`,
        transform: `translate(-${LogoLeftPosition}${LogoPositionUnit},-${LogoTopPosition}${LogoPositionUnit})`,
        borderRadius: `${LogoBorderRadius}${LogoBorderRadiusUnit}`,
      },
      // logoPosition: {
      //   top: `${LogoTopPosition}${LogoPositionUnit}`,
      //   left: `${LogoLeftPosition}${LogoPositionUnit}`,
      //   bottom: `${LogoBottomPosition}${LogoPositionUnit}`,
      //   right: `${LogoRightPosition}${LogoPositionUnit}`,
      //   transform: `translate(-${LogoLeftPosition},-${LogoTopPosition})`,
      // },
    },
    ContactBtn: {
      backgroundColor: isHovered ? BtnHoverColour : BtnBackColour,
      color: isHovered ? BtnHoverTextColour : BtnTextColour,
      cursor: "pointer",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      padding: "0.4rem 1rem",
      borderRadius: `${ContactBtnBorderRadius}${ContactBtnUnit}`,
      transition: "all 0.4s linear",
    },
    AddToContactBtn: {
      backgroundColor: BtnisHovered ? BtnHoverColour : BtnBackColour,
      color: BtnisHovered ? BtnHoverTextColour : BtnTextColour,
      cursor: "pointer",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      padding: "0.4rem 1rem",
      borderRadius: "0.2rem",
      transition: "all 0.4s linear",
    },
    Icons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      padding: "5px",
      borderRadius: `${IconBorderRadius}${IconUnit}`,
      backgroundColor: BtnBackColour,
      color: BtnTextColour,
    },
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
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [AllFeedBacks, setAllFeedBacks] = useState([]);

  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  let totalHeight;
  let [scrollY, setScrollY] = useState(0);
  let innerHeight;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      innerHeight = window.innerHeight; // Height of the viewport
      setScrollY(window.scrollY); // Number of pixels scrolled vertically
      totalHeight = innerHeight + scrollY; // Total height scrolled + viewport height
    });
  }, []);

  //Menu actions
  let [activeMenu, setActiveMenu] = useState("Home");
  let HomeRef = useRef(null);
  let ContactRef = useRef(null);
  let AboutRef = useRef(null);
  let ServiceRef = useRef(null);
  let ProductRef = useRef(null);
  let PaymentRef = useRef(null);
  let GalleryRef = useRef(null);
  let VideoRef = useRef(null);
  let AppoinmentRef = useRef(null);
  let TimeRef = useRef(null);
  let TestimonialRef = useRef(null);
  let LocationRef = useRef(null);

  let FeedbackRef = useRef(null);
  let InquiryRef = useRef(null);

  useEffect(() => {
    if (DynamicForm == "Vcard_Theme") {
      HomeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Contact_Icons") {
      ContactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Logo_Banner_Design") {
      HomeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Title_Design") {
      AboutRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Service_Design") {
      ServiceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Product_Design") {
      ProductRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Appoinment_Design") {
      AppoinmentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Gallery_Design") {
      GalleryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Timer_Design") {
      TimeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Testimonial_Design") {
      TestimonialRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Feedback_Design") {
      FeedbackRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Inquiry_Design") {
      InquiryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [DynamicForm]);
  let scrollToSection = (elementRef) => {
    if (DynamicForm == "Vcard_Theme") {
      HomeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (DynamicForm == "Contact_Icons") {
      ContactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function HandleMenuDown() {
    if (activeMenu === "Home" && DynamicForm == "Vcard_Theme") {
      return scrollToSection(AboutRef), setActiveMenu("About");
    }
    if (activeMenu === "Contact" && DynamicForm == "Contact_Icons") {
      return scrollToSection(ContactRef), setActiveMenu("Contact");
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
  useEffect(() => {
    const handleScroll = () => {
      const section1Top = HomeRef.current?.offsetTop || 0;
      const section2Top = AboutRef.current?.offsetTop || 0;
      const section3Top = ServiceRef.current?.offsetTop || 0;
      const section4Top = ProductRef.current?.offsetTop || 0;
      const section5Top = PaymentRef.current?.offsetTop || 0;
      const section6Top = GalleryRef.current?.offsetTop || 0;
      const section7Top = VideoRef.current?.offsetTop || 0;
      const section8Top = AppoinmentRef.current?.offsetTop || 0;
      const section9Top = TimeRef.current?.offsetTop || 0;
      const section10Top = TestimonialRef.current?.offsetTop || 0;
      const section11Top = LocationRef.current?.offsetTop || 0;
      const section12Top = FeedbackRef.current?.offsetTop || 0;
      const section13Top = InquiryRef.current?.offsetTop || 0;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (scrollPosition >= section1Top && scrollPosition < section2Top) {
        setActiveMenu("Home");
      } else if (
        scrollPosition >= section2Top &&
        scrollPosition < section3Top
      ) {
        setActiveMenu("About");
      } else if (
        scrollPosition >= section3Top &&
        scrollPosition < section4Top
      ) {
        setActiveMenu("Service");
      } else if (
        scrollPosition >= section4Top &&
        scrollPosition < section5Top
      ) {
        setActiveMenu("Product");
      } else if (
        scrollPosition >= section5Top &&
        scrollPosition < section6Top
      ) {
        setActiveMenu("Payment");
      } else if (
        scrollPosition >= section6Top &&
        scrollPosition < section7Top
      ) {
        setActiveMenu("Gallery");
      } else if (
        scrollPosition >= section7Top &&
        scrollPosition < section8Top
      ) {
        setActiveMenu("Video");
      } else if (
        scrollPosition >= section8Top &&
        scrollPosition < section9Top
      ) {
        setActiveMenu("Appoinment");
      } else if (
        scrollPosition >= section9Top &&
        scrollPosition < section10Top
      ) {
        setActiveMenu("Time");
      } else if (
        scrollPosition >= section10Top &&
        scrollPosition < section11Top
      ) {
        setActiveMenu("Testimonial");
      } else if (
        scrollPosition >= section11Top &&
        scrollPosition < section12Top
      ) {
        setActiveMenu("Location");
      } else if (
        scrollPosition >= section12Top &&
        scrollPosition < section13Top
      ) {
        setActiveMenu("Feedback");
      } else if (scrollPosition >= section13Top) {
        setActiveMenu("Inquiry");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
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
            setVCardColour(res.data?.data[0]?.VCardColour);
            setVCardTextColour(res.data?.data[0]?.VCardTextColour);
            setWebsiteBackgroundType(res.data?.data[0]?.WebsiteBackgroundType);
            setWebsiteBackImageAddress(
              res.data?.data[0]?.WebsiteBackImageAddress
            );
            setLinearGradient(res.data?.data[0]?.LinearGradient);
            setDesktopViewBackColor(res.data?.data[0]?.DesktopViewBackColor);
            setDesktopViewBackColor2(res.data?.data[0]?.DesktopViewBackColor2);
            setSVG_Design(res.data?.data[0]?.SVG_Design);
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
            setLogoImageAnimation(res.data.data[0].LogoImageAnimation);

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
  //Fetch Feedback:
  async function handleFeedbackThemeFetch() {
    setVcardPreviewLoader(true);
    try {
      await api
        .get(`/feedback_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setVcardPreviewLoader(false);
            setFeedbackUpdateToggle(false);
          } else {
            setFeedbackInputDesign(res.data.data[0].FeedbackInputDesign);
            setFeedbackLabelColor(res.data.data[0].FeedbackLabelColor);
            setFeedbackInputBorderColor(
              res.data.data[0].FeedbackInputBorderColor
            );
            setFeedbackInputBorderOnFocus(
              res.data.data[0].FeedbackInputBorderOnFocus
            );
            setFeedbackPlaceholderColor(
              res.data.data[0].FeedbackPlaceholderColor
            );
            setFeedbackInputColor(res.data.data[0].FeedbackInputColor);
            setFeedbackInputError(res.data.data[0].FeedbackInputError);

            setFeedbackUpdateToggle(true);
            setVcardPreviewLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setVcardPreviewLoader(false);
          setFeedbackUpdateToggle(false);
        });
    } catch (error) {
      // toast.error(error.message);
      setVcardPreviewLoader(false);
      setFeedbackUpdateToggle(false);
    }
  }
  useEffect(() => {
    handleVcardThemeFetch();
    handleImageThemeFetch();
    handleButtonThemeFetch();
    handleTitleThemeFetch();
    handleServiceThemeFetch();
    handleProductThemeFetch();
    handleTimerThemeFetch();
    handleTestimonialThemeFetch();
    handleAppoinmentThemeFetch();
    handleFeedbackThemeFetch();
  }, []);
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

  return (
    <>
      {!VcardPreviewLoader ? (
        <>
          <style>
            /* Add your CSS here */
            {`

  .menu_navbar_box {
    width: 80px;
    height: 100vh;
      background-color:${VCardColour};
  color:${VCardTextColour};
    position: fixed;
    top: 100%;
    right: 0%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
display:none !important;
    .up_btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0.1;
      font-size: 2.5rem;
      font-weight: bold;
          background-color: ${VCardTextColour} !important;
      color: ${BtnBackColour};
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      .icon {
        @media screen and (max-width: 1650px) {
          transform: rotate(-90deg);
          font-size: 1.5rem;
        }
      }
      &:hover {
               color:${VCardColour};
        transition: all 0.3s ease-in-out;
      }
      @media screen and (max-width: 1650px) {
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
      max-height: 80%;
      padding: 0.5rem;
      width: 100%;
      overflow-y: scroll;
      scroll-behavior: smooth;

      .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
        cursor: pointer;

        padding: 5px 10px;

        border-radius: 4px;
        transition: all 0.5s ease-in-out;

        .icon {
          font-size: 1.4rem;
          @media screen and (max-width: 1650px) {
            font-size: 1rem;
          }
        }
        p {
          font-size: 0.8rem;
          font-weight: 550;
          @media screen and (max-width: 1650px) {
            font-size: 0.6rem;
          }
        }
        &:hover {
                color: ${BtnTextColour};
          background-color: ${BtnBackColour};
          transition: all 0.5s ease-in-out;
        }
      }
      .menuActive {
                 color: ${BtnTextColour};
          background-color: ${BtnBackColour};
      }
      &::-webkit-scrollbar {
        display: none;
      }
      @media screen and (max-width: 1650px) {
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
    background-color: ${VCardTextColour} !important;
      color: ${BtnBackColour};
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease-in-out;

      .down {
        @media screen and (max-width: 1650px) {
          transform: rotate(-90deg);
          font-size: 1.5rem;
        }
      }
      &:hover {
           color:${VCardColour};
        transition: all 0.3s ease-in-out;
      }
      @media screen and (max-width: 1650px) {
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

    @media screen and (max-width: 1650px) {
      position: sticky;
      top: 0%;
      left: 0%;
      transform: translate(-0%, -0%);
      z-index: 100;
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 100%;
      height: 50px;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
        rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    }
  }

                .Image_row_1 {
      width: 100%;
      max-height: auto;
      height: auto;
      position: relative;
      z-index: 1;
      display: flex;
  flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .slide_svg {
        position: absolute;
        width: 100%;
        bottom: -6px;

        svg {
          transform: rotate(0deg);
          height: 150px;
        }
    
      }
      .banner_image {
        width: 100%;
        max-height: 300px;
        height: 300px;
        overflow: hidden;
        object-fit: cover;
        object-position: top;
        position:relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        // .overlay {
        //   position: absolute;
        //   bottom: 100%;
        //   left: 0;
        //   width: 100%;
        //   height: 100%;
        //   background: linear-gradient(#cd62e200 0%, ${VCardColour} 100%);
        // }
      }
      .user_logo {
        position: ${LogoPosition};
          top:${LogoTopPosition}${LogoPositionUnit};
        left: ${LogoLeftPosition}${LogoPositionUnit};
        transform:translate(-${LogoLeftPosition}${LogoPositionUnit},-${LogoTopPosition}${LogoPositionUnit});
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        

        img {
            height: ${LogoHeight}${LogoHeightUnit} !important;
        min-height: ${LogoHeight}${LogoHeightUnit} !important;
        width:${LogoWidth}${LogoWidthUnit} !important;
        object-fit: cover;
        object-postition: top;
         border-radius: ${LogoBorderRadius}${LogoBorderRadiusUnit} !important;
     
          
          filter: drop-shadow(0px 4px 5px #ffffff66);
   
      
        }
            .Animation-1 {
            width: 100px;
            height: 100px;
           border-radius: ${LogoBorderRadius}${LogoBorderRadiusUnit};
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
          border-radius: ${LogoBorderRadius}${LogoBorderRadiusUnit};
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
             border-radius: ${LogoBorderRadius}${LogoBorderRadiusUnit};
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
           border-radius: ${LogoBorderRadius}${LogoBorderRadiusUnit};
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
            border-radius: ${LogoBorderRadius}${LogoBorderRadiusUnit};
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
            border-radius: ${LogoBorderRadius}${LogoBorderRadiusUnit};
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
        justify-content: center;
        gap: 0.5rem;

        .user_data {
          // color: #fff;
          display: flex;
          flex-direction: column;
          align-items: ${UserDataPosition};
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
              // color: $first_text_color;
            }

            p {
              font-size: 0.9rem;
              font-weight: 500;
              // color: $first_text_color;
              display: flex;
              align-items: center;
              justify-content: ${UserDataPosition};
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
          // //   Actions
          // .contacts_btns {
          //   display: flex;
          //   align-items: center;
          //   justify-content: center;
          //   gap: 10px;
          //   width: 100%;
          //   flex-wrap: wrap;

          //   a {
          //     text-decoration: none;
          //     display: flex;
          //     align-items: center;
          //     justify-content: center;
          //     gap: 5px;
          //     padding: 0.4rem 1rem;
          //     background-color: $first_btn_back_color;
          //     // color: $first_btn_text_color;
          //     border-radius: 0.2rem;
          //     transition: all 0.4s linear;
          //     .icon {
          //       font-size: 1rem;
          //     }
          //     small {
          //       font-size: 0.7rem;
          //       font-weight: 500;
          //     }

          //     &:hover {
          //       background-color: $second_btn_back_color;
          //       filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
          //       scale: 1.05;
          //       transition: all 0.4s linear;
          //     }
          //   }
          // }

          @media screen and (max-width: 600px) {
            align-items: flex-start;
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
                color:${BtnHoverTextColour};
                filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));
                scale: 1.05;
                transition: all 0.4s linear;
              }
            }
          }
      .Preview_Title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${TitlePosition};
  position: relative;
  // margin-bottom: 1rem;

  h3 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${TitlePosition};
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
  .DOCTOR_SUB_TITLE_PREVIEW {
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
    justify-content: ${SubTitlePosition};
    gap: 10px;
font-family:${SubTitleFont};
    font-weight: ${SubTitleFontWeight};

    font-size: ${SubTitleSize}${SubTitleUnit} !important;
    color: ${SubTitleColor};
    position: relative;
  }

  
}
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
          border-radius: 3px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.253);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;
          color:${ServiceTextColor} !important;

          .service_title {
            display: flex;
            align-items: center;
            justify-content: ${ServiceTitleAlign};
            width:100%;

            h5 {
              font-size: ${ServiceTitleSize}${ServiceTitleUnit};
              font-weight: ${ServiceFontWeight};
              font-family:${ServiceTitleFont};
              color: ${ServiceTitleColor};
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
          color:${ServiceTextColor} !important;
          }
          .service_link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            a {
              text-decoration: none;
              // color: $link_text_color;
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
                color: ${BtnTextColor};
                background-color: ${BtnBackColor};
                padding: 0.5rem 1rem;
                // border: 2px solid $third_text_color;
                font-size: $root_text_size;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;

                &:hover {
                  background-color: ${BtnHoverBackColor};
                  color:${BtnHoverTextColor};
                }
              }
            }
          }
        }
      }
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
          border-radius: 3px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;
          color:${ProductTextColor};

          .product_title {
            display: flex;
            align-items: center;
            width:100%;
            justify-content: ${ProductTitleAlign};

            h5 {
              font-size: ${ProductTitleSize}${ProductTitleUnit};
              font-weight: ${ProductFontWeight};
              color: ${ProductTitleColor};
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
            // color: $first_text_color;
          }
          .product_link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            a {
              text-decoration: none;
              // color: $link_text_color;
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
                color: ${ProductBtnTextColor};
                background-color: ${ProductBtnBackColor};
                padding: 0.5rem 1rem;
                border: 2px solid $third_text_color;
                font-size: $root_text_size;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;

                &:hover {
                  background-color: ${ProductBtnHoverBackColor};
                  color:${ProductBtnHoverTextColor}
                }
              }
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
        // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-template-columns: 1fr 1fr;
    
        gap: 0.5rem;
        place-items: center;

        .gallery_image {
          width: 100%;

          img {
            cursor: pointer;
            width: 100%;
            height:100%;
            border-radius: ${ImageBorderRadius}px;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
              rgb(209, 213, 219) 0px 0px 0px 1px inset;
            border: 1px solid rgb(196, 196, 196);
            object-fit: cover;
            transition: all 0.3s ease;
            &:hover {
              opacity: 0.7;
              transition: all 0.3s ease;
            }
          }
        }
        /* Different spans for larger images */

        .span-1 {
          grid-row: span 1;
          grid-column: span 1;
        }

        .span-2 {
          grid-row: span 2;
          grid-column: span 2;
        }

        .span-3 {
          grid-row: span 3;
          grid-column: span 3;
        }
        .span-4 {
          grid-row: span 1;
          grid-column: span 1;
        }
        .span-5 {
          grid-row: span 2;
          grid-column: span 2;
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
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 5px;
              h6 {
                font-size: 0.6rem;
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
              border-radius: ${TestimonialImageBorderRadius[0]}px;
              border-top-left-radius:${TestimonialImageBorderRadius[0]}
                  ? ${TestimonialImageBorderRadius[0]}px
                  : "";
                border-bottom-left-radius:${[
                  TestimonialImageBorderRadius[1]
                    ? TestimonialImageBorderRadius[1]
                    : "",
                ]}px ;
                          border-top-right-radius:${[
                            TestimonialImageBorderRadius[2]
                              ? TestimonialImageBorderRadius[2]
                              : "",
                          ]}px ;
                                  border-bottom-right-radius:${[
                                    TestimonialImageBorderRadius[3]
                                      ? TestimonialImageBorderRadius[3]
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
                      font-size:0.8rem;
                      }
                    }
                      label{
                      font-size:0.7rem !important;
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
                      background-color: ${BtnBackColor};
                      color: ${BtnTextColor};
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
                        background-color: ${BtnHoverColour};
                        color:${BtnHoverTextColor};
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
              -webkit-text-fill-color: ${FeedbackInputError};
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
              color: ${FeedbackLabelColor};
     
              -webkit-text-fill-color: ${FeedbackLabelColor};
              font-size: 0.6rem !important;
              font-weight: 550;

              border-radius: 4px;

              span {
                font-size: 1rem;
                color: $error_text_color !important;
                -webkit-text-fill-color: ${FeedbackInputError};
                sup {
                  color: ${FeedbackInputError} !important;
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
color:${FeedbackInputColor} !important;
              transition: all 0.3s ease;
              &::placeholder {
                font-size: 0.6rem;
                color: ${FeedbackPlaceholderColor};
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
              &::placeholder {
                font-size: 0.6rem;
                color: ${FeedbackPlaceholderColor};
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
              border: 1px solid ${FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;

            &::placeholder{
              color:${FeedbackPlaceholderColor};
              font-size:0.7rem;
              }
              &:focus {
                border: 1px solid ${FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus}; // Change icon color when input is focused
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

              color: ${FeedbackInputBorderColor};
            }
            .iconwithlabel {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;
 color: ${FeedbackInputBorderColor};
            }
            .iconwithanimation {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                color: ${FeedbackInputBorderColor};
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
              border-bottom: 1px solid ${FeedbackInputBorderColor};
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border-bottom: 1px solid ${FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus}; // Change icon color when input is focused
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackLabelColor};
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

              color: ${FeedbackInputBorderColor};
            }
            .iconwithlabel {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

               color: ${FeedbackInputBorderColor};
            }
            .iconwithanimation {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
               color: ${FeedbackInputBorderColor};
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
              border: 1px solid ${FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border: 1px solid ${FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus}; 
              }
              &:focus + .iconwithlabel {
                color: ${FeedbackInputBorderOnFocus};
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackLabelColor};
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

              color: ${FeedbackInputBorderColor};
            }
            .icon {
                position: absolute;
                top: 55%;
                left: 2%;
  
                font-size: 1.3rem;
  
                color: ${FeedbackInputBorderColor};
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
              border-bottom: 1px solid ${FeedbackInputBorderColor};
              position: relative;
              font-size: 0.9rem;
              letter-spacing: 1px;

              &:focus {
                border-bottom: 1px solid ${FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus}; 
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackLabelColor};
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
  
              color: ${FeedbackInputBorderColor};
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
              border: 1px solid ${FeedbackInputBorderColor};
              border-radius: 0.3rem;
              font-size: 0.9rem;
              letter-spacing: 1px;
              box-shadow: none;
              transition: box-shadow 0.3s ease;

              &:focus {
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
              }
             
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus};
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

              color: ${FeedbackInputBorderColor};
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
              border-bottom: 1px solid ${FeedbackInputBorderColor};
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
                border-bottom: 1px solid ${FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus}; 
              }
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus};
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
  
                 color: ${FeedbackInputBorderColor};
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
              border: 1px solid ${FeedbackInputBorderColor};
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
                color: ${FeedbackInputBorderOnFocus};
              }
              &:focus + .icon {
                color: ${FeedbackInputBorderOnFocus}; 
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackLabelColor};
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
  
                          color: ${FeedbackInputBorderColor};
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
              border-bottom: 1px solid ${FeedbackInputBorderColor};
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
                border-bottom: 1px solid ${FeedbackInputBorderOnFocus};
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
                color: ${FeedbackInputBorderOnFocus}; // Change icon color when input is focused
              }
              &:focus + .iconwithlabel {
                 color: ${FeedbackInputBorderOnFocus};  // Change icon color when input is focused
              }
            }

         
            label {
              font-size: 0.9rem;
              font-weight: 500;
              color: ${FeedbackInputBorderColor};
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

                color: ${FeedbackInputBorderColor};
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
              border: 1px solid ${FeedbackInputBorderColor};
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
                  color: ${FeedbackInputBorderOnFocus}; // Change icon color when input is focused
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

              color: ${FeedbackInputBorderColor};
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
    }



      .Inquries {
    width: 100%;
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    .inquiries_container5 {
      width: 100%;
      display: flex;
      align-items: center;
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
 

          label {
            font-size: 0.7rem;
            letter-spacing: 1px;
            // color: $first_text_color;
            font-weight: 550;
          }

          .input {
            width: 100%;
            position: relative;
            background-color:none !important;

            input,
            textarea {
              width: 100%;
              padding: 0.9rem 2.5rem;
              outline: none;
   background-color:none !important;


              caret-color: ${InquiryInputColor};

              &::placeholder {
                // color: $first_text_color;
                letter-spacing: 1px;
                font-size: 0.7rem;
              }

              &:focus {
                border: 1px solid $first_text_color;
              }
            }

            i {
              position: absolute;
              left: 2%;
              font-size: 1.5rem;
              // color: $first_text_color;
              top: 30%;
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
            background-color:none !important;
            border: 1px solid ${InquiryInputBorderColor};
            border-radius: 0.3rem;
            font-size: 0.9rem;
            letter-spacing: 1px;

          &::placeholder{
            color:${InquiryPlaceholderColor};
            font-size:0.7rem;
            }
            &:focus {
              border: 1px solid ${InquiryInputBorderOnFocus};
            }
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus}; // Change icon color when input is focused
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

            color: ${InquiryInputBorderColor};
          }
          .iconwithlabel {
            position: absolute;
            top: 55%;
            left: 2%;

            font-size: 1.3rem;
color: ${InquiryInputBorderColor};
          }
          .iconwithanimation {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

              color: ${InquiryInputBorderColor};
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
            border-bottom: 1px solid ${InquiryInputBorderColor};
            position: relative;
            font-size: 0.9rem;
            letter-spacing: 1px;

            &:focus {
              border-bottom: 1px solid ${InquiryInputBorderOnFocus};
            }
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus}; // Change icon color when input is focused
            }
          }

       
          label {
            font-size: 0.9rem;
            font-weight: 500;
            color: ${InquiryLabelColor};
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

            color: ${InquiryInputBorderColor};
          }
          .iconwithlabel {
            position: absolute;
            top: 55%;
            left: 2%;

            font-size: 1.3rem;

             color: ${InquiryInputBorderColor};
          }
          .iconwithanimation {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

             color: ${InquiryInputBorderColor};
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
            border: 1px solid ${InquiryInputBorderColor};
            border-radius: 0.3rem;
            font-size: 0.9rem;
            letter-spacing: 1px;

            &:focus {
              border: 1px solid ${InquiryInputBorderOnFocus};
            }
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus}; 
            }
            &:focus + .iconwithlabel {
              color: ${InquiryInputBorderOnFocus};
            }
          }

       
          label {
            font-size: 0.9rem;
            font-weight: 500;
            color: ${InquiryLabelColor};
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

            color: ${InquiryInputBorderColor};
          }
          .icon {
              position: absolute;
              top: 55%;
              left: 2%;

              font-size: 1.3rem;

              color: ${InquiryInputBorderColor};
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
            border-bottom: 1px solid ${InquiryInputBorderColor};
            position: relative;
            font-size: 0.9rem;
            letter-spacing: 1px;

            &:focus {
              border-bottom: 1px solid ${InquiryInputBorderOnFocus};
            }
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus};
            }
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus}; 
            }
          }

       
          label {
            font-size: 0.9rem;
            font-weight: 500;
            color: ${InquiryLabelColor};
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

            color: ${InquiryInputBorderColor};
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
            border: 1px solid ${InquiryInputBorderColor};
            border-radius: 0.3rem;
            font-size: 0.9rem;
            letter-spacing: 1px;
            box-shadow: none;
            transition: box-shadow 0.3s ease;

            &:focus {
              box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
            }
           
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus};
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

            color: ${InquiryInputBorderColor};
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
            border-bottom: 1px solid ${InquiryInputBorderColor};
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
              border-bottom: 1px solid ${InquiryInputBorderOnFocus};
            }
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus}; 
            }
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus};
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

               color: ${InquiryInputBorderColor};
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
            border: 1px solid ${InquiryInputBorderColor};
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
              color: ${InquiryInputBorderOnFocus};
            }
            &:focus + .icon {
              color: ${InquiryInputBorderOnFocus}; 
            }
          }

       
          label {
            font-size: 0.9rem;
            font-weight: 500;
            color: ${InquiryLabelColor};
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

                        color: ${InquiryInputBorderColor};
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
            border-bottom: 1px solid ${InquiryInputBorderColor};
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
              border-bottom: 1px solid ${InquiryInputBorderOnFocus};
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
              color: ${InquiryInputBorderOnFocus}; // Change icon color when input is focused
            }
            &:focus + .iconwithlabel {
               color: ${InquiryInputBorderOnFocus};  // Change icon color when input is focused
            }
          }

       
          label {
            font-size: 0.9rem;
            font-weight: 500;
            color: ${InquiryInputBorderColor};
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

              color: ${InquiryInputBorderColor};
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
            border: 1px solid ${InquiryInputBorderColor};
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
                color: ${InquiryInputBorderOnFocus}; // Change icon color when input is focused
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

            color: ${InquiryInputBorderColor};
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
            // color: $third_text_color;
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
              // color: #fff;
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
              // color: $third_text_color;
              font-weight: 550;
              transition: all 0.4s ease-in;
            }
          }
        }
      }
    }
  }

                                
      `}
          </style>
          <div
            className="DOCTOR_PREVIEW_CARD"
            style={{
              backgroundColor: Dynamic_Style.$vcard_back_color,
              color: Dynamic_Style.$vcard_text_color,
            }}
          >
            {/* Menu Navbar */}
            <div
              className="menu_navbar_box"
              style={{ backgroundColor: Dynamic_Style.$vcard_back_color }}
            >
              <div
                className={`up_btn ${
                  activeMenu === "Home" ? "hideUpArrow" : ""
                }`}
                style={{ backgroundColor: BtnBackColor }}
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
              </div>
              <div
                className={`down_btn ${
                  activeMenu === "Inquiry" ? "hideDownArrow" : ""
                }`}
                style={{ backgroundColor: BtnBackColor }}
              >
                <CiSquareChevDown onClick={HandleMenuDown} className="down" />
              </div>
            </div>
            {/* Banner and logo */}
            <div className="Image_row_1" ref={HomeRef}>
              <div className="banner_image" style={styles.Slide1}>
                <img
                  src="https://img.freepik.com/premium-vector/two-silhouette-businessman-talking-discussing-contract-working-business-people-group-meeting-concept_48369-15936.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                  alt="banner"
                  style={styles.Slide1.bannerImg}
                />
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "50%",
                    background: `linearGradient("#cd62e200 0%", ${VCardColour} 100%)`,
                  }}
                ></div>
              </div>
              <div className={`user_logo ${LogoImageAnimation}`}>
                <img
                  src="https://img.freepik.com/premium-photo/professional-palette-stylish-office-desk-showcase_941561-25808.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid"
                  alt="user_logo"
                  className={`${LogoImageAnimation}`}
                />
              </div>
              <div className="svg_image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill={Dynamic_Style.$vcard_back_color}
                    fill-opacity="1"
                    d={
                      SVG_Design != "" || SVG_Design.length != 0
                        ? SVG_Design?.split("=")[5].split('"')[1]
                        : ""
                    }
                  ></path>
                </svg>
              </div>
            </div>
            {/* basic Details */}
            <div className="basic_row_2" ref={ContactRef}>
              <div className="user_details">
                <div className="user_data">
                  <div className="user_information">
                    <h2>Jayakumar V</h2>
                    <p>Manager</p>
                  </div>

                  {/* Actions */}
                  <div className="contacts_btns">
                    {/* Call */}
                    <a
                      href="tel:+919344482370"
                      target="_blank"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="Contact_btn"
                    >
                      <BiSolidPhoneCall className="icon" />

                      <small>Call</small>
                    </a>
                    {/* Mail */}
                    <a
                      href={`mailto:contact@aristostechindia.com`}
                      target="_blank"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <MdOutgoingMail className="icon" />

                      <small>Mail</small>
                    </a>
                    {/* Whatsup */}
                    <a
                      href={`https://wa.me/+919344482370?text=${encodeURIComponent(
                        `Hi there!`
                      )}`}
                      target="_blank"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <RiWhatsappFill className="icon" />

                      <small>Whatsapp</small>
                    </a>
                    {/* Direction */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query="No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017`}
                      target="_blank"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <FaDirections className="icon" />

                      <small>Direction</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Details */}
            <div className="contact_row_3">
              {/* Location */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query="No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017`}
                target="_blank"
                style={styles.link}
              >
                <div className="icon" style={styles.Icons}>
                  <MdLocationPin />
                </div>
                <div className="contact_data">
                  <small>Address</small>
                  <p>G. N Chetty Road, T. Nagar, Chennai-600017</p>
                </div>
              </a>
              {/* Mail */}
              <a
                href={`mailto:contact@aristostechindia.com`}
                target="_blank"
                style={styles.link}
              >
                <div className="icon" style={styles.Icons}>
                  <IoMail />
                </div>
                <div className="contact_data">
                  <small>Email</small>
                  <p>contact@aristostechindia.com</p>
                  <p>aristostechteam@gmail.com</p>
                </div>
              </a>
              {/* Website */}
              <a
                href="https://aristostechindia.com"
                target="_blank"
                style={styles.link}
              >
                <div className="icon" style={styles.Icons}>
                  <FaGlobe />
                </div>
                <div className="contact_data">
                  <small>Website</small>
                  <p>https://aristostechindia.com</p>
                </div>
              </a>
              {/* PhoneNumber */}
              <a href="tel:+919344482370" target="_blank" style={styles.link}>
                <div className="icon" style={styles.Icons}>
                  <BiSolidPhoneCall />
                </div>
                <div className="contact_data">
                  <small>MobileNumber</small>
                  <p>+91 93444 82370</p>
                  <p>+91 93635 47744</p>
                </div>
              </a>
              {/* AddtoContact */}
              <div className="add_to_contact">
                <button
                  style={styles.AddToContactBtn}
                  onMouseEnter={() => setBtnIsHovered(true)}
                  onMouseLeave={() => setBtnIsHovered(false)}
                >
                  Add to Contact<i className="bx bxs-contact"></i>
                </button>
              </div>
            </div>

            {/* About US */}
            <div className="about_row_4" ref={AboutRef}>
              <div className="Preview_Title">
                <h3>About Us</h3>
              </div>

              <div className="about_details">
                <div className="detail">
                  <div className="detail_title">
                    <h5>Company Name</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>Aristostech India Private Limited..</p>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>Category</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>IT Company</p>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>Year of Est..</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>2017</p>
                  </div>
                </div>

                <div className="detail">
                  <div className="detail_title">
                    <h5>Nature Of Business</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>
                      Digital Visiting Card,NFC Business Cards, NFC Google
                      Review Card
                    </p>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>SocialMedia's</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    {/* SocialMedia */}
                    <div className="social_medias">
                      <a
                        href="https://www.facebook.com/aristostechindia"
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
                                  stop-color="rgba(248, 117, 55, 1)"
                                  offset="0%"
                                ></stop>
                                <stop
                                  id="stop2"
                                  stop-color="rgba(251, 168, 31, 1)"
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
                      <a
                        href="https://www.instagram.com/aristostech_india/"
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
                                  stop-color="rgba(248, 117, 55, 1)"
                                  offset="0%"
                                ></stop>
                                <stop
                                  id="stop4"
                                  stop-color="rgba(251, 168, 31, 1)"
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
                      <a
                        href="https://wa.me/+919344482370?text=Welcome to Aristostech Team!, How can we assest u ?"
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
                                  stop-color="rgba(248, 117, 55, 1)"
                                  offset="0%"
                                ></stop>
                                <stop
                                  id="stop6"
                                  stop-color="rgba(251, 168, 31, 1)"
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
                      <a
                        href="https://wa.me/+919344482370?text=Welcome to Aristostech Team!, How can we assest u ?"
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
                                  stop-color="rgba(248, 117, 55, 1)"
                                  offset="0%"
                                ></stop>
                                <stop
                                  id="stop12"
                                  stop-color="rgba(251, 168, 31, 1)"
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

                      <a
                        href="https://maps.app.goo.gl/PCJCqMK7UJBNxBuf9"
                        target="_blank"
                        className="social_media_icon"
                      >
                        <i className="bx bx-map"></i>
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
                                  stop-color="rgba(248, 117, 55, 1)"
                                  offset="0%"
                                ></stop>
                                <stop
                                  id="stop8"
                                  stop-color="rgba(251, 168, 31, 1)"
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
                        <small>Location</small>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="DOCTOR_SUB_TITLE_PREVIEW">
                <h3>Our Specialities</h3>
              </div>
              <div className="specialities">
                <ul>
                  <li>
                    Knowledgeable team of professionals Complete client
                    satisfaction
                  </li>
                  <li>Ethical business policies On-time deliver/ execution</li>
                  <li>
                    Easy payment mode Customized solutions Best Consultancy
                  </li>
                  <li>Use of advanced technology We listen,We understand,</li>
                  <li>We provide Solution A great experience with</li>{" "}
                  <li>Happy clients 100% Trustable Service</li>{" "}
                  <li>
                    Provider We Empower our Clients to Utilize Digital
                    Technology
                  </li>
                </ul>
              </div>
            </div>
            {/* Our Services */}
            <div className="our_services" ref={ServiceRef}>
              <div className="Preview_Title">
                <h3>Our Services</h3>
              </div>
              <div className="All_Services">
                {/* Service */}
                <div className="Service">
                  <div className="service_title">
                    <h5> Digital Marketing</h5>
                  </div>
                  <div className="service_description">
                    <p>
                      Digital marketing, also called online marketing, is the
                      promotion of brands to connect with potential customers
                      using the internet and other forms of digital
                      communication.
                    </p>

                    <p>
                      This includes not only email, social media, and web-based
                      advertising, but also text and multimedia messages as a
                      marketing channel.
                    </p>
                  </div>

                  <div className="service_image">
                    <a
                      href="
                #"
                    >
                      <img
                        src="https://img.freepik.com/free-vector/digital-marketing-landing-page_33099-1726.jpg?t=st=1726786737~exp=1726790337~hmac=b765ce6cadc0c65e67fc2e8131cfd3616ebdd05a1735fa7e6d92d2a6c5fb012a&w=900"
                        alt="service_image"
                      />
                    </a>
                  </div>
                  <div className="service_action">
                    <div className="service_price">
                      <h5>Price : &nbsp;</h5>
                      <p>₹2000</p>
                    </div>
                    <div className="service_enquiry">
                      <a href="#" target="_blank" className="service_button">
                        Enquire Now <GrChat />
                      </a>
                    </div>
                  </div>
                </div>
                {/* Service */}
                <div className="Service">
                  <div className="service_title">
                    <h5>Static WebSite Building</h5>
                  </div>
                  <div className="service_description">
                    <p>
                      A static website is a website that displays the same
                      content to every user, regardless of their location,
                      preferences.
                    </p>

                    <p>
                      Static websites are often used for personal or marketing
                      sites. They are also sometimes called brochure sites
                      because they provide similar information to a business
                      brochure.
                    </p>
                  </div>

                  <div className="service_image">
                    <a
                      href="
                      #"
                    >
                      <img
                        src="https://img.freepik.com/free-photo/html-css-collage-concept-with-person_23-2150062008.jpg?t=st=1726784921~exp=1726788521~hmac=dd4bbc9d6130e6843510418659abe6f8ba58c314f37575d1c393aefcf4d50673&w=900"
                        alt="service_image"
                      />
                    </a>
                  </div>
                  <div className="service_action">
                    <div className="service_price">
                      <h5>Price : &nbsp;</h5>
                      <p>₹3000</p>
                    </div>
                    <div className="service_enquiry">
                      <a href="#" target="_blank" className="service_button">
                        Enquire Now <GrChat />
                      </a>
                    </div>
                  </div>
                </div>
                {/* Service */}
                <div className="Service">
                  <div className="service_title">
                    <h5>FullStack Ecommerse Website </h5>
                  </div>
                  <div className="service_description">
                    <p>
                      Full stack developers have expertise in systems
                      architecture, and can code in multiple languages. As a
                      full stack developer, your resume should reflect a balance
                      between technical know-how and intuitive design.
                    </p>

                    <p>
                      In this guide, we'll break down 10 full stack developer
                      resume examples to help you position your qualifications
                      for maximum impact.
                    </p>
                  </div>

                  <div className="service_image">
                    <a href="#">
                      <img
                        src="https://img.freepik.com/premium-photo/profile-it-developer-sitting-against-software-codding-monitor-gusher_31965-634451.jpg?w=900"
                        alt="service_image"
                      />
                    </a>
                  </div>
                  <div className="service_action">
                    <div className="service_price">
                      <h5>Price : &nbsp;</h5>
                      <p>₹6000</p>
                    </div>
                    <div className="service_enquiry">
                      <a href="#" target="_blank" className="service_button">
                        Enquire Now <GrChat />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Our Product */}
            <div className="our_products" ref={ProductRef}>
              <div className="Preview_Title">
                <h3>Our Products</h3>
              </div>
              <div className="All_Products">
                {/* Product */}
                <div className="Product">
                  <div className="product_title">
                    <h5> MyVirtual Card</h5>
                  </div>
                  <div className="product_image">
                    <a href="#">
                      <img src={product1} alt="service_image" />
                    </a>
                  </div>
                  <div className="product_action">
                    <div className="product_price">
                      <h5>Price : &nbsp;</h5>
                      <p>₹599</p>
                    </div>
                    <div className="product_enquiry">
                      <a href="#" target="_blank" className="product_button">
                        Enquire Now <GrChat />
                      </a>
                    </div>
                  </div>

                  <div className="product_description">
                    <p>
                      Customize Your Digital Identity Effortlessly with My
                      Virtual Card!. People are online Now, So convert your
                      Business Card Digitally to share on their mobiles and
                      Wishing your customers encourage them to connect with you.
                    </p>

                    <p>
                      A digital vCard, or virtual business card, is a modern
                      alternative to traditional paper business cards. It
                      contains essential contact information such as name, job
                      title, company name, phone number, email address, and
                      more, all stored in a digital format.
                    </p>
                  </div>
                  {/* <div className="product_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div> */}
                </div>
                {/* Product */}
                <div className="Product">
                  <div className="product_title">
                    <h5> My Orders</h5>
                  </div>
                  <div className="product_image">
                    <a href="#">
                      <img
                        src="https://img.freepik.com/premium-photo/ecommerce-market-shopping-online-vector-illustration_1108314-455389.jpg?w=826"
                        alt="service_image"
                      />
                    </a>
                  </div>
                  <div className="product_action">
                    <div className="product_price">
                      <h5>Price : &nbsp;</h5>
                      <p>₹1099</p>
                    </div>
                    <div className="product_enquiry">
                      <a href="#" target="_blank" className="product_button">
                        Enquire Now <GrChat />
                      </a>
                    </div>
                  </div>

                  <div className="product_description">
                    <p>
                      It was popularised in the 1960s with the release of
                      Letraset sheets containing Lorem Ipsum passages, and more
                      recently with desktop publishing software like Aldus
                      PageMaker including versions of Lorem Ipsum.
                    </p>

                    <p>
                      Many desktop publishing packages and web page editors now
                      use Lorem Ipsum as their default model text, and a search
                      for 'lorem ipsum' will uncover many web sites still in
                      their infancy. Various versions have evolved over the
                      years, sometimes by accident, sometimes on purpose
                      (injected humour and the like).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Payment */}
            <div className="Payment" ref={PaymentRef}>
              <div className="Preview_Title">
                <h3>For Payment</h3>
              </div>
              <div className="payment_details">
                <div className="detail">
                  <div className="detail_title">
                    <h5>Paytm Number</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>+91-93444 82370</p>
                    <RiFileCopyLine className="icon" />
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>PhonePay Number</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>+91-93444 82370</p>
                    <RiFileCopyLine className="icon" />
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>Google Pay Number</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>+91-93444 82370</p>
                    <RiFileCopyLine className="icon" />
                  </div>
                </div>
              </div>

              <div className="sub_title">
                <h4>Account Details :</h4>
              </div>
              <div className="account_details">
                <div className="detail">
                  <div className="detail_title">
                    <h5>Account Holder Name</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>John Wick</p>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>Bank Name</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>STATE BANK OF INDIA</p>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>Account Type</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>Savings</p>
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>IFSC code</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>SBIN0007585</p>
                    <RiFileCopyLine className="icon" />
                  </div>
                </div>
                <div className="detail">
                  <div className="detail_title">
                    <h5>Account Number</h5>
                  </div>
                  <div className="detail_message">
                    <strong>:</strong>
                    <p>56676841548</p>
                    <RiFileCopyLine className="icon" />
                  </div>
                </div>
              </div>
              <div className="sub_title">
                <h4>QR Code :</h4>
              </div>
              <div className="qr_code_upi_name">
                <h4>Google Pay</h4>
              </div>
              <div className="qr_image_box">
                <div className="user_name">
                  <h4>
                    To Senthil Kumar <LiaHandPointDownSolid />
                  </h4>
                </div>
                <div className="qr_image">
                  <img
                    src="https://img.freepik.com/premium-vector/qr-code-white-box-circle_78370-5879.jpg?w=740"
                    alt="qrcode"
                  />
                </div>
                <div className="quote">
                  <small>Scan with pay any UPI App</small>
                </div>
              </div>
            </div>
            {/* //Appinment */}

            <div className="Appoinment" ref={AppoinmentRef}>
              <div className="Preview_Title">
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
                  <div className={`form_group ${AppoinmentInputDesign}`}>
                    <label
                      htmlFor="FullName"
                      className={
                        Appoinment_formik.errors.FullName ? "labelError" : ""
                      }
                      style={{ color: LabelColor }}
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
                      className={`${AppoinmentInputDesign} ${Appoinment_formik.errors.FullName} &&
                    ${Appoinment_formik.touched.FullName}
                      ? "input_error"
                      : "input_success"
                  `}
                    />
                    <div className="icon">
                      <i className="bx bxs-user"></i>
                    </div>
                  </div>
                  <div className={`form_group ${AppoinmentInputDesign}`}>
                    <label
                      htmlFor="MobileNumber"
                      className={
                        Appoinment_formik.errors.MobileNumber
                          ? "labelError"
                          : ""
                      }
                      style={{ color: LabelColor }}
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
                  <div className={`form_group ${AppoinmentInputDesign}`}>
                    <label
                      htmlFor="Date"
                      className={
                        Appoinment_formik.errors.Date ? "labelError" : ""
                      }
                      style={{ color: LabelColor }}
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
                      className={` ${AppoinmentInputDesign}
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
                  <div className={`form_group ${AppoinmentInputDesign}`}>
                    <label
                      htmlFor="Time"
                      className={
                        Appoinment_formik.errors.Time ? "labelError" : ""
                      }
                      style={{ color: LabelColor }}
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
                      className={` ${AppoinmentInputDesign}
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
                        <span className="material-symbols-outlined">send</span>
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
            {/* Gallery */}
            <div className="gallery" ref={GalleryRef}>
              <div className="Preview_Title">
                <h3>Gallery</h3>
              </div>

              <div className="all_gallerys">
                <div className="gallery_image span-1">
                  <img
                    src="https://img.freepik.com/free-vector/isometric-e-commerce-concept-with-online-shop_23-2148561915.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                    alt="image"
                  />
                </div>
                <div className="gallery_image span-2">
                  <img
                    src="https://img.freepik.com/free-photo/add-cart-buy-now-online-commerce-graphic-concept_53876-133964.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                    alt="image"
                  />
                </div>
                <div className="gallery_image span-3">
                  <img
                    src="https://img.freepik.com/premium-photo/ecommerce-banner_1281315-2612.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                    alt="image"
                  />
                </div>
                <div className="gallery_image span-4">
                  <img
                    src="https://img.freepik.com/free-vector/flat-design-e-commerce-website-landing-page_23-2149581922.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                    alt="image"
                  />
                </div>
                <div className="gallery_image span-5">
                  <img
                    src="https://img.freepik.com/free-vector/isometric-e-commerce-concept-with-online-shop_23-2148561915.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                    alt="image"
                  />
                </div>
              </div>
            </div>
            {/* Videos */}
            <div className="video" ref={VideoRef}>
              <div className="Preview_Title">
                <h3>Videos</h3>
              </div>

              <div className="videos_container">
                <div className="video_image">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/ZZ1lnw8D3Qo?si=69n8qzoZRXN-35nQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video_image">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/DPSnDz8-GGs?si=rYYa3Fv6OD_aQLy1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            {/* Opentime */}
            <div className="time_container" ref={TimeRef}>
              <div className="Preview_Title">
                <h3>Open&Close Time</h3>
                {/* Contact */}
              </div>
              <div className="time_list_container">
                <div className="time_list">
                  <div className="day">
                    <span>Monday To Saturday</span>
                  </div>
                  <div className="time">
                    <div className="start">
                      <h6>Open Time</h6>
                      <span>9:00 AM</span>
                    </div>
                    <div className="end">
                      <h6>Close Time</h6>
                      <span>6:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="time_list">
                  <div className="day">
                    <span>For Weekend</span>
                  </div>
                  <div className="time">
                    <div className="start">
                      <h6>Open Time</h6>
                      <span>9:00 AM</span>
                    </div>
                    <div className="end">
                      <h6>Close Time</h6>
                      <span>11:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonials */}
            <div className="testimonial" ref={TestimonialRef}>
              <div className="Preview_Title">
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
                  <div className="testimonial_list">
                    <div className="client_feedback">
                      <div
                        className="feedback_title"
                        style={{ color: TestimonialTitleColor }}
                      >
                        <h4>Feedback</h4>
                      </div>
                      <div className="feedback_message">
                        <small>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Vel repellendus a ut! Architecto quis error
                          porro nemo beatae perspiciatis omnis?
                        </small>
                      </div>
                    </div>
                    <div className="user_detail">
                      <img
                        src="https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                        alt=""
                      />

                      <div className="client_name">
                        <h4>John Doe</h4>
                        <small>-Member</small>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial_list">
                    <div className="client_feedback">
                      <div
                        className="feedback_title"
                        style={{ color: TestimonialTitleColor }}
                      >
                        <h4>Feedback</h4>
                      </div>
                      <div className="feedback_message">
                        <small>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Vel repellendus a ut! Architecto quis error
                          porro nemo beatae perspiciatis omnis?
                        </small>
                      </div>
                    </div>
                    <div className="user_detail">
                      <img
                        src="https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                        alt=""
                      />

                      <div className="client_name">
                        <h4>John Doe</h4>
                        <small>-Member</small>
                      </div>
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
            {/* GoogleMap */}

            <div className="google_map_container" ref={LocationRef}>
              <div className="Preview_Title">
                <h3>Live Location</h3>
              </div>

              <div className="google_map">
                <HtmlRenderer
                  htmlString={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650172790676!2d80.23659527507537!3d13.044262813281074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAristostech%20India%20Pvt%20Ltd%20Software%20Company%20%26%20Website%20Design%20Experts!5e0!3m2!1sen!2sin!4v1724171244060!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>`}
                />
              </div>
            </div>

            {/* Feedback */}
            <div className="feedback_row" ref={FeedbackRef}>
              <div className="Preview_Title">
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

                    <div className="message">
                      <div className="user_detail">
                        <div className="details">
                          <div className="userName">
                            <p>
                              Dinesh Kumar
                              <i className="bx bxs-user-check"></i>
                            </p>
                          </div>
                          <div className="stars">
                            <div
                              className="ratting_container1"
                              data-rating="1"
                              name="currentRatting"
                              // id="currentRatting"

                              value="1"
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
                        <span>Well Design make it quickly..</span>
                      </div>

                      <div className="date">
                        <i className="bx bx-calendar"></i>
                        <p>10-05-2024</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="feedback_container">
                <form action="" onSubmit={feedbackFormik.handleSubmit}>
                  <div className={`form_group ${FeedbackInputDesign}`}>
                    <label
                      htmlFor="clientName_Input"
                      className={` ${
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
                      className={`${FeedbackInputDesign}`}
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
                  <div className={`form_group ${FeedbackInputDesign}`}>
                    <label
                      htmlFor="clientFeedBack_Input"
                      className={`${
                        feedbackFormik.errors.ClientFeedback ? "error" : ""
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
                      className={`${FeedbackInputDesign}`}
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
                  <div className={`form_group ${FeedbackInputDesign}`}>
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
                      style={{ paddingRight: "15px" }}
                      half={false}
                      color2={"#ffd700"}
                    />
                  </div>
                  <div className="form_actions">
                    <button type="submit">
                      <span className="material-symbols-outlined">send</span>
                      Send Feedback
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Inquries */}
            {/* <div className="Inquries" ref={InquiryRef}>
              <div className="Preview_Title">
                <h3>Inquries</h3>
              </div>
              <div className="inquiries_container5">
                <form action="">
                  <div className={`form_group ${InquiryInputDesign}`}>
                    <label htmlFor="name">
                      Name <sup style={{ color: "red" }}>*</sup>
                    </label>

                    <input type="text" placeholder="Your Name" className={`${InquiryInputDesign}`} style={{backgroundColor:'none'}} />
                    <div className="icon">
                      <i className="bx bxs-user-pin"></i>
                    </div>
                  </div>
                  <div className={`form_group ${InquiryInputDesign}`}>
                    <label htmlFor="email">
                      Email <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <div className="input">
                      <input type="email" placeholder="Your Email" className={`${InquiryInputDesign}`}/>
                      <i className="bx bxs-envelope"></i>
                    </div>
                  </div>
                  <div className={`form_group ${InquiryInputDesign}`}>
                    <label htmlFor="name">
                      Phone <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <div className="input">
                      <input type="tel" placeholder="Enter Phone Number" className={`${InquiryInputDesign}`} />
                      <i className="bx bxs-phone-call"></i>
                    </div>
                  </div>
                  <div className={`form_group ${InquiryInputDesign}`}>
                    <label htmlFor="name">
                      Message <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <div className="input">
                      <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="2"
                        placeholder="Enter Your Message Here..."
                        className={`${InquiryInputDesign}`}
                      ></textarea>
                      <i className="bx bxs-message-dots"></i>
                    </div>
                  </div>
                  <div className="form_actions">
                    <button type="submit">
                      <span className="material-symbols-outlined">send</span>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div> */}
            {/* Footer */}
            <div className="Footer">
              <div className="footer_container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill={Dynamic_Style.$svg_wave_back_color}
                    fill-opacity="1"
                    d="M0,192L34.3,170.7C68.6,149,137,107,206,101.3C274.3,96,343,128,411,144C480,160,549,160,617,138.7C685.7,117,754,75,823,74.7C891.4,75,960,117,1029,133.3C1097.1,149,1166,139,1234,122.7C1302.9,107,1371,85,1406,74.7L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                  ></path>
                </svg>
                <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="vcard_preview_loader">
          <span class="preview_loader"></span>
        </div>
      )}
    </>
  );
};

export default DynamicVcard;
