import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign8.scss";
import banner_img from "../../assets/AllVCard_Image/VCard8/programming-background-collage.jpg";
import avatar from "../../assets/AllVCard_Image/VCard8/profile.png";
import "react-slideshow-image/dist/styles.css";
import { Link, useParams } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
//Service
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

//Carousel Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//QRCODE:

import qrcode from "../../assets/AllVCard_Image/VCard8/qr.svg";
//Testimonial
import { useContext } from "react";

// ProductSlider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import product1 from "../../assets/AllVCard_Image/VCard8/1.jpg";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Triangle } from "react-loader-spinner";
const NewCardDesign8 = () => {
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
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});
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

  // Function to handle click event
  const handleClick = () => {
    // Construct the WhatsApp API link
    const whatsappLink = `https://api.whatsapp.com/send?phone=${+918825457794}&amp;text=Hi there!`;

    // Open the WhatsApp link in a new tab
    window.open(whatsappLink, "_blank");
  };
  // useEffect(() => {
  //   let getAllUserData = async () => {
  //     setNewCardDesignLoader(true);
  //     await axios
  //       .get(
  //         `http://localhost:3001/vcard/getuser?id=${id.id}`
  //       )
  //       .then((res) => {
  //         setAllData(res.data.data);

  //         setNewCardDesignLoader(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setNewCardDesignLoader(false);
  //       });
  //   };
  //   getAllUserData();
  // }, []);
  let [NewCardDesignLoader, setNewCardDesignLoader] = useState(false);

  //AllFeedbackFetching:

  async function fetchAllMessage() {
    setFeedbackLoader(true);
    api
      .get(`/feedback/${id.id}`)
      .then((res) => {
        setAllFeedBacks(res.data.fetchData);
        setCommentOpen(!commentOpen);
        setFeedbackLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setCommentOpen(false);
        setFeedbackLoader(false);
      });
  }
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
  async function feedBackSubmit() {
    // e.preventDefault();
    await api
      .post(`/feedback/${id.id}`, feedbackForm)
      .then((res) => {
        try {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            transition: Flip,
          });
        } catch (error) {
          console.log(error);
          toast.error(res.data.error, {
            position: "top-center",
            autoClose: 2000,
            transition: Flip,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 2000,
          transition: Flip,
        });
      });
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
  const stripHtmlTags1 = (html) => {
    if (html === null || typeof html === "undefined") {
      return ""; // Return an empty string if html is null or undefined
    }
    const strippedHtml = html.replace(/(<([^>]+)>)/gi, "");
    return strippedHtml;
  };
  return (
    <>
      {NewCardDesignLoader ? (
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
        <div className="newCard_design_container">
          <div className="card_design_box">
            <ToastContainer
              closeOnClick
              autoClose={2000}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {/* Banner,logo,userName */}

            <div>
              <div className="box-1">
                <div className="banner">
                  <div className="banner_image">
                    <img src={banner_img} alt="banner" />
                  </div>

                  <div className="user_basic">
                    <div className="logo">
                      <img src={avatar} alt="logo" />
                    </div>
                    <div className="user_Name">
                      <p>{"Kodiyarasu"}</p>
                      <small>
                        FullStack Web Developer With <span>MERN</span>
                      </small>
                    </div>
                  </div>

                  <div className="svg_bottom">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                    >
                      <path
                        fill="#8edeec"
                        fill-opacity="1"
                        d="M0,32L34.3,48C68.6,64,137,96,206,106.7C274.3,117,343,107,411,117.3C480,128,549,160,617,176C685.7,192,754,192,823,208C891.4,224,960,256,1029,256C1097.1,256,1166,224,1234,197.3C1302.9,171,1371,149,1406,138.7L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              {/* //Summary */}
              <div className="box-2">
                <div className="user_Personal_Detail">
                  <div className="summary">
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Nulla, incidunt corrupti dignissimos amet asperiores quo
                      illum, molestiae quas maiores ipsa harum laudantium
                      temporibus excepturi blanditiis!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ContactDetails */}

            <div className="box-3">
              <div className="contact_details">
                <div className="box">
                  <i className="bx bxs-envelope"></i>
                  <div className="data">
                    <p> {"dummyemail@gmail.com"}</p>
                    <small>Email</small>
                  </div>
                </div>
                <div className="box">
                  <i className="bx bx-mail-send"></i>
                  <div className="data">
                    <p> {"dummy@gmail.com"}</p>
                    <small>Alternate Email</small>
                  </div>
                </div>
                <div className="box">
                  <i className="bx bxs-phone-call"></i>
                  <div className="data">
                    <p> {"+91 3546749752"}</p>
                    <small>Mobile Number</small>
                  </div>
                </div>
                <div className="box">
                  <i className="bx bx-phone-call"></i>
                  <div className="data">
                    <p> {"+91 63456464646"}</p>
                    <small>Alternate Mobile Number</small>
                  </div>
                </div>
                <div className="box">
                  <i className="bx bxs-happy-heart-eyes"></i>
                  <div className="data">
                    <p> {"22/01/2021"}</p>
                    <small>Date Of Birth</small>
                  </div>
                </div>
                <div className="box">
                  <i className="bx bx-map"></i>
                  <div className="data">
                    <p> {`Chennai , T-Nagar,Tamilnadu`}</p>
                    <small>Address</small>
                  </div>
                </div>
              </div>
            </div>

            {/* SocialMedias */}

            <div className="box-4">
              <div className="social_medias">
                <a href="#" target="_blank" title="website">
                  <i className="bx bx-globe"></i>
                </a>

                <a href="#" target="_blank" title="location">
                  <i className="bx bxs-map-alt"></i>
                </a>

                <a
                  href="#"
                  onClick={handleClick}
                  target="_blank"
                  title="whatsup"
                  id="whatsappLink"
                >
                  <i className="bx bxl-whatsapp"></i>
                </a>

                <a href="#" target="_blank" title="facebook">
                  <i className="bx bxl-facebook-circle"></i>
                </a>

                <a href="#" target="_blank" title="instagram">
                  <i className="bx bxl-instagram"></i>
                </a>

                <a href="#" target="_blank" title="youtube">
                  <i className="bx bxl-youtube"></i>
                </a>

                <a href="#" target="_blank" title="linkedin">
                  <i className="bx bxl-linkedin-square"></i>
                </a>

                <a href="#" target="_blank" title="github">
                  <i className="bx bxl-github"></i>
                </a>
              </div>
            </div>

            {/* products */}

            <div className="box-5">
              <div className="product_title">
                <h4>Products</h4>
              </div>

              <div className="products">
                <AutoplaySlider
                  infinite="true"
                  play={true}
                  cancelOnInteraction={false} // should stop playing on user interaction
                  interval={2000}
                >
                  <div className="product_item">
                    <img src={product1} alt="product" />
                    <p>{"......."}</p>

                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </small>
                    <button>
                      <p>₹5000</p>
                    </button>
                  </div>
                </AutoplaySlider>
              </div>
              <div className="all_products">
                <Link to="/all_products">
                  <i className="bx bx-chevrons-right bx-flashing"></i> See All
                  Products
                </Link>
              </div>
            </div>

            {/* Service */}

            <div className="box-6">
              <div className="service_title">
                <h4>Our Services</h4>
              </div>

              <div className="services">
                <div className="box">
                  <i className="bx bxl-deezer"></i>
                  <p>{"Digital Marketting"}</p>

                  <small>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptas maxime sapiente.
                  </small>
                </div>
              </div>
              <div className="all_services">
                <Link to="/all_services">
                  <i className="bx bx-chevrons-right bx-flashing"></i> See All
                  Services
                </Link>
              </div>
            </div>

            {/* gallery */}

            <div className="box-7">
              <div className="gallery_title">
                <h4>Gallery</h4>
              </div>
              <div className="gallery">
                <div>
                  <img src={banner_img} alt="gallery" />
                </div>
              </div>
            </div>

            {/* QRCode */}

            <div className="box-8">
              <div className="qrcode_title">
                <h4>QRCode Scan</h4>
              </div>

              <div className="qrcode">
                <div className="qrcode_images">
                  <img src={avatar} alt="logo" />
                  <i className="bx bx-chevrons-right bx-fade-left"></i>
                  <img src={qrcode} alt="qrcode" />
                </div>

                <svg
                  className="qrsvg_top"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#224675"
                    fill-opacity="1"
                    d="M0,0L40,16C80,32,160,64,240,69.3C320,75,400,53,480,42.7C560,32,640,32,720,58.7C800,85,880,139,960,176C1040,213,1120,235,1200,229.3C1280,224,1360,192,1400,176L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                  ></path>
                </svg>
                <svg
                  className="qrsvg_bottom"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#224675"
                    fill-opacity="1"
                    d="M0,224L80,213.3C160,203,320,181,480,149.3C640,117,800,75,960,85.3C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Testimonial`` */}

            <div className="box-12">
              <div className="testimonial_title">
                <h4>Testimonials</h4>
              </div>
              <div className="Testimonial">
                <div className="testimonial_box">
                  <Carousel autoPlay="true">
                    <div className="content">
                      <div className="user_Detail">
                        <img src={avatar} alt="logo" />

                        <div className="name">
                          <p>
                            {"Dummy Name"} <i className="bx bxs-heart"></i>
                          </p>

                          <span>
                            <i className="bx bxs-star bx-flashing"></i>
                            <i className="bx bxs-star bx-flashing"></i>
                            <i className="bx bxs-star bx-flashing"></i>
                            <i className="bx bxs-star bx-flashing"></i>
                            <i className="bx bxs-star bx-flashing"></i>
                          </span>
                        </div>
                      </div>
                      <div className="feedbacks">
                        <p>
                          <i className="uil uil-comment-alt-heart"></i>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Sunt dolores maiores.
                        </p>
                      </div>
                      <div className="feedback_date">
                        <i className="bx bx-like"></i>
                        <small>{"__/_/____"}</small>
                      </div>
                    </div>
                  </Carousel>
                </div>

                <svg
                  className="qrsvg_top"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#003253"
                    fill-opacity="1"
                    d="M0,0L480,160L960,96L1440,224L1440,320L960,320L480,320L0,320Z"
                  ></path>
                </svg>
                {/* <svg
                className="qrsvg_bottom"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#003253"
                  fill-opacity="1"
                  d="M0,256L180,192L360,96L540,160L720,256L900,96L1080,64L1260,128L1440,64L1440,0L1260,0L1080,0L900,0L720,0L540,0L360,0L180,0L0,0Z"
                ></path>
              </svg> */}
                <svg
                  className="qrsvg_bottom"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#003253"
                    fill-opacity="1"
                    d="M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,160C840,128,960,96,1080,112C1200,128,1320,192,1380,224L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Feedback */}

            <div className="box-9">
              <div className="feedback_title">
                <h4>Give Feedback</h4>
              </div>
              <form action="" onSubmit={feedbackFormik.handleSubmit}>
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
                  <div className="icon">
                    <i className="bx bx-mobile"></i>
                  </div>
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
                  <div className="icon">
                    <i className="bx bxs-comment-detail"></i>
                  </div>
                </div>
                <div className="form_group">
                  <label
                    htmlFor="clientName_Input"
                    className={`${
                      feedbackFormik.errors.currentRatting ? "error" : ""
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
                  <div className="icon">
                    <i className="bx bxs-award bx-tada"></i>
                  </div>
                </div>
                <div className="form_actions">
                  <button type="submit">Send Feedback</button>
                </div>
              </form>

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
                      <i className="uil uil-feedback"></i>See All Feedbacks
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
                    <div className="message">
                      <div className="user_detail">
                        <div className="profile">
                          <img src={avatar} alt="profile" />
                        </div>
                        <div className="details">
                          <div className="userName">
                            <p>
                              kodiyarasu
                              <i className="bx bxs-user-check"></i>
                            </p>
                          </div>
                          <div className="stars">
                            <div
                              className="ratting_container1"
                              // data-rating={data.currentRatting}
                              name="currentRatting"
                              // id="currentRatting"
                              // id={
                              //   data.currentRatting == 0
                              //     ? "noRatting"
                              //     : "" || data.currentRatting == 1
                              //     ? "singleRatting"
                              //     : "" || data.currentRatting == 2
                              //     ? "doubleRatting"
                              //     : "" || data.currentRatting == 3
                              //     ? "ThreeRatting"
                              //     : "" || data.currentRatting == 4
                              //     ? "fourRatting"
                              //     : "" || data.currentRatting == 5
                              //     ? "fullRatting"
                              //     : ""
                              // }
                              // value={data.currentRatting}
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
                        <span>Hi Makkale</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* EnquireyForm */}

            <div className="box-10">
              <div className="enquiry_title">
                <h4>Make Inquiries</h4>
              </div>
              <div className="equiry_container">
                <div className="enquiry_heading">
                  <h5> Be in Touch </h5>
                  <img
                    width="48"
                    height="48"
                    src="https://img.icons8.com/fluency/48/group-background-selected.png"
                    alt="group-background-selected"
                  />
                </div>
                <form action="" ref={form} onSubmit={formik.handleSubmit}>
                  {/* //First Name */}
                  <div className="form_group">
                    <label
                      htmlFor="clientFullName1"
                      className={`${
                        formik.errors.clientFullName1 ? "error" : ""
                      } `}
                    >
                      {formik.touched.clientFullName1 &&
                      formik.errors.clientFullName1
                        ? formik.errors.clientFullName1
                        : "FullName"}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Fullname "
                      name="clientFullName1"
                      id="clientFullName1"
                      value={formik.values.clientFullName1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="icon">
                      <i className="bx bxs-user"></i>
                    </div>
                  </div>
                  {/* //Last Name */}
                  <div className="form_group">
                    <label
                      htmlFor="clientEmail1"
                      className={`${
                        formik.errors.clientEmail1 ? "error" : ""
                      } `}
                    >
                      {formik.touched.clientEmail1 && formik.errors.clientEmail1
                        ? formik.errors.clientEmail1
                        : "Email"}

                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Eg : abc@gmail.com"
                      name="clientEmail1"
                      id="clientEmail1"
                      value={formik.values.clientEmail1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="icon">
                      <i className="bx bx-envelope"></i>
                    </div>
                  </div>
                  <div className="form_group">
                    <label
                      htmlFor="clientMobileNumber1"
                      className={`${
                        formik.errors.clientMobileNumber1 ? "error" : ""
                      } `}
                    >
                      {formik.touched.clientMobileNumber1 &&
                      formik.errors.clientMobileNumber1
                        ? formik.errors.clientMobileNumber1
                        : "Mobile Number"}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Eg : +91 456789714"
                      name="clientMobileNumber1"
                      id="clientMobileNumber1"
                      value={formik.values.clientMobileNumber1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="icon">
                      <i className="bx bx-mobile"></i>
                    </div>
                  </div>
                  <div className="form_group">
                    <label
                      htmlFor="clientInquiries1"
                      className={`${
                        formik.errors.clientInquiries1 ? "error" : ""
                      } `}
                    >
                      {formik.touched.clientInquiries1 &&
                      formik.errors.clientInquiries1
                        ? formik.errors.clientInquiries1
                        : "Fill your Quiries"}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <textarea
                      id="clientInquiries1"
                      name="clientInquiries1"
                      cols="30"
                      rows="7"
                      placeholder="Enter your Quiries"
                      value={formik.values.clientInquiries1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    <div className="icon">
                      <i className="bx bxs-comment-detail"></i>
                    </div>
                  </div>

                  <div className="form_actions">
                    <button type="submit">
                      Send Message{" "}
                      {loading ? <span className="form_loader"></span> : ""}
                    </button>
                  </div>

                  <motion.div className="popup_container">
                    {popup ? (
                      <motion.div
                        className="popup"
                        variants={popUp_open}
                        initial="hide"
                        animate="show"
                      >
                        <motion.i
                          onClick={() => setPopup(false)}
                          className="uil uil-times"
                        ></motion.i>
                        <h4>Thanks for your responce!</h4>
                        <small>{formData.name}</small>
                        <p>Your email successfully received </p>
                        <small>{formData.email}</small>
                        <small>Will let you know shortly...</small>
                      </motion.div>
                    ) : (
                      ""
                    )}
                  </motion.div>
                </form>
              </div>
            </div>

            {/* Footer */}

            <div className="box-11">
              {/* Copyrights */}
              <div className="copyright">
                <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewCardDesign8;
