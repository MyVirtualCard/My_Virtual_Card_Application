import React, { useRef, useEffect, useState } from "react";
import "./LandingPage.scss";
import brand_logo from "../../assets/LandingPage_image/BrandLogo2.png";
import { Link, NavLink } from "react-router-dom";
import slide_1_image from "../../assets/LandingPage_image/slide-1.png";
import illustraion from "../../assets/LandingPage_image/slide_right_svg.svg";
// import offer_sale_gif from "./assets/Website_page_images/offer_price.gif";
// import rocket from "./assets/animations/rocket.gif";
import message from "../../assets/animations/message.gif";
// import slide_1_image from "./assets/Website_page_images/home_page_images.png";
// import slide_1_image from "./assets/Website_page_images/home_page_right_image.svg";
// import vcard1 from "./assets/Digicards/1.png";
// import vcard2 from "./assets/Digicards/2.png";
// import vcard3 from "./assets/Digicards/3.png";
// import vcard4 from "./assets/Digicards/4.png";
// import vcard5 from "./assets/Digicards/5.png";
// import vcard6 from "./assets/Digicards/6.png";
// import vcard7 from "./assets/Digicards/7.png";

import vcard1 from "../../assets/Digicards/vmob-1.png";
import vcard2 from "../../assets/Digicards/vmob-2.png";
import vcard3 from "../../assets/Digicards/vmob-3.png";
import vcard4 from "../../assets/Digicards/vmob-4.png";
import vcard5 from "../../assets/Digicards/vmob-5.png";
import vcard6 from "../../assets/Digicards/vmob-6.png";
import vcard7 from "../../assets/Digicards/vmob-7.png";
// import vcard8 from './assets/Digicards/vmob-8.png';

import view1 from "../../assets/LandingPage_image/view/1.svg";
import view2 from "../../assets/LandingPage_image/view/2.svg";
import view3 from "../../assets/LandingPage_image/view/3.svg";

import number1 from "../../assets/Digicards/number1.png";
import number2 from "../../assets/Digicards/number2.png";
import number3 from "../../assets/Digicards/number3.png";
import nfc from "../../assets/LandingPage_image/view/4.png";
import Lottie from "react-lottie";

import anime1 from "../../assets/animations/Animation - 1717142280104.json";

import { toast, Toaster } from "react-hot-toast";
import { motion as m } from "framer-motion";
import {
  topNavAnime,
  left_slide_1Anime,
  right_slide_1Anime,
  title_slide_2Anime,
  vcard_slide_2Anime,
  title_slide_3Anime,
  box_slide_3Anime,
  title_slide_4Anime,
  left_cardShow_slide_4Anime,
  right_cardShow_slide_4Anime,
  title_slide_5Anime,
  numberBox_slide_5Anime,
  left_nfc_slide_5Anime,
  right_nfc_slide_5Anime,
  plan_title_slide_6Anime,
  plan_box_slide_5Anime,
  plan_content_slide_5Anime,
  title_slide_7Anime,
  qn_slide_7Anime,
  form_left_slide_8Anime,
} from "./framer_Motion_Anime_Object";
let plan_service_list = [
  {
    id: 1,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Basic Information",
  },
  {
    id: 2,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Social Media",
  },
  {
    id: 3,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Contact Details",
  },
  {
    id: 4,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Services",
  },
  {
    id: 5,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Products",
  },
  {
    id: 6,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Appoinment",
  },
  {
    id: 7,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Add to Contact",
  },
  {
    id: 8,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Blog",
  },
  {
    id: 9,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Gallery",
  },
  {
    id: 10,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Testimonials",
  },
  {
    id: 11,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Feedback Form",
  },
  {
    id: 12,
    icon: <i className="bx bxs-check-shield"></i>,
    text: "Inquiry Form",
  },
  {
    id: 13,
    icon: <i className="bx bxs-shield-x"></i>,
    text: "Dynamic Styling",
  },
  {
    id: 14,
    icon: <i className="bx bxs-shield-x"></i>,
    text: "IFrame",
  },
  {
    id: 15,
    icon: <i className="bx bxs-shield-x"></i>,
    text: "Custom QRCode",
  },
];

