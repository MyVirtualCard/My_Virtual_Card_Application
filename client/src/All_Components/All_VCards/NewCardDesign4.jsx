import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign4.scss";
import banner_img from "../../assets/AllVCard_Image/VCard4/banner.jpg";
import avatar from "../../assets/AllVCard_Image/VCard4/avatar.jpg";
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

import { LazyLoadImage } from "react-lazy-load-image-component";
// import Carousel1 from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
//Carousel Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from "react-responsive-carousel";
//QRCODE:

import qrcode from "../../assets/AllVCard_Image/VCard4/qr.svg";
//Testimonial
import { useContext } from "react";

// ProductSlider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import vCardsJS from "vcards-js";
const NewCardDesign4 = () => {
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

  document.addEventListener("scroll", () => {
    let card = document.getElementById("card_design_box5");

    const scrollTop = window.scrollY;
    const cardHeight = card.scrollHeight - card.clientHeight;
    const winHeight = card.clientHeight;

    const scrollPercentage = (scrollTop / cardHeight) * 100;
    document.getElementById("progress_bar").style.height =
      scrollPercentage + "%";
  });

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
  };
    // Create a ref for the element you want to scroll to
    const targetRef = useRef(null);

    // Function to handle image click
    const handleImageClick = () => {
      // Scroll to the target element
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <>
      <div className="newCard_design7_container">
        <div id="card_design_box7">
          {/* Banner */}

          <div className="card7_box_1">
            <LazyLoadImage
              className="image1"
              src={banner_img}
              alt="banner"
              effect="blur"
              placeholderSrc={banner_img}
            />
            {/* <img src={banner_img} loading="lazy" alt="banner" /> */}
            <LazyLoadImage
              className="image2"
              src={avatar}
              alt="avatar"
              effect="blur"
              placeholderSrc={avatar}
            />
            {/* <img src={avatar} loading="lazy" alt="logo" /> */}
          </div>
          {/* Basic Detail */}

          <div className="card7_box_2">
            <div className="user_detail">
              <h4>Punitha T</h4>
              <small>Fashion Influencer</small>
            </div>
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
                <i className="bx bxl-instagram-alt"></i>
              </a>
              <a href="#">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#">
                <i className="bx bxl-youtube"></i>
              </a>
            </div>
            <div className="user_summary">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                dolor, quos tempora commodi inventore nesciunt consectetur
                molestias, quaerat sapiente molestiae cum sequi officiis magni
                veniam.
              </p>
            </div>
          </div>
          {/* .Contact */}

          <div className="card7_box_3">
            <div className="contact_container">
              <div className="contact_box">
                <div className="contact_icon">
                  <i className="bx bxs-envelope"></i>
                </div>
                <div className="contact_detail">
                  <p>punitha@gmail.com</p>
                  <small>Email</small>
                </div>
              </div>
              <div className="contact_box">
                <div className="contact_icon">
                  <i className="bx bxs-phone-call"></i>
                </div>
                <div className="contact_detail">
                  <p>+91 5246563465</p>
                  <small>Mobile Number</small>
                </div>
              </div>
              <div className="contact_box">
                <div className="contact_icon">
                  <i className="bx bxs-party"></i>
                </div>
                <div className="contact_detail">
                  <p>18-03-2000</p>
                  <small>Date Of Birth</small>
                </div>
              </div>
              <div className="contact_box">
                <div className="contact_icon">
                  <i className="bx bx-current-location"></i>
                </div>
                <div className="contact_detail">
                  <p>Trichy , Tamil Nadu</p>
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
          {/* Service */}

          <div className="card7_box_4">
            <div className="service_title">
              <h4>#&nbsp;Our Service's</h4>
            </div>

            <div className="service_container">
              <div className="service_box">
                <div className="icon">
                  <i class="bx bxs-user-voice"></i>
                </div>
                <div className="service_detail">
                  <h4>Branding</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit ad maxime accusantium quidem beatae repellat.
                  </p>
                </div>
              </div>
              <div className="service_box">
                <div className="icon">
                  <i className="bx bxs-news"></i>
                </div>
                <div className="service_detail">
                  <h4>Advertising</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit ad maxime accusantium quidem beatae repellat.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Appoinment */}
          <div className="card7_box_5">
            <div className="appoinment_title">
              <h4>#&nbsp;Make An Appoinment</h4>
            </div>
            <div className="appoinment_container">
              <form action="">
                <div className="form_group">
                  {/* <label htmlFor="date">Pick A Date</label> */}
                  <input
                    type="date"
                    placeholder="pick date"
                    name="date"
                    id="date"
                  />
                </div>
                <div className="form_group">
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

          <div className="card7_box_6">
            <div className="Gallery_title">
              <h4>#&nbsp;Gallery</h4>
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
                <LazyLoadImage
                  src="https://plus.unsplash.com/premium_photo-1684783848257-daab2a974afd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbiUyMGluZmx1ZW5jZXJ8ZW58MHx8MHx8fDA%3D"
                  alt="avatar"
                  effect="blur"
                  placeholderSrc="https://plus.unsplash.com/premium_photo-1684783848257-daab2a974afd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbiUyMGluZmx1ZW5jZXJ8ZW58MHx8MHx8fDA%3D"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <LazyLoadImage
                  src="https://images.unsplash.com/photo-1577060663859-4db8f31dc1da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhc2hpb24lMjBpbmZsdWVuY2VyfGVufDB8fDB8fHww"
                  alt="avatar"
                  effect="blur"
                  placeholderSrc="https://images.unsplash.com/photo-1577060663859-4db8f31dc1da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhc2hpb24lMjBpbmZsdWVuY2VyfGVufDB8fDB8fHww"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <LazyLoadImage
                  src="https://images.unsplash.com/photo-1602742398695-745b5864dada?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb24lMjBpbmZsdWVuY2VyfGVufDB8fDB8fHww"
                  alt="avatar"
                  effect="blur"
                  placeholderSrc="https://images.unsplash.com/photo-1602742398695-745b5864dada?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb24lMjBpbmZsdWVuY2VyfGVufDB8fDB8fHww"
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </div>
              <div className="col_2">
              <LazyLoadImage
                  src="https://images.unsplash.com/photo-1512068549487-5e79d74c7fc3?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="avatar"
                  effect="blur"
                  placeholderSrc="https://images.unsplash.com/photo-1512068549487-5e79d74c7fc3?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  onClick={(e) => openFullImage(e.target.src)}
                />
               
              </div>

              <div className="col_3">
              <LazyLoadImage
                  src="https://plus.unsplash.com/premium_photo-1684783848152-52135af8f0c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhc2hpb24lMjBpbmZsdWVuY2VyfGVufDB8fDB8fHww"
                  alt="avatar"
                  effect="blur"
                  placeholderSrc="https://plus.unsplash.com/premium_photo-1684783848152-52135af8f0c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhc2hpb24lMjBpbmZsdWVuY2VyfGVufDB8fDB8fHww"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                 <LazyLoadImage
                  src="https://images.unsplash.com/photo-1511280303142-0051e93baeeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFzaGlvbiUyMGluZmx1ZW5jZXJ8ZW58MHx8MHx8fDA%3D"
                  alt="avatar"
                  effect="blur"
                  placeholderSrc="https://images.unsplash.com/photo-1511280303142-0051e93baeeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFzaGlvbiUyMGluZmx1ZW5jZXJ8ZW58MHx8MHx8fDA%3D"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                   <LazyLoadImage
                  src="https://images.unsplash.com/photo-1563993297290-609c9406efcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMGluZmx1ZW5jZXJ8ZW58MHx8MHx8fDA%3D"
                  alt="avatar"
                  effect="blur"
                  placeholderSrc="https://images.unsplash.com/photo-1563993297290-609c9406efcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMGluZmx1ZW5jZXJ8ZW58MHx8MHx8fDA%3D"
                  onClick={(e) => openFullImage(e.target.src)}
                />
               
              </div>
            </div>
          </div>
          {/* Testimonial */}
          <div className="card7_box_7">
            <div className="testimonial_title">
              <h4>#&nbsp;Testimonial</h4>
              <div className="smily">
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-smiley-love-flatart-icons-flat-flatarticons.png"
                  alt="external-smiley-love-flatart-icons-flat-flatarticons"
                />
              </div>
            </div>
            <div className="Testimonial7">
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
                        elit.
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
                        elit.
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
          {/* Products */}
          <div className="card7_box_8">
            <div className="product_title">
              <h4>#&nbsp;Products</h4>
            </div>
            <div className="product_container">
              <div className="product_box"  onClick={handleImageClick}>
                <div className="product_image">
                  <img
                    src="https://images.unsplash.com/photo-1577060969681-e003a3f2af6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGZhc2hpb24lMjBpbmZsdWVuY2VyfGVufDB8fDB8fHww"
                    alt="product"
                   
                  />
                </div>
                <div className="product_title">
                  <h3>No Headings</h3>
                  <small>₹ 500</small>
                </div>
                <div className="product_summary">
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
              </div>
              <div className="product_box" onClick={handleImageClick}>
                <div className="product_image">
                  <img
                    src="https://media.istockphoto.com/id/1146921227/photo/young-woman-influencer-posing-for-social-media.webp?b=1&s=170667a&w=0&k=20&c=0bV65kVKIMhpsxwngDu-9PF-Ml_kUFZQFZbISGAxFLQ="
                    alt="product"
                  
                  />
                </div>
                <div className="product_title">
                  <h3>No Headings</h3>
                  <small>₹ 800</small>
                </div>
                <div className="product_summary">
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
              </div>
              <div className="product_box"  onClick={handleImageClick}>
                <div className="product_image">
                  <img
                    src="https://media.istockphoto.com/id/1135152732/photo/friends-posing-for-their-social-media-post-photo.webp?b=1&s=170667a&w=0&k=20&c=y2zopn64kheVafYtAOkmoHEBkApZYAy6N7VD2uEhAV4="
                    alt="product"
                  />
                </div>
                <div className="product_title">
                  <h3>No Headings</h3>
                  <small>₹ 1500</small>
                </div>
                <div className="product_summary">
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
              </div>
              <div className="product_box"  onClick={handleImageClick}>
                <div className="product_image">
                  <img
                    src="https://media.istockphoto.com/id/1452785762/photo/woman-taking-selfie-on-staircase.webp?b=1&s=170667a&w=0&k=20&c=YRUucUn0dtSiUHIK1e33u1v8P_eh73ZWaph31A1zEfw="
                    alt="product"
                  />
                </div>
                <div className="product_title">
                  <h3>No Headings</h3>
                  <small>₹ 2000</small>
                </div>
                <div className="product_summary">
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
              </div>
            </div>
          </div>
          {/* QR Code */}
          <div className="card7_box_9">
            <div className="qrcode_title">
              <h4>#&nbsp;QR Code</h4>
            </div>
            <div className="qrcode_container">
              <div className="qrcode_box">
                <div className="logo">
                  <img src={banner_img} alt="logo" />
                </div>
                <div className="qrcode">
                  <img src={qrcode} alt="qrcode" />
                </div>
              </div>
            </div>
          </div>
          {/* Feedback`` */}

          <div className="card7_box_10">
            <div className="feedback_title">
              <h4>#&nbsp;FeedBack</h4>
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
          {/* Inquries */}
          <div className="card7_box_11" ref={targetRef}>
            <div className="inquries_title">
              <h4>#&nbsp;Inquries</h4>
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
                      rows="5"
                      placeholder="Enter Your Message Here..."
                    ></textarea>
                    <i class="bx bxs-message-dots"></i>
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
          <div className="card7_box_12">
            <div className="footer_container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#B20755"
                  fill-opacity="1"
                  d="M0,256L21.8,250.7C43.6,245,87,235,131,218.7C174.5,203,218,181,262,165.3C305.5,149,349,139,393,149.3C436.4,160,480,192,524,202.7C567.3,213,611,203,655,208C698.2,213,742,235,785,208C829.1,181,873,107,916,96C960,85,1004,139,1047,186.7C1090.9,235,1135,277,1178,277.3C1221.8,277,1265,235,1309,229.3C1352.7,224,1396,256,1418,272L1440,288L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
                ></path>
              </svg>
              <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCardDesign4;
