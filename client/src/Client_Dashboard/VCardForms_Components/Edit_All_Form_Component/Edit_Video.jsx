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
  let [AllVideo, setAllVideo] = useState();
  let [VideoId, setVideoId] = useState();
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [videoFormOpen, setVideoFormOpen] = useState(false);
  let [GalleryType, setGalleryType] = useState();
  let [GalleryImageURL, setGalleryImageURL] = useState();
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

  let [fullImageToggle, setFullImageToggle] = useState(false);

  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchCurrentGallery() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/videoDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setFormSubmitLoader(false);
          } else {
            setAllVideo(res.data.data);
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
    fetchCurrentGallery();
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
        .post(`/videoDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
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
          formik.values.Video = "";

          setTimeout(() => {
            setVideoFormOpen(false);
            reloadComponent();
          }, 200);
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
  async function handleFullImageShow(id) {
    setFormSubmitLoader(true);
    try {
      api
        .get(`/galleryDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          setFullImageToggle(true);
          setVideo(res.data.data.Video);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleVideoEdit(id) {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/videoDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(true);
          setVideo(res.data.data.Video);
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
    };
    const formData = new FormData();
    formData.append("URL_Alies", URL_Alies);
    formData.append("GalleryImageURL", GalleryImageURL);
    formData.append("GalleryType", GalleryType);
    formData.append("Video", Video);
    try {
      api
        .put(`/videoDetail/updateID/${VideoId}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
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
  async function handleVideoDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/videoDetail/deleteID/${id}`, {
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

  console.log(formik.values.Video.split('/')[3])

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
          {currentPlan === "Basic" && VideoCount != 5 ? (
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
                  Max Video addOn limit :<strong> {VideoCount} / 5</strong>
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

        <div className="All_videos_container">
          {AllVideo != undefined && AllVideo.length != 0 ? (
            <>
              {AllVideo.map((data, index) => {
                return (
                  <div className="video_box" key={index}>
                    <div className="video_header">
                      <h2>Video - {index + 1}</h2>
                    </div>
                    <div className="video">
                    <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${data.Video.split('/')[3]}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                      {/* <div dangerouslySetInnerHTML={{ __html: data.Video }} /> */}
                    </div>
                    <div className="icon_actions">
                      <div className="delete">
                        <i
                          className="bx bx-trash-alt"
                          style={{ color: "red" }}
                          onClick={() => handleVideoDelete(data._id)}
                        ></i>
                        <small>Delete</small>
                      </div>
                      <div className="edit">
                        <i
                          className="bx bx-edit"
                          style={{ color: "#6571FF" }}
                          onClick={() => handleVideoEdit(data._id)}
                        ></i>
                        <small>Edit</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="note">
              <small> Video's not been Added!</small>
            </div>
          )}
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
              <div className="video_show">
                <label htmlFor="video_preview">
                  Video Preview <FaVideo className="icon" />
                </label>
                <div className="video">

                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${formik.values.Video.split('/')[3]}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <div className="video_input">
                <div className="form_group">
                  <label htmlFor="video">
                    Paste Your Youtube URL <sup>*</sup>
                  </label>

                  <input
                    type="text"
                    name="Video"
                    id="Video"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Video}
                    className={
                      formik.errors.Video && formik.touched.Video
                        ? "input_error"
                        : "input_success"
                    }
                    placeholder="Paste Your Youtube Link"
                  />
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
              <p>Update Video</p>
              <i
                className="bx bx-x"
                onClick={() => setUpdateFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={handleGalleryUpdate}>
              <div className="video_show">
                <label htmlFor="video_preview">
                  Video Preview <FaVideo className="icon" />
                </label>
                <div
                  className="video"
                  
                >
                   <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${Video!=null ? Video.split('/')[3] : ''}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <div className="video_input">
                <div className="form_group">
                  <label htmlFor="video">
                    Paste Your Youtube URL <sup>*</sup>
                  </label>
            
                        <input
                    type="text"
                    name="Video"
                    id="Video"
                    value={Video}
                    onChange={(e) => setVideo(e.target.value)}
                   
                    placeholder="Paste Your Youtube Link"
                  />
                </div>

                <div className="form_submit_actions">
                  <div className="save">
                    <button type="submit" disabled={FormSubmitLoader}>
                      Update
                    </button>
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
      </div>
    </>
  );
};

export default Edit_Video;
