import React, { useContext, useEffect, useRef, useState } from "react";
import "./Edit_form_styles/Edit_Dynamic_Theme.scss";
import Context from "../../../Context/GlobalContext";
import Vcard_Theme from "./Dynamic_Forms/Vcard_Theme";
import Logo_Banner_Design from "./Dynamic_Forms/Logo_Banner_Design";
import product1 from "../../../assets/AllVCard_Image/Doctor/product_1.png";

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
import Dynamic_Contact_Icon from "./Dynamic_Forms/Dynamic_Contact_Icon";
import { color } from "framer-motion";
import Title_Design from "./Dynamic_Forms/Title_Design";

const Edit_Dynamic_Theme = () => {
  let {
    user,
    userName,
    FormSubmitLoader,
    setFormSubmitLoader,
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
    TitlePosition,setTitlePosition,

  } = useContext(Context);
  let [isHovered, setIsHovered] = useState(false);
  let [BtnisHovered, setBtnIsHovered] = useState(false);

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
  return (
    <>
    <style>
      /* Add your CSS here */
      {`
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
      `}
      </style>

  
      <div className="Dynamic_theme_container">
        <div className="dynamic_box">
          <div className="dynanic_content">
            <div className="dynamic_title">
              <h4>Dynamic VCard Theme - {DynamicForm}</h4>
            </div>
            {DynamicForm == "Vcard_Theme" ? <Vcard_Theme /> : ""}
            {DynamicForm == "Logo_Banner_Design" ? <Logo_Banner_Design /> : ""}
            {DynamicForm == "Contact_Icons" ? <Dynamic_Contact_Icon /> : ""}
            {DynamicForm == "Title_Design" ? <Title_Design /> : ""}
          </div>
          <div className="vcard_preview">
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
                    src="https://img.freepik.com/premium-photo/computer-monitor-with-purple-flower-corner_916191-285310.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
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
                    src="https://img.freepik.com/free-photo/smiling-redhead-man-with-laptop-looking-camera-cafe_1163-5162.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                    alt="user_logo"
                    style={styles.Slide1.logoImg}
                  />
                </div>
                <div className="svg_image">
                  {/* <HtmlRenderer htmlString={SVG_Design} style={{fill:style.$vcard_back_color}}/> */}
                  {/* {SVG_Design} */}
                  {/* <div dangerouslySetInnerHTML={{ __html: SVG_Design }} style={{fill : style.$vcard_back_color}} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
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
                    <div className="contacts_btns" style={styles.link}>
                      {/* Call */}
                      <a
                        href="tel:+919344482370"
                        target="_blank"
                        style={styles.ContactBtn}
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
                        style={styles.ContactBtn}
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
                        style={styles.ContactBtn}
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
                        style={styles.ContactBtn}
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
                    <li>
                      Ethical business policies On-time deliver/ execution
                    </li>
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
                        This includes not only email, social media, and
                        web-based advertising, but also text and multimedia
                        messages as a marketing channel.
                      </p>
                    </div>
                    <div className="service_link">
                      <a href="#" target="_blank">
                        For More Details <TbUnlink />
                      </a>
                    </div>
                    <div className="service_image">
                      <img
                        src="https://img.freepik.com/free-vector/digital-marketing-landing-page_33099-1726.jpg?t=st=1726786737~exp=1726790337~hmac=b765ce6cadc0c65e67fc2e8131cfd3616ebdd05a1735fa7e6d92d2a6c5fb012a&w=900"
                        alt="service_image"
                      />
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
                    <div className="service_link">
                      <a href="#" target="_blank">
                        For More Details <TbUnlink />
                      </a>
                    </div>
                    <div className="service_image">
                      <img
                        src="https://img.freepik.com/free-photo/html-css-collage-concept-with-person_23-2150062008.jpg?t=st=1726784921~exp=1726788521~hmac=dd4bbc9d6130e6843510418659abe6f8ba58c314f37575d1c393aefcf4d50673&w=900"
                        alt="service_image"
                      />
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
                        full stack developer, your resume should reflect a
                        balance between technical know-how and intuitive design.
                      </p>

                      <p>
                        In this guide, we'll break down 10 full stack developer
                        resume examples to help you position your qualifications
                        for maximum impact.
                      </p>
                    </div>
                    <div className="service_link">
                      <a href="#" target="_blank">
                        For More Details <TbUnlink />
                      </a>
                    </div>
                    <div className="service_image">
                      <img
                        src="https://img.freepik.com/premium-photo/profile-it-developer-sitting-against-software-codding-monitor-gusher_31965-634451.jpg?w=900"
                        alt="service_image"
                      />
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
                      <img src={product1} alt="service_image" />
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
                        Wishing your customers encourage them to connect with
                        you.
                      </p>

                      <p>
                        A digital vCard, or virtual business card, is a modern
                        alternative to traditional paper business cards. It
                        contains essential contact information such as name, job
                        title, company name, phone number, email address, and
                        more, all stored in a digital format.
                      </p>
                    </div>
                    <div className="product_link">
                      <a href="#" target="_blank">
                        For More Details <TbUnlink />
                      </a>
                    </div>
                  </div>
                  {/* Product */}
                  <div className="Product">
                    <div className="product_title">
                      <h5> My Orders</h5>
                    </div>
                    <div className="product_image">
                      <img
                        src="https://img.freepik.com/premium-photo/ecommerce-market-shopping-online-vector-illustration_1108314-455389.jpg?w=826"
                        alt="service_image"
                      />
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
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>

                      <p>
                        Many desktop publishing packages and web page editors
                        now use Lorem Ipsum as their default model text, and a
                        search for 'lorem ipsum' will uncover many web sites
                        still in their infancy. Various versions have evolved
                        over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).
                      </p>
                    </div>
                    <div className="product_link">
                      <a href="#" target="_blank">
                        For More Details <TbUnlink />
                      </a>
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
                          elit. Vel repellendus a ut! Architecto quis error
                          porro nemo beatae perspiciatis omnis?
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
                          elit. Vel repellendus a ut! Architecto quis error
                          porro nemo beatae perspiciatis omnis?
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
                          elit. Vel repellendus a ut! Architecto quis error
                          porro nemo beatae perspiciatis omnis?
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
                          elit. Vel repellendus a ut! Architecto quis error
                          porro nemo beatae perspiciatis omnis?
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Dynamic_Theme;
