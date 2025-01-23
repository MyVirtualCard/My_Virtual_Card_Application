import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign1.scss";
import banner_img from "../../assets/AllVCard_Image/VCard1/background2.jpg";
import gall1 from "../../assets/AllVCard_Image/VCard1/qrcode_back_image.jpg";
import gall2 from "../../assets/AllVCard_Image/VCard1/programming-background-collage.jpg";
import gall3 from "../../assets/AllVCard_Image/VCard1/new_card_design3.2.jpg";
import avatar from "../../assets/AllVCard_Image/VCard1/profile.png";
import graph5 from "../../assets/AllVCard_Image/VCard1/graph6.png";
import cross from "../../assets/AllVCard_Image/VCard1/cross.gif";

import service_graph from "../../assets/AllVCard_Image/VCard1/service_graph.png";
import feedback_svg from "../../assets/AllVCard_Image/VCard1/feedback_svg.svg";
import arrow from "../../assets/AllVCard_Image/VCard1/arrow4.jpg";
import arrow2 from "../../assets/AllVCard_Image/VCard1/arrow2.jpg";
import { Link, useParams } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
//Product
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// import Carousel1 from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
//Carousel Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//QRCODE:

import qrcode from "../../assets/AllVCard_Image/VCard1/qr.svg";

// ProductSlider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import vCardsJS from "vcards-js";
import { Triangle } from "react-loader-spinner";
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

