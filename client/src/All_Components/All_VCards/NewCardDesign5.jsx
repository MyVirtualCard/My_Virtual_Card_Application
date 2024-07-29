import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign5.scss";
import banner_img from "../../assets/AllVCard_Image/VCard5/banner_img.jpg";
import avatar from "../../assets/AllVCard_Image/VCard5/avatar3.jpg";
import { Link, useParams } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-quill/dist/quill.snow.css";
// import Carousel from 'better-react-carousel';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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


//QRCODE:

import qrcode from "../../assets/AllVCard_Image/VCard5/qr.svg";
//Testimonial


// ProductSlider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import vCardsJS from "vcards-js";
const NewCardDesign5 = () => {
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


  // your custom dot component with prop `isActive`
const MyDot = ({ isActive }) => (
  <span
    style={{
      display: 'inline-block',
      height: isActive ? '8px' : '5px',
      width: isActive ? '8px' : '5px',
      background: '#1890ff'
    }}
  ></span>
);

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


  return (
    <>
      <div className="newCard_design6_container">
        <div id="card_design_box6">
          <div>
            {/* Banner */}
            <div className="card6_box_1">
              <img src={banner_img} alt="banner" />
              <div className="overlay"></div>
              <div className="logo">
                <img src={avatar} alt="logo`" />
              </div>
            </div>
            {/* BasicDetail */}
            <div className="card6_box_2">
              <div className="user_detail">
                <p>Kodiyarasu C</p>
                <small>UI&nbsp;/&nbsp;UX Designer</small>
              </div>
              <div className="summary">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos
                  numquam sapiente, voluptas enim atque quod omnis dolor nihil
                  reprehenderit illo exercitationem, architecto ratione totam
                  dicta.
                </p>
              </div>
            </div>
            {/* SocialMedias */}

            <div className="card6_box_3">
              <div className="social_medias">
                <a href="#">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-whatsapp"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-linkedin"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-twitter"></i>
                </a>
                <a href="#">
                  <i className="bx bx-globe"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-github"></i>
                </a>
              </div>
            </div>
            {/* Contact */}

            <div className="card6_box_4">
              <div className="contact_title">
                <h4>Contact </h4>
                <span></span>
              </div>
              <div className="contact_container">
                <div className="contact_box">
                  <div className="icon">
                    <i className="bx bxs-envelope"></i>
                  </div>
                  <div className="detail">
                    <p>kodiyarasu01@gmail.com</p>
                    <small>Email</small>
                  </div>
                </div>
                <div className="contact_box">
                  <div className="icon">
                    <i className="bx bxs-phone-call"></i>
                  </div>
                  <div className="detail">
                    <p>+91 8825457794</p>
                    <small>Mobile Number</small>
                  </div>
                </div>
                <div className="contact_box">
                  <div className="icon">
                    <i className="bx bxs-party"></i>
                  </div>
                  <div className="detail">
                    <p>26-01-2000</p>
                    <small>Date Of Birth</small>
                  </div>
                </div>
                <div className="contact_box">
                  <div className="icon">
                    <i className="bx bx-current-location"></i>
                  </div>
                  <div className="detail">
                    <p>Ariyalur , TamilNadu</p>
                    <small>Address</small>
                  </div>
                </div>
              </div>
              <div className="add_to_contact">
                <button onClick={generateVCF}>
                  <i className="bx bxs-contact"></i>Add To Contact
                </button>
              </div>
            </div>
            {/* Services */}
            <div className="card6_box_5">
              <div className="service_title">
                <h4>Our Services </h4>
                <span></span>
              </div>
              <div className="service_container">
                <div className="service_box">
                  <div className="service_image">
                    <i className="bx bxs-palette"></i>
                  </div>
                  <div className="service_title">
                    <h3>Color Paletee</h3>
                  </div>
                  <div className="service_summary">
                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quidem nostrum aliquam laudantium aut, possimus fugit!
                    </small>
                  </div>
                </div>
                <div className="service_box">
                  <div className="service_image">
                    <i className="bx bx-run"></i>
                  </div>
                  <div className="service_title">
                    <h3>UI / UX</h3>
                  </div>
                  <div className="service_summary">
                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quidem nostrum aliquam laudantium aut, possimus fugit!
                    </small>
                  </div>
                </div>
              </div>
            </div>
            {/* Appoinment */}
            <div className="card6_box_6">
              <div className="appoinment_title">
                <h4>Make An Appoinment</h4>
                <span></span>
              </div>
              <div className="appoinment_container">
                <form action="">
                  <div className="form_group">
                    <label htmlFor="date">Date :</label>
                    <input
                      type="date"
                      placeholder="pick date"
                      name="date"
                      id="date"
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="date">Hour :</label>
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
            <div className="card6_box_7">
              <div className="gallery_title">
                <h4>Gallery</h4>
                <span></span>
              </div>
             
              <div className="gallery_container">
              <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
              <img width="100%" src="https://picsum.photos/800/600?random=1" />
              <img width="100%" src="https://picsum.photos/800/600?random=2" />
              <img width="100%" src="https://picsum.photos/800/600?random=3" />
      </Carousel>

              </div>
            </div>
            {/* Products */}
            <div className="card6_box_8">
              <div className="product_title">
                <h4>Products</h4>
                <span></span>
              </div>
              <div className="product_container">
                <div className="product_box">
                  <div className="product_image">
                   <img src="https://img.freepik.com/free-vector/flat-ui-ux-landing-page-template_23-2149054885.jpg?size=626&ext=jpg&uid=R128523969&ga=GA1.1.2061007640.1708948018&semt=ais" alt="product" />
                  </div>
                  <div className="product_title">
                    <h3>No Headings</h3>
                    <small>₹ 1000</small>
                  </div>
                  <div className="product_summary">
                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    
                    </small>
                  </div>
                </div>
                <div className="product_box">
                  <div className="product_image">
                   <img src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051556.jpg?size=626&ext=jpg&ga=GA1.1.2061007640.1708948018&semt=ais" alt="product" />
                  </div>
                  <div className="product_title">
                    <h3>No Headings</h3>
                    <small>₹ 1000</small>
                  </div>
                  <div className="product_summary">
                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    
                    </small>
                  </div>
                </div>
                <div className="product_box">
                  <div className="product_image">
                   <img src="https://img.freepik.com/free-photo/ui-ux-representations-with-laptop_23-2150201871.jpg?size=626&ext=jpg&ga=GA1.1.2061007640.1708948018&semt=ais" alt="product" />
                  </div>
                  <div className="product_title">
                    <h3>No Headings</h3>
                    <small>₹ 1000</small>
                  </div>
                  <div className="product_summary">
                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    
                    </small>
                  </div>
                </div>
                <div className="product_box">
                  <div className="product_image">
                   <img src="https://img.freepik.com/free-vector/various-screens-violet-public-transport-mobile-app_23-2148704862.jpg?size=626&ext=jpg&ga=GA1.1.2061007640.1708948018&semt=ais" alt="product" />
                  </div>
                  <div className="product_title">
                    <h3>No Headings</h3>
                    <small>₹ 1000</small>
                  </div>
                  <div className="product_summary">
                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    
                    </small>
                  </div>
                </div>
              </div>
            
              </div>
              {/* Testimonial */}
              <div className="card6_box_9">
              <div className="testimonial_title">
                <h4>Testimonial</h4>
                <span></span>
              </div>
              <div className="Testimonial5">
           

                <div className="testimonial_box">
                  <Carousel autoPlay="true" className="carousel">
                    <div className="testimonial5_details">
                      <div className="user_profile">
                        <img src={banner_img} alt="logo" />
                      </div>

                      <div className="user_detail">
                        <h4>Jayakumar V</h4>
                        <small>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Repellat saepe soluta eveniet est modi obcaecati
                          beatae pariatur? Quo, rerum soluta?
                        </small>
                      </div>

                      <div className="date">
                        <small>__/__/____</small>
                      </div>
                    </div>
                    <div className="testimonial5_details">
                      <div className="user_profile">
                        <img src={avatar} alt="logo" />
                      </div>

                      <div className="user_detail">
                        <h4>Kodiyarasu C</h4>
                        <small>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Repellat saepe soluta eveniet est modi obcaecati
                          beatae pariatur? Quo, rerum soluta?
                        </small>
                      </div>

                      <div className="date">
                        <small>__/__/____</small>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
              </div>
              {/* QRCode */}
              <div className="card6_box_10">
              <div className="QRcode_title">
                <h4>QR Code</h4>
                <span></span>
              </div>
              <div className="qrcode_container">
              <div className="logo">
      <img src={avatar} alt="logo" />
     </div>
<div className="qrcode_box">
     
    
     <div className="qrcode">
      <img src={qrcode} alt="qrcode" />
     </div>
  
</div>
</div>
              </div>

              {/* Feedback */}

              <div className="card6_box_11">
                <div className="feedback_title">
                  <h4>Feedback</h4>
                  <span></span>
                </div>
                <div className="feedback_container">
         
            
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

              {/* Inquiries */}
              <div className="card6_box_12">
                <div className="inquries_title">
                  <h4>Inquiries</h4>
                  <span></span>
                </div>
                <div className="inquiries_container5">
            
            <form action="">
              <div className="form_group">
                <label htmlFor="name">
                  Name <sup style={{ color: "red" }}>*</sup>
                </label>
                <div className="input">
                  <input type="text" placeholder="Your Name" />
                  <img width="188" height="188" src="https://img.icons8.com/3d-fluency/188/user-male--v2.png" alt="user-male--v2"/>
                </div>
              </div>
              <div className="form_group">
                <label htmlFor="email">
                  Email <sup style={{ color: "red" }}>*</sup>
                </label>
                <div className="input">
                  <input type="email" placeholder="Your Email" />
                  <img width="188" height="188" src="https://img.icons8.com/3d-fluency/188/gmail.png" alt="gmail"/>
                </div>
              </div>
              <div className="form_group">
                <label htmlFor="name">
                  Phone <sup style={{ color: "red" }}>*</sup>
                </label>
                <div className="input">
                  <input type="tel" placeholder="Enter Phone Number" />
                  <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/phone.png" alt="phone"/>
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
          <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/speech-bubble-with-dots.png" alt="speech-bubble-with-dots"/>
                </div>
              </div>
              <div className="form_actions">
                  <button type="submit">
                  <img width="48" height="48" src="https://img.icons8.com/fluency/48/submit-for-approval.png" alt="submit-for-approval"/>
                   Submit
                  </button>
                </div>
            </form>
          </div>
                </div>
           
                  <div className="card6_box_13">
                  <div className="footer_container">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#224754" fill-opacity="1" d="M0,224L30,213.3C60,203,120,181,180,160C240,139,300,117,360,122.7C420,128,480,160,540,149.3C600,139,660,85,720,74.7C780,64,840,96,900,122.7C960,149,1020,171,1080,170.7C1140,171,1200,149,1260,154.7C1320,160,1380,192,1410,208L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
                <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
                </div>
                  </div>
         
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCardDesign5;
