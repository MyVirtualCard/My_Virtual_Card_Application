import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import BrandLogo from "../../../assets/LandingPage_image/BrandLogo.png";
import { NavLink, Link } from "react-router-dom";
const Navbar = ({
  HomeRef,
  TemplateRef,
  FeatureRef,
  NFCRef,
  PricingRef,
  FAQRef,
  ContactRef,
}) => {
  let [SideNavToggle, setSideNavToggle] = useState(false);
  let [menuActive, setMenuActive] = useState("Home");


  return (
    <>
      <div className="navbar_container">
        <div className="column1">
          <div className="navbar_logo">
            <img src={BrandLogo} alt="brand_logo" />
          </div>
          <div className="navbar_menu_list">
            <div className="list">
              <ul id={SideNavToggle ? "sideNavActive" : "sideNavDisable"}>
                <p
                  onClick={() => {
                    HomeRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuActive("Home");
                  }}
                >
                  <small></small>
                  <li
                    className="menu"
                    id={menuActive == "Home" ? "active" : ""}
                  >
                    Home
                  </li>
                </p>
                <p
                  onClick={() => {
                    TemplateRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuActive("Templates");
                  }}
                >
                  <li
                    className="menu"
                    id={menuActive == "Templates" ? "active" : ""}
                  >
                    Templates
                  </li>
                </p>
                <p
                  onClick={() => {
                    FeatureRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuActive("Feature");
                  }}
                >
                  <li
                    className="menu"
                    id={menuActive == "Feature" ? "active" : ""}
                  >
                    Feature
                  </li>
                </p>
                <p
                  onClick={() => {
                    NFCRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuActive("NFC");
                  }}
                >
                  <li className="menu" id={menuActive == "NFC" ? "active" : ""}>
                    NFC
                  </li>
                </p>
                <p
                  onClick={() => {
                    PricingRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuActive("Pricing");
                  }}
                >
                  <li
                    className="menu"
                    id={menuActive == "Pricing" ? "active" : ""}
                  >
                    Pricing
                  </li>
                </p>
                <p
                  onClick={() => {
                    FAQRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuActive("FAQs");
                  }}
                >
                  <li
                    className="menu"
                    id={menuActive == "FAQs" ? "active" : ""}
                  >
                    FAQs
                  </li>
                </p>
                <p
                  onClick={() => {
                    ContactRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setMenuActive("Contact");
                  }}
                >
                  <li
                    className="menu"
                    id={menuActive == "Contact" ? "active" : ""}
                  >
                    Contact
                  </li>
                </p>
              </ul>
            </div>
          </div>
        </div>
        <div className="column2">
          <div className="navbar_actions">
            <div className="register_action">
              <Link>
                Register<i className="bx bxs-user-plus"></i>
              </Link>
            </div>
            <div className="login_action">
              <Link>
                Login<i className="bx bx-log-in"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="column3">
          {SideNavToggle ? (
            <i
              className="bx bx-x"
              onClick={() => setSideNavToggle(!SideNavToggle)}
            ></i>
          ) : (
            <i
              className="bx bx-menu-alt-right"
              onClick={() => setSideNavToggle(!SideNavToggle)}
            ></i>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
