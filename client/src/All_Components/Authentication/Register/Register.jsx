import React, { useContext, useState } from "react";
import "./Register.scss";
import register_svg from '../../../assets/Authentication_image/register_image2.jpg'
import site_logo from "../../../assets/Authentication_image/BrandLogo.png";
import { Link, useNavigate,useParams } from "react-router-dom";
import Context from "../../UseContext/Context";
import axios, { all } from "axios";
import { convertToBase64 } from "../../Helper/convert";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { RegisterValidate } from "../../Helper/RegisterValidate";

const Register = () => {
  
  let [registerLoader, setRegisterLoader] = useState(false);
  let navigate = useNavigate();
//  const baseURL =  import.meta.env.REACT_APP_API_URL

//   const api = axios.create({
//       baseURL
//   })
  
  //All state data:
  let {
    show,
    setShow,
    profile,
    setProfile,
    userName,
    setUserName,
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
    location,
    setLocation,
  } = useContext(Context);
  const apiUrl = import.meta.env.REACT_APP_API_URL;
  let formik = useFormik({
    initialValues: {
      profile: "",
      userName: "",
      firstName: "",
      lastName: "",
      email: "",

      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: RegisterValidate,
    onSubmit: async (values) => {
      setRegisterLoader(true);
      await
        axios.post(`${apiUrl}/auth/register`, values)
        .then((response) => {
          toast.success(response.data.message);
          setRegisterLoader(false);
          setTimeout(() => {
            toast.success(response.data.emailMessage);
          }, 1500);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setRegisterLoader(false);
        });
    },
  });
  //Image convert to base 64 :
  const onUpload = async (e) => {
    let base64 = await convertToBase64(e.target.files[0]);
    setProfile(base64);
  };

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

  return (
    <>
      <div className="register_container">
        <Toaster position="top-right" reverseOrder={false}></Toaster>
        <div className="left">
          <img src={register_svg} alt="" />
        </div>
        <div className="right">
          <div className="box_container">
            <div className="site_logo">
              <img src={site_logo} alt="logo" />
            </div>
            <div className="right_form">
              <div className="form_title">
                <h4>Welcome to AristosTech Digital Card Creator!</h4>
                <p>Create your new Account</p>
              </div>
              <div className="illustration">
                {/* <img src={illustration} alt="illustration" /> */}
              </div>

              <form action="" onSubmit={formik.handleSubmit}>
                <div className="profile">
                  <label htmlFor="profile">
                    <img
                      src={
                        profile ||
                        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?t=st=1716289609~exp=1716293209~hmac=85426a92bcf5a66127c8aefaed7dbe191cbc90501ed2d55359a618b4d6fa08d4&w=740"
                      }
                      alt="avatar"
                      id="profile_image"
                    />
                    <i className="bx bxs-chevrons-left bx-flashing"></i>
                    <span>Upload your profile</span>
                  </label>
                  <input
                    onChange={onUpload}
                    type="file"
                    id="profile"
                    name="profile"
                    // {...formik.getFieldProps('profile')}
                  />
                </div>
                {/* //UserName: */}
                <div className="form_group">
                  <label htmlFor="userName">
                    UserName{" "}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Unique UserName "
                    name="userName"
                    id="userName"
                    {...formik.getFieldProps("userName")}
                  />
                  <div className="icon">
                    <i className="bx bxs-user"></i>
                  </div>
                </div>
                {/* //First Name */}
                <div className="form_group">
                  <label htmlFor="firstName">
                    FirstName{" "}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: Jayakumar "
                    name="firstName"
                    id="firstName"
                    {...formik.getFieldProps("firstName")}
                  />
                  <div className="icon">
                    <i className="bx bxs-user"></i>
                  </div>
                </div>
                {/* //Last Name */}
                <div className="form_group">
                  <label htmlFor="lastName">
                    LastName{" "}
                    <span>
                      <sup>*</sup>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Eg : Kumar or K"
                    name="lastName"
                    id="lastName"
                    {...formik.getFieldProps("lastName")}
                  />
                  <div className="icon">
                    <i className="bx bxs-user-pin"></i>
                  </div>
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
                    type="email"
                    placeholder="Eg : abc@gmail.com"
                    name="email"
                    id="email"
                    {...formik.getFieldProps("email")}
                  />
                  <div className="icon">
                    <i className="bx bxs-envelope"></i>
                  </div>
                </div>
                {/* MobileNumber`` */}
                {/* <div className="form_group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Eg : +91 6576579679"
                    name="mobileNumber"
                    id="mobileNumber"
                    {...formik.getFieldProps("mobileNumber")}
                  />
                  <div className="icon">
                    <i className="bx bx-mobile"></i>
                  </div>
                </div> */}
                {/* Password`` */}
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
                    {registerLoader ? (
                      <div className="loader"></div>
                    ) : (
                      <>
                        Register
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
                  Already have an Account ? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
