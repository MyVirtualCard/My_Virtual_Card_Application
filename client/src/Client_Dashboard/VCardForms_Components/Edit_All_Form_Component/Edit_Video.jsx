import React, { useState, useContext, useEffect, useRef } from "react";
import "./Edit_form_styles/Edit_Video.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaVideo } from "react-icons/fa";
import { VideoDetailValidateShema } from "../../../Helper/Video.validate";
import Context from "../../../Context/GlobalContext";
const Edit_Video = () => {
  let { URL_Alies } = useParams();
  let [AllGallery, setAllGallery] = useState();
  let [VideoId, setVideoId] = useState();
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [videoFormOpen, setVideoFormOpen] = useState(false);
  let {
    user,
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    setShowForm,
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
  let [VideoCount, setVideoCount] = useState(0);
  let [Video, setVideo] = useState();
  const [key, setKey] = useState(0);
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchAllVideo() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/galleryDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            // toast.error("No Gallery added!");
            setFormSubmitLoader(false);
          } else {
            setAllGallery(res.data.data);
            setVideoCount(res.data.data.length);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error.message);
      setFormSubmitLoader(false);
    }
  }
  useEffect(() => {
    fetchAllVideo();
  }, [key]);

  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      Video: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: VideoDetailValidateShema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("URL_Alies", URL_Alies);
      formData.append("Video", Video);
      setFormSubmitLoader(true);
      await api
        .post(`/galleryDetail/${URL_Alies}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          if (currentPlan === "Free Plan" && VideoCount == 2) {
            setTimeout(() => {
              setShowForm("Testimonials");
            }, 500);
          }
          if (currentPlan === "Basic" && VideoCount == 4) {
            setTimeout(() => {
              setShowForm("Testimonials");
            }, 500);
          }
          if (currentPlan === "Standard" && VideoCount == 6) {
            setTimeout(() => {
              setShowForm("Testimonials");
            }, 500);
          }
          if (currentPlan === "Enterprises" && VideoCount == 10) {
            setTimeout(() => {
              setShowForm("Testimonials");
            }, 500);
          }
          setFormSubmitLoader(false);
          setVideoCount(++VideoCount);
          setVideo("");

          setTimeout(() => {
            setVideoFormOpen(false);
            reloadComponent();
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setTimeout(() => {
            setVideoFormOpen(false);
          }, 500);
          setFormSubmitLoader(false);
        });
    },
  });

  async function handleGalleryEdit(id) {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/galleryDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(true);

          setVideo(res.data.data.Video);
          setGalleryImageURL(res.data.data.GalleryImageURL);
          setGalleryType(res.data.data.GalleryType);
          setVideoId(res.data.data._id);
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }

  async function handleGalleryUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);

    let data = {
      URL_Alies,
      Video,
      GalleryImageURL,
      GalleryType,
    };
    const formData = new FormData();
    formData.append("URL_Alies", URL_Alies);
    formData.append("GalleryImageURL", GalleryImageURL);
    formData.append("GalleryType", GalleryType);
    formData.append("Video", Video);
    try {
      api
        .put(`/galleryDetail/updateID/${VideoId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
            setGalleryPreview(null);
            setVideo(null);
            setUpdateFormOpen(false);
          }, 1000);
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
  async function handleGalleryDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/galleryDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setVideoCount(--VideoCount);
          setFormSubmitLoader(false);
          reloadComponent();
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
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  return (
    <>
      <div className="update_video_container">
        <div className="plan_title">
          <p>
            <strong>{currentPlan} Plan</strong>&nbsp; Subscribed!
          </p>
        </div>
        <div className="add_new_gallery">
          {currentPlan === "Free Plan" && VideoCount != 2 ? (
            <button onClick={() => setVideoFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Video
            </button>
          ) : (
            ""
          )}
          {currentPlan === "Basic" && VideoCount != 4 ? (
            <button onClick={() => setVideoFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Video
            </button>
          ) : (
            ""
          )}
          {currentPlan === "Standard" && VideoCount != 6 ? (
            <button onClick={() => setVideoFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Video
            </button>
          ) : (
            ""
          )}
          {currentPlan === "Enterprises" && VideoCount != 10 ? (
            <button onClick={() => setVideoFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Video
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="plan_based_service_add_note">
          <div className="note">
            {currentPlan === "Free Plan" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Video addOn limit :<strong> {VideoCount} / 2</strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Basic" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Video addOn limit :<strong> {VideoCount} / 4</strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Standard" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Video addOn limit :<strong> {VideoCount} / 6 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Enterprises" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Video addOn limit :<strong> {VideoCount} / 10 </strong>
                </small>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
    

        {/* //Create New Video Form */}

        <div
          className="create_new_gallerycontainer"
          id={videoFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_gellery_box"
            id={videoFormOpen ? "galleryOpen" : "galleryClose"}
          >
            <div className="title">
              <p>New Video</p>
              <i
                className="bx bx-x"
                onClick={() => setVideoFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div
                className="video_show"
               
              >
                <label htmlFor="video_preview">Video Preview <FaVideo className="icon"/></label>
                 <div className="video" dangerouslySetInnerHTML={{ __html: formik.values.Video }}/>
              </div>
              <div className="video_input">
                <div className="form_group">
                  <label htmlFor="video">
                    Paste Your Youtube Embed Video IFrame <sup>*</sup>
                  </label>
                  <textarea
                    name="Video"
                    id="Video"
                    rows="15"
                    cols="6"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Video}
                    className={
                      formik.errors.Video && formik.touched.Video
                        ? "input_error"
                        : "input_success"
                    }
                    placeholder="Paste Your Youtube Embed frame"
                  ></textarea>
                   <div className="error">{formik.errors.Video}</div>
                </div>

                <div className="form_submit_actions">
                  <div className="save">
                    <button type="submit">Save</button>
                  </div>

                  <div className="discard">
                    <button
                      type="button"
                      onClick={() => setVideoFormOpen(false)}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* //Update New Service Form */}

        <div
          className="update_new_gallerycontainer"
          id={updateFormOpen ? "shadow_background" : ""}
        >
          <div
            className="update_new_gellery_box"
            id={updateFormOpen ? "galleryUpdateOpen" : "galleryUpdateClose"}
          >
            <div className="title">
              <p>Update Gallery</p>
              <i
                className="bx bx-x"
                onClick={() => setUpdateFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={handleGalleryUpdate}>
              <div className="form_group">
                <div className="image_upload_type">
                  <div className="banner_type">
                    <label htmlFor="Service">Gallery Image Upload Type</label>
                    <select
                      name="GalleryType"
                      id="GalleryType"
                      value={GalleryType}
                      onBlur={formik.handleBlur}
                      onChange={(e) => setGalleryType(e.target.value)}
                    >
                      <option value="ImageUpload">ImageUpload</option>
                      <option value="Image_Address_URL">
                        Image_Address_URL
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form_submit_actions">
                <div className="save">
                  <button type="submit" disabled={FormSubmitLoader}>
                    Update
                  </button>
                </div>
                <div className="discard">
                  <button type="button" onClick={() => setVideoFormOpen(false)}>
                    Discard
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Video;
