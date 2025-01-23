import React, { useContext, useState, useEffect } from "react";
import "./Edit_form_styles/Edit_GoogleMap.scss";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { GoogleMapValidateSchema } from "../../../Helper/GoogleMapValidate";
import axios from "axios";
import step1 from "../../../../assets/GoogleMap_Demo/step1.png";
import step2 from "../../../../assets/GoogleMap_Demo/step2.png";
import step3 from "../../../../assets/GoogleMap_Demo/step3.png";
import step4 from "../../../../assets/GoogleMap_Demo/step4.png";
import step5 from "../../../../assets/GoogleMap_Demo/step5.png";
import step6 from "../../../../assets/GoogleMap_Demo/step6.png";
import step7 from "../../../../assets/GoogleMap_Demo/step7.png";

import * as Yup from "yup";
import { AppContext } from "../../../Context/AppContext";
const Edit_GoogleMap = () => {
  let { URL_Alies } = useParams();
  let googleDemo_Images = [step1, step2, step3, step4, step5, step6, step7];
  let [GoogleMapDemo_Index, setGoogleMapDemo_Index] = useState(0);
  let { Token, currentPlan, setFormSubmitLoader } = useContext(AppContext);

  let [GoogleDemoMapActive, setGoogleDemoMapActive] = useState(false);
  const [key, setKey] = useState(0);
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [GoogleIframe, setGoogleIframe] = useState(null);
  let [GalleryID, setGalleryID] = useState();
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  async function fetchCurrentGoogleMap() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/googlemapDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
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
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
      setFormSubmitLoader(false);
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
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          reloadComponent();

          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setUpdateFormOpen(true);
          setTimeout(() => {
            values.GoogleIframe = "";
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
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
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setUpdateFormOpen(false);
          reloadComponent();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
      setFormSubmitLoader(false);
    }
  }
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  return (
    <>
      <div className="google_map_container">
      <div className="image_title">
          <h4>Live Location</h4>
        </div>
        <div className="note">
          <p>
            <strong>Note :</strong> Add Your Google map Iframe like to showcase
            your live location directly..It will helps to visit client directly
            easily...{" "}
          </p>
        </div>

        <div className="google_map_form">
          {!GoogleDemoMapActive ? (
            <>
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
                      <button
                        className="save"
                        type="submit"
                        onClick={handleGoogleMapUpdate}
                      >
                        Update
                        <span class="material-symbols-outlined">update</span>
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
                <div className="preview">
                  <div className="title">
                    Map Preview<i className="bx bx-map-alt"></i>
                  </div>
                  <div
                    className="google_map"
                    width="100%"
                    height={100}
                    dangerouslySetInnerHTML={{
                      __html: updateFormOpen ?  GoogleIframe : formik.values.GoogleIframe,
                    }}
                  ></div>

                  {/* <iframe
                    src={formik.values.GoogleIframe}
                    width="100%"
                    height={200}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                </div>
              </form>
            </>
          ) : (
            <>
              {/* GoogleMap Demo Images */}

              <div className="googlemap_demo_container">
                <div className="demo_image">
                  <img
                    className={
                      GoogleMapDemo_Index === 4 || GoogleMapDemo_Index === 5
                        ? "lap_view_image"
                        : ""
                    }
                    src={googleDemo_Images[GoogleMapDemo_Index]}
                    alt="image"
                  />
                </div>
              </div>
            </>
          )}

          <div className="description">
            <div className="desc_title">
              How to get GoogleMap IFrame URL ? &nbsp;
              <span className="material-symbols-outlined">code</span>
            </div>
            <div className="step">
              <h5>Step : 1</h5>
              <ul type="square">
                <li>
                  Go to Browser and search{" "}
                  <a href="https://www.google.com/maps" target="_blank">
                    <small
                      onMouseOver={() => {
                        setGoogleDemoMapActive(true), setGoogleMapDemo_Index(0);
                      }}
                      onMouseLeave={() => setGoogleDemoMapActive(false)}
                    >
                      Google Map
                    </small>
                  </a>
                </li>
              </ul>
            </div>
            <div className="step">
              <h5>Step : 2</h5>
              <ul type="square">
                <li>
                  On Search Input fill your locarion name{" "}
                  <a
                    href="https://www.google.com/maps/place/Aristostech+India+Pvt+Ltd+Software+Company+%26+Website+Design+Experts/@13.0442628,80.2342993,17z/data=!3m2!4b1!5s0x3a526650e0eff4ab:0x1b87ddfba9b3cdbe!4m6!3m5!1s0x3a526650e0b6c595:0x4f74ddbff946af6b!8m2!3d13.0442576!4d80.2391702!16s%2Fg%2F11td5r1nkj?entry=ttu"
                    target="_blank"
                  >
                    <small
                      onMouseOver={() => {
                        setGoogleDemoMapActive(true), setGoogleMapDemo_Index(1);
                      }}
                      onMouseLeave={() => setGoogleDemoMapActive(false)}
                    >
                      For Demo Search
                    </small>
                  </a>
                </li>
              </ul>
            </div>
            <div className="step">
              <h5>Step : 3</h5>
              <ul type="square">
                <li>
                  Next on overview session there{" "}
                  <strong>
                    Share<i className="bx bx-share-alt"></i> options
                  </strong>{" "}
                  click it will open popup box..{" "}
                  <small
                    onMouseOver={() => {
                      setGoogleDemoMapActive(true), setGoogleMapDemo_Index(3);
                    }}
                    onMouseLeave={() => setGoogleDemoMapActive(false)}
                  >
                    View Demo Share PopUp
                  </small>
                </li>
              </ul>
            </div>
            <div className="step">
              <h5>Step : 4</h5>
              <ul type="square">
                <li>
                  On Popup Box there is two options there choose second option{" "}
                  <strong>
                    Embed a Map<i className="bx bxs-map"></i>options
                  </strong>{" "}
                  click it after Copy HTML..{" "}
                  <small
                    onMouseOver={() => {
                      setGoogleDemoMapActive(true), setGoogleMapDemo_Index(4);
                    }}
                    onMouseLeave={() => setGoogleDemoMapActive(false)}
                  >
                    View Link option
                  </small>
                </li>
              </ul>
            </div>
            <div className="step">
              <h5>Step : 5</h5>
              <ul type="square">
                <li>
                  After Navigate to Embed Copy HTML..{" "}
                  <small
                    onMouseOver={() => {
                      setGoogleDemoMapActive(true), setGoogleMapDemo_Index(5);
                    }}
                    onMouseLeave={() => setGoogleDemoMapActive(false)}
                  >
                    View Demo Embed Link
                  </small>
                </li>
              </ul>
            </div>
            <div className="step">
              <h5>Final Step</h5>
              <ul type="square">
                <li>Finally paste your Embed Link to we given Input Box!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_GoogleMap;
