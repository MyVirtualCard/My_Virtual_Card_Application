import React, { useContext, useEffect, useState } from "react";
import "./Client_Dashboard.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import BrandLogo from "../assets/Client_Dashboard/BrandLogo.png";
import hand from "../assets/Client_Dashboard/hand.png";
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
import Footer from "./Footer/Footer";
import { FaChartPie } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";
import User_Dashboard from "./Components/User_Dashboard";
import User_VCards from "./Components/User_VCards";
import User_Inquries from "./Components/User_Inquries";
import User_Appoinments from "./Components/User_Appoinments";
import User_Setting from "./Components/User_Setting";
import User_Notification from "./Components/User_Notification";
import { toast } from "react-toastify";
import Context from "../Context/GlobalContext";
import axios from "axios";
import VCard_URL_Form from "./Components/VCard_URL_Form";
import VCard_Form_Edit from "./VCardForms_Components/VCard_Form_Edit";
const Client_Dashboard = () => {
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
    VCardCount, setVCardCount
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
  //LogOut user
  let handleSignOut = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("datas");
      localStorage.removeItem("URL_Alies");
      localStorage.removeItem("userName");
      toast.success("LogOut successfully");
      setTimeout(() => {
        navigate("/");
        // window.location.pathname = "/";
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="client_Dashboard_container">
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
            <div className="icon">
              <SiCodesignal />
            </div>
            <h5 id={sideaNavToggle ? "menu_hide" : ""}>Design Your VCard</h5>
            <div className="hand_icon"  id={sideaNavToggle ? "menu_hide" : ""}>
              <FaHandPointDown/>
            </div>
          </div>
          <div className="sidenav_menu">
            <div className="menu ver">
              <NavLink
                to={`/${userName}/uadmin/dashboard`}
                className={
                  window.location.pathname === `/${userName}/uadmin/dashboard`
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
                to={`/${userName}/uadmin/VCards`}
                className={
                  window.location.pathname === `/${userName}/uadmin/VCards` ||
                  window.location.pathname ===
                    `/${userName}/uadmin/vcard_form_edit/${URL_Alies}` ||
                  window.location.pathname ===
                    `/${userName}/uadmin/create_new_vcard`
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
                to={`/${userName}/uadmin/Inquries`}
                className={
                  window.location.pathname === `/${userName}/uadmin/Inquries`
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
                to={`/${userName}/uadmin/Appoinments`}
                className={
                  window.location.pathname === `/${userName}/uadmin/Appoinments`
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
          >
            {VCardCount.length > 0 ? 
            <>
               {VCardCount.map((data, index) => {
                  return (
                    <>
                      <div
                        className="profile_img"
                        key={index}
                      >
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
                          src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/uploads/Basic_Image/${
                            data?.Profile?.filename
                          }`}
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
            
            :
            
            <>
                <div className="profile_img">
              <img
                src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/uploads/${
                  registeredData?.profile?.filename
                }`}
                alt="logo"
              />
            </div>
            </>
            }
        

            <div className="profile_content">
              <div className="name">
                <h5>{registeredData?.firstName || "John Wick"}</h5>
              </div>
              <div className="email">
                <small>{registeredData?.email || "johnwick@gmail.com"}</small>
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
            {/* //TopNavBar */}
            <div className="topNav_right">
              <NavLink to={`/${userName}/uadmin/setting`} className="setting">
                <IoMdSettings />
              </NavLink>
              <NavLink
                to={`/${userName}/uadmin/notification`}
                className="notification"
              >
                <IoMdNotifications />
              </NavLink>
              <div className="user_name">
                <h3>{registeredData.firstName || "John Wick"}</h3>
              </div>
              {VCardCount.length > 0 ? 
              
              <>
                 {VCardCount.map((data, index) => {
                  return (
                    <>
                      <div
                        className="profile_logo"
                        onClick={() => setProfileCardToggle(!ProfileCardToggle)}
                        key={index}
                      >
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
                          src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/uploads/Basic_Image/${
                            data?.Profile?.filename
                          }`}
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
              
              : 
              
              <div
              className="profile_logo"
              onClick={() => setProfileCardToggle(!ProfileCardToggle)}
            >
              {/* <img
                src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/uploads/${registeredData?.profile?.filename || 'https://img.freepik.com/premium-photo/man-with-his-arms-crossed-shirt-that-says-hes-it_985633-17519.jpg?w=740'}}`}
                alt="logo"
              /> */}
              <img
                src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/uploads/${
                  registeredData?.profile?.filename
                }`}
                alt="logo"
              />
            </div>
              }
         
            </div>
          </div>
          {/* //Content Box */}
          <div
            className="content_box"
            onClick={() => setProfileCardToggle(false)}
          >
            {window.location.pathname === `/${userName}/uadmin/dashboard` ? (
              <User_Dashboard />
            ) : (
              ""
            )}
            {window.location.pathname ===
            `/${userName}/uadmin/create_new_vcard` ? (
              <VCard_URL_Form />
            ) : (
              ""
            )}
            {window.location.pathname === `/${userName}/uadmin/VCards` ? (
              <User_VCards />
            ) : (
              ""
            )}
            {window.location.pathname === `/${userName}/uadmin/Inquries` ? (
              <User_Inquries />
            ) : (
              ""
            )}
            {window.location.pathname === `/${userName}/uadmin/Appoinments` ? (
              <User_Appoinments />
            ) : (
              ""
            )}
            {window.location.pathname === `/${userName}/uadmin/setting` ? (
              <User_Setting />
            ) : (
              ""
            )}

            {window.location.pathname === `/${userName}/uadmin/notification` ? (
              <User_Notification />
            ) : (
              ""
            )}
            {window.location.pathname ==
              `/${userName}/uadmin/vcard_form_edit/${URL_Alies}` ||
            window.location.pathname ==
              `/${userName}/uadmin/vcard_form_edit/${URL_Alies}` ? (
              <VCard_Form_Edit />
            ) : (
              ""
            )}
     
          </div>
        </div>
               {/* Footer */}
               <div className="footer">
              <Footer />
            </div>
      </div>
    </>
  );
};

export default Client_Dashboard;
