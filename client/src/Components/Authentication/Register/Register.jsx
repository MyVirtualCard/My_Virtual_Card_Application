import React, { useContext, useState, useEffect, useRef } from "react";
import "./Register.scss";
import brand_logo from "../../../assets/Brand_Logo/BrandLogo2.png";
import brand_logo2 from "../../../assets/Brand_Logo/brand_logo.png";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { WiStars } from "react-icons/wi";
import new_vcards_images from "../VCard_Tempalate_Image/New_Vcards.js";
//register right Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { convertToBase64Profile } from "../../Helper/convert";
import { useFormik } from "formik";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  RegisterValidateSchema,
} from "../../Helper/RegisterValidate.js";
import Lottie from "react-lottie";
import RegisterBackAnime from '../../../assets/Lotte_Animation/Gradient_Back6.json'
import backImage from '../../../assets/Landing_Page/back_image.png'
import { AppContext } from "../../Context/AppContext.jsx";
const Register = () => {
  let inputRefFocus = useRef(null);

  let{backendUrl,setIsLoggedIn,getUserData}=useContext(AppContext);
  useEffect(() => {
    inputRefFocus.current.focus();
  }, []);
  
  let [Profile, setProfile] = useState(null);

  const [preview, setPreview] = useState("");
  let [show, setShow] = useState();
  let [AuthToggle, setAuthToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  let [registerLoader, setRegisterLoader] = useState(false);

  let [OpenTermsCondition, setOpenTermsCondition] = useState(false);
  let [OpenPrivacyCondition, setOpenPrivacyCondition] = useState(false);

  let navigate = useNavigate();

  let [Seconds, setSeconds] = useState("60");
  const options = {
    loop: true,
    autoplay: true,
    animationData: RegisterBackAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
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
    if (Seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(Seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [Seconds]);
    // Handle file selection
    const handleProfileImageChange = (e) => {
      const file = e.target.files[0];
      setProfile(file);
      setPreview(URL.createObjectURL(file)); // Show a preview of the image
    };
  // Register Formik
  let formik = useFormik({
    initialValues: {
      UserName: "",
      FullName: "",
      MobileNumber: "",
      Email: "",
      Password: '',
      Terms: false,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: RegisterValidateSchema,
    onSubmit: async (values) => {
      setRegisterLoader(true);
      let data={
        UserName:formik.values.UserName,
        Email:formik.values.Email,
        FullName:formik.values.FullName,
        MobileNumber:formik.values.MobileNumber,
        Password:formik.values.Password,
        Terms:formik.values.Terms
      }
  
      await axios
        .post(backendUrl+'/api/auth/register', data)
        .then((res) => {
    
          if(res.data.success){
            setRegisterLoader(false);
            setIsLoggedIn(true);
            getUserData();
            toast.success(res.data.message);
            formik.values.Password = "";
            setTimeout(()=>{
              navigate('/')
            },2000)
           
          }
          else{
            setRegisterLoader(false);
            setIsLoggedIn(false);
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
   console.log(error)
          toast.error(error.response.data.message);
          setRegisterLoader(false);
        });
    },
  });

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

  return (
    <>
      <div
        className="register_container"
        id={AuthToggle ? "login_back" : "register_back"}
      >
        <div className="auth_back">
       <Link to={'/'}>
       <img src={backImage} alt="" />
       </Link>
           
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
                        Email address, phone number, and postal address.
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
                    us at [insert contact Email].
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
            <FaHome /> <span>Home</span>
          </Link>
        </div>

        <div className="brand_logo">
          {width > 776 ? 
           <img src={brand_logo} alt="brand_logo" />
          : 
          <img src={brand_logo2} alt="brand_logo" />
          }
         
        </div>
        <div className="register_box_container">
        <div className="logo_for_small_device">
          <Link to={'/'}>
          <img src={brand_logo2} alt="brand_logo" />
          </Link>
      
          </div>
          <div className="left_side">
            <div className="title">
              <h4>Welcome to Digital VCard Application</h4>
              <small>
                Register to create your account ans start branding your store to
                increase your sales and get more clients to develop your brand!
              </small>
            </div>
            <div className="right_image">
              <Slider {...vcard_settings}>
                {new_vcards_images.map((data, index) => {
                  return <img src={data.image} alt="image" key={index} />;
                })}
              </Slider>
            </div>
          
          </div>

          <div className="right_side">
            <form onSubmit={formik.handleSubmit}>
              <div className="form_title">
                <h4>
                User Sign-Up 
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
                  onChange={handleProfileImageChange}
                  // {...formik.getFieldProps('Profile')}
                />
              </div> */}
              {/* //UserName: */}
              <div className="form_group">
                <label htmlFor="UserName">
                  UserName{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  ref={inputRefFocus}
                  type="text"
                  placeholder="Enter Unique UserName "
                  name="UserName"
                  id="UserName"
                  value={formik.values.UserName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.UserName && formik.touched.UserName
                      ? "input_error"
                      : ""
                  }
                  // {...formik.getFieldProps("UserName")}
                />
                <div className="error">{formik.errors.UserName}</div>
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
                  value={formik.values.FullName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.FullName && formik.touched.FullName
                      ? "input_error"
                      : ""
                  }
                  // {...formik.getFieldProps("FullName")}
                />
                <div className="error">{formik.errors.FullName}</div>
                <div className="icon">
                  <FaRegUser />
                </div>
                {/* <div className='success_icon' >
                        <i className="fa-solid fa-circle-check"></i>
                        </div> */}
              </div>
              {/* //Last Name */}
              {/* <div className="form_group">
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
                  </div> */}
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
                  value={formik.values.Email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.Email && formik.touched.Email
                      ? "input_error"
                      : ""
                  }
                  // {...formik.getFieldProps("Email")}
                />
                <div className="error">{formik.errors.Email}</div>
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
                  value={formik.values.MobileNumber}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.MobileNumber && formik.touched.MobileNumber
                      ? "input_error"
                      : ""
                  }
                />
                <div className="error">{formik.errors.MobileNumber}</div>
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
                  value={formik.values.Password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.errors.Password && formik.touched.Password
                      ? "input_error"
                      : ""
                  }
                  // {...formik.getFieldProps("Password")}
                />
                <div className="error">{formik.errors.Password}</div>
                <div className="icon">
                  <RiLockPasswordLine />
                </div>

                <div className="show_pass" onClick={handleShow}>
                  {!show ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
                {/* <div className="strength_indicator">
              
                  {formik.errors.Password && formik.touched.Password ? (
                    ''
                  ) : (
                    <span>Secure Password</span>
                  )}
                </div> */}
              </div>
              <div className="aggrement">
                <div className="form_group_checkbox">
                  <input
                    type="checkbox"
                    name="Terms"
                    // onClick={() => set("Terms", true)}
                    id="Terms"
                    onChange={formik.handleChange}
                    value={formik.values.Terms}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.Terms && formik.touched.Terms
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
                <div className="error">{formik.errors.Terms}</div>
              </div>

              <div className="form_submit">
                <button type="submit">
                  Sign Up
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
                <Link to="/login">
                  Already u have an account ? <span>Login here</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
