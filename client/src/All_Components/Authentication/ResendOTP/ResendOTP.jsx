import React, { useContext, useState, useEffect } from "react";
import "./ResendOTP.scss";
import login_svg from "../../../assets/SVG/ResendOTP/resend.jpg";
import site_logo from "../../../assets/Authentication_image/BrandLogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../UseContext/Context";
const ResendOTP = () => {
  let [loginLoader, setLoginLoader] = useState(false);
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
      email: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoginLoader(true);

      await api
        .post('/auth/resend_OTP', values)
        .then((res) => {
          toast.success(res.data.message);
          setLoginLoader(false);
          setTimeout(() => {
            navigate(`/verify_OTP`);
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
      <div className="resend_container">
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
              <h4>Re-Verify Your Email!</h4>
              <p>FillUp Your Registered Account Detail!</p>
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
                  <label htmlFor="email">
                    Email{" "}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Registerd Email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    // onChange={(e) => setPassword(e.target.value)}
                    {...formik.getFieldProps("email")}
                  />
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
                        Resend OTP
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
                Don't have an account ? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResendOTP;