let questions = [
  {
    id: 1,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question: "1. What is a digital vCard?",
    answer:
      "A digital vCard, or virtual business card, is a modern alternative to traditional paper business cards. It contains essential contact information such as name, job title, company name, phone number, email address, and more, all stored in a digital format.",
  },
  {
    id: 2,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question: "2. How does the NFC feature work with digital vCards?",
    answer:
      "The NFC (Near Field Communication) feature allows you to share your digital vCard with others by simply tapping your NFC-enabled device against theirs. This instantaneously transfers your contact information without the need for manual input or scanning QR codes.",
  },
  {
    id: 3,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question: "3. What devices are compatible with the NFC feature?",
    answer:
      "Most modern smartphones and tablets are equipped with NFC technology, including Android and iOS devices. Ensure that your device’s NFC functionality is enabled to take advantage of this feature.",
  },
  {
    id: 4,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question: "4. Can I customize my digital vCard?",
    answer:
      "Yes, you can customize your digital vCard with your preferred design, including adding your company logo, choosing colors, and selecting fonts. You can also include additional information such as social media profiles and website links.",
  },
  {
    id: 5,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question: "5. Is there a limit to the number of vCards I can create?",
    answer:
      "No, there are no limits to the number of digital vCards you can create. You can generate multiple vCards for different purposes, such as personal, professional, or specific events.",
  },
  {
    id: 6,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question: "6. How do I share my digital vCard with others?",
    answer: `You can share your digital vCard in multiple ways:
    •Via NFC: Simply tap your device against another NFC-enabled device to transfer your vCard.
    •QR Code: Display a QR code containing your vCard information for others to scan.
    •Email: Send your digital vCard as an email attachment.
    •Messaging Apps: Share your vCard through messaging apps like WhatsApp or Telegram.`,
  },
  {
    id: 7,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question: "7. Can I update my digital vCard after creation?",
    answer:
      "Yes, you can update your digital vCard at any time. Changes you make to your contact information or design preferences will be reflected in the shared vCards.",
  },
  {
    id: 8,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question:
      "8. Is there a fee for using the NFC-enabled digital vCard service?",
    answer:
      "Our basic NFC-enabled digital vCard service is free to use. However, we may offer premium features or advanced customization options that come with a subscription fee.",
  },
  {
    id: 9,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question: "9. Is the NFC transfer secure?",
    answer:
      "Yes, the NFC transfer of digital vCards is secure and encrypted, ensuring that your contact information remains protected during the sharing process.",
  },
  {
    id: 10,
    plus: <i className="bx bx-plus"></i>,
    minus: <i className="bx bx-minus"></i>,
    question:
      "10. What if I encounter issues with NFC sharing or using digital vCards?",
    answer:
      "If you experience any difficulties with NFC sharing or using digital vCards, please refer to our comprehensive user guide or contact our customer support team for assistance. We’re here to help resolve any issues you may encounter.",
  },
];
const LandingPage = () => {
  const scrollContainerRef = useRef(null);
  let [planExpand, setPlanExpand] = useState(false);
  let [standardPlanExpand, setStandardPlanExpand] = useState(false);
  let [PremiumPlanExpand, setPremiumPlanExpand] = useState(false);
  let [showAnswer, setShowAnswer] = useState(false);
  let [ImageToggle, setImageToggle] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setImageToggle(!ImageToggle);
    }, 5000);
  });

  console.log(ImageToggle);
  // Offer timer

  let [Days, setDays] = useState("00");
  let [Hours, setHours] = useState("00");
  let [Minutes, setMinutes] = useState("00");
  let [Seconds, setSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("July 25, 2024 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        //Stop our timer
        clearInterval(interval.current);
      } else {
        //update our timer
        if (days < 10) {
          setDays("0" + days);
        } else {
          setDays(days);
        }

        if (hours < 10) {
          setHours("0" + hours);
        } else {
          setHours(hours);
        }
        if (minutes < 10) {
          setMinutes("0" + minutes);
        } else {
          setMinutes(minutes);
        }

        if (seconds < 10) {
          setSeconds("0" + seconds);
        } else {
          setSeconds(seconds);
        }
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);
  let [sideNavToggle, setSideNavToggle] = useState(false);
  let HomeRef = useRef(null);
  let TemplateRef = useRef(null);
  let FeatureRef = useRef(null);
  let NFCRef = useRef(null);
  let PricingRef = useRef(null);
  let FAQRef = useRef(null);
  let ContactRef = useRef(null);

  let scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollAmount = 3;
    const scrollStep = 0.2; // Adjust the speed of the scroll
    const delay = 5; // Adjust the delay for the scrolling effect

    const scrollHorizontally = () => {
      scrollAmount += scrollStep;
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;
        if (
          scrollAmount >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollAmount = 0; // Reset the scroll amount if it reaches the end
        }
      }
    };

    const intervalId = setInterval(scrollHorizontally, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  let [selectedQn, setSelectedQn] = useState(null);
  let [multiQnToggle, setMultiQnToggle] = useState(false);
  let [multiSelected, setMultiSelected] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelectedQn(getCurrentId === selectedQn ? null : getCurrentId);
  }

  function handleMultipleSelection(getCurrentId) {
    let copyMultiple = [...multiSelected];

    let findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiSelected(copyMultiple);
  }

  function handleMultipleToggle() {
    setMultiQnToggle(!multiQnToggle);
    if (multiQnToggle === false) {
      toast.success("Multi Selection Activated!");
    } else {
      toast.success("Single Selection Activated!");
    }
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: anime1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <m.div className="home_container">
        <Toaster position="top-right" />

        {/* whatsup_icons */}
        <m.div className="whatsup">
          <a href="https://wa.me/9344482370" target="_blank">
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/whatsapp--v1.png"
              alt="whatsapp--v1"
            />
          </a>
        </m.div>
        {/* Up Arrow icon */}
        <div className="up" onClick={() => scrollToSection(HomeRef)}>
          {/* <small>Bring me Top</small> */}
          <i className="bx bx-chevrons-up bx-fade-down"></i>
        </div>
        <m.div className="slide_1_page" ref={HomeRef}>
          <ul className="slide_1_background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            {/* <li></li>
            <li></li> */}
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
          </ul>

          <m.header>
            <m.div className="top_nav">
              <m.div
                className="left"
                variants={topNavAnime}
                initial="hide"
                animate="show"
              >
                <img src={brand_logo} alt="logo" />
              </m.div>
              <m.div
                className="right"
                variants={topNavAnime}
                initial="righthide"
                animate="rightshow"
              >
                <m.div
                  className="nav_list"
                  id={sideNavToggle ? "sideNavOpen" : "sideNavClose"}
                >
                  <m.ul>
                    <m.li variants={topNavAnime}>
                      <NavLink
                        onClick={() => {
                          scrollToSection(HomeRef), setSideNavToggle(false);
                        }}
                      >
                        Home{" "}
                      </NavLink>
                    </m.li>
                    <m.li variants={topNavAnime}>
                      <NavLink
                        onClick={() => {
                          scrollToSection(TemplateRef), setSideNavToggle(false);
                        }}
                      >
                        {" "}
                        Templates
                      </NavLink>
                    </m.li>
                    <m.li variants={topNavAnime}>
                      <NavLink
                        onClick={() => {
                          scrollToSection(FeatureRef), setSideNavToggle(false);
                        }}
                      >
                        Feature{" "}
                      </NavLink>
                    </m.li>
                    <m.li variants={topNavAnime}>
                      <NavLink
                        onClick={() => {
                          scrollToSection(NFCRef), setSideNavToggle(false);
                        }}
                      >
                        NFC
                      </NavLink>
                    </m.li>
                    <m.li variants={topNavAnime}>
                      <NavLink
                        onClick={() => {
                          scrollToSection(PricingRef), setSideNavToggle(false);
                        }}
                      >
                        Pricing{" "}
                      </NavLink>
                    </m.li>
                    <m.li variants={topNavAnime}>
                      <NavLink
                        onClick={() => {
                          scrollToSection(FAQRef), setSideNavToggle(false);
                        }}
                      >
                        FAQs{" "}
                      </NavLink>
                    </m.li>
                    <m.li variants={topNavAnime}>
                      <NavLink
                        onClick={() => {
                          scrollToSection(ContactRef), setSideNavToggle(false);
                        }}
                      >
                        Contact
                      </NavLink>
                    </m.li>
                  </m.ul>
                </m.div>
                <m.div className="actions" variants={topNavAnime}>
                  <Link to="/login">
                    <button>Login</button>
                  </Link>

                  <div
                    className="menu"
                    onClick={() => setSideNavToggle(!sideNavToggle)}
                  >
                    {sideNavToggle ? (
                      <i className="bx bx-menu-alt-right"></i>
                    ) : (
                      <i className="bx bx-menu-alt-left"></i>
                    )}
                  </div>
                </m.div>
              </m.div>
            </m.div>
          </m.header>
          <m.div className="slide_1">
            <m.div
              className="left"
              variants={left_slide_1Anime}
              initial="hide"
              animate="show"
            >
              <m.div className="title" variants={left_slide_1Anime}>
                <h3>Design Your Digital Identity</h3>
                <h4>Introducing Custom vCards</h4>
              </m.div>
              <m.div className="sub_title" variants={left_slide_1Anime}>
                <m.p>
                  Customize Your Digital Identity Effortlessly with My Virtual
                  Card!
                </m.p>
              </m.div>
              <m.div className="summary" variants={left_slide_1Anime}>
                <m.p>
                  Experience the future of digital ID cards by AristosTech India
                  Pvt Ltd. Simplify identification with our secure virtual
                  solution.This will help u to create your brand quick and
                  easily.Mangage your data dynamically from anytime change your
                  VCard Design.
                </m.p>
                <m.p>
                  We aren't compromising the quality of product but We can
                  provide budget friendly price because client happiness only we
                  are focusing!
                </m.p>
              </m.div>

              <m.div className="actions">
                <m.div className="start" variants={left_slide_1Anime}>
                  <Link to="/register">
                    <button>
                      Get Started!<i className="bx bxs-user-plus bx-tada"></i>
                    </button>
                  </Link>
                </m.div>
                <m.div className="enquiry" variants={left_slide_1Anime}>
                  <a href="https://wa.me/9344482370" target="_blank">
                    <button>
                      For Enquiry!<i className="bx bxs-bell-ring bx-tada"></i>
                    </button>
                  </a>
                </m.div>
              </m.div>
              {/* //Timer_Box */}

              <m.div className="offer_container" variants={left_slide_1Anime}>
                {/* <img src={offer_sale_gif} alt="" /> */}
                <m.div className="offer_box">
                  <m.div className="box">
                    <m.div className="time_box">
                      <h4>{Days}</h4>
                      <small>Day</small>
                    </m.div>
                    <i className="bx bxs-chevrons-right bx-flashing"></i>
                    <div className="time_box">
                      <h4>{Hours}</h4>
                      <small>Hours</small>
                    </div>
                    <i className="bx bxs-chevrons-right bx-flashing"></i>
                    <div className="time_box">
                      <h4>{Minutes}</h4>
                      <small>Minutes</small>
                    </div>
                    <i className="bx bxs-chevrons-right bx-flashing"></i>
                    <div className="time_box">
                      <h4>{Seconds}</h4>
                      <small>Seconds</small>
                    </div>
                  </m.div>

                  <div className="offer">
                    <div className="discount">
                      <strong>
                        {Hours && Minutes && Days && Minutes !== "00"
                          ? "50% Offer!"
                          : "Plan Expired!"}
                        {Hours && Minutes && Days && Minutes !== "00" ? (
                          <sup>
                            <i className="bx bxs-bell-minus bx-tada"></i>
                          </sup>
                        ) : (
                          <sup>
                            <i
                              className="bx bxs-bell-minus bx-tada"
                              style={{ color: "red" }}
                            ></i>
                          </sup>
                        )}
                      </strong>
                    </div>
                    {Hours && Minutes && Days && Minutes !== "00" ? (
                      <div className="prices">
                        <div className="old">
                          <h5>₹ 730</h5>
                        </div>

                        <div className="new">
                          <h5>₹ 365</h5>
                        </div>
                      </div>
                    ) : (
                      <div className="prices">
                        <div className="old">
                          <h5
                            style={{ textDecoration: "none", color: "#4c3ce0" }}
                          >
                            ₹ 730
                          </h5>
                        </div>

                        <div className="new">
                          <h5
                            style={{
                              textDecoration: "line-through",
                              color: "red",
                            }}
                          >
                            ₹ 365
                          </h5>
                        </div>
                      </div>
                    )}
                    <div className="actions">
                      {Hours && Minutes && Days && Minutes !== "00" ? (
                        <Link to="/register">
                          <button>
                            Enroll Now!<i className="bx bxs-offer"></i>
                          </button>
                        </Link>
                      ) : (
                        <a href="https://wa.me/9344482370" target="_blank">
                          <button>To Get Offer!</button>
                        </a>
                      )}
                    </div>
                  </div>
                </m.div>
              </m.div>
            </m.div>
            <m.div
              className="right"
              variants={right_slide_1Anime}
              initial="hide"
              animate="show"
            >
             
                <m.img src={slide_1_image} alt="" className={ImageToggle ? 'image_1_show':'image_1_hide'}/>
            
                <m.img src={illustraion} alt=""  className={!ImageToggle ? 'image_2_show':'image_2_hide'}/>
           

          
                <div className="message_gif"  id={ImageToggle ? 'image_1_show':'image_1_hide'}>
                  <img
                    src={message}
                    alt="message"
                    variants={right_slide_1Anime}
                  />
                </div>
          
              <m.div className="extra_designs">
                <m.div className="design1" variants={right_slide_1Anime}>
                  {/* <img
                    src={rocket}
                    alt="rocket"
                  /> */}
                  <i className="bx bx-rocket"></i>
                </m.div>
                <m.div
                  className="design2"
                  variants={right_slide_1Anime}
                ></m.div>
                <m.div className="design3" variants={right_slide_1Anime}>
                  <Lottie
                    options={defaultOptions}
                    style={{
                      height: 150,
                      width: 150,
                      position: "absolute",
                      top: -50,
                    }}
                  />
                  <div className="count">10</div>
                  <div className="content">VCard Templates</div>
                </m.div>
                <m.div
                  className="design4"
                  variants={right_slide_1Anime}
                ></m.div>
              </m.div>
            </m.div>
          </m.div>
        </m.div>
        <div className="svg_curve">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#b29cff" fillOpacity="1" d="M0,224L80,197.3C160,171,320,117,480,128C640,139,800,213,960,240C1120,267,1280,245,1360,234.7L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#7c58ff"
              fill-opacity="1"
              d="M0,64L80,80C160,96,320,128,480,117.3C640,107,800,53,960,69.3C1120,85,1280,171,1360,213.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
        </div>
        {/* Slide2 */}
        <m.div className="slide_2_page" ref={TemplateRef}>
          <m.div
            className="title"
            variants={title_slide_2Anime}
            initial="hide"
            animate="show"
          >
            <m.h2 variants={title_slide_2Anime}>
              Explore Our Range of vCard Templates!
            </m.h2>
            <m.p variants={title_slide_2Anime}>
              <strong>Simplify Your Digital Networking:</strong> Get Started
              with Our vCard Templates
            </m.p>
          </m.div>

          <m.div
            className="slide_2_container"
            ref={scrollContainerRef}
            style={{
              whiteSpace: "nowrap",

              // width: "100%",
            }}
            variants={vcard_slide_2Anime}
            initial="hide"
            animate="show"
          >
            <m.div className="vcard" variants={vcard_slide_2Anime}>
              <m.img src={vcard1} alt="vcard" />
            </m.div>
            <m.div className="vcard" variants={vcard_slide_2Anime}>
              <m.img src={vcard2} alt="vcard" />
            </m.div>
            <m.div className="vcard" variants={vcard_slide_2Anime}>
              <m.img src={vcard3} alt="vcard" />
            </m.div>
            <m.div className="vcard" variants={vcard_slide_2Anime}>
              <m.img src={vcard4} alt="vcard" />
            </m.div>
            <m.div className="vcard" variants={vcard_slide_2Anime}>
              <m.img src={vcard5} alt="vcard" />
            </m.div>
            <m.div className="vcard" variants={vcard_slide_2Anime}>
              <m.img src={vcard6} alt="vcard" />
            </m.div>
            <m.div className="vcard" variants={vcard_slide_2Anime}>
              <m.img src={vcard7} alt="vcard" />
            </m.div>
            {/* <m.div className="vcard" variants={vcard_slide_2Anime}>
              <m.img src={vcard8} alt="vcard" />
            </m.div> */}
          </m.div>
        </m.div>
        {/* Slide_3 */}
        <m.div className="slide_3_page" ref={FeatureRef}>
          <m.div
            className="slide_3_title"
            variants={title_slide_3Anime}
            initial="hide"
            animate="show"
          >
            <m.div className="heading" variants={title_slide_3Anime}>
              <m.h2>
                Premium Features by <span>VCard</span>
              </m.h2>
            </m.div>
            <m.div className="description" variants={title_slide_3Anime}>
              <m.p>
                Discover Innovation, Integration, and Inspiration with Our
                Premium Features
              </m.p>
            </m.div>
          </m.div>
          <m.div
            className="slide_3_container_box"
            variants={box_slide_3Anime}
            initial="hide"
            animate="show"
          >
            <m.div className="box" variants={box_slide_3Anime}>
              <div className="icon">
                <img
                  width="67"
                  height="67"
                  src="https://img.icons8.com/external-others-inmotus-design/67/external-Call-colored-others-inmotus-design-2.png"
                  alt="external-Call-colored-others-inmotus-design-2"
                />
              </div>
              <div className="content">
                <h5>Click to Call Feature</h5>
                <p>
                  Connect Effortlessly - Your Clients Reach You with Just a Tap!
                </p>
              </div>
            </m.div>
            <m.div className="box" variants={box_slide_3Anime}>
              <div className="icon">
                <img
                  width="100"
                  height="100"
                  src="https://img.icons8.com/stickers/100/forward-arrow.png"
                  alt="forward-arrow"
                />
              </div>
              <div className="content">
                <h5>Share Your vCard Seamlessly</h5>
                <p>
                  Effortlessly ShareYour Business Information via SMS, Email,
                  and More.
                </p>
              </div>
            </m.div>
            <m.div className="box" variants={box_slide_3Anime}>
              <div className="icon">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/qr-code--v1.png"
                  alt="qr-code--v1"
                />
              </div>
              <div className="content">
                <h5>Scan and Share Your vCard</h5>
                <p>
                  Scan to Access, Share to Connect: Simplify Networking with QR
                  Codes
                </p>
              </div>
            </m.div>
            <m.div className="box" variants={box_slide_3Anime}>
              <div className="icon">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/dynamic-links.png"
                  alt="dynamic-links"
                />
              </div>
              <div className="content">
                <h5>Social Media Links</h5>
                <p>
                  Your clients can connect with you on social media, and sharing
                  your social link can also increase your business.
                </p>
              </div>
            </m.div>
            <m.div className="box" variants={box_slide_3Anime}>
              <div className="icon">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/isometric/50/web-design.png"
                  alt="web-design"
                />
              </div>
              <div className="content">
                <h5>Wide Range of Templates</h5>
                <p>
                  You can choose from a wide range of templates for your VCards
                  and share them with your clients.
                </p>
              </div>
            </m.div>
            <m.div className="box" variants={box_slide_3Anime}>
              <div className="icon">
                <img
                  width="94"
                  height="94"
                  src="https://img.icons8.com/3d-fluency/94/price-tag-usd.png"
                  alt="price-tag-usd"
                />
              </div>
              <div className="content">
                <h5>Afforadable Pricing</h5>
                <p>
                  We offer a variety of pricing plans for you to choose from,
                  depending on your needs.
                </p>
              </div>
            </m.div>
          </m.div>
        </m.div>
        {/* slide_4 */}
        <m.div className="slide_4_page">
          <m.div
            className="slide_4_title"
            variants={title_slide_4Anime}
            initial="hide"
            animate="show"
          >
            <m.h2 variants={title_slide_4Anime}>
              Create your perfect <span>VCards with us!</span>
            </m.h2>
          </m.div>
          <m.div className="slide_4_container">
            <m.div
              className="row_1"
              variants={left_cardShow_slide_4Anime}
              initial="hide"
              animate="show"
            >
              <m.div className="left" variants={left_cardShow_slide_4Anime}>
                <img src={view1} alt="view" />
              </m.div>
              <m.div className="right" variants={right_cardShow_slide_4Anime}>
                <h3>Your Style, Your Statement: Design Your vCard</h3>
                <p>
                  Empower your digital presence with ‘Your Identity, Your
                  Influence, Your Digital Signature.’ Elevate your online
                  persona with our customizable vCard solution, showcasing your
                  brand, contact details, and expertise.
                </p>
              </m.div>
            </m.div>
            <m.div
              className="row_2"
              variants={left_cardShow_slide_4Anime}
              initial="hide"
              animate="show"
            >
              <m.div className="right" variants={left_cardShow_slide_4Anime}>
                <h3>Unleash Your Digital Presence with Custom vCards</h3>
                <p>
                  Transform your first impression with our bespoke vCard
                  templates, designed to leave a lasting impact. Explore a
                  variety of personalized designs to confidently display your
                  professional identity, all while reflecting your distinct
                  style.
                </p>
              </m.div>
              <m.div className="left" variants={right_cardShow_slide_4Anime}>
                <m.img src={view2} alt="view" />
              </m.div>
            </m.div>
            <m.div
              className="row_3"
              variants={right_cardShow_slide_4Anime}
              initial="hide"
              animate="show"
            >
              <m.div className="left" variants={left_cardShow_slide_4Anime}>
                <img src={view3} alt="view" />
              </m.div>
              <m.div className="right" variants={right_cardShow_slide_4Anime}>
                <h3>
                  Refine Your Digital Persona with Our Customizable vCard
                  Templates
                </h3>
                <p>
                  Step into the limelight with our meticulously curated
                  collection of vCard templates, tailored to elevate your
                  digital identity. Select from a diverse range of designs that
                  enable you to showcase your unique personality while upholding
                  a polished and professional appearance.
                </p>
              </m.div>
            </m.div>
          </m.div>
        </m.div>
        {/* Slider_5 */}
        <m.div className="slide_5_page" ref={NFCRef}>
          <m.div
            className="slide_5_title"
            variants={title_slide_5Anime}
            initial="hide"
            animate="show"
          >
            <h2>
              Making a vCard is easy with <span>My Virtual Card</span>
            </h2>
          </m.div>
          <m.div
            className="slide_5_box_container"
            variants={numberBox_slide_5Anime}
            initial="hide"
            animate="show"
          >
            <m.div className="box_1" variants={numberBox_slide_5Anime}>
              <div className="icon">
                <img src={number1} alt="view" />
              </div>
              <div className="content">
                <h3>Select Your Virtual Card Template</h3>
                <p>
                  Start with My Virtual Card's user-friendly maker. Enter your
                  details for tailored designs or use keywords for a perfect
                  fit.
                </p>
              </div>
            </m.div>
            <m.div className="box_1" variants={numberBox_slide_5Anime}>
              <div className="icon">
                <img src={number2} alt="view" />
              </div>
              <div className="content">
                <h3>Select Your Virtual Card Template</h3>
                <p>
                  Start with My Virtual Card's user-friendly maker. Enter your
                  details for tailored designs or use keywords for a perfect
                  fit.
                </p>
              </div>
            </m.div>
            <m.div className="box_1" variants={numberBox_slide_5Anime}>
              <div className="icon">
                <img src={number3} alt="view" />
              </div>
              <div className="content">
                <h3>Select Your Virtual Card Template</h3>
                <p>
                  Start with My Virtual Card's user-friendly maker. Enter your
                  details for tailored designs or use keywords for a perfect
                  fit.
                </p>
              </div>
            </m.div>
          </m.div>
          <m.div className="slider_5_nfc_container">
            <m.div className="content_box">
              <m.div
                className="left"
                variants={left_nfc_slide_5Anime}
                initial="hide"
                animate="show"
              >
                <m.div className="header" variants={left_nfc_slide_5Anime}>
                  <h3>
                    Tap Into Convenience: <span>NFC Cards</span>
                  </h3>
                </m.div>
                <m.div className="sub_head" variants={left_nfc_slide_5Anime}>
                  <strong>Tap, Connect, Go:</strong> NFC Cards for Modern
                  Solutions
                </m.div>
                <m.div className="description" variants={left_nfc_slide_5Anime}>
                  <p>
                    Tap into the potential of NFC technology with our Vcards!
                    Share contact details seamlessly. Just tap, connect, and
                    exchange info effortlessly. Say goodbye to traditional
                    business cards and embrace the future of networking.
                  </p>
                </m.div>
              </m.div>
              <m.div
                className="right"
                variants={right_nfc_slide_5Anime}
                initial="hide"
                animate="show"
              >
                <m.img src={nfc} alt="nfc" />
              </m.div>
            </m.div>
          </m.div>
        </m.div>
        {/* Plan */}

        <m.div className="slide_6_page" ref={PricingRef}>
          <m.div className="plan_heading" initial="hide" animate="show">
            <m.h2 variants={plan_title_slide_6Anime}>
              Select the <span>Perfect Plan</span> for You
            </m.h2>
            <m.p variants={plan_title_slide_6Anime}>
              <strong>Your Plan, Your Way:</strong> Choose What Works Best
            </m.p>
          </m.div>

          <m.div
            className="plan_container_box"
            variants={plan_box_slide_5Anime}
            initial="hide"
            animate="show"
          >
            {/* plan1 */}
            <m.div
              className="plan"
              variants={plan_box_slide_5Anime}
              id={planExpand ? "expand" : "default"}
            >
              <m.div
                className="down_arrow"
                onClick={() => setPlanExpand(!planExpand)}
              >
                <i className="bx bxs-chevron-down bx-tada"></i>
              </m.div>
              <m.div className="plan_title">
                <h3>Basic</h3>
              </m.div>
              <m.div className="plan_price">
                <h2>
                  ₹ 365 <small>/Yearly</small>
                </h2>
              </m.div>
              <m.div className="card_count">
                <p>
                  No of VCards : <span>05</span>
                </p>
              </m.div>

              <m.div className="plan_action">
                <Link to="/register">
                  <button>Choose Plan</button>
                </Link>
              </m.div>
              <m.div
                className="plan_addon_service"
                variants={plan_content_slide_5Anime}
                initial="hide"
                animate="show"
              >
                {plan_service_list.map((data, index) => {
                  return (
                    <m.div
                      className="list"
                      variants={plan_content_slide_5Anime}
                      key={index}
                    >
                      <div className="icon">{data.icon}</div>
                      <div className="text">
                        <p>{data.text}</p>
                      </div>
                    </m.div>
                  );
                })}
              </m.div>
            </m.div>
            {/* plan2 */}
            <m.div
              className="plan"
              variants={plan_box_slide_5Anime}
              id={standardPlanExpand ? "expand" : "default"}
            >
              <div
                className="down_arrow"
                onClick={() => setStandardPlanExpand(!standardPlanExpand)}
              >
                <i className="bx bxs-chevron-down bx-tada"></i>
              </div>
              <div className="plan_title">
                <h3>Standard</h3>
              </div>
              <div className="plan_price">
                <h2>
                  ₹ 799 <small>/Yearly</small>
                </h2>
              </div>
              <div className="card_count">
                <p>
                  No of VCards : <span>02</span>
                </p>
              </div>

              <div className="plan_action">
                <Link to="/register">
                  <button>Choose Plan</button>
                </Link>
              </div>
              <m.div
                className="plan_addon_service"
                variants={plan_content_slide_5Anime}
                initial="hide"
                animate="show"
              >
                {plan_service_list.map((data, index) => {
                  return (
                    <m.div
                      className="list"
                      variants={plan_content_slide_5Anime}
                      key={index}
                    >
                      <div className="icon">{data.icon}</div>
                      <div className="text">
                        <p>{data.text}</p>
                      </div>
                    </m.div>
                  );
                })}
              </m.div>
            </m.div>
            {/* plan3 */}
            <m.div
              className="plan"
              variants={plan_box_slide_5Anime}
              id={PremiumPlanExpand ? "expand" : "default"}
            >
              <div
                className="down_arrow"
                onClick={() => setPremiumPlanExpand(!PremiumPlanExpand)}
              >
                <i className="bx bxs-chevron-down bx-tada"></i>
              </div>
              <div className="plan_title">
                <h3>Premium</h3>
              </div>
              <div className="plan_price">
                <h2>
                  ₹ 1499 <small>/Yearly</small>
                </h2>
              </div>
              <div className="card_count">
                <p>
                  No of VCards : <span>08</span>
                </p>
              </div>

              <div className="plan_action">
                <Link to="/register">
                  <button>Choose Plan</button>
                </Link>
              </div>
              <m.div
                className="plan_addon_service"
                variants={plan_content_slide_5Anime}
                initial="hide"
                animate="show"
              >
                {plan_service_list.map((data, index) => {
                  return (
                    <m.div
                      className="list"
                      variants={plan_content_slide_5Anime}
                      key={index}
                    >
                      <div className="icon">{data.icon}</div>
                      <div className="text">
                        <p>{data.text}</p>
                      </div>
                    </m.div>
                  );
                })}
              </m.div>
            </m.div>
          </m.div>
        </m.div>

        {/* Questions */}
        <m.div
          className="slide_7_page"
          initial="hide"
          animate="show"
          ref={FAQRef}
        >
          <m.div className="slide_7_title">
            <m.h2 variants={title_slide_7Anime}>
              Frequently Asked <span>Questions</span>
            </m.h2>
          </m.div>
          <m.div className="sub_heading" variants={title_slide_7Anime}>
            <p>Got Questions? We’ve Got Answers!</p>
          </m.div>
          <div className="selection_actions">
            <button className="multi" onClick={handleMultipleToggle}>
              {multiQnToggle
                ? "Enable Single Selection"
                : "Enable Multi Selection"}
            </button>
          </div>
          <m.div
            className="qn_container_box"
            variants={qn_slide_7Anime}
            initial="hide"
            whileTap="show"
          >
            {/* qn */}
            {questions.map((data, index) => {
              return (
                <m.div
                  className="question_box"
                  variants={qn_slide_7Anime}
                  id={
                    selectedQn === data.id
                      ? "showAnswer"
                      : "hideAnswer" && multiSelected !== data.id
                      ? "showMultipleAnswer"
                      : "hideMultipleAnswer"
                  }
                  key={index}
                >
                  <m.div className="question">
                    <h5>{data.question}</h5>
                    {selectedQn != data.id ? (
                      <div
                        className="plus"
                        onClick={
                          multiQnToggle
                            ? () => {
                                handleMultipleSelection(data.id);
                              }
                            : () => handleSingleSelection(data.id)
                        }
                      >
                        {data.plus}
                      </div>
                    ) : (
                      <div
                        className="minus"
                        onClick={
                          multiQnToggle
                            ? () => {
                                handleMultipleSelection(data.id);
                              }
                            : () => handleSingleSelection(data.id)
                        }
                      >
                        {data.minus}
                      </div>
                    )}
                  </m.div>
                  <m.div className="answer">
                    {multiQnToggle
                      ? multiSelected.indexOf(data.id) !== -1 && (
                          <small>{data.answer}</small>
                        )
                      : selectedQn === data.id && <small>{data.answer}</small>}
                    {/* {selectedQn === data.id || multiSelected.indexOf(data.id) !== -1 ? <small>{data.answer}</small> : ""} */}
                  </m.div>
                </m.div>
              );
            })}
          </m.div>
        </m.div>

        {/* get_intouch */}
        <m.div className="slide_8_page" ref={ContactRef}>
          <m.div className="getin_touch_container_box">
            <m.div
              className="left"
              variants={form_left_slide_8Anime}
              initial="hide"
              animate="show"
            >
              <m.div className="title" variants={form_left_slide_8Anime}>
                <h4>Get In Touch !</h4>
              </m.div>
              <m.div className="list" variants={form_left_slide_8Anime}>
                <i className="bx bx-current-location"></i>
                <m.p variants={form_left_slide_8Anime}>
                  {" "}
                  First Floor No. 113, Ankur Plaza, Old 52, Gopathi
                  Narayanaswami Chetty Rd, T. Nagar, Chennai, Tamil Nadu 600017
                </m.p>
              </m.div>
              <m.div className="list" variants={form_left_slide_8Anime}>
                <i className="bx bx-mail-send"></i>
                <p>contact@aristostechindia.com</p>
              </m.div>
              <m.div className="list" variants={form_left_slide_8Anime}>
                <i className="bx bxs-phone-call"></i>
                <p>+91 9344482370</p>
              </m.div>
            </m.div>
            <m.div className="right" variants={form_left_slide_8Anime}>
              <m.div className="form_box" variants={form_left_slide_8Anime}>
                <m.form action="" variants={form_left_slide_8Anime}>
                  <div className="form_group">
                    <input type="text" placeholder="Enter Your Name" />
                  </div>
                  <div className="form_group">
                    <input type="email" placeholder="Enter Your Email" />
                  </div>
                  <div className="form_group subject">
                    <input type="email" placeholder="Enter Subject" />
                  </div>
                  <div className="message">
                    <textarea
                      name="message"
                      id=""
                      cols="30"
                      rows="5"
                      placeholder="Enter Your Message"
                    ></textarea>
                  </div>

                  <div className="form_submit">
                    <button>Send Message</button>
                  </div>
                </m.form>
              </m.div>
            </m.div>
          </m.div>
        </m.div>
        {/* Footer */}
        <div className="footer">
          <div className="company">
            <p>Group of AristosTech India Pvt Ltd.</p>
          </div>
          <div className="aggrement">
            <Link>
              <p>Terms & Condition</p>
            </Link>
            <Link>
              <p>Privacy Policy</p>
            </Link>
          </div>
        </div>
      </m.div>
    </>
  );
};

export default LandingPage;
