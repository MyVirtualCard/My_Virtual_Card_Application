import React, { useContext, useState, useEffect, useRef } from "react";
import './Login.scss'
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


const Login = () => {
  let inputRefFocus=useRef(null)
  useEffect(()=>{
    inputRefFocus.current.focus()
  },[])
  //All state data:
  let {
    resetPassId,setResetPassId,
    resetPassToken,setResetPassToken,
    userRegisterData,setUserRegisterData,
    OTP_Value,
    setOTP_Value,
    ResetPassToken_Id, setResetPassToken_Id,
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

  let [Seconds, setSeconds] = useState("300");
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
        setSeconds(Seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [Seconds]);
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

  //Login Formik
  let Login_formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      capchaValue: null,
    },
    // validateOnChange: false,
    // validateOnBlur: false,
    validationSchema: LoginValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);

      await api
        .post("/auth/login", values)
        .then((res) => {
          toast.success(res.data.message);
          setRegisterLoader(false);
          const datas = JSON.stringify({
            userName: res?.data?.userName,
            token: res?.data?.token,
            id: res?.data?.id,
            firstName: res?.data?.name,
          });
          localStorage.setItem("datas", datas);

          let userData = JSON.parse(localStorage.getItem("datas"));

          setTimeout(() => {
            handleSpeak(userData);
            navigate(`/${userData.userName}/uadmin/user_vcard`);
          }, 2000);
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
      email: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ForgotEmailValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);
      await api
        .post("/auth/forgot_password", values)
        .then((res) => {

          setResetPassToken_Id(res.data.data);
          setResetPassId(res.data.data.split("/")[0]);
          setResetPassToken(res.data.data.split("/")[1]);
          toast.success(res.data.message);
          setEmail("");
          setTimeout(()=>{
           navigate(`/reset_password/${resetPassId}/${resetPassToken}`)
          },2500)
          setRegisterLoader(false);
        })
        .catch((error) => {
     
          toast.error(error.response.data.message);
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
        className="login_container"
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
            {!ForgotPassToggle ?  
            <>
            {/* Login Form */}
            <form
                      action=""
                      onSubmit={
                        !ForgotPassToggle
                          ? Login_formik.handleSubmit
                          : Forgot_formik.handleSubmit
                      }
                      className="login_form"
                    >
                      <div className="login_form_title">
                        {!ForgotPassToggle ? (
                          <>
                            <h4>Welcome Back to Digital VCard Application</h4>
                            <small>Login With Your Account!</small>
                          </>
                        ) : (
                          <>
                            <h4>Don't Worry about your password been lost..</h4>
                            <small>Reset your old password!</small>
                          </>
                        )}
                      </div>
                      {/* Email`` */}
                      <div className="form_group">
                        <label htmlFor="email">
                          Email{" "}
                          <span>
                            <sup>*</sup>
                          </span>
                        </label>
                        <input
                        ref={inputRefFocus}
                          type="email"
                          placeholder="Eg : abc@gmail.com"
                          name="email"
                          id="email"
                          value={
                             Login_formik.values.email
                             
                          }
                          onBlur={
                           Login_formik.handleBlur
                             
                          }
                          onChange={
                       
                             Login_formik.handleChange
                             
                          }
                          className={
                           Login_formik.errors.email &&
                                Login_formik.touched.email
                                ? "input_error"
                                : ""}
                            
                        />
                        <div className="error">
                          {Login_formik.errors.email}
                            
                        </div>
                        <div className="icon">
                          <i className="bx bxs-envelope"></i>
                        </div>
                      </div>
                      <div className="form_group">
                            <label htmlFor="email">
                              Password{" "}
                              <span>
                                <sup>*</sup>
                              </span>
                            </label>
                            <input
                              type="password"
                              placeholder="Password"
                              name="password"
                              id="password"
                              value={Login_formik.values.password}
                              onBlur={Login_formik.handleBlur}
                              onChange={Login_formik.handleChange}
                              className={
                                Login_formik.errors.password &&
                                Login_formik.touched.password
                                  ? "input_error"
                                  : ""
                              }
                            />
                            <div className="error">
                              {Login_formik.errors.password}
                            </div>
                            <div className="icon">
                              <i className="bx bxs-lock"></i>
                            </div>

                            <div className="show_pass" onClick={handleShow}>
                              {!show ? (
                                <i className="bx bx-low-vision"></i>
                              ) : (
                                <i className="bx bxs-show"></i>
                              )}
                            </div>
                          </div>
                   
                          <div className="forgot_password">
                            <Link onClick={() => setForgotPassToggle(true)}>
                              <small>Forgot Password ?</small>
                            </Link>
                          </div>
                          <div className="form_submit">
                            {registerLoader ? 
                              <div className="loader"></div>
                            : 
                            <>
                              <button type="submit">

                               Login
                               <div className="rocket">
                                 <i className="bx bx-log-in bx-flashing"></i>
                               </div>
                           
                         </button>
                            </>
                            }
                          
                          </div>
                          <div className="or">
                            <Link to='/register'>
                              Create New Account ?{" "}
                              <span
                             
                              
                              >
                                Register
                              </span>
                            </Link>
                          </div>
                        
                 
                    </form>
            </>
            : 
            
            <>
            {/* ForgotPass Email Form */}
            <form
                      action=""
                      onSubmit={
                      Forgot_formik.handleSubmit
                      }
                      className="login_form"
                    >
                      <div className="login_form_title">
                     
                            <h4>Don't Worry about your password been lost..</h4>
                            <small>Reset your old password!</small>
                        
                      </div>
                      {/* Email`` */}
                      <div className="form_group">
                        <label htmlFor="email">
                          Your Registered Email{" "}
                          <span>
                            <sup>*</sup>
                          </span>
                        </label>
                        <input
                          type="email"
                          placeholder="Eg : abc@gmail.com"
                          name="email"
                          id="email"
                          value={
                             Forgot_formik.values.email
                             
                          }
                          onBlur={
                            Forgot_formik.handleBlur
                             
                          }
                          onChange={
                       
                            Forgot_formik.handleChange
                             
                          }
                          className={
                            Forgot_formik.errors.email &&
                            Forgot_formik.touched.email
                                ? "input_error"
                                : ""}
                            
                        />
                        <div className="error">
                          {Forgot_formik.errors.email}
                            
                        </div>
                        <div className="icon">
                          <i className="bx bxs-envelope"></i>
                        </div>
                      </div>
          
                   
                          <div className="form_submit">
                            {registerLoader ? 
                               <div className="loader"></div>
                            : 
                            <button type="submit">

                            Reset 
                            <div className="rocket">
                              <i className="bx bx-log-in bx-flashing"></i>
                            </div>
                        
                      </button>
                            }
                       
                          </div>
                          <div className="or">
                            <Link onClick={()=>setForgotPassToggle(false)}>
                              Cancel Forgot Password ?{" "}
                              <span
                             
                              
                              >
                                login
                              </span>
                            </Link>
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

export default Login;