const NewCardDesign1 = () => {
  let [AllData, setAllData] = useState();
  let [SiteLoader, setSiteLoader] = useState(false);
  console.log(AllData);
  let [share, setShare] = useState(false);
  //create a new vCard
  var vCard = vCardsJS();

  function generateVCF() {
    //set properties
    vCard.firstName = "Jayakumar";
    vCard.middleName = "";
    vCard.lastName = "V";
    vCard.organization = "Aristostech India Private Limited,CEO";
    vCard.photo.attachFromUrl(
      "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1714999372~exp=1715002972~hmac=148ead13ab2f0dc4db7268fb984501266e0547e55d0bd1a6918e3e51ca5a5af4&w=740",
      "JPEG"
    );
    vCard.workPhone = "+91 9344482370";
    vCard.birthday = new Date(1985, 0, 1);
    vCard.title = "Bussiness Man";
    vCard.url = "https://www.aristostechindia.com/";
    vCard.note = "Notes on Eric";

    //save to file
    // vCard.saveToFile('./eric-nesser.vcf');
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", `data:,${vCard.getFormattedString()}`);
    linkElement.setAttribute("download", "card.vcf");
    linkElement.style.display = "none";
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  }

  let [serviceLoad, setServiceLoad] = useState(false);

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
  let id = useParams();
  let [formData, setFormData] = useState({
    clientFullName1: "",
    clientEmail1: "",
    clientMobileNumber1: "",
    clientInquiries1: "",
  });
  //Popup show :
  let [popup, setPopup] = useState(false);
  //Form Submit loader :
  let [loading, setLoading] = useState(false);
  //Collect form data by using useRef:
  let form = useRef();
  let popUp_open = {
    hide: { opacity: 0, scale: 0.2 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" },
    },
  };
  //recieve email and send email to user by  emailJS:
  const sendEmail = (e) => {
    // e.preventDefault();

    emailjs
      .sendForm(
        "service_8jjtsu7",
        "template_5ro61jb",
        form.current,
        "6JJQhAKoQ9fGApzig"
      )
      .then(
        (result) => {
          // console.log(result.text);
          // console.log('message sent success')
        },
        (error) => {
          // console.log(error.text);
        }
      );
  };
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
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  //Form Logic :
  let feedbackFormik = useFormik({
    initialValues: {
      userName: "",
      userFeedback: "",
      currentRatting: 0,
    },

    //Validation :
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Min 3 char required")
        .max(50, "Name must be 20 character or less")
        .required("Name is required"),
      userFeedback: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(400, "Feedback must be 100 character or less")
        .required("Feedback is required"),
    }),
    //Form Submit :
    onSubmit: async (values) => {
      setFeedbackForm({
        userName: values.userName,
        userFeedback: values.userFeedback,
        currentRatting: values.currentRatting,
      });
      feedBackSubmit();
      setTimeout(() => {
        feedbackFormik.values.userName = "";
        feedbackFormik.values.userFeedback = "";
        feedbackFormik.values.currentRatting = 0;
      }, 4000);
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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  document.addEventListener("scroll", () => {
    let card = document.getElementById("card_design_box5");

    const scrollTop = window.scrollY;
    const cardHeight = card.scrollHeight - card.clientHeight;
    const winHeight = card.clientHeight;

    const scrollPercentage = (scrollTop / cardHeight) * 100;
    document.getElementById("progress_bar").style.height =
      scrollPercentage + "%";
  });
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  const currentUrl = window.location.pathname; // Full URL
  async function fetchAllData() {
    setSiteLoader(true);
    try {
      await api
        .get(`/vcard/allDataAPI${currentUrl}`)
        .then((res) => {
          setAllData(res.data.data);
          setSiteLoader(false);
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

  return (
    <>
      {SiteLoader ? (
        <div className="newDesignLoader">
          <small>Loading .....</small>
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          {AllData != undefined ? (
            <div className="newCard_design_container">
              <div id="card_design_box5">
                <div className="progress_container">
                  <div id="progress_bar"></div>
                </div>
                <div>
                  {/* Banner */}
                  {AllData.Vcard_URL.map((data, index) => {
                    return (
                      <div className="card5_box1" key={index}>
                        <div className="banner">
                          <img src={data.Banner || banner_img} alt="banner" />

                          <div className="svg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1440 370"
                            >
                              <path
                                fill="#ffffff"
                                fill-opacity="1"
                                d="M0,192L1440,0L1440,320L0,320Z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="logo">
                          <img src={data.Profile || avatar} alt="logo" />
                        </div>
                        {AllData.BasicDetails.map((data, index) => {
                          return (
                            <div className="user_details" key={index}>
                              <div className="name">
                                <h4>
                                  {data.FirstName}&nbsp;{data.LastName}
                                </h4>
                                <small>{data.JobTitle}</small>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  {/* socialMedia */}
                  {AllData.SocialMediaModel.length > 0 ? (
                    <>
                      {AllData.SocialMediaModel.map((data, index) => {
             
                        return (
                          <div className="card5_box2" key={index}>
                            <div className="empty_place"></div>
                            <div className="social_media">
                              {data.Facebook.length > 0 || data.Facebook ? (
                                <div className="link">
                                  <a href={data.Facebook} target="_blank">
                                    <i className="bx bxl-facebook"></i>
                                    <img src={graph5} alt="graph" />
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                              {data.WhatsUp.length > 0 || data.WhatsUp ? (
                                <div className="link">
                                  <a
                                    href={`https://wa.me/${data.WhatsUp}?text=Hello%20there!`}
                                    target="_blank"
                                  >
                                    <i className="bx bxl-whatsapp"></i>
                                    <img src={graph5} alt="graph" />
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                              {data.LinkedIn.length > 0 || data.LinkedIn ? (
                                <div className="link">
                                  <a href={data.LinkedIn} target="_blank">
                                    <i className="bx bxl-linkedin"></i>
                                    <img src={graph5} alt="graph" />
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                              {data.Instagram.length > 0 || data.Instagram ? (
                                <div className="link">
                                  <a href={data.Instagram} target="_blank">
                                    <i className="bx bxl-instagram"></i>
                                    <img src={graph5} alt="graph" />
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}

                              {data.Twiter.length > 0 || data.Twiter ? (
                                <div className="link">
                                  <a href={data.Twiter} target="_blank">
                                    <i className="bx bxl-twitter"></i>
                                    <img src={graph5} alt="graph" />
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                              {data.Website.length > 0 || data.Website ? (
                                <div className="link">
                                  <a href={data.Website} target="_blank">
                                    <i className="bx bx-globe"></i>
                                    <img src={graph5} alt="graph" />
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                  {/* summary */}
                  {AllData.Vcard_URL.length > 0 ? (
                    <>
                      {AllData.Vcard_URL.map((data, index) => {
                        console.log(data.Facebook);
                        return (
                          <div className="card5_box3" key={index}>
                            <div className="summary">
                              <small>{data.Description}</small>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}

                  {/* Contact */}
                  {AllData.BasicDetails.length > 0 ? (
                    <>
                      {AllData.BasicDetails.map((data, index) => {
                        return (
                          <div className="card5_box4" key={index}>
                            <div className="contact_container">
                              <div className="contact_box">
                                <div className="icon">
                                  <i className="bx bxs-envelope"></i>
                                </div>

                                <div className="contact_detail">
                                  <h4>
                                    {data.Email || "kodiyarasu01@gmail.com"}{" "}
                                  </h4>
                                  <small>Email</small>
                                </div>
                              </div>
                              <div className="contact_box">
                                <div className="icon">
                                  <i className="bx bxs-phone-call"></i>
                                </div>

                                <div className="contact_detail">
                                  <h4>{data.MobileNumber}</h4>
                                  <small>Mobile Number</small>
                                </div>
                              </div>

                              <div className="contact_box">
                                <div className="icon">
                                  <i className="bx bx-current-location"></i>
                                </div>

                                <div className="contact_detail">
                                  <h4>{data.Location}</h4>
                                  <small>Location</small>
                                </div>
                              </div>
                            </div>
                            <div className="add_to_contact">
                              <button onClick={generateVCF}>
                                <i className="bx bxs-contact"></i>Add To Contact
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}

                  {/* services */}
                  {AllData.ServiceData.length > 0 ? (
                    <>
                      <div className="card5_box5">
                        <div className="svg_top">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                          >
                            <path
                              fill="#68907a"
                              fill-opacity="1"
                              d="M0,192L1440,32L1440,320L0,320Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="service_title">
                          <img src={arrow} alt="arrsow" />
                          <h4>Our Services</h4>
                          <img src={arrow2} alt="arrsow" />
                        </div>

                        <div className="service_container">
                          {AllData.ServiceData.map((data, index) => {
                            return (
                              <div className="service_box" key={index}>
                                <div className="icon">
                                  <img
                                    width="48"
                                    height="48"
                                    src={data.ServiceImage}
                                    alt="goal--v1"
                                  />
                                </div>
                                <div className="service_detail">
                                  <h3>{data.ServiceName}</h3>
                                  <small>{data.ServiceDescription}</small>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="svg_bottom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                          >
                            <path
                              fill="#68907a"
                              fill-opacity="1"
                              d="M0,288L1440,128L1440,0L0,0Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {/* Appoinment */}
                  <div className="card5_box6">
                    <div className="appoinment_title">
                      <img src={arrow} alt="arrsow" />
                      <h4>Make An Appoinment</h4>
                      <img src={arrow2} alt="arrsow" />
                    </div>
                    <div className="appoinment_container">
                      <form action="">
                        <div className="form_group">
                          <label htmlFor="date">Date of Visiting</label>
                          <input
                            type="date"
                            placeholder="pick date"
                            name="date"
                            id="date"
                          />
                        </div>
                        <div className="form_group">
                          <label htmlFor="date">Time To Visit</label>
                          <div className="times">
                            <input
                              className="time_input"
                              type="text"
                              name="time"
                              id="time"
                              value="9.30 - 10.30"
                              readOnly
                            />
                            <input
                              className="time_input"
                              type="text"
                              name="time"
                              value="11.00 - 12.00"
                              id="time"
                              readOnly
                            />
                            <input
                              className="time_input"
                              type="text"
                              name="time"
                              value="1.00 - 02.00"
                              id="time"
                              readOnly
                            />
                            <input
                              className="time_input"
                              type="text"
                              name="time"
                              value="4.30 - 05.30"
                              id="time"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="form_submit">
                          <button>
                            <img
                              width="48"
                              height="48"
                              src="https://img.icons8.com/color/48/event-accepted.png"
                              alt="event-accepted"
                            />
                            Book Appoinment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* Gallery */}
                  {AllData.GalleryModel.length > 0 ? (
                    <>
                      <div className="card5_box7">
                        <div className="gallery_title">
                          <img src={arrow} alt="arrsow" />
                          <h4>Gallery</h4>
                          <img src={arrow2} alt="arrsow" />
                        </div>
                        <div className="gallery_container">
                          <div className="full_image" id="fullImageBox">
                            <div className="close_Full_Image_gallery">
                              <img
                                src={cross}
                                alt="cross"
                                onClick={closeFullImage}
                              />
                            </div>
                            <img
                              src={banner_img}
                              alt="gallery"
                              id="fullImage"
                            />
                          </div>
                          <div className="gallerys">
                            {AllData.GalleryModel.map((data, index) => {
                              return (
                                <>
                                  <img
                                    src={data.GalleryImage}
                                    alt="gallery"
                                    key={index}
                                    onClick={(e) => openFullImage(e.target.src)}
                                  />
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

                  {/* Testimonial */}
                  {AllData.TestimonialModel.length > 0 ? (
                    <>
                      <div className="card5_box8">
                        <div className="Testimonial5">
                          <div className="testimonial_title">
                            <img src={arrow} alt="arrsow" />
                            <h4>Testimonial</h4>
                            <img src={arrow2} alt="arrsow" />
                          </div>
                          <svg
                            className="qrsvg_bottom"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                          >
                            <path
                              fill="#68907a"
                              fill-opacity="1"
                              d="M0,288L1440,128L1440,0L0,0Z"
                            ></path>
                          </svg>

                          <svg
                            className="qrsvg_top"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                          >
                            <path
                              fill="#68907a"
                              fill-opacity="1"
                              d="M0,256L1440,0L1440,320L0,320Z"
                            ></path>
                          </svg>
                          <div className="testimonial_box">
                            <Carousel
                              autoPlay="true"
                              className="carousel"
                              showThumbs={false}
                            >
                              {AllData.TestimonialModel.map((data, index) => {
                                return (
                                  <div
                                    className="testimonial5_details"
                                    key={index}
                                  >
                                    <div className="user_profile">
                                      <img
                                        src={data.ClientImage || banner_img}
                                        alt="logo"
                                      />
                                    </div>

                                    <div className="user_detail">
                                      <h4>{data.ClientName}</h4>
                                      <small>{data.ClientFeedback}</small>
                                    </div>

                                    <div className="date">
                                      <small>{data.ClientReviewDate}</small>
                                    </div>
                                  </div>
                                );
                              })}
                            </Carousel>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {/* QRCode */}
                  {AllData.QRCodeModel
.length > 0 ? (
<>
<div className="card5_box9">
                    <div className="qrcode_title">
                      <img src={arrow} alt="arrsow" />
                      <h4>QR Code</h4>
                      <img src={arrow2} alt="arrsow" />
                    </div>
                    <div className="qrcode_container">
                      {AllData.QRCodeModel.map((data,index)=>{
                        return(
                          <div className="qrcode_box" key={index}>
                          <div className="logo">
                            <img src={banner_img} alt="logo" />
                          </div>
                          <div className="qrcode">
                            <img src={data.QRCodeImage} alt="qrcode" />
                          </div>
                        </div>
                        )
                      })}
                   
                    </div>
                  </div>
</>
                  ) : ''}
              
                  {/* Feedback */}
                  <div className="card5_box10">
                    <div className="feedback_title">
                      <img src={arrow} alt="arrsow" />
                      <h4>Your Opinion</h4>
                      <img src={arrow2} alt="arrsow" />
                    </div>
                    <div className="feedback_container">
                      {/* <div className="form_svg_top">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,0L60,32C120,64,240,128,360,160C480,192,600,192,720,208C840,224,960,256,1080,261.3C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div> */}
                      <div className="form_svg_bottom">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1440 320"
                        >
                          <path
                            fill="#ffffff"
                            fill-opacity="1"
                            d="M0,192L205.7,256L411.4,224L617.1,224L822.9,192L1028.6,192L1234.3,288L1440,160L1440,0L1234.3,0L1028.6,0L822.9,0L617.1,0L411.4,0L205.7,0L0,0Z"
                          ></path>
                        </svg>
                      </div>
                      <form action="" onSubmit={feedbackFormik.handleSubmit}>
                        <div className="feedback_svg">
                          <img src={feedback_svg} alt="feedback" />
                        </div>
                        <div className="form_group">
                          <label
                            htmlFor="clientName_Input"
                            className={`${
                              feedbackFormik.errors.userName ? "error" : ""
                            } `}
                          >
                            {feedbackFormik.touched.userName &&
                            feedbackFormik.errors.userName
                              ? feedbackFormik.errors.userName
                              : "Your Name"}
                            <span>
                              <sup>*</sup>
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Name"
                            name="userName"
                            id="userName"
                            // value={userName}
                            // onChange={(e)=>setUserName(e.target.value)}
                            value={feedbackFormik.values.userName}
                            onChange={feedbackFormik.handleChange}
                            onBlur={feedbackFormik.handleBlur}
                          />
                        </div>
                        <div className="form_group">
                          <label
                            htmlFor="clientFeedBack_Input"
                            className={`${
                              feedbackFormik.errors.userFeedback ? "error" : ""
                            } `}
                          >
                            {feedbackFormik.touched.userFeedback &&
                            feedbackFormik.errors.userFeedback
                              ? feedbackFormik.errors.userFeedback
                              : "Your FeedBack"}
                            <span>
                              <sup>*</sup>
                            </span>
                          </label>
                          <textarea
                            id="userFeedback"
                            name="userFeedback"
                            cols="30"
                            rows="7"
                            placeholder="Enter your Feedback"
                            // value={userFeedback}
                            // onChange={(e)=>setUserFeedback(e.target.value)}
                            value={feedbackFormik.values.userFeedback}
                            onChange={feedbackFormik.handleChange}
                            onBlur={feedbackFormik.handleBlur}
                          ></textarea>
                        </div>
                        <div className="form_group">
                          <label
                            htmlFor="clientName_Input"
                            className={`${
                              feedbackFormik.errors.currentRatting
                                ? "error"
                                : ""
                            } `}
                          >
                            {feedbackFormik.touched.currentRatting &&
                            feedbackFormik.errors.currentRatting
                              ? feedbackFormik.errors.currentRatting
                              : "Ratting"}
                            <span>
                              <sup>*</sup>
                            </span>
                          </label>
                          <div
                            className="ratting_container"
                            data-rating="0"
                            name="currentRatting"
                            id="currentRatting"
                            onMouseOver={handleRatting}
                            onMouseLeave={removeRatting}
                            onClick={RattingSetted}
                            // value={currentRatting}
                            // onChange={(e)=>setCurrentRatting(e.target.value)}
                            value={feedbackFormik.values.currentRatting}
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
                            <img
                              width="48"
                              height="48"
                              src="https://img.icons8.com/fluency/48/send-comment.png"
                              alt="send-comment"
                            />
                            Send Feedback
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* //Feedback messages */}
                    <div className="Feedback_container">
                      <div className="feeback_title">
                        {commentOpen ? (
                          <button onClick={() => setCommentOpen(false)}>
                            <i className="uil uil-feedback"></i>
                            Hide All Feedbacks
                          </button>
                        ) : (
                          <button onClick={() => setCommentOpen(true)}>
                            <i className="uil uil-feedback"></i>See All
                            Feedbacks
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
                  <div className="card5_box11">
                    <div className="inquiries_title">
                      <img src={arrow} alt="arrsow" />
                      <h4>Inquiries</h4>
                      <img src={arrow2} alt="arrsow" />
                    </div>
                    <div className="inquiries_container5">
                      <form action="">
                        <div className="form_group">
                          <label htmlFor="name">
                            Name <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <div className="input">
                            <input type="text" placeholder="Your Name" />
                            <img
                              width="100"
                              height="100"
                              src="https://img.icons8.com/clouds/100/guest-male.png"
                              alt="guest-male"
                            />
                          </div>
                        </div>
                        <div className="form_group">
                          <label htmlFor="name">
                            Email <sup style={{ color: "red" }}>*</sup>
                          </label>
                          <div className="input">
                            <input type="email" placeholder="Your Email" />
                            <img
                              width="100"
                              height="100"
                              src="https://img.icons8.com/clouds/100/new-post.png"
                              alt="new-post"
                            />
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
                            <img
                              width="100"
                              height="100"
                              src="https://img.icons8.com/clouds/100/phone.png"
                              alt="phone"
                            />
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
                              rows="5"
                              placeholder="Enter Your Message Here..."
                            ></textarea>
                            <img
                              width="100"
                              height="100"
                              src="https://img.icons8.com/clouds/100/speech-bubble.png"
                              alt="speech-bubble"
                            />
                          </div>
                        </div>
                        <div className="form_actions">
                          <button type="submit">
                            <img
                              width="48"
                              height="48"
                              src="https://img.icons8.com/fluency/48/submit-for-approval.png"
                              alt="submit-for-approval"
                            />
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="card4_box_12">
                    <div className="footer_container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                      >
                        <path
                          fill="#68907a"
                          fill-opacity="1"
                          d="M0,64L1440,224L1440,320L0,320Z"
                        ></path>
                      </svg>
                      <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default NewCardDesign1;
