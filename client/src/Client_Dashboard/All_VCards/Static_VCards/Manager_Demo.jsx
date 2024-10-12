import React, { useState } from "react";
import "./Manager_Demo.scss";
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
import axios from "axios";
const Manager_Demo = () => {

  const [width, setWidth] = useState(window.innerWidth);
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
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
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  //Appoinment form

  // let Appoinment_formik = useFormik({
  //   initialValues: {
  //     URL_Alies: window.location.pathname,
  //     FullName: "",
  //     MobileNumber: "",
  //     Date: "",
  //     Time:'',
  //   },

  //   //Validation :
  //   validationSchema: AppoinmentValidateSchema,
  //   //Form Submit :
  //   onSubmit: async (values) => {
  //     setappoinmentLoader(true)
  //     await api
  //       .post(`/appoinment${window.location.pathname}`, values)
  //       .then((res) => {
  //         console.log(res)
  //         formik.values.FullName = "";
  //         formik.values.Time = "";
  //         formik.values.MobileNumber = "";
  //         formik.values.Date = "";

  //         setAppoinmentPopup(true);
  //         setappoinmentLoader(false)
  //         setSuccessMessage(res.data.message);
  //         setTimeout(() => {
  //           setAppoinmentPopup(false);
  //         }, 3000);
  //       })
  //       .catch((error) => {

  //         setappoinmentLoader(false)
  //         setAppoinmentPopupError(true);
  //         setTimeout(() => {
  //           setAppoinmentPopupError(false);
  //         }, 3000);
  //         setErrorMessage(error.response.data.message);
  //       });
  //   },
  // });
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
  let[ManageContentData,setManageContent]=useState([]);
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
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  return (
    <div className="manager_demo_container">
      <div className="newcard_design11_box">
        {/* Banner and logo and details and socialMedias */}
        <div className="row_1">
          <div className="banner_image">
            <img
              src="https://img.freepik.com/premium-photo/abstract-night-cityscape-background-smart-city-ai-digital-transformation-concept-double-exposure_3535-9362.jpg?w=900"
              className="banner"
            />
            <div className="overlay"></div>
          </div>

          <div className="user_details">
            <div className="user_logo">
              <img
                src="https://img.freepik.com/free-vector/logo-unique-luxury-gradient-colorful-design_483537-1477.jpg?t=st=1722496836~exp=1722500436~hmac=86a8ecf1f3e0b64fb5e05a72459e4b749f91ce457b06acefb9bcee2120cd0ea5&w=740"
                alt="user_logo"
              />
            </div>
            <div className="user_data">
              <h2>Jayakumar</h2>
              <p>
                <span>
                  <Typewriter
                    words={["Corporate CEO", "Manager", "Organizer"]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={200}
                    deleteSpeed={100}
                    delaySpeed={1000}
                  />
                </span>
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
          <div className="manager_title">
            <h3>
              <i className="bx bxs-phone-call"></i> Contact Details
            </h3>
            {/* Contact */}
          </div>

          <div className="contact_list_container">
            <a className="contact_list">
              <div className="icon">
              <i class="bx bxl-gmail"></i>
              <small>Email</small>
              </div>
             
              <div className="list_detail">
               
                <p>jayakumarv@aristostech.in</p>
              </div>
            </a>
            <a className="contact_list">
              <div className="icon">
              <i className="bx bx-mobile-vibration"></i>
              <small>Mobile Number</small>
              </div>
        
              <div className="list_detail">
                
                <p>(+91) 93444 82370</p>
              </div>
            </a>
            <a className="contact_list">
          <div className="icon">
          <i className="bx bx-envelope"></i>
          <small>Company Email</small>
          </div>
              <div className="list_detail">
             
                <p>contact@aristostech.in</p>
              </div>
            </a>
            <a className="contact_list">
     <div className="icon">
     <i className="bx bx-map-alt"></i>
     <small>Address</small>
     </div>
              <div className="list_detail">
               
                <p>
                  Ankur Plasa No-113 (Old 52) G.N Chetty Road T. Nagar
                  Chennai-600017
                </p>
              </div>
            </a>
          </div>
                   {/* AddtoContact */}
                   <div className="add_to_contact">
                    <button onClick={handleDownloadVCard}>
                      Add to Contact<i className="bx bxs-contact"></i>
                    </button>
                  </div>
        </div>

        {/* Services */}
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
              <div className="service_list">
                <span className="material-symbols-outlined">
                  developer_mode
                </span>

                <div className="service_detail">
                  <div className="service_title">
                    <h4>Business analysis</h4>
                  </div>
                  <a className="view_service">
                    <small>View Service</small>
                    <i className='bx bx-link'></i>
                  </a>
                  <div className="service_summary">
                    <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil maiores hic sint, natus eveniet voluptate perferendis. Eligendi repellat libero natus?
                    </p>
                  </div>
                </div>
              </div>
              <div className="service_list">
                <span className="material-symbols-outlined">
                  design_services
                </span>
                <div className="service_detail">
                  <div className="service_title">
                    <h4>Effective Delegation</h4>
                  </div>
                  <a className="view_service">
                    <small>View Service</small>
                    <i className='bx bx-link'></i>
                  </a>
                  <div className="service_summary">
                    <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nesciunt. Reiciendis nesciunt necessitatibus natus et expedita facilis accusamus non molestiae.
                    </p>
                  </div>
                </div>
              </div>
              <div className="service_list">
                <span className="material-symbols-outlined">
                  local_convenience_store
                </span>

                <div className="service_detail">
                  <div className="service_title">
                    <h4>Clear Communication</h4>
                  </div>
                  <a className="view_service">
                    <small>View Service</small>
                    <i className='bx bx-link'></i>
                  </a>
                  <div className="service_summary">
                    <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus doloremque dolore rerum quo voluptatem id. Temporibus ducimus praesentium rem veritatis!
                    </p>
                  </div>
                </div>
              </div>
              <div className="service_list">
                <span className="material-symbols-outlined">
                  production_quantity_limits
                </span>

                <div className="service_detail">
                  <div className="service_title">
                    <h4>Managing risks</h4>
                  </div>
                  <a className="view_service">
                    <small>View Service</small>
                    <i className='bx bx-link'></i>
                  </a>
                  <div className="service_summary">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quis quaerat aut architecto placeat incidunt non vel velit minus harum!</p>
                  </div>
                </div>
              </div>
            </Slide>
          </div>
        </div>

        {/* Opentime */}
        <div className="row_5">
          <div className="manager_title">
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
          <div className="manager_title">
            <h3>
              <span className="material-symbols-outlined">fitness_center</span>
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
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-vector/hand-drawn-innovation-concept_23-2149171106.jpg?t=st=1724217740~exp=1724221340~hmac=f99ed80a22986882d6a8ec7e6f0dbdf799025cbb5ff345512c39f415a4ab2014&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_price">
                    <small>₹ &nbsp; 3000</small>
                    <i className='bx bxs-purchase-tag' ></i>
                  </div>
                <div className="product_details">
                  <h4>Broad technical understanding</h4>
                  <small>
                    {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sequi, ipsa nostrum ipsam ab praesentium. Pariatur iste non enim nesciunt.
                  </small>
                  <a href="">
                  <button>More details</button>
                  </a>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-vector/business-man-avatar-cartoon_24640-47590.jpg?t=st=1724217836~exp=1724221436~hmac=bb5bf8be717d76f8a1d1ebda93c1c981959e8491164a18e25fa734306aa62fcc&w=740"
                    alt="product"
                  />
                </div>
                <div className="product_price">
                    <small>₹ &nbsp; 2000</small>
                    <i className='bx bxs-purchase-tag' ></i>
                  </div>
                <div className="product_details">
                  <h4>Service Level Management</h4>
                  <small>
                   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad non quibusdam error eius! Beatae laborum, consequuntur tempora veniam exercitationem rem?
                  </small>
                  <a href="">
                  <button>More details</button>
                  </a>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/premium-photo/employee-work-load-icon_1197797-239630.jpg?w=900"
                    alt="product"
                  />
                </div>
                <div className="product_price">
                    <small>₹ &nbsp; 1000</small>
                    <i className='bx bxs-purchase-tag' ></i>
                  </div>
                <div className="product_details">
                  <h4>Service Engineering</h4>
                  <small>
                    {" "}
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, libero. Aspernatur quia eligendi sit minima laborum sint ratione quidem. Velit.
                  </small>
                  <a href="">
                  <button>More details</button>
                  </a>
                
                </div>
              </div>
            </Slide>
          </div>
        </div>
        {/* //Appinment */}
        <div className="row_6">
          <div className="manager_title">
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

        {/* Gallery */}
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
            </div>
          </div>
        </div>
        {/* Testimonial */}
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
        {/* GoogleMap */}

        <div className="google_map_container">
          <div className="manager_title">
            <h3>Live Location</h3>
          </div>

          <div className="google_map">
            <HtmlRenderer htmlString={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650172790676!2d80.23659527507537!3d13.044262813281074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAristostech%20India%20Pvt%20Ltd%20Software%20Company%20%26%20Website%20Design%20Experts!5e0!3m2!1sen!2sin!4v1724171244060!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`} />
          </div>
        </div>

        {/* Feedback */}
        <div className="row_10">
          <div className="manager_title">
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
                  See All Feedbacks
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
          <div className="manager_title">
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
  );
};


export default Manager_Demo;
