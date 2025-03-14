import React, { useState, useContext, useRef, useEffect } from "react";
import "./Styles/VCard_URL_Form.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
// import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
  convertToBase64Banner,
  convertToBase64Profile,
} from "../../Helper/convert";
import { useNavigate } from "react-router-dom";
import { VCardURLValidateShema } from "../../Helper/VCard_URL";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";
const VCard_URL_Form = () => {
  let navigate = useNavigate();
  let {
    FormSubmitLoader,
    setFormSubmitLoader,
    UserName,
    Token,
    URL_Alies,
    setURL_Alies,
  } = useContext(AppContext);

  let [Check_All_URL_Alies, setCheck_All_URL_Alies] = useState([]);

  let [URL_error_toggle, setURL_error_toggle] = useState();
  let [BasicDetailLoader, setBasicDetailLoader] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [VCardName, setVCardName] = useState();
  const [Description, setDescription] = useState("");
  const [Profile, setProfile] = useState();
  const [preview, setPreview] = useState();
  let [Banner, setBanner] = useState();
  const [BannerPreview, setBannerPreview] = useState();
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const onUploadProfile = async (e) => {
    let base64 = await convertToBase64Profile(e.target.files[0]);

    setProfile(base64);
  };
  const onUploadBanner = async (e) => {
    let base64 = await convertToBase64Banner(e.target.files[0]);

    setBanner(base64);
  };
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  useEffect(() => {
    api
      .get("/vcard_url")
      .then((res) => {
        setCheck_All_URL_Alies(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let formik = useFormik({
    initialValues: {
      UserName: UserName,
      URL_Alies: URL_Alies,
      VCardName: "",
      BussinessType: "",
      FirstName: "",
      LastName: "",
      Profession: "",
      Profile: "",
      ProfileType: "ImageUpload",
      BannerType: "ImageUpload",
      ProfileAddress: "",
      BannerAddress: "",
      Banner: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: VCardURLValidateShema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("Profile", Profile);
      formData.append("Banner", Banner);
      formData.append("URL_Alies", values.URL_Alies);
      formData.append("VCardName", values.VCardName);
      formData.append("BussinessType", values.BussinessType);
      formData.append("FirstName", values.FirstName);
      formData.append("LastName", values.LastName);
      formData.append("Profession", values.Profession);
      formData.append("BannerType", values.BannerType);
      formData.append("ProfileType", values.ProfileType);
      formData.append("ProfileAddress", values.ProfileAddress);
      formData.append("BannerAddress", values.BannerAddress);

      await api
        .post("/vcard_url", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setURL_Alies(res.data?.data?.URL_Alies);
          localStorage.setItem("URL_Alies", res.data.data.URL_Alies);
          if (status == "successfull") {
            setShowForm("Basic Detail");
          }

          setTimeout(() => {
            navigate(
              `/${UserName}/uadmin/vcard_form_edit/${res.data.data.URL_Alies}`
            );
          }, 1000);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    },
  });

  // Handle file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);

    setPreview(URL.createObjectURL(file)); // Show a preview of the image
    formik.setFieldValue("Profile", preview);
  };
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);

    setBannerPreview(URL.createObjectURL(file)); // Show a preview of the image
    formik.setFieldValue("Banner", BannerPreview);
  };

  async function handleURLErrorHandling() {
    {
      Check_All_URL_Alies.length == 0 || Check_All_URL_Alies.length > 0
        ? Check_All_URL_Alies.map((data, index) => {
            if (data.URL_Alies === formik.values.URL_Alies) {
              return setURL_error_toggle("failure");
            } else if (formik.values.URL_Alies.length > 4) {
              return setURL_error_toggle("success");
            } else if (
              formik.values.URL_Alies.length <= 4 &&
              formik.values.URL_Alies.length > 0
            ) {
              return setURL_error_toggle("required");
            } else if (formik.values.URL_Alies.length <= 0) {
              return setURL_error_toggle("empty");
            } else {
              return;
            }
          })
        : "";
    }
  }

  useEffect(() => {
    handleURLErrorHandling();
  }, [formik.values.URL_Alies]);

  return (
    <>
      <div className="new_Vcard_url_container">
        <div className="new_vcardurl_row_one">
          <div className="title">
            <h5>Create Your New VCard</h5>
          </div>
        </div>
        <div className="close_new_vcardurl_page">
          <button
            type="button"
            onClick={() => navigate(`/${UserName}/uadmin/VCards`)}
          >
            Back<i className="bx bx-exit"></i>
          </button>
        </div>
        <div className="new_vcardURL_container_box">
          {/* Tooltip */}
          {tooltip ? (
            <div className="tooltip_banner">
              <div className="content">
                <small>
                  The main URL that your VCard is going to be able accessed
                  from.
                </small>

                <p>
                  <strong>Ex :</strong>&nbsp;https://myvirtualcard.in/
                  {formik.values.URL_Alies}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="form_group">
              <label htmlFor="URL_Alies">
                VCard URL <sup>*</sup>
                <div
                  className="note"
                  onMouseEnter={() => setTooltip(true)}
                  onMouseLeave={() => setTooltip(false)}
                >
                  <i className="bx bx-question-mark "></i>
                </div>
              </label>
              <input
                type="text"
                placeholder="Enter VCard URL"
                name="URL_Alies"
                id="URL_Alies"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.URL_Alies}
                className={
                  formik.errors.URL_Alies && formik.touched.URL_Alies
                    ? "input_error"
                    : "input_success"
                }
              />
              <div className="error">{formik.errors.URL_Alies}</div>
              <div className="url_error_handle">
                {URL_error_toggle == "success" && (
                  <div className="success">
                    <i class="bx bxs-check-circle"></i>
                    <small>Site name is available</small>
                  </div>
                )}
                {URL_error_toggle == "failure" && (
                  <div className="failure">
                    <i className="uil uil-times-circle"></i>
                    <small>Site name is not available!</small>
                  </div>
                )}
                {URL_error_toggle == "required" && (
                  <div className="failure">
                    <i className="uil uil-times-circle"></i>
                    <small>Site name must be 5 char!</small>
                  </div>
                )}
              </div>
            </div>

            <div className="form_group double_input">
              <label htmlFor="VCardName">
                Bussiness Type <sup>*</sup>
              </label>
              <div className="double_input">
                <select
                  className={`VCardName ${
                    formik.errors.VCardName && formik.touched.VCardName
                      ? "input_error"
                      : "input_success"
                  }`}
                  name="VCardName"
                  id="VCardName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.VCardName}
                >
                  <option value="" label="Select Your Vcard Type" />
                  <option value="Software_Developer">Software_Developer</option>
                  <option value="Real_Estate">Real_Estate_Bussiness</option>
                  <option value="Software_Company">Software_Company</option>
                  <option value="Small_Scale_Shop">Small_Scale_Shop</option>
                  <option value="Medical_Field">Medical_Field</option>
                  <option value="Hardware_Shop">Hardware_Shop</option>
                  <option value="Electrical_Shop">Electrical_Shop</option>
                  <option value="Plumber_or_Fitter">Plumber_or_Fitter</option>
                  <option value="Grocery_Store">Grocery_Store</option>
                  <option value="Mobile_Store">Mobile_Store</option>
                  <option value="Cloth_Shop">Cloth_Shop</option>
                  <option
                    value="Others"
                    style={{ backgroundColor: "gray", color: "#fff" }}
                  >
                    Others...
                  </option>
                </select>
                {formik.values.VCardName == "Others" ? (
                  <input
                    type="text"
                    placeholder="Enter Your Bussiness Type"
                    name="BussinessType"
                    id="BussinessType"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.BussinessType}
                    className={
                      formik.errors.BussinessType &&
                      formik.touched.BussinessType
                        ? "input_error"
                        : "input_success"
                    }
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="error">{formik.errors.VCardName}</div>
            </div>

            <div className="form_group">
              <label htmlFor="FirstName">
                FirstName<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your FirstName"
                name="FirstName"
                id="FirstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.FirstName}
                className={
                  formik.errors.FirstName && formik.touched.FirstName
                    ? "input_error"
                    : "input_success"
                }
              />
              <div className="error">{formik.errors.FirstName}</div>
            </div>
            <div className="form_group">
              <label htmlFor="LastName">
                LastName<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your LastName"
                name="LastName"
                id="LastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.LastName}
                className={
                  formik.errors.LastName && formik.touched.LastName
                    ? "input_error"
                    : "input_success"
                }
              />
              <div className="error">{formik.errors.LastName}</div>
            </div>
            <div className="form_group profession">
              <label htmlFor="LastName">
                Company Name (or) Your Profession<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your Profession"
                name="Profession"
                id="Profession"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.Profession}
                className={
                  formik.errors.Profession && formik.touched.Profession
                    ? "input_error"
                    : "input_success"
                }
              />
              <div className="error">{formik.errors.Profession}</div>
            </div>
            <div className="form_group image_col_inputs">
              <div className="image_upload_type">
                <div className="logo_type">
                  <label htmlFor="Profile">Company Logo</label>
                  <select
                    name="ProfileType"
                    id="ProfileType"
                    onChange={formik.handleChange}
                    value={formik.values.ProfileType}
                  >
                    <option value="ImageUpload">ImageUpload</option>
                    <option value="Paste_ImageAddress">
                      Paste_ImageAddress
                    </option>
                  </select>
                </div>
              </div>

              <div className="images">
                {/* LogoType */}
                {formik.values.ProfileType == "ImageUpload" ? (
                  <div className="first">
                    <label htmlFor="Logo">
                      {preview == null ? (
                        <img
                          src={
                            Profile != undefined
                              ? Profile
                              : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                          }
                          className="Profile"
                          alt="Logo"
                        />
                      ) : (
                        <img
                          src={
                            preview != null
                              ? preview
                              : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                          }
                          className="Profile"
                          alt="Logo"
                        />
                      )}
                    </label>
                    <p>
                      <strong>Note :</strong> Max file size limit 3MB
                    </p>
                    <small>Allowed file types: png, jpg, jpeg.</small>
                    <input
                      // onChange={onUploadProfile}

                      name="Profile"
                      id="Profile"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      // onBlur={formik.handleBlur}
                    />
                    <div className="profile_error">{formik.errors.Profile}</div>
                  </div>
                ) : (
                  <div className="form_group url_link_input_group">
                    <label htmlFor="VCardName">Logo Imagess Address</label>
                    <img
                      src={
                        formik.values.ProfileAddress.length > 0
                          ? formik.values.ProfileAddress
                          : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                      }
                      alt="ProfileAddress"
                    />
                    <input
                      type="text"
                      placeholder="Paste Your Image Address!"
                      name="ProfileAddress"
                      id="ProfileAddress"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.ProfileAddress}
                      className={
                        formik.errors.ProfileAddress &&
                        formik.touched.ProfileAddress
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    <div className="clear_action">
                      {/* <button
                        className="clear_btn"
                        type="button"
                        onClick={()=>formik.values.ProfileAddress.length = 0}
                      >
                        clear
                      </button> */}
                    </div>
                    <div className="error">{formik.errors.ProfileAddress}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="form_group image_col_inputs">
              <div className="image_upload_type">
                <div className="banner_type">
                  <label htmlFor="Banner">Company Banner</label>
                  <select
                    name="BannerType"
                    id="BannerType"
                    onChange={formik.handleChange}
                    value={formik.values.BannerType}
                  >
                    <option value="ImageUpload">ImageUpload</option>
                    <option value="Paste_ImageAddress">
                      Paste_ImageAddress
                    </option>
                  </select>
                </div>
              </div>

              <div className="images">
                {/* //Banner Type */}
                {formik.values.BannerType == "ImageUpload" ? (
                  <div className="second">
                    <label htmlFor="Company_Banner">
                      {BannerPreview == null ? (
                        <img
                          src={
                            Banner != null && Banner.length > 0
                              ? Banner
                              : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                          }
                          className="Banner"
                          alt="Banner"
                        />
                      ) : (
                        <img
                          src={
                            BannerPreview != null
                              ? BannerPreview
                              : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                          }
                          className="Banner"
                          alt="Banner"
                        />
                      )}
                    </label>
                    <p>
                      <strong>Note :</strong> Max file size limit 3MB
                    </p>
                    <small>Allowed file types: png, jpg, jpeg.</small>
                    <input
                      type="file"
                      name="Banner"
                      id="Banner"
                      accept="image/*"
                      onChange={handleBannerChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="banner_error">{formik.errors.Banner}</div>
                  </div>
                ) : (
                  <div className="form_group url_link_input_group">
                    <label htmlFor="VCardName">Banner Imagess Address</label>
                    <img
                      src={
                        formik.values.BannerAddress.length > 0
                          ? formik.values.BannerAddress
                          : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                      }
                      className="banner_address_image"
                    />
                    <input
                      type="text"
                      placeholder="Paste Your Banner Address!"
                      name="BannerAddress"
                      id="BannerAddress"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.BannerAddress}
                      className={
                        formik.errors.BannerAddress &&
                        formik.touched.BannerAddress
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    {/* <div className="clear_action">
                      <button
                        className="clear_btn"
                        type="button"
                        onClick={() => {formik.values.BannerAddress.length = 0}}
                      >
                        clear
                      </button>
                    </div> */}
                    <div className="error">{formik.errors.BannerAddress}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="form_submit_actions">
              <button className="save" type="submit">
                Save<i className="bx bxs-save"></i>
              </button>

              <button
                className="discard"
                type="button"
                onClick={formik.handleReset}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VCard_URL_Form;
