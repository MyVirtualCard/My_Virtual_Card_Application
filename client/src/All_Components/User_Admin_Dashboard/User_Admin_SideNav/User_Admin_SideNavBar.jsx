import React, { useContext, useEffect } from "react";
import "./User_Admin_SideNavBar.scss";
import Context from "../../UseContext/Context";
import { NavLink, useParams } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import toast from "react-hot-toast";
import axios from "axios";
const User_Admin_SideNavBar = () => {
  let { Index } = useParams();
  let {
    URL_Alies,
    SideNavActions,
    setSideNavActions,
    profileOpen,
    setProfileOpen,
    searchQuery,
    setSearchQuery,
    userName,
  } = useContext(Context);
  let menuList = document.querySelectorAll("#menuName");
  let localStorageURL = localStorage.getItem("URL_Alies");

  return (
    <>
      <div className="user_sidebar_container1">
        <div className="search" id={SideNavActions ? "searchHide" : ""}>
          <input
            type="text"
            placeholder="Search"
            id="search"
            name="search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="bx bx-search"></i>
        </div>

        <div className="uadmin_menus">
          <div className="menu " onClick={() => setSideNavActions(false)}>
            <NavLink
              to={`/${userName}/uadmin/dashboard`}
              className={
                window.location.pathname === `/${userName}/uadmin/dashboard`
                  ? "activeMenu"
                  : ""
              }
            >
              {/* <i className="uil uil-dashboard h-auto  d-flex align-self-center justify-content-center text-primary"></i> */}
              <DashboardIcon className="h-auto  d-flex align-self-center justify-content-center text-primary i" />
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                Dashboard
              </p>
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to={`/${userName}/uadmin/user_vcard`}
              className={
                window.location.pathname === `/${userName}/uadmin/user_vcard` ||
                window.location.pathname ===
                  `/${userName}/uadmin/vcard_form_edit/${localStorageURL}` ||
                window.location.pathname ===
                  `/${userName}/uadmin/create_new_vcard`
                  ? "activeMenu"
                  : ""
              }
            >
              <i className="bx bxs-home-heart h-auto  d-flex align-self-center justify-content-center text-success"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                VCards
              </p>
            </NavLink>
          </div>

          <div className="menu">
            <NavLink
              to={`/${userName}/uadmin/inquiries`}
              className={
                window.location.pathname === `/${userName}/uadmin/inquiries`
                  ? "activeMenu"
                  : ""
              }
            >
              <i className="bx bxs-user-detail h-auto  d-flex align-self-center justify-content-center text-danger"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                Inquries
              </p>
            </NavLink>
          </div>
          {/* <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/vcards'} className={window.location.pathname === '/sadmin/vcards' ?    'activeMenu' : ''}>
          <i className='bx bxs-card h-auto  d-flex align-self-center justify-content-center text-info'></i>
        <p className={SideNavActions ? 'menuNamesHide':''}id='menuName'>VCards</p>
          </NavLink>
    
        </div> */}
          {/* <div className="menu">
          <NavLink onClick={()=>window.location.pathname='/sadmin/sell_NFC_cards'} className={window.location.pathname === '/sadmin/sell_NFC_cards' ?    'activeMenu' : ''}>
          <i className='bx bx-credit-card h-auto  d-flex align-self-center justify-content-center text-primary'></i>
        <p className={SideNavActions ? 'menuNamesHide':''}id='menuName'>Sell NFC Cards</p>
          </NavLink>
   
        </div> */}
          <div className="menu">
            <NavLink
              to='/'
              className={
                window.location.pathname === "/sadmin/vcard_templates"
                  ? "activeMenu"
                  : ""
              }
            >
              <i className="bx bx-id-card h-auto  d-flex align-self-center justify-content-center text-warning"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                Appoinments
              </p>
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
            to='/'
              className={
                window.location.pathname === "/sadmin/cash_payments"
                  ? "activeMenu"
                  : ""
              }
            >
              <i className="bx bx-money h-auto  d-flex align-self-center justify-content-center text-success"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                Product Orders
              </p>
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
                 to='/'
              className={
                window.location.pathname === "/sadmin/subscribed_plans"
                  ? "activeMenu"
                  : ""
              }
            >
              <i className="bx bxs-paper-plane h-auto  d-flex align-self-center justify-content-center text-info"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                Virtual Backgrounds
              </p>
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
                to='/'
              className={
                window.location.pathname === "/sadmin/plans" ? "activeMenu" : ""
              }
            >
              <i className="bx bxs-calendar h-auto  d-flex align-self-center justify-content-center text-primary"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                Affiliations
              </p>
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to='/'
              className={
                window.location.pathname === "/sadmin/withdrawals"
                  ? "activeMenu"
                  : ""
              }
            >
              <i className="bx bx-money-withdraw h-auto  d-flex align-self-center justify-content-center text-danger"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                My NFC Cards
              </p>
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
           to='/'
              className={
                window.location.pathname === "/sadmin/coupon_code"
                  ? "activeMenu"
                  : ""
              }
            >
              <i className="bx bxs-coupon h-auto  d-flex align-self-center justify-content-center text-info"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                Storage
              </p>
            </NavLink>
          </div>

          <div className="menu">
            <NavLink
           to='/'
              className={
                window.location.pathname === "/sadmin/settings"
                  ? "activeMenu"
                  : ""
              }
            >
              <i className="bx bxs-cog h-auto  d-flex align-self-center justify-content-center text-danger"></i>
              <p
                className={SideNavActions ? "menuNamesHide" : ""}
                id="menuName"
              >
                Settings
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_Admin_SideNavBar;
