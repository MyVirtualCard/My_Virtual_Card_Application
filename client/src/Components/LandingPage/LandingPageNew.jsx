import React, { useRef, useState, useEffect, useContext } from "react";
import "./LandingPageNew.scss";
import Navbar from "./Navbar/Navbar";
import { Link } from "react-router-dom";
import back_banner from "../../assets/Landing_Page/back_image.png";
import { TbBrand4Chan } from "react-icons/tb";
import Lottie from "react-lottie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { VscOpenPreview } from "react-icons/vsc";
import { Session1MouseScroll } from "./constants";
import SocialIconBack from "../../assets/Lotte_Animation/Logo_Back2.json";
import RoboAnime from "../../assets/Lotte_Animation/Robot-1.json";
import RoboAnime1 from "../../assets/Lotte_Animation/Robot-5.json";
import RoboAnime2 from "../../assets/Lotte_Animation/Robot-6.json";
import RoboAnime3 from "../../assets/Lotte_Animation/Robot-4.json";
import RoboAnime4 from "../../assets/Lotte_Animation/Robot-7.json";
import RoboAnime5 from "../../assets/Lotte_Animation/Robot-8.json";
import RoboAnime6 from "../../assets/Lotte_Animation/Robot-9.json";
import ArrowAnime from "../../assets/Lotte_Animation/Arrow2.json";
import ArrowAnime1 from "../../assets/Lotte_Animation/Arrow1.json";
import BackgroundAnime from "../../assets/Lotte_Animation/Gradient_Back.json";
import BackgroundAnime2 from "../../assets/Lotte_Animation/Gradient_Back4.json";

import MessageIcon from "../../assets/Lotte_Animation/MessageIcon.json";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { BiLogInCircle, BiRightArrow } from "react-icons/bi";

// Session2
import { Session2BackOptions, Session2BackOptions2 } from "./constants";
import { Session2LeftRobo } from "./constants";
import { Session2LeftMobileOption } from "./constants";
import { StaticTemplateList } from "./constants";

import { FaArrowRight, FaS } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useFormik } from "formik";
//Session3
import {
  Session3LeftRobo,
  Session3PriceOption,
  Session3BackImageOption,
  Session3ArrowOption,
  Session3ArrowOption2,
} from "./constants";
import {
  free_plan_service_list,
  static_plan_service_list,
  dynamic_plan_service_list,
} from "./constants";
import { FaHandPointRight } from "react-icons/fa";

// Session4
import { LiaThemeco } from "react-icons/lia";
import { WiStars } from "react-icons/wi";
import { Dynamic_VCards_images } from "./Vcard_Images/Vcard_Images";

// Session5
import { Session5Icon, Session5Robot } from "./constants";
import { Feature_list } from "./constants";

// Session6
import number1 from "../../assets/Landing_Page/number1.png";
import number2 from "../../assets/Landing_Page/number2.png";
import number3 from "../../assets/Landing_Page/number3.png";
import nfc from "../../assets/Landing_Page/nfc.png";
import { nfcBack } from "./constants";
//Session7
import { ServiceBack, ServiceRobot, Service_list } from "./constants";
import Footer from "./Footer/Footer";

