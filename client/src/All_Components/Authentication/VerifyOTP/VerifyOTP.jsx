import React, { useContext, useState, useEffect,useRef} from "react";
import './VerifyOTP.scss'
import resend_otp_img from "../../../assets/Authentication_image/resend_otp_img.png";
import backImage from "../../../assets/LandingPage_image/slide1_back.png";
import message_icon from "../../../assets/icons/message_hand.png";
import brand_logo from "../../../assets/LandingPage_image/BrandLogo3.png";

import new_vcards_images from "../VCard_Tempalate_Image/New_Vcards.js";

import card1 from "../../../assets/Digicards/vmob-1.png";
import card2 from "../../../assets/Digicards/vmob-2.png";
import card3 from "../../../assets/Digicards/vmob-3.png";
import card4 from "../../../assets/Digicards/vmob-4.png";
import card5 from "../../../assets/Digicards/vmob-5.png";
import card6 from "../../../assets/Digicards/vmob-6.png";
import card7 from "../../../assets/Digicards/vmob-7.png";
//register right Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import arrow from "../../../assets/SVG/Register/arrow.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Context from "../../UseContext/Context";
import axios, { all } from "axios";
import { convertToBase64Profile } from "../../Helper/convert";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import {
  LoginValidateSchema,
  RegisterValidateSchema,
} from "../../Helper/RegisterValidate.js";
import { ForgotEmailValidateSchema } from "../../Helper/ForgetPassValidate.js";
import { ResetPassValidateSchema } from "../../Helper/ResetPassValidation.js";
import ReCAPTCHA from "react-google-recaptcha";
import OTP_input from "../OTP_Input/OTP_input.jsx";
const VerifyOTP = () => {
  let inputRefFocus=useRef(null)
  // useEffect(()=>{
  //   inputRefFocus.current.focus()
  // },[])
  //All state data:
  let {
    userRegisterData,setUserRegisterData,
    OTP_Value,
    setOTP_Value,
    show,
    setShow,
    profile,
    setProfile,
    AuthToggle,
    setAuthToggle,
    ForgotPassToggle,
    setForgotPassToggle,
    ResetPassToggle,
    setResetPassToggle,
    VerifyOTPToggle,
    setVerifyOTPToggle,
    ResendOTPToggle,
    setResendOTPToggle,
    userName,
    setUserName,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    mobileNumber,
    setMobileNumber,
    email,
    setEmail,
    password,
    setPassword,
    loader,
    setLoader,
    location,
    setLocation,
  } = useContext(Context);

  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);
  let [loginLoader, setLoginLoader] = useState(false);

  let [OpenTermsCondition, setOpenTermsCondition] = useState(false);
  let [OpenPrivacyCondition, setOpenPrivacyCondition] = useState(false);
  let [capchaValue, setCapchaValue] = useState(null);

  let [ResetPassToken_Id, setResetPassToken_Id] = useState("");
  let resetPassId = ResetPassToken_Id.split("/")[0];
  let resetPassToken = ResetPassToken_Id.split("/")[1];
  let images = [
    {
      id: 1,
      image: card1,
    },
    {
      id: 2,
      image: card2,
    },
    {
      id: 3,
      image: card3,
    },
    {
      id: 4,
      image: card4,
    },
    {
      id: 5,
      image: card5,
    },
    {
      id: 6,
      image: card6,
    },
    {
      id: 7,
      image: card7,
    },
  ];
  let navigate = useNavigate();

  let [Seconds, setSeconds] = useState('120');
  let [OTP_Popup, setOTP_Popup] = useState(false);
  //VCard Slider
  const vcard_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Delay between each slide in milliseconds (e.g., 3000ms = 3 seconds)
    slidesToShow: width < 700 ? 1 : 1,
    slidesToScroll: width < 700 ? 1 : 1,
    rtl: true, // Scroll from left to right
    arrows: true, // Show navigation arrows
  };
  useEffect(() => {

    if (Seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [Seconds]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(Seconds / 60);
    const secs = Seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const handleProfileImageChange = (event) => {
    const ProfileImage = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(ProfileImage);
    reader.onload = () => {
      formik.setFieldValue("profile", reader.result);
      setProfile(reader.result);
    };
  };

  let localStorageDatas_UserName = localStorage.getItem("userName");

  const handleSpeak = (userData) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Welcome ${userData} now u proceed to develop your brand..`
      );
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text to speech!");
    }
  };

  function onChange(value) {
    setCapchaValue(value);
  }
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });


  //Verify OTP Formik
//   let verifyOTP_formik = useFormik({
    
//     initialValues: {
//       userName: localStorageDatas_UserName,
//       OTP: "",
//     },
//     validateOnChange: false,
//     validateOnBlur: false,
//     onSubmit: async (values) => {
//       setRegisterLoader(true);
//       setLoginLoader(true);
// values.userName=localStorageDatas_UserName;
//       await api
//         .post("/auth/verifyOTP", values)
//         .then((res) => {
//           toast.success(res.data.message);
//           setLoginLoader(false);
//           setRegisterLoader(false);
//           // let userData = JSON.parse(localStorage.getItem("datas"));
//           const datas = JSON.stringify({
//             userName: res?.data?.userName,
//             token: res?.data?.token,
//             id: res?.data?.id,
//             firstName: res?.data?.name,
//             verified:res?.data?.verified
//           });
//           localStorage.setItem("datas", datas);
//           setTimeout(() => {
//             setVerifyOTPToggle(false);
//             handleSpeak(localStorageDatas_UserName);
//             navigate(`/${res?.data?.userName}/uadmin/user_vcard`);
//           }, 2000);
//         })
//         .catch((error) => {
//           toast.error(error.response.data.message);
//           setLoginLoader(false);
//           setRegisterLoader(false);
//         });
//     },
//   });
//Verify OTP Submit
  let onOTPSubmit=async(OTP_Value)=>{
    let data={
      userName: localStorageDatas_UserName,
      OTP:OTP_Value
    };
    await api
    .post("/auth/verifyOTP", data)
    .then((res) => {
      toast.success(res.data.message);
      setLoginLoader(false);
      setRegisterLoader(false);
      // let userData = JSON.parse(localStorage.getItem("datas"));
      const datas = JSON.stringify({
        userName: res?.data?.userName,
        token: res?.data?.token,
        id: res?.data?.id,
        firstName: res?.data?.name,
        verified:res?.data?.verified
      });
      localStorage.setItem("datas", datas);
      setTimeout(() => {
        setVerifyOTPToggle(false);
        handleSpeak(localStorageDatas_UserName);
        navigate(`/${res?.data?.userName}/uadmin/user_vcard`);
      }, 2000);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      setLoginLoader(false);
      setRegisterLoader(false);
    });
  }
  let resendOTP_formik = useFormik({
    initialValues: {
      userName: localStorageDatas_UserName,
      mobileNumber: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoginLoader(true);
      setRegisterLoader(true);
values.userName=localStorageDatas_UserName
      await api
        .post("/auth/resend_OTP", values)
        .then((res) => {
          setOTP_Value(res.data.OTP);
          toast.success(res.data.message);
          setLoginLoader(false);
          setRegisterLoader(false);
          setTimeout(() => {
           
            setResendOTPToggle(false);
          }, 1500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoginLoader(false);
          setRegisterLoader(false);
        });
    },
  });
  //Password Show hide :
  let handleShow = () => {
    let password = document.getElementById("password");
    setShow(!show);
    {
      !show
        ? password.setAttribute("type", "text")
        : password.setAttribute("type", "password");
    }
  };
  //Password Show hide :
  let handleShow_OTP = () => {
    let password = document.getElementById("OTP");
    setShow(!show);
    {
      !show
        ? password.setAttribute("type", "text")
        : password.setAttribute("type", "password");
    }
  };
  const buttonStyle = {
    background: "white",
    opacity: 1,
    border: "0px",
    padding: "0px",
    borderRadius: "10px",
    fontSize: "10px",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <i
          className="bx bx-left-arrow-circle"
          style={{ fontSize: "2rem", color: "gray" }}
        ></i>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <i
          className="bx bx-right-arrow-circle"
          style={{ fontSize: "2rem", color: "gray" }}
        ></i>
      </button>
    ),
  };
  return (
    <>
      <div
        className="verify_container"
        id={AuthToggle ? "login_back" : "register_back"}
      >
      {/* Home page button */}

      <div className="home_page">
          <Link to="/">
            <i className="bx bxs-home"></i>Home
          </Link>
        </div>

        <div className="brand_logo">
          <img src={brand_logo} alt="logo" />
        </div>
        <div className="verify_box_container">
          <div className="right_image">
          <Slider {...vcard_settings}>
              
              {new_vcards_images.map((data, index) => {
                return <img src={data} alt="image" key={index} />;
              })}
            </Slider>
          </div>
          <div className="verify_left_form">
            <>
         {!ResendOTPToggle ? 
         <>
                     {/* VerifyForm */}
                     {/* <form className="verify_form" action="" onSubmit={verifyOTP_formik.handleSubmit}>
                  <div className="form_title">
                    <Link to='/login' onClick={()=>{setAuthToggle(true)}}><i className='bx bx-left-arrow-alt'></i>Back</Link>
                    <small>Enter OTP Sent to +91&nbsp;{mobileNumber}</small>
                  </div>
                
                  <div className="form_group">
                    <label htmlFor="password">
                      6-Digit OTP{" "}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                   
                      type="password"
                      placeholder="Enter 6-Digit OTP"
                      name="OTP"
                      id="OTP"
                      value={verifyOTP_formik.values.OTP}
                      onBlur={verifyOTP_formik.handleBlur}
                      onChange={verifyOTP_formik.handleChange}
                      className={
                        verifyOTP_formik.errors.OTP &&
                        verifyOTP_formik.touched.OTP
                          ? "input_error"
                          : ""
                      }
                     
                    />
                 
                    <div className="error">{verifyOTP_formik.errors.OTP}</div>
                    <div className="icon">
                      <span className="material-symbols-outlined">
                        security
                      </span>
                    </div>

                    <div className="show_pass" onClick={handleShow_OTP}>
                      {!show ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </div>
                  </div>
                 <div className="otp_form_group">
                  <OTP_input length={6} onOTPSubmit={onOTPSubmit}/>
                 </div>
                  <div className="verify_otp_time_box">
                      <h4>
                      <small>Resend OTP in -</small>{formatTime(Seconds)} 
                      </h4>
                      {Seconds <=0 ? 
                      <>
                         <Link onClick={() => setResendOTPToggle(true)}><i className='bx bx-mobile'></i>SMS</Link>
                      </>
                      : ''}
                   
                    </div>
                  <div className="form_submit">
                    <button type="submit" >
                      {registerLoader ? (
                        <div className="loader"></div>
                      ) : (
                        <>
                          Verify
                          <div className="rocket">
                            <i className="bx bx-log-in bx-flashing"></i>
                          </div>
                        </>
                      )}
                    </button>
                  </div>
             
                </form> */}
  {/* VerifyForm Without Formik */}
<form className="verify_form" onSubmit={onOTPSubmit}>
                  <div className="form_title">
                    <Link to='/login' onClick={()=>{setAuthToggle(true)}}><i className='bx bx-left-arrow-alt'></i>Back</Link>
                    <small>Enter OTP Sent to +91&nbsp;{mobileNumber}</small>
                  </div>
              
                 <div className="otp_form_group">
                  <OTP_input length={6} onOTPSubmit={onOTPSubmit}/>
                 </div>
                  <div className="verify_otp_time_box">
                      <h4>
                      <small>Resend OTP in -</small>{formatTime(Seconds)} 
                      </h4>
                      {Seconds <=0 ? 
                      <>
                         <Link onClick={() => setResendOTPToggle(true)}><i className='bx bx-mobile'></i>SMS</Link>
                      </>
                      : ''}
                 
                    </div>
                  <div className="form_submit">
 {registerLoader ?  
  <div className="loader"></div>
 : 
''
//  <button type="submit" onClick={onOTPSubmit} >                   
//  Verify
//  <div className="rocket">
//    <i className="bx bx-log-in bx-flashing"></i>
//  </div>
// </button>
 }
                 
                  </div>
             
                </form>
         </>
         : 
         <>
            {/* Resend OTP fORM */}
            <form className="verify_form" action="" onSubmit={resendOTP_formik.handleSubmit}>
                  <div className="form_title">
                  <h4>Activate Two-Factor-Authentication</h4>
                    <small>Resend OTP to MobileNumber!</small>
                  </div>
                  {/* <div className="form_group">
                    <label htmlFor="password">
                      UserName{" "}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your UserName"
                      name="userName"
                      id="userName"
                      value={localStorageDatas?.userName}
                      onBlur={verifyOTP_formik.handleBlur}
                      onChange={verifyOTP_formik.handleChange}
                      className={
                        verifyOTP_formik.errors.userName &&
                        verifyOTP_formik.touched.userName
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("password")}
                    />

                    <div className="error">
                      {verifyOTP_formik.errors.userName}
                    </div>
                    <div className="icon">
                      <i className="bx bxs-user-check"></i>
                    </div>
                  </div> */}
                   <div className="form_group">
                    <label htmlFor="password">
                      Mobile Number{" "}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                    ref={inputRefFocus}
                      type="mobileNumber"
                      placeholder="Enter Your MobileNumber"
                      name="mobileNumber"
                      id="mobileNumber"
                      value={resendOTP_formik.values.mobileNumber}
                      onBlur={resendOTP_formik.handleBlur}
                      onChange={resendOTP_formik.handleChange}
                      className={
                        resendOTP_formik.errors.mobileNumber &&
                        resendOTP_formik.touched.mobileNumber
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("password")}
                    />

                    <div className="error">{resendOTP_formik.errors.mobileNumber}</div>
                    <div className="icon">
                    <i className='bx bx-mobile'></i>
                    </div>
                  </div>

                  <div className="form_submit">
                    <button type="submit">
                      {registerLoader ? (
                        <div className="loader"></div>
                      ) : (
                        <>
                          Resend OTP
                          <div className="rocket">
                            <i className="bx bx-log-in bx-flashing"></i>
                          </div>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="verify_nav_actions">
                    <p>
                      Cancel Authentication ?{" "}
                      <Link to='/login'>
                        Cancel
                      </Link>
                    </p>
                    {/* <p>
                      Not Allow Authentication ?{" "}
                      <Link
                        to={`/${localStorageDatas_UserName}/uadmin/user_vcard`}
                      >
                        ReDirect to Dashboad
                      </Link>
                    </p> */}
                  </div>
                </form>
         </>
         }

            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
