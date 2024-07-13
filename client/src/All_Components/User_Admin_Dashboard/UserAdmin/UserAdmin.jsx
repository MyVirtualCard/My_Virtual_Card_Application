import React, { useContext, useState, useEffect } from "react";
import "./UserAdmin.scss";

import Context from "../../UseContext/Context";
import User_Admin_TopNavBar from "../User_Admin_Top_Nav/User_Admin_TopNavBar";
import User_Admin_SideNavBar from "../User_Admin_SideNav/User_Admin_SideNavBar";
import UserAccountSetting from "../User_Profile_Setting/UserAccountSetting";
import User_Dashboard from "../User_Admin_All_Component/User_Dashboard";
import User_VCards from "../User_Admin_All_Component/User_VCards";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
// import { Flip, toast, ToastContainer } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";
import VCard_Form_Edit from "../User_Admin_All_Component/Vcard_Form/VCard_Form_Edit";

import VCard_URL_Form from "../User_Admin_All_Component/VCard_URL_Form";
import Inquiries from "../User_Admin_All_Component/Inquiries";
const UserAdmin = () => {
  let { Index } = useParams();
  let navigate = useNavigate();

  let {
    URL_Alies,
    userData,
    setUserData,
    userName,
    FormSubmitLoader,

    SideNavActions,

    profileOpen,
    setProfileOpen,

    setUser,

  } = useContext(Context);

  let [confirmPassToggle, setConfirmPassToggle] = useState(false);
  let [showPass, setShowPass] = useState(false);

  function showPassFunctionlity() {
    let input = document.querySelector(".changePassInput");
    setShowPass(true);
    input.type = "text";
  }
  function hidePassFunctionlity() {
    let input = document.querySelector(".changePassInput");
    setShowPass(false);
    input.type = "password";
  }
  //LogOut user
  let handleSignOut = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("datas");
      toast.success("LogOut successfully");
      setTimeout(() => {
        setUser(null);
        navigate('/')
        // window.location.pathname = "/";
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  let userDetails = JSON.parse(localStorage.getItem("datas"));
  let localStorageURL = localStorage.getItem("URL_Alies");
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});

  useEffect(() => {

    api.get(`/auth/register/${userDetails.id}`)
      .then((res) => {
        console.log(res)
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

      
  }, []);

  return (
    <>
      <div className="userAdmin_container">
        {FormSubmitLoader ? (
          <div className="form_submit_loader">
            <div className="form_loader"></div>
          </div>
        ) : (
          ""
        )}
        <Toaster position="top-right" />
        <div className="top_navBar">
          <User_Admin_TopNavBar />
        </div>
        <div className="content_box">
          <div
            className="content_left"

            id={!SideNavActions ? "slideNavClose" : "SideNavOpen"}
          >
            <User_Admin_SideNavBar />
          </div>
          <div
            className="content_right"
            onClick={() => {
              setConfirmPassToggle(false), setProfileOpen(false);
            }}
            id={!SideNavActions ? "content_right_expand" : "content_right_minimize"}
          >
            {window.location.pathname === `/${userName}/uadmin/dashboard` ? (
              <User_Dashboard />
            ) : (
              ""
            )}

            {window.location.pathname === `/${userName}/uadmin/user_vcard` ? (
              <User_VCards />
            ) : (
              ""
            )}
             {window.location.pathname === `/${userName}/uadmin/inquiries` ? (
              <Inquiries />
            ) : (
              ""
            )}
            {window.location.pathname ===
            `/${userName}/uadmin/create_new_vcard` ? (
              <VCard_URL_Form />
            ) : (
              ""
            )}

            {/* {window.location.pathname === `/${userName}/uadmin/vcard_form/${URL_Alies}` ? (
              <VCard_Form />
            ) : (
              ""
            )} */}
          
            {window.location.pathname ==
            `/${userName}/uadmin/vcard_form_edit/${URL_Alies}` || window.location.pathname ==
            `/${userName}/uadmin/vcard_form_edit/${localStorageURL}` ? (
              <VCard_Form_Edit />
            ) : (
              ""
            )}
            {window.location.pathname ===
            `/${userName}/uadmin/account_setting` ? (
              <UserAccountSetting />
            ) : (
              ""
            )}
        
          </div>

          {/* //User Profile : */}

          <div className="profile_card" id={!profileOpen ? "profileclose" : ""}>
            <div className="user_details">
              <div className="profile">
                <img
                  src={
                    userData.profile ||
                    "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1715790254~exp=1715793854~hmac=ba7343c32c0eb17b5cadcdddf5f5ea1b4cc7510ce54d4436095344458fedb8ca&w=740"
                  }
                  alt="logo"
                />
              </div>
              <div className="user_name">
                <p>{userData.firstName} {userData.lastName}</p>
                <small>{userData.email}</small>
              </div>
            </div>
            <div className="user_settings">
              <div
                className="list"
                onClick={() => {
                  navigate(`/${userName}/uadmin/account_setting`),
                    // navigate(`${userData.firstName}/uadmin/account_setting`)
                    setProfileOpen(false);
                }}
              >
                <i className="bx bxs-user text-success"></i>

                <p>Account Setting</p>
              </div>

              <div
                className="list"
                onClick={() => {
                  setConfirmPassToggle(true), setProfileOpen(false);
                }}
              >
                <i className="bx bxs-lock text-info"></i>

                <p>Change Password</p>
              </div>

              <div
                className="list"
                // onClick={() => {
                //   setProfileOpen(false);

                // }}
                onClick={handleSignOut}
              >
                <i className="bx bx-log-out-circle text-danger"></i>

                <p>Sign Out</p>
              </div>
            </div>
          </div>
          {/* //Change Passowrd */}

          <div
            className="change_pass_container"
            id={!confirmPassToggle ? "hide" : "show"}
          >
            <div className="box">
              <div className="title">
                <h4>Change Password</h4>
                <i
                  className="bx bx-comment-x"
                  onClick={() => setConfirmPassToggle(false)}
                ></i>
              </div>

              <form action="">
                <div className="form_group">
                  <label htmlFor="currentPass">
                    Current Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="changePassInput"
                  />

                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_group">
                  <label htmlFor="newPass">
                    New Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="changePassInput"
                  />
                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_group">
                  <label htmlFor="confirmPass">
                    Confirm Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="changePassInput"
                  />
                  {showPass ? (
                    <i
                      className="bx bxs-show"
                      onClick={hidePassFunctionlity}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={showPassFunctionlity}
                    ></i>
                  )}
                </div>
                <div className="form_submit">
                  <div className="save">
                    <button> Save</button>
                  </div>
                  <div className="discard">
                    <button>Discard</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdmin;
