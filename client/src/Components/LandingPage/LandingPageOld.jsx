import React, { useEffect, useState, useRef, useContext } from "react";
import "./LandingPageOld.scss";
import Brand_Logo from "../../assets/Brand_Logo/BrandLogo2.png";
import backImage from "../../assets/Landing_Page/back_image.png";
import slide1banner from "../../assets/Landing_Page/slide1_right_image.png";
import Lottie from "react-lottie";
import vcard1 from "../../assets/Landing_Page/VCard_Designs/GYM.png";
import vcard2 from "../../assets/Landing_Page/VCard_Designs/FASHION.png";
import vcard3 from "../../assets/Landing_Page/VCard_Designs/MANAGER.png";
import vcard4 from "../../assets/Landing_Page/VCard_Designs/TAXI.png";
import vcard5 from "../../assets/Landing_Page/VCard_Designs/CORPORATE.png";
import vcard6 from "../../assets/Landing_Page/VCard_Designs/BEAUTYPARLOR.png";
import vcard7 from "../../assets/Landing_Page/VCard_Designs/DOCTOR.png";
import vcard8 from "../../assets/Landing_Page/VCard_Designs/CAB.png";
import vcard9 from "../../assets/Landing_Page/VCard_Designs/ADVOCATE.png";
import vcard10 from "../../assets/Landing_Page/VCard_Designs/EDUCATION.png";
// import vcard8 from "../assets/Landing_Page/VCard_Designs/Boutique_Shop_Mobile.png";
import view1 from "../../assets/Landing_Page/1.svg";
import view2 from "../../assets/Landing_Page/2.svg";
import view3 from "../../assets/Landing_Page/3.svg";

