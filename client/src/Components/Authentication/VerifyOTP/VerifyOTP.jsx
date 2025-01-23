import React, { useContext, useState, useEffect, useRef } from "react";
import "./VerifyOTP.scss";
import brand_logo from "../../../assets/Brand_Logo/brand_logo.png";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { CiMobile3 } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { WiStars } from "react-icons/wi";
import { SiAuthelia } from "react-icons/si";
import new_vcards_images from "../VCard_Tempalate_Image/New_Vcards.js";
//register right Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast, Bounce } from "react-toastify";
import OTP_input from "../OTP_Input/OTP_input.jsx";
import Context from "../../Context/GlobalContext.js";
import backImage from "../../../assets/Landing_Page/back_image.png";
const VerifyOTP = () => {
  let inputRefFocus = useRef(null);
  let { setUser, User, UserName, setUserName } = useContext(Context);
  let [OTP_Value, setOTP_Value] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);
  let [loginLoader, setLoginLoader] = useState(false);
  let [AuthToggle, setAuthToggle] = useState(false);
  let [ResendOTPToggle, setResendOTPToggle] = useState(false);
  let [ResetPassToken_Id, setResetPassToken_Id] = useState("");
  let resetPassId = ResetPassToken_Id.split("/")[0];
  let resetPassToken = ResetPassToken_Id.split("/")[1];

  let navigate = useNavigate();

  let [Seconds, setSeconds] = useState("300");
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

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
    try {
      api
        .get(`/api/auth/register/${UserName}`)
        .then((res) => {
          setUser(res.data.user);
          console.log(res.data.user)
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(Seconds / 60);
    const secs = Seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

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

  //Verify OTP Submit
  let onOTPSubmit = async (OTP_Value) => {
    let data = {
      OTP: OTP_Value,
    };
    await api
      .put(`/api/auth/register/verifyOTP/${UserName}`, data)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setLoginLoader(false);
        setRegisterLoader(false);
        const datas = JSON.stringify({
          UserName: res?.data?.UserName,
          token: res?.data?.token,
          id: res?.data?.id,
          FullName: res?.data?.FullName,
        });
        localStorage.setItem("datas", datas);
        // localStorage.setItem("UserName", JSON.stringify(res.data?.UserName));
        let userData = JSON.parse(localStorage.getItem("datas"));
     
  
        setTimeout(() => {
          setUser(userData);
          // setUserName(UserName);
          navigate(`/${UserName}/uadmin/VCards`);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setLoginLoader(false);
        setRegisterLoader(false);
      });
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
        <div className="auth_back">
          <img src={backImage} alt="" />
        </div>

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
              <h4>Verify Your Account!</h4>
              <small>To secure your personal data's...</small>
            </div>

            <div className="right_image">
              <Slider {...vcard_settings}>
                {new_vcards_images.map((data, index) => {
                  return <img src={data.image} alt="image" key={index} />;
                })}
              </Slider>
            </div>
          </div>
          <div className="right_side">
            <div className="back">
              <Link
                to="/login"
                onClick={() => {
                  setAuthToggle(true);
                }}
              >
                <FaArrowLeft />
                Back
              </Link>
            </div>
            {/* VerifyForm Without Formik */}
            <form className="verify_form">
              <div className="form_title">
                <small>Enter OTP Sent to +91&nbsp;{User?.MobileNumber}</small>
              </div>

              <div className="otp_form_group">
                <OTP_input
                  length={6}
                  onOTPSubmit={onOTPSubmit}
                  OTP_Value={OTP_Value}
                  setOTP_Value={setOTP_Value}
                />
              </div>
              <div className="verify_otp_time_box">
                <Link to={"/resend_OTP"}>
                  <i className="bx bx-mobile"></i>Resend OTP
                </Link>
                {/* <Link to={'/login'}>
                        <i className="bx bx-mobile"></i>Back To Login
                      </Link> */}
              </div>
              <div className="form_submit">
                <button type="submit" onSubmit={onOTPSubmit}>
                  Verify
                  <div className="icon">
                    {registerLoader ? (
                      <div className="loader"></div>
                    ) : (
                      <SiAuthelia />
                    )}
                  </div>
                </button>
              </div>
              <div className="login_link">
                <small>Already u have been verified ? </small>
                <Link to={"/login"}>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
