import React, { useContext, useEffect, useState } from "react";
import "./ClientDashBoard.scss";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import BrandLogo from "../../assets/Brand_Logo/BrandLogo.png";
import hand from "../../assets/Brand_Logo/hand.png";
import { IoMdSettings } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { SiCodesignal } from "react-icons/si";
import { MdSpaceDashboard } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaS, FaUserGroup } from "react-icons/fa6";
import { GiCometSpark } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { PiSealWarningFill } from "react-icons/pi";

import { FaChartPie } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";

import { toast } from "react-toastify";
import axios from "axios";
import { Helmet } from "react-helmet";
import User_VCards from "./Pages/User_VCards";
import VCard_URL_Form from "./Pages/VCard_URL_Form";
import VCard_Form_Edit from "./VCardForms_Components/VCard_Form_Edit";
import { AppContext } from "../Context/AppContext";
const ClientDashboard = () => {
  let navigate = useNavigate();
  let {
    setToken,
    setUserName,
    URL_Alies,
    setURL_Alies,
    Token,
    UserName,
    FormSubmitLoader,
    setFormSubmitLoader,
    UserData,
    setUserData,
    ClientData,
    setClientData,
  } = useContext(AppContext);
  const location = useLocation();
  let [sideaNavToggle, setSideNavToggle] = useState(false);
  let [ProfileCardToggle, setProfileCardToggle] = useState(false);

  //Server ApI
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  useEffect(() => {
    // console.log("Pathname changed:", location.pathname);
    setProfileCardToggle(false);
    if (window.innerWidth <= 767) {
      return setSideNavToggle(false);
    }
  }, [location]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    try {
      api
        .get(`/api/user/data`)
        .then((res) => {
          const data = res.data.UserData;

          setClientData(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    try {
      api
        .get(`/api/auth/resellerClient/register/${UserName}`)
        .then((res) => {
          const data = res.data.user;
          setClientData(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  //LogOut user
  let handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/logout");
      console.log(response.data);
      if (response.data.success === true) {

        toast.success("LogOut successfully");
        setTimeout(() => {
          localStorage.clear();
          setUserData(false);
          setToken(null);
          setUserName(false);
          navigate("/");
          reloadComponent();
          // window.location.pathname = "/";
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="client_Dashboard_container">
        <Helmet>
          <title>MyVirtualCard-Client Dashboard</title>
        </Helmet>
        {/* SideNav */}
        <div
          className={`client_dashboard_sidenav ${
            sideaNavToggle ? "small_sidenav" : ""
          }`}
          id={sideaNavToggle ? "sideNavOpen" : "sideNavClose"}
        >
          <div className="sidenav_top">
            {!sideaNavToggle ? (
              <Link to="/" className="logo">
                <img src={BrandLogo} alt="LOGO" />
              </Link>
            ) : (
              ""
            )}

            <div
              className="menu_icon"
              onClick={() => setSideNavToggle(!sideaNavToggle)}
            >
              {sideaNavToggle ? <CiMenuBurger /> : <CiMenuFries />}
            </div>
          </div>
          <div className="sidemenu_title">
            <h5 id={sideaNavToggle ? "menu_hide" : ""}>Design Your VCard</h5>
            <div className="hand_icon" id={sideaNavToggle ? "menu_hide" : ""}>
              <FaHandPointDown />
            </div>
          </div>
          <div className="sidenav_menu">
            <div className="menu ver">
              <NavLink
                to={`/${UserName}/uadmin/dashboard`}
                className={
                  window.location.pathname === `/${UserName}/uadmin/dashboard`
                    ? `activeMenu`
                    : ""
                }
              >
                <div className="menu_icon">
                  <FaChartPie />
                </div>

                <p className="menuName" id={sideaNavToggle ? "menu_hide" : ""}>
                  Dashboard
                </p>
              </NavLink>
            </div>
            <div className="menu">
              <NavLink
                to={`/${UserName}/uadmin/VCards`}
                className={
                  window.location.pathname === `/${UserName}/uadmin/VCards` ||
                  window.location.pathname ===
                    `/${UserName}/uadmin/vcard_form_edit/${localStorage.getItem(
                      "URL_Alies"
                    )}` ||
                  window.location.pathname ===
                    `/${UserName}/uadmin/create_new_vcard`
                    ? "activeMenu"
                    : ""
                }
              >
                <div className="menu_icon">
                  <CgWebsite />
                </div>

                <p className="menuName" id={sideaNavToggle ? "menu_hide" : ""}>
                  All VCards
                </p>
              </NavLink>
            </div>
            <div className="menu">
              <NavLink
                to={`/${UserName}/uadmin/Inquries`}
                className={
                  window.location.pathname === `/${UserName}/uadmin/Inquries`
                    ? "activeMenu"
                    : ""
                }
              >
                <div className="menu_icon">
                  <PiSealWarningFill />
                </div>

                <p className="menuName" id={sideaNavToggle ? "menu_hide" : ""}>
                  Inquiries
                </p>
              </NavLink>
            </div>
            <div className="menu">
              <NavLink
                to={`/${UserName}/uadmin/Appoinments`}
                className={
                  window.location.pathname === `/${UserName}/uadmin/Appoinments`
                    ? "activeMenu"
                    : ""
                }
              >
                <div className="menu_icon">
                  <FaCalendarCheck />
                </div>

                <p className="menuName" id={sideaNavToggle ? "menu_hide" : ""}>
                  Appoinments
                </p>
              </NavLink>
            </div>
          </div>
        </div>
        {/* Content */}
        <div
          className={`client_dashboard_content ${
            sideaNavToggle ? "expand_Content" : ""
          }`}
        >
          {FormSubmitLoader ? (
            <div className="form_submit_loader">
              <div className="form_loader"></div>
            </div>
          ) : (
            ""
          )}
          {/* //Profile Onclick Open popUpBox */}
          <div
            className="profile_box"
            id={ProfileCardToggle ? "ProfileCardOpen" : "ProfileCardClose"}
            onMouseEnter={() => setProfileCardToggle(true)}
            onMouseLeave={() => setProfileCardToggle(false)}
          >
            {/* <div className="profile_img">
              {ClientData.Profile != null ? (
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                    ClientData?.Profile
                  }`}
                  alt="logo"
                />
              ) : (
                <img
                  src="https://img.freepik.com/premium-photo/cartoon-character-with-phone-that-says-he-is-holding-phone_706452-5625.jpg?w=826"
                  alt="logo"
                />
              )}
            </div> */}

            <div className="profile_content">
              <div className="name">
                <h5>Hey!,{ClientData?.FullName || "John Wick"}</h5>
              </div>
              <div className="email">
                <small>{ClientData?.Email || "johnwick@gmail.com"}</small>
              </div>
            </div>
            <div className="SignOut">
              <p>
                Get Back Soon! <img src={hand} alt="hand" />
              </p>

              <Link onClick={handleSignOut}>
                <CgLogOut />
                SignOut
              </Link>
            </div>
          </div>

          {/* //TopNavBar */}
          <div className="topNav">
            <div
              className="topNav_menu_icon"
              onClick={() => setSideNavToggle(!sideaNavToggle)}
            >
              {sideaNavToggle ? <CiMenuBurger /> : <CiMenuFries />}
            </div>

            <div className="topNav_right">
              <NavLink to={`/${UserName}/uadmin/setting`} className="setting">
                <IoMdSettings />
              </NavLink>
              <NavLink
                to={`/${UserName}/uadmin/notification`}
                className="notification"
              >
                <IoMdNotifications />
              </NavLink>
              <div className="user_name">
                <h3>{ClientData?.FullName?.split('')[0].toUpperCase() + ClientData?.FullName?.slice(1,100) || "John Wick"}</h3>
              </div>

              <div
                className="profile_logo"
                onMouseEnter={() => setProfileCardToggle(true)}
                onMouseLeave={() => setProfileCardToggle(false)}
              >
                {ClientData.Profile != null ? (
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                      ClientData?.Profile
                    }`}
                    alt="logo"
                  />
                ) : (
                  <img
                    src="https://img.freepik.com/premium-photo/cartoon-character-with-phone-that-says-he-is-holding-phone_706452-5625.jpg?w=826"
                    alt="logo"
                  />
                )}
              </div>
            </div>
          </div>
          {/* //Content Box */}
          <div
            className="content_box"
            onClick={() => setProfileCardToggle(false)}
          >
            {window.location.pathname === `/${UserName}/uadmin/dashboard` ? (
              <User_Dashboard />
            ) : (
              ""
            )}
            {window.location.pathname ===
            `/${UserName}/uadmin/create_new_vcard` ? (
              <VCard_URL_Form />
            ) : (
              ""
            )}
            {window.location.pathname === `/${UserName}/uadmin/VCards` ? (
              <User_VCards />
            ) : (
              ""
            )}
            {window.location.pathname === `/${UserName}/uadmin/Inquries` ? (
              <User_Inquries />
            ) : (
              ""
            )}
            {window.location.pathname === `/${UserName}/uadmin/Appoinments` ? (
              <User_Appoinments />
            ) : (
              ""
            )}
            {window.location.pathname === `/${UserName}/uadmin/setting` ? (
              <User_Setting />
            ) : (
              ""
            )}

            {window.location.pathname === `/${UserName}/uadmin/notification` ? (
              <User_Notification />
            ) : (
              ""
            )}
            {window.location.pathname ==
              `/${UserName}/uadmin/vcard_form_edit/${localStorage.getItem(
                "URL_Alies"
              )}` && `/${UserName}/uadmin/vcard_form_edit/${URL_Alies}` ? (
              <VCard_Form_Edit />
            ) : (
              ""
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="footer">{/* <Footer /> */}</div>
      </div>
    </>
  );
};

export default ClientDashboard;
