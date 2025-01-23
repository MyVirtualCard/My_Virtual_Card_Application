import React, { useContext, useState, useEffect, useRef } from "react";
import "./ResellerOTP.scss";
import { SiAuthelia } from "react-icons/si";
//register right Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast, Bounce } from "react-toastify";
import OTP_input from "./OTP_Input/OTP_input.jsx";
import { AppContext } from "../../Context/AppContext.jsx";
import backImage from "../../../assets/Landing_Page/back_image.png";
const ResellerOTP = ({VerifyOTP_popup, setVerifyOTP_popup}) => {
  let inputRefFocus = useRef(null);
  let { setUser, User, UserName, setUserName,ResellerUserName } = useContext(AppContext);
  let [OTP_Value, setOTP_Value] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);
  let [loginLoader, setLoginLoader] = useState(false);
  let [AuthToggle, setAuthToggle] = useState(false);
  let [ResendOTPToggle, setResendOTPToggle] = useState(false);
  let [ResetPassToken_Id, setResetPassToken_Id] = useState("");
  let navigate = useNavigate();
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
        .get(`/api/auth/resellerClient/register/${ResellerUserName}`)
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
  }, [VerifyOTP_popup]);
  //Verify OTP Submit
  let onOTPSubmit = async (OTP_Value) => {
    let data = {
      OTP: OTP_Value,
    };
    await api
      .put(`/api/auth/resellerClient/register/verifyOTP/${ResellerUserName}`, data)
      .then((res) => {
       
        toast.success(res.data.message);
        setLoginLoader(false);
        setRegisterLoader(false);
        const datas = JSON.stringify({
          ResellerUserName: res?.data?.ResellerUserName,
          token: res?.data?.token,
          id: res?.data?.id,
          FullName: res?.data?.FullName,
          Reseller:res?.data?.Reseller
        });
        localStorage.setItem("datas", datas);
        // localStorage.setItem("UserName", JSON.stringify(res.data?.UserName));
        let userData = JSON.parse(localStorage.getItem("datas"));
     
  
        setTimeout(() => {
          setUser(userData);
          navigate(`/${UserName}/uadmin/VCards`);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setLoginLoader(false);
        setRegisterLoader(false);
      });
  };

  return (
    <>
      <div
        className="reseller_verify_container"
      >
      
        <div className="verify_box_container">
          <div className="right_side">
            <div className="back">
              <p
              
                onClick={() => {
                  setVerifyOTP_popup(false);
                }}
              >
               
                Close
              </p>
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
                {/* <Link to={"/resend_OTP"}>
                  <i className="bx bx-mobile"></i>Resend OTP
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

export default ResellerOTP;
