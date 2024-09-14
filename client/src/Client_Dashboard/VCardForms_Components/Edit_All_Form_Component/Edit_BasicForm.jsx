import React, { useState, useContext, useRef, useEffect } from "react";
import "./Edit_form_styles/Edit_BasicForm.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import Context from "../../../Context/GlobalContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useParams } from "react-router-dom";
import { BasicDetailValidateShema } from "../../../Helper/BasicDetailValiate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Bounce } from "react-toastify";
const BasicForm = () => {
  let { URL_Alies } = useParams();
  let {
    user,
    setURL_Alies,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
    successMessage,
    setSuccessMessage,
    successPopupOpen,
    setSuccessPopupOpen,
    errorMessage,
    setErrorMessage,
    errorPopupOpen,
    setErrorPopupOpen,
  } = useContext(Context);

  let [UpdateButtonToggle, setUpdateButtonToggle] = useState(false);
  let [BasicDetailLoader, setBasicDetailLoader] = useState(false);
  const [VCardName, setVCardName] = useState();
  const [Occupation, setOccupation] = useState();
  const [Description, setDescription] = useState();
  //Editor
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const [Profile, setProfile] = useState();
  const [ProfilePreview, setProfilePreview] = useState(null);
  let [Banner, setBanner] = useState();
  const [BannerPreview, setBannerPreview] = useState(null);
  let [BannerName, setBannerName] = useState("");
  let [FirstName, setFirstName] = useState();
  let [LastName, setLastName] = useState();
  let [Email, setEmail] = useState();
  let [MobileNumber, setMobileNumber] = useState();
  let [AlternateEmail, setAlternateEmail] = useState();
  let [AlternateMobileNumber, setAlternateMobileNumber] = useState();
  let [Location, setLocation] = useState();
  let [Profession, setProfession] = useState();
  let [InquiryToggleSwitch, setInquiryToggleSwitch] = useState(true);
  let [QRToggleSwitch, setQRToggleSwitch] = useState(true);
  let [AppoinmentToggleSwitch, setAppoinmentToggleSwitch] = useState(false);
  let [ContactToggleSwitch, setContactToggleSwitch] = useState(true);
  let [ProfileAddress, setProfileAddress] = useState();
  let [BannerAddress, setBannerAddress] = useState();
  let [ProfileType, setProfileType] = useState();
  let [BannerType, setBannerType] = useState();
  let [imagePath, setImagePath] = useState(null);
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
//Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchURL_Form() {
    try {
      setFormSubmitLoader(true);
      api
        .get(`/vcard_URL/specific_vcard/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setProfilePreview(null);
          setBannerPreview(null);
          setVCardName(res.data.data.VCardName);
          setOccupation(res.data.data.Occupation);
          setDescription(res.data.data.Description);
          setProfile(res.data.data.Profile);
          setBanner(res.data.data.Banner);
          setProfileType(res.data.data.ProfileType);
          setBannerType(res.data.data.BannerType);
          setProfileAddress(res.data.data.ProfileAddress);
          setBannerAddress(res.data.data.BannerAddress);

          setFormSubmitLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      setFormSubmitLoader(false);
    }
  }

  useEffect(() => {
    fetchURL_Form();
  }, [key]);
  let [BannerToggle, setBannerToggle] = useState(true);
  let [BussinessHourToggle, setBussinessHourToggle] = useState(true);
  let [GoogleMapToggle, setGoogleMapToggle] = useState(true);
  let [AppoinmentToggle, setAppoinmentToggle] = useState(true);
  let [ServiceToggle, setServiceToggle] = useState(true);
  let [ProductToggle, setProductToggle] = useState(true);
  let [GalleryToggle, setGalleryToggle] = useState(true);
  let [TestimonialToggle, setTestimonialToggle] = useState(true);
  let [QRCodeToggle, setQRCodeToggle] = useState(true);
  let [FeedbackFormToggle, setFeedbackFormToggle] = useState(true);
  let [InquiryFormToggle, setInquiryFormToggle] = useState(true);
  let [SocialMediaToggle, setSocialMediaToggle] = useState(true);
  let [ContactDetailsToggle, setContactDetailsToggle] = useState(true);
  async function handleManageContentSubmit(e) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      BannerActive: BannerToggle,
      BussinessHour: BussinessHourToggle,
      GoogleMap: GoogleMapToggle,
      Appoinment: AppoinmentToggle,
      Service: ServiceToggle,
      Product: ProductToggle,
      Gallery: GalleryToggle,
      Testimonial: TestimonialToggle,
      QRCode: QRCodeToggle,
      FeedbackForm: FeedbackFormToggle,
      InquiryForm: InquiryFormToggle,
      ContactDetails: ContactDetailsToggle,
      SocialMedia: SocialMediaToggle,
    };
    try {
      await api
        .post(`/manageContent/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          toast.success(res.data.message);
          reloadComponent();
        })
        .catch((error) => {
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }

  async function handleURLFormUpdate(e) {
    e.preventDefault();
    let data = {
      URL_Alies,
      VCardName,
      Description: stripHtmlTags(Description),
      Profile,
      Banner,
      ProfileType,
      BannerType,
      ProfileAddress,
      BannerAddress,
    };
    const formData = new FormData();
    formData.append("Profile", Profile);
    formData.append("Banner", Banner);
    formData.append("URL_Alies", URL_Alies);
    formData.append("VCardName", VCardName);
    formData.append("BannerType", BannerType);
    formData.append("ProfileType", ProfileType);
    formData.append("ProfileAddress", ProfileAddress);
    formData.append("BannerAddress", BannerAddress);
    formData.append("Description", stripHtmlTags(Description));
    setFormSubmitLoader(true);
    try {
      api
        .put(`/vcard_URL/update_by_vcardUrl/${URL_Alies}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          reloadComponent();

          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      FirstName: "",
      LastName: "",
      Email: "",
      MobileNumber: "",
      AlternateEmail: "",
      AlternateMobileNumber: "",
      Location: "",
      Profession: "",
    },

    validationSchema: BasicDetailValidateShema,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      await api
        .post(`/basicDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          reloadComponent();
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });
  // const handleLogoChange = (event) => {
  //   const Profile = event.currentTarget.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(Profile);
  //   reader.onload = () => {
  //     formik.setFieldValue("Profile", reader.result);
  //     setProfile(reader.result);
  //   };
  // };
  // const handleBannerChange = (event) => {
  //   const Banner = event.currentTarget.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(Banner);
  //   reader.onload = () => {
  //     formik.setFieldValue("Banner", reader.result);
  //     setBanner(reader.result);
  //   };
  // };
  // Handle file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);

    setProfilePreview(URL.createObjectURL(file)); // Show a preview of the image
    formik.setFieldValue("Profile", ProfilePreview);
  };
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);

    setBannerPreview(URL.createObjectURL(file)); // Show a preview of the image
    formik.setFieldValue("Banner", BannerPreview);
  };
  // Handler function for the change event
  const handleProfileTypeChange = (event) => {
    setProfileType(event.target.value);
  };
  // Handler function for the change event
  const handleBannerTypeChange = (event) => {
    setBannerType(event.target.value);
  };

  return (
    <>
      <div className="basicform_container">
        <div className="form1_container_box">
          <form onSubmit={handleURLFormUpdate}>
            <div className="form_group">
              <label htmlFor="URL_Alies">
                VCard URL <sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter VCard URL"
                value={URL_Alies}
                onChange={(e) => setURL_Alies(e.target.value)}
                // {...formik.getFieldProps("URL_Alies", URL_Alies)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="VCardName">
                VCard Name <sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter VCard Name"
                value={VCardName}
                onChange={(e) => setVCardName(e.target.value)}
              />
            </div>

            <div className="form_group description">
              <label htmlFor="Description">
                Description<sup>*</sup>
              </label>
              {/* <Editor
                value={Description}
                onTextChange={(e) => setDescription(e.htmlValue)}
                id="Description"
                name="Description"
                style={{ height: "180px" }}
                placeholder="Enter Short Description..!"
              /> */}
              <ReactQuill
                modules={modules}
                formats={formats}
                theme="snow"
                id="Description"
                name="Description"
                value={Description}
                // onTextChange={(e) => {
                //   formik.setFieldValue("Description", e.htmlValue),
                //     setDescription(e.htmlValue);
                // }}
                onChange={(e) => {
                  setDescription(e);
                }}
                // style={{ height: "180px" }}
                placeholder="Enter Short Description..!"
              />
            </div>

            <div className="form_group double_col_inputs">
              <div className="image_upload_type">
                <div className="logo_type">
                  <label htmlFor="Profile">Company Logo</label>
                  <select
                    name="ProfileType"
                    id="ProfileType"
                    onChange={handleProfileTypeChange}
                    value={ProfileType}
                  >
                    <option>ImageUpload</option>
                    <option>Paste_ImageAddress</option>
                  </select>
                </div>
                <div className="banner_type">
                  <label htmlFor="Banner">Company Banner</label>
                  <select
                    name="BannerType"
                    id="BannerType"
                    onChange={handleBannerTypeChange}
                    value={BannerType}
                  >
                    <option>ImageUpload</option>
                    <option>Paste_ImageAddress</option>
                  </select>
                </div>
              </div>

              <div className="images">
                {/* LogoType */}
                {ProfileType == "ImageUpload" ? (
                  <div className="first">
                    <label htmlFor="Logo">
                      {ProfilePreview == null ? (
                        <img
                          src={`${
                            import.meta.env.VITE_APP_BACKEND_API_URL
                          }/${Profile}`}
                          className="Profile"
                          alt="Profile"
                        />
                      ) : (
                        <img
                          src={
                            ProfilePreview != null
                              ? ProfilePreview
                              : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                          }
                          className="Profile"
                          alt="Logo"
                        />
                      )}

                      <span
                        className="material-symbols-outlined"
                        onClick={() => setProfile(undefined)}
                      >
                        clear_all
                      </span>
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
                  </div>
                ) : (
                  <div className="form_group url_link_input_group">
                    <label htmlFor="VCardName">Paste Logo Image Address</label>
                    {!FormSubmitLoader ? (
                      <img
                        src={
                          ProfileAddress != null &&
                          ProfileAddress != undefined &&
                          ProfileAddress.length > 0
                            ? ProfileAddress
                            : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                        }
                        alt=""
                      />
                    ) : (
                      ""
                    )}

                    <input
                      type="text"
                      placeholder="Paste Your Image Address!"
                      name="ProfileAddress"
                      id="ProfileAddress"
                      value={ProfileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                    />
                    <div className="clear_action">
                      <button
                        className="clear_btn"
                        type="button"
                        onClick={() => setProfileAddress("")}
                      >
                        clear
                      </button>
                    </div>
                  </div>
                )}
                {/* //Banner Type */}
                {BannerType == "ImageUpload" ? (
                  <div className="second">
                    <label htmlFor="Company_Banner">
                      {BannerPreview == null ? (
                        <img
                          src={`${
                            import.meta.env.VITE_APP_BACKEND_API_URL
                          }/${Banner}`}
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

                      <span
                        className="material-symbols-outlined"
                        onClick={() => {
                          setBanner(undefined);
                        }}
                      >
                        clear_all
                      </span>
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
                    />
                  </div>
                ) : (
                  <div className="form_group url_link_input_group">
                    <label htmlFor="VCardName">
                      Paster Banner Image Address
                    </label>
                    {!FormSubmitLoader ? (
                      <img
                        src={
                          BannerAddress != null &&
                          BannerAddress != undefined &&
                          BannerAddress.length > 0
                            ? BannerAddress
                            : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                        }
                        alt=""
                        className="banner_address_image"
                      />
                    ) : (
                      ""
                    )}

                    <input
                      type="text"
                      placeholder="Paste Your Banner Address!"
                      name="BannerAddress"
                      id="BannerAddress"
                      value={BannerAddress}
                      onChange={(e) => setBannerAddress(e.target.value)}
                    />
                    <div className="clear_action">
                      <button
                        className="clear_btn"
                        type="button"
                        onClick={() => setBannerAddress("")}
                      >
                        clear
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="form_submit_actions">
              <button className="save" type="submit">
                Update<span class="material-symbols-outlined">update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicForm;