import React, { useState,useEffect, useRef, useCallback } from "react";
import "./LandingPage.scss";
import './Navbar/Navbar.scss'
import BrandLogo from "../../assets/LandingPage_image/BrandLogo.png";
import Navbar from "./Navbar/Navbar";
import { Link } from "react-router-dom";
const LandingPage = () => {
  let [SideNavToggle, setSideNavToggle] = useState(false);
  let [menuActive, setMenuActive] = useState("Home");
  //Scroll page
  let HomeRef = useRef(null);
  let TemplateRef = useRef(null);
  let FeatureRef = useRef(null);
  let NFCRef = useRef(null);
  let PricingRef = useRef(null);
  let FAQRef = useRef(null);
  let ContactRef = useRef(null);
  // Offer timer
  let [Days, setDays] = useState("00");
  let [Hours, setHours] = useState("00");
  let [Minutes, setMinutes] = useState("00");
  let [Seconds, setSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("July 15, 2024 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        //Stop our timer
        clearInterval(interval.current);
      } else {
        //update our timer
        if (days < 10) {
          setDays("0" + days);
        } else {
          setDays(days);
        }

        if (hours < 10) {
          setHours("0" + hours);
        } else {
          setHours(hours);
        }
        if (minutes < 10) {
          setMinutes("0" + minutes);
        } else {
          setMinutes(minutes);
        }

        if (seconds < 10) {
          setSeconds("0" + seconds);
        } else {
          setSeconds(seconds);
        }
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);


  return (
    <>
      <div className="landingpage_container">
  
          <header>
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
          </header>
      
        <div className="landingpage_container__body">

          <section id='Home' className="landingpage_container__body__page1" ref={HomeRef}>
            {/* //Row1 */}
            <div className="column1_left">
             <div className="column1_heading">
              <h3>Design Your Digital Identity</h3>
              <h5>Introducing Custom vCards</h5>
              <div className="content">
              <i className='bx bxs-customize'></i>
                <p>Customize Your Digital Identity Effortlessly with My Virtual Card!</p>
              </div>
              <div className="content">
                <p>Experience the future of digital ID cards by AristosTech India Pvt Ltd. Simplify identification with our secure virtual solution.</p>
              </div>
              <div className="actions">
                {/* <div className="start" >
                  <Link to="/register">
                    <button>
                      Get Started!<i className="bx bxs-user-plus bx-tada"></i>
                    </button>
                  </Link>
                </div> */}
                <div className="enquiry" >
                  <a href="https://wa.me/9344482370" target="_blank">
                    <button>
                      For Enquiry!<i className="bx bxs-bell-ring bx-tada"></i>
                    </button>
                  </a>
                </div>
              </div>
              {/* //Timer_Box */}

              <div className="offer_container" >
                {/* <img src={offer_sale_gif} alt="" /> */}
                <div className="offer_box">
                  <div className="box">
                    <div className="time_box">
                      <h4>{Days}</h4>
                      <small>Day</small>
                    </div>
                    <i className="bx bxs-chevrons-right bx-flashing"></i>
                    <div className="time_box">
                      <h4>{Hours}</h4>
                      <small>Hours</small>
                    </div>
                    <i className="bx bxs-chevrons-right bx-flashing"></i>
                    <div className="time_box">
                      <h4>{Minutes}</h4>
                      <small>Minutes</small>
                    </div>
                    <i className="bx bxs-chevrons-right bx-flashing"></i>
                    <div className="time_box">
                      <h4>{Seconds}</h4>
                      <small>Seconds</small>
                    </div>
                  </div>
                  <div className="offer">
                    {Hours && Minutes && Days && Minutes !== "00" ? (
                      <div className="prices">
                        <div className="old">
                          <h5>Rs : 730</h5>
                        </div>

                        <div className="new">
                          <h5>Rs : 365</h5>
                        </div>
                      </div>
                    ) : (
                      <div className="prices">
                        <div className="old">
                          <h5
                            style={{ textDecoration: "none", color: "#4c3ce0" }}
                          >
                            Rs : 730
                          </h5>
                        </div>

                        <div className="new">
                          <h5
                            style={{
                              textDecoration: "line-through",
                              color: "red",
                            }}
                          >
                            Rs : 365
                          </h5>
                        </div>
                      </div>
                    )}

                    <div className="discount">
                      <strong>
                        {Hours && Minutes && Days && Minutes !== "00"
                          ? "50% Offer!"
                          : "Plan Expired!"}
                        {Hours && Minutes && Days && Minutes !== "00" ? (
                          <sup>
                            <i class="bx bxs-bell-minus bx-tada"></i>
                          </sup>
                        ) : (
                          <sup>
                            <i
                              className="bx bxs-bell-minus bx-tada"
                              style={{ color: "red" }}
                            ></i>
                          </sup>
                        )}
                      </strong>
                    </div>
                    <div className="actions">
                      {Hours && Minutes && Days && Minutes !== "00" ? (
                        <Link to="/register">
                          <button>Enroll Now!</button>
                        </Link>
                      ) : (
                        <a href="https://wa.me/9344482370" target="_blank">
                          <button>To Get Offer!</button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
             </div>
            </div>
            <div className="column2_right">
  <div className="svg">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,224L80,192C160,160,320,96,480,106.7C640,117,800,203,960,202.7C1120,203,1280,117,1360,74.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
  </div>
            </div>
          </section>
          <section id="Templates"
            className="landingpage_container__body__page2"
            ref={TemplateRef}
            
          >
           
          </section>
          <section id="Feature"
            className="landingpage_container__body__page3"
            ref={FeatureRef}
          >
            Feautures
          </section>
          <section id="NFC"
            className="landingpage_container__body__page4"
            ref={NFCRef}
          >
            NFC
          </section>
          <section id="Pricing"
            className="landingpage_container__body__page5"
            ref={PricingRef}
          >
            Pricing
          </section>
          <section id="FAQs"
            className="landingpage_container__body__page6"
            ref={FAQRef}
          >
            FAQ
          </section>
          <section id="Contact"
            className="landingpage_container__body__page7"
            ref={ContactRef}
          >
            Contact
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
