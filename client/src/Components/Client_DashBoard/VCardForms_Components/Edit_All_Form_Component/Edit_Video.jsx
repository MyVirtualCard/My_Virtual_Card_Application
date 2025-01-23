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
import { AppContext } from "../../../Context/AppContext";
const Edit_Video = () => {
  let { URL_Alies } = useParams();
  let [AllVideo, setAllVideo] = useState();
  let [AllLocalVideos, setAllLocalVideos] = useState([]);
  let [AllYoutubeVideos, setAllYoutubeVideos] = useState([]);
  let [VideoId, setVideoId] = useState();
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [videoFormOpen, setVideoFormOpen] = useState(false);

  let {
    Token,
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    setShowForm,
  } = useContext(AppContext);

  let [youtube_videos, setYoutube_videos] = useState();
  let [VideoCount, setVideoCount] = useState(0);
  let [YoutubeVideoCount, setYoutubeVideoCount] = useState(0);
  let [YoutubeId, setYoutubeId] = useState();
  let [Video, setVideo] = useState();
  const [previewURL, setPreviewURL] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [UpdateVideoToggle, setUpdateVideoToggle] = useState(false);
  const [UpdateYoutubeVideoToggle, setUpdateYoutubeVideoToggle] =
    useState(false);
  const [LocalVideoId, setLocalVideoId] = useState();
  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files)); // Store selected files
    setPreviewURL(URL.createObjectURL(e.target.files[0]));
  };
  // Handle file selection
  const handleUpdateFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files)); // Store selected files
    setPreviewURL(URL.createObjectURL(e.target.files[0]));
  };
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchCurrentVideo() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/videoDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setFormSubmitLoader(false);
            setAllLocalVideos([]);
            setAllVideo([]);
          } else {
            setAllLocalVideos(res.data.data[0].videos);
            setAllVideo(res.data.data[0]);
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
  async function fetchYoutubeVideo() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/youtubeDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setFormSubmitLoader(false);
          } else {
            setAllYoutubeVideos(res.data.data);
            setYoutubeVideoCount(res.data.data.length);
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
    fetchCurrentVideo();
    fetchYoutubeVideo();
  }, [FormSubmitLoader]);
  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    setFormSubmitLoader(true);
    if (selectedFiles.length === 0) {
      toast.error("Please select videos to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("videos", file); // Append files under the 'videos' field
    });

    formData.append("URL_Alies", URL_Alies);
    formData.append("youtube_videos", youtube_videos);
    try {
      const response = await api.post(`/videoDetail/${URL_Alies}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      });
      setFormSubmitLoader(false);
      setPreviewURL("");
      setYoutube_videos("");
      setSelectedFiles([]);
      setUpdateVideoToggle(false);
      toast.success("Video uploaded successfully!");
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
      setUpdateVideoToggle(false);
      toast.error(error.response?.data.error);
    }
  };

  // Handle file upload
  const handleUpdate = async () => {
    setFormSubmitLoader(true);
    if (selectedFiles.length === 0) {
      alert("Please select videos to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("id", LocalVideoId);
    selectedFiles.forEach((file) => {
      formData.append("videos", file); // Append files under the 'videos' field
    });
    formData.append("URL_Alies", URL_Alies);

    try {
      await api.put(`/videoDetail/updateID/${AllVideo._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      });
      setFormSubmitLoader(false);
      setPreviewURL("");
      setUpdateVideoToggle(false);
      toast.success("Video Updated successfully!");
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
      setUpdateVideoToggle(false);
      toast.error(error.response?.data.error);
    }
  };

  async function handleLocalVideoDelete(id) {
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/videoDetail/deleteID/${AllVideo._id}`, {
          data: { id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
          // Adding body to the DELETE request
        })
        .then((res) => {
          toast.success(res.data.message);
          setAllLocalVideos(AllLocalVideos.length - 1);
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

  //..........................................................................

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
        .post(`/youtubeDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          if (currentPlan === "Free" && YoutubeVideoCount == 2) {
            setTimeout(() => {
              setShowForm("Testimonials");
            }, 500);
          }
          if (currentPlan === "Basic" && YoutubeVideoCount == 4) {
            setTimeout(() => {
              setShowForm("Testimonials");
            }, 500);
          }
          if (currentPlan === "Standard" && YoutubeVideoCount == 6) {
            setTimeout(() => {
              setShowForm("Testimonials");
            }, 500);
          }
          if (currentPlan === "EnterPrice" && YoutubeVideoCount == 8) {
            setTimeout(() => {
              setShowForm("Testimonials");
            }, 500);
          }
          setFormSubmitLoader(false);
          setYoutubeVideoCount(++YoutubeVideoCount);
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

  async function handleLocalVideoEdit(id) {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/youtubeDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(true);
          setVideo(res.data.data.Video);
          setYoutubeId(res.data.data._id);
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
  console.log(YoutubeId);
  const handleYoutubeUpdate = async (e) => {
    e.preventDefault();
    setFormSubmitLoader(true);
    if (Video.length === 0) {
      toast.error("Make sure you have to paste a url");
      return;
    }

    const formData = new FormData();
    formData.append("URL_Alies", URL_Alies);
    formData.append("Video", Video);

    try {
      await api.put(`/youtubeDetail/updateID/${YoutubeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      });
      setFormSubmitLoader(false);
      setVideo("");
      setYoutubeId("");
      setUpdateYoutubeVideoToggle(false);
      toast.success("Video Updated!");
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
      setUpdateYoutubeVideoToggle(false);
      toast.error(error.response?.data.error);
    }
  };
  async function handleVideoDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/youtubeDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          if (YoutubeVideoCount === 0) {
            AllYoutubeVideos([]);
          } else {
            setYoutubeVideoCount(YoutubeVideoCount - 1);
          }
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
  console.log(Video);

  return (
    <>
      <div className="update_video_container">
        <div className="image_title">
          <h4>Video's</h4>
        </div>

        <div className="container1">
          <div className="left">
            <div className="col-1">
              <div className="title">
                <p>Local Video</p>
              </div>

              <div className="plan_based_service_add_note">
                <div className="note">
                {currentPlan === "Free" ? (
                    <>
                      <i class="bx bx-upload "></i>
                      <small>
                        Max Video addOn limit :
                        <strong> {AllLocalVideos.length} / 5</strong>
                      </small>
                    </>
                  ) : (
                    ""
                  )}
                  {currentPlan === "Basic" ? (
                    <>
                      <i class="bx bx-upload "></i>
                      <small>
                        Max Video addOn limit :
                        <strong> {AllLocalVideos.length} / 5</strong>
                      </small>
                    </>
                  ) : (
                    ""
                  )}

                  {currentPlan === "Standard" ? (
                    <>
                      <i class="bx bx-upload "></i>
                      <small>
                        Max Video addOn limit :
                        <strong> {VideoCount} / 6 </strong>
                      </small>
                    </>
                  ) : (
                    ""
                  )}

                  {currentPlan === "EnterPrice" ? (
                    <>
                      <i class="bx bx-upload "></i>
                      <small>
                        Max Video addOn limit :
                        <strong> {VideoCount} / 8 </strong>
                      </small>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <small>
                Video Preview <i className="bx bxs-videos"></i>
              </small>
              <video src={previewURL} controls width="250" />
              <p>
                <strong>Note :</strong> Max file size limit 10 MB
              </p>
              <small>Allowed file types : mp4</small>
              <input
                type="file"
                accept="video/*"
                id="fileInput"
                onChange={
                  UpdateVideoToggle ? handleUpdateFileChange : handleFileChange
                }
              />
              <div className="form_submit_actions">
                <div className="discard">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewURL("");
                      setSelectedFiles([]);
                    }}
                  >
                    Clear
                  </button>
                </div>
                <div className="save">
                  {UpdateVideoToggle ? (
                    <button type="submit" onClick={handleUpdate}>
                      Update
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="save"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>
              <div className="local_videos">
                {AllLocalVideos.length > 0 ? (
                  <>
                    {AllLocalVideos.map((data, index) => {
                      return (
                        <div className="video_box" key={index}>
                          <div className="video_header">
                            <h2>Video - {index + 1}</h2>
                          </div>
                          <div className="video">
                            <video
                              src={`${
                                import.meta.env.VITE_APP_BACKEND_API_URL
                              }/${data?.path}`}
                              controls
                              width="150"
                            />
                          </div>
                          <div className="icon_actions">
                            <div className="delete">
                              <i
                                className="bx bx-trash-alt"
                                style={{ color: "red" }}
                                onClick={() => handleLocalVideoDelete(data._id)}
                              ></i>
                              <small>Delete</small>
                            </div>
                            <div className="edit">
                              <i
                                className="bx bx-edit"
                                style={{ color: "#6571FF" }}
                                onClick={() => {
                                  setUpdateVideoToggle(true);

                                  setPreviewURL(
                                    `${
                                      import.meta.env.VITE_APP_BACKEND_API_URL
                                    }/${data.path}`
                                  );

                                  setLocalVideoId(data._id);
                                }}
                              ></i>
                              <small>Edit</small>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="no_gallery">
                    <small> Empty Local Video's!</small>
                  </div>
                )}
              </div>
            </div>

            <div className="create_new_gellery_box">
              <div className="title">
                <p>Youtube Video</p>
              </div>
              <div className="plan_based_service_add_note">
                <div className="note">
                {currentPlan === "Free" ? (
                    <>
                      <i class="bx bx-upload "></i>
                      <small>
                        Max Video addOn limit :
                        <strong> {YoutubeVideoCount} / 5</strong>
                      </small>
                    </>
                  ) : (
                    ""
                  )}
                  {currentPlan === "Basic" ? (
                    <>
                      <i class="bx bx-upload "></i>
                      <small>
                        Max Video addOn limit :
                        <strong> {YoutubeVideoCount} / 5</strong>
                      </small>
                    </>
                  ) : (
                    ""
                  )}

                  {currentPlan === "Standard" ? (
                    <>
                      <i class="bx bx-upload "></i>
                      <small>
                        Max Video addOn limit :
                        <strong> {YoutubeVideoCount} / 6 </strong>
                      </small>
                    </>
                  ) : (
                    ""
                  )}

                  {currentPlan === "EnterPrice" ? (
                    <>
                      <i class="bx bx-upload "></i>
                      <small>
                        Max Video addOn limit :
                        <strong> {YoutubeVideoCount} / 8 </strong>
                      </small>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <form
                action=""
                onSubmit={
                  UpdateYoutubeVideoToggle
                    ? handleYoutubeUpdate
                    : formik.handleSubmit
                }
                className="youtube"
              >
                <div className="video_show">
                  <label htmlFor="video_preview">
                    Video Preview <FaVideo className="icon" />
                  </label>
                  <div className="video">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${
                        UpdateYoutubeVideoToggle
                          ? Video?.split("/")[3]
                          : formik.values.Video?.split("/")[3]
                      }`}
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
                      onChange={
                        UpdateYoutubeVideoToggle
                          ? (e) => setVideo(e.target.value)
                          : formik.handleChange
                      }
                      value={
                        UpdateYoutubeVideoToggle ? Video : formik.values.Video
                      }
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
                    <div className="discard">
                      <button type="button" onClick={() => setVideo("")}>
                        Clear
                      </button>
                    </div>
                    <div className="save">
                      {UpdateYoutubeVideoToggle ? (
                        <button>Update</button>
                      ) : (
                        <button type="submit">Upload</button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              <div className="All_videos_container">
                {AllYoutubeVideos.length > 0 ? (
                  <>
                    {AllYoutubeVideos.map((data, index) => {
                      return (
                        <div className="video_box" key={index}>
                          <div className="video_header">
                            <h2>Video - {index + 1}</h2>
                          </div>
                          <div className="video">
                            <iframe
                              width="560"
                              height="315"
                              src={`https://www.youtube.com/embed/${
                                data.Video.split("/")[3]
                              }`}
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowfullscreen
                            ></iframe>
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
                                onClick={() => {
                                  handleLocalVideoEdit(data._id);
                                  setUpdateYoutubeVideoToggle(true);
                                }}
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
                    <small> Empty Youtube Video's!</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Video;
