import React, { useState, useContext, useEffect, useRef } from "react";
import "./Edit_form_styles/Edit_Gallery.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { GalleryValidateShema } from "../../../Helper/GalleryValidate";
import { AppContext } from "../../../Context/AppContext";
const Edit_Gallery = () => {
  let { URL_Alies } = useParams();
  let [AllGallery, setAllGallery] = useState([]);
  let [GalleryId, setGalleryId] = useState();
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [galleryFormOpen, setGalleryFormOpen] = useState(false);
  let [GalleryType, setGalleryType] = useState();
  let [GalleryImageURL, setGalleryImageURL] = useState();
  let {
    Token,
    currentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    setShowForm,
  } = useContext(AppContext);

  let [GalleryCount, setGalleryCount] = useState(0);
  let [GalleryURL, setGalleryURL] = useState();
  let [GalleryImage, setGalleryImage] = useState(null);
  let [GalleryPreview, setGalleryPreview] = useState(null);
  let [GalleryName, setGalleryName] = useState("");
  let [fullImageToggle, setFullImageToggle] = useState(false);
  let [deleteParams, setDeleteParams] = useState();
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
        .get(`/galleryDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            // toast.error("No Gallery added!");
            setFormSubmitLoader(false);
          } else {
            setAllGallery(res.data.data);
            setGalleryCount(res.data.data.length);
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


  const handleGalleryImageChange = (e) => {
    const file = e.target.files[0];
    setGalleryImage(file);
    setGalleryPreview(URL.createObjectURL(file)); // Show a preview of the image
    formik.setFieldValue("GalleryImage", GalleryPreview);
  };
  const handleUpdateGalleryImageChange = (e) => {
    const file = e.target.files[0];
    setGalleryImage(file);
    setGalleryPreview(URL.createObjectURL(file)); // Show a preview of the image
    //  {!updateFormOpen ? formik.setFieldValue("ServiceImage", ServicePreview): setServiceImage(ServicePreview)}
  };
  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      GalleryImageURL: "",
      GalleryType: "ImageUpload",
      GalleryImage: null,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validationSchema: GalleryValidateShema,
    onSubmit: async (values) => {
      // values = await Object.assign(values, {
      //   GalleryImage: GalleryImage || "",
      // });
      const formData = new FormData();
      formData.append("URL_Alies", URL_Alies);
      formData.append("GalleryImageURL", values.GalleryImageURL);
      formData.append("GalleryType", values.GalleryType);
      formData.append("GalleryImage", GalleryImage);
      setFormSubmitLoader(true);
      await api
        .post(`/galleryDetail/${URL_Alies}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          if (currentPlan === "Free" && GalleryCount == 2) {
            setTimeout(() => {
              setShowForm("Videos");
            }, 500);
          }
          if (currentPlan === "Basic" && GalleryCount == 5) {
            setTimeout(() => {
              setShowForm("Videos");
            }, 100);
          }
          if (currentPlan === "Standard" && GalleryCount == 6) {
            setTimeout(() => {
              setShowForm("Videos");
            }, 500);
          }
          if (currentPlan === "EnterPrice" && GalleryCount == 8) {
            setTimeout(() => {
              setShowForm("Videos");
            }, 500);
          }
          setFormSubmitLoader(false);
          setGalleryCount(++GalleryCount);
          setGalleryImage(null);
          setGalleryImageURL = "";
          setGalleryPreview(null);
          values.GalleryImageURL = "";

          setTimeout(() => {
            setGalleryFormOpen(false);
            reloadComponent();
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setTimeout(() => {
            setGalleryFormOpen(false);
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
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          setFullImageToggle(true);
          setGalleryImage(res.data.data.GalleryImage);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleGalleryEdit(id) {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/galleryDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(true);

          setGalleryImage(res.data.data.GalleryImage);
          setGalleryImageURL(res.data.data.GalleryImageURL);
          setGalleryType(res.data.data.GalleryType);
          setGalleryId(res.data.data._id);
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
      GalleryImage,
      GalleryImageURL,
      GalleryType,
    };
    const formData = new FormData();
    formData.append("URL_Alies", URL_Alies);
    formData.append("GalleryImageURL", GalleryImageURL);
    formData.append("GalleryType", GalleryType);
    formData.append("GalleryImage", GalleryImage);
    try {
      api
        .put(`/galleryDetail/updateID/${GalleryId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
            setGalleryPreview(null);
            setGalleryImage(null);
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
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setGalleryCount(--GalleryCount);
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
  async function handleAllImagesDelete() {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/galleryDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          setGalleryCount(0);

          setAllGallery([]);
          reloadComponent();
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
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  return (
    <>
      <div className="update_gallery_container">
        {fullImageToggle ? (
          <div className="Image_Full_view">
            <div
              className="close_image"
              onClick={() => setFullImageToggle(false)}
            >
              <i className="bx bxs-message-square-x"></i>
            </div>
            <img src={GalleryImage} alt="image" />
          </div>
        ) : (
          ""
        )}

        <div className="image_title">
          <h4>Gallery Image's</h4>
        </div>
        <div className="add_new_gallery">
          {currentPlan === "Free" && GalleryCount != 2 ? (
            <button onClick={() => setGalleryFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Gallery
            </button>
          ) : (
            ""
          )}
          {currentPlan === "Basic" && GalleryCount != 5 ? (
            <button onClick={() => setGalleryFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Gallery
            </button>
          ) : (
            ""
          )}
          {currentPlan === "Standard" && GalleryCount != 6 ? (
            <button onClick={() => setGalleryFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Gallery
            </button>
          ) : (
            ""
          )}
          {currentPlan === "EnterPrice" && GalleryCount != 8 ? (
            <button onClick={() => setGalleryFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Gallery
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="plan_based_service_add_note">
          <div className="note">
            {currentPlan === "Free" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Image addOn limit :<strong> {GalleryCount} / 2</strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Basic" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Image addOn limit :<strong> {GalleryCount} / 5</strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Standard" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Image addOn limit :<strong> {GalleryCount} / 6 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Image addOn limit :<strong> {GalleryCount} / 8 </strong>
                </small>
              </>
            ) : (
              ""
            )}
          </div>
   
        </div>

        <div className="All_gallery_container">
          {AllGallery != undefined && AllGallery.length != 0 ? (
            <>
              {AllGallery.map((data, index) => {
                return (
                  <div className="video_box" key={index}>
                    <div className="video_header">
                      <h2>Image - {index + 1}</h2>
                    </div>
                    <div className="video">
                      {data.GalleryType == "ImageUpload" ? (
                        <>
                          {data.GalleryImage ? (
                            // <img
                            //   src={
                            //     data.ServiceImage != undefined
                            //       ? data.ServiceImage
                            //       : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                            //   }
                            //   alt="ServiceImage"
                            //   name="ServiceImage"
                            // />I
                            <img
                              src={`${
                                import.meta.env.VITE_APP_BACKEND_API_URL
                              }/${data.GalleryImage}`}
                              className="GalleryImage"
                              alt="GalleryImage"
                            />
                          ) : (
                            "Null"
                          )}
                          {/* {data.GalleryImage.length != 0 ? (
                                  <img
                                    src={
                                      data.GalleryImage.length != 0
                                        ? data.GalleryImage
                                        : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                                    }
                                    alt="service_image"
                                  />
                                ) : (
                                  "Null"
                                )} */}
                        </>
                      ) : (
                        ""
                      )}

                      {data.GalleryType == "Image_Address_URL" ? (
                        <>
                          {data.GalleryImageURL.length != 0 ? (
                            <img
                              src={
                                data.GalleryImageURL.length != 0
                                  ? data.GalleryImageURL
                                  : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                              }
                              alt="product_image"
                            />
                          ) : (
                            "Null"
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="icon_actions">
                      <div className="delete">
                        <i
                          className="bx bx-trash-alt"
                          style={{ color: "red" }}
                          onClick={() => handleGalleryDelete(data._id)}
                        ></i>
                        <small>Delete</small>
                      </div>
                      <div className="edit">
                        <i
                          className="bx bx-edit"
                          style={{ color: "#6571FF" }}
                          onClick={() => handleGalleryEdit(data._id)}
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
              <small> Image's not been Added!</small>
            </div>
          )}
    
        </div>
        <div className="deleteall_btn">
            {AllGallery.length > 1 ? (
              <button type="button" onClick={handleAllImagesDelete}>
                Delete All<i className="bx bxs-trash"></i>
              </button>
            ) : (
              ""
            )}
          </div>
        {/* //Create New Service Form */}

        <div
          className="create_new_gallerycontainer"
          id={galleryFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_gellery_box"
            id={galleryFormOpen ? "galleryOpen" : "galleryClose"}
          >
            <div className="title">
              <p>New Gallery</p>
              <i
                className="bx bx-x"
                onClick={() => setGalleryFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form_group">
                <div className="image_upload_type">
                  <div className="banner_type">
                    <label htmlFor="Service">Gallery Image Upload Type</label>
                    <select
                      name="GalleryType"
                      id="GalleryType"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.GalleryType}
                    >
                      <option value="ImageUpload">ImageUpload</option>
                      <option value="Image_Address_URL">
                        Image_Address_URL
                      </option>
                    </select>
                  </div>
                </div>
                {formik.values.GalleryType == "ImageUpload" ? (
                  <>
                    <label htmlFor="Image">
                      Choose Your Image<sup>*</sup>
                    </label>
                    <label htmlFor="Image">
                      {GalleryPreview == null ? (
                        <img
                          src={
                            GalleryImage != null || GalleryImage != undefined
                              ? GalleryImage
                              : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                          }
                          alt="Image"
                        />
                      ) : (
                        <img
                          src={
                            GalleryPreview != null
                              ? GalleryPreview
                              : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                          }
                          alt="Image"
                        />
                      )}

                      {/* <i className="bx bxs-edit-location"></i> */}
                    </label>
                    <p>
                      <strong>Note :</strong> Max image size limit 3MB
                    </p>
                    <small>Allowed file types: png, jpg, jpeg.</small>

                    <input
                      type="file"
                      id="GalleryImage"
                      name="GalleryImage"
                      accept="image/*"
                      // onBlur={formik.handleBlur}
                      // onChange={formik.handleChange}
                      // value={formik.values.GalleryImage}
                      className={
                        formik.errors.GalleryImage &&
                        formik.touched.GalleryImage
                          ? "input_error"
                          : "input_success"
                      }
                      onChange={handleGalleryImageChange}
                    />
                    <div className="error">{formik.errors.GalleryImage}</div>
                  </>
                ) : (
                  <div className="form_group url_link_input_group">
                    <img
                      src={
                        formik.values.GalleryImageURL != null &&
                        formik.values.GalleryImageURL != undefined &&
                        formik.values.GalleryImageURL.length > 0
                          ? formik.values.GalleryImageURL
                          : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                      }
                      alt=""
                      className="banner_address_image"
                    />
                    <label htmlFor="GalleryURL">Paste Image Address</label>
                    <input
                      type="text"
                      placeholder="Eg :https://img.asistostech.com/free-photo/"
                      name="GalleryImageURL"
                      id="GalleryImageURL"
                      value={formik.values.GalleryImageURL}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.GalleryImageURL &&
                        formik.touched.GalleryImageURL
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    <div className="url_error">
                      {formik.errors.GalleryImageURL}
                    </div>
                  </div>
                )}
              </div>

              <div className="form_submit_actions">
                {GalleryImage != null ||
                formik.values.GalleryImageURL.length != 0 ? (
                  <div className="save">
                    <button type="submit">Save</button>
                  </div>
                ) : (
                  ""
                )}

                <div className="discard">
                  <button
                    type="button"
                    onClick={() => setGalleryFormOpen(false)}
                  >
                    Discard
                  </button>
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
                {GalleryType == "ImageUpload" ? (
                  <>
                    <label htmlFor="Image">
                      Choose Your Image<sup>*</sup>
                    </label>
                    <label htmlFor="Image">
                      {GalleryPreview == null ? (
                        <img
                          src={`${
                            import.meta.env.VITE_APP_BACKEND_API_URL
                          }/${GalleryImage}`}
                          className="GalleryImage"
                          alt="GalleryImage"
                        />
                      ) : (
                        <img
                          src={GalleryPreview}
                          className="GalleryImage"
                          alt="GalleryImage"
                        />
                      )}

                      {/* <i className="bx bxs-edit-location"></i> */}
                    </label>
                    <p>
                      <strong>Note :</strong> Max image size limit 3MB
                    </p>
                    <small>Allowed file types: png, jpg, jpeg.</small>

                    <input
                      type="file"
                      id="GalleryImage"
                      name="GalleryImage"
                      accept="image/*"
                      // onBlur={formik.handleBlur}
                      // onChange={formik.handleChange}
                      // value={formik.values.GalleryImage}
                      // className={
                      //   formik.errors.GalleryImage && formik.touched.GalleryImage
                      //     ? "input_error"
                      //     : "input_success"
                      // }
                      onChange={handleUpdateGalleryImageChange}
                    />
                    <div className="error">{formik.errors.GalleryImage}</div>
                  </>
                ) : (
                  <div className="form_group url_link_input_group">
                    <img
                      src={
                        GalleryImageURL != null &&
                        GalleryImageURL != undefined &&
                        GalleryImageURL.length > 0
                          ? GalleryImageURL
                          : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                      }
                      alt=""
                      className="banner_address_image"
                    />
                    <label htmlFor="GalleryURL">Update Image Address</label>
                    <input
                      type="text"
                      placeholder="Paste Image URL"
                      value={GalleryImageURL}
                      onChange={(e) => setGalleryImageURL(e.target.value)}
                    />
                    <div className="clear_action">
                      <button
                        className="clear_btn"
                        type="button"
                        onClick={() => setGalleryImageURL("")}
                      >
                        clear
                      </button>
                    </div>
                  </div>
                )}
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
                    onClick={() => setGalleryFormOpen(false)}
                  >
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

export default Edit_Gallery;
