import React, { useContext, useState, useEffect, useRef } from "react";
import "./VerifyOTP.scss";
import brand_logo from "../../assets/Logo/brand_logo.png";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
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
const VerifyOTP = () => {
let inputRefFocus = useRef(null);
let {userName,mobileNumber}=useContext(Context);
let[  OTP_Value,
 setOTP_Value]=useState();
  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);
  let [loginLoader, setLoginLoader] = useState(false);
  let [AuthToggle, setAuthToggle] = useState(false);
  let [ResendOTPToggle, setResendOTPToggle] = useState(false);
  let [ResetPassToken_Id, setResetPassToken_Id] = useState("");
  let resetPassId = ResetPassToken_Id.split("/")[0];
  let resetPassToken = ResetPassToken_Id.split("/")[1];

  let navigate = useNavigate();

  let [Seconds, setSeconds] = useState("120");

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
        setSeconds((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [Seconds]);
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

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  //Verify OTP Submit
  let onOTPSubmit = async (OTP_Value) => {
    let data = {
      userName: userName,
      OTP: OTP_Value,
    };
    await api
      .post("/api/user/verifyOTP", data)
      .then((res) => {
        toast.success(res.data.message);
        setLoginLoader(false);
        setRegisterLoader(false);
  
        const datas = JSON.stringify({
          userName: res?.data?.userName,
          token: res?.data?.token,
          id: res?.data?.id,
          firstName: res?.data?.name,
          verified: res?.data?.verified,
        });
        localStorage.setItem("datas", datas);
        setTimeout(() => {
          // setVerifyOTPToggle(false);
          handleSpeak(userName);
          navigate(`/${userName}/uadmin/VCards`);
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoginLoader(false);
        setRegisterLoader(false);
      });
  };
  let resendOTP_formik = useFormik({
    initialValues: {
      userName: userName,
      mobileNumber: mobileNumber,
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoginLoader(true);
      setRegisterLoader(true);
      values.userName =userName;
      await api
        .post("/api/user/resend_OTP", values)
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
        <div className="auth_back"></div>

        {/* Home page button */}

        <div className="home_page">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>

        <div className="brand_logo">
          <img src={brand_logo} alt="brand_logo" />
        </div>
        <div className="verify_box_container">
          <div className="left_side">
            {!ResendOTPToggle ? (
              <div className="title">
                <h4>Verify Your Account!</h4>
                <small>To secure your personal data's...</small>
              </div>
            ) : (
              <div className="title">
                <h4>Activate Two-Factor-Authentication</h4>
                <small>Resend OTP to MobileNumber!</small>
              </div>
            )}

            <div className="right_image">
              <Slider {...vcard_settings}>
                {new_vcards_images.map((data, index) => {
                  return <img src={data} alt="image" key={index} />;
                })}
              </Slider>
            </div>
          </div>
          <div className="right_side">
            <>
              {!ResendOTPToggle ? (
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
                  {/* VerifyForm Without Formik */}
                  <form className="verify_form" onSubmit={onOTPSubmit}>
                    <div className="form_title">
                      <small>Enter OTP Sent to +91&nbsp;{mobileNumber}</small>
                    </div>

                    <div className="otp_form_group">
                      <OTP_input length={6} onOTPSubmit={onOTPSubmit} OTP_Value={OTP_Value} setOTP_Value={setOTP_Value} />
                    </div>
                    <div className="verify_otp_time_box">
                      <h4>
                        <small>Resend OTP in -</small>
                        {formatTime(Seconds)}
                      </h4>
                      {Seconds != 0 ? (
                        <>
                          <Link onClick={() => setResendOTPToggle(true)}>
                            <i className="bx bx-mobile"></i>SMS
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form_submit">
                      <button type="submit" onClick={onOTPSubmit}>
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
                  </form>
                </>
              ) : (
                <>
                  {/* Resend OTP fORM */}
                  <form
                    className="verify_form"
                    action=""
                    onSubmit={resendOTP_formik.handleSubmit}
                  >
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

                      <div className="error">
                        {resendOTP_formik.errors.mobileNumber}
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
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
