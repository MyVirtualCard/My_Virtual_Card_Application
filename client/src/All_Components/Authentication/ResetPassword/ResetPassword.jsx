import React, { useContext, useState } from "react";
import "./ResetPassword.scss";
// import image from "../../assets/5.png";
import site_logo from "../../../assets/Authentication_image/BrandLogo.png";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../UseContext/Context";

const ResetPassword = () => {
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

  let {id,token}=useParams();

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
      password: ""
    },
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (values) => {
      setLoginLoader(true);

      await axios
        .post(`http://localhost:3001/auth/reset_password/${id}/${token}`, values)
        .then((res) => {
          toast.success(res.data.message);
          setLoginLoader(false)
          setTimeout(() => {
            navigate(`/login`);
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
                <h4>Reset Your Password!</h4>
                {/* <p>Please enter login details below</p> */}
              </div>

              <form action="" onSubmit={formik.handleSubmit}>
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
                    {...formik.getFieldProps("password")}
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

export default ResetPassword;
