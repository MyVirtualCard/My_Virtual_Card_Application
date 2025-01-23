import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign7.scss";
import banner_img from "../../assets/AllVCard_Image/VCard7/background2.jpg";
import avatar from "../../assets/AllVCard_Image/VCard7/profile.png";
import website from "../../assets/AllVCard_Image/VCard7/website.png";
import { Link, useParams } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
// Service
import product1 from "../../assets/AllVCard_Image/VCard7/1.jpg";
import product2 from "../../assets/AllVCard_Image/VCard7/2.jpg";
import product3 from "../../assets/AllVCard_Image/VCard7/3.jpg";
import product4 from "../../assets/AllVCard_Image/VCard7/4.jpg";

//Product
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// import Carousel1 from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
//Carousel Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//QRCODE:

import qrcode from "../../assets/AllVCard_Image/VCard7/qr.svg";
//Testimonial
import { useContext } from "react";

// ProductSlider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import vCardsJS from "vcards-js";
const NewCardDesign7 = () => {
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
  console.log(serviceLoad);
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

  return (
    <>
      <div className="newCard_design4_container">
        <div className="card_design_box1">
          {/* Banner */}
          <div className="card4_box_1">
            <img src='https://img.freepik.com/free-photo/futuristic-business-scene-with-ultra-modern-ambiance_23-2151003782.jpg?t=st=1715255039~exp=1715258639~hmac=9fdee3586c0f8d986c8557c4f66ee55e85a858ba31d967d7262e6e7d6403f164&w=900' alt="banner" />
            <div className="overlay"></div>
            <div className="logo">
              <img src={avatar} alt="logo`" />
            </div>
          </div>
          {/* .BasicDetals */}
          <div className="card4_box_2">
            <div className="basic_detail">
              <h4>Kodiyarasu C</h4>
              <small>Full Stack Developer with MERN</small>
            </div>
            <div className="summary">
              <div className="title">
                <p>About Me</p>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/about.png"
                  alt="about"
                />
              </div>
              <div className="content">
                <small>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis aliquid quisquam, excepturi ducimus voluptas
                  asperiores molestiae reiciendis fugiat autem cumque.
                </small>
              </div>
            </div>
          </div>
          {/* socialMedia`` */}
          <div className="card4_box_3">
            <a href="#">
              <img src={website} alt="website" />
            </a>
            <a href="#">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/marker.png"
                alt="marker"
              />
            </a>
            <a href="#">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/whatsapp.png"
                alt="whatsapp"
              />
            </a>
            <a href="#">
              <img
                width="188"
                height="188"
                src="https://img.icons8.com/3d-fluency/188/instagram-new.png"
                alt="instagram-new"
              />
            </a>
            <a href="#">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/linkedin.png"
                alt="linkedin"
              />
            </a>
            <a href="#">
              <img
                width="188"
                height="188"
                src="https://img.icons8.com/3d-fluency/188/facebook-circled.png"
                alt="facebook-circled"
              />
            </a>
            <a href="#">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/twitter-circled.png"
                alt="twitter-circled"
              />
            </a>
            <a href="#">
              <img
                width="188"
                height="188"
                src="https://img.icons8.com/3d-fluency/188/github.png"
                alt="github"
              />
            </a>
          </div>

          {/* Contact */}
          <div className="card4_box_4">
            <div className="contact_title">
              <p>Contact Detail</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/doodle/48/mail-contact.png"
                alt="mail-contact"
              />
            </div>
            <div className="contact_container">
              
              <div className="contact_box">
            
                <div className="icon">
                  <img
                    width="188"
                    height="188"
                    src="https://img.icons8.com/3d-fluency/188/gmail.png"
                    alt="gmail"
                  />
                </div>
                <div className="detail">
                  <p>Kodiyarasi01@gmail.com</p>
                  <small>Email</small>
                </div>
              </div>
              <div className="contact_box">
           
                <div className="icon">
                  <img
                    width="94"
                    height="94"
                    src="https://img.icons8.com/3d-fluency/94/phone-disconnected.png"
                    alt="phone-disconnected"
                  />
                </div>
                <div className="detail">
                  <p>+91 8825457794</p>
                  <small>Mobile Number</small>
                </div>
              </div>
              <div className="contact_box">
           
                <div className="icon">
                  <img
                    width="94"
                    height="94"
                    src="https://img.icons8.com/3d-fluency/94/birthday--v1.png"
                    alt="birthday--v1"
                  />
                </div>
                <div className="detail">
                  <p>26-01-2000</p>
                  <small>Date Of Birth</small>
                </div>
              </div>
              <div className="contact_box">
           
                <div className="icon">
                  <img
                    width="94"
                    height="94"
                    src="https://img.icons8.com/3d-fluency/94/location.png"
                    alt="location"
                  />
                </div>
                <div className="detail">
                  <p>Chennai , T-Nagar,TamilNadu</p>
                  <small>Date Of Birth</small>
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
          <div className="card4_box_5">
            <div className="service_title">
              <p>Our Service </p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/doodle/48/service.png"
                alt="service"
              />
            </div>

            <div className="service_container">
              <div className="service_box">
                <div className="service_image">
                  <img src={product1} alt="product" />
                  <div className="tag">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-tag-marketing-growth-flatart-icons-flat-flatarticons.png"
                      alt="external-tag-marketing-growth-flatart-icons-flat-flatarticons"
                    />
                  </div>
                </div>
                <div className="service_detail">
                  <h4>FrontEnd Development</h4>
                  <small>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eos ab a quisquam quibusdam repellat nemo sapiente et ipsam
                    debitis cupiditate?
                  </small>
                </div>
         
              </div>
              <div className="service_box">
                <div className="service_image">
                  <img src={product2} alt="banner" />
                  <div className="tag">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-tag-marketing-growth-flatart-icons-flat-flatarticons.png"
                      alt="external-tag-marketing-growth-flatart-icons-flat-flatarticons"
                    />
                  </div>
                </div>
                <div className="service_detail">
                  <h4>Backend Development</h4>
                  <small>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eos ab a quisquam quibusdam repellat nemo sapiente et ipsam
                    debitis cupiditate?
                  </small>
                </div>
             
              </div>
              <div className="service_box">
                <div className="service_image">
                  <img src={product3} alt="banner" />
                  <div className="tag">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-tag-marketing-growth-flatart-icons-flat-flatarticons.png"
                      alt="external-tag-marketing-growth-flatart-icons-flat-flatarticons"
                    />
                  </div>
                </div>
                <div className="service_detail">
                  <h4>Mobile Application Development</h4>
                  <small>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eos ab a quisquam quibusdam repellat nemo sapiente et ipsam
                    debitis cupiditate?
                  </small>
                </div>
             
              </div>
              <div className="service_box">
                <div className="service_image">
                  <img src={product4} alt="banner" />
                  <div className="tag">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-tag-marketing-growth-flatart-icons-flat-flatarticons.png"
                      alt="external-tag-marketing-growth-flatart-icons-flat-flatarticons"
                    />
                  </div>
                </div>
                <div className="service_detail">
                  <h4>WordPress Development</h4>
                  <small>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eos ab a quisquam quibusdam repellat nemo sapiente et ipsam
                    debitis cupiditate?
                  </small>
                </div>
             
              </div>
            </div>
          </div>
          {/* Testimonial */}
          <div className="card4_box_6">
      
            <div className="Testimonial">
            <div className="testimonial_title">
              <p>Client's Testimonial </p>
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/stickers/100/thumbs-up-down.png"
                alt="thumbs-up-down"
              />
            </div>
         
            <svg className="qrsvg_bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,96L80,117.3C160,139,320,181,480,186.7C640,192,800,160,960,160C1120,160,1280,192,1360,208L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
              <div className="testimonial_box">
                <Carousel autoPlay="true">
                  <div className="content">
          
                    <div className="name">
                      <p>
                        {"Dummy Name"} <i className="bx bxs-heart"></i>
                      </p>
                    </div>
                    <div className="user_Detail">
                      <img src={banner_img} alt="logo" />
                      <div className="feedbacks">
                        <p>
                          <i className="uil uil-comment-alt-heart"></i>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Sunt dolores maiores.
                        </p>
                      </div>
                    </div>

                    <div className="feedback_date">
                      <small>{"__/_/____"}</small>
                    </div>
                  </div>
                  <div className="content">
                    <div className="name">
                      <p>
                        {"Dummy Name"} <i className="bx bxs-heart"></i>
                      </p>
                    </div>
                    <div className="user_Detail">
                      <img src={avatar} alt="logo" />
                      <div className="feedbacks">
                        <p>
                          <i className="uil uil-comment-alt-heart"></i>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Sunt dolores maiores.
                        </p>
                      </div>
                    </div>

                    <div className="feedback_date">
                      <small>{"__/_/____"}</small>
                    </div>
                  </div>
                </Carousel>
              </div>

    
          
            </div>
          </div>
          {/* QRcode */}
          <div className="card4_box_7">
            <div className="qrcode_container">
              <div className="qrcode_title">
                <h4>QR Code</h4>
                <img
                  width="100"
                  height="100"
                  src="https://img.icons8.com/clouds/100/qr-code.png"
                  alt="qr-code"
                />
              </div>
              <div className="details">
                <div className="left">
                  <img src={qrcode} alt="banner" />
                </div>
                <div className="right">
                  <img src={avatar} alt="logo" />
                  <button>Download QR Code</button>
                </div>
              </div>
            </div>
          </div>
          {/* Gallerys */}

          <div className="card4_box_8">
            <div className="gallery_title">
              <p>Gallery</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/gallery.png"
                alt="gallery"
              />
            </div>
            <div className="gallery_container">
              <div className="full_image" id="fullImageBox">
                <div className="close_Full_Image_gallery">
                  <i
                    class="bx bxs-message-square-x"
                    onClick={closeFullImage}
                  ></i>
                </div>
                <img src={banner_img} alt="gallery" id="fullImage" />
              </div>
              <div className="col_1">
                <img
                  src="https://img.freepik.com/free-photo/top-view-pakistan-food-arrangement_23-2148821544.jpg?t=st=1714279105~exp=1714282705~hmac=0da66ef970a50c799d9d642c2bade46845456abfa8087533bc23459a7816616e&w=740"
                  alt="gall"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/high-angle-delicious-pakistan-dish-assortment_23-2148821527.jpg?t=st=1714279138~exp=1714282738~hmac=ab614522e279fa4dd2e7c63c83d39b7c5a7d6bc567614ec7134676c7e0729868&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/high-angle-pakistan-meal-composition_23-2148821517.jpg?t=st=1714279156~exp=1714282756~hmac=3c686a7a32b5edb80a44b6b9dfb42dce2f4d2adb30a65550a71a307dd6034ef6&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </div>
          

              <div className="col_3">
                <img
                  src="https://img.freepik.com/free-photo/delicious-indian-food-tray_23-2148723505.jpg?t=st=1714278877~exp=1714282477~hmac=d9a9c0c1807f31ce801b547995e73eb160f0a7d6306c17a4b01e431d369d3c15&w=826"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/photo-traditional-indian-food-dish-celebrate-diwali_125540-3656.jpg?t=st=1714278912~exp=1714282512~hmac=60b7489e40e635a2d53c89952346008e0bc40035bb0ea62476146905205a5fcf&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/selection-food-tray_1340-23421.jpg?t=st=1714278962~exp=1714282562~hmac=9b55c6e21ae72b0ba7e3c09c931f953c1cf4b036828573970ec526bb1ced7c9e&w=900"
                  alt=""
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </div>
            </div>
          </div>

          {/* Inquiries */}
          <div className="card4_box_9">
            <div className="inquires_title">
              <p>Inquiries</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/questions.png"
                alt="questions"
              />
            </div>

            <div className="inquiries_container">
              <div className="form_svg_top">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#ffffff"
                    fill-opacity="1"
                    d="M0,192L1440,64L1440,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="form_svg_bottom">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#ffffff"
                    fill-opacity="1"
                    d="M0,96L1440,288L1440,0L0,0Z"
                  ></path>
                </svg>
              </div>
              <form action="">
                <div className="form_group">
                  <label htmlFor="name">
                    Name <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <input type="text" placeholder="Your Name" />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/gender-neutral-user--v1.png"
                      alt="gender-neutral-user--v1"
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
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/email.png"
                      alt="email"
                    />
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="name">
                    Phone <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <input type="tel" placeholder="Enter Phone Number" />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/ringing-phone.png"
                      alt="ringing-phone"
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
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/ringing-phone.png"
                      alt="ringing-phone"
                    />
                  </div>
                </div>
                <div className="form_submit">
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
          {/* Feedback */}
          <div className="card4_box_10">

            <div className="feedback_title">
              <p>Client's Feedback</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/request-feedback.png"
                alt="request-feedback"
              />
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
                <button type="submit"><img width="48" height="48" src="https://img.icons8.com/fluency/48/send-comment.png" alt="send-comment"/>Send Feedback</button>
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
              {/* Footer */}
              <div className="card4_box_11">
                <div className="footer_container">
          
               
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#b0eeff" fill-opacity="1" d="M0,288L48,245.3C96,203,192,117,288,80C384,43,480,53,576,80C672,107,768,149,864,154.7C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
                </div>
              </div>
        </div>
      </div>
    </>
  );
};

export default NewCardDesign7;
