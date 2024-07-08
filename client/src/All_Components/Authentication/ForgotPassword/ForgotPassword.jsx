import React, { useContext, useState } from "react";
import "./ForgotPassword.scss";
// import image from "../../assets/5.png";
import site_logo from "../../../assets/Authentication_image/BrandLogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../UseContext/Context";

const ForgotPassword = () => {
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
      await axios
        .post("http://localhost:3001/auth/forgot_password", values)
        .then((res) => {
          toast.success(res.data.message);
          setLoginLoader(false);
      
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
  });

  return (
    <>
      <div className="login_container">
        <Toaster position="top-right"></Toaster>

        <div className="right">
          <img src={image} alt="" />
        </div>
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
      </div>
    </>
  );
};

export default ForgotPassword;
