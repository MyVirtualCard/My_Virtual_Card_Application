import React, { useContext, useEffect, useState } from "react";
import "./Styles/Clients.scss";
import SearchAppBar from "./Charts/SearchBar";
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import { MdOutlinePersonAddDisabled } from "react-icons/md";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
const Clients = () => {
  let { setFormSubmitLoader } = useContext(AppContext);
  let [ActiveUserMenu, setActiveUserMenu] = useState("All User");
  let [AllClients, setAllClients] = useState([]);
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  useEffect(() => {
    setFormSubmitLoader(true);
    api
      .get(`/api/user/all-data`)
      .then((res) => {
        console.log(res.data);
        setAllClients(res.data.UserData);
        setFormSubmitLoader(false);
      })
      .catch((error) => {
        setFormSubmitLoader(false);
      });
  }, []);

  return (
    <>
      <div className="clients_container">
        <div className="clients_title">All Client List</div>
        <div className="row1">
          <div className="left">
            <SearchAppBar />
          </div>
          <div className="right">
            <div className="menu_btn">
              <button
                className="btn"
                value={"All User"}
                onClick={() => setActiveUserMenu("All User")}
                id={ActiveUserMenu == "All User" ? "active" : ""}
              >
                All User
              </button>
              <button
                className="btn"
                value={"Reseller User"}
                onClick={() => setActiveUserMenu("Reseller User")}
                id={ActiveUserMenu == "Reseller User" ? "active" : ""}
              >
                Reseller User
              </button>
              <button
                className="btn"
                value={"Basic User"}
                onClick={() => setActiveUserMenu("Basic User")}
                id={ActiveUserMenu == "Basic User" ? "active" : ""}
              >
                Basic User
              </button>
              <button
                className="btn"
                value={"Enterprice User"}
                onClick={() => setActiveUserMenu("Enterprice User")}
                id={ActiveUserMenu == "Enterprice User" ? "active" : ""}
              >
                Enterprice User
              </button>
            </div>
          </div>
        </div>
        <div className="row2">
          {ActiveUserMenu === "All User" ? (
            <>
              <div className="users_header">
                <h2>My All Users</h2>
              </div>
              <div className="add_new_user">
                <button>
                  Enroll New User<i className="bx bx-plus"></i>
                </button>
              </div>
              {/* Card Box */}
              <div className="row_2">
                <div className="card_box">
                  <div className="card_title_box">
                    <div className="title">
                      <h4>PROFILE</h4>
                    </div>
                    <div className="title">
                      <h4>FULLNAME</h4>
                    </div>
                    <div className="title">
                      <h4>E-MAIL</h4>
                    </div>
                    <div className="title">
                      <h4>MOBILENUMBER</h4>
                    </div>
                    <div className="title">
                      <h4>PLAN</h4>
                    </div>
                    <div className="title">
                      <h4>IS-VERIFIED</h4>
                    </div>
                    <div className="title">
                      <h4>ACTIONS</h4>
                    </div>
                  </div>
                  {AllClients.length > 0 ? (
                    <>
                      {AllClients.map((data, index) => {
                        return (
                          <div className="card_detail_box" key={index}>
                            <div className="detail">
                              {data.Profile ? (
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_BACKEND_API_URL
                                  }/${data.Profile}`}
                                  alt="profile"
                                />
                              ) : (
                                <img
                                  src="https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                                  alt="profile"
                                />
                              )}
                            </div>
                            <div className="detail">
                              <p>
                                {data.FullName.split("")[0].toUpperCase() +
                                  data.FullName.slice(1, 40)}
                              </p>
                            </div>
                            <div className="detail">{data.Email}</div>
                            <div className="detail">
                              +91 - {data.MobileNumber}
                            </div>
                            <div className="detail">
                               {data.Plan}
                            </div>
                            <div className="detail">
                              {data.isAccountVerified ? (
                               <BsToggleOn className="on"/>
                              ) : (
                                <BsToggleOff className="off"/>
                              )}
                            </div>
                            <div className="detail_actions">
                              <div className="login">
                                <button
                                  onClick={() => setLoginFormToggle(true)}
                                >
                                  <span>Login</span>
                                  <i className="bx bx-log-in"></i>
                                </button>
                              </div>
                              <div
                                className="delete"
                                onClick={() => {
                                  // setVcardDeleteToggle(true);
                                }}
                              >
                                <button>
                                <div className="icon">
                                  <MdOutlinePersonAddDisabled/>
                                </div>

                                <small>Disable</small>
                                </button>
                             
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="card_detail_box_empty">
                      <small>Empty Users!</small>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {ActiveUserMenu === "Reseller User" ? (
            <>
              <div className="data_container">
                <p>Reseller User</p>
              </div>
            </>
          ) : (
            ""
          )}
          {ActiveUserMenu === "Basic User" ? (
            <>
              <div className="data_container">
                <p>Basic User</p>
              </div>
            </>
          ) : (
            ""
          )}
          {ActiveUserMenu === "Enterprice User" ? (
            <>
              <div className="data_container">
                <p>Enterprice User</p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Clients;
