import React, { useState } from "react";
import "./SuperAdmin.scss";
import logo from "../../assets/Brand_Logo/Triangle_logo.png";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Home from "./Pages/Home";
import Clients from "./Pages/Clients";
const SuperAdmin = () => {
  let [ActiveMenu, setActiveMenu] = useState("Home");
  let [ProfilePopup, setProfilePopup] = useState(false);
  const handleActiveMenu = (e) => {
    console.log(e);
    setActiveMenu(e.target.id);
  };

  return (
    <>
      <div className="superAdmin_container">
        <div className="topnav">
          <div className="left">
            <NavLink to={"/"}>
              <ArrowBackIcon />
              <small>Back to Home</small>
            </NavLink>
          </div>
          <div className="right">
            <div className="notify">
              <NotificationsActiveIcon />
            </div>
            <div className="setting">
              <SettingsIcon />
            </div>
          </div>
        </div>
        <div className="superAdmin_content">
          <div className="left_sidenav">
            <div className="header">
              <h4>Super Admin</h4>
            </div>
            <div className="sidenav_item">
              <NavLink
                to={"/super-admin"}
                id="Home"
                onClick={() => setActiveMenu("Home")}
                className={`${ActiveMenu == "Home" ? "active" : "deactive"}`}
              >
                <div className="sidenav_item_icon">
                  <HomeIcon />
                </div>
                <div className="sidenav_item_text">Home</div>
              </NavLink>
              <NavLink
                to={"clients"}
                id="Clients"
                onClick={() => setActiveMenu("Clients")}
                className={`${ActiveMenu == "Clients" ? "active" : ""}`}
              >
                <div className="sidenav_item_icon">
                  <PeopleIcon />
                </div>
                <div className="sidenav_item_text">Clients</div>
              </NavLink>
            </div>
            <div className="profile_details">
              <div className="profile_image">
                <img src={logo} alt="logo" />
              </div>
              <div className="details">
                <h4>John Doe</h4>
                <p>aristostechteam@gmail.com</p>
              </div>
              <div className="icon">
                <MoreVertIcon onClick={() => setProfilePopup(!ProfilePopup)} />
              </div>
              {/* Profilecard */}
              {ProfilePopup ? (
                <div
                  className="profile_card"
                  onClick={() => setProfilePopup(false)}
                >
                  <div className="menus">
                    <div className="menu">
                      <div className="menu_item">
                        <p>Profile</p>
                      </div>
                    </div>
                    <div className="menu">
                      <div className="menu_item">
                        <p>My Account</p>
                      </div>
                    </div>
                    <div className="menu">
                      <div className="menu_item">
                        <p>Settings</p>
                      </div>
                    </div>
                  </div>

                  <div className="logout">
                    <p>LogOut</p>

                    <LogoutIcon />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="right_content">
            <div className="content_header">
              <h2>Dashboard</h2>
              <ArrowForwardIosIcon className="icon" />
              <p>{ActiveMenu}</p>
            </div>
            <div className="menu_page_container">
              {ActiveMenu == "Home" ? (
                <>
                  <Home />
                </>
              ) : (
                ""
              )}
               {ActiveMenu == "Clients" ? (
                <>
                  <Clients />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdmin;
