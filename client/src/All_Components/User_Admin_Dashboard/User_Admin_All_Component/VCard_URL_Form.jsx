import React, { useState, useContext, useRef, useEffect } from "react";
import "./menuStyles/VCard_URL_Form.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import axios from "axios";
import Context from "../../UseContext/Context";
import {
  convertToBase64Banner,
  convertToBase64Profile,
} from "../../Helper/convert";
import { useNavigate } from "react-router-dom";
import { VCardURLValidateShema } from "../../Helper/VCard_URL";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
const VCard_URL_Form = () => {
  let navigate = useNavigate();
  let { FormSubmitLoader, setFormSubmitLoader, userName } = useContext(Context);

  let [All_URL_Alies, setAll_URL_Alies] = useState([]);
  let [URL_Alies, setURL_Alies] = useState("");
  let [URL_error_toggle, setURL_error_toggle] = useState();
  let [BasicDetailLoader, setBasicDetailLoader] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [VCardName, setVCardName] = useState();
  const [Description, setDescription] = useState();
  const [Profile, setProfile] = useState();
  let [Banner, setBanner] = useState();
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const onUploadProfile = async (e) => {
    let base64 = await convertToBase64Profile(e.target.files[0]);

    setProfile(base64);
  };
  const onUploadBanner = async (e) => {
    let base64 = await convertToBase64Banner(e.target.files[0]);

    setBanner(base64);
  };
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  useEffect(() => {
    api
      .get("/vcard_URL", {
        headers: {
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      })
      .then((res) => {
        setAll_URL_Alies(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      VCardName: "",
      Description: "",
      Profile: "",
      Banner: "",
    },

    validationSchema: VCardURLValidateShema,

    onSubmit: async (values) => {
      values.Description = stripHtmlTags(Description);
      values = Object.assign(values, { Profile: Profile || "" });
      values = Object.assign(values, { Banner: Banner || "" });

      setFormSubmitLoader(true);
      await api
        .post("/vcard_URL", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setURL_Alies(res.data.data.URL_Alies);
          localStorage.setItem("URL_Alies", res.data.data.URL_Alies);
          setTimeout(() => {
            navigate(
              `/${userName}/uadmin/vcard_form_edit/${res.data.data.URL_Alies}`
            );
            //  window.location.pathname = `/${userName}/uadmin/vcard_form_edit/${res.data.data.URL_Alies}`
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
  const handleLogoChange = (event) => {
    const Profile = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(Profile);
    reader.onload = () => {
      formik.setFieldValue("Profile", reader.result);
      setProfile(reader.result);
    };
  };
  const handleBannerChange = (event) => {
    const Banner = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(Banner);
    reader.onload = () => {
      formik.setFieldValue("Banner", reader.result);
      setBanner(reader.result);
    };
  };
  async function handleURLErrorHandling() {
    {
      All_URL_Alies.length == 0 || All_URL_Alies.length > 0
        ? All_URL_Alies.map((data, index) => {
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
            onClick={() => navigate(`/${userName}/uadmin/user_vcard`)}
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
                  {URL_Alies}
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

            <div className="form_group">
              <label htmlFor="VCardName">
                VCard Name <sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter VCard Name"
                name="VCardName"
                id="VCardName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.VCardName}
                className={
                  formik.errors.VCardName && formik.touched.VCardName
                    ? "input_error"
                    : "input_success"
                }
              />
              <div className="error">{formik.errors.VCardName}</div>
            </div>

            <div className="form_group">
              <label htmlFor="Description">
                Description<sup>*</sup>
              </label>
              <Editor
                id="Description"
                name="Description"
              
                value={Description}
                onTextChange={(e) =>
                 { formik.setFieldValue("Description", e.htmlValue),setDescription(e.htmlValue)}
                }
                onBlur={formik.handleBlur}
                style={{ height: "150px" }}
                placeholder="Enter Short Description..!"
                className={
                  formik.errors.Description && formik.touched.Description
                    ? "input_error"
                    : "input_success"
                }
              />
              <div className="desc_error">{formik.errors.Description}</div>
            </div>
            <div className="form_group double_col_inputs">
              <div className="first">
                <label htmlFor="Profile">
                  Company Logo <sup>*</sup>
                </label>
                <label htmlFor="Logo">
                  <img
                    src={
                      Profile != undefined
                        ? Profile
                        : "https://img.freepik.com/free-photo/3d-render-little-boy-with-eyeglasses-blue-shirt_1142-50994.jpg?t=st=1716040955~exp=1716044555~hmac=605273d0e1789be0644e11ceb509699fc6908463eed64554ad5184feb50cc3fa&w=740"
                    }
                    className="Profile"
                    alt="Logo"
                  />
                  <i className="bx bxs-edit"></i>
                </label>
                <small>Allowed file types: png, jpg, jpeg.</small>
                <input
                  // onChange={onUploadProfile}

                  name="Profile"
                  id="Profile"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  onBlur={formik.handleBlur}
                />
                <div className="profile_error">{formik.errors.Profile}</div>
              </div>
              <div className="second">
                <label htmlFor="Banner">
                  Company Banner <sup>*</sup>
                </label>
                <label htmlFor="Company_Banner">
                  <img
                    src={
                      Banner != null
                        ? Banner
                        : "https://img.freepik.com/free-photo/cement-wall-floor-copy-space_53876-30237.jpg?t=st=1716040667~exp=1716044267~hmac=37c1f0faf9137d781a0aa0d1436b486b6e0a620fec789a836ab08533c16cbeeb&w=826"
                    }
                    className="Banner"
                    alt="Banner"
                  />
                  <i className="bx bxs-edit"></i>
                </label>
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
            </div>

            <div className="form_submit_actions">
              <button className="save" type="submit">
                Save
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
