import React, { useState } from "react";
import "./Taxi_Service_Demo.scss";
import banner from "../../../assets/AllVCard_Image/VCard3/Banner.jpg";

import taxi from "../../../assets/AllVCard_Image/Taxi_Service/Taxi.png";
import Route_Image from "../../../assets/AllVCard_Image/Taxi_Service/route.png";
import Route_Image2 from "../../../assets/AllVCard_Image/Taxi_Service/route2.png";
import TripBanner_Image from "../../../assets/AllVCard_Image/Taxi_Service/trip_banner.png";
import RattingCar_Image from "../../../assets/AllVCard_Image/Taxi_Service/ratting.png";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import vCardsJS from "vcards-js";

const Taxi_Service_Demo = () => {
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
  const gallery_buttonStyle = {
    width: "0px",
    background: "none",
    opacity: 0,
    border: "0px",
    padding: "0px",
  };
  const gallery_properties = {
    prevArrow: (
      <button style={{ ...gallery_buttonStyle }}>
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
      <button style={{ ...gallery_buttonStyle }}>
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
    <div className="newcard_design12_container">
      <div className="trip_banner">
        <img src={TripBanner_Image} alt="trip" />
      </div>
      <div className="newcard_design12_box">
        {/* Banner and logo and details and socialMedias */}
        <div className="row_1">
          <div className="route_image">
            <img src={Route_Image} alt="route" />
          </div>
          <div className="banner_image">
            {/* <img
              src="https://img.freepik.com/free-vector/online-application-call-taxi-service-by-smart-phone-set-location-destination_1150-48863.jpg?t=st=1722545066~exp=1722548666~hmac=83853f45de9bc8b77d3a66a5cd0d8b64c9eb60089f15fb39694af0c4a99191f8&w=900"
              className="banner"
            /> */}
            <img src="https://img.freepik.com/premium-psd/isolated-realistic-shiny-metalic-orange-luxury-city-taxi-cab-car-from-left-front-view_16145-9734.jpg?w=996" alt="banner" />
            <div className="overlay"></div>
          </div>

          <div className="user_details">
            <div className="user_data">
              <h2>John Anto</h2>
              <p>
                Taxi Service <img src={taxi} alt="taxi" />
              </p>

              <div className="social_medias">
                <a
                  href="https://www.facebook.com/aristostechindia"
                  target="_blank"
                  className="social_media_icon"
                >
                  <i className="bx bxl-facebook"></i>
                  <small>Facebook</small>
                </a>
                <a
                  href="https://www.instagram.com/aristostech_india/"
                  target="_blank"
                  className="social_media_icon"
                >
                  <i className="bx bxl-instagram"></i>
                  <small>Instagram</small>
                </a>
                <a
                  href="https://wa.me/+919344482370?text=Welcome to Aristostech Team!, How can we assest u ?"
                  target="_blank"
                  className="social_media_icon"
                >
                  <i className="bx bxl-whatsapp"></i>
                  <small>Whatsup</small>
                </a>
                {/* <a href="#" className="social_media_icon">
                  <i className="bx bxl-twitter"></i>
                  <small>Twitter</small>
                </a> */}
                <a
                  href="https://maps.app.goo.gl/PCJCqMK7UJBNxBuf9"
                  target="_blank"
                  className="social_media_icon"
                >
                  <i className="bx bx-map"></i>
                  <small>Location</small>
                </a>
                <a
                  href="https://www.aristostechindia.com/"
                  target="_blank"
                  className="social_media_icon"
                >
                  <i className="bx bx-globe"></i>
                  <small>Website</small>
                </a>
              </div>
            </div>
            <div className="user_logo">
              <img
                src="https://img.freepik.com/premium-photo/asian-man-wearing-trendy-fashion-clothes_148840-7198.jpg?w=900"
                alt="user_logo"
              />
            </div>
          </div>
        </div>
        {/* Summary */}
        <div className="row_2">
          <p>
            We started from a traditional marketing background and emerged to be
            a successful Digital Marketing Agency since Digitalisation has begun
            to evolve.
          </p>
        </div>
        {/* ContactDetails */}
        <div className="row_3">
          <div className="taxi_title">
            <h3>
              <i className="bx bxs-phone-call"></i> Contact Details
            </h3>
            {/* Contact */}
          </div>

          <div className="contact_list_container">
            <div className="contact_list">
              <div className="icons">
                <i class="bx bxl-gmail"></i>
                <small>Email</small>
              </div>

              <div className="list_detail">
                <p>jayakumarv@aristostech.in</p>
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-mobile-vibration"></i>
                <small>Mobile Number</small>
              </div>

              <div className="list_detail">
                <p>(+91) 93444 82370</p>
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-envelope"></i>
                <small>Company Email</small>
              </div>

              <div className="list_detail">
                <p>contact@aristostech.in</p>
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-map-alt"></i>
                <small>Address</small>
              </div>

              <div className="list_detail">
                <p>
                  Ankur Plasa No-113 (Old 52) G.N Chetty Road T. Nagar
                  Chennai-600017
                </p>
              </div>
            </div>
          </div>

          {/* AddtoContact */}
          <div className="add_to_contact">
            <button onClick={generateVCF}>
              Add to Contact<i className="bx bxs-contact"></i>
            </button>
          </div>
        </div>
        {/* Gallery */}
        <div className="row_8">
          <div className="taxi_title">
            <h3>
              <span className="material-symbols-outlined">
                gallery_thumbnail
              </span>
              Gallery
            </h3>
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

            <div className="gallery_box">
              <Slide
                slidesToScroll={1}
                slidesToShow={width < 600 ? 2 : 3}
                indicators={true}
                autoplay
                {...gallery_properties}
                autoplayInterval={1000}
              >
                <img
                  src="https://i0.wp.com/www.aristostechindia.com/wp-content/uploads/2023/12/Mobilebannerhojo-3.png?fit=1030%2C679&ssl=1"
                  alt="developer"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://i0.wp.com/www.aristostechindia.com/wp-content/uploads/2023/12/Mobilebannerhojo-4.png?fit=1030%2C687&ssl=1"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://i0.wp.com/www.aristostechindia.com/wp-content/uploads/2023/12/Mobilebannerhojo-6.png?fit=1030%2C681&ssl=1"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://i0.wp.com/www.aristostechindia.com/wp-content/uploads/2023/10/sunglasses-in-hand-on-purple-background-close-up-NQBKRR9.png?fit=700%2C700&ssl=1"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </Slide>
            </div>
          </div>
        </div>
        {/* Services */}
        <div className="row_4">
          <div className="taxi_title">
            <h3>
              <i className="bx bx-support"></i> Our Services
            </h3>
          </div>

          <div className="service_list_container">
            <div className="service_list">
              <span className="material-symbols-outlined">travel</span>

              <div className="service_detail">
                <div className="service_title">
                  <h4>Airport Transport</h4>
                </div>
                <div className="service_summary">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi nisi laborum reprehenderit sint doloribus ab!
                  </p>
                </div>
              </div>
            </div>
            <div className="service_list">
              <span className="material-symbols-outlined">
                hourglass_bottom
              </span>
              <div className="service_detail">
                <div className="service_title">
                  <h4>Sheduled Rides</h4>
                </div>
                <div className="service_summary">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sint vero tenetur aliquid totam qui ipsam?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="row_7">
          <div className="taxi_title">
            <h3>
              <span className="material-symbols-outlined">no_crash</span>
              Our Products
            </h3>
            {/* Contact */}
          </div>
          <div className="route_image2">
            <img src={Route_Image2} alt="route" />
          </div>
          <div className="product_list_container">
            <Slide
              slidesToScroll={1}
              slidesToShow={width < 600 ? 1 : 1}
              indicators={true}
              autoplay
              {...properties}
              autoplayInterval={1000}
            >
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-vector/taxi-poster-with-realistic-yellow-public-service-car-with-reflection_1284-5444.jpg?t=st=1722540843~exp=1722544443~hmac=246e42b048cc2cd6debfbc2526ba1a7aaab7297900915186ff665942dffd3a3b&w=740"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4>Cabsy Regular</h4>
                  <small> 1-4 passenger!</small>
                  <button>₹ &nbsp;1,500</button>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/premium-photo/side-view-yellow-taxi-car-isolated-white-background_641503-49720.jpg?w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4>Cabsy XL</h4>
                  <small> 1-4 passenger!</small>
                  <button>₹ &nbsp;2000</button>
                </div>
              </div>
            </Slide>
          </div>
        </div>
        {/* //Appinment */}
        <div className="row_6">
          <div className="taxi_title">
            <h3>
              <span className="material-symbols-outlined">groups</span>
              Make An Appoinment
            </h3>
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

        {/* Testimonial */}
        <div className="row_9">
          <div className="taxi_title">
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
              showThumbs={true}
              showStatus={true}
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
                    <h4>Dinesh Kumar</h4>
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
                    src="https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                    alt=""
                  />

                  <div className="client_name">
                    <h4>Punitha</h4>
                    <small>-Member</small>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        {/* QRCode */}
        <div className="row_12">
          <div className="taxi_title">
            <h3>
              <i className="bx bx-qr-scan"></i>QRCode
            </h3>
            {/* Contact */}
          </div>

          <div className="qrcode_container">
            <div className="qr_code_box">
              <h4><small>Note :</small>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, enim?</h4>

              <img
                src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?t=st=1722540928~exp=1722544528~hmac=37be49c02a6f26b2ee598eeec0fc1b4f8133a5107efef5c3360142d745b6b58e&w=740"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Opentime */}
        <div className="row_5">
          <div className="taxi_title">
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
                        {/* GoogleMap */}

                        <div className="google_map_container">
          <div className="taxi_title">
            <h3>Live Location</h3>
          </div>

          <div className="google_map">
            <HtmlRenderer htmlString={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650172790676!2d80.23659527507537!3d13.044262813281074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAristostech%20India%20Pvt%20Ltd%20Software%20Company%20%26%20Website%20Design%20Experts!5e0!3m2!1sen!2sin!4v1724171244060!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`} />
          </div>
        </div>
        {/* Feedback */}
        <div className="row_10">
          <div className="rattingcar_image">
            <img src={RattingCar_Image} alt="ratting" />
          </div>
          <div className="taxi_title">
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
                  See All Feedbacks <i className='bx bxs-bell-ring bx-tada' ></i>

                  <div className="count">
                    {AllFeedBacks.length}
                  </div>
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
          <div className="taxi_title">
            <h3>
              <span className="material-symbols-outlined">
                person_raised_hand
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
        <div className="row_13">
          <div className="footer_container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#1a8b8275"
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

export default Taxi_Service_Demo;
