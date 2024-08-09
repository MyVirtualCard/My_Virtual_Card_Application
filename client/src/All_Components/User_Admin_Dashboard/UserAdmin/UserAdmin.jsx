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
import { frame as m } from "framer-motion";
import VCard_URL_Form from "../User_Admin_All_Component/VCard_URL_Form";
import Inquiries from "../User_Admin_All_Component/Inquiries";
import paymentImage from "../../../assets/PaymentPopup/payment1.jpg";
import Confetti from 'react-confetti'
import Appoinment from "../User_Admin_All_Component/Appoinment";
import ProductOrder from "../User_Admin_All_Component/ProductOrder";
const UserAdmin = () => {
  let { Index } = useParams();
  let navigate = useNavigate();
let [pieces,setPieces]=useState(150);

  let {
    URL_Alies, setURL_Alies,
    PaymentSuccessPopup,
    setPaymentSuccessPopup,
    userData,
    setUserData,
    userName,
    FormSubmitLoader,
     setUserName,
    SideNavActions,

    profileOpen,
    setProfileOpen,
    currentTemplate,
    setCurrentTemplate,
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
        navigate("/");
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
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  useEffect(() => {
    api
      .get(`/auth/register/${userName}`)
      .then((res) => {
        console.log(res);
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  let [Seconds, setSeconds] = useState("5");
  useEffect(() => {
    if (Seconds > 0 && PaymentSuccessPopup === true) {  
      const timerId = setTimeout(() => {
        setSeconds(Seconds - 1);  
        setTimeout(()=>{
          setPieces(0)
        },4000)
      }, 1000);
      return () => {
 
        clearTimeout(timerId);
      };
    }
  });

  useEffect(() => {
    try {
      api
        .get(`/templateDetail/specific/${userName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userDetails.token}`,
          },
        })
        .then((res) => {
          setURL_Alies(res.data.data[0].URL_Alies);
          console.log(res.data.data[0]);
          setUserName(res.data.data[0].user)
          setCurrentTemplate(res.data.data[0].currentTemplate);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (Seconds <= 0) {
    window.location.pathname =`${userName}/uadmin/user_vcard`;
    setPaymentSuccessPopup(false);
  }
  return (
    <>
      <div className="userAdmin_container">
        {/* PaymentSuccess Popup */}
        {PaymentSuccessPopup ? (
          <div className="payment_popup_container">
            <div className="popup">
              <div className="left">
                <h3>Your Plan has been Successfully Purchased!</h3>
                <div className="content">
                  <small>
                    Now you proceed to build your Digital VCard Website ..There
                    are lot of feature added on your site ..Like your basic data
                    information , add all your social media link ,your service
                    and products etc....{" "}
                  </small>
                </div>

                <div className="timer_container">
                  <div className="timer_content">
                    <h3>Redirect back to your Dashboard..</h3>
                    <h2>
                      <small>Time remaining :</small>
                      {Seconds}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="right">
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-installment-illustration_23-2149397096.jpg?t=st=1721843233~exp=1721846833~hmac=8163043aca14596ef0924cecf201e2094b81fad4b2fac4cf0c91e20b49d45fb1&w=740"
                  alt="payment"
                />
              </div>
            </div>
            <Confetti gravity={0.2} numberOfPieces={pieces}/>
          </div>
        ) : (
          ""
        )}

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
            id={
              !SideNavActions
                ? "content_right_expand"
                : "content_right_minimize"
            }
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
               {window.location.pathname === `/${userName}/uadmin/product_order` ? (
              <ProductOrder />
            ) : (
              ""
            )}
                   {window.location.pathname === `/${userName}/uadmin/appoinment` ? (
              <Appoinment />
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
              `/${userName}/uadmin/vcard_form_edit/${URL_Alies}` ||
            window.location.pathname ==
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
                <p>
                  {userData.firstName} {userData.lastName}
                </p>
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
