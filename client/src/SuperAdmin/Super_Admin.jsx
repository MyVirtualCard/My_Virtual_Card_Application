import React, { useContext, useEffect, useState } from "react";
import "./Super_Admin.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import BrandLogo from "../assets/Client_Dashboard/BrandLogo.png";
import logo from "../assets/Fallback/Triangle_logo.png";
import hand from "../assets/Client_Dashboard/hand.png";
import { IoMdSettings } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { SiCodesignal } from "react-icons/si";
import { MdSpaceDashboard } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaS, FaUserGroup, FaUsers } from "react-icons/fa6";
import { GiCometSpark } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { PiSealWarningFill } from "react-icons/pi";

import { FaChartPie } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";
import { toast } from "react-toastify";
import Context from "../Context/GlobalContext";
import axios from "axios";

import { Helmet } from "react-helmet";
import Users from "./Components/Users";
import Vcards from "./Components/Vcards";

const Super_Admin = () => {
  let navigate = useNavigate();
  let {
    URL_Alies,
    setURL_Alies,
    userName,
    user,
    setUser,
    registeredData,
    setRegisteredData,
    FormSubmitLoader,
    status,
    setFormSubmitLoader,
    VCardCount,
    setVCardCount,
  } = useContext(Context);

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

  //Fetch Register Data:
  let getSpecificUserData = async () => {
    try {
      const response = await api.get(
        `/api/user/register_specific_data/${userName}`
      );
      const data = response.data.data;
      setRegisteredData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpecificUserData();
  }, [navigate]);
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  //LogOut user
  let handleSignOut = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("datas");
      localStorage.removeItem("userName");
      toast.success("LogOut successfully");
      setUser(null);
      setTimeout(() => {
        navigate("/");
        reloadComponent();
        // window.location.pathname = "/";
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="client_Dashboard_container">
        <Helmet>
          <title>MyVirtualCard-Super_Admin</title>
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

          <div className="sadmin_sidenav_menu">
            <div className="menu ver">
              <NavLink
                to={`/sadmin/users`}
                className={
                  window.location.pathname === `/sadmin/users` || window.location.pathname === `/sadmin`
                    ? `activeMenu`
                    : ""
                }
              >
                <div className="menu_icon">
                  <FaUsers />
                </div>

                <p className="menuName" id={sideaNavToggle ? "menu_hide" : ""}>
                  Users
                </p>
              </NavLink>
            </div>
            <div className="menu">
              <NavLink
                to={`/sadmin/vcards`}
                className={
                  window.location.pathname === `/sadmin/vcards`
                    ? "activeMenu"
                    : ""
                }
              >
                <div className="menu_icon">
                  <CgWebsite />
                </div>

                <p className="menuName" id={sideaNavToggle ? "menu_hide" : ""}>
                  Created VCards
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
          >
            {VCardCount.length > 0 ? (
              <>
                {VCardCount.map((data, index) => {
                  return (
                    <>
                      <div className="profile_img" key={index}>
                        <div key={index}>
                          {data.ProfileType == "Paste_ImageAddress" ? (
                            <img
                              src={
                                data.ProfileAddress.length > 0 &&
                                data.ProfileAddress != undefined
                                  ? data.ProfileAddress
                                  : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                              }
                              alt="profile"
                            />
                          ) : (
                            ""
                          )}
                          {data.ProfileType == "ImageUpload" ? (
                            <img
                              src={`${
                                import.meta.env.VITE_APP_BACKEND_API_URL
                              }/${data.Profile}`}
                              alt="profile"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <div className="profile_img">
                  {registeredData?.profile ? (
                    <img
                      src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                        registeredData?.profile
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
              </>
            )}

            <div className="profile_content">
              <div className="name">
                <h5>Aristostech India Pvt Ltd</h5>
              </div>
              <div className="email">
                <small>aristostechteam@gmail.com</small>
              </div>
            </div>
            <div className="SignOut">
              <p>
                Get Back Soon! <img src={hand} alt="hand" />
              </p>

              <Link to={'/'}>
                <CgLogOut />
                Back To Home
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
            {/* //TopNavBar */}
            <div className="topNav_right">
              {/* <NavLink to={`/${userName}/uadmin/setting`} className="setting">
                <IoMdSettings />
              </NavLink>
              <NavLink
                to={`/${userName}/uadmin/notification`}
                className="notification"
              >
                <IoMdNotifications />
              </NavLink> */}
              <div className="user_name">
                <h3>Super Admin</h3>
              </div>

              <div
                className="profile_logo"
                onClick={() => setProfileCardToggle(!ProfileCardToggle)}
              >
                <img
                  src={logo}
                  alt="logo"
                />
              </div>
            </div>
          </div>
          {/* //Content Box */}
          <div
            className="content_box"
            onClick={() => setProfileCardToggle(false)}
          >
            {window.location.pathname === `/sadmin/users` || window.location.pathname === `/sadmin` ? <Users /> : ""}
            {window.location.pathname === `/sadmin/vcards` ? <Vcards /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Super_Admin;
