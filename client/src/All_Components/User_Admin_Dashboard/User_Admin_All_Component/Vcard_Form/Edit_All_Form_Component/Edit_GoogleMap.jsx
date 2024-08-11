import React, { useContext, useState, useEffect } from "react";
import "./Edit_form_styles/Edit_GoogleMap.scss";
import Context from "../../../../UseContext/Context";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { GoogleMapValidateSchema } from "../../../../Helper/GoogleMapValidate";
import axios from "axios";
import * as Yup from "yup";
const Edit_GoogleMap = () => {
  let { URL_Alies } = useParams();
  let {
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
    successMessage,setSuccessMessage,
    successPopupOpen,setSuccessPopupOpen,
    errorMessage,setErrorMessage,
    errorPopupOpen,setErrorPopupOpen,
  } = useContext(Context);
  const [key, setKey] = useState(0);
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [GoogleIframe, setGoogleIframe] = useState(null);
  let [GalleryID, setGalleryID] = useState();
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));

  async function fetchCurrentGoogleMap() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/googlemapDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setFormSubmitLoader(false);
          } else {
            setGoogleIframe(res.data.data[0].GoogleIframe);
            setGalleryID(res.data.data[0]._id);
            setUpdateFormOpen(true);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          setErrorPopupOpen(true);
          setErrorMessage(error.response.data.message);
          setTimeout(()=>{
          setErrorPopupOpen(false)
          },3000)
          setFormSubmitLoader(false);
        });
    } catch (error) {
      setErrorPopupOpen(true);
      setErrorMessage(error.message);
      setTimeout(()=>{
      setErrorPopupOpen(false)
      },3000)

    }
  }
  useEffect(() => {
    fetchCurrentGoogleMap();
  }, [key]);
  //Form Save:
  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      GoogleIframe: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: GoogleMapValidateSchema,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      await api
        .post(`/googlemapDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          setSuccessPopupOpen(true);
          setSuccessMessage(res.data.message);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 3000);

          setFormSubmitLoader(false);
          setUpdateFormOpen(true);
          setTimeout(() => {
            values.GoogleIframe = "";
          }, 2000);
        })
        .catch((error) => {
          setErrorPopupOpen(true);
          setErrorMessage(error.response.data.message);
          setTimeout(()=>{
          setErrorPopupOpen(false)
          },3000)
          setFormSubmitLoader(false);
        });
    },
  });
  async function handleGoogleMapUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies,
      GoogleIframe,
    };
    try {
      api
        .put(`/googlemapDetail/updateID/${GalleryID}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setSuccessPopupOpen(true);
          setSuccessMessage(res.data.message);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 3000);

          setFormSubmitLoader(false);
          setUpdateFormOpen(false);
          reloadComponent();
        })
        .catch((error) => {
          setErrorPopupOpen(true);
          setErrorMessage(error.response.data.message);
          setTimeout(()=>{
          setErrorPopupOpen(false)
          },3000)
          setFormSubmitLoader(false);
        });
    } catch (error) {
      setErrorPopupOpen(true);
      setErrorMessage(error.message);
      setTimeout(()=>{
      setErrorPopupOpen(false)
      },3000)

    }
  }
  return (
    <>
      <div className="google_map_container">
        <div className="google_plan_title">
          <p>
            <strong>{currentPlan} plan </strong>&nbsp; Subscribed!
          </p>
        </div>

        <div className="google_map_form">
          <div className="note">
            <p>
              <strong>Note :</strong> Add Your Google map Iframe like to
              showcase your live location directly..It will helps to visit
              client directly easily...{" "}
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form_group">
              <label className="form_label" htmlFor="GoogleIframe">
                Add Google Map IFrame Link
              </label>
              <textarea
                name="GoogleIframe"
                id="GoogleIframe"
                onBlur={formik.handleBlur}
                onChange={
                  updateFormOpen
                    ? (e) => setGoogleIframe(e.target.value)
                    : formik.handleChange
                }
                value={
                  updateFormOpen ? GoogleIframe : formik.values.GoogleIframe
                }
                className={
                  formik.errors.GoogleIframe && formik.touched.GoogleIframe
                    ? "input_error"
                    : "input_success"
                }
                cols="10"
                rows="9"
                placeholder='Eg:<iframe src="https://www.google.com/maps/embed"></iframe>'
              ></textarea>
              <div className="error">{formik.errors.GoogleIframe}</div>
            </div>

            <div className="form_submit_actions">
              {updateFormOpen ? (
                <div className="save">
                  <button className="save" type="submit" onClick={handleGoogleMapUpdate}>
                  Update<span class="material-symbols-outlined">update</span>
                </button>
                </div>
              ) : (
                <div className="save">
                  <button type="submit">Save</button>
                </div>
              )}

              <div className="discard">
                {updateFormOpen ? (
                  ""
                ) : (
                  <button type="button" onClick={formik.handleReset}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit_GoogleMap;
