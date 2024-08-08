import React, { useState, useContext, useRef, useEffect } from "react";
import "./Edit_form_styles/Edit_BasicForm.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import Context from "../../../../UseContext/Context";
import {
  convertToBase64Banner,
  convertToBase64Profile,
} from "../../../../Helper/convert";
import { useParams } from "react-router-dom";
import { BasicDetailValidateShema } from "../../../../Helper/BasicDetailValiate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
const BasicForm = () => {
  let { URL_Alies } = useParams();
  let { setURL_Alies, FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(Context);

  let [UpdateButtonToggle, setUpdateButtonToggle] = useState(false);
  let [BasicDetailLoader, setBasicDetailLoader] = useState(false);
  const [VCardName, setVCardName] = useState();
  const [Occupation, setOccupation] = useState();
  const [Description, setDescription] = useState();

  const [Profile, setProfile] = useState();

  let [Banner, setBanner] = useState();
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
  async function fetchURL_Form() {
    try {
      setFormSubmitLoader(true);
      api
        .get(`/vcard_URL/specific_vcard/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setURL_Alies(URL_Alies);
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
      console.log(error);
      setFormSubmitLoader(false);
    }
  }
  async function fetchBasicData() {
    try {
      setFormSubmitLoader(true);
      api
        .get(`/basicDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 1) {
            setUpdateButtonToggle(true);
            setFirstName(res.data.data[0].FirstName);
            setLastName(res.data.data[0].LastName);
            setEmail(res.data.data[0].Email);
            setMobileNumber(res.data.data[0].MobileNumber);
            setAlternateEmail(res.data.data[0].AlternateEmail);
            setAlternateMobileNumber(res.data.data[0].AlternateMobileNumber);
            setLocation(res.data.data[0].Location);
            setProfession(res.data.data[0].Profession);
            setInquiryToggleSwitch(res.data.data[0].InquiryToggleSwitch);
            setQRToggleSwitch(res.data.data[0].QRToggleSwitch);
            setAppoinmentToggleSwitch(res.data.data[0].AppoinmentToggleSwitch);
            setAppoinmentToggleSwitch(res.data.data[0].AppoinmentToggleSwitch);
            setFormSubmitLoader(false);
          } else {
            // toast.error('Basic Detail Not Created!');
            setUpdateButtonToggle(false);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }
  useEffect(() => {
    fetchURL_Form();
    fetchBasicData();
  }, [key]);

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
    setFormSubmitLoader(true);
    try {
      api
        .put(`/vcard_URL/update_by_vcardUrl/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleBasicDetailSave(e) {
    setFormSubmitLoader(true);
    e.preventDefault();
    let data = {
      URL_Alies,
      FirstName,
      LastName,
      Email,
      MobileNumber,
      AlternateEmail,
      AlternateMobileNumber,
      Location,
      Profession,
      InquiryToggleSwitch,
      QRToggleSwitch,
      AppoinmentToggleSwitch,
      ContactToggleSwitch,
    };
    await api
      .post(`/basicDetail/${URL_Alies}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      })
      .then((res) => {
        reloadComponent();
        toast.success(res.data.message);
        setFormSubmitLoader(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
        setFormSubmitLoader(false);
      });
  }
  async function handleBasicFormUpdate(e) {
    e.preventDefault();
    let data = {
      FirstName,
      LastName,
      Email,
      MobileNumber,
      AlternateEmail,
      AlternateMobileNumber,
      Location,
      Profession,
      InquiryToggleSwitch,
      QRToggleSwitch,
      AppoinmentToggleSwitch,
      ContactToggleSwitch,
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(`/basicDetail/update_by_vcard_URL/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
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
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

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
  // Handler function for the change event
  const handleProfileTypeChange = (event) => {
    setProfileType(event.target.value);
  };
  // Handler function for the change event
  const handleBannerTypeChange = (event) => {
    setBannerType(event.target.value);
  };
  console.log(ProfileAddress, BannerAddress);
  return (
    <>
      <div className="basicform_container">
        <Toaster position="top-right" />
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

            <div className="form_group">
              <label htmlFor="Description">
                Description<sup>*</sup>
              </label>
              <Editor
                value={Description}
                onTextChange={(e) => setDescription(e.htmlValue)}
                id="Description"
                name="Description"
                style={{ height: "180px" }}
                placeholder="Enter Short Description..!"
              />
            </div>

            <div className="form_group double_col_inputs">
              <div className="image_upload_type">
                <div className="logo_type">
                  <label htmlFor="Profile">Company Logo</label>
                  <select
                    name="ProfileType"
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
                      <img
                        src={
                          Profile != undefined
                            ? Profile
                            : "https://img.freepik.com/free-photo/3d-render-little-boy-with-eyeglasses-blue-shirt_1142-50994.jpg?t=st=1716040955~exp=1716044555~hmac=605273d0e1789be0644e11ceb509699fc6908463eed64554ad5184feb50cc3fa&w=740"
                        }
                        className="Profile"
                        alt="Logo"
                      />
                      {/* <i className="bx bxs-edit"></i> */}
                    </label>
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
                          ProfileAddress != null || ProfileAddress != undefined
                            ? ProfileAddress
                            : ""
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
                  </div>
                )}
                {/* //Banner Type */}
                {BannerType == "ImageUpload" ? (
                  <div className="second">
                    <label htmlFor="Company_Banner">
                      <img
                        src={
                          Banner != null || Banner != undefined
                            ? Banner
                            : "https://img.freepik.com/free-photo/cement-wall-floor-copy-space_53876-30237.jpg?t=st=1716040667~exp=1716044267~hmac=37c1f0faf9137d781a0aa0d1436b486b6e0a620fec789a836ab08533c16cbeeb&w=826"
                        }
                        className="Banner"
                        alt="Banner"
                      />
                      {/* <i className="bx bxs-edit"></i> */}
                    </label>
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
                          BannerAddress != null || BannerAddress != undefined
                            ? BannerAddress
                            : ""
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
                  </div>
                )}
              </div>
            </div>
            <div className="form_submit_actions">
              <button className="save" type="submit">
                Update
              </button>
            </div>
          </form>
          <form
            onSubmit={
              UpdateButtonToggle ? handleBasicFormUpdate : formik.handleSubmit
            }
            className="Form2"
          >
            <div className="form2_title">
              <h4>VCard Details</h4>
            </div>
            <div className="form_group">
              <label htmlFor="FirstName">
                First Name<sup>*</sup>
              </label>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                placeholder="Enter Your FirstName"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setFirstName(e.target.value)
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? FirstName : formik.values.FirstName}
                // className={
                //   formik.errors.FirstName && formik.touched.FirstName
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? "":   <div className="error">{formik.errors.FirstName}</div> }
      
            </div>
            <div className="form_group">
              <label htmlFor="lastName">
                Last Name<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your LastName"
                name="LastName"
                id="LastName"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setLastName(e.target.value)
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? LastName : formik.values.LastName}
                // className={
                //   formik.errors.LastName && formik.touched.LastName
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? "":    <div className="error">{formik.errors.LastName}</div>}
      
            </div>
            <div className="form_group">
              <label htmlFor="email">
                Email<sup>*</sup>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="Email"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setEmail(e.target.value)
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? Email : formik.values.Email}
                // className={
                //   formik.errors.Email && formik.touched.Email
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? '':    <div className="error">{formik.errors.Email}</div> }
          
            </div>
            <div className="form_group">
              <label htmlFor="email">
                Phone Number<sup>*</sup>
              </label>
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                name="MobileNumber"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setMobileNumber(e.target.value)
                    : formik.handleChange
                }
                value={
                  UpdateButtonToggle ? MobileNumber : formik.values.MobileNumber
                }
                // className={
                //   formik.errors.MobileNumber && formik.touched.MobileNumber
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? '': <div className="error">{formik.errors.MobileNumber}</div>}
              
            </div>
            <div className="form_group">
              <label htmlFor="alternateEmail">Alternate Email</label>
              <input
                type="email"
                placeholder="Alternate Email"
                name="AlternateEmail"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setAlternateEmail(e.target.value)
                    : formik.handleChange
                }
                value={
                  UpdateButtonToggle
                    ? AlternateEmail
                    : formik.values.AlternateEmail
                }
                // className={
                //   formik.errors.AlternateEmail && formik.touched.AlternateEmail
                //     ? "input_error"
                //     : "input_success"
                // }
              />
            </div>
            <div className="form_group">
              <label htmlFor="alternateEmail">Alternate Phone</label>
              <input
                type="tel"
                placeholder="Alternate Phone"
                onChange={
                  UpdateButtonToggle
                    ? (e) => setAlternateMobileNumber(e.target.value)
                    : formik.handleChange
                }
                value={
                  UpdateButtonToggle
                    ? AlternateMobileNumber
                    : formik.values.AlternateMobileNumber
                }
              />
            </div>
            <div className="form_group">
              <label htmlFor="location">
                Location<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Location"
                name="Location"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setLocation(e.target.value)
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? Location : formik.values.Location}
         
                // className={
                //   formik.errors.Location && formik.touched.Location
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? "": <div className="error">{formik.errors.Location}</div>}
          
            </div>
            <div className="form_group">
              <label htmlFor="job">
                Your Profession<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Job Title"
                name="Profession"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setProfession(e.target.value)
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? Profession : formik.values.Profession}
            

                // className={
                //   formik.errors.Profession && formik.touched.Profession
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? "": <div className="error">{formik.errors.Profession}</div>}
             
            </div>

            {/* <div className="actions">
              <p>Enable Inquiry Form :</p>
              <input
                id="InquiryToggleSwitch"
                name="InquiryToggleSwitch"
                type="checkbox"
                checked={InquiryToggleSwitch}
                onClick={() => setInquiryToggleSwitch(!InquiryToggleSwitch)}
              />
            </div>
            <div className="actions">
              <p>Enable QR Code :</p>
              <input
                id="QRToggleSwitch"
                name="QRToggleSwitch"
                type="checkbox"
                checked={QRToggleSwitch}
                onClick={() => setQRToggleSwitch(!QRToggleSwitch)}
              />
            </div>
            <div className="actions">
              <p>Enable Appoinment:</p>

              <input
                id="AppoinmentToggleSwitch"
                name="AppoinmentToggleSwitch"
                type="checkbox"
                checked={AppoinmentToggleSwitch}
                onClick={() =>
                  setAppoinmentToggleSwitch(!AppoinmentToggleSwitch)
                }
              />
            </div> */}
            {/* <div className="actions">
              <p>Enable Add To Contact:</p>
              <input
                id="ContactToggleSwitch"
                name="ContactToggleSwitch"
                type="checkbox"
                checked={formik.values.ContactToggleSwitch}
                onChange={(e) => formik.setFieldValue('ContactToggleSwitch', e.checked)}
                // checked={ContactToggleSwitch}
                onClick={() => setContactToggleSwitch(!ContactToggleSwitch)}
              />
            </div> */}

            <div className="form_submit_actions">
              {UpdateButtonToggle ? (
                <button className="save" type="submit">
                  Update
                </button>
              ) : (
                <button className="save" type="submit">
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicForm;
