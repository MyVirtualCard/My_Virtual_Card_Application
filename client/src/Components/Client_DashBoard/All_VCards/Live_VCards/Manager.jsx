import React, { useState, useEffect } from "react";
import "./Manager.scss";
import banner from "../../../assets/AllVCard_Image/VCard3/Banner.jpg";
import hand from "../../../assets/AllVCard_Image/VCard3/hand.gif";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typewriter, Cursor } from "react-simple-typewriter";
import { InquiryValidateSchema } from "../../../Helper/InquiryValidate";
import { AppoinmentValidateSchema } from "../../../Helper/AppoinmentValidate";

import axios from "axios";
import VCard_Loader from "../../../VCard_Loader/VCard_Loader";
const Manager = () => {
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
    ClientName: "",
    ClientFeedback: "",
    ClientRatting: 0,
  });
  //service
  const buttonStyle = {
    width: "20px",
    background: "none",
    opacity: 1,
    border: "0px",
    padding: "0px",
    borderRadius: "10px",
    fontSize: "10px",
    color: "orange",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <span className="material-symbols-outlined">swipe_left</span>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <span className="material-symbols-outlined">swipe_right</span>
      </button>
    ),
  };
  //Product
  const product_buttonStyle = {
    width: "20px",
    background: "none",
    opacity: 1,
    border: "0px",
    padding: "0px",
    borderRadius: "10px",
    fontSize: "10px",
    color: "white",
  };
  const product_properties = {
    prevArrow: (
      <button style={{ ...product_buttonStyle }}>
        <span className="material-symbols-outlined">swipe_left</span>
      </button>
    ),
    nextArrow: (
      <button style={{ ...product_buttonStyle }}>
        <span className="material-symbols-outlined">swipe_right</span>
      </button>
    ),
  };
  //Gallery Functionality
  //openFullImage preview:
  function openFullImage(pic) {
    let fullImageBox = document.getElementById("fullImageBox");
    let fullImage = document.getElementById("fullImage");
    fullImageBox.style.display = "block";
    fullImage.src = pic;
  }

  //Close FullImage Preview
  function closeFullImage() {
    let fullImageBox = document.getElementById("fullImageBox");

    fullImageBox.style.display = "none";
  }

  //Start Ratting:
  // let currentRatting=0;
  function handleRatting(e) {
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      let ratting = parseInt(star.dataset.rating, 10);
      highlightStar(ratting);
    }
  }
  //Remove Ratting:
  function removeRatting() {
    highlightStar(feedbackForm.currentRatting);
  }
  //Staring Setted
  function RattingSetted(e) {
    let starRating = document.querySelector(".ratting_container");
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      feedbackForm.currentRatting = parseInt(star.dataset.rating, 10);
      starRating.setAttribute("data-rating", feedbackForm.currentRatting);
      highlightStar(feedbackForm.currentRatting);
    }
  }

  //Highlight star color:
  function highlightStar(ratting) {
    let stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      if (index < ratting) {
        star.classList.add("highlight");
      } else {
        star.classList.remove("highlight");
      }
    });
  }
  //Feedback Form Logic :
  let feedbackFormik = useFormik({
    initialValues: {
      URL_Alies: window.location.pathname,
      ClientName: "",
      ClientFeedback: "",
      ClientRatting: 0,
    },

    //Validation :
    validationSchema: Yup.object({
      ClientName: Yup.string()
        .min(3, "Min 3 char required")
        .max(50, "Name must be 20 character or less")
        .required("Name is required"),
      ClientFeedback: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(400, "Feedback must be 100 character or less")
        .required("Feedback is required"),
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
          toast.success(res.data.data.message);
          setInquiryLoader(false);
          setSuccessMessage(res.data.message);
          feedbackFormik.values.ClientName = "";
          feedbackFormik.values.ClientFeedback = "";
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
  let [BasicData, setBasicData] = useState([]);
  let [VCardData, setVCardData] = useState([]);
  let [GalleryData, setGalleryData] = useState([]);
  let [TestimonialData, setTestimonialData] = useState([]);
  let [ProductData, setProductData] = useState([]);
  let [BlogData, setBlogData] = useState([]);
  let [ServiceData, setServiceData] = useState([]);
  let [QRCodeData, setQRCodeData] = useState([]);
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
FN:${BasicData.length > 0 ? BasicData[0].FirstName : ""}
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
      BasicData.length > 0 ? BasicData[0].FirstName : "card.vcf"
    }.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const currentUrl = window.location.pathname; // Full URL
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchAllData() {
    try {
      await api
        .get(`/vcard/allDataAPI${currentUrl}`)
        .then((res) => {
          setGoogleMapData(res.data.data.GoogleMapData);
          setVCard_URL_Data(res.data.data.Vcard_URL);
          setBasicData(res.data.data.BasicDetails);
          setSocialMediaData(res.data.data.SocialMediaModel);
          setGalleryData(res.data.data.GalleryModel);
          setTestimonialData(res.data.data.TestimonialModel);
          setServiceData(res.data.data.ServiceData);
          setProductData(res.data.data.ProductModel);
          setQRCodeData(res.data.data.QRCodeModel);
          setBussinessHourData(res.data.data.BussinessModel);
          setPopUpBannerData(res.data.data.PopupBannerModel);
          setManageContent(res.data.data.ManageContentData);

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
  }, [commentOpen]);
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  // Show loading spinner or message while loading
  if (SiteLoader) {
    return <VCard_Loader />;
  }
  return (
    <>
      {VCard_URL_Data != undefined ? (
        <div className="newcard_design11_container">
          
          <div className="newcard_design11_box">
            {/* popupbanner */}
            {PopUpBannerData.length > 0 &&
            ManageContentData[0].BannerActive == true ? (
              <>
                {PopUpBannerData.map((data, index) => {
                  return (
                    <>
                      <div
                        className="popup_container"
                        id={popupBannerToggle ? "popupShow" : "popupHide"}
                        key={index}
                      >
                        <div className="box">
                          <div
                            className="close_banner_icon"
                            onClick={() => setPopUpBannerToggle(false)}
                          >
                            <i className="bx bx-x"></i>
                          </div>
                          <div className="banner_title">
                            <h3>{data.BannerTitle || "Be In Touch"}</h3>
                          </div>
                          <div className="summary">
                            <p>
                              {data.BannerDescription ||
                                ` Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Quidem, ut?`}
                            </p>
                          </div>
                          <div className="action">
                            <a
                              href={`mailto:${data.BannerURL}`}
                              target="_blank"
                            >
                              {data.BannerButtonName || "Get In Touch"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              ""
            )}
            {/* Banner and logo and details and socialMedias */}
            {VCard_URL_Data.map((data, index) => {
              return (
                <>
                  <div className="row_1" key={index}>
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

                    <div className="user_details">
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
                      {BasicData.length > 0 ? (
                        <>
                          <div className="user_data">
                            {BasicData.map((data, index) => {
                              return (
                                <div key={index}>
                                  <h2>
                                    {data.FirstName || ""} {data.LastName || ""}
                                  </h2>
                                  <p>
                                    <span>
                                      <Typewriter
                                        words={[data.Profession]}
                                        loop={true}
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={200}
                                        deleteSpeed={100}
                                        delaySpeed={1000}
                                      />
                                    </span>
                                  </p>
                                </div>
                              );
                            })}

                            {SocialMediaData.length > 0 &&
                            ManageContentData[0].SocialMedia == true ? (
                              <>
                                {SocialMediaData.map((data, index) => {
                                  return (
                                    <div className="social_medias" key={index}>
                                      {data.Facebook != "" && data.Facebook ? (
                                        <a
                                          href={data.Facebook}
                                          className="social_media_icon"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-facebook"></i>
                                          <small>Facebook</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.WhatsUp != "" && data.WhatsUp ? (
                                        <a
                                          href={`https://wa.me/+91${data.WhatsUp}?text=Hello%20there!`}
                                          className="social_media_icon"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-whatsapp"></i>
                                          <small>Whatsup</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.Instagram != "" &&
                                      data.Instagram ? (
                                        <a
                                          href={data.Instagram}
                                          className="social_media_icon"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-instagram"></i>
                                          <small>Instagram</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.LinkedIn != "" && data.LinkedIn ? (
                                        <a
                                          href={data.LinkedIn}
                                          className="social_media_icon"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-linkedin-square"></i>
                                          <small>LinkedIn</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.Github != "" && data.Github ? (
                                        <a
                                          href={data.Github}
                                          className="social_media_icon"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-github"></i>
                                          <small>Github</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.Twiter != "" && data.Twiter ? (
                                        <a
                                          href={data.Twiter}
                                          className="social_media_icon"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-twitter"></i>
                                          <small>Twitter</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.Youtube != "" && data.Youtube ? (
                                        <a
                                          href={data.Youtube}
                                          className="social_media_icon"
                                          target="_blank"
                                        >
                                          <i className="bx bxl-youtube"></i>
                                          <small>Youtube</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {data.Website != "" && data.Website ? (
                                        <a
                                          href={data.Website}
                                          className="social_media_icon"
                                          target="_blank"
                                        >
                                          <i className="bx bx-globe"></i>
                                          <small>Website</small>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  );
                                })}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      ) : (
                        "No UserData Added!"
                      )}
                    </div>
                  </div>
                  {/* Summary */}
                  <div className="row_2">
                    <p>{data.Description || "No Description Added!"}</p>
                  </div>
                </>
              );
            })}

            {/* ContactDetails */}
            {BasicData.length > 0 &&
            ManageContentData[0].ContactDetails == true ? (
              <>
                <div className="row_3">
                  <div className="manager_title">
                    <h3>
                      <i className="bx bxs-phone-call"></i> Contact Details
                    </h3>
                    {/* Contact */}
                  </div>
                  {BasicData.map((data, index) => {
                    return (
                      <div className="contact_list_container" key={index}>
                        <a
                          href={`mailto:${data.Email ? data.Email : "#"}`}
                          className="contact_list"
                        >
                          <div className="icon">
                            <i class="bx bxl-gmail"></i>
                            <small>Email</small>
                          </div>

                          <div className="list_detail">
                            <p>{data.Email || "demo@virtual.in"}</p>
                          </div>
                        </a>
                        <a
                          href={`tel:${
                            data.MobileNumber ? data.MobileNumber : "#"
                          }`}
                          className="contact_list"
                        >
                          <div className="icon">
                            <i className="bx bx-mobile-vibration"></i>
                            <small>Mobile Number</small>
                          </div>

                          <div className="list_detail">
                            <p>
                              {data.MobileNumber
                                ? `(+91) ${data.MobileNumber}`
                                : "(+91) -----------"}
                            </p>
                          </div>
                        </a>
                        {data.AlternateEmail.length > 0 ? (
                          <a
                            href={`mailto:${
                              data.AlternateEmail ? data.AlternateEmail : "#"
                            }`}
                            className="contact_list"
                          >
                            <div className="icon">
                              <i className="bx bx-envelope"></i>
                              <small>Alternative Email</small>
                            </div>
                            <div className="list_detail">
                              <p>
                                {data.AlternateEmail ||
                                  "contact@aristostech.in"}
                              </p>
                            </div>
                          </a>
                        ) : (
                          ""
                        )}
                        {data.Location.length > 0 ? (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${
                              data.Location
                                ? data.Location
                                : "No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017"
                            }`}
                            className="contact_list"
                          >
                            <div className="icon">
                              <i className="bx bx-map-alt"></i>
                              <small>Address</small>
                            </div>
                            <div className="list_detail">
                              <p>{data.Location || "....."}</p>
                            </div>
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}

                  {/* AddtoContact */}
                  <div className="add_to_contact">
                    <button onClick={handleDownloadVCard}>
                      Add to Contact<i className="bx bxs-contact"></i>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Services */}
            {ServiceData.length > 0 && ManageContentData[0].Service == true ? (
              <>
                <div className="row_4">
                  <div className="manager_title">
                    <h3>
                      <i className="bx bx-dumbbell"></i> Our Services
                    </h3>
                  </div>

                  <div className="service_list_container">
                    <Slide
                      slidesToScroll={1}
                      slidesToShow={width < 0 ? 1 : 2}
                      indicators={true}
                      autoplay
                      {...properties}
                      autoplayInterval={1000}
                    >
                      {ServiceData.map((data, index) => {
                        return (
                          <div className="service_list" key={index}>
                            {/* <span className="material-symbols-outlined">
                            developer_mode
                          </span> */}
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
                                   src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                                    data.ServiceImage
                                  }`}
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
                            <div className="service_detail">
                              <div className="service_title">
                                <h4>{data.ServiceName || 'No Service Title'}</h4>
                              </div>
                              <a href={data.ServiceURL} className="view_service">
                                <small>View Service</small>
                                <i className="bx bx-link"></i>
                              </a>
                              <div className="service_summary">
                                <p>
                                  {data.ServiceDescription || 'No Description'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                     
                    </Slide>
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
                <div className="row_5">
                  <div className="manager_title">
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

            {/* Products */}
            {ProductData.length > 0 && ManageContentData[0].Product == true ? (
              <>
                <div className="row_7">
                  <div className="manager_title">
                    <h3>
                      <span className="material-symbols-outlined">
                        fitness_center
                      </span>
                      Our Products
                    </h3>
                    {/* Contact */}
                  </div>
                  <div className="product_list_container">
                    <Slide
                      slidesToScroll={1}
                      slidesToShow={width < 600 ? 1 : 1}
                      indicators={true}
                      autoplay
                      {...product_properties}
                      autoplayInterval={1000}
                    >
                      {ProductData.map((data, index) => {
                        return (
                          <>
                            <div className="product_list" key={index}>
                              <div className="product_image">
                                {data.ProductType == "ImageUpload" ? (
                                  <img
                                  src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                                    data.ProductImage
                                  }`}
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
                                        : "https://img.freepik.com/free-vector/hand-drawn-innovation-concept_23-2149171106.jpg?t=st=1724217740~exp=1724221340~hmac=f99ed80a22986882d6a8ec7e6f0dbdf799025cbb5ff345512c39f415a4ab2014&w=900"
                                    }
                                    alt="product"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="product_price">
                                <small>₹ &nbsp; {data.ProductPrice || 0}</small>
                                <i className="bx bxs-purchase-tag"></i>
                              </div>
                              <div className="product_details">
                                <h4>{data.ProductName || "No Product Name"}</h4>
                                <small>{data.ProductDescription || ""}</small>
                                <a href={data.ProductURL || ""}>
                                  <button>More details</button>
                                </a>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </Slide>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* //Appinment */}
            {VCard_URL_Data.length > 0 &&
            ManageContentData[0].Appoinment == true ? (
              <>
                <div className="row_6">
                  <div className="manager_title">
                    <h3>
                      <span className="material-symbols-outlined">groups</span>
                      Make An Appoinment
                    </h3>
                  </div>

                  <div className="appinment_form_container">
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
                          <option value=""></option>
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
                          <span class="material-symbols-outlined">
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

            {/* Gallery */}
            {GalleryData.length > 0 && ManageContentData[0].Gallery == true ? (
              <>
                <div className="row_8">
                  <div className="manager_title">
                    <h3>
                      <span className="material-symbols-outlined">
                        gallery_thumbnail
                      </span>
                      Gallery
                    </h3>
                    {/* Contact */}
                  </div>
                  <div className="gallery_container">
                    <div className="full_image" id="fullImageBox">
                      <div className="close_Full_Image_gallery">
                        <span
                          className="material-symbols-outlined"
                          onClick={closeFullImage}
                        >
                          cancel
                        </span>
                      </div>
                      <img src={banner} alt="gallery" id="fullImage" />
                    </div>
                    <div className="arrow">
                      <small>Scroll To</small>
                      <i className="bx bx-chevrons-right bx-fade-right"></i>
                    </div>
                    <div className="gallery_box">
                      <div className="click_image">
                        <img src={hand} alt="click" />
                      </div>
                      {GalleryData.map((data, index) => {
                        return (
                          <>
                            <div key={index}>
                              {data.GalleryType == "ImageUpload" ? (
                                <img
                                src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                                  data.GalleryImage
                                }`}
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
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {/* QRCode */}
            {QRCodeData.length > 0 && ManageContentData[0].QRCode == true ? (
              <>
                <div className="row_12">
                  <div className="fashion_title">
                    <h3>#&nbsp;Scan To Pay</h3>
                    {/* Contact */}
                  </div>
                  {QRCodeData.map((data, index) => {
                    return (
                      <div className="qrcode_container" key={index}>
                        <div className="qr_code_box">
                          <h4>
                            <small>Note :</small>If You want to buy any product
                            with us directly scan to pay easily!
                          </h4>

                          <img
                            src={
                              data.QRCodeImage ||
                              "https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?t=st=1722540928~exp=1722544528~hmac=37be49c02a6f26b2ee598eeec0fc1b4f8133a5107efef5c3360142d745b6b58e&w=740"
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              ""
            )}
            {/* Testimonial */}
            {TestimonialData.length > 0 &&
            ManageContentData[0].Testimonial == true ? (
              <>
                <div className="row_9">
                  <div className="manager_title">
                    <h3>
                      <span className="material-symbols-outlined">
                        settings_accessibility
                      </span>
                      Testimonial
                    </h3>
                    {/* Contact */}
                  </div>
                  <div className="testimonial_container">
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                      autoPlay
                    >
                      {TestimonialData.map((data, index) => {
                        return (
                          <div className="testimonial_list" key={index}>
                            <div className="client_feedback">
                              <small>
                                {data.ClientFeedback ||
                                  `Lorem ipsum dolor, sit amet consectetur adipisicing
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
                <div className="google_map_container">
                  <div className="manager_title">
                    <h3>Live Location</h3>
                  </div>

                  {GoogleMapData.map((data, index) => {
                    return (
                      <div className="google_map" key={index}>
                        <HtmlRenderer htmlString={data.GoogleIframe} />
                      </div>
                    );
                  })}
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
                <div className="row_10">
                  {/* <div className="rattingcar_image">
                    <img src={RattingCar_Image} alt="ratting" />
                  </div> */}
                  <div className="fashion_title">
                    <h3>
                      Feedback
                      <span className="material-symbols-outlined">reviews</span>
                    </h3>
                    {/* Contact */}
                  </div>
                  <div className="feedback_container">
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
                          <i className="bx bx-x"></i>
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
                        <div
                          className="ratting_container"
                          data-rating="0"
                          name="ClientRatting"
                          id="ClientRatting"
                          onMouseOver={handleRatting}
                          onMouseLeave={removeRatting}
                          onClick={RattingSetted}
                          value={feedbackForm.ClientRatting}
                          // onChange={(e)=>setCurrentRatting(e.target.value)}
                          // value={feedbackFormik.ClientRatting}
                          onChange={feedbackFormik.handleChange}
                          onBlur={feedbackFormik.handleBlur}
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
                          <span className="material-symbols-outlined">
                            send
                          </span>
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
                        {AllFeedBacks.map((data, index) => {
                          return (
                            <div className="message" key={index}>
                              <div className="user_detail">
                                <div className="profile">
                                  <img
                                    src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1722896783~exp=1722900383~hmac=3628f6befbe82fb4e2642e0c0f1f836c946ba70bb2e17c5d12d5c839123aeb12&w=740"
                                    alt="profile"
                                  />
                                </div>
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
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
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
                <div className="row_11">
                  <div className="fashion_title">
                    <h3>#&nbsp;Inquries</h3>
                  </div>
                  <div className="inquiries_container5">
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
            <div className="row_13">
              <div className="footer_container">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0s 1440 320">
                     <path
                       fill='orange'
                       fill-opacity="1"
                       d="M0,64L120,96C240,128,480,192,720,186.7C960,181,1200,107,1320,69.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                     ></path>
                   </svg> */}
                <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Manager;
