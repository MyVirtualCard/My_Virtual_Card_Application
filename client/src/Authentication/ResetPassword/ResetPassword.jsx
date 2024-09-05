import React, { useContext, useState, useEffect,useRef } from "react";
import './ResetPassword.scss'
import brand_logo from "../../assets/Logo/brand_logo.png";
import { BiLogInCircle, BiRightArrow } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { BsFillTelephoneInboundFill } from "react-icons/bs";

import { HiOutlineMail } from "react-icons/hi";
import { CiMobile3 } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { WiStars } from "react-icons/wi";
import new_vcards_images from "../VCard_Tempalate_Image/New_Vcards.js";

//register right Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate, useParams } from "react-router-dom";
import Context from "../../Context/GlobalContext.js";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import { ResetPassValidateSchema } from "../../Helper/ResetPassValidation.js";
import { FaHome } from "react-icons/fa";
const ResetPassword = () => {
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
    show,
    setShow,
    profile,
    setProfile,
    AuthToggle,
    setAuthToggle,
    ForgotPassToggle,
    setForgotPassToggle,
    ResetPassToggle,
    ResetPassToken_Id,
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
  let [loginLoader, setLoginLoader] = useState(false);
  let [capchaValue, setCapchaValue] = useState(null);




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
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  //Reset Password Formik
  let resetformik = useFormik({
    initialValues: {
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ResetPassValidateSchema,
    onSubmit: async (values) => {
      setLoginLoader(true);

      await api
        .post(`/api/user/reset_password/${resetPassId}/${resetPassToken}`, values)
        .then((res) => {
          toast.success(res.data.message);
          setLoginLoader(false);
          setTimeout(() => {
            navigate(`/login`);
            setForgotPassToggle(false)
            setResetPassToggle(false);
          }, 2000);
        })
        .catch((error) => {

          toast.error(error.response.data.message);
          setLoginLoader(false);
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
        className="resetPass_container"
        id={AuthToggle ? "login_back" : "register_back"}
      >
        <div className="auth_back"></div>
        {/* Home page button */}
        <div className="home_page">
          <Link to="/">
            <FaHome />
          </Link>
        </div>
        <div className="brand_logo">
          <img src={brand_logo} alt="brand_logo" />
        </div>
        <div className="verify_box_container">
        
          <div className="left_side">
            <div className="title">
              <h4>Don't worry  about your password been Lost..</h4>
              <small>Get Ready to Visit Your Dashboard!</small>
            </div>
            <div className="right_image">
              <Slider {...vcard_settings}>
                {new_vcards_images.map((data, index) => {
                  return <img src={data} alt="image" key={index} />;
                })}
              </Slider>
            </div>
          </div>
          <div className="right_form">
          <form
                      action=""
                      onSubmit={resetformik.handleSubmit}
                      className="login_form"
                    >
                      <div className="form_title">
                      <h4>
                            Update Password  <WiStars />
                          </h4>
                        <small>Create Your New Password!</small>
                      </div>
                      <div className="form_group">
                        <label htmlFor="email">
                          New Password{" "}
                          <span>
                            <sup>*</sup>
                          </span>
                        </label>
                        <input
                        ref={inputRefFocus}
                          type="password"
                          placeholder="Password"
                          name="password"
                          id="password"
                          value={resetformik.values.password}
                          onBlur={resetformik.handleBlur}
                          onChange={resetformik.handleChange}
                          className={
                            resetformik.errors.password &&
                            resetformik.touched.password
                              ? "input_error"
                              : ""
                          }
                        />
                        <div className="error">
                          {resetformik.errors.password}
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
                      <div className="form_submit">
                        <button type="submit">
                          {loginLoader ? (
                            <div className="loader"></div>
                          ) : (
                            <>
                              Update
                              <div className="rocket">
                                <span className="material-symbols-outlined">
                                  lock_reset
                                </span>
                              </div>
                            </>
                          )}
                        </button>
                      </div>

                     
                      <div className="signup_link">
                        <p>
                          Cancel reset Password ?{" "}
                          <Link
                          to='/login'
                          >
                            Exit
                          </Link>
                        </p>
                      </div>
                    </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
