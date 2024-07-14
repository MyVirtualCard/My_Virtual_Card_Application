import React, { useContext, useState, useEffect, useRef } from "react";
import "./VerifyOTP.scss";
import login_svg from "../../../assets/SVG/VerifyOTP/auth.svg";
import site_logo from "../../../assets/Authentication_image/BrandLogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../UseContext/Context";
const VerifyOTP = () => {
  let [loginLoader, setLoginLoader] = useState(false);
  let [Seconds, setSeconds] = useState("60");
  useEffect(() => {
    if (Seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(Seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [Seconds]);
//   const startTimer = () => {
//     const countdownDate = new Date("00:00:00").getTime();
//     interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = 0 - 60000;
//       const seconds = Math.floor((1000 * 60) / 1000);

//       if (seconds < 10) {
//         setSeconds("0" + seconds);
//       } else {
//         setSeconds(seconds);
//       }
//     }, 1000);
//   };
//   let interval = useRef();
//   useEffect(() => {
//     startTimer();
//     return () => {
//       clearInterval(interval.current);
//     };
//   }, []);
  let navigate = useNavigate();
  let {
    userName,
    show,
    setShow,
    profile,
    setProfile,
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
  } = useContext(Context);
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  let formik = useFormik({
    initialValues: {
      userName: "",
      OTP: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoginLoader(true);

      await api
        .post("/auth/verifyOTP", values)
        .then((res) => {
          toast.success(res.data.message);
          setLoginLoader(false);
          setTimeout(() => {
            navigate(`/login`);
          }, 1500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
  });

  return (
    <>
      <div className="verify_container">
        <Toaster position="top-right"></Toaster>
        <div className="right">
          <img src={login_svg} alt="" />
        </div>
        <div className="left">
          <div className="box_container">
            <div className="site_logo">
              <img src={site_logo} alt="logo" />
            </div>
            <div className="right_form">
              <div className="form_title">
                <h4>Enabled Two-Factor Authentication!</h4>
                <p>Verify Your Registered Email Account!</p>
              </div>

              <form action="" onSubmit={formik.handleSubmit}>
                {/* Email`` */}
                <div className="form_group">
                  <label htmlFor="email">
                    UserName{" "}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your UserName.."
                    name="userName"
                    id="userName"
                    value={formik.values.userName}
                    // onChange={(e) => setEmail(e.target.value)}
                    {...formik.getFieldProps("userName")}
                  />
                  <div className="icon">
                    <i className="bx bxs-envelope"></i>
                  </div>
                </div>
                {/* Password`` */}
                <div className="form_group">
                  <label htmlFor="OTP">
                    OTP{" "}
                    <span>
                      <sup>(4-digit Code)*</sup>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="4-digit OTP"
                    name="OTP"
                    id="OTP"
                    value={formik.values.OTP}
                    // onChange={(e) => setPassword(e.target.value)}
                    {...formik.getFieldProps("OTP")}
                  />
                  <div className="time_box">
                    <h4>
                      {Seconds} <small>seconds more!</small>
                    </h4>
                  </div>
                  <div className="icon">
                    <i className="bx bxs-lock"></i>
                  </div>
                </div>

                {/* <div className="forgot_password">
                  <Link to="/forgot_password">
                    <small>Forgot Password ?</small>
                  </Link>
                </div> */}
                <div className="form_submit">
                  <button type="submit">
                    {loginLoader ? (
                      <div className="loader"></div>
                    ) : (
                      <>
                        Verify OTP
                        <div className="rocket">
                          <i className="bx bx-log-in bx-flashing"></i>
                        </div>
                      </>
                    )}
                  </button>
                </div>

                <div className="admin_actions">
                  {/* <Link to="/sadmin/dashboard">
                    <button>
                      Super Admin Login
                      <i className="bx bx-log-in-circle bx-flashing"></i>
                    </button>
                  </Link> */}
                  {/* <Link onClick={()=>{formik.values.email='aristostech@gmail.com',formik.values.password='123456'}}>
                    <button>
                      User Login{" "}
                      <i className="bx bx-log-in-circle bx-flashing"></i>
                    </button>
                  </Link> */}
                </div>
                <div className="or">
                  <p>or Continue</p>
                </div>
              </form>

              <div className="signup_link">
                <p>
                  Verify Account Expires ?{" "}
                  <Link to="/resend_OTP">Resend OTP</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
