import React, { useEffect, useRef, useState } from "react";
import "./BEAUTY_PARLOR_LIVE.scss";
//service Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//Product Slider
import { Slide } from "react-slideshow-image";
import logo_back_svg from "../../../../assets/AllVCard_Image/Beauty_Parlor/logo_back_svg1.svg";
import social_media_back_svg from '../../../../assets/AllVCard_Image/Beauty_Parlor/social_media_back_svg.svg';
import "react-slideshow-image/dist/styles.css";

import { PiArrowBendRightDownBold } from "react-icons/pi";
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
import VCard_Loader from "../../../../VCard_Loader/VCard_Loader";
import { InquiryValidateSchema } from "../../../../Helper/InquiryValidate";
import { AppoinmentValidateSchema } from "../../../../Helper/AppoinmentValidate";
import ReactStars from "react-stars";
import axios from "axios";
const BEAUTY_PARLOR_LIVE = () => {
  let style = {
    $first_back__color: "#ffffff",
    $second_back__color: "#ffffff",
    $third_back__color: "#303030",
    //Root Background
    $root_backgound: "#fcfdc8,#ffffff",
    //Vcard background
    $vcard_back_color: "#a1046d",
    //SVG Wave backgound
    $svg_wave_back_color: "#2A3132",
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
  var totalHeight;
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
      Url_Alies: window.location.pathname,
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
      Url_Alies: window.location.pathname,
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
  let [ServiceData, setServiceData] = useState([]);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
  let [SocialMediaData, setSocialMediaData] = useState([]);
  let [BussinessHourData, setBussinessHourData] = useState([]);
  let [GoogleMapData, setGoogleMapData] = useState([]);
  let [PopUpBannerData, setPopUpBannerData] = useState([]);
  let [ManageContentData, setManageContent] = useState([]);
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
    try {
      await api
        .get(`/vcard/allDataAPI${currentUrl}`)
        .then((res) => {
          console.log(res.data.data);
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

          setTimeout(() => {
            // window.scrollTo(0, 0);
            setPopUpBannerToggle(true);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setSiteLoader(false);
    } finally {
      setSiteLoader(false);
    }
  }
  useEffect(() => {
    fetchAllData();
  }, []);

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
  // Show loading spinner or message while loading
  if (SiteLoader) {
    return <VCard_Loader />;
  }
  return (
    <div className="BEAUTY_PARLOR_LIVE_CONTAINER">
      {/* Gallery Full IMAGE */}
      <div
        className="full_image"
        id="fullImageBox"
        style={{ position: "absolute", top: scrollY }}
      >
        <div className="close_Full_Image_gallery">
          <RiCloseLargeLine className="icon" onClick={closeFullImage} />
        </div>
        <img src="" alt="gallery" id="fullImage" />
      </div>
      {/* Menu Navbar */}
      <div className="menu_navbar_box">
        <div className={`up_btn ${activeMenu === "Home" ? "hideUpArrow" : ""}`}>
          <CiSquareChevUp onClick={HandleMenuUp} className="icon" />
        </div>
        <div className="all_menus">
          <div
            className={`menu ${activeMenu === "Home" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(HomeRef), setActiveMenu("Home");
            }}
          >
            <IoHome className="icon" />
            <p>Home</p>
          </div>
          <div
            className={`menu ${activeMenu === "About" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(AboutRef), setActiveMenu("About");
            }}
          >
            <BiSolidUserDetail className="icon" />
            <p>About</p>
          </div>
          <div
            className={`menu ${activeMenu === "Service" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(ServiceRef), setActiveMenu("Service");
            }}
          >
            <MdMiscellaneousServices className="icon" />
            <p>Service</p>
          </div>
          <div
            className={`menu ${activeMenu === "Product" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(ProductRef), setActiveMenu("Product");
            }}
          >
            <AiFillProduct className="icon" />
            <p>Product</p>
          </div>
          <div
            className={`menu ${activeMenu === "Payment" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(PaymentRef), setActiveMenu("Payment");
            }}
          >
            <GiTakeMyMoney className="icon" />
            <p>Payment</p>
          </div>
          <div
            className={`menu ${activeMenu === "Gallery" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(GalleryRef), setActiveMenu("Gallery");
            }}
          >
            <GrGallery className="icon" />
            <p>Gallery</p>
          </div>
          <div
            className={`menu ${activeMenu === "Video" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(VideoRef), setActiveMenu("Video");
            }}
          >
            <BiSolidVideo className="icon" />
            <p>Videos</p>
          </div>
          <div
            className={`menu ${activeMenu === "Time" ? "menuActive" : ""}`}
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
              scrollToSection(TestimonialRef), setActiveMenu("Testimonial");
            }}
          >
            <MdOutlineRateReview className="icon" />
            <p>Testi..al</p>
          </div>
          <div
            className={`menu ${activeMenu === "Location" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(LocationRef), setActiveMenu("Location");
            }}
          >
            <GrMapLocation className="icon" />
            <p>Location</p>
          </div>
          <div
            className={`menu ${activeMenu === "Feedback" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(FeedbackRef), setActiveMenu("Feedback");
            }}
          >
            <VscFeedback className="icon" />
            <p>Feedback</p>
          </div>
          <div
            className={`menu ${activeMenu === "Inquiry" ? "menuActive" : ""}`}
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
      <div className="FASHION_DESIGNER_LIVE_CARD">
        {/* Banner and logo */}
        <div className="Image_row_1" ref={HomeRef}>
          <div className="slide_svg1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill={style.$svg_wave_back_color}
                fill-opacity="1"
                d="M0,128L60,117.3C120,107,240,85,360,90.7C480,96,600,128,720,154.7C840,181,960,203,1080,181.3C1200,160,1320,96,1380,64L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
            <div className="overlay"></div>
          </div>
          <div className="banner_image1">
            <img
              src="https://img.freepik.com/free-photo/woman-taking-care-girl-salon_23-2147769838.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
              alt="banner"
            />
            <div className="overlay"></div>
          </div>
          <div className="user_logo">
            <div className="logo">
              <img
                src="https://img.freepik.com/premium-photo/high-fashion-look-glamor-stylish-adult-hot-lingerie-sexy-smiling-beautiful-traveler-happy-mood-young-woman-model-photo-pips-perfect-pighting-poses-model-name-zaara-yesmin_1298691-9628.jpg?w=740"
                alt="user_logo"
              />
                 <div className="svg_image">
              <img src={logo_back_svg} alt="svg_logo_back" />
            </div>
            </div>
          </div>
        </div>
        {/* basic Details */}
        <div className="basic_row_2">
          <div className="user_details">
            <div className="user_data">
              <div className="user_information">
                <h2>Rohini</h2>
                <p>
                 Rohini Beauty Parlor
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* //Actions
         */}
        {/* Actions */}
        <div className="contacts_btns">
          {/* Call */}
          <a href="#">
            <BiSolidPhoneCall className="icon" />

            <small>Call</small>
          </a>
          {/* Mail */}
          <a href="#">
            <MdOutgoingMail className="icon" />

            <small>Mail</small>
          </a>
          {/* Whatsup */}
          <a href="#">
            <RiWhatsappFill className="icon" />

            <small>Whatsapp</small>
          </a>
          {/* Direction */}
          <a href="#">
            <FaDirections className="icon" />

            <small>Direction</small>
          </a>
        </div>

        {/* Contact Details */}
        <div className="contact_row_3">
          {/* Location */}
          <a href="" target="_blank">
            <div className="icon">
              <MdLocationPin />
              <div className="social_media_svg">
                    <img src={social_media_back_svg} alt="social_svg" />
                  </div>
            </div>
            <div className="contact_data">
              <small>Address</small>
              <p>16 Quai des Belges,France</p>
            </div>
          </a>
          {/* Mail */}
          <a href="" target="_blank">
            <div className="icon">
              <IoMail />
              <div className="social_media_svg">
                    <img src={social_media_back_svg} alt="social_svg" />
                  </div>
            </div>
            <div className="contact_data">
              <small>Email</small>
              <p>karthick@gmail.com</p>
              <p>fitnesscoachkarthick@gmail.com</p>
            </div>
          </a>
          {/* Website */}
          <a href="" target="_blank">
            <div className="icon">
              <FaGlobe />
              <div className="social_media_svg">
                    <img src={social_media_back_svg} alt="social_svg" />
                  </div>
            </div>
            <div className="contact_data">
              <small>Website</small>
              <p>https://www.cult.fit/</p>
            </div>
          </a>
          {/* PhoneNumber */}
          <a href="" target="_blank">
            <div className="icon">
              <BiSolidPhoneCall />
               <div className="social_media_svg">
                    <img src={social_media_back_svg} alt="social_svg" />
                  </div>
            </div>
            <div className="contact_data">
              <small>MobileNumber</small>
              <p>+91 6354468689</p>
              <p>+91 1454585858</p>
            </div>
          </a>
          {/* AddtoContact */}
          <div className="add_to_contact">
            <button onClick={handleDownloadVCard}>
              Add to Contact<i className="bx bxs-contact"></i>
            </button>
          </div>
        </div>

        {/* About US */}
        <div className="about_row_4" ref={AboutRef}>
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              About Us <PiArrowBendRightDownBold className="icon" />
            </h3>
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
                  Digital Visiting Card,NFC Business Cards, NFC Google Review
                  Card
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
          <div className="BEAUTY_PARLOR_LIVE_SUB_TITLE">
            <h3>Our Specialities</h3>
          </div>
          <div className="specialities">
            <ul>
              <li>
                Personal training: Evaluate clients' fitness levels and goals,
                and create personalized training programs.
              </li>
              <li>
                Group fitness instruction: Lead group exercise classes, such as
                cardiovascular exercises, stretching, or muscle strengthening.
              </li>
              <li>
                Nutrition: Create meal plans for clients based on their needs
                and goals.
              </li>
              <li>
                Strength and conditioning: Offer specialized athletic training..
              </li>
              <li>
                Corrective exercise: Help clients with movement dysfunction.
              </li>{" "}
              <li>
                Senior fitness: Help older clients with fitness challenges.
              </li>{" "}
              <li>
                Sports performance: A specialization within the fitness
                industry.
              </li>
            </ul>
          </div>
        </div>
        {/* Our Services */}
        <div className="our_services" ref={ServiceRef}>
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Our Services <PiArrowBendRightDownBold className="icon" />
            </h3>
          </div>
          <div className="All_Services">
            {/* Service */}
            <div className="Service">
              <div className="service_title">
                <h5>Personalized training programs</h5>
              </div>
              <div className="service_description">
                <p>
                  Personalized training is a tailored approach to learning and
                  development that addresses the specific needs and preferences
                  of individual learners.
                </p>

                <p>
                  It goes beyond a one-size-fits-all approach by customizing
                  training content, delivery methods, and pace to match the
                  learner's knowledge, skills, and learning style.
                </p>
              </div>
              <div className="service_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div>
              <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/young-sports-people-training-morning-gym_1157-28958.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
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
                <h5>Nutrition Advice </h5>
              </div>
              <div className="service_description">
                <p>
                  Eat a variety of foods: Eat a variety of foods from each of
                  the five food groups, including fruits, vegetables, whole
                  grains, protein sources, and healthy fats.
                </p>

                <p>
                  Reduce unhealthy fats, salt, and sugar: Eat less salt, sugars,
                  and saturated and industrially-produced trans-fats.
                </p>
              </div>
              <div className="service_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div>
              <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/nutrition-facts-comparison-food-dietery_53876-123817.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                  alt="service_image"
                />
              </div>
              <div className="service_action">
                <div className="service_price">
                  <h5>Price : &nbsp;</h5>
                  <p>₹1000</p>
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
                <h5>Motivational Coaching</h5>
              </div>
              <div className="service_description">
                <p>
                  Motivational coaches focus on helping clients tap into their
                  inner resources and push themselves to achieve their goals and
                  lead more fulfilling lives.
                </p>

                <p>
                  It's important to note that while coaches often act as
                  cheerleaders for clients, motivational coaches understand that
                  real motivation comes from within.
                </p>
              </div>
              <div className="service_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div>
              <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/portrait-basketball-coach-with-player_23-2151098185.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
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
          </div>
        </div>
        {/* Our Product */}
        <div className="our_products" ref={ProductRef}>
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Our Products <PiArrowBendRightDownBold className="icon" />
            </h3>
          </div>
          <div className="All_Products">
            {/* Product */}
            <div className="Product">
              <div className="product_image">
                <img
                  src="https://img.freepik.com/premium-photo/gym-with-large-window-large-window-with-view-back-gym_1064589-39949.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                  alt="service_image"
                />
              </div>
              <div className="product_action">
                <div className="product_price">
                  <h5>Price : &nbsp;</h5>
                  <p>₹5000</p>
                </div>
                <div className="product_enquiry">
                  <a href="#" target="_blank" className="product_button">
                    Enquire Now <GrChat />
                  </a>
                </div>
              </div>
              <div className="product_title">
                <h5>Treadmills</h5>
              </div>
              <div className="product_description">
                <p>
                  Rather than the user powering a mill, the device provides a
                  moving platform with a wide conveyor belt driven by an
                  electric motor or a flywheel.
                </p>
                <p>
                  The belt moves to the rear, requiring the user to walk or run
                  at a speed matching the belt. The rate at which the belt moves
                  is the rate of walking or running.
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
              <div className="product_image">
                <img
                  src="https://img.freepik.com/premium-photo/machine-with-word-gears-it_9493-74095.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                  alt="service_image"
                />
              </div>
              <div className="product_action">
                <div className="product_price">
                  <h5>Price : &nbsp;</h5>
                  <p>₹7099</p>
                </div>
                <div className="product_enquiry">
                  <a href="#" target="_blank" className="product_button">
                    Enquire Now <GrChat />
                  </a>
                </div>
              </div>
              <div className="product_title">
                <h5>Exercise Bikes</h5>
              </div>
              <div className="product_description">
                <p>
                  Exercise bikes are used for exercise, to increase general
                  fitness, for weight loss, and for training for cycle events.
                </p>

                <p>
                  The exercise bike has long been used for physical therapy
                  because of the low-impact, safe, and effective cardiovascular
                  exercise it provides.
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
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              For Payment <PiArrowBendRightDownBold className="icon" />
            </h3>
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
                <p>Auntony</p>
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
                To Karthick
                <LiaHandPointDownSolid />
              </h4>
            </div>
            <div className="qr_image">
              <img
                src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid"
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
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Gallery <PiArrowBendRightDownBold className="icon" />
            </h3>
          </div>

          <div className="all_gallerys">
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/free-photo/female-instructor-giving-training-young-woman-exercising-with-dumbbell_23-2147827948.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/free-photo/dumbbells-arrangement-gym_23-2150007137.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/premium-photo/commercial-gym-equipment-room-background-with-black-walls_1092689-36688.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/free-photo/cast-iron-dumbbell-weights_1048-11523.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/premium-photo/participate-fitness-challenge-exercise-rou-generative-ai_1198283-94300.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114221.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
          </div>
        </div>
        {/* Videos */}
        <div className="video" ref={VideoRef}>
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Videos <PiArrowBendRightDownBold className="icon" />
            </h3>
          </div>

          <div className="videos_container">
            <div className="video_image">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/eaRQF-7hhmo?si=rhJXPt75nvOfwQV1"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="video_image">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/24fdcMw0Bj0?si=82wS4nfudZoDuTly"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        {/* Opentime */}
        <div className="row_5" ref={TimeRef}>
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Open&Close Time <PiArrowBendRightDownBold className="icon" />
            </h3>
            {/* Contact */}
          </div>
          <div className="time_list_container">
            <div className="time_list">
              <div className="day">
                <span>Monday</span>
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
                <span>Tuesday</span>
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
                <span>Wednesday</span>
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
                <span>Thursday</span>
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
                <span>Friday</span>
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
                <span>Weekend Days</span>
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
        <div className="Testimonial" ref={TestimonialRef}>
        <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Testimonial <PiArrowBendRightDownBold className="icon" />
            </h3>
            {/* Contact */}
          </div>
          <div className="testimonial_container">
            <Carousel
              showThumbs={true}
              showStatus={true}
              infiniteLoop
              autoPlay
            >
              <div className="testimonial_list">
                <div className="client_feedback">
                  <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel repellendus a ut! Architecto quis error porro nemo
                    beatae perspiciatis omnis?
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
                  <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel repellendus a ut! Architecto quis error porro nemo
                    beatae perspiciatis omnis?
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
                  <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel repellendus a ut! Architecto quis error porro nemo
                    beatae perspiciatis omnis?
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
                  <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel repellendus a ut! Architecto quis error porro nemo
                    beatae perspiciatis omnis?
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
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Live Location <PiArrowBendRightDownBold className="icon" />
            </h3>
          </div>

          <div className="google_map">
            <HtmlRenderer
              htmlString={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650172790676!2d80.23659527507537!3d13.044262813281074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAristostech%20India%20Pvt%20Ltd%20Software%20Company%20%26%20Website%20Design%20Experts!5e0!3m2!1sen!2sin!4v1724171244060!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}
            />
          </div>
        </div>
        {/* Feedback */}
        <div className="feedback_row" ref={FeedbackRef}>
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Feedback <PiArrowBendRightDownBold className="icon" />
            </h3>
            {/* Contact */}
          </div>
     
        </div>
        {/* Inquries */}
        <div className="Inquries" ref={InquiryRef}>
          <div className="BEAUTY_PARLOR_LIVE_TITLE">
            <h3>
              Inquries <PiArrowBendRightDownBold className="icon" />
            </h3>
          </div>
      
        </div>
        {/* Footer */}
        <div className="Gym_Footer">
          <div className="gym_footer_container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill={style.$second_back__color}
                fill-opacity="1"
                d="M0,96L24,90.7C48,85,96,75,144,58.7C192,43,240,21,288,48C336,75,384,149,432,176C480,203,528,181,576,170.7C624,160,672,160,720,154.7C768,149,816,139,864,117.3C912,96,960,64,1008,48C1056,32,1104,32,1152,53.3C1200,75,1248,117,1296,138.7C1344,160,1392,160,1416,160L1440,160L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
              ></path>
            </svg>
            <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BEAUTY_PARLOR_LIVE;