//Session8
import { questions } from "./constants";
import { MdGroups2 } from "react-icons/md";
import {
  ResellerRegisterValidateSchema,
  LoginValidateSchema,
} from "../Helper/RegisterValidate";
import { ForgotEmailValidateSchema } from "../Helper/ForgetPassValidate.js";
import partnershipAnime from "../../assets/Lotte_Animation/partnership.json";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginAnimation from "../../assets/Lotte_Animation/login.json";
import { AppContext } from "../Context/AppContext.jsx";
import vcardImage from '../../assets/Landing_Page/slide1_right_image.png'
const LandingPage = () => {
  let navigate = useNavigate();
  let {
    UserName,
    ResellerUserName,
    setResellerUserName,
    getResellerUserData,
    backendUrl,
    getResellerAuthStatus,
  } = useContext(AppContext);

  let BackImages = [BackgroundAnime2];
  let Messages = [
    {
      id: 0,
      message: "Welcome to our website!",
      icon: MessageIcon,
    },
    {
      id: 1,
      message: "Why  choose us?",

      icon: MessageIcon,
    },
    {
      id: 2,
      message: "Brand Your Store Easily!",
      icon: MessageIcon,
    },
    {
      id: 3,
      message: "Let's Go and Create!",
      icon: MessageIcon,
    },
    {
      id: 4,
      message: "Have U Created?",
      icon: MessageIcon,
    },
  ];
  const [index, setIndex] = useState(0);
  let [CurrentRoboIndex, setCurrentRoboIndex] = useState(0);
  let [CurrentBackImageIndex, setCurrentBackImageIndex] = useState(0);
  let [ResellerToggle, setResellerToggle] = useState(false);
  let [ResellerLoginToggle, setResellerLoginToggle] = useState(false);
  let [ForgotPassToggle, setForgotPassToggle] = useState(false);
  let inputRefFocus = useRef(null);
  const [preview, setPreview] = useState("");
  let [show, setShow] = useState();
  let [registerLoader, setRegisterLoader] = useState(false);
  let [Profile, setProfile] = useState(null);
  let [OpenTermsCondition, setOpenTermsCondition] = useState(false);
  let [OpenPrivacyCondition, setOpenPrivacyCondition] = useState(false);
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  // Handle file selection
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    setPreview(URL.createObjectURL(file)); // Show a preview of the image
  };
  //Password Show hide :
  let handleShow = () => {
    let Password = document.getElementById("Password");
    setShow(!show);
    {
      !show
        ? Password.setAttribute("type", "text")
        : Password.setAttribute("type", "Password");
    }
  };

  // Back Image Toggle
  useEffect(() => {
    if (CurrentBackImageIndex >= 0) {
      if (CurrentBackImageIndex < BackImages.length) {
        const timer = setTimeout(() => {
          return setCurrentBackImageIndex(0);
        }, 25000);

        // Cleanup the timer
        return () => {
          clearTimeout(timer);
        };
      }
    }
    if (CurrentBackImageIndex === 1) {
      return setCurrentBackImageIndex(0);
    }
  }, [CurrentBackImageIndex]);
  // Message toggle
  useEffect(() => {
    if (index >= 0) {
      if (index < Messages.length) {
        const timer = setTimeout(() => {
          return setIndex(index + 1);
        }, 5000);

        // Cleanup the timer
        return () => {
          clearTimeout(timer);
        };
      }
    }
    if (index === 5) {
      return setIndex(0);
    }
  }, [index]);

  const SocialIconoptions = {
    loop: true,
    autoplay: true,
    animationData: SocialIconBack,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const MessageIconoptions = {
    loop: true,
    autoplay: true,
    animationData: MessageIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const PartnershipAnimeoptions = {
    loop: true,
    autoplay: true,
    animationData: partnershipAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const LoginAnimationOption = {
    loop: true,
    autoplay: true,
    animationData: LoginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
  const back_image_options = {
    loop: true,
    autoplay: true,
    animationData: BackImages[CurrentBackImageIndex],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const arrow_options = {
    loop: true,
    autoplay: true,
    animationData: ArrowAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const arrow_options1 = {
    loop: true,
    autoplay: true,
    animationData: ArrowAnime1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [width, setWidth] = useState(window.innerWidth);
  //VCard Slider
  const vcard_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Delay between each slide in milliseconds (e.g., 3000ms = 3 seconds)
    slidesToShow: width < 700 ? 2 : 2,
    slidesToScroll: width < 700 ? 2 : 2,
    rtl: true, // Scroll from left to right
    arrows: false, // Show navigation arrows
  };
  let [ActiveMenu, setActiveMenu] = useState("Session_1");
  let scrollContainerRef = useRef(null);
  let HomeRef = useRef(null);
  let StaticVcardRef = useRef(null);
  let PriceRef = useRef(null);
  let DynamicVcardRef = useRef(null);
  let FeatureRef = useRef(null);
  let NFCRef = useRef(null);
  let FAQRef = useRef(null);
  let ServiceRef = useRef(null);
  // Handler to scroll to the target element

  const scrollToElement = (elementRef) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
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
  // Register Formik
  // let Reseller_formik = useFormik({
  //   initialValues: {
  //     UserName: "",
  //     FullName: "",
  //     MobileNumber: "",
  //     Email: "",
  //     Password: "",
  //     Terms: false,
  //   },
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   validationSchema: ResellerRegisterValidateSchema,
  //   onSubmit: async (values) => {
  //     setRegisterLoader(true);
  //     console.log(values);
  //     const formData = new FormData();
  //     formData.append("UserName", values.UserName);
  //     formData.append("FullName", values.FullName);
  //     formData.append("MobileNumber", values.MobileNumber);
  //     formData.append("Email", values.Email);
  //     formData.append("Password", values.Password);
  //     formData.append("Terms", values.Terms);
  //     await api
  //       .post("/api/auth/reseller/register", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((res) => {
  //         setRegisterLoader(false);

  //         toast.success(res.data.message);
  //         Reseller_formik.values.Password = "";
  //         localStorage.setItem(
  //           "ResellerUserName",
  //           JSON.stringify(res.data.newUser?.ResellerUserName)
  //         );
  //         setTimeout(() => {
  //           navigate("/Reseller_OTP");
  //         }, 2000);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         toast.error(error.response.data.message);
  //         setRegisterLoader(false);
  //       });
  //   },
  // });
  // Register Formik
  let Reseller_formik = useFormik({
    initialValues: {
      UserName: "",
      FullName: "",
      MobileNumber: "",
      Email: "",
      Password: "",
      Terms: false,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ResellerRegisterValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);
      let data = {
        UserName: Reseller_formik.values.UserName,
        Email: Reseller_formik.values.Email,
        FullName: Reseller_formik.values.FullName,
        MobileNumber: Reseller_formik.values.MobileNumber,
        Password: Reseller_formik.values.Password,
        Terms: Reseller_formik.values.Terms,
      };

      await api
        .post("/api/auth/reseller/register", data)
        .then((res) => {
          if (res.data.success) {
            setRegisterLoader(false);

            getResellerUserData();
            toast.success(res.data.message);
            Reseller_formik.values.Password = "";
            setTimeout(() => {
              navigate("/reseller_OTP");
            }, 2000);
          } else {
            setRegisterLoader(false);

            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setRegisterLoader(false);
        });
    },
  });
  //Login Formik
  // let Login_formik = useFormik({
  //   initialValues: {
  //     Email: "",
  //     Password: "",
  //   },
  //   validateOnChange: false,
  //   validateOnBlur: false,
  //   validationSchema: LoginValidateSchema,
  //   onSubmit: async (values) => {
  //     setRegisterLoader(true);

  //     await api
  //       .post("/api/auth/reseller/login", values)
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         setRegisterLoader(false);
  //         const datas = JSON.stringify({
  //           ResellerUserName: res?.data?.ResellerUserName,
  //           token: res?.data?.token,
  //           id: res?.data?.id,
  //           FullName: res?.data?.FullName,
  //         });
  //         localStorage.setItem("Reseller_Data", datas);

  //         let ResellerUserData = JSON.parse(
  //           localStorage.getItem("Reseller_Data")
  //         );

  //         let navigationTimeout = setTimeout(() => {
  //           // setResellerData(ResellerUserData);

  //           navigate(`/${res?.data?.ResellerUserName}/re-seller/users`);
  //         }, 2000);
  //         return () => {
  //           clearTimeout(navigationTimeout);
  //         };
  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data.message);
  //         setRegisterLoader(false);
  //       });
  //   },
  // });
  //Login Formik
  let Login_formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: LoginValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);
      axios.defaults.withCredentials = true;
      await axios
        .post(backendUrl + "/api/auth/reseller/login", values)
        .then((res) => {
          setRegisterLoader(false);
          if (res.data.success === true) {
            localStorage.setItem("token", res.data.token);

            getResellerUserData();
            toast.success(res.data.message);
            setTimeout(() => {
              navigate(
                `/${localStorage.getItem("ResellerUserName")}/re-seller/users`
              );
            }, 2000);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setRegisterLoader(false);
        });
    },
  });
  //ForgotPass Formik
  let Forgot_formik = useFormik({
    initialValues: {
      Email: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ForgotEmailValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);
      await api
        .post("/api/auth/forgot_password", values)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);

          setRegisterLoader(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setRegisterLoader(false);
        });
    },
  });
  return (
    <>
      <div className="landingpage_container" ref={scrollContainerRef}>
        {/* Home */}
        <section className="Session_1" ref={HomeRef}>
          <div className="back_banner_image">
            <Lottie
              options={back_image_options}
              height={"100%"}
              width={"100%"}
            />
          </div>
          <div
            className="mouseScrollIcon"
            onClick={() => {
              scrollToElement(StaticVcardRef), setActiveMenu("Session_2");
            }}
          >
            <Lottie
              options={Session1MouseScroll}
              height={window.innerWidth < 700 ? "50px" : "80px"}
              width={window.innerWidth < 700 ? "50px" : "80px"}
              className="lottie"
            />
          </div>
          <div className="navbar">
            <Navbar
              HomeRef={HomeRef}
              StaticVcardRef={StaticVcardRef}
              PriceRef={PriceRef}
              DynamicVcardRef={DynamicVcardRef}
              FeatureRef={FeatureRef}
              NFCRef={NFCRef}
              FAQRef={FAQRef}
              ServiceRef={ServiceRef}
              scrollToElement={scrollToElement}
              ActiveMenu={ActiveMenu}
              setActiveMenu={setActiveMenu}
            />
          </div>

          <div className="content_column">
            {ResellerToggle ? (
              <>
                {/* Terms_Condition */}
                {OpenTermsCondition ? (
                  <div
                    className="terms_condtion_container"
                    onClick={() => setOpenTermsCondition(false)}
                  >
                    <div className="terms_main_center_box">
                      <div
                        className="close_terms"
                        onClick={() => setOpenTermsCondition(false)}
                      >
                        <i className="fa-solid fa-circle-xmark"></i>
                      </div>
                      <div className="term_title">
                        <h5>Terms and Conditions</h5>
                      </div>
                      <div className="content_box">
                        <div className="content">
                          <h4>**Effective Date:** 19 - 07- 2024</h4>
                          <p>
                            Welcome to My Virtual Card, a service provided by
                            Aristostech India Pvt Ltd ("Company", "we", "us", or
                            "our"). By accessing or using our service
                            ("Service"), you agree to be bound by these Terms
                            and Conditions ("Terms"). If you do not agree to
                            these Terms, please do not use the Service.
                          </p>
                        </div>
                        <div className="content">
                          <h4>1. Acceptance of Terms</h4>
                          <p>
                            By using the Service, you acknowledge that you have
                            read, understood, and agree to be bound by these
                            Terms. We reserve the right to modify these Terms at
                            any time, and we will provide notice of such changes
                            by posting the revised Terms on our website. Your
                            continued use of the Service after any changes are
                            made constitutes your acceptance of the new Terms.
                          </p>
                        </div>
                        <div className="content">
                          <h4>2. Use of the Service</h4>
                          <p>
                            - You must be at least 18 years old to use the
                            Service.
                            <br /> - You agree to use the Service only for
                            lawful purposes and in accordance with these Terms.
                            <br /> - You are responsible for all activities that
                            occur under your account.
                          </p>
                        </div>
                        <div className="content">
                          <h4>3. Account Registration</h4>
                          <p>
                            To use the Service, you must create an account by
                            providing accurate and complete information. You are
                            responsible for maintaining the confidentiality of
                            your account information and for all activities that
                            occur under your account. You agree to notify us
                            immediately of any unauthorized use of your account.
                          </p>
                        </div>
                        <div className="content">
                          <h4>4. Privacy</h4>
                          <p>
                            Your use of the Service is also governed by our
                            Privacy Policy, which can be found at [link to
                            Privacy Policy]. By using the Service, you consent
                            to the collection and use of your information as
                            described in the Privacy Policy.
                          </p>
                        </div>
                        <div className="content">
                          <h4>5. Payment and Fees</h4>
                          <p>
                            - Some features of the Service may require payment
                            of fees. You agree to pay all applicable fees in
                            connection with your use of the Service.
                            <br />- We reserve the right to change our fees at
                            any time. Any fee changes will be effective upon
                            posting on our website.
                          </p>
                        </div>
                        <div className="content">
                          <h4>6. Intellectual Property</h4>
                          <p>
                            All content and materials available on the Service,
                            including but not limited to text, graphics, website
                            name, code, images, and logos, are the intellectual
                            property of Aristostech India Pvt Ltd and are
                            protected by applicable intellectual property laws.
                            You are granted a limited license only for the
                            purposes of viewing and using the Service.
                          </p>
                        </div>
                        <div className="content">
                          <h4>7. Termination</h4>
                          <p>
                            We reserve the right to terminate or suspend your
                            account and access to the Service at our sole
                            discretion, without notice, for conduct that we
                            believe violates these Terms or is harmful to other
                            users of the Service, us, or third parties, or for
                            any other reason.
                          </p>
                        </div>
                        <div className="content">
                          <h4>8. Disclaimer of Warranties</h4>
                          <p>
                            The Service is provided on an "as is" and "as
                            available" basis. We make no warranties, expressed
                            or implied, regarding the Service, including but not
                            limited to the implied warranties of
                            merchantability, fitness for a particular purpose,
                            and non-infringement.
                          </p>
                        </div>
                        <div className="content">
                          <h4>9. Limitation of Liability</h4>
                          <p>
                            In no event shall Aristostech India Pvt Ltd be
                            liable for any indirect, incidental, special,
                            consequential, or punitive damages, including
                            without limitation, loss of profits, data, use,
                            goodwill, or other intangible losses, resulting from{" "}
                            <br />
                            (i) your use or inability to use the Service; <br />
                            (ii) any unauthorized access to or use of our
                            servers and/or any personal information stored
                            therein; <br />
                            (iii) any interruption or cessation of transmission
                            to or from the Service; and
                            <br /> (iv) any bugs, viruses, trojan horses, or the
                            like that may be transmitted to or through our
                            Service by any third party.
                          </p>
                        </div>
                        <div className="content">
                          <h4>10. Governing Law</h4>
                          <p>
                            These Terms shall be governed by and construed in
                            accordance with the laws of India, without regard to
                            its conflict of law principles. You agree to submit
                            to the personal jurisdiction of the courts located
                            in [City, State], India, for the purpose of
                            litigating all such claims or disputes.
                          </p>
                        </div>
                        <div className="content">
                          <h4>11. Contact Us</h4>
                          <p>
                            If you have any questions about these Terms, please
                            contact us at:
                          </p>
                          <div className="company">
                            <h5>Aristostech India Pvt Ltd</h5>
                            <strong>Email: contact@aristostechindia.com</strong>
                          </div>
                          <div className="note">
                            <small>
                              Please review this draft and let me know if you
                              need any modifications or additional sections.
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* Privacy Policy */}
                {OpenPrivacyCondition ? (
                  <div
                    className="privacy_condtion_container"
                    onClick={() => setOpenPrivacyCondition(false)}
                  >
                    <div className="privacy_main_center_box">
                      <div
                        className="close_terms"
                        onClick={() => setOpenPrivacyCondition(false)}
                      >
                        <i className="fa-solid fa-circle-xmark"></i>
                      </div>
                      <div className="term_title">
                        <h5>Privacy Policy</h5>
                      </div>
                      <div className="content_box">
                        <div className="content">
                          <h4>Effective Date: 19 - 07- 2024</h4>
                          <p>
                            Welcome to MyVirtualCard.in. Your privacy is
                            important to us. This Privacy Policy explains how we
                            collect, use, disclose, and safeguard your
                            information when you visit our website{" "}
                            <a href="https://myvirtualcard.in" target="_blank">
                              https://myvirtualcard.in
                            </a>
                            , use our services, or engage with us in other ways.
                            Please read this policy carefully. If you do not
                            agree with the terms of this Privacy Policy, please
                            do not access the site.
                          </p>
                        </div>
                        <div className="content">
                          <h4>1. Information We Collect</h4>
                          <p>
                            We may collect information about you in a variety of
                            ways. The information we may collect on the Site
                            includes:
                          </p>
                          <div className="child_content">
                            <h5>Personal Data</h5>
                            <ul>
                              <li>
                                <bold>Contact Information:</bold> such as your
                                name, Email address, phone number, and postal
                                address.
                              </li>
                              <li>
                                <bold>Identity Information:</bold> such as your
                                username, password, and other similar
                                information.
                              </li>
                            </ul>
                          </div>
                          <div className="child_content">
                            <h5>Usage Data</h5>
                            <ul>
                              <li>
                                <bold>Activity Information: </bold>such as pages
                                viewed, access times, and browsing patterns.
                              </li>
                              <li>
                                <bold> Technical Information:</bold> such as IP
                                address, browser type, operating system, and
                                Internet Service Provider.
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="content">
                          <h4>2. How We Use Your Information</h4>
                          <p>
                            We do not sell, trade, or otherwise transfer your
                            personal information to outside parties except as
                            described below:
                          </p>
                          <div className="child_content">
                            <ul>
                              <li>
                                <bold>To Provide Services:</bold> Including
                                creating and managing your account, processing
                                transactions, and providing customer support.
                              </li>
                              <li>
                                <bold> To Communicate: </bold>Including sending
                                you updates, newsletters, and marketing
                                communications.
                              </li>
                              <li>
                                <bold> To Improve Our Services: </bold>Including
                                analyzing usage data to enhance our website's
                                functionality and user experience.
                              </li>
                              <li>
                                <bold>To Ensure Security: </bold> Including
                                detecting and preventing fraud and unauthorized
                                access.
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="content">
                          <h4>3. Sharing Your Information</h4>
                          <p>
                            We do not sell, trade, or otherwise transfer your
                            personal information to outside parties except as
                            described below:
                          </p>
                          <div className="child_content">
                            <ul>
                              <li>
                                <bold>With Service Providers:</bold> We may
                                share your information with third-party service
                                providers who assist us in operating our website
                                and conducting our business.
                              </li>
                              <li>
                                <bold>For Legal Reasons:</bold> We may disclose
                                your information when we believe it is necessary
                                to comply with the law, enforce our site
                                policies, or protect our or others' rights,
                                property, or safety.
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="content">
                          <h4>4. Data Security</h4>
                          <p>
                            We implement a variety of security measures to
                            maintain the safety of your personal information.
                            However, please note that no method of transmission
                            over the Internet or method of electronic storage is
                            100% secure.
                          </p>
                        </div>
                        <div className="content">
                          <h4>5. Your Rights</h4>
                          <p>
                            You have certain rights regarding your personal
                            data, including the right to access, correct, or
                            delete your personal information, and the right to
                            object to or restrict certain processing. To
                            exercise these rights, please contact us at [insert
                            contact Email].
                          </p>
                        </div>
                        <div className="content">
                          <h4>6. Cookies and Tracking Technologies</h4>
                          <p>
                            We use cookies and similar tracking technologies to
                            track activity on our website and hold certain
                            information. You can instruct your browser to refuse
                            all cookies or to indicate when a cookie is being
                            sent. However, if you do not accept cookies, you may
                            not be able to use some parts of our website.
                          </p>
                        </div>
                        <div className="content">
                          <h4>7. Third-Party Links</h4>
                          <p>
                            Our website may contain links to other websites. We
                            are not responsible for the privacy practices or
                            content of these other sites. We encourage you to
                            read the privacy policies of each website you visit.
                          </p>
                        </div>
                        <div className="content">
                          <h4>8. Changes to This Privacy Policy</h4>
                          <p>
                            We may update our Privacy Policy from time to time.
                            We will notify you of any changes by posting the new
                            Privacy Policy on this page and updating the
                            effective date.
                          </p>
                        </div>

                        <div className="content">
                          <h4>11. Contact Us</h4>
                          <p>
                            If you have any questions about these Terms, please
                            contact us at:
                          </p>
                          <div className="company">
                            <h5>MyVirtualcard.in</h5>
                            <p>
                              <b>Address:</b> No. 113, Ankur Plaza, GN Chetty
                              Rd, T. Nagar, Chennai, India, Tamil Nadu 600017
                            </p>
                            <p>
                              <b>Email:</b> contact@aristostechindia.com
                            </p>
                            <p>
                              <b>Contact Phone Number :</b> +91 93444 82370
                            </p>
                          </div>
                          <div className="note">
                            <small>
                              Please review this draft and let me know if you
                              need any modifications or additional sections.
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="register_box_container">
                  <div className="left_side">
                    <div className="title">
                      <h4>Welcome to Digital VCard Application</h4>
                      <small>
                        Register to create your reseller account to become our
                        band sales partnership to get your reasonable profit
                        based upon customer purchase!
                      </small>
                    </div>
                    <div className="right_image">
                      <Lottie
                        options={PartnershipAnimeoptions}
                        height={"90%"}
                        width={"100%"}
                        className="lottie"
                      />
                    </div>
                  </div>

                  <div className="right_side">
                    <div
                      className="close"
                      onClick={() => setResellerToggle(false)}
                    >
                      <i className="bx bx-x"></i>
                    </div>
                    <form onSubmit={Reseller_formik.handleSubmit}>
                      <div className="form_title">
                        <h4>
                          Create Your Re_Seller Account
                          <WiStars />
                        </h4>
                      </div>
                      {/* <div className="Profile">
                        <label htmlFor="Profile">
                          <img
                            src={
                              preview ||
                              "https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                            }
                            alt="avatar"
                            id="profile_image"
                          />
                          <i className="bx bx-chevrons-left bx-fade-right"></i>
                          <span>Upload your profile logo</span>
                        </label>
                        <input
                          type="file"
                          id="Profile"
                          name="Profile"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          // {...Reseller_formik.getFieldProps('Profile')}
                        />
                      </div> */}
                      {/* //UserName: */}
                      <div className="form_group">
                        <label htmlFor="UserName">
                          UserName{" "}
                          <span>
                            <sup>*</sup>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Unique UserName "
                          name="UserName"
                          id="UserName"
                          value={Reseller_formik.values.UserName}
                          onBlur={Reseller_formik.handleBlur}
                          onChange={Reseller_formik.handleChange}
                          className={
                            Reseller_formik.errors.UserName &&
                            Reseller_formik.touched.UserName
                              ? "input_error"
                              : ""
                          }
                          // {...Reseller_formik.getFieldProps("UserName")}
                        />
                        <div className="error">
                          {Reseller_formik.errors.UserName}
                        </div>
                        <div className="icon">
                          <FaRegUserCircle />
                        </div>
                      </div>
                      {/* //First Name */}
                      <div className="form_group">
                        <label htmlFor="FullName">
                          FullName{" "}
                          <span>
                            <sup>*</sup>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Your FullName "
                          name="FullName"
                          id="FullName"
                          value={Reseller_formik.values.FullName}
                          onBlur={Reseller_formik.handleBlur}
                          onChange={Reseller_formik.handleChange}
                          className={
                            Reseller_formik.errors.FullName &&
                            Reseller_formik.touched.FullName
                              ? "input_error"
                              : ""
                          }
                          // {...Reseller_formik.getFieldProps("FullName")}
                        />
                        <div className="error">
                          {Reseller_formik.errors.FullName}
                        </div>
                        <div className="icon">
                          <FaRegUser />
                        </div>
                      </div>

                      {/* Email`` */}
                      <div className="form_group">
                        <label htmlFor="Email">
                          Email{" "}
                          <span>
                            <sup>*</sup>
                          </span>
                        </label>
                        <input
                          type="Email"
                          placeholder="Eg : demo@gmail.com"
                          name="Email"
                          id="Email"
                          value={Reseller_formik.values.Email}
                          onBlur={Reseller_formik.handleBlur}
                          onChange={Reseller_formik.handleChange}
                          className={
                            Reseller_formik.errors.Email &&
                            Reseller_formik.touched.Email
                              ? "input_error"
                              : ""
                          }
                          // {...Reseller_formik.getFieldProps("Email")}
                        />
                        <div className="error">
                          {Reseller_formik.errors.Email}
                        </div>
                        <div className="icon">
                          <HiOutlineMail />
                        </div>
                      </div>
                      {/* MobileNumber`` */}
                      <div className="form_group">
                        <label htmlFor="MobileNumber">
                          Mobile Number{" "}
                          <span>
                            <sup>*</sup>
                          </span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter your MobileNumber"
                          name="MobileNumber"
                          id="MobileNumber"
                          value={Reseller_formik.values.MobileNumber}
                          onBlur={Reseller_formik.handleBlur}
                          onChange={Reseller_formik.handleChange}
                          className={
                            Reseller_formik.errors.MobileNumber &&
                            Reseller_formik.touched.MobileNumber
                              ? "input_error"
                              : ""
                          }
                        />
                        <div className="error">
                          {Reseller_formik.errors.MobileNumber}
                        </div>
                        <div className="icon">
                          <CiMobile3 />
                        </div>
                      </div>
                      {/* Password`` */}
                      <div className="form_group">
                        <label htmlFor="Password">
                          Password{" "}
                          <span>
                            <sup>*</sup>
                          </span>
                        </label>
                        <input
                          type="Password"
                          placeholder="Password"
                          name="Password"
                          id="Password"
                          value={Reseller_formik.values.Password}
                          onBlur={Reseller_formik.handleBlur}
                          onChange={Reseller_formik.handleChange}
                          className={
                            Reseller_formik.errors.Password &&
                            Reseller_formik.touched.Password
                              ? "input_error"
                              : ""
                          }
                          // {...Reseller_formik.getFieldProps("Password")}
                        />
                        <div className="error">
                          {Reseller_formik.errors.Password}
                        </div>
                        <div className="icon">
                          <RiLockPasswordLine />
                        </div>

                        <div className="show_pass" onClick={handleShow}>
                          {!show ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>
                        {/* <div className="strength_indicator">
                
                    {Reseller_formik.errors.Password && Reseller_formik.touched.Password ? (
                      ''
                    ) : (
                      <span>Secure Password</span>
                    )}
                  </div> */}
                      </div>
                      <div className="aggrement">
                        <div className="form_group_checkbox">
                          <input
                            type="checkbox"
                            name="Terms"
                            // onClick={() => set("Terms", true)}
                            id="Terms"
                            onChange={Reseller_formik.handleChange}
                            value={Reseller_formik.values.Terms}
                            onBlur={Reseller_formik.handleBlur}
                            className={
                              Reseller_formik.errors.Terms &&
                              Reseller_formik.touched.Terms
                                ? "input_error"
                                : ""
                            }
                          />
                          <label htmlFor="Terms">
                            By signing up to create an account I accept
                            Company's{" "}
                            <Link onClick={() => setOpenTermsCondition(true)}>
                              Terms of Use
                            </Link>{" "}
                            and{" "}
                            <Link onClick={() => setOpenPrivacyCondition(true)}>
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                        <div className="error">
                          {Reseller_formik.errors.Terms}
                        </div>
                      </div>

                      <div className="form_submit">
                        <button type="submit">
                          Register
                          <div className="icon">
                            {registerLoader ? (
                              <div className="loader"></div>
                            ) : (
                              <FaArrowRight />
                            )}
                          </div>
                        </button>
                      </div>
                      <div className="or">
                        <Link>
                          Already u have been membership?{" "}
                          <span
                            onClick={() => {
                              setResellerLoginToggle(true),
                                setResellerToggle(false);
                            }}
                          >
                            Login
                          </span>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {ResellerLoginToggle ? (
              <>
                <div className="verify_box_container">
                  <div className="left_side">
                    <div className="title">
                      <h4>Welcome Back to Digital VCard Application</h4>
                      <small>Let's Continue your brand building!</small>
                    </div>
                    <div className="right_image">
                      <Lottie
                        options={LoginAnimationOption}
                        height={"100%"}
                        width={"100%"}
                      />
                    </div>
                  </div>
                  <div className="right_form">
                    <>
                      {!ForgotPassToggle ? (
                        <>
                          {/* Login Form */}
                          <form
                            action=""
                            onSubmit={Login_formik.handleSubmit}
                            className="login_form"
                          >
                            <div className="login_form_title">
                              <h4>
                                User Sign-In <WiStars />
                              </h4>
                              <small>Please Login with your Accout!</small>
                            </div>
                            {/* Email`` */}
                            <div className="form_group">
                              <label htmlFor="Email">
                                Email{" "}
                                <span>
                                  <sup>*</sup>
                                </span>
                              </label>
                              <input
                                ref={inputRefFocus}
                                type="email"
                                placeholder="Enter registered Email"
                                name="Email"
                                id="Email"
                                value={Login_formik.values.Email}
                                onBlur={Login_formik.handleBlur}
                                onChange={Login_formik.handleChange}
                                className={
                                  Login_formik.errors.Email &&
                                  Login_formik.touched.Email
                                    ? "input_error"
                                    : ""
                                }
                              />
                              <div className="error">
                                {Login_formik.errors.Email}
                              </div>
                              <div className="icon">
                                <BsFillTelephoneInboundFill />
                              </div>
                            </div>
                            <div className="form_group">
                              <label htmlFor="Password">
                                Password{" "}
                                <span>
                                  <sup>*</sup>
                                </span>
                              </label>
                              <input
                                type="password"
                                placeholder="Password"
                                name="Password"
                                id="Password"
                                value={Login_formik.values.Password}
                                onBlur={Login_formik.handleBlur}
                                onChange={Login_formik.handleChange}
                                className={
                                  Login_formik.errors.Password &&
                                  Login_formik.touched.Password
                                    ? "input_error"
                                    : ""
                                }
                              />
                              <div className="error">
                                {Login_formik.errors.Password}
                              </div>
                              <div className="icon">
                                <RiLockPasswordLine />
                              </div>

                              <div className="show_pass" onClick={handleShow}>
                                {!show ? <FaRegEyeSlash /> : <FaRegEye />}
                              </div>
                            </div>

                            <div className="forgot_password">
                              <Link onClick={() => setForgotPassToggle(true)}>
                                <small>Forgot Password ?</small>
                              </Link>
                            </div>
                            <div className="form_submit">
                              <button type="submit">
                                Sign In
                                <div className="icon">
                                  {registerLoader ? (
                                    <div className="loader"></div>
                                  ) : (
                                    <BiLogInCircle />
                                  )}
                                </div>
                              </button>
                            </div>
                            <div className="or">
                              <Link>
                                Create New Account ?{" "}
                                <span
                                  onClick={() => {
                                    setResellerToggle(true),
                                      setResellerLoginToggle(false);
                                  }}
                                >
                                  Sign Up
                                </span>
                              </Link>

                              <Link to="/reseller_OTP">
                                Verify Your Account? <span>Click</span>
                              </Link>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          {/* ForgotPass Email Form */}
                          <form
                            onSubmit={Forgot_formik.handleSubmit}
                            className="login_form"
                          >
                            <div className="login_form_title">
                              <h4>
                                Don't Worry about your password been lost..
                              </h4>
                              <small>Reset your old password!</small>
                            </div>
                            {/* Email`` */}
                            <div className="form_group">
                              <label htmlFor="Email">
                                Your Registered Email{" "}
                                <span>
                                  <sup>*</sup>
                                </span>
                              </label>
                              <input
                                type="email"
                                placeholder="Eg : abc@gmail.com"
                                name="Email"
                                id="Email"
                                value={Forgot_formik.values.Email}
                                onBlur={Forgot_formik.handleBlur}
                                onChange={Forgot_formik.handleChange}
                                className={
                                  Forgot_formik.errors.Email &&
                                  Forgot_formik.touched.Email
                                    ? "input_error"
                                    : ""
                                }
                              />
                              <div className="error">
                                {Forgot_formik.errors.Email}
                              </div>
                              <div className="icon">
                                <HiOutlineMail />
                              </div>
                            </div>

                            <div className="form_submit">
                              <button type="submit">
                                Send
                                <div className="icon">
                                  {registerLoader ? (
                                    <div className="loader"></div>
                                  ) : (
                                    <FaArrowRight />
                                  )}
                                </div>
                              </button>
                            </div>
                            <div className="or">
                              <Link onClick={() => setForgotPassToggle(false)}>
                                Cancel Forgot Password ? <span>login</span>
                              </Link>
                            </div>
                          </form>
                        </>
                      )}
                    </>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className={`row_1 ${ResellerToggle ? "hide" : "show"}`}>
              <div className="left">
                <div className="offer">
                  <small>
                    <strong>50% </strong>- Offer's Going On{" "}
                    <Lottie
                      options={arrow_options1}
                      height={"40px"}
                      width={"40px"}
                      className="lottie"
                    />
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
              <div className="social_medias">
                <a href="#">
                  <i className="bx bxl-facebook"></i>
                  {/* <div className="note">
                  <p>Facebook</p>
                </div> */}
                  <div className="back_anime">
                    <Lottie
                      options={SocialIconoptions}
                      height={window.innerWidth < 900 ? "40px" : "50px"}
                      width={window.innerWidth < 900 ? "40px" : "50px"}
                      className="lottie"
                    />
                  </div>
                </a>
                <a href="#">
                  <i className="bx bxl-instagram-alt"></i>
                  {/* <div className="note">
                  <p>Instagram</p>
                </div> */}
                  <div className="back_anime">
                    <Lottie
                      options={SocialIconoptions}
                      height={window.innerWidth < 900 ? "40px" : "50px"}
                      width={window.innerWidth < 900 ? "40px" : "50px"}
                      className="lottie"
                    />
                  </div>
                </a>
                <a href="#">
                  <i className="bx bxl-whatsapp"></i>
                  {/* <div className="note">
                  <p>Whatsup</p>
                </div> */}
                  <div className="back_anime">
                    <Lottie
                      options={SocialIconoptions}
                      height={window.innerWidth < 900 ? "40px" : "50px"}
                      width={window.innerWidth < 900 ? "40px" : "50px"}
                      className="lottie"
                    />
                  </div>
                </a>
                <a href="#">
                  <i className="bx bxl-twitter"></i>
                  {/* <div className="note">
                  <p>Twiter</p>
                </div> */}
                  <div className="back_anime">
                    <Lottie
                      options={SocialIconoptions}
                      height={window.innerWidth < 900 ? "40px" : "50px"}
                      width={window.innerWidth < 900 ? "40px" : "50px"}
                      className="lottie"
                    />
                  </div>
                </a>
                <a href="#">
                  <i className="bx bxl-linkedin"></i>
                  {/* <div className="note">
                  <p>LinkedIn</p>
                </div> */}
                  <div className="back_anime">
                    <Lottie
                      options={SocialIconoptions}
                      height={window.innerWidth < 900 ? "40px" : "50px"}
                      width={window.innerWidth < 900 ? "40px" : "50px"}
                      className="lottie"
                    />
                  </div>
                </a>
              </div>
            </div>
            <div className={`Content_row ${ResellerToggle ? "hide" : "show"}`}>
              <div className="left_side">
                <h1>
                  Design Your <span>Digital Identity</span>
                </h1>
                <h3>Introducing Custom vCards</h3>
                <div className="summary">
                  <div className="list">
                    <div className="arrow">
                      <Lottie
                        options={arrow_options}
                        height={"40px"}
                        width={"40px"}
                        className="lottie"
                      />
                    </div>
                    <div className="note">
                      <p>
                        Customize Your Digital Identity Effortlessly with My
                        VirtualCard!.
                      </p>
                    </div>
                  </div>
                  <div className="list">
                    <div className="arrow">
                      <Lottie
                        options={arrow_options}
                        height={"40px"}
                        width={"40px"}
                        className="lottie"
                      />
                    </div>
                    <div className="note">
                      <p>
                        People are online Now, So convert your Business Card
                        Digitally to share on their mobiles and Wishing your
                        customers encourage them to connect with you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="price">
                  <p>
                    Starting From <strong>₹599</strong>
                  </p>
                </div>
                <div className="actions">
                  {UserName == undefined ? (
                    <Link to="/register" className="register">
                      Create Your VCard Now <TbBrand4Chan className="icon" />
                    </Link>
                  ) : (
                    <Link to={`${UserName}/uadmin/Vcards`} className="register">
                    Update Your Vcard <i className='bx bxs-edit-alt' style={{fontSize:'1rem'}}></i>
                  </Link>
                  )}

                  {ResellerUserName == undefined ? (
                    <Link
                      className="reseller"
                      onClick={() => setResellerToggle(true)}
                    >
                      For Re-Seller Account <MdGroups2 className="icon" />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="right_side">
                <div className="right_title">
                  <h1>
                    Design Your <span>Digital Identity</span>
                  </h1>
                  <h3>Introducing Custom vCards</h3>
                </div>

                <div className="robots">
                <img src={vcardImage} alt="" />

                  <div className="message">
                    <Lottie
                      options={MessageIconoptions}
                      height={window.innerWidth < 700 ? "25px" : "30px"}
                      width={window.innerWidth < 700 ? "25px" : "30px"}
                      className="lottie"
                    />
                    <small
                      className={
                        CurrentBackImageIndex === 1 ? "color2" : "color1"
                      }
                    >
                      {Messages[index]?.message}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Static Template */}
        <section className="Session_2" ref={StaticVcardRef}>
          <div className="session2_back_banner_image">
            <Lottie
              options={Session2BackOptions}
              height={"100%"}
              width={"100%"}
            />
          </div>

          <div className="right_side">
            <div className="slide2_title">
              <h2>Explore Our Range of Static VCard Templates!</h2>
              <p>
                <strong>Simplify Your Digital Networking:</strong> Get Started
                with Our vCard Templates
              </p>

              <div className="sample_title">
                <p>Sample VCard Designs</p>
                <div className="icon">
                  <Lottie
                    options={Session2LeftMobileOption}
                    height={window.innerWidth < 700 ? "40px" : "60px"}
                    width={window.innerWidth < 700 ? "40px" : "60px"}
                    className="lottie"
                  />
                </div>
              </div>
            </div>

            <div className="template_container">
              {StaticTemplateList.map((data, index) => {
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
        </section>
        {/* Subscribe Template */}
        <section className="Session_3" ref={PriceRef}>
          <div className="session3_back_banner_image">
            {/* <Lottie
              options={Session3BackImageOption}
              height={"100%"}
              width={"100%"}
            /> */}
          </div>

          <div className="session3_content_row">
            <div className="left">
            <div className="plan_heading">
                <h1>
                  <div className="icon">
                    <Lottie
                      options={Session3PriceOption}
                      height={window.innerWidth < 700 ? "30px" : "50px"}
                      width={window.innerWidth < 700 ? "30px" : "50px"}
                      className="lottie"
                    />
                  </div>
                  MyVirtualCard Pricing
                </h1>
                <h2>
                  Select the <span>Perfect Plan</span> for You
                  <Lottie
                    options={Session3ArrowOption}
                    height={window.innerWidth < 700 ? "30px" : "60px"}
                    width={window.innerWidth < 700 ? "30px" : "60px"}
                    className="lottie"
                  />
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
        {/* Dynamic Template */}
        <section className="Session_4" ref={DynamicVcardRef}>
          <div className="slider_5_nfc_container">
            <div className="content_box">
              <div className="left">
                <div className="slide2_title">
                  <h2>Explore Our Range of Dynamic vCard Template!</h2>
                  <p>
                    <strong>Simplify Your Digital Networking:</strong> Get
                    Started with Our VCard Template
                  </p>

                  <div className="sample_title">
                    <div className="icon">
                      <Lottie
                        options={Session2LeftMobileOption}
                        height={window.innerWidth < 700 ? "30px" : "60px"}
                        width={window.innerWidth < 700 ? "30px" : "60px"}
                        className="lottie"
                      />
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
                    <Link to="/register">
                      Let's Build <TbBrand4Chan className="icon" />
                    </Link>
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
        {/* Feautures */}
        <section className="Session_5" ref={FeatureRef}>
          <div className="session3_back_banner_image">
            <Lottie
              options={Session3BackImageOption}
              height={"100%"}
              width={"100%"}
            />
          </div>

          <div className="session5_content_row">
            <div className="left">
              <div className="slide5_title">
                <h2>
                  <div className="icon">
                    <Lottie
                      options={Session5Icon}
                      height={window.innerWidth < 700 ? "50px" : "80px"}
                      width={window.innerWidth < 700 ? "50px" : "80px"}
                      className="lottie"
                    />
                  </div>
                  Premium Features by VCard
                </h2>
                <p>
                  Discover Innovation, Integration, and Inspiration with Our
                  Premium Features
                </p>
              </div>
              <div className="feature_container">
                {Feature_list.map((data, index) => {
                  return (
                    <div className="list" key={index}>
                      <div className="icon">
                        <Lottie
                          options={data.icon}
                          height={window.innerWidth < 700 ? "50px" : "50px"}
                          width={window.innerWidth < 700 ? "50px" : "50px"}
                          className="lottie"
                        />
                      </div>
                      <div className="title">
                        <h4>{data.title}</h4>
                      </div>
                      <div className="content">
                        <p>{data.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="right">
              <div className="robots">
                {/* <Lottie
                  options={Session5Robot}
                  height={window.innerWidth < 900 ? "60%" : "80%"}
                  width={window.innerWidth < 900 ? "60%" : "100%"}
                  className="lottie"
                /> */}

                {/* <div className="message">
                  <Lottie
                    options={MessageIconoptions}
                    height={window.innerWidth < 700 ? "30px" : "30px"}
                    width={window.innerWidth < 700 ? "30px" : "30px"}
                    className="lottie"
                  />
                  <small
                    className={
                      CurrentBackImageIndex === 1 ? "color2" : "color1"
                    }
                  >
                    {Messages[index]?.message}
                  </small>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/* NFC */}
        <section className="Session_6" ref={NFCRef}>
          <div className="slide_5_title" initial="hide" animate="show">
            <h2>
              Making a vCard is easy with <span>My Virtual Card</span>
            </h2>
          </div>
          <div className="slide_5_box_container" initial="hide" animate="show">
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
                  Open Your Dasboard And List The Your Featured Product/Services
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
          <div className="slider_5_nfc_container">
            <div className="back_image">
              <div className="session5_back_banner_image">
                <Lottie options={nfcBack} height={"100%"} width={"100%"} />
              </div>
            </div>
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
          </div>
        </section>
        {/* Service */}
        <section className="Session_7" ref={ServiceRef}>
          <div className="session3_back_banner_image">
            <Lottie options={ServiceBack} height={"100%"} width={"100%"} />
          </div>
          <div className="slide7_title">
            <h2>
              <div className="icon">
                <Lottie
                  options={Session5Icon}
                  height={window.innerWidth < 700 ? "70px" : "80px"}
                  width={window.innerWidth < 700 ? "70px" : "80px"}
                  className="lottie"
                />
              </div>
              Our Services
            </h2>
            <p>
              We Offers Web Designing , Full Stack Application , ECommerse Site
              & Digital Vcard At Affordable Price
            </p>
          </div>
          <div className="session7_content_row">
            <div className="left">
              <div className="feature_container">
                {Service_list.map((data, index) => {
                  return (
                    <div className="list" key={index}>
                      <div className="icon">
                        <Lottie
                          options={data.icon}
                          height={window.innerWidth < 700 ? "50px" : "70px"}
                          width={window.innerWidth < 700 ? "50px" : "70px"}
                          className="lottie"
                        />
                      </div>
                      <div className="title">
                        <h4>{data.title}</h4>
                      </div>
                      <div className="content">
                        <p>{data.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="right">
              <div className="robots">
                <Lottie
                  options={ServiceRobot}
                  height={window.innerWidth < 900 ? "60%" : "90%"}
                  width={window.innerWidth < 900 ? "60%" : "100%"}
                  className="lottie"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="Session_8" ref={FAQRef}>
          <div className="session3_back_banner_image">
            {/* <Lottie
              options={Session3BackImageOption}
              height={"100%"}
              width={"100%"}
            /> */}
          </div>
          <div className="slide_8_title">
            <h2>
              Frequently Asked <span>Questions</span>
            </h2>
          </div>
          <div className="sub_heading">
            <p>Got Questions? We’ve Got Answers!</p>
          </div>
          <div className="qn_container_box">
            {/* qn */}
            {questions.map((data, index) => {
              return (
                <div
                  className="question_box"
                  id={selectedQn == data.id ? "showAnswer" : "hideAnswer"}
                  key={index}
                  onClick={() => handleSingleSelection(data.id)}
                >
                  <div className="question">
                    <h5
                      id={
                        selectedQn == data.id ? "heightLess" : "defaultHeight"
                      }
                    >
                      {data.question}
                    </h5>
                    {/* {selectedQn != data.id ? (
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
                      )} */}
                  </div>
                  <div
                    className="answer"
                    id={selectedQn === data.id ? "show" : "hide"}
                  >
                    <small>{data.answer}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Footer */}
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
