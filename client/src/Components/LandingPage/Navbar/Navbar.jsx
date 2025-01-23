import React, { useContext, useRef, useState } from "react";
import "./Navbar.scss";
import brand_logo from "../../../assets/Brand_Logo/BrandLogo2.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Element, animateScroll as scroll } from "react-scroll";
import { FiLogIn } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { RxCross1, RxDropdownMenu, RxHamburgerMenu } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { BiUnderline } from "react-icons/bi";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
const Navbar = ({
  HomeRef,
  StaticVcardRef,
  PriceRef,
  DynamicVcardRef,
  FeatureRef,
  NFCRef,
  FAQRef,
  ServiceRef,
  scrollToElement,
  setActiveMenu,
  ActiveMenu,
}) => {
  let navigate = useNavigate();
  let [OpenSideMenu, setOpenSideMenu] = useState(false);
  let {ResellerUserName,UserName, UserData, setUserData, backendUrl, setIsLoggedIn } =
    useContext(AppContext);

  const LogOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="navbar_container">
      <div className="nav_row">
        <div className="colum-1">
          <div className="logo">
            <img src={brand_logo} alt="logo" />
          </div>

          <div className="hamburger">
            {OpenSideMenu ? (
              <div className="icon" onClick={() => setOpenSideMenu(false)}>
                <RxCross1 />
              </div>
            ) : (
              <div className="icon" onClick={() => setOpenSideMenu(true)}>
                <RxHamburgerMenu />
              </div>
            )}
          </div>
        </div>
        <div className="colum-2">
          <ul
            className={`nav_links ${
              OpenSideMenu ? "SideMenuOpen" : "SideMenuClose"
            }`}
          >
            <li>
              <Link
                onClick={() => {
                  scrollToElement(HomeRef),
                    setActiveMenu("Session_1"),
                    setOpenSideMenu(false);
                }}
                className={ActiveMenu == "Session_1" ? "activeMenu" : ""}
              >
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  scrollToElement(StaticVcardRef),
                    setActiveMenu("Session_2"),
                    setOpenSideMenu(false);
                }}
                className={ActiveMenu == "Session_2" ? "activeMenu" : ""}
              >
                <p>Static-VCard's</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  scrollToElement(PriceRef),
                    setActiveMenu("Session_3"),
                    setOpenSideMenu(false);
                }}
                className={ActiveMenu == "Session_3" ? "activeMenu" : ""}
              >
                <p>Subscribe</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  scrollToElement(DynamicVcardRef),
                    setActiveMenu("Session_4"),
                    setOpenSideMenu(false);
                }}
                className={ActiveMenu == "Session_4" ? "activeMenu" : ""}
              >
                <p>Dynamic-VCard's</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  scrollToElement(FeatureRef),
                    setActiveMenu("Session_5"),
                    setOpenSideMenu(false);
                }}
                className={ActiveMenu == "Session_5" ? "activeMenu" : ""}
              >
                <p>Feature</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  scrollToElement(NFCRef),
                    setActiveMenu("Session_6"),
                    setOpenSideMenu(false);
                }}
                className={ActiveMenu == "Session_6" ? "activeMenu" : ""}
              >
                <p>NFC</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  scrollToElement(ServiceRef),
                    setActiveMenu("Session_8"),
                    setOpenSideMenu(false);
                }}
                className={ActiveMenu == "Session_8" ? "activeMenu" : ""}
              >
                <p>Service</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  scrollToElement(FAQRef),
                    setActiveMenu("Session_7"),
                    setOpenSideMenu(false);
                }}
                className={ActiveMenu == "Session_7" ? "activeMenu" : ""}
              >
                <p>FAQS</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="column_3">
          {UserName == undefined && ResellerUserName == undefined ? (
            <NavLink to={"/login"} className="auth">
              <button>Login </button>
              <div className="icon">
                <FiLogIn />
              </div>
            </NavLink>
          ) : (
            ""
          )}

          {/* {UserData === false ? (
            <NavLink to={"/register"} className="auth">
              <button>Register </button>
              <div className="icon">
                <FaRegUser />
              </div>
            </NavLink>
          ) : (
            ""
          )} */}

          {/* {UserData !== false ? (
            <NavLink
              to={`/${UserData.UserName}/uadmin/VCards`}
              className="user"
            >
              <button>{UserData.UserName}</button>
              <div className="icon">
                <MdDashboard />
              </div>
            </NavLink>
          ) : (
            ""
          )} */}
   {UserName == undefined && ResellerUserName == undefined ? (
            <NavLink to={"/register"} className="auth">
              <button>Register </button>
              <div className="icon">
                <FaRegUser />
              </div>
            </NavLink>
          ) : (
            <>
              {UserName == undefined ? (
                <NavLink to={`/${ResellerUserName}/re-seller/users`} className='user'>
                  <button>{ResellerUserName}</button>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                </NavLink>
              ) : (
                <NavLink to={`/${UserName}/uadmin/VCards`} className='user'>
                  <button>{UserName}</button>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                </NavLink>
              )}
            </>
          )}
          <div className="hamburger">
            {OpenSideMenu ? (
              <div className="icon" onClick={() => setOpenSideMenu(false)}>
                <RxCross1 />
              </div>
            ) : (
              <div className="icon" onClick={() => setOpenSideMenu(true)}>
                <RxHamburgerMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
