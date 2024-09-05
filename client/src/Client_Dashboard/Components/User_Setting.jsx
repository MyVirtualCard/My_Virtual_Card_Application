import React, { useContext, useState } from "react";
import "./Styles/User_Setting.scss";

import { ImProfile } from "react-icons/im";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Context from "../../Context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
const User_Setting = () => {
  let {
    user,
    userName,
    registeredData,
    setRegisteredData,
    VCardCount,
    setVCardCount,
  } = useContext(Context);
  let navigate = useNavigate();
  let [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  // Handle file selection
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    setPreview(URL.createObjectURL(file)); // Show a preview of the image
  };
  //Server ApI
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  //Update Register Data
  let formik = useFormik({
    initialValues: {
      profile: `${import.meta.env.VITE_APP_BACKEND_API_URL}/uploads/${
        registeredData?.profile?.filename
      }}`,
      userName: registeredData?.userName,
      firstName: registeredData?.firstName,
      lastName: registeredData?.lastName,
      mobileNumber: registeredData?.mobileNumber,
      email: registeredData?.email,
      location: registeredData?.location,
    },
    validateOnBlur: false,
    validateOnChange: false,
    // validationSchema: RegisterValidateSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("profile", profile);
      formData.append("userName", values.userName);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("location", values.location);
      await api
        .put(
          `/api/user/register_specific_data/${registeredData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);

          setTimeout(() => {
            navigate(`/${userName}/uadmin/VCards`);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    },
  });
  return (
    <>
      <div className="setting_container">
        <div className="setting_title">
          <h3>Your Settings</h3>

          <Link to={`/${userName}/uadmin/dashboard`}>
            Back <FaArrowRightFromBracket />
          </Link>
        </div>

        <div className="setting_box">
          <div className="setting_sideNav">
            <div className="sidenav_title">
              {VCardCount.length > 0 ? (
                <>
                  {VCardCount.map((data, index) => {
                    return (
                      <>
                        {data.ProfileType == "Paste_ImageAddress" ? (
                          <img
                            src={
                              data.ProfileAddress.length > 0 &&
                              data.ProfileAddress != undefined
                                ? data.ProfileAddress
                                : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                            }
                            alt="profile"
                            key={index}
                          />
                        ) : (
                          ""
                        )}
                        {data.ProfileType == "ImageUpload" ? (
                          <img
                            src={`${
                              import.meta.env.VITE_APP_BACKEND_API_URL
                            }/uploads/Basic_Image/${data?.Profile?.filename}`}
                            alt="profile"
                            key={index}
                          />
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/uploads/${
                      registeredData?.profile?.filename
                    }`}
                    alt="logo"
                  />
                </>
              )}

              <h4>{registeredData.firstName || "John Wick"}</h4>
            </div>
            <div className="setting_menu">
              <div className="menu">
                <NavLink>
                  <div className="menu_icon">
                    <ImProfile />
                  </div>

                  <p className="menuName">Profile</p>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="setting_content">
            {/* Profile_update */}
            <div className="Profile_update_container">
              <div className="Profile_update_title">
                <h4>Update Your Details!</h4>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="form_group">
                  <label htmlFor="profile">
                    {preview == null ? (
                      <img
                        src={`${
                          import.meta.env.VITE_APP_BACKEND_API_URL
                        }/uploads/${registeredData?.profile?.filename}`}
                        alt="profile"
                      />
                    ) : (
                      <img src={preview} alt="profile" />
                    )}
                  </label>

                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    onChange={handleProfileImageChange}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="firstName">FullName</label>
                  <div className="input_field">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="FirstName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="LastName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="email">Email</label>
                  <div className="input_field">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter Your Email"
                      value={formik.values.email}
                    />
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <div className="input_field">
                    <input
                      type="tel"
                      name="mobileNumber"
                      id="mobileNumber"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter Your MobileNumber"
                      value={formik.values.mobileNumber}
                    />
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="location">Location</label>
                  <div className="input_field">
                    <input
                      type="text"
                      name="location"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      id="location"
                      placeholder="Enter Your Location"
                      value={formik.values.location}
                    />
                  </div>
                </div>
                <div className="form_actions">
                  <div className="update">
                    <button type="submit">
                      Update <RxUpdate />
                    </button>
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

export default User_Setting;
