import React, { useContext, useState, useEffect } from "react";
import "./styles/Users.scss";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaEdit, FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineDotsVertical, HiOutlineMail } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Lottie from "react-lottie";
import { Link, useNavigate, useParams } from "react-router-dom";
import partnershipAnime from "../../../assets/Lotte_Animation/Register_Form.json";
import { useFormik } from "formik";
import {
  ResellerClientRegisterValidateSchema,
  Reseller_Client_Login_ValidateSchema,
} from "../../Helper/RegisterValidate";

import { WiStars } from "react-icons/wi";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import ResellerOTP from "../VerifyOTP/ResellerOTP";
import { MdDelete } from "react-icons/md";
const Users = () => {
  let navigate = useNavigate();

  let {
    User,
    setUser,
    UserName,
    setUserName,
    setFormSubmitLoader,
    ResellerUserName,
  } = useContext(AppContext);

  let [RegisterFormToggle, setRegisterFormToggle] = useState(false);
  let [LoginFormToggle, setLoginFormToggle] = useState(false);
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  const [preview, setPreview] = useState("");
  let [show, setShow] = useState();
  let [registerLoader, setRegisterLoader] = useState(false);
  let [Profile, setProfile] = useState(null);
  let [OpenTermsCondition, setOpenTermsCondition] = useState(false);
  let [OpenPrivacyCondition, setOpenPrivacyCondition] = useState(false);
  let [VerifyOTP_popup, setVerifyOTP_popup] = useState(false);
  let [AllClients, setAllClients] = useState([]);
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  // Handle file selection
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    setPreview(URL.createObjectURL(file)); // Show a preview of the image
  };
  //Password Show hide :
  let handleShow = () => {
    let Password = document.getElementById("Password");
    setShow(!show);
    {
      !show
        ? Password.setAttribute("type", "text")
        : Password.setAttribute("type", "Password");
    }
  };
  const PartnershipAnimeoptions = {
    loop: true,
    autoplay: true,
    animationData: partnershipAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // Register Formik
  let Reseller_formik = useFormik({
    initialValues: {
      Reseller: true,
      // ResellerName: ResellerUserName,
      UserName: "",
      FullName: "",
      MobileNumber: "",
      Email: "",
      Password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ResellerClientRegisterValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);
      const formData = new FormData();
      formData.append("Reseller", values.Reseller);
      // formData.append("ResellerName", values.ResellerName);
      formData.append("UserName", values.UserName);
      formData.append("FullName", values.FullName);
      formData.append("MobileNumber", values.MobileNumber);
      formData.append("Email", values.Email);
      formData.append("Password", values.Password);
      await api
        .post("/api/auth/resellerClient/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setRegisterLoader(false);
          toast.success(res.data.message);
          Reseller_formik.values.Password = "";
          setRegisterFormToggle(false);
          localStorage.setItem(
            "UserName",
            JSON.stringify(res.data.newUser?.UserName)
          );
          setTimeout(() => {
            setVerifyOTP_popup(true);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setRegisterFormToggle(false);
          toast.error(error.response.data.message);
          setVerifyOTP_popup(false);
          setRegisterLoader(false);
        });
    },
  });
  //Login Formik
  let Login_formik = useFormik({
    initialValues: {
      UserName: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Reseller_Client_Login_ValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);

      await api
        .post("/api/auth/resellerClient/reseller_login", values)
        .then((res) => {
          toast.success(res.data.message);
          setRegisterLoader(false);
          const datas = JSON.stringify({
            UserName: res?.data?.UserName,
            token: res?.data?.token,
            id: res?.data?.id,
            FullName: res?.data?.FullName,
          });
          localStorage.setItem("datas", datas);

          let userData = JSON.parse(localStorage.getItem("datas"));

          let navigationTimeout = setTimeout(() => {
            setUser(userData);
            // handleSpeak(userData.userName);
            navigate(`/${res?.data?.UserName}/uadmin/VCards`);
          }, 2000);
          return () => {
            clearTimeout(navigationTimeout);
          };
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setRegisterLoader(false);
        });
    },
  });
  useEffect(() => {
    setFormSubmitLoader(true);
    api
      .get(`/api/auth/resellerClient/alluser/${ResellerUserName}`)
      .then((res) => {
        console.log(res.data.user);
        setAllClients(res.data.user);
        setFormSubmitLoader(false);
      })
      .catch((error) => {
        setFormSubmitLoader(false);
      });
  }, [key]);
  return (
    <>
      <div className="users_container">
        {RegisterFormToggle ? (
          <>
            <div
              className="register_form"
              id={RegisterFormToggle || LoginFormToggle ? "hide" : "show"}
            >
              <div className="register_box_container">
                <div className="left_side">
                  <div className="title">
                    <h4>Welcome to Digital VCard Application</h4>
                    <small>
                      Register to create your New account to become our client
                      to increase your sales and customer.{" "}
                    </small>
                  </div>
                  <div className="right_image">
                    <Lottie
                      options={PartnershipAnimeoptions}
                      height={"50%"}
                      width={"70%"}
                      className="lottie"
                    />
                  </div>
                </div>

                <div className="right_side">
                  <div
                    className="close"
                    onClick={() => setRegisterFormToggle(false)}
                  >
                    <i className="bx bx-x"></i>
                  </div>
                  <form onSubmit={Reseller_formik.handleSubmit}>
                    <div className="form_title">
                      <h4>
                        Create New User
                        <WiStars />
                      </h4>
                    </div>
                    {/* <div className="Profile">
                      <label htmlFor="Profile">
                        <img
                          src={
                            preview ||
                            "https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                          }
                          alt="avatar"
                          id="profile_image"
                        />
                        <i className="bx bx-chevrons-left bx-fade-right"></i>
                        <span>Upload your profile logo</span>
                      </label>
                      <input
                        type="file"
                        id="Profile"
                        name="Profile"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        // {...Reseller_formik.getFieldProps('Profile')}
                      />
                    </div> */}
                    {/* //Reseller Name: */}
                    {/* <div className="form_group">
                      <label htmlFor="Reseller">
                        Reseller Name{" "}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Reseller Name "
                        name="ResellerName"
                        id="ResellerName"
                        value={Reseller_formik.values.ResellerName}
                        onBlur={Reseller_formik.handleBlur}
                        onChange={Reseller_formik.handleChange}
                        className={
                          Reseller_formik.errors.ResellerName &&
                          Reseller_formik.touched.ResellerName
                            ? "input_error"
                            : ""
                        }
                      />
                      <div className="error">
                        {Reseller_formik.errors.ResellerName}
                      </div>
                      <div className="icon">
                        <i className="bx bx-user-pin"></i>
                      </div>
                    </div> */}
                    {/* //UserName: */}
                    <div className="form_group">
                      <label htmlFor="UserName">
                        Client UserName{" "}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Unique UserName "
                        name="UserName"
                        id="UserName"
                        value={Reseller_formik.values.UserName}
                        onBlur={Reseller_formik.handleBlur}
                        onChange={Reseller_formik.handleChange}
                        className={
                          Reseller_formik.errors.UserName &&
                          Reseller_formik.touched.UserName
                            ? "input_error"
                            : ""
                        }
                        // {...Reseller_formik.getFieldProps("UserName")}
                      />
                      <div className="error">
                        {Reseller_formik.errors.UserName}
                      </div>
                      <div className="icon">
                        <FaRegUserCircle />
                      </div>
                    </div>
                    {/* //First Name */}
                    <div className="form_group">
                      <label htmlFor="FullName">
                        FullName{" "}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your FullName "
                        name="FullName"
                        id="FullName"
                        value={Reseller_formik.values.FullName}
                        onBlur={Reseller_formik.handleBlur}
                        onChange={Reseller_formik.handleChange}
                        className={
                          Reseller_formik.errors.FullName &&
                          Reseller_formik.touched.FullName
                            ? "input_error"
                            : ""
                        }
                        // {...Reseller_formik.getFieldProps("FullName")}
                      />
                      <div className="error">
                        {Reseller_formik.errors.FullName}
                      </div>
                      <div className="icon">
                        <FaRegUser />
                      </div>
                    </div>

                    {/* Email`` */}
                    <div className="form_group">
                      <label htmlFor="Email">
                        Email{" "}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="Email"
                        placeholder="Eg : demo@gmail.com"
                        name="Email"
                        id="Email"
                        value={Reseller_formik.values.Email}
                        onBlur={Reseller_formik.handleBlur}
                        onChange={Reseller_formik.handleChange}
                        className={
                          Reseller_formik.errors.Email &&
                          Reseller_formik.touched.Email
                            ? "input_error"
                            : ""
                        }
                        // {...Reseller_formik.getFieldProps("Email")}
                      />
                      <div className="error">
                        {Reseller_formik.errors.Email}
                      </div>
                      <div className="icon">
                        <HiOutlineMail />
                      </div>
                    </div>
                    {/* MobileNumber`` */}
                    <div className="form_group">
                      <label htmlFor="MobileNumber">
                        Mobile Number{" "}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter your MobileNumber"
                        name="MobileNumber"
                        id="MobileNumber"
                        value={Reseller_formik.values.MobileNumber}
                        onBlur={Reseller_formik.handleBlur}
                        onChange={Reseller_formik.handleChange}
                        className={
                          Reseller_formik.errors.MobileNumber &&
                          Reseller_formik.touched.MobileNumber
                            ? "input_error"
                            : ""
                        }
                      />
                      <div className="error">
                        {Reseller_formik.errors.MobileNumber}
                      </div>
                      <div className="icon">
                        <CiMobile3 />
                      </div>
                    </div>
                    {/* Password`` */}
                    <div className="form_group">
                      <label htmlFor="Password">
                        Password{" "}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="Password"
                        placeholder="Password"
                        name="Password"
                        id="Password"
                        value={Reseller_formik.values.Password}
                        onBlur={Reseller_formik.handleBlur}
                        onChange={Reseller_formik.handleChange}
                        className={
                          Reseller_formik.errors.Password &&
                          Reseller_formik.touched.Password
                            ? "input_error"
                            : ""
                        }
                        // {...Reseller_formik.getFieldProps("Password")}
                      />
                      <div className="error">
                        {Reseller_formik.errors.Password}
                      </div>
                      <div className="icon">
                        <RiLockPasswordLine />
                      </div>

                      <div className="show_pass" onClick={handleShow}>
                        {!show ? <FaRegEyeSlash /> : <FaRegEye />}
                      </div>
                      {/* <div className="strength_indicator">
                
                    {Reseller_formik.errors.Password && Reseller_formik.touched.Password ? (
                      ''
                    ) : (
                      <span>Secure Password</span>
                    )}
                  </div> */}
                    </div>
                    {/* <div className="aggrement">
                      <div className="form_group_checkbox">
                        <input
                          type="checkbox"
                          name="Terms"
                          // onClick={() => set("Terms", true)}
                          id="Terms"
                          onChange={Reseller_formik.handleChange}
                          value={Reseller_formik.values.Terms}
                          onBlur={Reseller_formik.handleBlur}
                          className={
                            Reseller_formik.errors.Terms &&
                            Reseller_formik.touched.Terms
                              ? "input_error"
                              : ""
                          }
                        />
                        <label htmlFor="Terms">
                          By signing up to create an account I accept Company's{" "}
                          <Link onClick={() => setOpenTermsCondition(true)}>
                            Terms of Use
                          </Link>{" "}
                          and{" "}
                          <Link onClick={() => setOpenPrivacyCondition(true)}>
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      <div className="error">
                        {Reseller_formik.errors.Terms}
                      </div>
                    </div> */}

                    <div className="form_submit">
                      <button type="submit">
                        Register
                        <div className="icon">
                          {registerLoader ? (
                            <div className="loader"></div>
                          ) : (
                            <FaArrowRight />
                          )}
                        </div>
                      </button>
                    </div>
                    {/* <div className="or">
                      <Link to="/login">
                        Already u have been membership? <span>Login</span>
                      </Link>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {LoginFormToggle ? (
          <>
            <div
              className="login_form"
              id={RegisterFormToggle || LoginFormToggle ? "hide" : "show"}
            >
              <div className="login_box_container">
                <div className="left_side">
                  <div className="title">
                    <h4>Welcome Back to Digital VCard Application</h4>
                    <small>Let's Continue your client brand building!</small>
                  </div>
                  <div className="right_image">
                    <Lottie
                      options={PartnershipAnimeoptions}
                      height={"50%"}
                      width={"70%"}
                      className="lottie"
                    />
                  </div>
                </div>

                <div className="right_side">
                  <div
                    className="close"
                    onClick={() => setLoginFormToggle(false)}
                  >
                    <i className="bx bx-x"></i>
                  </div>
                  <form onSubmit={Login_formik.handleSubmit}>
                    <div className="form_title">
                      <h4>
                        User Login
                        <WiStars />
                      </h4>
                    </div>
                    {/* //UserName: */}
                    <div className="form_group">
                      <label htmlFor="UserName">
                        Client UserName{" "}
                        <span>
                          <sup>*</sup>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Unique UserName "
                        name="UserName"
                        id="UserName"
                        value={Login_formik.values.UserName}
                        onBlur={Login_formik.handleBlur}
                        onChange={Login_formik.handleChange}
                        className={
                          Login_formik.errors.UserName &&
                          Login_formik.touched.UserName
                            ? "input_error"
                            : ""
                        }
                      />
                      <div className="error">
                        {Login_formik.errors.UserName}
                      </div>
                      <div className="icon">
                        <FaRegUserCircle />
                      </div>
                    </div>

                    <div className="form_submit">
                      <button type="submit">
                        Login
                        <div className="icon">
                          {registerLoader ? (
                            <div className="loader"></div>
                          ) : (
                            <FaArrowRight />
                          )}
                        </div>
                      </button>
                    </div>
                    <div className="or">
                      <Link
                        onClick={() => {
                          setVerifyOTP_popup(true), setLoginFormToggle(false);
                        }}
                      >
                        Verify Your Account? <span>Click</span>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {/* //verifyOTP */}
        {VerifyOTP_popup ? (
          <div className="verify_OTP">
            <ResellerOTP
              VerifyOTP_popup={VerifyOTP_popup}
              setVerifyOTP_popup={setVerifyOTP_popup}
              RegisterFormToggle={RegisterFormToggle}
              setRegisterFormToggle={setRegisterFormToggle}
            />
          </div>
        ) : (
          ""
        )}
        <div className="users_header">
          <h2>All Users</h2>
        </div>
        <div className="add_new_user">
          <button onClick={() => setRegisterFormToggle(true)}>
            Enroll New User<i className="bx bx-plus"></i>
          </button>
        </div>
        {/* Card Box */}
        <div className="row_2">
          <div className="card_box">
            <div className="card_title_box">
              <div className="title">
                <h4>PROFILE</h4>
              </div>
              <div className="title">
                <h4>USERNAME</h4>
              </div>
              <div className="title">
                <h4>E-MAIL</h4>
              </div>
              <div className="title">
                <h4>MOBILENUMBER</h4>
              </div>
              <div className="title">
                <h4>IS-VERIFIED</h4>
              </div>
              <div className="title">
                <h4>ACTIONS</h4>
              </div>
            </div>
            {AllClients.length > 0 ? (
              <>
                {AllClients.map((data, index) => {
                  return (
                    <div className="card_detail_box" key={index}>
                      <div className="detail">
                        {data.Profile ? (
                          <img
                            src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                              data.Profile
                            }`}
                            alt="profile"
                          />
                        ) : (
                          <img
                            src="https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                            alt="profile"
                          />
                        )}
                      </div>
                      <div className="detail">
                        <p>
                          {data.UserName.split("")[0].toUpperCase() +
                            data.UserName.slice(1, 40)}
                        </p>
                      </div>
                      <div className="detail">{data.Email}</div>
                      <div className="detail">+91 - {data.MobileNumber}</div>
                      <div className="detail">
                        {data.isVerified == true ? (
                          <i class="bx bxs-toggle-right on"></i>
                        ) : (
                          <i class="bx bxs-toggle-left off"></i>
                        )}
                      </div>
                      <div className="detail_actions">
                        <div className="login">
                          <button onClick={() => setLoginFormToggle(true)}>
                            <span>Login</span>
                            <i className="bx bx-log-in"></i>
                          </button>
                        </div>
                        <div
                          className="delete"
                          onClick={() => {
                            // setVcardDeleteToggle(true);
                          }}
                        >
                          <div className="icon">
                            <i className="bx bxs-trash"></i>
                          </div>

                          <small>Delete</small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="card_detail_box_empty">
                <small>Empty Users!</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