import number1 from "../../assets/Landing_Page/number1.png";
import number2 from "../../assets/Landing_Page/number2.png";
import number3 from "../../assets/Landing_Page/number3.png";
import nfc from "../../assets/Landing_Page/nfc.png";
import { IoIosColorPalette } from "react-icons/io";
import { VscOpenPreview } from "react-icons/vsc";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";
import { HiLightBulb } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { CiSaveUp1 } from "react-icons/ci";
import {
  FaInstagram,
  FaLinkedin,
  FaRocketchat,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";
//Image right Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  Dynamic_VCards_images,
  VCards_images,
} from "./Vcard_Images/Vcard_Images";
import { LiaThemeco } from "react-icons/lia";
import { GiPayMoney } from "react-icons/gi";
import { FaHandPointRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { GrUserNew } from "react-icons/gr";
import { TbBrand4Chan } from "react-icons/tb";
import { WiStars } from "react-icons/wi";
import { AppContext } from "../Context/AppContext";
import { Helmet } from "react-helmet";
import {
    free_plan_service_list,
    static_plan_service_list,
    dynamic_plan_service_list,
  } from "./constants";
  //Session3
import {
    Session3LeftRobo,
    Session3PriceOption,
    Session3BackImageOption,
    Session3ArrowOption,
    Session3ArrowOption2,
  } from "./constants";
const LandingPageOld = () => {
  let {  UserName } = useContext(AppContext);
  const scrollContainerRef = useRef(null);
  let [TrialExpand, setTrialExpand] = useState(false);
  let [planExpand, setPlanExpand] = useState(false);
  let [standardPlanExpand, setStandardPlanExpand] = useState(false);
  let [PremiumPlanExpand, setPremiumPlanExpand] = useState(false);
  let [showAnswer, setShowAnswer] = useState(false);
  let [ImageToggle, setImageToggle] = useState(true);
  let [sideNavToggle, setSideNavToggle] = useState(false);
  let HomeRef = useRef(null);
  let TemplateRef = useRef(null);
  let FeatureRef = useRef(null);
  let NFCRef = useRef(null);
  let PricingRef = useRef(null);
    let DynamicVcardRef = useRef(null);
  let FAQRef = useRef(null);
  let ContactRef = useRef(null);
  let OurServiceRef = useRef(null);
  let scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  const [width, setWidth] = useState(window.innerWidth);

  //VCard Slider
  const vcard_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Delay between each slide in milliseconds (e.g., 3000ms = 3 seconds)
    slidesToShow: width < 700 ? 1 : 2,
    slidesToScroll: width < 700 ? 1 : 2,
    ltr: true, // Scroll from left to right
    arrows: false, // Show navigation arrows
  };
  useEffect(() => {
    setTimeout(() => {
      setImageToggle(!ImageToggle);
    }, 5000);
  });
  // Template List
  let TemplateList = [
    {
      Id: 1,
      TemplateCount: 1,
      VCard_Name: "CORPORATE_MANAGER",
      VCard_Image: vcard3,
      VCard_Link: "https://myvirtualcard.in/Manager_Preview",
    },

    {
      Id: 2,
      TemplateCount: 2,
      VCard_Name: "FASHION_DESIGNER",
      VCard_Image: vcard2,
      VCard_Link: "https://myvirtualcard.in/fashion_Designer_Preview",
    },
    {
      Id: 3,
      TemplateCount: 3,
      VCard_Name: "GYM_TRAINER",
      VCard_Image: vcard1,
      VCard_Link: "https://myvirtualcard.in/Gym_Trainer_Preview",
    },
    {
      Id: 4,
      TemplateCount: 4,
      VCard_Name: "TAXI_SERVICE",
      VCard_Image: vcard4,
      VCard_Link: "https://myvirtualcard.in/Taxi_Service_Preview",
    },
    {
      Id: 5,
      TemplateCount: 5,
      VCard_Name: "BUSSINESS_CONSULTANT",
      VCard_Image: vcard5,
      VCard_Link: "https://myvirtualcard.in/Corporate_Company_Preview",
    },
    {
      Id: 6,
      TemplateCount: 6,
      VCard_Name: "BEAUTY_PARLOR",
      VCard_Image: vcard6,
      VCard_Link: "https://myvirtualcard.in/Beauty_Parlor_Preview",
    },
    {
      Id: 7,
      TemplateCount: 7,
      VCard_Name: "DOCTOR",
      VCard_Image: vcard7,
      VCard_Link: "https://myvirtualcard.in/Doctor_Preview",
    },

    {
      Id: 8,
      TemplateCount: 8,
      VCard_Name: "CAB DRIVER",
      VCard_Image: vcard8,
      VCard_Link: "https://myvirtualcard.in/Cab_Drivers_Preview",
    },
    {
      Id: 9,
      TemplateCount: 9,
      VCard_Name: "ADVOCATE OFFICER",
      VCard_Image: vcard9,
      VCard_Link: "https://myvirtualcard.in/Advocate_Preview",
    },
    {
      Id: 10,
      TemplateCount: 10,
      VCard_Name: "EDUCATION INSTITUTE",
      VCard_Image: vcard10,
      VCard_Link: "https://myvirtualcard.in/Education_Preview",
    },
  ];
  //PLan list
  let static_plan_service_list = [
    {
      id: 0,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Wide Range Of Static VCard Template's",
    },
    {
      id: 1,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Basic Information about Your Company",
    },
    {
      id: 2,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your social media link by one click ",
    },
    {
      id: 3,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your Contact Details ",
    },
    {
      id: 4,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Share all your  products and services",
    },
    {
      id: 5,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Appoinment shedule by one click ",
    },
    {
      id: 7,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add to Contact Button",
    },
    {
      id: 9,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Post your images by gallery ",
    },
    {
      id: 10,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Client review's by Testimonial view",
    },
    {
      id: 11,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "User Feedback and Inquiry Form ",
    },

  ];
  let dynamic_plan_service_list = [
    {
      id: 0,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Dynamic VCard Template Design",
    },
    {
      id: 1,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Basic Information about Your Company",
    },
    {
      id: 2,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your social media link by one click ",
    },
    {
      id: 3,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add all your Contact Details ",
    },
    {
      id: 4,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Share all your  products and services",
    },
    {
      id: 5,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Appoinment shedule by one click ",
    },
    {
      id: 7,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Add to Contact Button",
    },
    {
      id: 9,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Post your images by gallery ",
    },
    {
      id: 10,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Client review's by Testimonial view",
    },
    {
      id: 11,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "User Feedback and Inquiry Form ",
    },
    {
      id: 13,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "Dynamic Styling change your Vcard Design",
    },
    {
      id: 15,
      icon: <i className="bx bxs-check-shield"></i>,
      text: "QRCode Scan and Share your Website",
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
  const sendMessageOnWhatsApp = () => {
    const phoneNumber = "9344482370"; // Replace with actual phone number (international format without +)
    const message = "Hello! I have a query."; // Replace with your message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Redirecting to WhatsApp
    window.open(whatsappUrl, "_blank");
  };
  // Offer timer

  let [Days, setDays] = useState("00");
  let [Hours, setHours] = useState("00");
  let [Minutes, setMinutes] = useState("00");
  let [Seconds, setSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("Feb 30, 2025 00:00:00").getTime();
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
  return (
    <>
      <div className="landingpage_container">
        <Helmet>
          <title>MyVirtualCard – Your Professional Business vcard</title>
        </Helmet>
        {/* Up Arrow icon */}
        <div className="up" onClick={() => scrollToSection(HomeRef)}>
          <small>Bring me Top</small>
          <CiSaveUp1 className="up_icon" />
        </div>
        {/* Navbars */}
        <div className="Navbar1">
          <div className="left">
            <div className="offer">
              <small>
                <strong>50% </strong>- Offer Still Active <FaHandPointRight />
              </small>
            </div>
            <div className="box">
              <div className="time_box">
                <h4>{Days}</h4>
                <small>Day</small>
              </div>
              {/* <i className="bx bxs-chevrons-right bx-flashing"></i> */}
              <div className="time_box">
                <h4>{Hours}</h4>
                <small>Hours</small>
              </div>
              {/* <i className="bx bxs-chevrons-right bx-flashing"></i> */}
              <div className="time_box">
                <h4>{Minutes}</h4>
                <small>Minutes</small>
              </div>
              {/* <i className="bx bxs-chevrons-right bx-flashing"></i> */}
              <div className="time_box">
                <h4>{Seconds}</h4>
                <small>Seconds</small>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="address">
              <p>T. Nagar, Chennai, Tamil Nadu 600017</p>
              <small>
                <strong>Mobile Number : </strong>&nbsp;+91 9344482370
              </small>
            </div>
            <div className="socialmedias">
              <div className="link">
                <a href="#" className="btn btn-primary">
                  <FaFacebookF />
                </a>
              </div>
              <div className="link">
                <a href="#" className="btn btn-primary">
                  <FaInstagram />
                </a>
              </div>
              <div className="link">
                <a href="#" className="btn btn-primary">
                  <FaTwitter />
                </a>
              </div>
              <div className="link">
                <a href="#" className="btn btn-primary">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="Navbar2">
          <div className="top_navbar">
            <div className="left">
              <img src={Brand_Logo} alt="logo" />
            </div>
            <div className="middle">
              <div
                className="nav_list"
                id={sideNavToggle ? "sideNavOpen" : "sideNavClose"}
              >
                <ul>
                  <li>
                    <NavLink
                      onClick={() => {
                        scrollToSection(HomeRef), setSideNavToggle(false);
                      }}
                    >
                      Home{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => {
                        scrollToSection(PricingRef), setSideNavToggle(false);
                      }}
                    >
                      Pricing{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => {
                        scrollToSection(TemplateRef), setSideNavToggle(false);
                      }}
                    >
                      {" "}
                      Templates
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => {
                        scrollToSection(FAQRef), setSideNavToggle(false);
                      }}
                    >
                      FAQs{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => {
                        scrollToSection(OurServiceRef), setSideNavToggle(false);
                      }}
                    >
                      Service
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      onClick={() => {
                        scrollToSection(FeatureRef), setSideNavToggle(false);
                      }}
                    >
                      Feature{" "}
                    </NavLink>
                  </li> */}
                  {/* <li>
                    <NavLink
                      onClick={() => {
                        scrollToSection(NFCRef), setSideNavToggle(false);
                      }}
                    >
                      NFC
                    </NavLink>
                  </li> */}
              
               
                
                </ul>
              </div>
            </div>
            <div className="right">
              <div className="actions">
                {UserName == undefined ? (
                  <Link to="/register" className="register">
                    Register <GrUserNew />
                  </Link>
                ) : (
                  ""
                )}
                {UserName == undefined ? (
                  <Link to="/login" className="login">
                    Login <CiLogin />
                  </Link>
                ) : (
                  <Link
                    to={`/${UserName}/uadmin/VCards`}
                    className="login"
                  >
                    {UserName} <RiDashboardFill />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* All Slide Content */}

        <div className="content">
          {/* Slide1 */}
          <div className="slide1" ref={HomeRef}>
            <ul className="slide_1_background">
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

            <div className="back_image">
              <img src={backImage} alt="image" />
            </div>

            <div className="left">
              <div className="landingpage_title">
                <h3>
                  Design Your <span>Digital Identity</span>
                </h3>
                <h4>Introducing Custom vCards</h4>
                <p>
                  Customize Your Digital Identity Effortlessly with My Virtual
                  Card!. People are online Now, So convert your Business Card
                  Digitally to share on their mobiles and Wishing your customers
                  encourage them to connect with you.
                </p>
              </div>
              <div className="price">
                <p>
                  Starting From <strong>₹599</strong>
                </p>
              </div>
              <div className="actions">
                {UserName == undefined ? (
                  <Link to="/register">
                    Create Your VCard Now <TbBrand4Chan className="icon" />
                  </Link>
                ) : (
                  <Link to={`/${UserName}/uadmin/VCards`}>
                    Update Your Vcard <i className='bx bxs-edit-alt' style={{fontSize:'1rem'}}></i>
                  </Link>
                )}
              </div>
            </div>

            <div className="right">
              <div className="landingpage_title2">
                <h3>
                  Design Your <span>Digital Identity</span>
                </h3>
                <h4>Introducing Custom vCards</h4>
              </div>
              <img src={slide1banner} alt="banner" />
            </div>
          </div>
             {/* Plan Container */}
       
             <section className="Session_3" ref={PricingRef}>
        

        <div className="session3_content_row">
          <div className="left">
          <div className="plan_heading" initial="hide" animate="show">
            <h1>
              <FaRupeeSign className="icon" />
              MyVirtualCard Pricing
            </h1>
            <h2>
              Select the <span>Perfect Plan</span> for You
            </h2>
            {/* <p>
              <strong>Your Plan, Your Way:</strong> Choose What Works Best
            </p> */}
          </div>
            <div className="plan_container_box" initial="hide" animate="show">
                 {/* Free plan */}
                 <div className="freeplan_box">
                <div className="down_arrow">
                  <FaHandPointRight />
                  Show more
                </div>
                <div className="plan_title">
                  <h3>FREE PLAN</h3>
                </div>
                <div className="plan_price">
                  <div className="actual">
                    <h2>
                      Actual Price{" "}
                      <p>
                        <strong>₹ 99</strong> <small>/Monthly</small>
                      </p>
                    </h2>
                  </div>

                  <span>|</span>
                  <div className="offer">
                    <h2>
                      Offer Price{" "}
                      <strong>
                        ₹ 0 <small>/Monthly</small>
                      </strong>
                    </h2>
                  </div>
                </div>

                <div className="plan_action">
                  <Link to="/register">
                    <button>Subscribe</button>
                  </Link>
                </div>
                <div className="card_count">
                  {/* <p>
                 No of VCard Design's Provided : <span>08</span>
               </p> */}
                </div>
                <div
                  className="plan_addon_service"
                  initial="hide"
                  animate="show"
                >
                  {free_plan_service_list.map((data, index) => {
                    return (
                      <div className="list" key={index}>
                        <div className="icon">
                          <Lottie
                            options={Session3ArrowOption2}
                            height={window.innerWidth < 700 ? "30px" : "30px"}
                            width={window.innerWidth < 700 ? "30px" : "30px"}
                            className="lottie"
                          />
                        </div>
                        <div className="text">
                          <p>{data.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Basic plan1 */}
              <div className="plan">
                <div className="down_arrow">
                  <FaHandPointRight />
                  Show more
                </div>
                <div className="plan_title">
                  <h3>BASIC PLAN</h3>
                </div>
                <div className="plan_price">
                  <div className="actual">
                    <h2>
                      Actual Price{" "}
                      <p>
                        <strong>₹ 999</strong> <small>/Yearly</small>
                      </p>
                    </h2>
                  </div>

                  <span>|</span>
                  <div className="offer">
                    <h2>
                      Offer Price{" "}
                      <strong>
                        ₹ 499 <small>/Yearly</small>
                      </strong>
                    </h2>
                  </div>
                </div>

                <div className="plan_action">
                  <Link to="/register">
                    <button>Subscribe</button>
                  </Link>
                </div>
                <div className="card_count">
                  {/* <p>
                 No of VCard Design's Provided : <span>08</span>
               </p> */}
                </div>
                <div
                  className="plan_addon_service"
                  initial="hide"
                  animate="show"
                >
                  {static_plan_service_list.map((data, index) => {
                    return (
                      <div className="list" key={index}>
                        <div className="icon">
                          <Lottie
                            options={Session3ArrowOption2}
                            height={window.innerWidth < 700 ? "30px" : "30px"}
                            width={window.innerWidth < 700 ? "30px" : "30px"}
                            className="lottie"
                          />
                        </div>
                        <div className="text">
                          <p>{data.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* EnterPrice Plan */}
              <div className="plan2">
                <div className="down_arrow">
                  <FaHandPointRight />
                  Show more
                </div>
                <div className="plan_title">
                  <h3>ENTERPRICE PLAN</h3>
                </div>
                <div className="plan_price">
                  <div className="actual">
                    <h2>
                      Actual Price{" "}
                      <p>
                        <strong>₹ 1,999</strong> <small>/Yearly</small>
                      </p>
                    </h2>
                  </div>

                  <span>|</span>
                  <div className="offer">
                    <h2>
                      Offer Price{" "}
                      <strong>
                        ₹ 1,499 <small>/Yearly</small>
                      </strong>
                    </h2>
                  </div>
                </div>

                <div className="plan_action">
                  <Link to="/register">
                    <button>Subscribe</button>
                  </Link>
                </div>
                <div className="card_count">
                  {/* <p>
                 No of VCard Design's Provided : <span>08</span>
               </p> */}
                </div>
                <div
                  className="plan_addon_service"
                  initial="hide"
                  animate="show"
                >
                  {dynamic_plan_service_list.map((data, index) => {
                    return (
                      <div className="list" key={index}>
                        <div className="icon">
                          <Lottie
                            options={Session3ArrowOption2}
                            height={window.innerWidth < 700 ? "30px" : "30px"}
                            width={window.innerWidth < 700 ? "30px" : "30px"}
                            className="lottie"
                          />
                        </div>
                        <div className="text">
                          <p>{data.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </section>
          {/* Static Vcard Container */}

          <div className="slide2" ref={TemplateRef}>
            <div className="slide2_title">
              <h2>Explore Our Range of vCard Templates!</h2>
              <p>
                <strong>Simplify Your Digital Networking:</strong> Get Started
                with Our vCard Templates
              </p>

              <div className="sample_title">
                <div className="icon">
                  <IoIosColorPalette />
                </div>
                <p>Sample VCard Designs</p>
              </div>
            </div>
            <div className="template_container">
              {TemplateList.map((data, index) => {
                return (
                  <div className="template" key={index}>
                    <div className="template_title">
                      <h4>TEMPLATE-{data.TemplateCount}</h4>
                      <p>{data.VCard_Name}</p>
                    </div>
                    <div className="template_image">
                      <img src={data.VCard_Image} alt="card1" />
                      <Link
                        className="preview_btn"
                        onClick={() => {
                          scrollToSection(PricingRef);
                        }}
                      >
                        View Plan
                      </Link>
                    </div>
                    <div className="template_actions">
                      <Link
                        to={data.VCard_Link}
                        target="_blank"
                        className="activate_btn"
                      >
                        Preview Demo
                        <div className="icon">
                          <VscOpenPreview />
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

       
  
                  {/* Dynamic Template */}
        <section className="Session_4" ref={DynamicVcardRef}>
          <div className="slider_5_nfc_container">
            <div className="content_box">
              <div className="left">
              <div className="slide2_title">
              <h2>Explore Our Range of Dynamic vCard Template!</h2>
              <p>
                <strong>Simplify Your Digital Networking:</strong> Get Started
                with Our VCard Template
              </p>

              <div className="sample_title">
                <div className="icon">
                  <LiaThemeco />
                </div>
                <p>Sample VCard Theme's</p>
              </div>
            </div>
                <div className="header">
                  <h3>
                    Features of Dynamic Vcard <span>Template</span>
                  </h3>
                </div>
                <div className="features_container">
                  <div className="feauture">
                    <div className="icon">
                      <WiStars />
                    </div>
                    <p>
                      Advanced premium Features has been initiated on this
                      Dynamic VCard Template.
                    </p>
                  </div>
                  <div className="feauture">
                    <div className="icon">
                      <WiStars />
                    </div>
                    <p>
                      You can change your vcard theme color dynamically at any
                      time no any other restriction for color changes it's fully
                      unlimited to change over Vcard Theme.
                    </p>
                  </div>
                  <div className="feauture">
                    <div className="icon">
                      <WiStars />
                    </div>
                    <p>
                      This Plan has been increased your memory storage to store
                      your details more and secure.
                    </p>
                  </div>
                  <div className="feauture">
                    <div className="icon">
                      <WiStars />
                    </div>
                    <p>
                      Our Dynamic VCard Template is fully responsive and
                      compatible with all devices.
                    </p>
                  </div>

                  <div className="feauture">
                    <div className="icon">
                      <WiStars />
                    </div>
                    <p>
                      You can change your Banner and Logo Image Width and
                      Height..Especially Logo has 6 types of pre-default
                      animation provided u have been choose your prefered one at
                      any time.
                    </p>
                  </div>
                  <div className="feauture">
                      {UserName === undefined ? (
                        <Link to="/register">
                          Let's Build{" "}
                          <TbBrand4Chan className="icon" />
                        </Link>
                      ) : (
                        <Link to={`/${UserName}/uadmin/VCards`}>
                          Edit Now <TbBrand4Chan className="icon" />
                        </Link>
                      )}
                    </div>
                </div>
              </div>
              <div className="right_image">
                <Slider {...vcard_settings}>
                  {Dynamic_VCards_images.map((data, index) => {
                    return <img src={data} alt="image" key={index} />;
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </section>
          {/* Slide3 */}
          {/* <div className="slide3" ref={FeatureRef}>
            <div className="slide3_title">
              <h2>
                {" "}
                <BsFillRocketTakeoffFill className="icon" />
                Premium Features by <span>VCard</span>
              </h2>
              <p>
                Discover Innovation, Integration, and Inspiration with Our
                Premium Features
              </p>
            </div>
            <div
              className="slide_3_container_box"
              initial="hide"
              animate="show"
            >
              <div className="box">
                <div className="icon">
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/cute-clipart/64/phone-ringing.png"
                    alt="phone-ringing"
                  />
                </div>
                <div className="content">
                  <h5>Click to Call Feature</h5>
                  <p>
                    Connect Effortlessly - Your Clients Reach You with Just a
                    Tap!
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/cute-clipart/64/share.png"
                    alt="share"
                  />
                </div>
                <div className="content">
                  <h5>Share Your vCard Seamlessly</h5>
                  <p>
                    Effortlessly ShareYour Business Information via SMS, Email,
                    and More.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/cute-clipart/64/search.png"
                    alt="search"
                  />
                </div>
                <div className="content">
                  <h5>Scan and Share Your vCard</h5>
                  <p>
                    Scan to Access, Share to Connect: Simplify Networking with
                    QR Codes
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/cute-clipart/64/external-link-squared.png"
                    alt="external-link-squared"
                  />
                </div>
                <div className="content">
                  <h5>Social Media Links</h5>
                  <p>
                    Your clients can connect with you on social media, and
                    sharing your social link can also increase your business.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/cute-clipart/64/web.png"
                    alt="web"
                  />
                </div>
                <div className="content">
                  <h5>Wide Range of Templates</h5>
                  <p>
                    You can choose from a wide range of templates for your
                    VCards and share them with your clients.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/cute-clipart/64/low-price.png"
                    alt="low-price"
                  />
                </div>
                <div className="content">
                  <h5>Afforadable Pricing</h5>
                  <p>
                    We offer a variety of pricing plans for you to choose from,
                    depending on your needs.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <img
                    width="128"
                    height="128"
                    src="https://img.icons8.com/cute-clipart/128/edit.png"
                    alt="edit"
                  />
                </div>
                <div className="content">
                  <h5>Easy To Update</h5>
                  <p>
                    You can update your details as and when you want to change
                    unlimited times.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/cute-clipart/64/survey.png"
                    alt="survey"
                  />
                </div>
                <div className="content">
                  <h5>Review & Ratting</h5>
                  <p>
                    Anyone can give feedback about your organization and rate
                    out of 5 stars and others can see on the cards.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/cute-clipart/64/form.png"
                    alt="form"
                  />
                </div>
                <div className="content">
                  <h5>Enquiry Form</h5>
                  <p>
                    Our Card can help to capture leads with enquiry form. You
                    will Chekout your dashboard notification for each enquiry.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {/* Slide4`` */}
   {/* <div className="slide4" ref={NFCRef}>
            <div className="slide4_title">
              <h2>
                {" "}
                <IoIosCreate className="icon" />
                Create your perfect VCards with us!
              </h2>
              <p>
                Develop Your Brand Profit and Increase customer trafic by our
                VCard Designs..
              </p>
            </div>
            <div
              className="slide_4_container_box"
              initial="hide"
              animate="show"
            >
              <div className="box">
                <div className="image">
                  <img src={view1} alt="view" />
                </div>
                <div className="content">
                  <h5>Your Style, Your Statement: Design Your vCard</h5>
                  <p>
                    Empower your digital presence with ‘Your Identity, Your
                    Influence, Your Digital Signature.’ Elevate your online
                    persona with our customizable vCard solution, showcasing
                    your brand, contact details, and expertise.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={view2} alt="view" />
                </div>
                <div className="content">
                  <h5>Your Style, Your Statement: Design Your vCard</h5>
                  <p>
                    Empower your digital presence with ‘Your Identity, Your
                    Influence, Your Digital Signature.’ Elevate your online
                    persona with our customizable vCard solution, showcasing
                    your brand, contact details, and expertise.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={view3} alt="view" />
                </div>
                <div className="content">
                  <h5>Your Style, Your Statement: Design Your vCard</h5>
                  <p>
                    Empower your digital presence with ‘Your Identity, Your
                    Influence, Your Digital Signature.’ Elevate your online
                    persona with our customizable vCard solution, showcasing
                    your brand, contact details, and expertise.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {/* Slider_5 */}
          <div className="slide_5_page">
            <div className="slide_5_title" initial="hide" animate="show">
              <h2>
                Making a vCard is easy with <span>My Virtual Card</span>
              </h2>
            </div>
            <div
              className="slide_5_box_container"
              initial="hide"
              animate="show"
            >
              <div className="box_1">
                <div className="icon">
                  <img src={number1} alt="view" />
                </div>
                <div className="content">
                  <h3>Create your Card</h3>
                  <p>
                    Create your digital visiting card via MyVirtualCard, which
                    takes just a 2 minutes
                  </p>
                </div>
              </div>
              <div className="box_1">
                <div className="icon">
                  <img src={number2} alt="view" />
                </div>
                <div className="content">
                  <h3>Add Your Product/Services</h3>
                  <p>
                    Open Your Dasboard And List The Your Featured
                    Product/Services
                  </p>
                </div>
              </div>
              <div className="box_1">
                <div className="icon">
                  <img src={number3} alt="view" />
                </div>
                <div className="content">
                  <h3>Share With Your Customer With One Click</h3>
                  <p>
                    Engage With Your Customers Through <br />
                    MyVirtualCard.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="slider_5_nfc_container">
              <div className="content_box">
                <div className="left" initial="hide" animate="show">
                  <div className="header">
                    <h3>
                      Tap Into Convenience: <span>NFC Cards</span>
                    </h3>
                  </div>
                  <div className="sub_head">
                    <strong>Tap, Connect, Go:</strong> NFC Cards for Modern
                    Solutions
                  </div>
                  <div className="description">
                    <p>
                      Tap into the potential of NFC technology with our Vcards!
                      Share contact details seamlessly. Just tap, connect, and
                      exchange info effortlessly. Say goodbye to traditional
                      business cards and embrace the future of networking.
                    </p>
                  </div>
                </div>
                <div className="right" initial="hide" animate="show">
                  <img src={nfc} alt="nfc" />
                </div>
              </div>
            </div> */}
          </div>

      
          {/* Questions */}
          <div
            className="slide_7_page"
            initial="hide"
            animate="show"
            ref={FAQRef}
          >
            <div className="slide_7_title">
              <h2>
                Frequently Asked <span>Questions</span>
              </h2>
            </div>
            <div className="sub_heading">
              <p>Got Questions? We’ve Got Answers!</p>
            </div>
            <div className="selection_actions">
              <button className="multi" onClick={handleMultipleToggle}>
                {multiQnToggle
                  ? "Enable Single Selection"
                  : "Enable Multi Selection"}
              </button>
            </div>
            <div className="qn_container_box" initial="hide" whileTap="show">
              {/* qn */}
              {questions.map((data, index) => {
                return (
                  <div
                    className="question_box"
                    id={
                      selectedQn === data.id
                        ? "showAnswer"
                        : "hideAnswer" && multiSelected !== data.id
                        ? "showMultipleAnswer"
                        : "hideMultipleAnswer"
                    }
                    key={index}
                  >
                    <div className="question">
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
                    </div>
                    <div className="answer">
                      {multiQnToggle
                        ? multiSelected.indexOf(data.id) !== -1 && (
                            <small>{data.answer}</small>
                          )
                        : selectedQn === data.id && (
                            <small>{data.answer}</small>
                          )}
                      {/* {selectedQn === data.id || multiSelected.indexOf(data.id) !== -1 ? <small>{data.answer}</small> : ""} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
              {/* OurService */}
              <div className="Our_Service_Slide" ref={OurServiceRef}>
            <div className="slide1_1_title">
              <div className="sample_title">
                <div className="icon">
                  <MdHomeRepairService />
                </div>
                <p>Our Services</p>
              </div>
              <h2>
                We Offers Web Designing , Full Stack Application , ECommerse
                Site & Digital Vcard At Affordable Price
              </h2>
            </div>
            <div
              className="slide_1_1_container_box"
              initial="hide"
              animate="show"
            >
              <div className="box">
                <div className="content">
                  <h5>Web Design & Development</h5>
                  <p>
                    We help you build an intercative & mobile responsive webiste
                    for your business. it helps to get more visitors and
                    promotes your business 24/7
                  </p>
                </div>
                <div className="actions">
                  <Link
                    onClick={sendMessageOnWhatsApp}
                    className="activate_btn"
                  >
                    Book Your Website Now
                    <div className="icon">
                      <FaRocketchat />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="box">
                <div className="content">
                  <h5>Backend Application With Authenitications </h5>
                  <p>
                    We help you build an secure data Collection & mobile
                    responsive webiste for your business. it helps to get more
                    visitors and promotes your business 24/7
                  </p>
                </div>
                <div className="actions">
                  <Link
                    onClick={sendMessageOnWhatsApp}
                    className="activate_btn"
                  >
                    Book Your Website Now
                    <div className="icon">
                      <FaRocketchat />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="box">
                <div className="content">
                  <h5>Digital VCard Site</h5>
                  <p>
                    Our digital visiting card helpes to share your business
                    products and details with your customers and business
                    friends. Pricing starts from ₹599
                  </p>
                </div>
                <div className="actions">
                  <Link
                    onClick={sendMessageOnWhatsApp}
                    className="activate_btn"
                  >
                    Book Your Website Now
                    <div className="icon">
                      <FaRocketchat />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}

          <div className="footer">
            <div className="company">
              <p>
                Group Of Aristostech India Pvt Limited &copy;Copyright 2024 -
                All Rights Reserved.
              </p>
              {/* <p>T. Nagar, Chennai, Tamil Nadu 600017</p>

              <small>
                <strong>Call</strong> : +91 9344482370 &nbsp;{" "}
                <strong>Mail</strong> :contact@aristostechindia.com
              </small> */}
            </div>
            <div className="aggrement">
              <Link to="/terms_condition">
                <p>Terms & Condition</p>
              </Link>
              <Link to="/privacy_condition">
                <p>Privacy Policy</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageOld;
