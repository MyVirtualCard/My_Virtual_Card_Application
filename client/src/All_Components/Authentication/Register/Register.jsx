import React, { useContext, useState, useEffect } from "react";
import "./Register.scss";
import resend_otp_img from "../../../assets/Authentication_image/resend_otp_img.png";
import backImage from "../../../assets/LandingPage_image/slide1_back.png";
import message_icon from "../../../assets/icons/message_hand.png";
import brand_logo from "../../../assets/LandingPage_image/BrandLogo4.png";
import card1 from "../../../assets/Digicards/vmob-1.png";
import card2 from "../../../assets/Digicards/vmob-2.png";
import card3 from "../../../assets/Digicards/vmob-3.png";
import card4 from "../../../assets/Digicards/vmob-4.png";
import card5 from "../../../assets/Digicards/vmob-5.png";
import card6 from "../../../assets/Digicards/vmob-6.png";
import card7 from "../../../assets/Digicards/vmob-7.png";

import arrow from "../../../assets/SVG/Register/arrow.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Context from "../../UseContext/Context";
import axios, { all } from "axios";
import { convertToBase64Profile } from "../../Helper/convert";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import {
  LoginValidateSchema,
  RegisterValidateSchema,
} from "../../Helper/RegisterValidate.js";
import { ForgotEmailValidateSchema } from "../../Helper/ForgetPassValidate.js";
import { ResetPassValidateSchema } from "../../Helper/ResetPassValidation.js";
import ReCAPTCHA from "react-google-recaptcha";
const Register = () => {
  //All state data:
  let {
    OTP_Value,
    setOTP_Value,
    show,
    setShow,
    profile,
    setProfile,
    AuthToggle,
    setAuthToggle,
    ForgotPassToggle,
    setForgotPassToggle,
    ResetPassToggle,
    setResetPassToggle,
    VerifyOTPToggle,
    setVerifyOTPToggle,
    ResendOTPToggle,
    setResendOTPToggle,
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
  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);
  let [loginLoader, setLoginLoader] = useState(false);

  let [OpenTermsCondition, setOpenTermsCondition] = useState(false);
  let [OpenPrivacyCondition, setOpenPrivacyCondition] = useState(false);
  let [capchaValue, setCapchaValue] = useState(null);

  let [ResetPassToken_Id, setResetPassToken_Id] = useState("");
  let resetPassId = ResetPassToken_Id.split("/")[0];
  let resetPassToken = ResetPassToken_Id.split("/")[1];
  let images = [
    {
      id: 1,
      image: card1,
    },
    {
      id: 2,
      image: card2,
    },
    {
      id: 3,
      image: card3,
    },
    {
      id: 4,
      image: card4,
    },
    {
      id: 5,
      image: card5,
    },
    {
      id: 6,
      image: card6,
    },
    {
      id: 7,
      image: card7,
    },
  ];
  let navigate = useNavigate();

  let [Seconds, setSeconds] = useState("60");
  let [OTP_Popup, setOTP_Popup] = useState(false);

  useEffect(() => {

    if (Seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(Seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [Seconds]);
  const handleProfileImageChange = (event) => {
    const ProfileImage = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(ProfileImage);
    reader.onload = () => {
      formik.setFieldValue("profile", reader.result);
      setProfile(reader.result);
    };
  };

  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const handleSpeak = (userData) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Welcome ${userData.firstName} now u proceed to develop your brand..`
      );
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text to speech!");
    }
  };

  function onChange(value) {
    setCapchaValue(value);
  }
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  // Register Formik
  let formik = useFormik({
    initialValues: {
      profile: "",
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
    // validateOnBlur: false,
    // validateOnChange: false,
    validationSchema: RegisterValidateSchema,
    onSubmit: async (values, action) => {
      setRegisterLoader(true);

      await api
        .post("/auth/register", values)
        .then((response) => {
          setOTP_Value(response.data.OTP);
          toast.success(response.data.message);
          setRegisterLoader(false);
          formik.values.password = "";
          setTimeout(() => {
            setVerifyOTPToggle(true);
          }, 2000);
    
          const datas = JSON.stringify({
            userName: response?.data?.userName,
            token: response?.data?.token,
            id: response?.data?.id,
            firstName: response?.data?.name,
          });
          localStorage.setItem("datas", datas);

          // setTimeout(() => {
          //   setAuthToggle(true);
          //   action.resetForm();
          //   // navigate("/verify_OTP");
          // }, 1500);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setRegisterLoader(false);
        });
    },
  });
  //Login Formik
  let Login_formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      capchaValue: null,
    },
    // validateOnChange: false,
    // validateOnBlur: false,
    validationSchema: LoginValidateSchema,
    onSubmit: async (values) => {
      setLoginLoader(true);

      await api
        .post("/auth/login", values)
        .then((res) => {
          toast.success(res.data.message);
          setLoginLoader(false);
          const datas = JSON.stringify({
            userName: res?.data?.userName,
            token: res?.data?.token,
            id: res?.data?.id,
            firstName: res?.data?.name,
          });
          localStorage.setItem("datas", datas);

          let userData = JSON.parse(localStorage.getItem("datas"));

          setTimeout(() => {
            handleSpeak(userData);
            navigate(`/${userData.userName}/uadmin/user_vcard`);
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
  });
  //ForgotPass Formik
  let Forgot_formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ForgotEmailValidateSchema,
    onSubmit: async (values) => {
      setLoginLoader(true);
      await api
        .post("/auth/forgot_password", values)
        .then((res) => {
          setResetPassToken_Id(res.data.data);
          toast.success(res.data.message);
          setEmail("");
          setResetPassToggle(true);
          setForgotPassToggle(true);
          setLoginLoader(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
  });
  //Reset Password Formik
  let resetformik = useFormik({
    initialValues: {
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ResetPassValidateSchema,
    onSubmit: async (values) => {
      setLoginLoader(true);

      await api
        .post(`/auth/reset_password/${resetPassId}/${resetPassToken}`, values)
        .then((res) => {
          toast.success(res.data.message);
          setLoginLoader(false);
          setTimeout(() => {
            setAuthToggle(true);
            navigate(`/register`);
            setForgotPassToggle(false);
            setResetPassToggle(false);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
  });

  //Verify OTP Formik
  let verifyOTP_formik = useFormik({
    initialValues: {
      userName: localStorageDatas?.userName,
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
          let userData = JSON.parse(localStorage.getItem("datas"));
          setTimeout(() => {
            setVerifyOTPToggle(false);
            handleSpeak(userData);
            navigate(`/${userData.userName}/uadmin/user_vcard`);
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
  });
  let resendOTP_formik = useFormik({
    initialValues: {
      userName: localStorageDatas?.userName,
      email: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoginLoader(true);

      await api
        .post("/auth/resend_OTP", values)
        .then((res) => {
          setOTP_Value(res.data.OTP);
          toast.success(res.data.message);
          setLoginLoader(false);
          setTimeout(() => {
            setVerifyOTPToggle(true);
            setResendOTPToggle(false);
          }, 1500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
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
  //Password Show hide :
  let handleShow_OTP = () => {
    let password = document.getElementById("OTP");
    setShow(!show);
    {
      !show
        ? password.setAttribute("type", "text")
        : password.setAttribute("type", "password");
    }
  };
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
        className="register_container"
        id={AuthToggle ? "login_back" : "register_back"}
      >
        {/* OTP Popup */}
        {OTP_Popup ? (
          <div className="otp_container">
            <div className="otp_popup">
              <div className="close" onClick={() => setOTP_Popup(false)}>
                <i className="bx bxs-message-x"></i>
              </div>
              <div className="otp_title">
                <h3>OTP</h3>
              </div>
              <div className="otp_value">{OTP_Value}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* //OTP_Verification Popup Form */}

        <div
          className="otp_form_container"
          id={VerifyOTPToggle ? "otp_form_open" : "otp_form_close"}
        >
          <div className="otp_form_box">
            <div
              className="close_otp_box"
              onClick={() => setVerifyOTPToggle(false)}
            >
              <i className="bx bx-x"></i>
            </div>
            {/* Left */}

            {!ResendOTPToggle ? (
              <>
                <form action="" onSubmit={verifyOTP_formik.handleSubmit}>
                  <div className="form_title">
                    <h4>Complete Your Two-Factor-Authentication</h4>
                    <small>Verify Your Account!</small>
                  </div>
                  <div className="form_group">
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
                      value={verifyOTP_formik.values.userName}
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
                  </div>
                  <div className="form_group">
                    <label htmlFor="password">
                      OTP{" "}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter 4-Digit OTP"
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
                      // {...formik.getFieldProps("password")}
                    />
                    <div className="time_box">
                      <h4>
                        {Seconds} <small>sec more!</small>
                      </h4>
                    </div>
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
                  <div className="form_submit">
                    <button type="submit">
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
                  <div className="or">
                    <p>
                      Verify Account Expires ?{" "}
                      <Link onClick={() => setResendOTPToggle(true)}>
                        Resend OTP
                      </Link>
                    </p>
                    <p>
                      Not Allow Authentication ?{" "}
                      <Link
                        to={`/${localStorageDatas?.userName}/uadmin/user_vcard`}
                      >
                        ReDirect to Dashboad
                      </Link>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <form action="" onSubmit={resendOTP_formik.handleSubmit}>
                  <div className="form_title">
                    <h4>Activate Two-Factor-Authentication</h4>
                    <small>Resend OTP On Your Account!</small>
                  </div>
                  <div className="form_group">
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
                      value={resendOTP_formik.values.userName}
                      onBlur={resendOTP_formik.handleBlur}
                      onChange={resendOTP_formik.handleChange}
                      className={
                        resendOTP_formik.errors.userName &&
                        resendOTP_formik.touched.userName
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("password")}
                    />

                    <div className="error">
                      {resendOTP_formik.errors.userName}
                    </div>
                    <div className="icon">
                      <i className="bx bxs-user-check"></i>
                    </div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="password">
                      Email{" "}
                      <span>
                        <sup>*</sup>
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      name="email"
                      id="email"
                      value={resendOTP_formik.values.email}
                      onBlur={resendOTP_formik.handleBlur}
                      onChange={resendOTP_formik.handleChange}
                      className={
                        resendOTP_formik.errors.email &&
                        resendOTP_formik.touched.email
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("password")}
                    />

                    <div className="error">{resendOTP_formik.errors.email}</div>
                    <div className="icon">
                      <i className="bx bxs-envelope"></i>
                    </div>
                  </div>
                  <div className="form_submit">
                    <button type="submit">
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
                  <div className="or">
                    <p>
                      Not Allow Authentication ?{" "}
                      <Link
                        onClick={() => {
                          setResendOTPToggle(false),
                            setAuthToggle(true),
                            setVerifyOTPToggle(false);
                        }}
                      >
                        Login{" "}
                      </Link>
                    </p>
                  </div>
                </form>
              </>
            )}

            {/* Right */}
            <div className="right_image">
              {!ResendOTPToggle ? (
                <>
                  <div className="otp_message">
                    <img src={message_icon} alt="message_icon" />
                    <div className="otp">
                      <h4>{OTP_Value || "Empty"}</h4>
                    </div>
                  </div>
                  <img
                    src="https://img.freepik.com/premium-photo/3d-flat-icon-person-managing-emergency-fund-savings-app-white-background-textgraphics_980716-343638.jpg?w=1060"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <img src={resend_otp_img} alt="resend" />
                </>
              )}
            </div>
          </div>
        </div>
        {/* Terms_Condition */}
        {OpenTermsCondition ? (
          <div
            className="terms_condtion_container"
            onClick={() => setOpenTermsCondition(false)}
          >
            <div className="terms_main_center_box">
              <div
                className="close_terms"
                onClick={() => setOpenTermsCondition(false)}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div className="term_title">
                <h5>Terms and Conditions</h5>
              </div>
              <div className="content_box">
                <div className="content">
                  <h4>**Effective Date:** 19 - 07- 2024</h4>
                  <p>
                    Welcome to My Virtual Card, a service provided by
                    Aristostech India Pvt Ltd ("Company", "we", "us", or "our").
                    By accessing or using our service ("Service"), you agree to
                    be bound by these Terms and Conditions ("Terms"). If you do
                    not agree to these Terms, please do not use the Service.
                  </p>
                </div>
                <div className="content">
                  <h4>1. Acceptance of Terms</h4>
                  <p>
                    By using the Service, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms. We reserve
                    the right to modify these Terms at any time, and we will
                    provide notice of such changes by posting the revised Terms
                    on our website. Your continued use of the Service after any
                    changes are made constitutes your acceptance of the new
                    Terms.
                  </p>
                </div>
                <div className="content">
                  <h4>2. Use of the Service</h4>
                  <p>
                    - You must be at least 18 years old to use the Service.
                    <br /> - You agree to use the Service only for lawful
                    purposes and in accordance with these Terms.
                    <br /> - You are responsible for all activities that occur
                    under your account.
                  </p>
                </div>
                <div className="content">
                  <h4>3. Account Registration</h4>
                  <p>
                    To use the Service, you must create an account by providing
                    accurate and complete information. You are responsible for
                    maintaining the confidentiality of your account information
                    and for all activities that occur under your account. You
                    agree to notify us immediately of any unauthorized use of
                    your account.
                  </p>
                </div>
                <div className="content">
                  <h4>4. Privacy</h4>
                  <p>
                    Your use of the Service is also governed by our Privacy
                    Policy, which can be found at [link to Privacy Policy]. By
                    using the Service, you consent to the collection and use of
                    your information as described in the Privacy Policy.
                  </p>
                </div>
                <div className="content">
                  <h4>5. Payment and Fees</h4>
                  <p>
                    - Some features of the Service may require payment of fees.
                    You agree to pay all applicable fees in connection with your
                    use of the Service.
                    <br />- We reserve the right to change our fees at any time.
                    Any fee changes will be effective upon posting on our
                    website.
                  </p>
                </div>
                <div className="content">
                  <h4>6. Intellectual Property</h4>
                  <p>
                    All content and materials available on the Service,
                    including but not limited to text, graphics, website name,
                    code, images, and logos, are the intellectual property of
                    Aristostech India Pvt Ltd and are protected by applicable
                    intellectual property laws. You are granted a limited
                    license only for the purposes of viewing and using the
                    Service.
                  </p>
                </div>
                <div className="content">
                  <h4>7. Termination</h4>
                  <p>
                    We reserve the right to terminate or suspend your account
                    and access to the Service at our sole discretion, without
                    notice, for conduct that we believe violates these Terms or
                    is harmful to other users of the Service, us, or third
                    parties, or for any other reason.
                  </p>
                </div>
                <div className="content">
                  <h4>8. Disclaimer of Warranties</h4>
                  <p>
                    The Service is provided on an "as is" and "as available"
                    basis. We make no warranties, expressed or implied,
                    regarding the Service, including but not limited to the
                    implied warranties of merchantability, fitness for a
                    particular purpose, and non-infringement.
                  </p>
                </div>
                <div className="content">
                  <h4>9. Limitation of Liability</h4>
                  <p>
                    In no event shall Aristostech India Pvt Ltd be liable for
                    any indirect, incidental, special, consequential, or
                    punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses,
                    resulting from <br />
                    (i) your use or inability to use the Service; <br />
                    (ii) any unauthorized access to or use of our servers and/or
                    any personal information stored therein; <br />
                    (iii) any interruption or cessation of transmission to or
                    from the Service; and
                    <br /> (iv) any bugs, viruses, trojan horses, or the like
                    that may be transmitted to or through our Service by any
                    third party.
                  </p>
                </div>
                <div className="content">
                  <h4>10. Governing Law</h4>
                  <p>
                    These Terms shall be governed by and construed in accordance
                    with the laws of India, without regard to its conflict of
                    law principles. You agree to submit to the personal
                    jurisdiction of the courts located in [City, State], India,
                    for the purpose of litigating all such claims or disputes.
                  </p>
                </div>
                <div className="content">
                  <h4>11. Contact Us</h4>
                  <p>
                    If you have any questions about these Terms, please contact
                    us at:
                  </p>
                  <div className="company">
                    <h5>Aristostech India Pvt Ltd</h5>
                    <strong>Email: contact@aristostechindia.com</strong>
                  </div>
                  <div className="note">
                    <small>
                      Please review this draft and let me know if you need any
                      modifications or additional sections.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Privacy Policy */}
        {OpenPrivacyCondition ? (
          <div
            className="privacy_condtion_container"
            onClick={() => setOpenPrivacyCondition(false)}
          >
            <div className="privacy_main_center_box">
              <div
                className="close_terms"
                onClick={() => setOpenPrivacyCondition(false)}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div className="term_title">
                <h5>Privacy Policy</h5>
              </div>
              <div className="content_box">
                <div className="content">
                  <h4>Effective Date: 19 - 07- 2024</h4>
                  <p>
                    Welcome to MyVirtualCard.in. Your privacy is important to
                    us. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you visit our
                    website{" "}
                    <a href="https://myvirtualcard.in" target="_blank">
                      https://myvirtualcard.in
                    </a>
                    , use our services, or engage with us in other ways. Please
                    read this policy carefully. If you do not agree with the
                    terms of this Privacy Policy, please do not access the site.
                  </p>
                </div>
                <div className="content">
                  <h4>1. Information We Collect</h4>
                  <p>
                    We may collect information about you in a variety of ways.
                    The information we may collect on the Site includes:
                  </p>
                  <div className="child_content">
                    <h5>Personal Data</h5>
                    <ul>
                      <li>
                        <bold>Contact Information:</bold> such as your name,
                        email address, phone number, and postal address.
                      </li>
                      <li>
                        <bold>Identity Information:</bold> such as your
                        username, password, and other similar information.
                      </li>
                    </ul>
                  </div>
                  <div className="child_content">
                    <h5>Usage Data</h5>
                    <ul>
                      <li>
                        <bold>Activity Information: </bold>such as pages viewed,
                        access times, and browsing patterns.
                      </li>
                      <li>
                        <bold> Technical Information:</bold> such as IP address,
                        browser type, operating system, and Internet Service
                        Provider.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="content">
                  <h4>2. How We Use Your Information</h4>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal
                    information to outside parties except as described below:
                  </p>
                  <div className="child_content">
                    <ul>
                      <li>
                        <bold>To Provide Services:</bold> Including creating and
                        managing your account, processing transactions, and
                        providing customer support.
                      </li>
                      <li>
                        <bold> To Communicate: </bold>Including sending you
                        updates, newsletters, and marketing communications.
                      </li>
                      <li>
                        <bold> To Improve Our Services: </bold>Including
                        analyzing usage data to enhance our website's
                        functionality and user experience.
                      </li>
                      <li>
                        <bold>To Ensure Security: </bold> Including detecting
                        and preventing fraud and unauthorized access.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="content">
                  <h4>3. Sharing Your Information</h4>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal
                    information to outside parties except as described below:
                  </p>
                  <div className="child_content">
                    <ul>
                      <li>
                        <bold>With Service Providers:</bold> We may share your
                        information with third-party service providers who
                        assist us in operating our website and conducting our
                        business.
                      </li>
                      <li>
                        <bold>For Legal Reasons:</bold> We may disclose your
                        information when we believe it is necessary to comply
                        with the law, enforce our site policies, or protect our
                        or others' rights, property, or safety.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="content">
                  <h4>4. Data Security</h4>
                  <p>
                    We implement a variety of security measures to maintain the
                    safety of your personal information. However, please note
                    that no method of transmission over the Internet or method
                    of electronic storage is 100% secure.
                  </p>
                </div>
                <div className="content">
                  <h4>5. Your Rights</h4>
                  <p>
                    You have certain rights regarding your personal data,
                    including the right to access, correct, or delete your
                    personal information, and the right to object to or restrict
                    certain processing. To exercise these rights, please contact
                    us at [insert contact email].
                  </p>
                </div>
                <div className="content">
                  <h4>6. Cookies and Tracking Technologies</h4>
                  <p>
                    We use cookies and similar tracking technologies to track
                    activity on our website and hold certain information. You
                    can instruct your browser to refuse all cookies or to
                    indicate when a cookie is being sent. However, if you do not
                    accept cookies, you may not be able to use some parts of our
                    website.
                  </p>
                </div>
                <div className="content">
                  <h4>7. Third-Party Links</h4>
                  <p>
                    Our website may contain links to other websites. We are not
                    responsible for the privacy practices or content of these
                    other sites. We encourage you to read the privacy policies
                    of each website you visit.
                  </p>
                </div>
                <div className="content">
                  <h4>8. Changes to This Privacy Policy</h4>
                  <p>
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the effective date.
                  </p>
                </div>

                <div className="content">
                  <h4>11. Contact Us</h4>
                  <p>
                    If you have any questions about these Terms, please contact
                    us at:
                  </p>
                  <div className="company">
                    <h5>MyVirtualcard.in</h5>
                    <p>
                      <b>Address:</b> No. 113, Ankur Plaza, GN Chetty Rd, T.
                      Nagar, Chennai, India, Tamil Nadu 600017
                    </p>
                    <p>
                      <b>Email:</b> contact@aristostechindia.com
                    </p>
                    <p>
                      <b>Contact Phone Number :</b> +91 93444 82370
                    </p>
                  </div>
                  <div className="note">
                    <small>
                      Please review this draft and let me know if you need any
                      modifications or additional sections.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Home page button */}

        <div className="home_page">
          <Link to="/">
            <i className="bx bxs-home"></i>Home
          </Link>
        </div>
        {/* Extra design anime */}
        <div className="extra_designs">
          <div className="design1"></div>
          <div className="design2"></div>
          <div className="design3"></div>
          <div className="design4"></div>
          <div className="design5"></div>
          <div className="design6"></div>
          {/* //Circle right */}
          {/* <div className="design7">
  </div> */}
          {/* //Circle left */}
          {/* <div className="design8">
  </div> */}
        </div>
        <div className="brand_logo">
          <img src={brand_logo} alt="logo" />
        </div>
        <div className="box_container">
          <div className="right_image">
            <Slide
              slidesToScroll={1}
              slidesToShow={width < 600 ? 1 : 1}
              indicators={true}
              autoplay
              {...properties}
              autoplayInterval={500}
              className="slider"
            >
              {images.map((data, index) => {
                return <img src={data.image} alt="image" key={index} />;
              })}
            </Slide>
          </div>
          <div className="left_form">
            <>
              {!AuthToggle ? (
                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="form_title">
                    <h4>Welcome to Digital VCard Application</h4>
                    <small>Create Your New Account!</small>
                  </div>
                  <div className="profile">
                    <label htmlFor="profile">
                      <img
                        src={
                          profile ||
                          "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?t=st=1723845752~exp=1723849352~hmac=c7cc78b9fe2688fbed4419bcf848748026a37a50ea38821c89c15f77f776dd2f&w=740"
                        }
                        alt="avatar"
                        id="profile_image"
                      />
                      <i className="bx bxs-chevrons-left bx-flashing"></i>
                      <span>Upload your profile</span>
                    </label>
                    <input
                      type="file"
                      id="profile"
                      name="profile"
                      onChange={handleProfileImageChange}
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
                      value={formik.values.userName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.userName && formik.touched.userName
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("userName")}
                    />
                    <div className="error">{formik.errors.userName}</div>
                    <div className="icon">
                      <i className="fa-solid fa-user-secret"></i>
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
                      placeholder="Eg: Joyal "
                      name="firstName"
                      id="firstName"
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.firstName && formik.touched.firstName
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("firstName")}
                    />
                    <div className="error">{formik.errors.firstName}</div>
                    <div className="icon">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    {/* <div className='success_icon' >
                        <i className="fa-solid fa-circle-check"></i>
                        </div> */}
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
                      placeholder="Eg : James or M"
                      name="lastName"
                      id="lastName"
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.lastName && formik.touched.lastName
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("lastName")}
                    />
                    <div className="error">{formik.errors.lastName}</div>
                    <div className="icon">
                      <i className="fa-solid fa-user-tag"></i>
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
                      placeholder="Eg : demo@gmail.com"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.email && formik.touched.email
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("email")}
                    />
                    <div className="error">{formik.errors.email}</div>
                    <div className="icon">
                      <i className="fa-solid fa-envelope"></i>
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
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.password && formik.touched.password
                          ? "input_error"
                          : ""
                      }
                      // {...formik.getFieldProps("password")}
                    />
                    <div className="error">{formik.errors.password}</div>
                    <div className="icon">
                      <i className="fa-solid fa-lock"></i>
                    </div>

                    <div className="show_pass" onClick={handleShow}>
                      {!show ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </div>
                  </div>
                  <div className="aggrement">
                    <div className="form_group_checkbox">
                      <input
                        type="checkbox"
                        name="terms"
                        onClick={() => setFieldValue("terms", true)}
                        id="terms"
                        onChange={formik.handleChange}
                        value={formik.values.terms}
                        onBlur={formik.handleBlur}
                        className={
                          formik.errors.terms && formik.touched.terms
                            ? "input_error"
                            : ""
                        }
                      />
                      <label htmlFor="terms">
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
                    <div className="error">{formik.errors.terms}</div>
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
                    <p>
                      Already u have an account ?{" "}
                      <span
                        onClick={() => {
                          setAuthToggle(true);
                        }}
                        className={AuthToggle ? "activelogin" : ""}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                </form>
              ) : (
                <>
                  {!ResetPassToggle ? (
                    <form
                      action=""
                      onSubmit={
                        !ForgotPassToggle
                          ? Login_formik.handleSubmit
                          : Forgot_formik.handleSubmit
                      }
                      className="login_form"
                    >
                      <div className="form_title">
                        {!ForgotPassToggle ? (
                          <>
                            <h4>Welcome Back to Digital VCard Application</h4>
                            <small>Login With Your Account!</small>
                          </>
                        ) : (
                          <>
                            <h4>Don't Worry about your password been lost..</h4>
                            <small>Reset your old password!</small>
                          </>
                        )}
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
                          value={
                            !ForgotPassToggle
                              ? Login_formik.values.email
                              : Forgot_formik.values.email
                          }
                          onBlur={
                            !ForgotPassToggle
                              ? Login_formik.handleBlur
                              : Forgot_formik.handleBlur
                          }
                          onChange={
                            !ForgotPassToggle
                              ? Login_formik.handleChange
                              : Forgot_formik.handleChange
                          }
                          className={
                            !ForgotPassToggle
                              ? Login_formik.errors.email &&
                                Login_formik.touched.email
                                ? "input_error"
                                : ""
                              : Forgot_formik.errors.email &&
                                Forgot_formik.touched.email
                              ? "input_error"
                              : ""
                          }
                        />
                        <div className="error">
                          {!ForgotPassToggle
                            ? Login_formik.errors.email
                            : Forgot_formik.errors.email}
                        </div>
                        <div className="icon">
                          <i className="bx bxs-envelope"></i>
                        </div>
                      </div>

                      {!ForgotPassToggle ? (
                        <>
                          <div className="form_group">
                            <label htmlFor="email">
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
                              value={Login_formik.values.password}
                              onBlur={Login_formik.handleBlur}
                              onChange={Login_formik.handleChange}
                              className={
                                Login_formik.errors.password &&
                                Login_formik.touched.password
                                  ? "input_error"
                                  : ""
                              }
                            />
                            <div className="error">
                              {Login_formik.errors.password}
                            </div>
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

                          <div className="forgot_password">
                            <Link onClick={() => setForgotPassToggle(true)}>
                              <small>Forgot Password ?</small>
                            </Link>
                          </div>
                          <div className="form_submit">
                            <button type="submit">
                              {loginLoader ? (
                                <div className="loader"></div>
                              ) : (
                                <>
                                  Sign In
                                  <div className="rocket">
                                    <i className="bx bx-log-in bx-flashing"></i>
                                  </div>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="or">
                            <p>
                              You not have an account ?{" "}
                              <span
                                onClick={() => {
                                  setAuthToggle(false);
                                }}
                                className={AuthToggle ? "activelogin" : ""}
                              >
                                Register
                              </span>
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form_submit">
                            <button type="submit">
                              {loginLoader ? (
                                <div className="loader"></div>
                              ) : (
                                <>
                                  Reset
                                  <div className="rocket">
                                    <span className="material-symbols-outlined">
                                      lock_open
                                    </span>
                                  </div>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="forgot_or">
                            <p>or Continue</p>
                          </div>
                          <div className="signup_link">
                            <p>
                              Cancel reset Password ?{" "}
                              <Link onClick={() => setForgotPassToggle(false)}>
                                Exit
                              </Link>
                            </p>
                          </div>
                        </>
                      )}
                    </form>
                  ) : (
                    <form
                      action=""
                      onSubmit={resetformik.handleSubmit}
                      className="login_form"
                    >
                      <div className="form_title">
                        <h4>Get Ready for Visit Your Dashboard</h4>
                        <small>Create Your New Password!</small>
                      </div>
                      <div className="form_group">
                        <label htmlFor="email">
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
                          value={resetformik.values.password}
                          onBlur={resetformik.handleBlur}
                          onChange={resetformik.handleChange}
                          className={
                            resetformik.errors.password &&
                            resetformik.touched.password
                              ? "input_error"
                              : ""
                          }
                        />
                        <div className="error">
                          {resetformik.errors.password}
                        </div>
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
                                <span className="material-symbols-outlined">
                                  lock_reset
                                </span>
                              </div>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="forgot_or">
                        <p>or Continue</p>
                      </div>
                      <div className="signup_link">
                        <p>
                          Cancel reset Password ?{" "}
                          <Link
                            onClick={() => {
                              setForgotPassToggle(false),
                                setResetPassToggle(false);
                            }}
                          >
                            Exit
                          </Link>
                        </p>
                      </div>
                    </form>
                  )}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
