import React, { useEffect, useState } from "react";
import "./Fashion_Designer_Demo.scss";
import banner from "../../../assets/AllVCard_Image/VCard3/Banner.jpg";

import fashion1 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion2.png";
import fashion2 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion1.png";
import fashion3 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion3.png";
import fashion4 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion4.png";
import fashion5 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion5.png";
import fashion6 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion6.png";
import fashion7 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion7.png";
import fashion8 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion8.png";
import fashion9 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion9.png";
import fashion10 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion10.png";
import fashion11 from "../../../assets/AllVCard_Image/Fashion_Designer/fashion11.png";
import fashion12 from "../../../assets/AllVCard_Image/Fashion_Designer/12.png";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import vCardsJS from "vcards-js";
const Fashion_Designer_Demo = () => {
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  let fashionIcons = [
    fashion1,
    fashion2,
    fashion3,
    fashion4,
    fashion5,
    fashion6,
    fashion7,
    fashion8,
    fashion9,
    fashion10,
    fashion11,
    fashion12,
  ];
  const [fashionIconIndex, setFashionIconIndex] = useState(0);
    // /Fashion stress:
    useEffect(() => {
      if (fashionIconIndex >= 0) {
        if (fashionIconIndex < fashionIcons.length) {
          const timer = setTimeout(() => {
            setFashionIconIndex(fashionIconIndex + 1);
          }, 5000);
  
          // Cleanup the timer
          return () => {
            clearTimeout(timer);
          };
        }
      }
      if (fashionIconIndex === 12) {
        setFashionIconIndex(0);
      }
    }, [fashionIconIndex]);
  let bannerImages=['https://img.freepik.com/free-photo/female-fashion-designer-working-studio-sitting-desk_155003-17085.jpg?t=st=1722620141~exp=1722623741~hmac=2600260415736230b94f075a655befc0207fc4ddf7e9b441a4d218426cb75f81&w=900','https://img.freepik.com/free-photo/female-fashion-designer-working-studio-sitting-desk_155003-17084.jpg?t=st=1722629038~exp=1722632638~hmac=84f26cfbb8fa2162126520c8d085144c9d7a8eb2583d65b24a16f853d39f6682&w=900','https://img.freepik.com/free-photo/fashion-designer-woman-working-studio-sitting-desk_155003-2461.jpg?t=st=1722629056~exp=1722632656~hmac=d8f30ab33efe964a8a68faf2d322c1fcdc949f33aa574ccaf2c2befd985af241&w=900']
  const [bannerIndex, setBannerIndex] = useState(0);
  // /Fashion stress:
  useEffect(() => {
    if (bannerIndex >= 0) {
      if (bannerIndex < bannerImages.length) {
        const timer = setTimeout(() => {
          setBannerIndex(bannerIndex + 1);
        }, 5000);

        // Cleanup the timer
        return () => {
          clearTimeout(timer);
        };
      }
    }
    if (bannerIndex === 3) {
      setBannerIndex(0);
    }
  }, [fashionIconIndex])
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
    <div className="Fashion_Designer_container">
      <div className="Fashion_Designer_box">
        {/* Banner and logo and details and socialMedias */}
        <div className="row_1">
          <div className="banner_image">
            <img
              src={bannerImages[bannerIndex]}
              alt="banner"
            />
            <div className="overlay"></div>
          </div>
          <div className="user_logo">
            <img
              src="https://img.freepik.com/free-vector/illustration-boutique-shop-logo-stamp-banner_53876-6837.jpg?t=st=1722621000~exp=1722624600~hmac=8fd421fab03a9aca1b30284602caf88db67da42fb9a12f5ee75fd202c87026f7&w=740"
              alt="user_logo"
            />
          </div>
        </div>
        {/* Summary */}
        <div className="row_2">
          <div className="user_details">
            <div className="user_data">
              <div className="user_information">
                <h2>Marry Johnson</h2>
                <p>
                  Fashion Designer{" "}
                  <img src={fashionIcons[fashionIconIndex]} alt="fashion" />
                </p>
              </div>
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
          <div className="summary">
            <p>
              We started from a traditional marketing background and emerged to
              be a successful Digital Marketing Agency since Digitalisation has
              begun to evolve.
            </p>
          </div>
        </div>
        {/* ContactDetails */}
        <div className="row_3">
          <div className="fashion_title">
            <h3>#&nbsp;Contact Details</h3>
            {/* Contact */}
          </div>

          <div className="contact_list_container">
            <div className="contact_list">
              <div className="icons">
                <i class="bx bxl-gmail"></i>
                {/* <small>Email</small> */}
              </div>

              <div className="list_detail">
                <p>jayakumarv@aristostech.in</p>
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-mobile-vibration"></i>
                {/* <small>Mobile Number</small> */}
              </div>

              <div className="list_detail">
                <p>(+91) 93444 82370</p>
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-envelope"></i>
                {/* <small>Company Email</small> */}
              </div>

              <div className="list_detail">
                <p>contact@aristostech.in</p>
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-map-alt"></i>
                {/* <small>Address</small> */}
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
        {/* Services */}
        <div className="row_4">
          <div className="fashion_title">
            <h3>#&nbsp;Our Services</h3>
          </div>

          <div className="service_list_container">
            <div className="service_list">
              <span className="material-symbols-outlined">palette</span>

              <div className="service_detail">
                <div className="service_title">
                  <h4>Color direction</h4>
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
              <span className="material-symbols-outlined">view_quilt</span>
              <div className="service_detail">
                <div className="service_title">
                  <h4>Catalog layout</h4>
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
        {/* Gallery */}
        <div className="row_8">
          <div className="fashion_title">
            <h3>#&nbsp;Gallery</h3>
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
                slidesToShow={width < 600 ? 2 : 2}
                indicators={false}
                autoplay
                {...gallery_properties}
                autoplayInterval={1000}
              >
                <img
                  src="https://img.freepik.com/premium-vector/fashion-designer-violet-concept-with-people-scene-flat-cartoon-style-fashion-designer_198565-3738.jpg?w=900"
                  alt="developer"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/fashion-designer-woman-working-studio-sitting-desk_155003-2462.jpg?t=st=1722621894~exp=1722625494~hmac=1a3a0dcf77f739b90a6a48cac1067710bf167740bb4e0125c3696d1f59f439ac&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/beautiful-woman-showing-new-dress_23-2147688748.jpg?t=st=1722621912~exp=1722625512~hmac=5f085dae3ea305898277cad38fc6def45f4ac3a9707fcf7e21872301dd9ff56e&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/emotional-funny-attractive-woman-holding-colorful-dresses-hanger-clothing-store_285396-4615.jpg?t=st=1722621932~exp=1722625532~hmac=76da5fd66d6aefca0f7e92a77f015312a2cb6367a26fa80f2ca671de6a747e32&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </Slide>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="row_7">
          <div className="fashion_title">
            <h3>
              
              #&nbsp;Our Products
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
              autoplayInterval={500}
            >
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/measuring-tape-still-life_23-2150404681.jpg?t=st=1722625614~exp=1722629214~hmac=978928d5c0263e973785df89a0ed957db40663e7c192cd597c77c8e54dffa261&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4>A Measuring Tape</h4>
                  <small> The first tool is the humble measuring tape. That is something that every single fashion design equipment list will mandatorily have.</small>
                  <button>₹ &nbsp;100</button>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/fashion-designer-s-studio-with-essential-elements_23-2150414725.jpg?t=st=1722625741~exp=1722629341~hmac=84bd284f5b3aa92e8c6bc2b2520b06860816e2be217af9f0fef4fd680c2aa40d&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4>A Sharp Pair of Scissors</h4>
                  <small> These are one of the main fashion design tools, whether one is a student or a professional. </small>
                  <button>₹ &nbsp;350</button>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/top-view-colorful-threads-dark-wall_179666-39993.jpg?t=st=1722625823~exp=1722629423~hmac=7b18347c8a4ff121a9d2030a9acf3888bdfed350102502d7db5dae725ce7dcea&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4> Tailor’s Chalk</h4>
                  <small>Another important fashion tool is tailor’s chalk. Designers keep an entire army of chalk with them!</small>
                  <button>₹ &nbsp;150</button>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/needles-sewing-threads-used-by-hands-top-view_23-2148355047.jpg?t=st=1722625911~exp=1722629511~hmac=15241672681e221a6f947afa270937a85ee4edf8efc894d09ee89ad0716a1bfe&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4> Needles and Threads
                  </h4>
                  <small>These are also essentials in a fashion designer’s tool kit. They’re not usually used during the creation of the dress</small>
                  <button>₹ &nbsp;450</button>
                </div>
              </div>
              <div className="product_list">
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/natural-white-cotton-crumpled-soft-fabric-texture-background-surface_640221-220.jpg?t=st=1722625986~exp=1722629586~hmac=3a95d4ed209a4c8ed5f077c3003e02eb0e534128aa9f4fdd78dc3363d74b07d1&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                  <h4> Muslin Fabric
                  </h4>
                  <small>Muslin is a cotton fabric that can range in weight – from sheers to coarse material.</small>
                  <button>₹ &nbsp;1000</button>
                </div>
              </div>
            </Slide>
          </div>
        </div>
        {/* //Appinment */}
        <div className="row_6">
          <div className="fashion_title">
            <h3>
              
             #&nbsp;Make An Appoinment
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
          <div className="fashion_title">
            <h3>
            
              #&nbsp;Testimonial
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
        {/* QRCode */}
        <div className="row_12">
          <div className="fashion_title">
            <h3>
              #&nbsp;QRCode
            </h3>
            {/* Contact */}
          </div>

          <div className="qrcode_container">
            <div className="qr_code_box">
              <h4>
                <small>Note :</small>Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Ducimus, enim?
              </h4>

              <img
                src="https://img.freepik.com/premium-photo/qr-code-area-3d-illustration_118019-6664.jpg?w=740"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Opentime */}
        <div className="row_5">
          <div className="fashion_title">
            <h3>
              #&nbsp;Open&Close Time
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
          <div className="fashion_title">
            <h3>Live Location</h3>
          </div>

          <div className="google_map">
            <HtmlRenderer htmlString={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650172790676!2d80.23659527507537!3d13.044262813281074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAristostech%20India%20Pvt%20Ltd%20Software%20Company%20%26%20Website%20Design%20Experts!5e0!3m2!1sen!2sin!4v1724171244060!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`} />
          </div>
        </div>
        {/* Feedback */}
        <div className="row_10">
          <div className="fashion_title">
            <h3>
            #&nbsp;Feedback
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
          <div className="fashion_title">
            <h3>
          
              #&nbsp;Inquries
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#be96d8b6" fill-opacity="1" d="M0,32L40,42.7C80,53,160,75,240,96C320,117,400,139,480,149.3C560,160,640,160,720,160C800,160,880,160,960,154.7C1040,149,1120,139,1200,160C1280,181,1360,235,1400,261.3L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fashion_Designer_Demo;
