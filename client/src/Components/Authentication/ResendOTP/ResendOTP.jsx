import React, { useContext, useState, useEffect, useRef } from "react";
import "./ResendOTP.scss";
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
const ResendOTP = () => {
  let inputRefFocus = useRef(null);
  let { setUser, User, UserName, setUserName } = useContext(Context);
  let [OTP_Value, setOTP_Value] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);
  let [loginLoader, setLoginLoader] = useState(false);
  let [AuthToggle, setAuthToggle] = useState(false);
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
  let resendOTP_formik = useFormik({
    initialValues: {
      MobileNumber: User?.MobileNumber,
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoginLoader(true);
      setRegisterLoader(true);
      await api
        .put(
          `/api/auth/register/resendOTP/${resendOTP_formik.values.MobileNumber}`,
          values
        )
        .then((res) => {
          setOTP_Value(res.data.OTP);
          toast.success(res.data.message);
          setLoginLoader(false);
          setRegisterLoader(false);
          setTimeout(() => {
            navigate('/verify_OTP')
          }, 1500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoginLoader(false);
          setRegisterLoader(false);
        });
    },
  });

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
        className="resend_container"
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
              <h4>Activate Two-Factor-Authentication</h4>
              <small>Send OTP to MobileNumber!</small>
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
            {/* Resend OTP fORM */}
            <form
              className="verify_form"
              action=""
              onSubmit={resendOTP_formik.handleSubmit}
            >
              {/* Back */}

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
              <div className="form_group">
                <label htmlFor="password">
                  Mobile Number{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  ref={inputRefFocus}
                  type="tel"
                  placeholder="Enter Your MobileNumber"
                  name="MobileNumber"
                  id="MobileNumber"
                  value={resendOTP_formik.values.MobileNumber}
                  onBlur={resendOTP_formik.handleBlur}
                  onChange={resendOTP_formik.handleChange}
                  className={
                    resendOTP_formik.errors.MobileNumber &&
                    resendOTP_formik.touched.MobileNumber
                      ? "input_error"
                      : ""
                  }
                  // {...formik.getFieldProps("password")}
                />

                <div className="error">
                  {resendOTP_formik.errors.MobileNumber}
                </div>
                <div className="icon">
                  <i className="bx bx-mobile"></i>
                </div>
              </div>

              <div className="form_submit">
                <button type="submit">
                  {registerLoader ? (
                    <div className="loader"></div>
                  ) : (
                    <>
                      Send OTP
                      <div className="rocket">
                        <i className="bx bx-log-in bx-flashing"></i>
                      </div>
                    </>
                  )}
                </button>
              </div>
              <div className="verify_nav_actions">
                <p>
                  Cancel Authentication ? <Link to="/login">Click</Link>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ResendOTP;
