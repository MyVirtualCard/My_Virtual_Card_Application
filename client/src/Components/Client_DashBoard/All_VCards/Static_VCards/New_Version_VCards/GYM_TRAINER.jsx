import React, { useEffect, useRef, useState } from "react";
import "./GYM_TRAINER.scss";
//service Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiSolidPhoneCall, BiSolidVideo } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { FaDirections } from "react-icons/fa";
import { MdOutgoingMail, MdSchedule } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { IoHome, IoMail } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { GrChat, GrGallery, GrMapLocation } from "react-icons/gr";
import { TbUnlink } from "react-icons/tb";
import { useFormik } from "formik";
import { RiFileCopyLine } from "react-icons/ri";
import { LiaHandPointDownSolid } from "react-icons/lia";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiSquareChevDown, CiSquareChevUp } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdMiscellaneousServices } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { TbMessageChatbotFilled } from "react-icons/tb";
import * as Yup from "yup";
import vCardsJS from "vcards-js";
const GYM_TRAINER_DEMO = () => {
  let style = {
    $first_back__color: "#ffffff",
    $second_back__color: "#6b6b6b",
    $third_back__color: "#303030",
    //Root Background
    $root_backgound: "#fcfdc8,#ffffff",
    //Vcard background
    $vcard_back_color: "#a1046d",
    //SVG Wave backgound
    $svg_wave_back_color: "#ffffff",
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
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
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
    linkElement.setAttribute("download", "Aristostech.vcf");
    linkElement.style.display = "none";
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  }
  //Gallery Functionality
  //openFullImage preview:
  function openFullImage(pic) {
    let fullImageBox = document.getElementById("fullImageBox");
    let fullImage = document.getElementById("fullImage");
    fullImageBox.style.display = "block";
    fullImage.src = pic;
    scrollToSection(GalleryRef), 
    setActiveMenu("Gallery")
  }

  //Close FullImage Preview
  function closeFullImage() {
    let fullImageBox = document.getElementById("fullImageBox");

    fullImageBox.style.display = "none";
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
  let totalHeight;
  let [scrollY, setScrollY] = useState(0);
  let innerHeight;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      innerHeight = window.innerHeight; // Height of the viewport
      setScrollY(window.scrollY); // Number of pixels scrolled vertically
      totalHeight = innerHeight + scrollY; // Total height scrolled + viewport height
    });
  }, []);
  //Menu actions

  let [activeMenu, setActiveMenu] = useState("Home");
  let HomeRef = useRef(null);

  let AboutRef = useRef(null);
  let ServiceRef = useRef(null);
  let ProductRef = useRef(null);
  let PaymentRef = useRef(null);
  let GalleryRef = useRef(null);
  let VideoRef = useRef(null);
  let TimeRef = useRef(null);
  let TestimonialRef = useRef(null);
  let LocationRef = useRef(null);
  let AppinmentRef = useRef(null);
  let FeedbackRef = useRef(null);
  let InquiryRef = useRef(null);
  let scrollToSection = (elementRef) => {
    console.log(elementRef);
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function HandleMenuDown() {
    if (activeMenu === "Home") {
      return scrollToSection(AboutRef), setActiveMenu("About");
    };
    if (activeMenu === "About") {
      return scrollToSection(ServiceRef), setActiveMenu("Service");
    };
    if (activeMenu === "Service") {
      return scrollToSection(ProductRef), setActiveMenu("Product");
    };
    if (activeMenu === "Product") {
      return scrollToSection(PaymentRef), setActiveMenu("Payment");
    };
    if (activeMenu === "Payment") {
      return scrollToSection(GalleryRef), setActiveMenu("Gallery");
    };
    if (activeMenu === "Gallery") {
      return scrollToSection(VideoRef), setActiveMenu("Video");
    };
    if (activeMenu === "Video") {
      return scrollToSection(TimeRef), setActiveMenu("Time");
    };
    if (activeMenu === "Time") {
      return scrollToSection(TestimonialRef), setActiveMenu("Testimonial");
    };
    if (activeMenu === "Testimonial") {
      return scrollToSection(LocationRef), setActiveMenu("Location");
    };
    if (activeMenu === "Location") {
      return scrollToSection(FeedbackRef), setActiveMenu("Feedback");
    };
    if (activeMenu === "Feedback") {
      return scrollToSection(InquiryRef), setActiveMenu("Inquiry");
    };
  };
  function HandleMenuUp() {
    if (activeMenu === "About") {
      return scrollToSection(HomeRef), setActiveMenu("Home");
    };
    if (activeMenu === "Service") {
      return scrollToSection(AboutRef), setActiveMenu("About");
    };
    if (activeMenu === "Product") {
      return scrollToSection(ServiceRef), setActiveMenu("Service");
    };
    if (activeMenu === "Payment") {
      return scrollToSection(ProductRef), setActiveMenu("Product");
    };
    if (activeMenu === "Gallery") {
      return scrollToSection(PaymentRef), setActiveMenu("Payment");
    };
    if (activeMenu === "Video") {
      return scrollToSection(GalleryRef), setActiveMenu("Gallery");
    };
    if (activeMenu === "Time") {
      return scrollToSection(VideoRef), setActiveMenu("Video");
    };
    if (activeMenu === "Testimonial") {
      return scrollToSection(TimeRef), setActiveMenu("Time");
    };
    if (activeMenu === "Location") {
      return scrollToSection(TestimonialRef), setActiveMenu("Testimonial");
    };
    if (activeMenu === "Feedback") {
      return scrollToSection(LocationRef), setActiveMenu("Location");
    };
    if (activeMenu === "Inquiry") {
      return scrollToSection(FeedbackRef), setActiveMenu("Feedback");
    };
  };
  useEffect(() => {
    const handleScroll = () => {
      const section1Top = HomeRef.current?.offsetTop || 0;
      const section2Top = AboutRef.current?.offsetTop || 0;
      const section3Top = ServiceRef.current?.offsetTop || 0;
      const section4Top = ProductRef.current?.offsetTop || 0;
      const section5Top = PaymentRef.current?.offsetTop || 0;
      const section6Top = GalleryRef.current?.offsetTop || 0;
      const section7Top = VideoRef.current?.offsetTop || 0;
      const section8Top = AppinmentRef.current?.offsetTop || 0;
      const section9Top = TimeRef.current?.offsetTop || 0;
      const section10Top = TestimonialRef.current?.offsetTop || 0;
      const section11Top = LocationRef.current?.offsetTop || 0;
      const section12Top = FeedbackRef.current?.offsetTop || 0;
      const section13Top = InquiryRef.current?.offsetTop || 0;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (scrollPosition >= section1Top && scrollPosition < section2Top) {
        setActiveMenu("Home");
      } else if (
        scrollPosition >= section2Top &&
        scrollPosition < section3Top
      ) {
        setActiveMenu("About");
      } else if (
        scrollPosition >= section3Top &&
        scrollPosition < section4Top
      ) {
        setActiveMenu("Service");
      } else if (
        scrollPosition >= section4Top &&
        scrollPosition < section5Top
      ) {
        setActiveMenu("Product");
      } else if (
        scrollPosition >= section5Top &&
        scrollPosition < section6Top
      ) {
        setActiveMenu("Payment");
      } else if (
        scrollPosition >= section6Top &&
        scrollPosition < section7Top
      ) {
        setActiveMenu("Gallery");
      } else if (
        scrollPosition >= section7Top &&
        scrollPosition < section8Top
      ) {
        setActiveMenu("Video");
      } else if (
        scrollPosition >= section8Top &&
        scrollPosition < section9Top
      ) {
        setActiveMenu("Appoinment");
      } else if (
        scrollPosition >= section9Top &&
        scrollPosition < section10Top
      ) {
        setActiveMenu("Time");
      } else if (
        scrollPosition >= section10Top &&
        scrollPosition < section11Top
      ) {
        setActiveMenu("Testimonial");
      } else if (
        scrollPosition >= section11Top &&
        scrollPosition < section12Top
      ) {
        setActiveMenu("Location");
      } else if (
        scrollPosition >= section12Top &&
        scrollPosition < section13Top
      ) {
        setActiveMenu("Feedback");
      } else if (scrollPosition >= section13Top) {
        setActiveMenu("Inquiry");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
  return (
    <div className="GYM_TRAINER_DEMO_CONTAINER">
      {/* Gallery Full IMAGE */}
      <div
        className="full_image"
        id="fullImageBox"
        style={{ position: "absolute", top: scrollY }}
      >
        <div className="close_Full_Image_gallery">
          <RiCloseLargeLine className="icon" onClick={closeFullImage} />
        </div>
        <img src='' alt="gallery" id="fullImage" />
      </div>
      {/* Menu Navbar */}
      <div className="menu_navbar_box">
        <div className={`up_btn ${activeMenu === 'Home' ? 'hideUpArrow' :''}`}>
          <CiSquareChevUp onClick={HandleMenuUp} className="icon" />
        </div>
        <div className="all_menus">
          <div
            className={`menu ${activeMenu === "Home" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(HomeRef), setActiveMenu("Home");
            }}
          >
            <IoHome className="icon" />
            <p>Home</p>
          </div>
          <div
            className={`menu ${activeMenu === "About" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(AboutRef), setActiveMenu("About");
            }}
          >
            <BiSolidUserDetail className="icon" />
            <p>About</p>
          </div>
          <div
            className={`menu ${activeMenu === "Service" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(ServiceRef), setActiveMenu("Service");
            }}
          >
            <MdMiscellaneousServices className="icon" />
            <p>Service</p>
          </div>
          <div
            className={`menu ${activeMenu === "Product" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(ProductRef), setActiveMenu("Product");
            }}
          >
            <AiFillProduct className="icon" />
            <p>Product</p>
          </div>
          <div
            className={`menu ${activeMenu === "Payment" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(PaymentRef), setActiveMenu("Payment");
            }}
          >
            <GiTakeMyMoney className="icon" />
            <p>Payment</p>
          </div>
          <div
            className={`menu ${activeMenu === "Gallery" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(GalleryRef), setActiveMenu("Gallery");
            }}
          >
            <GrGallery className="icon" />
            <p>Gallery</p>
          </div>
          <div
            className={`menu ${activeMenu === "Video" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(VideoRef), setActiveMenu("Video");
            }}
          >
            <BiSolidVideo className="icon" />
            <p>Videos</p>
          </div>
          <div
            className={`menu ${activeMenu === "Time" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(TimeRef), setActiveMenu("Time");
            }}
          >
            <MdSchedule className="icon" />
            <p>Time</p>
          </div>
          <div
            className={`menu ${
              activeMenu === "Testimonial" ? "menuActive" : ""
            }`}
            onClick={() => {
              scrollToSection(TestimonialRef), setActiveMenu("Testimonial");
            }}
          >
            <MdOutlineRateReview className="icon" />
            <p>Testi..al</p>
          </div>
          <div
            className={`menu ${activeMenu === "Location" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(LocationRef), setActiveMenu("Location");
            }}
          >
            <GrMapLocation className="icon" />
            <p>Location</p>
          </div>
          <div
            className={`menu ${activeMenu === "Feedback" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(FeedbackRef), setActiveMenu("Feedback");
            }}
          >
            <VscFeedback className="icon" />
            <p>Feedback</p>
          </div>
          <div
            className={`menu ${activeMenu === "Inquiry" ? "menuActive" : ""}`}
            onClick={() => {
              scrollToSection(InquiryRef), setActiveMenu("Inquiry");
            }}
          >
            <TbMessageChatbotFilled className="icon" />
            <p>Inquries</p>
          </div>
        </div>
        <div className={`down_btn ${activeMenu === 'Inquiry' ? 'hideDownArrow' :''}`}>
          <CiSquareChevDown onClick={HandleMenuDown} className="down" />
        </div>
      </div>
      <div className="doctor_box">
        {/* Banner and logo */}
        <div className="Image_row_1" ref={HomeRef}>
          <div className="banner_image">
            <img
              src="https://img.freepik.com/premium-photo/man-with-beard-blue-tank-top-is-holding-barbell-with-words-youre-doing-it_1270349-52370.jpg?w=1060"
              alt="banner"
            />
            <div className="overlay"></div>
          </div>
          <div className="user_logo">
            <div className="logo">
            <img
              src="https://img.freepik.com/free-photo/portrait-rugby-player_23-2151059762.jpg?t=st=1727171007~exp=1727174607~hmac=dfd79ca02cd9fad067077b80aa474426f3aaddc296381ea043bf42cbd9714119&w=740"
              alt="user_logo"
            />
            </div>
         
                   {/* basic Details */}
        <div className="basic_row_2">
          <div className="user_details">
            <div className="user_data">
              <div className="user_information">
                <h2>Alexander</h2>
                <p>GYM TRAINER</p>
              </div>

              {/* Actions */}
              <div className="contacts_btns">
          {/* Call */}
          <a href="tel:+919344482370" target="_blank">
            <BiSolidPhoneCall className="icon" />

            <small>Call</small>
          </a>
          {/* Mail */}
          <a href={`mailto:contact@aristostechindia.com`} target="_blank">
            <MdOutgoingMail className="icon" />

            <small>Mail</small>
          </a>
          {/* Whatsup */}
          <a
            href={`https://wa.me/+919344482370?text=${encodeURIComponent(
              `Hi there!`
            )}`}
            target="_blank"
          >
            <RiWhatsappFill className="icon" />

            <small>Whatsapp</small>
          </a>
          {/* Direction */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query="No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017`}
            target="_blank"
          >
            <FaDirections className="icon" />

            <small>Direction</small>
          </a>
        </div>
            </div>
          </div>
        </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="contact_row_3">
          {/* Location */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query="No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017`}
            target="_blank"
          >
            <div className="icon">
              <MdLocationPin />
            </div>
            <div className="contact_data">
              <small>Address</small>
              <p>G. N Chetty Road, T. Nagar, Chennai-600017</p>
            </div>
          </a>
          {/* Mail */}
          <a href={`mailto:contact@aristostechindia.com`} target="_blank">
            <div className="icon">
              <IoMail />
            </div>
            <div className="contact_data">
              <small>Email</small>
              <p>contact@aristostechindia.com</p>
              <p>aristostechteam@gmail.com</p>
            </div>
          </a>
          {/* Website */}
          <a href="https://aristostechindia.com" target="_blank">
            <div className="icon">
              <FaGlobe />
            </div>
            <div className="contact_data">
              <small>Website</small>
              <p>https://aristostechindia.com</p>
            </div>
          </a>
          {/* PhoneNumber */}
          <a href="tel:+919344482370" target="_blank">
            <div className="icon">
              <BiSolidPhoneCall />
            </div>
            <div className="contact_data">
              <small>MobileNumber</small>
              <p>+91 93444 82370</p>
              <p>+91 93635 47744</p>
            </div>
          </a>
          {/* AddtoContact */}
          <div className="add_to_contact">
            <button onClick={generateVCF}>
              Add to Contact<i className="bx bxs-contact"></i>
            </button>
          </div>
        </div>

        {/* About US */}
        <div className="about_row_4" ref={AboutRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>About Us<span className="material-symbols-outlined">
person
</span></h3>
          </div>

          <div className="about_details">
            <div className="detail">
              <div className="detail_title">
                <h5>Company Name</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>Aristostech India Private Limited..</p>
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>Category</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>IT Company</p>
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>Year of Est..</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>2017</p>
              </div>
            </div>

            <div className="detail">
              <div className="detail_title">
                <h5>Nature Of Business</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>
                  Digital Visiting Card,NFC Business Cards, NFC Google Review
                  Card
                </p>
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>SocialMedia's</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                {/* SocialMedia */}
                <div className="social_medias">
                  <a
                    href="https://www.facebook.com/aristostechindia"
                    target="_blank"
                    className="social_media_icon"
                  >
                    <i className="bx bxl-facebook"></i>
                    <small>Facebook</small>
                    <div className="social_media_svg1">
                      <svg
                        id="sw-js-blob-svg"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                      >
                        <defs>
                          <linearGradient
                            id="sw-gradient"
                            x1="0"
                            x2="1"
                            y1="1"
                            y2="0"
                          >
                            <stop
                              id="stop1"
                              stop-color="rgba(248, 117, 55, 1)"
                              offset="0%"
                            ></stop>
                            <stop
                              id="stop2"
                              stop-color="rgba(251, 168, 31, 1)"
                              offset="100%"
                            ></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#sw-gradient)"
                          d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                          width="100%"
                          height="100%"
                          transform="translate(50 50)"
                          strokeWidth="0"
                          style={{ transition: 0.3 }}
                        ></path>
                      </svg>
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/aristostech_india/"
                    target="_blank"
                    className="social_media_icon"
                  >
                    <i className="bx bxl-instagram-alt"></i>
                    <div className="social_media_svg2">
                      <svg
                        id="sw-js-blob-svg"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                      >
                        <defs>
                          <linearGradient
                            id="sw-gradient2"
                            x1="0"
                            x2="1"
                            y1="1"
                            y2="0"
                          >
                            <stop
                              id="stop3"
                              stop-color="rgba(248, 117, 55, 1)"
                              offset="0%"
                            ></stop>
                            <stop
                              id="stop4"
                              stop-color="rgba(251, 168, 31, 1)"
                              offset="100%"
                            ></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#sw-gradient2)"
                          d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                          width="100%"
                          height="100%"
                          transform="translate(50 50)"
                          strokeWidth="0"
                          style={{ transition: 0.3 }}
                        ></path>
                      </svg>
                    </div>
                    <small>Instagram</small>
                  </a>
                  <a
                    href="https://wa.me/+919344482370?text=Welcome to Aristostech Team!, How can we assest u ?"
                    target="_blank"
                    className="social_media_icon"
                  >
                    <i className="bx bxl-whatsapp"></i>
                    <div className="social_media_svg3">
                      <svg
                        id="sw-js-blob-svg"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                      >
                        <defs>
                          <linearGradient
                            id="sw-gradient3"
                            x1="0"
                            x2="1"
                            y1="1"
                            y2="0"
                          >
                            <stop
                              id="stop5"
                              stop-color="rgba(248, 117, 55, 1)"
                              offset="0%"
                            ></stop>
                            <stop
                              id="stop6"
                              stop-color="rgba(251, 168, 31, 1)"
                              offset="100%"
                            ></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#sw-gradient3)"
                          d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                          width="100%"
                          height="100%"
                          transform="translate(50 50)"
                          strokeWidth="0"
                          style={{ transition: 0.3 }}
                        ></path>
                      </svg>
                    </div>
                    <small>Whatsup</small>
                  </a>
                  <a
                    href="https://wa.me/+919344482370?text=Welcome to Aristostech Team!, How can we assest u ?"
                    target="_blank"
                    className="social_media_icon"
                  >
                    <i className="bx bxl-twitter"></i>
                    <div className="social_media_svg6">
                      <svg
                        id="sw-js-blob-svg6"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                      >
                        <defs>
                          <linearGradient
                            id="sw-gradient6"
                            x1="0"
                            x2="1"
                            y1="1"
                            y2="0"
                          >
                            <stop
                              id="stop11"
                              stop-color="rgba(248, 117, 55, 1)"
                              offset="0%"
                            ></stop>
                            <stop
                              id="stop12"
                              stop-color="rgba(251, 168, 31, 1)"
                              offset="100%"
                            ></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#sw-gradient6)"
                          d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                          width="100%"
                          height="100%"
                          transform="translate(50 50)"
                          strokeWidth="0"
                          style={{ transition: 0.3 }}
                        ></path>
                      </svg>
                    </div>
                    <small>Twiter</small>
                  </a>

                  <a
                    href="https://maps.app.goo.gl/PCJCqMK7UJBNxBuf9"
                    target="_blank"
                    className="social_media_icon"
                  >
                    <i className="bx bx-map"></i>
                    <div className="social_media_svg4">
                      <svg
                        id="sw-js-blob-svg"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                      >
                        <defs>
                          <linearGradient
                            id="sw-gradient4"
                            x1="0"
                            x2="1"
                            y1="1"
                            y2="0"
                          >
                            <stop
                              id="stop7"
                              stop-color="rgba(248, 117, 55, 1)"
                              offset="0%"
                            ></stop>
                            <stop
                              id="stop8"
                              stop-color="rgba(251, 168, 31, 1)"
                              offset="100%"
                            ></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#sw-gradient4)"
                          d="M17.1,-26.9C23.4,-22.6,30.6,-19.9,34.1,-14.8C37.5,-9.7,37.2,-2.2,35,4.2C32.8,10.7,28.7,16,24.4,21.2C20,26.3,15.3,31.3,9.6,33.3C3.9,35.3,-2.9,34.2,-10.4,33.1C-18,32,-26.2,30.9,-29.8,26.2C-33.3,21.4,-32.3,12.9,-33.4,4.8C-34.5,-3.3,-37.7,-11,-36,-17.2C-34.3,-23.4,-27.7,-28,-20.8,-32.1C-14,-36.2,-7,-39.7,-0.8,-38.4C5.4,-37.2,10.8,-31.2,17.1,-26.9Z"
                          width="100%"
                          height="100%"
                          transform="translate(50 50)"
                          strokeWidth="0"
                          style={{ transition: 0.3 }}
                        ></path>
                      </svg>
                    </div>
                    <small>Location</small>
                  </a>
              
                </div>
              </div>
            </div>
          </div>
          <div className="GYM_TRAINER_DEMO_SUB_TITLE">
            <h3>Our Specialities</h3>
          </div>
          <div className="specialities">
            <ul>
              <li>
              Personal training: Evaluate clients' fitness levels and goals, and create personalized training programs.
              </li>
              <li>Group fitness instruction: Lead group exercise classes, such as cardiovascular exercises, stretching, or muscle strengthening.</li>
              <li>Nutrition: Create meal plans for clients based on their needs and goals.</li>
              <li>Strength and conditioning: Offer specialized athletic training..</li>
              <li>Corrective exercise: Help clients with movement dysfunction.</li>{" "}
              <li>Senior fitness: Help older clients with fitness challenges.</li>{" "}
              <li>
              Sports performance: A specialization within the fitness industry.
              </li>
            </ul>
          </div>
        </div>
        {/* Our Services */}
        <div className="our_services" ref={ServiceRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>Our Services<span className="material-symbols-outlined">
design_services
</span></h3>
          </div>
          <div className="All_Services">
            {/* Service */}
            <div className="Service">
              <div className="service_title">
                <h5>Personalized training programs</h5>
              </div>
              <div className="service_description">
                <p>
                Personalized training is a tailored approach to learning and development that addresses the specific needs and preferences of individual learners.
                </p>

                <p>
                It goes beyond a one-size-fits-all approach by customizing training content, delivery methods, and pace to match the learner's knowledge, skills, and learning style.
                </p>
              </div>
              <div className="service_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div>
              <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/young-sports-people-training-morning-gym_1157-28958.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                  alt="service_image"
                />
              </div>
              <div className="service_action">
                <div className="service_price">
                  <h5>Price : &nbsp;</h5>
                  <p>₹2000</p>
                </div>
                <div className="service_enquiry">
                  <a href="#" target="_blank" className="service_button">
                    Enquire Now <GrChat />
                  </a>
                </div>
              </div>
            </div>
            {/* Service */}
            <div className="Service">
              <div className="service_title">
                <h5>Nutrition Advice </h5>
              </div>
              <div className="service_description">
                <p>
                Eat a variety of foods: Eat a variety of foods from each of the five food groups, including fruits, vegetables, whole grains, protein sources, and healthy fats. 

                </p>

                <p>
                Reduce unhealthy fats, salt, and sugar: Eat less salt, sugars, and saturated and industrially-produced trans-fats.
                </p>
              </div>
              <div className="service_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div>
              <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/nutrition-facts-comparison-food-dietery_53876-123817.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                  alt="service_image"
                />
              </div>
              <div className="service_action">
                <div className="service_price">
                  <h5>Price : &nbsp;</h5>
                  <p>₹1000</p>
                </div>
                <div className="service_enquiry">
                  <a href="#" target="_blank" className="service_button">
                    Enquire Now <GrChat />
                  </a>
                </div>
              </div>
            </div>
            {/* Service */}
            <div className="Service">
              <div className="service_title">
                <h5>Motivational Coaching</h5>
              </div>
              <div className="service_description">
                <p>
                Motivational coaches focus on helping clients tap into their inner resources and push themselves to achieve their goals and lead more fulfilling lives.
                </p>

                <p>
                It's important to note that while coaches often act as cheerleaders for clients, motivational coaches understand that real motivation comes from within.
                </p>
              </div>
              <div className="service_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div>
              <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/portrait-basketball-coach-with-player_23-2151098185.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                  alt="service_image"
                />
              </div>
              <div className="service_action">
                <div className="service_price">
                  <h5>Price : &nbsp;</h5>
                  <p>₹3000</p>
                </div>
                <div className="service_enquiry">
                  <a href="#" target="_blank" className="service_button">
                    Enquire Now <GrChat />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Our Product */}
        <div className="our_products" ref={ProductRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>Our Products<span className="material-symbols-outlined">
shopping_cart
</span></h3>
          </div>
          <div className="All_Products">
            {/* Product */}
            <div className="Product">
              <div className="product_image">
                <img src='https://img.freepik.com/premium-photo/gym-with-large-window-large-window-with-view-back-gym_1064589-39949.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid' alt="service_image" />
              </div>
              <div className="product_action">
                <div className="product_price">
                  <h5>Price : &nbsp;</h5>
                  <p>₹5000</p>
                </div>
                <div className="product_enquiry">
                  <a href="#" target="_blank" className="product_button">
                    Enquire Now <GrChat />
                  </a>
                </div>
              </div>
              <div className="product_title">
                <h5>Treadmills</h5>
              </div>
              <div className="product_description">
                <p>
                Rather than the user powering a mill, the device provides a moving platform with a wide conveyor belt driven by an electric motor or a flywheel. 
                </p>
                <p>
                The belt moves to the rear, requiring the user to walk or run at a speed matching the belt. The rate at which the belt moves is the rate of walking or running.
                </p>
              
              </div>
              <div className="product_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div>
            </div>
            {/* Product */}
            <div className="Product">
              <div className="product_image">
                <img
                  src="https://img.freepik.com/premium-photo/machine-with-word-gears-it_9493-74095.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                  alt="service_image"
                />
              </div>
              <div className="product_action">
                <div className="product_price">
                  <h5>Price : &nbsp;</h5>
                  <p>₹7099</p>
                </div>
                <div className="product_enquiry">
                  <a href="#" target="_blank" className="product_button">
                    Enquire Now <GrChat />
                  </a>
                </div>
              </div>
              <div className="product_title">
                <h5>Exercise Bikes</h5>
              </div>
              <div className="product_description">
                <p>
                Exercise bikes are used for exercise, to increase general fitness, for weight loss, and for training for cycle events. 
                </p>

                <p>
                The exercise bike has long been used for physical therapy because of the low-impact, safe, and effective cardiovascular exercise it provides.
                </p>
              </div>
              <div className="product_link">
                <a href="#" target="_blank">
                  For More Details <TbUnlink />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Payment */}
        <div className="Payment" ref={PaymentRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>For Payment<span className="material-symbols-outlined">
payments
</span></h3>
          </div>
          <div className="payment_details">
            <div className="detail">
              <div className="detail_title">
                <h5>Paytm Number</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>+91-93444 82370</p>
                <RiFileCopyLine className="icon" />
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>PhonePay Number</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>+91-93444 82370</p>
                <RiFileCopyLine className="icon" />
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>Google Pay Number</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>+91-93444 82370</p>
                <RiFileCopyLine className="icon" />
              </div>
            </div>
          </div>

          <div className="sub_title">
            <h4>Account Details :</h4>
          </div>
          <div className="account_details">
          <div className="detail">
              <div className="detail_title">
                <h5>Account Holder Name</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>John Wick</p>
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>Bank Name</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>STATE BANK OF INDIA</p>
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>Account Type</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>Savings</p>
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>IFSC code</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>SBIN0007585</p>
                <RiFileCopyLine className="icon" />
              </div>
            </div>
            <div className="detail">
              <div className="detail_title">
                <h5>Account Number</h5>
              </div>
              <div className="detail_message">
                <strong>:</strong>
                <p>56676841548</p>
                <RiFileCopyLine className="icon" />
              </div>
            </div>
          </div>
          <div className="sub_title">
            <h4>QR Code :</h4>
          </div>
          <div className="qr_code_upi_name">
            <h4>Google Pay</h4>
          </div>
          <div className="qr_image_box">
            <div className="user_name">
              <h4>
                To Karthick<LiaHandPointDownSolid />
              </h4>
            </div>
            <div className="qr_image">
              <img
                src="https://img.freepik.com/premium-vector/qr-code-white-box-circle_78370-5879.jpg?w=740"
                alt="qrcode"
              />
            </div>
            <div className="quote">
              <small>Scan with pay any UPI App</small>
            </div>
          </div>
        </div>
        {/* Gallery */}
        <div className="gallery" ref={GalleryRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>Gallery<span className="material-symbols-outlined">
gallery_thumbnail
</span></h3>
          </div>

          <div className="all_gallerys">
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/free-photo/female-instructor-giving-training-young-woman-exercising-with-dumbbell_23-2147827948.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/free-photo/dumbbells-arrangement-gym_23-2150007137.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/premium-photo/commercial-gym-equipment-room-background-with-black-walls_1092689-36688.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/free-photo/cast-iron-dumbbell-weights_1048-11523.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/premium-photo/participate-fitness-challenge-exercise-rou-generative-ai_1198283-94300.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
            <div className="gallery_image">
              <img
                src="https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114221.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="image"
                onClick={(e) => openFullImage(e.target.src)}
              />
            </div>
          </div>
        </div>
        {/* Videos */}
        <div className="video" ref={VideoRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>Videos<span className="material-symbols-outlined">
video_library
</span></h3>
          </div>

          <div className="videos_container">
            <div className="video_image">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/eaRQF-7hhmo?si=rhJXPt75nvOfwQV1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div className="video_image">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/24fdcMw0Bj0?si=82wS4nfudZoDuTly" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        {/* Opentime */}
        <div className="row_5" ref={TimeRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>
              Open&Close Time<i className="bx bx-timer"></i>
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
        {/* Testimonials */}
        <div className="Testimonial" ref={TestimonialRef}>
          <div className="title">
            <h3>
           
              Testimonial
              <span className="material-symbols-outlined">
                settings_accessibility
              </span>
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

        <div className="google_map_container" ref={LocationRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>Live Location<span className="material-symbols-outlined">
map
</span></h3>
          </div>

          <div className="google_map">
            <HtmlRenderer
              htmlString={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650172790676!2d80.23659527507537!3d13.044262813281074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAristostech%20India%20Pvt%20Ltd%20Software%20Company%20%26%20Website%20Design%20Experts!5e0!3m2!1sen!2sin!4v1724171244060!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}
            />
          </div>
        </div>
        {/* Feedback */}
        <div className="feedback_row" ref={FeedbackRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>Feedback<span className="material-symbols-outlined">
forum
</span></h3>
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
                  rows="3"
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
        <div className="Inquries" ref={InquiryRef}>
          <div className="GYM_TRAINER_DEMO_TITLE">
            <h3>Inquries<span className="material-symbols-outlined">
info
</span></h3>
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
        <div className="Gym_Footer">
          <div className="gym_footer_container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill={style.$second_back__color}
                fill-opacity="1"
                d="M0,96L24,90.7C48,85,96,75,144,58.7C192,43,240,21,288,48C336,75,384,149,432,176C480,203,528,181,576,170.7C624,160,672,160,720,154.7C768,149,816,139,864,117.3C912,96,960,64,1008,48C1056,32,1104,32,1152,53.3C1200,75,1248,117,1296,138.7C1344,160,1392,160,1416,160L1440,160L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
              ></path>
            </svg>
            <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GYM_TRAINER_DEMO;
