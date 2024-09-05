import React, { useContext, useState } from "react";
import "./ForgotPassword.scss";
import image from "../../../assets/SVG/Forgot/forgot_svg2.png";
import site_logo from "../../../assets/Authentication_image/BrandLogo.png";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import Context from "../../UseContext/Context";

const ForgotPassword = () => {
  let navigate = useNavigate();
  let {id,token}=useParams();
  let [loginLoader, setLoginLoader] = useState(false);
  let [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  // let navigate = useNavigate();
  let {
    userName,
    show,
    setShow,

    setEmail,
    AuthToggle,
    setAuthToggle,
  } = useContext(Context);
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
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

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (values) => {
      setLoginLoader(true);
      await api
        .post("/auth/forgot_password", values)
        .then((res) => {
       
          toast.success(res.data.message);
          setEmail('')
          setResetPasswordOpen(true)
          navigate(res.data.data);
          setLoginLoader(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
  });
  let resetformik = useFormik({
    initialValues: {
      password: ""
    },
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (values) => {
      setLoginLoader(true);

      await api
        .post(`/auth/reset_password/${id}/${token}`, values)
        .then((res) => {
          toast.success(res.data.message);
          setLoginLoader(false)
          setTimeout(() => {
            setAuthToggle(true)
            navigate(`/register`);
          }, 2000);
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data.message);
          setLoginLoader(false)
        });
    },
  });
  return (
    <>
      <div className="forgot_container">

     {/* Home page button */}

     <div className="home_page">
          <Link to="/">
            <i className="bx bxs-home"></i>Home
          </Link>
        </div>
        <div className="right">
          <img src={image} alt="" />
        </div>
        {!resetPasswordOpen ? (
          <div className="left">
            <div className="box_container">
              <div className="site_logo">
                <img src={site_logo} alt="logo" />
              </div>
              <div className="right_form">
                <div className="form_title">
                  <h4>Enter Your Email Address!</h4>
                  {/* <p>Please enter login details below</p> */}
                </div>

                <form action="" onSubmit={formik.handleSubmit}>
                  {/* Email`` */}
                  <div className="form_group">
                    <label htmlFor="email">
                      Email{" "}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Eg : abc@gmail.com"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      // onChange={(e) => setEmail(e.target.value)}
                      {...formik.getFieldProps("email")}
                    />
                    <div className="icon">
                      <i className="bx bxs-envelope"></i>
                    </div>
                  </div>

                  <div className="form_submit">
                    <button type="submit">
                      {loginLoader ? (
                        <div className="loader"></div>
                      ) : (
                        <>
                          Send
                          <div className="rocket">
                            <i className="bx bx-log-in bx-flashing"></i>
                          </div>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="or">
                    <p>or Continue</p>
                  </div>
                </form>

                <div className="signup_link">
                  <p>
                    Cancel reset Password ? <Link to="/login">Exit</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="left">
          <div className="box_container">
            <div className="site_logo">
              <img src={site_logo} alt="logo" />
            </div>
            <div className="right_form">
              <div className="form_title">
                <h4>Reset Your Password!</h4>
                {/* <p>Please enter login details below</p> */}
              </div>

              <form action="" onSubmit={resetformik.handleSubmit}>
                  {/* Password`` */}
                  <div className="form_group">
                  <label htmlFor="password">
                    New Password{" "}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Strong Password"
                    name="password"
                    id="password"
                    {...resetformik.getFieldProps("password")}
                  />
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
                          <i className="bx bx-log-in bx-flashing"></i>
                        </div>
                      </>
                    )}
                  </button>
                </div>

                
                <div className="or">
                  <p>or Continue</p>
                </div>
              </form>

              <div className="signup_link">
                <p>
                  Cancel reset Password ? <Link to="/register">Exit</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
