import React, { useState, useContext, useRef, useEffect } from "react";
import "../Edit_All_Form_Component/Edit_form_styles/Edit_ContactDetails.scss";
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
const Edit_ContactDetails = () => {
  let { URL_Alies } = useParams();
  let {
    setURL_Alies,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
    successMessage,
    setShowForm,
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
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

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
    fetchBasicData();
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
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          // toast.success(res.data.message);
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
          setTimeout(()=>{
            setShowForm('Social Link - Website')
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
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
          handleManageContentSubmit();
          reloadComponent();
          setTimeout(()=>{
            setShowForm('Social Link - Website')
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });




  return (
    <>
      <div className="contactForm_container">
        <div className="ContactForm_container_box">
        <div className="form2_title">
              <h4>VCard Details</h4>
            </div>
          <form
            onSubmit={
              UpdateButtonToggle ? handleBasicFormUpdate : formik.handleSubmit
            }
            className="Form2"
          >
      
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
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.FirstName}</div>
              )}
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
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.LastName}</div>
              )}
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
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.Email}</div>
              )}
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
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.MobileNumber}</div>
              )}
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
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.AlternateEmail}</div>
              )}
            </div>
            {/* <div className="form_group">
              <label htmlFor="alternateEmail">Alternate Phone</label>
              <input
                id="AlternateMobileNumber"
                name="AlternateMobileNumber"
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
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">
                  {formik.errors.AlternateMobileNumber}
                </div>
              )}
            </div> */}
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
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.Location}</div>
              )}
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
                value={
                  UpdateButtonToggle ? Profession : formik.values.Profession
                }

                // className={
                //   formik.errors.Profession && formik.touched.Profession
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.Profession}</div>
              )}
            </div>

            <div className="form_submit_actions">
              {UpdateButtonToggle ? (
                <button className="save" type="submit">
                  Update<span class="material-symbols-outlined">update</span>
                </button>
              ) : (
                <button className="save" type="submit">
                  Save<i className='bx bxs-save'></i>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit_ContactDetails;
