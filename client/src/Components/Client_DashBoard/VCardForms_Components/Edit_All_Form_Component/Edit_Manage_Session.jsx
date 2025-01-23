import React, { useEffect, useState, useContext } from "react";
import "./Edit_form_styles/Edit_Manage_Session.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { AppContext } from "../../../Context/AppContext";
const Edit_Manage_Session = () => {
  let [ManageSessionToggle, setManageSessionToggle] = useState(false);

  let [BannerToggle, setBannerToggle] = useState(true);
  let [BussinessHourToggle, setBussinessHourToggle] = useState(true);
  let [GoogleMapToggle, setGoogleMapToggle] = useState(true);
  let [AppoinmentToggle, setAppoinmentToggle] = useState(true);
  let [ServiceToggle, setServiceToggle] = useState(true);
  let [ProductToggle, setProductToggle] = useState(true);
  let [GalleryToggle, setGalleryToggle] = useState(true);
  let [TestimonialToggle, setTestimonialToggle] = useState(true);
  let [BankDetailToggle, setBankDetailToggle] = useState(true);
  let [FeedbackFormToggle, setFeedbackFormToggle] = useState(true);
  let [InquiryFormToggle, setInquiryFormToggle] = useState(true);
  let [SocialMediaToggle, setSocialMediaToggle] = useState(true);
  let [ContactDetailsToggle, setContactDetailsToggle] = useState(true);

  const [key, setKey] = useState(0);
  let { URL_Alies } = useParams();

  let {
    Token,

    setFormSubmitLoader,

    setErrorMessage,

    setErrorPopupOpen,
  } = useContext(AppContext);
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchCurrentManageContent() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/manageContent/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            setManageSessionToggle(true);
          } else {
            setManageSessionToggle(false);
          }

          setFormSubmitLoader(false);
          setBannerToggle(res.data.data[0].BannerActive);
          setBussinessHourToggle(res.data.data[0].BussinessHour);
          setAppoinmentToggle(res.data.data[0].Appoinment);
          setServiceToggle(res.data.data[0].Service);
          setProductToggle(res.data.data[0].Product);
          setGalleryToggle(res.data.data[0].Gallery);
          setTestimonialToggle(res.data.data[0].Testimonial);
          setBankDetailToggle(res.data.data[0].BankDetail);
          setFeedbackFormToggle(res.data.data[0].FeedbackForm);
          setGoogleMapToggle(res.data.data[0].GoogleMap);
          setInquiryFormToggle(res.data.data[0].InquiryForm);
          setSocialMediaToggle(res.data.data[0].SocialMedia);
          setContactDetailsToggle(res.data.data[0].ContactDetails);
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

  useEffect(() => {
    fetchCurrentManageContent();
  }, [key]);
  async function handleManageContentrSubmit(e) {
    e.preventDefault();
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
      BankDetail: BankDetailToggle,
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
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);

          toast.success(res.data.message);
          setManageSessionToggle(true);
          reloadComponent();
        })
        .catch((error) => {
          console.log(error);
          setManageSessionToggle(false);
          setFormSubmitLoader(false);
          setErrorPopupOpen(true);
          setErrorMessage(error.response.data.message);
          setTimeout(() => {
            setErrorPopupOpen(false);
          }, 3000);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }
  async function handleManageContentUpdate(e) {
    e.preventDefault();
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
      BankDetail: BankDetailToggle,
      FeedbackForm: FeedbackFormToggle,
      InquiryForm: InquiryFormToggle,
      ContactDetails: ContactDetailsToggle,
      SocialMedia: SocialMediaToggle,
    };
    try {
      await api
        .put(`/manageContent/update/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
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
  return (
    <>
      <div className="manage_container">
        <div className="title">
          <h6>Manage Your Sessions</h6>
          <div className="note">
            <small>
              <span>Note :</span>It will help you to{" "}
              <span>Show (or) Remove </span>your specific session on your{" "}
              <span>VCard Website</span>..
            </small>
          </div>
        </div>

        <div className="all_session_box">
          <div className="session">
            <div className="checkbox">
              {BannerToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setBannerToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setBannerToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>PopUp Banner</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {BussinessHourToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setBussinessHourToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setBussinessHourToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Bussiness Hour</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {GoogleMapToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setGoogleMapToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setGoogleMapToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Google Live Map</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {AppoinmentToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setAppoinmentToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setAppoinmentToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Appoinment Form</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {ServiceToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setServiceToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setServiceToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Service</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {ProductToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setProductToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setProductToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Product</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {GalleryToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setGalleryToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setGalleryToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Gallery's</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {TestimonialToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setTestimonialToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setTestimonialToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Testimonial</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {BankDetailToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setBankDetailToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setBankDetailToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>BankDetail</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {FeedbackFormToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setFeedbackFormToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setFeedbackFormToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Feedback Form</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {InquiryFormToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setInquiryFormToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setInquiryFormToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Inquiry Form</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {SocialMediaToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setSocialMediaToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setSocialMediaToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>SocialMedia</p>
            </div>
          </div>
          <div className="session">
            <div className="checkbox">
              {ContactDetailsToggle ? (
                <i
                  className="bx bxs-checkbox-checked on"
                  onClick={() => setContactDetailsToggle(false)}
                ></i>
              ) : (
                <i
                  className="bx bxs-checkbox off"
                  onClick={() => setContactDetailsToggle(true)}
                ></i>
              )}
            </div>
            <div className="session_name">
              <p>Contact Details</p>
            </div>
          </div>
        </div>
        <div className="submit_actions">
          <div className="save">
            {ManageSessionToggle ? (
              <button type="submit" onClick={handleManageContentUpdate}>
                Update
              </button>
            ) : (
              <button type="submit" onClick={handleManageContentrSubmit}>
                Save
              </button>
            )}
          </div>
          <div className="discard">
            <button>Discard</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Manage_Session;
