import React, { useState } from "react";
import "./Gym_Trainer_Demo.scss";
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
const Gym_Trainer_Demo = () => {
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  const [width, setWidth] = useState(window.innerWidth);
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
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
  return (
    <div className="newcard_design10_container">
      <div className="newcard_design10_box">
        {/* Banner and logo and details and socialMedias */}
        <div className="row_1">
          <div className="banner_image">
            <img
              src="https://img.freepik.com/premium-photo/asian-young-male-fitness-trainer-gym_409674-11835.jpg?w=1060"
              alt="banner_image"
              className="banner"
            />
            <div className="overlay"></div>
          </div>

          <div className="user_details">
            <div className="user_logo">
              <img
                src="https://img.freepik.com/premium-vector/retro-vintage-gym-sport-bodybuilding-template-logo-designlogo-business-fitness-label-badge-gym-center_661039-4834.jpg?w=740"
                alt="user_logo"
              />
            </div>
            <div className="user_data">
              <h2>Rajesh Kumar</h2>
              <p>Gym Trainer</p>

              <div className="social_medias">
                <a href="#" className="social_media_icon">
                  <i className="bx bxl-facebook"></i>
                  <small>Facebook</small>
                </a>
                <a href="#" className="social_media_icon">
                  <i className="bx bxl-instagram"></i>
                  <small>Instagram</small>
                </a>
                <a href="#" className="social_media_icon">
                  <i className="bx bxl-whatsapp"></i>
                  <small>Whatsup</small>
                </a>
                <a href="#" className="social_media_icon">
                  <i className="bx bxl-twitter"></i>
                  <small>Twitter</small>
                </a>
                <a href="#" className="social_media_icon">
                  <i className="bx bx-map"></i>
                  <small>Location</small>
                </a>
                <a href="#" className="social_media_icon">
                  <i className="bx bx-globe"></i>
                  <small>Website</small>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Summary */}
        <div className="row_2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At nihil
            architecto quam quas error nisi sit, minima quos modi? Aut
            recusandae distinctio odit vitae nostrum.
          </p>
        </div>
        {/* ContactDetails */}
        <div className="row_3">
          <div className="title">
            <h3>
              <i className="bx bxs-phone-call"></i> Contact Details
            </h3>
            {/* Contact */}
          </div>

          <div className="contact_list_container">
            <div className="contact_list">
              <i class="bx bxl-gmail"></i>
              <div className="list_detail">
                <small>Email</small>
                <p>info@yourdomain.com</p>
              </div>
            </div>
            <div className="contact_list">
              <i className="bx bx-mobile-vibration"></i>
              <div className="list_detail">
                <small>Mobile Number</small>
                <p>+91 8825457794</p>
              </div>
            </div>
            <div className="contact_list">
              <i className="bx bx-envelope"></i>
              <div className="list_detail">
                <small>Alternate Email</small>
                <p>inch@yourdomain.com</p>
              </div>
            </div>
            <div className="contact_list">
              <i className="bx bx-map-alt"></i>
              <div className="list_detail">
                <small>Address</small>
                <p>Sirukadambur,Ariyalur-621714</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="row_4">
          <div className="title">
            <h3>
              <i className="bx bx-dumbbell"></i> Our Services
            </h3>
            {/* Contact */}
          </div>

          <div className="service_list_container">
            <div className="service_list">
              <span className="material-symbols-outlined">sprint</span>

              <div className="service_detail">
                <div className="service_title">
                  <h4>Physical Fitness</h4>
                </div>
                <div className="service_summary">
                  <p>
                    Physical fitness is a form of physical fitness culture that
                    involves training all major muscle groups
                  </p>
                </div>
              </div>
            </div>
            <div className="service_list">
              <span className="material-symbols-outlined">exercise</span>

              <div className="service_detail">
                <div className="service_title">
                  <h4>Fat Loss</h4>
                </div>
                <div className="service_summary">
                  <p>
                    Body building is a form of physical fitness culture that
                    involves training all major muscle groups
                  </p>
                </div>
              </div>
            </div>
            <div className="service_list">
              <span className="material-symbols-outlined">body_system</span>

              <div className="service_detail">
                <div className="service_title">
                  <h4>Body Building</h4>
                </div>
                <div className="service_summary">
                  <p>
                    Body building is a form of physical fitness culture that
                    involves training all major muscle groups
                  </p>
                </div>
              </div>
            </div>
            <div className="service_list">
              <span className="material-symbols-outlined">
                self_improvement
              </span>

              <div className="service_detail">
                <div className="service_title">
                  <h4>Self Improvement</h4>
                </div>
                <div className="service_summary">
                  <p>If there is no struggle, there is no progress.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Opentime */}
        <div className="row_5">
          <div className="title">
            <h3>
              <i className="bx bx-timer"></i>Open&Close Time
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
        {/* Products */}
        <div className="row_7">
          <div className="title">
            <h3>
              <span className="material-symbols-outlined">fitness_center</span>
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
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114181.jpg?t=st=1722480930~exp=1722484530~hmac=b3e99f19f2f2261ec0d7c5f1da8914dbfa376f325e37125598579ea7d7eced3b&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4>Dumbells</h4>
                  <small> Hexa Brand Black dumbles set</small>
                  <button>₹ &nbsp;1,500</button>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114193.jpg?t=st=1722481836~exp=1722485436~hmac=d51a359afcfe14e230d29c84d0e4a997136b837f764fd5d58ace30f2613f07fa&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4>Dumbells</h4>
                  <small> Hexa Brand Black dumbles set</small>
                  <button>₹ &nbsp;2,500</button>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114216.jpg?t=st=1722480919~exp=1722484519~hmac=d542dae62fe4b0fea241627476e4f6acb5e11f0a0305c9b516fcd84c20c12e59&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4>Weight Lifter</h4>
                  <small> Hexa Brand Black Weight lifter Full set</small>
                  <button>₹ &nbsp;12,000</button>
                </div>
              </div>
            </Slide>
          </div>
        </div>
        {/* //Appinment */}
        <div className="row_6">
          <div className="title">
            <h3>
              <span className="material-symbols-outlined">groups</span>
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

        {/* Gallery */}
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
              <div className="click_image">
                <img src={hand} alt="click" />
              </div>
              <img
                src="https://img.freepik.com/free-photo/young-adult-doing-indoor-sport-gym_23-2149205565.jpg?t=st=1722483193~exp=1722486793~hmac=582b97347ecbf83a7f71abf16c7dc7dc6287bdaa892fd409e0391f81788d2e1a&w=900"
                alt="developer"
                onClick={(e) => openFullImage(e.target.src)}
              />
              <img
                src="https://img.freepik.com/free-photo/group-happy-people-with-fitness-mat_23-2147949665.jpg?t=st=1722483216~exp=1722486816~hmac=7bdc02aab0dcfc3acd5fc65492a3b8ca429968cbe272e944b7290c87a0e915d7&w=740"
                alt="dev"
                onClick={(e) => openFullImage(e.target.src)}
              />
              <img
                src="https://img.freepik.com/free-photo/medium-shot-woman-with-personal-trainer_23-2148768876.jpg?t=st=1722483231~exp=1722486831~hmac=632b671e1aa83188e956e1079af566819bd22f8654c85892275f73f6a0e1c51a&w=900"
                alt="dev"
                onClick={(e) => openFullImage(e.target.src)}
              />
              <img
                src="https://img.freepik.com/free-photo/group-happy-athletic-people-sitting-floor-after-workout-health-club_23-2147949626.jpg?t=st=1722483254~exp=1722486854~hmac=6dbfa18496283604500b632d24c5d12f0ea3e55560c0d2124e1127202c04c736&w=996"
                alt="dev"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
          </div>
        </div>
        {/* Testimonial */}
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
            </Carousel>
          </div>
        </div>
        {/* GoogleMap */}

        <div className="google_map_container">
          <div className="title">
            <h3>Live Location</h3>
          </div>

          <div className="google_map">
            <HtmlRenderer
              htmlString={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650172790676!2d80.23659527507537!3d13.044262813281074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAristostech%20India%20Pvt%20Ltd%20Software%20Company%20%26%20Website%20Design%20Experts!5e0!3m2!1sen!2sin!4v1724171244060!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}
            />
          </div>
        </div>
        {/* Feedback */}
        <div className="row_10">
          <div className="title">
            <h3>
              <span className="material-symbols-outlined">reviews</span>
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
                  rows="2"
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
                  <span className="material-symbols-outlined">send</span>
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
                  See All Feedbacks<i className="bx bxs-bell-ring bx-tada"></i>
                  <div className="count">{AllFeedBacks.length}</div>
                </button>
              )}

              {feedbackLoader ? <span className="feedBack_loader"></span> : ""}
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
        <div className="row_11">
          <div className="title">
            <h3>
              <span className="material-symbols-outlined">reviews</span>
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
                    rows="2"
                    placeholder="Enter Your Message Here..."
                  ></textarea>
                  <i class="bx bxs-message-dots"></i>
                </div>
              </div>
              <div className="form_actions">
                <button type="submit">
                  <span className="material-symbols-outlined">send</span>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="row_12">
          <div className="footer_container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#2d2d2ee1"
                fill-opacity="1"
                d="M0,64L120,96C240,128,480,192,720,186.7C960,181,1200,107,1320,69.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
              ></path>
            </svg>
            <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gym_Trainer_Demo;
