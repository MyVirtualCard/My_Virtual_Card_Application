import React, { useContext, useState, useEffect, useRef } from "react";
import "./Login.scss";
import brand_logo from "../../../assets/Brand_Logo/brand_logo.png";
import { BiLogInCircle, BiRightArrow } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
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

import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { LoginValidateSchema } from "../../Helper/RegisterValidate.js";
import { ForgotEmailValidateSchema } from "../../Helper/ForgetPassValidate.js";
import backImage from "../../../assets/Landing_Page/back_image.png";
import { AppContext } from "../../Context/AppContext.jsx";
import { SetUserCookie } from "../../Cookies/UserCookie.jsx";
import Cookies from 'js-cookie'
const Login = () => {
  let inputRefFocus = useRef(null);

  let { backendUrl, setIsLoggedIn, getUserData,UserName } = useContext(AppContext);
  console.log(UserName)
  useEffect(() => {
    inputRefFocus.current.focus();
  }, []);
  //All state data:
  let [show, setShow] = useState();
  let [AuthToggle, setAuthToggle] = useState(false);
  let [ForgotPassToggle, setForgotPassToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);
  let [Email, setEmail] = useState();
  let navigate = useNavigate();
  let [Seconds, setSeconds] = useState("300");
  //VCard Slider
  const vcard_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Delay between each slide in milliseconds (e.g., 3000ms = 3 seconds)
    slidesToShow: width < 700 ? 1 : 2,
    slidesToScroll: width < 700 ? 1 : 2,
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

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

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
        .post(backendUrl + "/api/auth/login", values)
        .then((res) => {
          setRegisterLoader(false);
          if (res.data.success === true) {
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(true);
            getUserData();
            toast.success(res.data.message);
            setTimeout(() => {
              navigate(`/${localStorage.getItem('UserName')}/uadmin/VCards`);
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

  //Password Show hide :
  let handleShow = () => {
    let Password = document.getElementById("Password");
    setShow(!show);
    {
      !show
        ? Password.setAttribute("type", "text")
        : Password.setAttribute("type", "password");
    }
  };
  return (
    <>
      <div
        className="login_container"
        id={AuthToggle ? "login_back" : "register_back"}
      >
        <div className="auth_back">
          
          <img src={backImage} alt="" />
        </div>
        {/* Home page button */}
        <div className="home_page">
          <Link to="/">
            <FaHome />
            <span>Home</span>
          </Link>
        </div>
        <div className="brand_logo">
          <Link to={'/'}>
          <img src={brand_logo} alt="brand_logo" />
          </Link>
        
        </div>
        <div className="verify_box_container">
          <div className="left_side">
            <div className="title">
              <h4>Welcome Back to Digital VCard Application</h4>
              <small>Let's Continue your brand building!</small>
            </div>
            <div className="right_image">
              <Slider {...vcard_settings}>
                {new_vcards_images.map((data, index) => {
                  return <img src={data.image} alt="image" key={index} />;
                })}
              </Slider>
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
                        Registered Email
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
                      <div className="error">{Login_formik.errors.Email}</div>
                      <div className="icon">
                        <HiOutlineMail />
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
                      <Link to="/register">
                        Create New Account ? <span>Sign Up</span>
                      </Link>
                      {/* <Link to="/admin_login">
                        For Admin Login ? <span>Click Here</span>
                      </Link> */}
                      <Link to="/resend_OTP">
                        Verify Your Account? <span>Click</span>
                      </Link>
                    </div>
                    {/* <div className="verify_account_li">
                    <Link to="/resend_OTP">
                        Verify Your Account? <span>Click</span>
                      </Link>
                    </div> */}
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
                      <h4>Don't Worry about your password been lost..</h4>
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
                      <div className="error">{Forgot_formik.errors.Email}</div>
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
      </div>
    </>
  );
};

export default Login;
