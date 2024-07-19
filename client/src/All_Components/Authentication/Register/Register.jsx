import React, { useContext, useState } from "react";
import "./Register.scss";
import register_svg from "../../../assets/SVG/Register/register2.svg";
import site_logo from "../../../assets/LandingPage_image/BrandLogo2.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Context from "../../UseContext/Context";
import axios, { all } from "axios";
import { convertToBase64 } from "../../Helper/convert";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { RegisterValidate } from "../../Helper/RegisterValidate";
import ReCAPTCHA from "react-google-recaptcha";
const Register = () => {
  let [registerLoader, setRegisterLoader] = useState(false);
  let [loginLoader, setLoginLoader] = useState(false);
  let [capchaValue, setCapchaValue] = useState(null);

  let navigate = useNavigate();
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
  let Login_formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      capchaValue: null,
    },
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (values) => {
      setLoginLoader(true);

      await api
        .post('/auth/login', values)
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
            navigate(`/${userData.userName}/uadmin/dashboard`);
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoginLoader(false);
        });
    },
  });
  function onChange(value) {
    setCapchaValue(value);
    console.log("Captcha value:", value);
  }
  //All state data:
  let {
    show,
    setShow,
    profile,
    setProfile,
    AuthToggle,setAuthToggle,
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
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

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
      await api
        .post("/auth/register", values)
        .then((response) => {
          toast.success(response.data.message);
          setRegisterLoader(false);
          setTimeout(() => {
            setAuthToggle(true);
          }, 1500);
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
          
          <div
            className="site_logo"
            onClick={() => (window.location.pathname = "/")}
          >
            <img src={site_logo} alt="logo" />
          </div>
          <div className="form_title">
            <h4>Welcome to AristosTech Digital Card Creator!</h4>
          </div>
          <div className="moon_svg">
          <svg width="1705" height="2039" viewBox="0 0 1705 2039" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Rectangle_2" d="M523.927 1293.37C525.267 1290.96 528.31 1290.09 530.725 1291.43L594.602 1326.87C597.016 1328.21 597.888 1331.25 596.548 1333.67L560.047 1399.45C558.707 1401.87 555.663 1402.74 553.249 1401.4L489.372 1365.95C486.957 1364.62 486.086 1361.57 487.426 1359.16L523.927 1293.37Z" fill="white"/>
<rect id="Rectangle_4" x="1239.52" y="717.189" width="108.122" height="107.498" rx="13.5" transform="rotate(-39.7086 1239.52 717.189)" stroke="white" stroke-width="3"/>
<rect id="Rectangle_6" x="255.816" y="719.32" width="79.0505" height="81.2329" rx="13" transform="rotate(-39.7086 255.816 719.32)" stroke="white" stroke-width="4"/>
<rect id="Rectangle_5" x="32.1123" y="1580.45" width="77.2182" height="82.2329" rx="18.5" transform="rotate(-39.7086 32.1123 1580.45)" stroke="white" stroke-width="3"/>
<rect id="Rectangle_3" x="1496.79" y="1359.55" width="114.876" height="113.501" rx="13" transform="rotate(-36.1416 1496.79 1359.55)" stroke="white" stroke-width="4"/>
<path id="Polygon_1" d="M206.644 1106.29C207.033 1105.64 207.967 1105.64 208.356 1106.29L242.444 1162.73C242.846 1163.4 242.366 1164.25 241.588 1164.25H173.412C172.634 1164.25 172.154 1163.4 172.556 1162.73L206.644 1106.29Z" stroke="white" stroke-width="4"/>
<path id="Ellipse_1" d="M1070 1187.5C1070 1211.52 1050.3 1231 1026 1231C1001.7 1231 982 1211.52 982 1187.5C982 1163.48 1001.7 1144 1026 1144C1050.3 1144 1070 1163.48 1070 1187.5Z" stroke="white" stroke-width="4"/>
<path id="Ellipse_2" d="M1702.5 1061.5C1702.5 1085.52 1682.8 1105 1658.5 1105C1634.2 1105 1614.5 1085.52 1614.5 1061.5C1614.5 1037.48 1634.2 1018 1658.5 1018C1682.8 1018 1702.5 1037.48 1702.5 1061.5Z" stroke="white" stroke-width="4"/>
<path id="Star_1" d="M564 984.264L571.533 1009.6L571.852 1010.68H572.971H597.699L577.582 1026.65L576.788 1027.28L577.077 1028.25L584.691 1053.87L564.933 1038.18L564 1037.44L563.067 1038.18L543.309 1053.87L550.923 1028.25L551.212 1027.28L550.418 1026.65L530.301 1010.68H555.029H556.148L556.467 1009.6L564 984.264Z" stroke="white" stroke-width="3"/>
<path id="Star_2" d="M1162 1551.81L1171.8 1581.67L1172.14 1582.7H1173.23H1204.9L1179.29 1601.12L1178.4 1601.77L1178.74 1602.81L1188.53 1632.64L1162.88 1614.19L1162 1613.56L1161.12 1614.19L1135.47 1632.64L1145.26 1602.81L1145.6 1601.77L1144.71 1601.12L1119.1 1582.7H1150.77H1151.86L1152.2 1581.67L1162 1551.81Z" stroke="white" stroke-width="3"/>
<path id="Star_5" d="M626 1707.85L629.962 1720.05L630.299 1721.08H631.388H644.209L633.837 1728.62L632.955 1729.26L633.292 1730.3L637.254 1742.49L626.882 1734.95L626 1734.31L625.118 1734.95L614.746 1742.49L618.708 1730.3L619.045 1729.26L618.163 1728.62L607.791 1721.08H620.612H621.701L622.038 1720.05L626 1707.85Z" stroke="white" stroke-width="3"/>
<path id="Star_3" d="M1315 1986.85L1320.53 2003.88L1320.87 2004.92H1321.96H1339.87L1325.38 2015.45L1324.5 2016.09L1324.83 2017.12L1330.37 2034.15L1315.88 2023.63L1315 2022.99L1314.12 2023.63L1299.63 2034.15L1305.17 2017.12L1305.5 2016.09L1304.62 2015.45L1290.13 2004.92H1308.04H1309.13L1309.47 2003.88L1315 1986.85Z" stroke="white" stroke-width="3"/>
<path id="Star_4" d="M30 1955.85L35.5333 1972.88L35.8701 1973.92H36.9599H54.8662L40.3797 1984.45L39.4981 1985.09L39.8348 1986.12L45.3682 2003.15L30.8817 1992.63L30 1991.99L29.1183 1992.63L14.6318 2003.15L20.1652 1986.12L20.5019 1985.09L19.6203 1984.45L5.13377 1973.92H23.0401H24.1299L24.4667 1972.88L30 1955.85Z" stroke="white" stroke-width="3"/>
<g id="Polygon_2" filter="url(#filter0_dd_0_1)">
<path d="M880.567 717.75C880.759 717.417 881.241 717.417 881.433 717.75L915.208 776.25C915.4 776.583 915.16 777 914.775 777H847.225C846.84 777 846.6 776.583 846.792 776.25L880.567 717.75L878.457 716.532L880.567 717.75Z" stroke="white" stroke-width="5"/>
</g>
<path id="Polygon_3" d="M998.251 1764.5C998.636 1764.5 998.876 1764.91 998.683 1765.25L964.827 1823.7C964.634 1824.03 964.153 1824.03 963.961 1823.7L930.267 1765.15C930.075 1764.82 930.316 1764.4 930.701 1764.4L998.251 1764.5L998.254 1762.06L998.251 1764.5Z" stroke="white" stroke-width="5"/>
<rect id="Rectangle_7" x="163.314" y="179.222" width="275" height="241" rx="28.5" transform="rotate(-43.494 163.314 179.222)" stroke="white" stroke-width="3"/>
<defs>
<filter id="filter0_dd_0_1" x="840.221" y="712" width="81.5589" height="72.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_0_1"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_0_1" result="shape"/>
</filter>
</defs>
</svg>

          </div>
          <div className="image">
            <img src={register_svg} alt="" />
          </div>

          {/* <div className="wave_svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#019ca1"
                fill-opacity="1"
                d="M0,160L30,165.3C60,171,120,181,180,202.7C240,224,300,256,360,234.7C420,213,480,139,540,117.3C600,96,660,128,720,122.7C780,117,840,75,900,90.7C960,107,1020,181,1080,192C1140,203,1200,149,1260,122.7C1320,96,1380,96,1410,96L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
              ></path>
            </svg>
          </div> */}
        </div>
        <div className="right">
          <div className="box_container">
            <div className="right_form">
              <div className="current_form">
                <button onClick={()=>{setAuthToggle(false)}} className={!AuthToggle ? 'activeRegister':''}>Register<i className="fa-solid fa-user-plus"></i> {!AuthToggle ? <span className="register_line"></span> : ''}</button>
                <button onClick={()=>{setAuthToggle(true)}} className={AuthToggle ? 'activelogin':''}>Login<i className="fa-solid fa-right-to-bracket"></i> {AuthToggle ? <span className="login_line"></span>:''}</button>
              </div>

              {!AuthToggle ? (
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
                      placeholder="Eg: Jayakumar "
                      name="firstName"
                      id="firstName"
                      {...formik.getFieldProps("firstName")}
                    />
                    <div className="icon">
                      <i className="fa-solid fa-user"></i>
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
                      placeholder="Eg : abc@gmail.com"
                      name="email"
                      id="email"
                      {...formik.getFieldProps("email")}
                    />
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
                      {...formik.getFieldProps("password")}
                    />
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
                  {/* <div className="or">
                  <p>or Continue</p>
                </div> */}
                </form>
              ) : (
                <form action="" onSubmit={Login_formik.handleSubmit} className="login_form">
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
                    value={Login_formik.values.email}
                    // onChange={(e) => setEmail(e.target.value)}
                    {...Login_formik.getFieldProps("email")}
                  />
                  <div className="icon">
                    <i className="bx bxs-envelope"></i>
                  </div>
                </div>
                {/* Password`` */}
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
                    // onChange={(e) => setPassword(e.target.value)}
                    {...Login_formik.getFieldProps("password")}
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

                <div className="forgot_password">
                  <Link to="/forgot_password">
                    <small>Forgot Password ?</small>
                  </Link>
                </div>
                <div className="capcha">
                  <ReCAPTCHA
                    sitekey="6LdlmuYpAAAAAOOHZqQQExlLSFlXG5rQsXMF48wI"
                    onChange={onChange}
                  />
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
            
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
