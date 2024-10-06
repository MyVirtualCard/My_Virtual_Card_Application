import React, { useContext, useEffect, useRef, useState } from "react";
import "./DynamicVcard.scss";
import Context from "../../../../Context/GlobalContext";

import product1 from "../../../../assets/AllVCard_Image/Doctor/product_1.png";

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
import * as Yup from "yup";
import vCardsJS from "vcards-js";
import { Cursor } from "react-simple-typewriter";
import { filter } from "lodash";
import { translate } from "react-range/lib/utils";
import { color } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
const DynamicVcard = () => {
  let {
    user,
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
  } = useContext(Context);
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
        bottom: `${LogoBottomPosition}${LogoPositionUnit}`,
        right: `${LogoRightPosition}${LogoPositionUnit}`,
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
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
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

  let AboutRef = useRef(null);
  let ServiceRef = useRef(null);
  let ProductRef = useRef(null);
  let PaymentRef = useRef(null);
  let GalleryRef = useRef(null);
  let VideoRef = useRef(null);
  let AppinmentRef = useRef(null);
  let TimeRef = useRef(null);
  let TestimonialRef = useRef(null);
  let LocationRef = useRef(null);

  let FeedbackRef = useRef(null);
  let InquiryRef = useRef(null);

  let scrollToSection = (elementRef) => {
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
  useEffect(() => {
    const handleScroll = () => {
      const section1Top = HomeRef.current?.offsetTop || 0;
      const section2Top = AboutRef.current?.offsetTop || 0;
      const section3Top = ServiceRef.current?.offsetTop || 0;
      const section4Top = ProductRef.current?.offsetTop || 0;
      const section5Top = PaymentRef.current?.offsetTop || 0;
      const section6Top = GalleryRef.current?.offsetTop || 0;
      const section7Top = VideoRef.current?.offsetTop || 0;
      const section8Top = AppinmentRef.current?.offsetTop || 0;
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
            Authorization: `Bearer ${user.token}`,
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
            Authorization: `Bearer ${user.token}`,
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
            Authorization: `Bearer ${user.token}`,
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
            Authorization: `Bearer ${user.token}`,
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
            Authorization: `Bearer ${user.token}`,
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
            Authorization: `Bearer ${user.token}`,
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
            Authorization: `Bearer ${user.token}`,
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

  useEffect(() => {
    handleVcardThemeFetch();
    handleImageThemeFetch();
    handleButtonThemeFetch();
    handleTitleThemeFetch();
    handleServiceThemeFetch();
    handleProductThemeFetch();
    handleTimerThemeFetch();
  }, []);
  return (
    <>
      {!VcardPreviewLoader ? (
        <>
          <style>
            /* Add your CSS here */
            {`
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
          color:${ServiceTextColor};

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
            // color: $service_text_color;
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
              >
                <CiSquareChevDown onClick={HandleMenuDown} className="down" />
              </div>
            </div>
            {/* Banner and logo */}
            <div className="Image_row_1" ref={HomeRef}>
              <div className="banner_image" style={styles.Slide1}>
                <img
                  src="https://img.freepik.com/premium-photo/laptop-cup-coffee-are-table-with-blue-background_337384-159390.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid"
                  alt="banner"
                  style={styles.Slide1.bannerImg}
                />
                <div
                  className="overlay"
                  style={{
                    background: `linearGradient("#cd62e200 0%", ${VCardColour} 100%)`,
                  }}
                ></div>
              </div>
              <div className="user_logo" style={styles.Slide1.logoImg}>
                <img
                  src="https://img.freepik.com/premium-photo/professional-palette-stylish-office-desk-showcase_941561-25808.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid"
                  alt="user_logo"
                  style={styles.Slide1.logoImg}
                />
              </div>
              <div className="svg_image">
                {/* <HtmlRenderer htmlString={SVG_Design} style={{fill:style.$vcard_back_color}}/> */}
                {/* {SVG_Design} */}
                {/* <div dangerouslySetInnerHTML={{ __html: SVG_Design }} style={{fill : style.$vcard_back_color}} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill={Dynamic_Style.$vcard_back_color}
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
            {/* basic Details */}
            <div className="basic_row_2">
              <div className="user_details">
                <div className="user_data">
                  <div className="user_information">
                    <h2>Senthil Kumar</h2>
                    <p>KRN Private Hospital</p>
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
                {/* Contact */}
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
                      <h4>Feedback</h4>
                      <small>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Vel repellendus a ut! Architecto quis error porro
                        nemo beatae perspiciatis omnis?
                      </small>
                    </div>
                    <div className="client_detail">
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
                      <h4>Feedback</h4>
                      <small>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Vel repellendus a ut! Architecto quis error porro
                        nemo beatae perspiciatis omnis?
                      </small>
                    </div>
                    <div className="client_detail">
                      <img
                        src="https://img.freepik.com/premium-vector/avatar-office-worker-cartoon-style-artful-office-mans-avatar-skillfully-blend-design_198565-9434.jpg?w=740"
                        alt=""
                      />

                      <div className="client_name">
                        <h4>Jayakumar </h4>
                        <small>-CEO</small>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial_list">
                    <div className="client_feedback">
                      <h4>Feedback</h4>
                      <small>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Vel repellendus a ut! Architecto quis error porro
                        nemo beatae perspiciatis omnis?
                      </small>
                    </div>
                    <div className="client_detail">
                      <img
                        src="https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                        alt=""
                      />

                      <div className="client_name">
                        <h4>Dinesh Kumar</h4>
                        <small>-Member</small>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial_list">
                    <div className="client_feedback">
                      <h4>Feedback</h4>
                      <small>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Vel repellendus a ut! Architecto quis error porro
                        nemo beatae perspiciatis omnis?
                      </small>
                    </div>
                    <div className="client_detail">
                      <img
                        src="https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                        alt=""
                      />

                      <div className="client_name">
                        <h4>Punitha</h4>
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
                {/* Contact */}
              </div>
              <div className="feedback_container">
                <form action="">
                  <div className="form_group">
                    <label htmlFor="clientName_Input">
                      FullName
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      name="userName"
                      id="userName"
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="clientFeedBack_Input">
                      Your Feedback
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <textarea
                      id="userFeedback"
                      name="userFeedback"
                      cols="30"
                      rows="3"
                      placeholder="Enter your Feedback"
                    ></textarea>
                  </div>
                  <div className="form_group">
                    <label htmlFor="clientName_Input">
                      Ratting
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <div
                      className="ratting_container"
                      data-rating="0"
                      name="currentRatting"
                      id="currentRatting"
                    >
                      <span className="ratting_star">
                        <i className="bx bxs-star star" data-rating="1"></i>
                      </span>
                      <span className="ratting_star">
                        <i className="bx bxs-star star" data-rating="2"></i>
                      </span>
                      <span className="ratting_star">
                        <i className="bx bxs-star star" data-rating="3"></i>
                      </span>
                      <span className="ratting_star">
                        <i className="bx bxs-star star" data-rating="4"></i>
                      </span>
                      <span className="ratting_star">
                        <i className="bx bxs-star star" data-rating="5"></i>
                      </span>
                    </div>
                  </div>
                  <div className="form_actions">
                    <button type="submit">
                      <span className="material-symbols-outlined">send</span>
                      Send Feedback
                    </button>
                  </div>
                </form>
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
                    {AllFeedBacks.map((data, index) => {
                      return (
                        <div className="message" key={index}>
                          <div className="user_detail">
                            <div className="profile">
                              <img src={profile} alt="profile" />
                            </div>
                            <div className="details">
                              <div className="userName">
                                <p>
                                  {data.userName}
                                  <i className="bx bxs-user-check"></i>
                                </p>
                              </div>
                              <div className="stars">
                                <div
                                  className="ratting_container1"
                                  data-rating={data.currentRatting}
                                  name="currentRatting"
                                  // id="currentRatting"
                                  id={
                                    data.currentRatting == 0
                                      ? "noRatting"
                                      : "" || data.currentRatting == 1
                                      ? "singleRatting"
                                      : "" || data.currentRatting == 2
                                      ? "doubleRatting"
                                      : "" || data.currentRatting == 3
                                      ? "ThreeRatting"
                                      : "" || data.currentRatting == 4
                                      ? "fourRatting"
                                      : "" || data.currentRatting == 5
                                      ? "fullRatting"
                                      : ""
                                  }
                                  value={data.currentRatting}
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
                            <span>{data.userFeedback}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* Inquries */}
            <div className="Inquries" ref={InquiryRef}>
              <div className="Preview_Title">
                <h3>Inquries</h3>
              </div>
              <div className="inquiries_container5">
                <form action="">
                  <div className="form_group">
                    <label htmlFor="name">
                      Name <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <div className="input">
                      <input type="text" placeholder="Your Name" />
                      <i className="bx bxs-user-pin"></i>
                    </div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="email">
                      Email <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <div className="input">
                      <input type="email" placeholder="Your Email" />
                      <i className="bx bxs-envelope"></i>
                    </div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="name">
                      Phone <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <div className="input">
                      <input type="tel" placeholder="Enter Phone Number" />
                      <i className="bx bxs-phone-call"></i>
                    </div>
                  </div>
                  <div className="form_group">
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
            </div>
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
