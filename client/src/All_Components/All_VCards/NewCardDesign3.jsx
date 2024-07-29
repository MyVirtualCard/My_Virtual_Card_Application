import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign3.scss";

import { Link, useParams } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
// Testimonial Sider
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import Carousel1 from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
//Carousel Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import banner from "../../assets/AllVCard_Image/VCard3/Banner.jpg";
import avatar from "../../assets/AllVCard_Image/VCard3/avatar.jpg";
import shape from "../../assets/AllVCard_Image/VCard3/shape1.png";
import hand from "../../assets/AllVCard_Image/VCard3/hand.gif";
import qrcode from "../../assets/AllVCard_Image/VCard3/qr.svg";
import qrcode_rightImage from "../../assets/AllVCard_Image/VCard3/qrcode_right_image.jpg";
import shape2 from "../../assets/AllVCard_Image/VCard3/shape2.png";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import { useContext } from "react";

// Blog Slider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import vCardsJS from "vcards-js";

const NewCardDesign3 = () => {
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
  // Create a ref for the element you want to scroll to
  const targetRef = useRef(null);

  // Function to handle image click
  const handleImageClick = () => {
    // Scroll to the target element
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="newCard_design9_container">
        <div id="card_design_box9">
          <ul class="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            {/* <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li> */}
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="share_icons_actions">
            {share ? (
              <div className="share_child_icon">
                <i className="bx bx-qr-scan qr"></i>
                <i className="bx bxs-share share"></i>
              </div>
            ) : (
              ""
            )}

            <div className="share_main_icon" onClick={() => setShare(!share)}>
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/clouds/100/share.png"
                alt="share"
              />
            </div>
          </div>
          {/* Banenr */}
          <div className="card9_box1">
            <img src={banner} alt="banner" />

            <div className="logo">
              <img
                className="logo_img"
                src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1714999372~exp=1715002972~hmac=148ead13ab2f0dc4db7268fb984501266e0547e55d0bd1a6918e3e51ca5a5af4&w=740"
                alt="logo"
              />
              <div className="shape">
                <img className="shape_img" src={shape} alt="shape" />
              </div>
            </div>
          </div>
          {/* BasicDetail */}
          <div className="card9_box2">
            <div className="user_detail">
              <h4>Kodiyarasu C</h4>
              <small>Junior Software Developer</small>
              <div className="social_medias">
                <a href="#">
                  <i className="bx bxl-facebook"></i>
                  <img src={shape} alt="shape" />
                </a>
                <a href="#">
                  <i className="bx bxl-whatsapp"></i>
                  <img src={shape} alt="shape" />
                </a>
                <a href="#">
                  <i className="bx bxl-linkedin"></i>
                  <img src={shape} alt="shape" />
                </a>
                <a href="#">
                  <i className="bx bxl-instagram-alt"></i>
                  <img src={shape} alt="shape" />
                </a>
                <a href="#">
                  <i className="bx bxl-twitter"></i>
                  <img src={shape} alt="shape" />
                </a>
                <a href="#">
                  <i className="bx bxl-youtube"></i>
                  <img src={shape} alt="shape" />
                </a>
              </div>

              <div className="summary">
                <p>
                  Experienced Software Engineer skilled in developing front-end,
                  modern client-side frameworks utilizing React+Redux. Seeking a
                  position to bring an outside-of-the-box approach and
                  exceptional ability to identify problems and create effective
                  solutions that keep projects on track and under budget.
                </p>
              </div>

              <div className="contact_container">
                <div className="contact_box">
                  <div className="icon1">
                    <i className="bx bxs-envelope"></i>
                  </div>
                  <div className="contact_detail">
                    <small>E-mail Address</small>
                    <h6>kodiyarasu01@gmail.com</h6>
                  </div>
                </div>
                <div className="contact_box">
                  <div className="icon2">
                    <i className="bx bx-mobile"></i>
                  </div>
                  <div className="contact_detail">
                    <small>Mobile Number</small>
                    <h6>+91 4564646546</h6>
                  </div>
                </div>
                <div className="contact_box">
                  <div className="icon3">
                    <i className="bx bxs-party"></i>
                  </div>
                  <div className="contact_detail">
                    <small>Date Of Birth</small>
                    <h6>26-01-2000</h6>
                  </div>
                </div>
                <div className="contact_box">
                  <div className="icon4">
                    <i className="bx bxs-location-plus"></i>
                  </div>
                  <div className="contact_detail">
                    <small>Address</small>
                    <h6>Chennai , Tamil Nadu</h6>
                  </div>
                </div>
              </div>

              <div className="add_to_contact">
                <button onClick={generateVCF}>
                  <i className="bx bxs-contact"></i>Add To Contact
                </button>
              </div>
            </div>
          </div>
          {/* Appoinment */}
          <div className="card9_box3">
            <div className="appoinment_title">
              <h4>Make On Appoinment</h4>
            </div>
            <div className="appoinment_container">
              <form action="">
                <div className="form_group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    placeholder="pick date"
                    name="date"
                    id="date"
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="date">Hour</label>
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
                    <i className="bx bx-subdirectory-right"></i>
                    Book Appoinment
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Services */}
          <div className="card9_box4">
            <div className="service_title">
              <h4>Our Services</h4>
            </div>
            <div className="service_container">
              <div className="service_box">
                <div className="service_icon">
                  <img
                    width="100"
                    height="100"
                    src="https://img.icons8.com/clouds/100/domain.png"
                    alt="domain"
                  />
                </div>
                <div className="service_detail">
                  <h4>Web Development</h4>
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    autem labore minus blanditiis perferendis ullam placeat odio
                    aspernatur libero incidunt.
                  </small>
                </div>
              </div>
              <div className="service_box">
                <div className="service_icon">
                  <img
                    width="100"
                    height="100"
                    src="https://img.icons8.com/clouds/100/design.png"
                    alt="design"
                  />
                </div>
                <div className="service_detail">
                  <h4>Branding Design</h4>
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    autem labore minus blanditiis perferendis ullam placeat odio
                    aspernatur libero incidunt.
                  </small>
                </div>
              </div>
            </div>
          </div>
          {/* .Gallery */}
          <div className="card9_box5">
            <div className="gallery_title">
              <h4>Gallery</h4>
            </div>
            <div className="gallery_container">
              <div className="full_image" id="fullImageBox">
                <div className="close_Full_Image_gallery">
                  <i
                    className="bx bx-message-rounded-x"
                    onClick={closeFullImage}
                  ></i>
                </div>
                <img src={banner} alt="gallery" id="fullImage" />
              </div>
              <ul class="background1">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                {/* <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li> */}
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div className="arrow">
                <small>Scroll To</small>
                <i className="bx bx-chevrons-right bx-fade-right"></i>
              </div>
              <div className="gallery_box">
                <div className="click_image">
                  <img src={hand} alt="click" />
                </div>
                <img
                  src="https://img.freepik.com/free-photo/program-development-concept-young-indian-man-working-with-computer_231208-3642.jpg?t=st=1714406712~exp=1714410312~hmac=7df28363674ef94a44ee90f5d6f44f704f6fd384694b991be19947cc86fef107&w=900"
                  alt="developer"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/indian-man-programmers-testing-application-security-developed_231208-3632.jpg?t=st=1714406790~exp=1714410390~hmac=2f3b4e6da9792d6ce0b6a6833beefc2ff07ff4247697e5b5e7df7da50c36e8fc&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/person-front-computer-working-html_23-2150040428.jpg?t=st=1714406836~exp=1714410436~hmac=001a19a19ebe9f04400855ba28261db4106ba1a74065072fc82722288195e084&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241224.jpg?t=st=1714406908~exp=1714410508~hmac=b9713141f1453caa78cc47a406e62711acd35985065e7eb16c602ea84b5a9533&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/team-working-animation-project_23-2149269881.jpg?t=st=1714406935~exp=1714410535~hmac=01aaacf4e2c99ad6dabd2eb622888bee8017eeab9cf76285d4274f25c20e038a&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </div>
            </div>
          </div>
          {/* Products */}
          <div className="card9_box6">
            <div className="products_title">
              <h4>Our Products</h4>
            </div>
            <div className="product_container">
              <Slide
                className="product_slide"
                slidesToScroll={1}
                slidesToShow={width < 600 ? 1 : 2}
                indicators={true}
                autoplay
                {...properties}
                autoplayInterval={1000}
              >
                <div className="product_box">
                  <div className="product_img">
                    <img
                      src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010130.jpg?t=st=1714410932~exp=1714414532~hmac=3f096bb7b654389f447dc507954dd41f6f709a24f497668a2a652c18eca12f9e&w=900"
                      alt="product"
                    />
                  </div>
                  <div className="product_detail">
                    <div className="product_title">
                      <h4>WebSite Developement</h4>
                      <small>Price : 4000</small>
                    </div>
                    <div className="product_summary">
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="product_box">
                  <div className="product_img">
                    <img
                      src="https://img.freepik.com/free-photo/it-engineer-working-with-his-pc_1098-21511.jpg?t=st=1714412969~exp=1714416569~hmac=79f40259567920d51a8f2dd2b41fb53f4f9dda0301e870824e0962a2578af70c&w=900"
                      alt="product"
                    />
                  </div>
                  <div className="product_detail">
                    <div className="product_title">
                      <h4>Mobile App Developement</h4>
                      <small>Price : 4000</small>
                    </div>
                    <div className="product_summary">
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="product_box">
                  <div className="product_img">
                    <img
                      src="https://img.freepik.com/free-photo/young-man-using-discount-coupon-his-smartphone-some-online-shopping-laptop_662251-2177.jpg?t=st=1714413081~exp=1714416681~hmac=37ebc737549b42066b0fc192de48ac9a59311cff141de3bc7b2223083d9935d1&w=900"
                      alt="product"
                    />
                  </div>
                  <div className="product_detail">
                    <div className="product_title">
                      <h4>E-commerse Site</h4>
                      <small>Price : 10000</small>
                    </div>
                    <div className="product_summary">
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="product_box">
                  <div className="product_img">
                    <img
                      src="https://img.freepik.com/free-vector/landing-page-with-smartphone-web-site_23-2148340671.jpg?t=st=1714413253~exp=1714416853~hmac=1614085c4220866860ace1f586046f7dbe14ae78d4839e98c6a3846e585bd701&w=900"
                      alt="product"
                    />
                  </div>
                  <div className="product_detail">
                    <div className="product_title">
                      <h4>DigitalCard Site </h4>
                      <small>Price : 5000</small>
                    </div>
                    <div className="product_summary">
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                </div>
              </Slide>
            </div>
          </div>
          {/* Blog */}
          <div className="card9_box7">
            <div className="blog_title">
              <h4>Blog</h4>
            </div>
            <div className="blog_container">
              <AwesomeSlider>
                <div>
                  <img
                    src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901791.jpg?t=st=1714413632~exp=1714417232~hmac=f8e3ca58911b724ef0c04ffa5092fc74138e9d56808fa23b1e970d16cfe37023&w=996"
                    alt="blog"
                  />
                </div>
                <div>
                  <img
                    src="https://img.freepik.com/free-photo/young-woman-attending-online-class_23-2148854933.jpg?t=st=1714413922~exp=1714417522~hmac=fbd80b5d2c055cf7de85b2c4349ebbaeaf54ad33f20e8dc5ccf00b5bee4df9bd&w=900"
                    alt="blog"
                  />
                </div>
                <div>
                  <img
                    src="https://img.freepik.com/free-photo/friends-attending-online-class-together_23-2148854909.jpg?t=st=1714415361~exp=1714418961~hmac=1cdaa4a6abf5fef505d97c2c491559f20e56cf9c223ad04fcdab6b82d4ad66b4&w=996"
                    alt="blog"
                  />
                </div>
                <div>
                  <img
                    src="https://img.freepik.com/free-photo/friends-attending-online-class-together_23-2148854908.jpg?t=st=1714415384~exp=1714418984~hmac=e08808bf1892da8c667a9328f249b5271d102c031ee3c95aa097c0c030e7b60c&w=900"
                    alt="blog"
                  />
                </div>
              </AwesomeSlider>
            </div>
          </div>
          {/* Testimonial */}
          <div className="card9_box8">
            <div className="testimonial_title">
              <h4>Testimonial's</h4>
            </div>
            <div className="Testimonial9">
              <div className="testimonial_box">
                <Carousel autoPlay="true" className="carousel">
                  <div className="testimonial5_details">
                    <div className="user_profile">
                      <img src={banner} alt="logo" />
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
          {/* qrcode */}
          <div className="card9_box11">
            <div className="qrcode_title">
              <h4>QR Code</h4>
            </div>
            <div className="qrcode_container">
              <div className="bubble">
                <div class="background2">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="qrcode_box">
                <div className="right">
                  <img src={qrcode_rightImage} alt="qrcode" />
                </div>
                <div className="left">
                  <img src={qrcode} alt="qrcode" />
                </div>
              </div>
            </div>
          </div>
          {/* Feedback */}
          <div className="card9_box9">
            <div className="feedback_title">
              <h4>Feedback</h4>
            </div>
            <div className="feedback_container8">
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
          <div className="card9_box10">
            <div className="inquries_title">
              <h4>Inquries</h4>
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
          <div className="card8_box_12">
            <div className="footer_container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#7e67ff"
                  fill-opacity="1"
                  d="M0,64L120,96C240,128,480,192,720,186.7C960,181,1200,107,1320,69.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
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

export default NewCardDesign3;
