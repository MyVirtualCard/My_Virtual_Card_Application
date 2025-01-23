import React, { useState, useContext, useEffect, useRef } from "react";
import "./Edit_form_styles/Edit_QR_Code.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { convertToBase64GalleryImage } from "../../../Helper/convert";

import qrcode from "../../../assets/Client_Dashboard/qrcode.png";
import { AppContext } from "../../../Context/AppContext";
const Edit_QR_Code = () => {
  let { URL_Alies } = useParams();
  let [AllQRCode, setAllQRCode] = useState();
  let [QRCodeId, setQRCodeId] = useState();
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [QRFormFormOpen, setQRFormFormOpen] = useState(false);
  let {
    Token,
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
  } = useContext(AppContext);

  let [QRCodeCount, setQRCodeCount] = useState(0);
  let [QRCodeImage, setQRCodeImage] = useState(null);
  let [fullImageToggle, setFullImageToggle] = useState(false);


  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchCurrentGallery() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/QRCodeDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            // toast.error("No QRCode added!");
            setFormSubmitLoader(false);
          } else {
            setAllQRCode(res.data.data);
            setQRCodeCount(res.data.data.length);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchCurrentGallery();
  }, [key]);
  const onUploadGalleryImage = async (e) => {
    let base64 = await convertToBase64GalleryImage(e.target.files[0]);
    setQRCodeImage(base64);
  };

  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      QRCodeImage: null,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      values = await Object.assign(values, {
        QRCodeImage: QRCodeImage || "",
      });
      const formData = new FormData();
      formData.append("URL_Alies", URL_Alies);
      formData.append("QRCodeImage", values.QRCodeImage);
      setFormSubmitLoader(true);
      await api
        .post(`/QRCodeDetail/${URL_Alies}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setQRCodeCount(++QRCodeCount);
          setQRCodeImage(null);

          reloadComponent();
          setTimeout(() => {
            setQRFormFormOpen(false);
          }, 500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setQRFormFormOpen(false);
          setFormSubmitLoader(false);
        });
    },
  });
  async function handleFullImageShow(id) {
    setFormSubmitLoader(true);
    try {
      api
        .get(`/QRCodeDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          setFullImageToggle(true);
          setQRCodeImage(res.data.data.QRCodeImage);
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
        .get(`/QRCodeDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(true);
          setQRCodeImage(res.data.data.QRCodeImage);
          setQRCodeId(res.data.data._id);
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          toast.error(error.response.data.message)
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
      setFormSubmitLoader(false);
    }
  }

  async function handleGalleryUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);

    // const formData = new FormData();
    // formData.append("ServiceImage", ServiceImage);
    // formData.append('ServiceName',ServiceName);
    // formData.append('ServiceURL',ServiceURL);
    // formData.append('ServiceDescription', ServiceDescription = stripHtmlTags(ServiceDescription));

    let data = {
      URL_Alies,
      QRCodeImage,
    };
    try {
      api
        .put(`/QRCodeDetail/updateID/${QRCodeId}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
            setQRCodeImage(null);
            setUpdateFormOpen(false);
          }, 1000);
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
  async function handleGalleryDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      api
        .delete(`/QRCodeDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setQRCodeCount(--QRCodeCount);
          setFormSubmitLoader(false);
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
  return (
    <>
      <div className="update_QRCode_container">
        {fullImageToggle ? (
          <div className="Image_Full_view">
            <div
              className="close_image"
              onClick={() => setFullImageToggle(false)}
            >
              <i className="bx bxs-message-square-x"></i>
            </div>
            <img src={QRCodeImage} alt="image" />
          </div>
        ) : (
          ""
        )}

        <div className="QRCode_illustration">
          <img src={qrcode} alt="qrcode" />
        </div>
        <div className="plan_title">
          <p>
            <strong>{currentPlan} plan </strong>&nbsp; Subscribed!
          </p>
        </div>
        {QRCodeCount < 1 ? (
          <div className="add_new_gallery">
            <button
              onClick={() => setQRFormFormOpen(true)}
              type="button"
              disabled={QRCodeCount == 1}
            >
              <i className="bx bx-plus"></i>Add QRCode
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="plan_based_service_add_note">
          <div className="note">
            {currentPlan === "Free Plan" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>Trial Plan QRCode Image access denied!</small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Basic" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max QRCode addOn limit :<strong> {QRCodeCount} / 1 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Standard" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max QRCode addOn limit :<strong> {QRCodeCount} / 1 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "EnterPrice" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max QRCode addOn limit :<strong> {QRCodeCount} / 1 </strong>
                </small>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {!fullImageToggle ? (
          <div className="gallery_list_table table-responsive container w-100 rounded-3">
            <table className="table table-borderless rounded-3" id="example">
              <thead className="table-secondary rounded-3">
                <tr>
                  <th className="fw-bold" style={{ width: "20%" }}>COUNT</th>
                  <th className="fw-bold" style={{ width: "50%" }}>IMAGE</th>

                  <th className="fw-bold" style={{ width: "30%" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody className=" shadow-sm">
                {AllQRCode != undefined && AllQRCode.length !=0? (
                  <>
                    {AllQRCode.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td className="h-100 align-middle">{index + 1}</td>
                          <td className="h-100 align-middle">
                            <img
                              src={
                                data.QRCodeImage
                                  ? data.QRCodeImage
                                  : "https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?t=st=1719518928~exp=1719522528~hmac=5d5fd1630b2d45a9d58eefe3e32035e8f9bc95ada01500767e6d11f24d17c03f&w=740"
                              }
                              alt="gallery_image"
                            />
                          </td>

                          <td className="h-100 align-middle">
                            <i
                              className="bx bxs-show"
                              style={{ color: "skyBlue" }}
                              onClick={() => handleFullImageShow(data._id)}
                            ></i>
                            <i
                              className="bx bx-edit"
                              style={{ color: "#6571FF" }}
                              onClick={() => handleGalleryEdit(data._id)}
                            ></i>
                            <i
                              className="bx bx-trash-alt"
                              style={{ color: "red" }}
                              onClick={() => handleGalleryDelete(data._id)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No QRCode Images Added!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}

        {/* //Create New Service Form */}

        <div
          className="create_new_gallerycontainer"
          id={QRFormFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_gellery_box"
            id={QRFormFormOpen ? "galleryOpen" : "galleryClose"}
          >
            <div className="title">
              <p>New QRCode</p>
              <i
                className="bx bx-x"
                onClick={() => setQRFormFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form_group">
                <label htmlFor="QRCodeImage">
                  Choose Your QRCode Image<sup>*</sup>
                </label>
                <label htmlFor="QRCodeImage">
                  <img
                    src={
                      QRCodeImage != undefined
                        ? QRCodeImage
                        : "https://img.freepik.com/free-vector/illustration-person-scanning-qr-code-with-smartphone_23-2148621302.jpg?t=st=1719519722~exp=1719523322~hmac=a7bc1d77676390d3a1c0f749813b846db973fec681a865121a40d06db24b6eeb&w=740"
                    }
                    alt="QRCodeImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <p>
                  <strong>Note :</strong> Max image size limit 3MB
                </p>
                <small>Allowed file types: png, jpg, jpeg.</small>

                <input
                  type="file"
                  id="QRCodeImage"
                  name="QRCodeImage"
                  onChange={onUploadGalleryImage}
                />
              </div>

              <div className="form_submit_actions">
                <div className="save">
                  <button type="submit" disabled={FormSubmitLoader}>
                    Save
                  </button>
                </div>
                <div className="discard">
                  <button
                    type="button"
                    onClick={() => setQRFormFormOpen(false)}
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
              <p>Update QRCode</p>
              <i
                className="bx bx-x"
                onClick={() => setUpdateFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={handleGalleryUpdate}>
              <div className="form_group">
                <label htmlFor="QRCodeImage">
                  Choose Your QRCode Image<sup>*</sup>
                </label>
                <label htmlFor="QRCodeImage">
                  <img
                    src={
                      QRCodeImage != undefined
                        ? QRCodeImage
                        : "https://img.freepik.com/free-vector/realistic-fog-background_23-2149115275.jpg?t=st=1715977908~exp=1715981508~hmac=1d533445708d92e0d4c40a4db9ebd8a90505fbfa07dcb1b58b5915f9fde4f028&w=900"
                    }
                    alt="QRCodeImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <p>
                  <strong>Note :</strong> Max image size limit 3MB
                </p>
                <small>Allowed file types: png, jpg, jpeg.</small>

                <input
                  type="file"
                  id="QRCodeImage"
                  name="QRCodeImage"
                  onChange={onUploadGalleryImage}
                />
              </div>

              <div className="form_submit_actions">
                <div className="save">
                  <button type="submit" disabled={FormSubmitLoader}>
                    Update
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

export default Edit_QR_Code;
