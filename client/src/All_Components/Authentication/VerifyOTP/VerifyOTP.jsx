import React, { useContext, useState, useEffect, useRef } from "react";
import "./VerifyOTP.scss";
import login_svg from "../../../assets/SVG/VerifyOTP/verify.png";
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
        <div className="moon_svg">
            <svg
              width="1705"
              height="1387"
              viewBox="0 0 1705 1387"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Rectangle 2"
                d="M523.927 641.372C525.267 638.957 528.31 638.086 530.725 639.426L594.602 674.868C597.016 676.208 597.888 679.252 596.548 681.666L560.047 747.451C558.707 749.866 555.663 750.737 553.249 749.397L489.372 713.955C486.957 712.615 486.086 709.572 487.426 707.157L523.927 641.372Z"
                fill="#999999"
              />
              <rect
                id="Rectangle 4"
                x="1239.52"
                y="65.1893"
                width="108.122"
                height="107.498"
                rx="13.5"
                transform="rotate(-39.7086 1239.52 65.1893)"
                stroke="#FF9696"
                stroke-width="3"
              />
              <rect
                id="Rectangle 6"
                x="255.816"
                y="67.3204"
                width="79.0505"
                height="81.2329"
                rx="13"
                transform="rotate(-39.7086 255.816 67.3204)"
                stroke="#9A9A9A"
                stroke-width="4"
              />
              <rect
                id="Rectangle 5"
                x="32.1123"
                y="928.446"
                width="77.2182"
                height="82.2329"
                rx="18.5"
                transform="rotate(-39.7086 32.1123 928.446)"
                stroke="#1E80F4"
                stroke-width="3"
              />
              <rect
                id="Rectangle 3"
                x="1496.79"
                y="707.546"
                width="114.876"
                height="113.501"
                rx="13"
                transform="rotate(-36.1416 1496.79 707.546)"
                stroke="#8E2626"
                stroke-width="4"
              />
              <path
                id="Polygon 1"
                d="M208.356 454.286L242.444 510.733C242.846 511.4 242.366 512.25 241.588 512.25H173.412C172.634 512.25 172.154 511.4 172.556 510.733L206.644 454.286C207.033 453.642 207.967 453.642 208.356 454.286Z"
                stroke="#7C82FF"
                stroke-width="4"
              />
              <path
                id="Ellipse 1"
                d="M1070 535.5C1070 559.524 1050.3 579 1026 579C1001.7 579 982 559.524 982 535.5C982 511.476 1001.7 492 1026 492C1050.3 492 1070 511.476 1070 535.5Z"
                stroke="#FF8BFA"
                stroke-width="4"
              />
              <path
                id="Ellipse 2"
                d="M1702.5 409.5C1702.5 433.524 1682.8 453 1658.5 453C1634.2 453 1614.5 433.524 1614.5 409.5C1614.5 385.476 1634.2 366 1658.5 366C1682.8 366 1702.5 385.476 1702.5 409.5Z"
                stroke="#5AAB8E"
                stroke-width="4"
              />
              <path
                id="Star 1"
                d="M564 332.264L571.533 357.603L571.852 358.675H572.971H597.699L577.582 374.65L576.788 375.28L577.077 376.252L584.691 401.866L564.933 386.176L564 385.435L563.067 386.176L543.309 401.866L550.923 376.252L551.212 375.28L550.418 374.65L530.301 358.675H555.029H556.148L556.467 357.603L564 332.264Z"
                stroke="#FF758E"
                stroke-width="3"
              />
              <path
                id="Star 2"
                d="M1162 899.81L1171.8 929.671L1172.14 930.704H1173.23H1204.9L1179.29 949.125L1178.4 949.767L1178.74 950.81L1188.53 980.641L1162.88 962.19L1162 961.56L1161.12 962.19L1135.47 980.641L1145.26 950.81L1145.6 949.767L1144.71 949.125L1119.1 930.704H1150.77H1151.86L1152.2 929.671L1162 899.81Z"
                stroke="#262C11"
                stroke-width="3"
              />
              <path
                id="Star 5"
                d="M626 1055.85L629.962 1068.05L630.299 1069.08H631.388H644.209L633.837 1076.62L632.955 1077.26L633.292 1078.3L637.254 1090.49L626.882 1082.95L626 1082.31L625.118 1082.95L614.746 1090.49L618.708 1078.3L619.045 1077.26L618.163 1076.62L607.791 1069.08H620.612H621.701L622.038 1068.05L626 1055.85Z"
                stroke="#75BDFF"
                stroke-width="3"
              />
              <path
                id="Star 3"
                d="M1315 1334.85L1320.53 1351.88L1320.87 1352.92H1321.96H1339.87L1325.38 1363.45L1324.5 1364.09L1324.83 1365.12L1330.37 1382.15L1315.88 1371.63L1315 1370.99L1314.12 1371.63L1299.63 1382.15L1305.17 1365.12L1305.5 1364.09L1304.62 1363.45L1290.13 1352.92H1308.04H1309.13L1309.47 1351.88L1315 1334.85Z"
                stroke="#FF8E75"
                stroke-width="3"
              />
              <path
                id="Star 4"
                d="M30 1303.85L35.5333 1320.88L35.8701 1321.92H36.9599H54.8662L40.3797 1332.45L39.4981 1333.09L39.8348 1334.12L45.3682 1351.15L30.8817 1340.63L30 1339.99L29.1183 1340.63L14.6318 1351.15L20.1652 1334.12L20.5019 1333.09L19.6203 1332.45L5.13377 1321.92H23.0401H24.1299L24.4667 1320.88L30 1303.85Z"
                stroke="#75FFE6"
                stroke-width="3"
              />
              <g id="Polygon 2" filter="url(#filter0_dd_0_1)">
                <path
                  d="M881.433 65.75L915.208 124.25C915.4 124.583 915.16 125 914.775 125H847.225C846.84 125 846.6 124.583 846.792 124.25L880.567 65.75C880.759 65.4167 881.241 65.4167 881.433 65.75Z"
                  stroke="#9C9C9C"
                  stroke-width="5"
                />
              </g>
              <path
                id="Polygon_3"
                d="M998.683 1113.25L964.827 1171.7C964.634 1172.03 964.153 1172.03 963.961 1171.7L930.267 1113.15C930.075 1112.82 930.316 1112.4 930.701 1112.4L998.251 1112.5C998.636 1112.5 998.876 1112.91 998.683 1113.25Z"
                stroke="#9C9C9C"
                stroke-width="5"
              />
              <defs>
                <filter
                  id="filter0_dd_0_1"
                  x="840.221"
                  y="60"
                  width="81.5589"
                  height="72.5"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="1"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_0_1"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_0_1"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_0_1"
                    result="effect2_dropShadow_0_1"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_0_1"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
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
