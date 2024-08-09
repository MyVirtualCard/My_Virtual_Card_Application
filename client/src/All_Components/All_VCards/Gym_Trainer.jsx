import React, { useState, useEffect } from "react";
import "./Gym_Trainer.scss";
import banner from "../../assets/AllVCard_Image/VCard3/Banner.jpg";
import hand from "../../assets/AllVCard_Image/VCard3/hand.gif";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { Toaster, toast } from "react-hot-toast";
import loadingBack from "../../assets/LandingPage_image/aristostech_company_background.jpg";
import trianglelogo from "../../assets/LandingPage_image/Triangle_logo.png";

const Gym_Trainer = () => {
  const [width, setWidth] = useState(window.innerWidth);
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  let [popupBannerToggle, setPopUpBannerToggle] = useState(false);
  const buttonStyle = {
    width: "0px",
    background: "none",
    opacity: 0,
    border: "0px",
    padding: "0px",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
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
  let [feedbackForm, setFeedbackForm] = useState({
    ClientName: "",
    ClientFeedback: "",
    ClientRatting: 0,
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
      console.log(values);
      setFeedbackLoader(true);
      await api
        .post(`/feedback${window.location.pathname}`, values)
        .then((res) => {
          toast.success(res.data.message);

          setFeedbackLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setFeedbackLoader(false);
        });
    },
  });
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
    highlightStar(feedbackForm.ClientRatting);
  }
  //Staring Setted
  function RattingSetted(e) {
    let starRating = document.querySelector(".ratting_container");
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      feedbackForm.ClientRatting = parseInt(star.dataset.rating, 10);
      starRating.setAttribute("data-rating", feedbackForm.ClientRatting);
      highlightStar(feedbackForm.ClientRatting);
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
  //Form Logic :
  let formik = useFormik({
    initialValues: {
      clientFullName1: "",
      clientEmail1: "",
      clientMobileNumber1: "",
      clientInquiries1: "",
    },

    //Validation :
    validationSchema: Yup.object({
      clientFullName1: Yup.string()
        .min(3, "Min 3 char required")
        .max(20, "Name must be 20 character or less")
        .required("Name is required"),
      clientEmail1: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      clientMobileNumber1: Yup.string()
        .min(10, "Invalid Mobile number")
        .max(10, "Invalid Mobile number")
        .required("MobileNumber is required"),
      clientInquiries1: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(100, "Inquiries must be 100 character or less")
        .required("Inquiries is required"),
    }),
    //Form Submit :
    onSubmit: (values) => {
      setFormData({
        clientFullName1: values.clientFullName1,
        clientEmail1: values.clientEmail1,
        clientMobileNumber1: values.clientMobileNumber1,
        clientInquiries1: values.clientInquiries1,
      });

      sendEmail();
      setLoading(!loading);
      setConfetti(true);
      setTimeout(() => {
        setPopup(!popup);
        setLoading(false);
        setConfetti(!confetti);
        formik.values.clientFullName1 = "";
        formik.values.clientEmail1 = "";
        formik.values.clientMobileNumber1 = "";
        formik.values.clientInquiries1 = "";
      }, 4000);

      setTimeout(() => {
        setPopup(false);
      }, 7000);
      StopConfetti();
    },
  });
  let [SiteLoader, setSiteLoader] = useState(false);

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
  const currentUrl = window.location.pathname; // Full URL
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  async function fetchAllData() {
    setSiteLoader(true);
    try {
      await api
        .get(`/vcard/allDataAPI${currentUrl}`)
        .then((res) => {
          console.log(res.data.data);
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
          setSiteLoader(false);
          setTimeout(() => {
            window.scrollTo(0, 0);
            setPopUpBannerToggle(true);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setSiteLoader(false);
        });
    } catch (error) {
      console.log(error);
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
  return (
    <>
      {SiteLoader ? (
        <div className="newDesignLoader1">
          <div className="loadingbackground">
            {/* <img src={loadingBack} alt="loading" className="aris_back" /> */}
          </div>
          <small>
            {" "}
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </small>
          {/* <Triangle
            visible={true}
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            className='logoLoader'
            style={{zIndex:1}}
          /> */}
          <img src={trianglelogo} alt="LOGO" className="aris_logo" />
        </div>
      ) : (
        <>
          {VCard_URL_Data != undefined ? (
            <div className="newcard_design10_container">
              <Toaster position="top-right" reverseOrder={false} />
              <div className="newcard_design10_box">
                {/* popupbanner */}
                {PopUpBannerData.length > 0 ? (
                  <>
                    {PopUpBannerData.map((data, index) => {
                      return (
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
                      );
                    })}
                  </>
                ) : (
                  ""
                )}

                {/* Banner and logo and details and socialMedias */}
                {VCard_URL_Data.map((data, index) => {
             
                  return (
                    <div className="row_1" key={index}>
                      <div className="banner_image">
                        {data.BannerType == "Paste_ImageAddress" ? (
                          <>
                            <img
                              src={
                                data.BannerAddress ||
                                "https://img.freepik.com/premium-photo/asian-young-male-fitness-trainer-gym_409674-11835.jpg?w=1060"
                              }
                              alt="banner_image"
                              className="banner"
                            />
                          </>
                        ) : (
                          ""
                        )}
                        {data.BannerType == "ImageUpload" ? (
                          <>
                            <img
                              src={
                                data.Banner ||
                                "https://img.freepik.com/premium-photo/asian-young-male-fitness-trainer-gym_409674-11835.jpg?w=1060"
                              }
                              alt="banner_image"
                              className="banner"
                            />
                          </>
                        ) : (
                          ""
                        )}

                        <div className="overlay"></div>
                      </div>

                      <div className="user_details">
                        <div className="user_logo">
                          {data.ProfileType == "ImageUpload" ? (
                            <>
                              <img
                                src={
                                  data.Profile ||
                                  "https://img.freepik.com/premium-vector/retro-vintage-gym-sport-bodybuilding-template-logo-designlogo-business-fitness-label-badge-gym-center_661039-4834.jpg?w=740"
                                }
                                alt="user_logo"
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {data.ProfileType == "Paste_ImageAddress" ? (
                            <img
                              src={
                                data.ProfileAddress ||
                                "https://img.freepik.com/premium-vector/retro-vintage-gym-sport-bodybuilding-template-logo-designlogo-business-fitness-label-badge-gym-center_661039-4834.jpg?w=740"
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
                                  <>
                                    <div key={index}>
                                      <h2>
                                        {data.FirstName || "Rajesh"}{" "}
                                        {data.LastName || "Kumar"}{" "}
                                      </h2>
                                      <p>{data.Profession || "Gym Trainer"}</p>
                                    </div>
                                  </>
                                );
                              })}

                              {SocialMediaData.length > 0 ? (
                                <>
                                  {SocialMediaData.map((data, index) => {
                                    return (
                                      <div
                                        className="social_medias"
                                        key={index}
                                      >
                                        {data.Facebook != "" &&
                                        data.Facebook ? (
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
                                            href={`https://wa.me/${data.WhatsUp}?text=Hello%20there!`}
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
                                        {data.LinkedIn != "" &&
                                        data.LinkedIn ? (
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
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Summary */}
                {VCard_URL_Data.length > 0 ? (
                  <div className="row_2">
                    <p>
                      {VCard_URL_Data[0].Description ||
                        `Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  nihil architecto quam quas error nisi sit, minima quos modi?
                  Aut recusandae distinctio odit vitae nostrum.`}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {/* ContactDetails */}
                {BasicData.length > 0 ? (
                  <>
                    <div className="row_3">
                      <div className="title">
                        <h3>
                          <i className="bx bxs-phone-call"></i> Contact Details
                        </h3>
                        {/* Contact */}
                      </div>

                      {BasicData.map((data, index) => {
                        return (
                          <div className="contact_list_container" key={index}>
                            <div className="contact_list">
                              <i className="bx bxl-gmail"></i>
                              <div className="list_detail">
                                <small>Email</small>
                                <p>{data.Email || "Email not initiated!"}</p>
                              </div>
                            </div>
                            <div className="contact_list">
                              <i className="bx bx-mobile-vibration"></i>
                              <div className="list_detail">
                                <small>Mobile Number</small>
                                <p>{data.MobileNumber || "+91 ......."}</p>
                              </div>
                            </div>
                            {data.AlternateEmail.length > 0 ? (
                              <>
                                <div className="contact_list">
                                  <i className="bx bx-envelope"></i>
                                  <div className="list_detail">
                                    <small>Alternate Email</small>
                                    <p>{data.AlternateEmail}</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {data.Location.length > 0 ? (
                              <>
                                <div className="contact_list">
                                  <i className="bx bx-map-alt"></i>
                                  <div className="list_detail">
                                    <small>Address</small>
                                    <p>{data.Location}</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {/* Services */}
                {ServiceData.length > 0 ? (
                  <>
                    <div className="row_4">
                      <div className="title">
                        <h3>
                          <i className="bx bx-dumbbell"></i> Our Services
                        </h3>
                        {/* Contact */}
                      </div>

                      <div className="service_list_container">
                        {ServiceData.map((data, index) => {
                          return (
                            <div className="service_list" key={index}>
                              {data.ServiceType == "Icon_Tag" ? (
                                <>
                                  <HtmlRenderer htmlString={data.ServiceIcon} />
                                </>
                              ) : (
                                ""
                              )}

                              {data.ServiceType == "ImageUpload" ? (
                                <img src={data.ServiceImage} alt="" />
                              ) : (
                                ""
                              )}
                              {/* <span className="material-symbols-outlined">sprint</span> */}

                              <div className="service_detail">
                                <div className="service_title">
                                  <h4>
                                    {data.ServiceName || "Physical Fitness"}
                                  </h4>
                                </div>
                                <div className="service_summary">
                                  <p>
                                    {data.ServiceDescription ||
                                      `Physical fitness is a form of physical fitness
            culture that involves training all major muscle
            groups`}
                                  </p>
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

                {/* Opentime */}
                {BussinessHourData.length > 0 ? (
                  <>
                    <div className="row_5">
                      <div className="title">
                        <h3>
                          <i className="bx bx-timer"></i>Open&Close Time
                        </h3>
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

                {/* Products */}
                {ProductData.length > 0 ? (
                  <>
                    <div className="row_7">
                      <div className="title">
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
                          slidesToShow={width < 600 ? 1 : 2}
                          indicators={true}
                          autoplay
                          {...properties}
                          autoplayInterval={1000}
                        >
                          {ProductData.map((data, index) => {
                            return (
                              <>
                                {/* ImageUpload */}
                                {data.ProductType == "ImageUpload" ? (
                                  <>
                                    <div className="product_list" key={index}>
                                      <div className="product_image">
                                        <img
                                          src={
                                            data.ProductImage != undefined ||
                                            data.ProductImage != null
                                              ? data.ProductImage
                                              : `https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114181.jpg?t=st=1722480930~exp=1722484530~hmac=b3e99f19f2f2261ec0d7c5f1da8914dbfa376f325e37125598579ea7d7eced3b&w=900`
                                          }
                                          alt="product"
                                        />
                                      </div>
                                      <div className="product_details">
                                        <h4>{data.ProductName || ""}</h4>
                                        <small>
                                          {" "}
                                          {data.ProductDescription || ""}
                                        </small>
                                        <button>
                                          ₹ &nbsp;{data.ProductPrice}
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}
                                {/* ImageURL */}

                                {data.ProductType == "Image_Address_Link" ? (
                                  <div className="product_list" key={index}>
                                    <div className="product_image">
                                      <img
                                        src={
                                          data.ProductImageLink != undefined ||
                                          data.ProductImageLink != null
                                            ? data.ProductImageLink
                                            : `https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114181.jpg?t=st=1722480930~exp=1722484530~hmac=b3e99f19f2f2261ec0d7c5f1da8914dbfa376f325e37125598579ea7d7eced3b&w=900`
                                        }
                                        alt="product"
                                      />
                                    </div>
                                    <div className="product_details">
                                      <h4>{data.ProductName || ""}</h4>
                                      <small>
                                        {" "}
                                        {data.ProductDescription || ""}
                                      </small>
                                      <button>
                                        ₹ &nbsp;{data.ProductPrice}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
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
                BasicData.length > 0 &&
                SocialMediaData.length > 0 ? (
                  <>
                    <div className="row_6">
                      <div className="title">
                        <h3>
                          <span className="material-symbols-outlined">
                            groups
                          </span>
                          Make An Appoinment
                        </h3>
                        {/* Contact */}
                      </div>

                      <div className="appinment_form_container">
                        <form className="appinment_form">
                          <div className="form_group">
                            <label htmlFor="date">Date</label>
                            <input
                              type="date"
                              name="data"
                              id="date"
                              className="date-input"
                            />
                          </div>
                          <div className="form_group">
                            <label htmlFor="time">Time</label>
                            <select name="time" id="time">
                              <option value="9:00 AM">9:00 AM</option>
                              <option value="11:00 AM">11:00 AM</option>
                              <option value="01:00 PM">01:00 PM</option>
                              <option value="03:00 PM">03:00 PM</option>
                            </select>
                          </div>
                          <div className="form_submit">
                            <button type="submit" className="submit-btn">
                              Book Now
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
                {GalleryData.length > 0 ? (
                  <>
                    <div className="row_8">
                      <div className="title">
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
                          {/* <div className="click_image">
                        <img src={hand} alt="click" className="clickImg" />
                      </div> */}
                          {GalleryData.map((data, index) => {
                            return (
                              <div key={index}>
                                {data.GallerType == "ImageUpload" ? (
                                  <img
                                    src={
                                      data.GalleryImage ||
                                      "https://img.freepik.com/free-photo/young-adult-doing-indoor-sport-gym_23-2149205565.jpg?t=st=1722483193~exp=1722486793~hmac=582b97347ecbf83a7f71abf16c7dc7dc6287bdaa892fd409e0391f81788d2e1a&w=900"
                                    }
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
                                      "https://img.freepik.com/free-photo/young-adult-doing-indoor-sport-gym_23-2149205565.jpg?t=st=1722483193~exp=1722486793~hmac=582b97347ecbf83a7f71abf16c7dc7dc6287bdaa892fd409e0391f81788d2e1a&w=900"
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
                    </div>
                  </>
                ) : (
                  ""
                )}
                {/* //QRCode */}
                {QRCodeData.length > 0 ? (
                  <>
                    <div className="QRCode_container">
                      <div className="title">
                        <h3>
                          <span className="material-symbols-outlined">
                            qr_code_scanner
                          </span>
                          Scan To Pay
                        </h3>
                      </div>
                      {QRCodeData.map((data, index) => {
                        return (
                          <div className="QRCode_box" key={index}>
                            <div className="qrimage">
                              <img
                                src={
                                  data.QRCodeImage ||
                                  "https://img.freepik.com/free-photo/development-with-abstract-background_1134-414.jpg?t=st=1723162343~exp=1723165943~hmac=55fd99c4770a22210cefeb7b94dbe98fa6e155a5e76122af8f5529587663969a&w=900"
                                }
                                alt=""
                              />
                            </div>
                            {VCard_URL_Data.map((data, index) => {
                              return (
                                <>
                                  <div className="userProfile" key={index}>
                                    <img
                                      src={
                                        data.Profile ||
                                        "https://img.freepik.com/free-vector/creative-nerd-logo-template_23-2149218769.jpg?t=st=1723167960~exp=1723171560~hmac=ba06d878628bba2f95c10f1952d53d78fd9466c8481f491daecca840a61c5782&w=740"
                                      }
                                      alt=""
                                    />
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {/* Testimonial */}
                {TestimonialData.length > 0 ? (
                  <>
                    <div className="row_9">
                      <div className="title">
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
                                    alt=""
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
                {GoogleMapData.length > 0 ? (
                  <>
                    <div className="google_map_container">
                      <div className="title">
                        <h3>
                          <span className="material-symbols-outlined">map</span>
                          Live Location
                        </h3>
                        {/* Contact */}
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
                {VCard_URL_Data.length > 0 ||
                BasicData.length > 0 ||
                SocialMediaData.length > 0 ? (
                  <>
                    <div className="row_10">
                      <div className="title">
                        <h3>
                          <span className="material-symbols-outlined">
                            reviews
                          </span>
                          Feedback
                        </h3>
                        {/* Contact */}
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
                                <i
                                  className="bx bxs-star star"
                                  data-rating="1"
                                ></i>
                              </span>
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="2"
                                ></i>
                              </span>
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="3"
                                ></i>
                              </span>
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="4"
                                ></i>
                              </span>
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="5"
                                ></i>
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
                  ""
                )}

                {/* Inquries */}
                {VCard_URL_Data.length > 0 ||
                BasicData.length > 0 ||
                SocialMediaData.length > 0 ? (
                  <>
                    <div className="row_11">
                      <div className="title">
                        <h3>
                          <span className="material-symbols-outlined">
                            reviews
                          </span>
                          Inquries
                        </h3>
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
                              <input
                                type="tel"
                                placeholder="Enter Phone Number"
                              />
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
                              <span className="material-symbols-outlined">
                                send
                              </span>
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
                {VCard_URL_Data.length > 0 ||
                BasicData.length > 0 ||
                SocialMediaData.length > 0 ? (
                  <>
                    <div className="row_12">
                      <div className="footer_container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1440 320"
                        >
                          <path
                            fill="#2d2d2ee1"
                            fillOpacity="1"
                            d="M0,64L120,96C240,128,480,192,720,186.7C960,181,1200,107,1320,69.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                          ></path>
                        </svg>
                        <p>
                          All Copyright Reserved &copy; 2024 myvirtualcard.in
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            "VCard  Data not been Initiated!"
          )}
        </>
      )}
    </>
  );
};

export default Gym_Trainer;
