import React, { useContext, useState, useEffect, useRef } from "react";
import "./SAdmin_Login.scss";
import brand_logo from "../../assets/Logo/brand_logo.png";
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
import {
  SAdminLoginValidateSchema,
  RegisterValidateSchema,
} from "../../Helper/RegisterValidate.js";
import { ForgotEmailValidateSchema } from "../../Helper/ForgetPassValidate.js";
import Context from "../../Context/GlobalContext.js";
import { MdOutlineEmail } from "react-icons/md";
const SAdmin_Login = () => {
  let inputRefFocus = useRef(null);

  let {
    setUser,
    resetPassToken,
    setResetPassToken,
    ResetPassToken_Id,
    setResetPassToken_Id,
    resetPassId,
    setResetPassId,
  } = useContext(Context);
  useEffect(() => {
    inputRefFocus.current.focus();
  }, []);
  //All state data:
  let [show, setShow] = useState();
  let [AuthToggle, setAuthToggle] = useState(false);
  let [ForgotPassToggle, setForgotPassToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);
  let [email, setEmail] = useState();
  let navigate = useNavigate();
  let [Seconds, setSeconds] = useState("300");
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
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SAdminLoginValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);

      if (
        Login_formik.values.email === "myvirtualcard@admin.com" &&
        Login_formik.values.password === "SuperAdmin@001"
      ) {
        toast.success("Login Successfully!");
        setRegisterLoader(false);
        setTimeout(() => {
          navigate("/sadmin/users");
        }, 2000);
      } else {
        setRegisterLoader(false);
        toast.error("Invalid Email (Or) Password!");
      }

      // if(Login_formik.values.password === 'sadmin@001'){
      //   toast.success('Login Successfully!');
      //       setRegisterLoader(false);
      // }else{
      //   toast.error('Invalid Credential!')
      // };
      // await api
      //   .post("/api/user/login", values)
      //   .then((res) => {
      //     toast.success(res.data.message);
      //     setRegisterLoader(false);
      //     const datas = JSON.stringify({
      //       userName: res?.data?.userName,
      //       token: res?.data?.token,
      //       id: res?.data?.id,
      //       firstName: res?.data?.name,
      //     });
      //     localStorage.setItem("datas", datas);

      //     let userData = JSON.parse(localStorage.getItem("datas"));

      //   let navigationTimeout =  setTimeout(() => {
      //       setUser(userData)
      //       // handleSpeak(userData.userName);
      //       navigate(`/${userData.userName}/uadmin/VCards`);
      //     }, 2000);
      //     return () => {
      //       clearTimeout(navigationTimeout);
      //     };
      //   })
      //   .catch((error) => {
      //     toast.error(error.response.data.message);
      //     setRegisterLoader(false);
      //   });
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
  console.log(Login_formik.values.email)
  return (
    <>
      <div
        className="login_container"
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
              <h4>Welcome Back to Digital VCard Application</h4>
              <small>Let's Continue with Super Admin Login!</small>
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
            {/* Login Form */}
            <form
              action=""
              onSubmit={ Login_formik.handleSubmit}
             
              className="login_form"
            >
              <div className="login_form_title">
                <h4>
                  Admin Login
                  <WiStars />
                </h4>
                <small>Please Login with your Accout!</small>
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
                  type="tel"
                  placeholder="Enter Admin Email"
                  name="email"
                  id="email"
                  value={Login_formik.values.email}
                  onBlur={Login_formik.handleBlur}
                  onChange={Login_formik.handleChange}
                  className={
                    Login_formik.errors.email && Login_formik.touched.email
                      ? "input_error"
                      : ""
                  }
                />
                <div className="error">{Login_formik.errors.email}</div>
                <div className="icon">
                  <MdOutlineEmail />
                </div>
              </div>
              <div className="form_group">
                <label htmlFor="password">
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
                <div className="error">{Login_formik.errors.password}</div>
                <div className="icon">
                  <RiLockPasswordLine />
                </div>

                <div className="show_pass" onClick={handleShow}>
                  {!show ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>

              {/* <div className="forgot_password">
                      <Link onClick={() => setForgotPassToggle(true)}>
                        <small>Forgot Password ?</small>
                      </Link>
                    </div> */}
              <div className="form_submit">
                <button type="submit">
                  Login
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
                <Link to="/login">
                  For User Login? <span>Click Here</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SAdmin_Login;
