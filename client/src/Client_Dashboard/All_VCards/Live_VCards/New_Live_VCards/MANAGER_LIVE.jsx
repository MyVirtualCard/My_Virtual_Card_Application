import React, { useEffect, useRef, useState } from "react";
import "./MANAGER_LIVE.scss";
//service Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FaHandPointDown } from "react-icons/fa";
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
import { Typewriter, Cursor } from "react-simple-typewriter";
import URLNotFound from "../../../404_Error_Page/404";
const MANAGER_LIVE = () => {
  let style = {
    $first_back__color: "#ffffff",
    $second_back__color: "#ffffff",
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
    <>
      {VCard_URL_Data.length > 0 ? (
        <div className="MANAGER_LIVE_CONTAINER">
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
                {VCard_URL_Data.length > 0 &&
                ManageContentData[0].Appoinment == true ? (
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
                    <p>A_ment</p>
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
          <div className="MANAGER_LIVE_CARD">
            {/* Banner and logo */}
            {VCard_URL_Data.map((data, index) => {
              return (
                <>
                  {/* LOGO AND BANNER */}
                  <div
                    className="Manager_Image_row_1"
                    ref={HomeRef}
                    key={index}
                  >
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
                      <div className="logo">
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
                      {/* basic Details */}
                      <div className="basic_row_2">
                        <div className="user_details">
                          <div className="user_data">
                            <div className="user_information">
                              <h2>
                                {VCard_URL_Data[0].FirstName || "John"} &nbsp;
                                {VCard_URL_Data[0].LastName || " Wick"}
                              </h2>
                              <p>
                                <Typewriter
                                  words={[
                                    VCard_URL_Data[0].Profession ||
                                      " Profession Empty",
                                  ]}
                                  loop={true}
                                  cursor
                                  cursorStyle="|"
                                  typeSpeed={200}
                                  deleteSpeed={100}
                                  delaySpeed={1000}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

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
                      {/* Mail */}
                      <a
                        href={`mailto:${data.Email ? data.Email : "#"}`}
                        target="_blank"
                      >
                        <MdOutgoingMail className="icon" />

                        <small>Mail</small>
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
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}
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
                <div className="about_row_4" ref={AboutRef}>
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      About Us <FaHandPointDown className="icon" />
                    </h3>
                  </div>

                  {AboutData.map((data, index) => {
                    return (
                      <>
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
                        <div className="TAXI_DRIVER_PREVIEW_DEMO_SUB_TITLE">
                          <h3>Our Specialities</h3>
                        </div>
                        <div className="specialities">
                          <p>
                            <HtmlRenderer
                              htmlString={data.Specialities || ""}
                            />
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              ""
            )}
            {/* Our Services */}
            {ServiceData.length > 0 && ManageContentData[0].Service == true ? (
              <>
                <div className="our_services" ref={ServiceRef}>
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Our Services <FaHandPointDown className="icon" />
                    </h3>
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
                          <div className="service_link">
                            <a
                              href={data.ServiceURL ? data.ServiceURL : ""}
                              target="_blank"
                            >
                              For More Details <TbUnlink />
                            </a>
                          </div>
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
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Our Products <FaHandPointDown className="icon" />
                    </h3>
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
                          {data.ProductURL != null ? (
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
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      For Payment <FaHandPointDown className="icon" />
                    </h3>
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
                      <div className="GYM_TRAINER_LIVE_SUB_TITLE">
                        <h4>Account Details :</h4>
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
                      <div className="GYM_TRAINER_LIVE_SUB_TITLE">
                        <h4>QR Code :</h4>
                      </div>
                      {UPIData.map((data, index) => {
                        return (
                          <>
                            <div className="qr_code_upi_name" key={index}>
                              <h4>{data.UPI_Type}</h4>
                            </div>
                            <div className="qr_image_box" key={index}>
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
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Gallery <FaHandPointDown className="icon" />
                    </h3>
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
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Videos <FaHandPointDown className="icon" />
                    </h3>
                  </div>

                  <div className="videos_container">
                    {VideoData.map((data, index) => {
                      return (
                        <div className="video_image" key={index}>
                          <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${data.Video.split('/')[3]}`}
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
            {/* Opentime */}
            {BussinessHourData.length > 0 &&
            ManageContentData[0].BussinessHour == true ? (
              <>
                <div className="row_5" ref={TimeRef}>
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Open&Close Time <FaHandPointDown className="icon" />
                    </h3>
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
            {/* Appoinment */}
            {VCard_URL_Data.length > 0 &&
            ManageContentData[0].Appoinment == true ? (
              <>
                <div className="Appoinment" ref={AppoinmentRef}>
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Appoinment <FaHandPointDown className="icon" />
                    </h3>
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
                        <TiTick
                          style={{ color: "lightgreen" }}
                          className="icon"
                        />
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
                      <div className="form_group">
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
                          className={
                            Appoinment_formik.errors.FullName &&
                            Appoinment_formik.touched.FullName
                              ? "input_error"
                              : "input_success"
                          }
                          //  className="date-input"
                        />
                      </div>
                      <div className="form_group">
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
                          className={
                            Appoinment_formik.errors.MobileNumber &&
                            Appoinment_formik.touched.MobileNumber
                              ? "input_error"
                              : "input_success"
                          }
                        />
                      </div>
                      <div className="form_group">
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
                          className={` date-input
                              ${
                                Appoinment_formik.errors.Date &&
                                Appoinment_formik.touched.Date
                              }
                                ? "input_error"
                                : "input_success"
                            `}
                        />
                      </div>
                      <div className="form_group">
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
                          className={` date-input
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
            {/* Testimonials */}
            {TestimonialData.length > 0 &&
            ManageContentData[0].Testimonial == true ? (
              <>
                <div className="Tesimonial" ref={TestimonialRef}>
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Testimonial
                      <FaHandPointDown className="icon" />
                    </h3>
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
                          <div className="testimonial_list">
                            <div className="client_feedback">
                              <small>
                                {data.ClientFeedback ||
                                  ` Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Vel repellendus a ut! Architecto quis error
                            porro nemo beatae perspiciatis omnis?`}
                              </small>
                            </div>
                            <div className="client_detail">
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
                <div className="google_map_container" ref={LocationRef}>
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Live Location <FaHandPointDown className="icon" />
                    </h3>
                  </div>

                  <div className="google_map">
                    <HtmlRenderer htmlString={GoogleMapData[0].GoogleIframe} />
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
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Feedback <FaHandPointDown className="icon" />
                    </h3>
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
                  <div className="MANAGER_LIVE_TITLE">
                    <h3>
                      Inquries <FaHandPointDown className="icon" />
                    </h3>
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
                        <TiTick style={{ color: "lightgreen" }} />
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
                          className={formik.errors.Email ? "labelError" : ""}
                        >
                          {formik.errors.Email ? formik.errors.Email : `Email`}
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
                          className={formik.errors.Message ? "labelError" : ""}
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
                              formik.errors.Message && formik.touched.Message
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
      ) : (
        <URLNotFound />
      )}
    </>
  );
};

export default MANAGER_LIVE;
