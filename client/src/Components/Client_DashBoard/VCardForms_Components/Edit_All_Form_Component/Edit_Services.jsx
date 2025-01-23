import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Services.scss";
import { useFormik, Field } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { ServiceValidateShema } from "../../../Helper/ServiceValidate";
import { AppContext } from "../../../Context/AppContext";

const Edit_Services = () => {
  let { URL_Alies } = useParams();
  let {
    Token,
    currentPlan,
   
    setFormSubmitLoader,
    setShowForm,
    setErrorMessage,
    setErrorPopupOpen,
  } = useContext(AppContext);
  let [ServiceCount, setServiceCount] = useState(0);
  let [AllService, setAllService] = useState([]);
  let [serviceFormOpen, setServiceFormOpen] = useState(false);
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [viewServiceDetail, setViewServiceDetail] = useState(false);
  let [ServiceName, setServiceName] = useState();
  let [ServiceURL, setServiceURL] = useState();
  let [ServicePrice, setServicePrice] = useState(0);
  let [ServiceDescription, setServiceDescription] = useState();
  let [ServiceImage, setServiceImage] = useState();
  let [ServicePreview, setServicePreview] = useState(null);
  let [ServiceId, setServiceId] = useState();
  let [ServiceType, setServiceType] = useState();
  let [ServiceIcon, setServiceIcon] = useState();
  let [ServiceAddress, setServiceAddress] = useState();
  let [deleteParams, setDeleteParams] = useState();

  const [key, setKey] = useState(0);

  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };

  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  async function fetchAllService() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/serviceDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            // toast.error("No service added!");
            setFormSubmitLoader(false);
          } else {
            setAllService(res.data.data);
            setServiceCount(res.data.data.length);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllService();
  }, [key]);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      ServiceName: "",
      ServiceURL: "",
      ServicePrice: 0,
      ServiceDescription: "",
      ServiceType: "ImageUpload",
      ServiceIcon: "",
      ServiceAddress: "",
      ServiceImage: undefined,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ServiceValidateShema,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      const formData = new FormData();
      formData.append("URL_Alies", URL_Alies);
      formData.append("ServiceName", values.ServiceName);
      formData.append("ServiceURL", values.ServiceURL);
      formData.append("ServicePrice", values.ServicePrice);
      formData.append("ServiceType", values.ServiceType);
      formData.append("ServiceIcon", values.ServiceIcon);
      formData.append("ServiceAddress", values.ServiceAddress);
      formData.append("ServiceImage", ServiceImage);
      formData.append(
        "ServiceDescription",
        (values.ServiceDescription = ServiceDescription)
      );

      await api
        .post(`/serviceDetail/${URL_Alies}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(false);
          setServiceFormOpen(false);
          toast.success(res.data.message);
          formik.setFieldValue("ServiceDescription", ""),
            (formik.values.ServiceDescription = "");
          setServiceDescription("");
          values.ServiceDescription = stripHtmlTags("");
          values.ServiceImage = undefined;
          setServiceImage(undefined);
          setServicePrice(0);
          formik.handleReset();
          setFormSubmitLoader(false);
          setServicePreview(null);

          setServiceCount(++ServiceCount);
          if (currentPlan === "Free" && ServiceCount == 2) {
            setTimeout(() => {
              setShowForm("Products");
            }, 2000);
          }
          if (currentPlan === "Basic" && ServiceCount == 5) {
            setTimeout(() => {
              setShowForm("Products");
            }, 100);
          }
          if (currentPlan === "Standard" && ServiceCount == 6) {
            setTimeout(() => {
              setShowForm("Products");
            }, 2000);
          }
          if (currentPlan === "EnterPrice" && ServiceCount == 8) {
            setTimeout(() => {
              setShowForm("Products");
            }, 2000);
          }
          setTimeout(() => {
            setServiceImage(undefined);
            setServiceFormOpen(false);
            reloadComponent();
          }, 500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
          // setServiceFormOpen(false);
        });
    },
  });

  async function handleServiceView(id) {
    setViewServiceDetail(true);
    try {
      await api
        .get(`/serviceDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setViewServiceDetail(true);
          setServiceName(res.data.data.ServiceName);
          setServiceURL(res.data.data.ServiceURL);
          setServiceDescription(
            (res.data.data.ServiceDescription =
              res.data.data.ServiceDescription)
          );
          setServicePrice(res.data.data.ServicePrice);
          setServiceId(res.data.data._id);
          setFormSubmitLoader(false);
      
          setServiceType(res.data.data.ServiceType);
          setServiceImage(res.data.data.ServiceImage);
          setServicePreview(res.data.data.ServiceImage);
          // if(res.data.data.ServiceType == 'ImageUpload'){
          //   return setServiceImage(res.data.data.ServiceImage);
          // };
          // if(res.data.data.ServiceType == 'Image_Address_Link'){
          //   return setServiceImage(res.data.data.ServiceImage.filename);
          // };
        })

        .catch((error) => {
          setErrorPopupOpen(true);
          setErrorMessage(error.response.data.message);
          setTimeout(() => {
            setErrorPopupOpen(false);
          }, 3000);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      setErrorPopupOpen(true);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorPopupOpen(false);
      }, 3000);
    }
  }
  async function handleServiceEdit(id) {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/serviceDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setServiceFormOpen(true);
          setUpdateFormOpen(true);
          setServiceName(res.data.data.ServiceName);
          setServiceURL(res.data.data.ServiceURL);
          setServicePrice(res.data.data.ServicePrice);
          setServiceDescription(res.data.data.ServiceDescription);
          setServiceImage(res.data.data.ServiceImage);

          setServiceId(res.data.data._id);
          setServiceIcon(res.data.data.ServiceIcon);
          setServiceType(res.data.data.ServiceType);
          setServiceAddress(res.data.data.ServiceAddress);
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleServiceUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    const formData = new FormData();
    formData.append("URL_Alies", URL_Alies);
    formData.append("ServiceName", ServiceName);
    formData.append("ServiceURL", ServiceURL);
    formData.append("ServicePrice", ServicePrice);
    formData.append("ServiceType", ServiceType);
    formData.append("ServiceIcon", ServiceIcon);
    formData.append("ServiceAddress", ServiceAddress);
    formData.append("ServiceImage", ServiceImage);
    formData.append(
      "ServiceDescription",
      (ServiceDescription = ServiceDescription)
    );
    try {
      api
        .put(`/serviceDetail/updateID/${ServiceId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setUpdateFormOpen(false);
          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
            setServiceName("");
            setServiceURL("");
            setServicePrice(0);
            setServicePreview(null);
            setServiceIcon("");
            setServiceImage(undefined);
            setServiceFormOpen(false);
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setServicePreview(null);
          setServiceFormOpen(false);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
      setServiceFormOpen(false);
      setFormSubmitLoader(false);
    }
  }
  async function handleServiceDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/serviceDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          setServiceCount(--ServiceCount);
          if(ServiceCount == 0){
             setAllService([])
          }
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
  async function handleAllServiceDelete() {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/serviceDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          setServiceCount(0);
    
          setAllService([]);
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
  const handleServiceImage = (e) => {
    const file = e.target.files[0];
    setServiceImage(file);
    setServicePreview(URL.createObjectURL(file)); // Show a preview of the image
    formik.setFieldValue("ServiceImage", ServicePreview);
  };
  const handleUpdateServiceImage = (e) => {
    const file = e.target.files[0];
    setServiceImage(file);
    setServicePreview(URL.createObjectURL(file)); // Show a preview of the image
    //  {!updateFormOpen ? formik.setFieldValue("ServiceImage", ServicePreview): setServiceImage(ServicePreview)}
  };
  // Handler function for the change event
  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  return (
    <>
      <div className="update_service_container">
      <div className="service_title">
            <h4>Service Details</h4>
          </div>

        {!serviceFormOpen ? (
          <>
            <div className="add_new_service">
              {currentPlan === "Free" && ServiceCount != 2 ? (
                <button
                  onClick={() => {
                    setServiceFormOpen(true),
                      setUpdateFormOpen(false),
                      setServiceImage(undefined),
                      (formik.values.ServiceImage = undefined),
                      setServiceDescription(undefined),
                      (formik.values.ServiceDescription = stripHtmlTags(""));
                  }}
                >
                  <i className="bx bx-plus"></i>Add New Service
                </button>
              ) : (
                ""
              )}
              {currentPlan === "Basic" && ServiceCount != 5 ? (
                <button
                  onClick={() => {
                    setServiceFormOpen(true),
                      setUpdateFormOpen(false),
                      setServiceImage(undefined),
                      (formik.values.ServiceImage = undefined),
                      setServiceDescription(undefined),
                      (formik.values.ServiceDescription = stripHtmlTags(""));
                  }}
                >
                  <i className="bx bx-plus"></i>Add New Service
                </button>
              ) : (
                ""
              )}
              {currentPlan === "Standard" && ServiceCount != 6 ? (
                <button
                  onClick={() => {
                    setServiceFormOpen(true),
                      setUpdateFormOpen(false),
                      setServiceImage(undefined),
                      (formik.values.ServiceImage = undefined),
                      setServiceDescription(undefined),
                      (formik.values.ServiceDescription = stripHtmlTags(""));
                  }}
                >
                  <i className="bx bx-plus"></i>Add New Service
                </button>
              ) : (
                ""
              )}
              {currentPlan === "EnterPrice" && ServiceCount != 8 ? (
                <button
                  onClick={() => {
                    setServiceFormOpen(true),
                      setUpdateFormOpen(false),
                      setServiceImage(undefined),
                      (formik.values.ServiceImage = undefined),
                      setServiceDescription(undefined),
                      (formik.values.ServiceDescription = stripHtmlTags(""));
                  }}
                >
                  <i className="bx bx-plus"></i>Add New Service
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
                      Max Service addOn limit :
                      <strong> {ServiceCount} / 2 </strong>
                    </small>
                  </>
                ) : (
                  ""
                )}

                {currentPlan === "Basic" ? (
                  <>
                    <i class="bx bx-upload "></i>
                    <small>
                      Max Service addOn limit :
                      <strong> {ServiceCount} / 5 </strong>
                    </small>
                  </>
                ) : (
                  ""
                )}

                {currentPlan === "Standard" ? (
                  <>
                    <i class="bx bx-upload "></i>
                    <small>
                      Max Service addOn limit :
                      <strong> {ServiceCount} / 6 </strong>
                    </small>
                  </>
                ) : (
                  ""
                )}

                {currentPlan === "EnterPrice" ? (
                  <>
                    <i class="bx bx-upload "></i>
                    <small>
                      Max Service addOn limit :
                      <strong> {ServiceCount} / 8 </strong>
                    </small>
                  </>
                ) : (
                  ""
                )}
              </div>
          
            </div>

            {/* All Services */}
            <div className="All_service_container">
              {AllService != undefined && AllService.length != 0 ? (
                <>
                  {AllService.map((data, index) => {
                    return (
                      <div className="video_box" key={index}>
                        <div className="video_header">
                          <h2>Service - {index + 1}</h2>
                        </div>
                        <div className="video">
                          {/* ServiceIpload image */}
                          {data.ServiceType == "ImageUpload" ? (
                            <>
                              {data.ServiceImage ? (
                                // <img
                                //   src={
                                //     data.ServiceImage != undefined
                                //       ? data.ServiceImage
                                //       : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                                //   }
                                //   alt="ServiceImage"
                                //   name="ServiceImage"
                                // />
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_BACKEND_API_URL
                                  }/${data?.ServiceImage}`}
                                  className="ServiceImage"
                                  alt="ServiceImage"
                                />
                              ) : (
                                "Null"
                              )}
                            </>
                          ) : (
                            ""
                          )}
                          {/* Service Icons */}
                          {data.ServiceType == "Icon_Tag" ? (
                            <>
                              {data.ServiceIcon.length > 0 ? (
                                <HtmlRenderer htmlString={data.ServiceIcon} />
                              ) : (
                                "Null"
                              )}
                            </>
                          ) : (
                            ""
                          )}
                          {/* ServiceAddresImage */}
                          {data.ServiceType == "Image_Address_Link" ? (
                            <>
                              {data.ServiceAddress.length != 0 ? (
                                <img
                                  src={
                                    data.ServiceAddress.length != 0
                                      ? data.ServiceAddress
                                      : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                                  }
                                  alt="ServiceAddress"
                                  name="ServiceAddress"
                                />
                              ) : (
                                "Null"
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="product_details">
                          <div className="detail">
                            <div className="title">
                              <h5>Service Name </h5>
                            </div>
                            <div className="data">
                              <small>:</small>
                              <p>{data.ServiceName}</p>
                            </div>
                          </div>
                          <div className="detail">
                            <div className="title">
                              <h5>Service Price </h5>
                            </div>
                            <div className="data">
                              <small>:</small>
                              <p>₹ &nbsp;{data.ServicePrice}</p>
                            </div>
                          </div>
                          <div className="detail">
                            <div className="title">
                              <h5>Service Description </h5>
                            </div>
                            <div className="data">
                              <small>:</small>
                              <p
                              // dangerouslySetInnerHTML={{
                              //   __html: data.ProductDescription.slice(0, 50),
                              // }}
                              >
                                {data.ServiceDescription != undefined
                                  ? stripHtmlTags(
                                      data.ServiceDescription
                                    ).slice(0, 25)
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="detail">
                            <div className="title">
                              <h5>Service URL </h5>
                            </div>
                            <div className="data">
                              <small>:</small>
                              <p>{data.ServiceURL}</p>
                            </div>
                          </div>
                        </div>
                        <div className="icon_actions">
                          <div className="delete">
                            <i
                              className="bx bx-trash-alt"
                              style={{ color: "red" }}
                              onClick={() => handleServiceDelete(data._id)}
                            ></i>
                            <small>Delete</small>
                          </div>
                          <div className="show">
                            <i
                              className="bx bxs-show"
                              style={{ color: "skyBlue" }}
                              onClick={() => handleServiceView(data._id)}
                            ></i>
                            <small>View</small>
                          </div>
                          <div className="edit">
                            <i
                              className="bx bx-edit"
                              style={{ color: "#6571FF" }}
                              onClick={() => handleServiceEdit(data._id)}
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
                  <small> Service's not been Added!</small>
                </div>
              )}
            </div>
            <div className="deleteall_btn">
              {AllService.length > 1 ? 
                 <button type='button' onClick={handleAllServiceDelete}>Delete All<i className='bx bxs-trash'></i></button>
              : ''}
           
            </div>
          </>
        ) : (
          <>
            {/* //Create New Service Form */}

            <div
              className="create_new_service_container"
              // id={serviceFormOpen ? "shadow_background" : ""}
            >
              <div
                className="create_new_service_box"
                // id={serviceFormOpen ? "serviceOpen" : "serviceClose"}
              >
                <div className="title">
                  <p>{updateFormOpen ? "Update Service" : "New Service"}</p>
                  <i
                    className="bx bx-x"
                    onClick={() => {
                      setServiceFormOpen(false), setUpdateFormOpen(false);
                    }}
                  ></i>
                </div>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="ServiceNew_Form"
                >
                  <div className="form_group">
                    <label htmlFor="ServiceName">
                      Service Name <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Service Title"
                      id="ServiceName"
                      name="ServiceName"
                      onBlur={formik.handleBlur}
                      onChange={
                        updateFormOpen
                          ? (e) => setServiceName(e.target.value)
                          : formik.handleChange
                      }
                      value={
                        updateFormOpen ? ServiceName : formik.values.ServiceName
                      }
                      className={
                        formik.errors.ServiceName && formik.touched.ServiceName
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    <div className="error">{formik.errors.ServiceName}</div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="ServicePrice">Service Price</label>
                    <input
                      type="text"
                      placeholder="Enter Service Amount"
                      id="ServicePrice"
                      name="ServicePrice"
                      onBlur={formik.handleBlur}
                      onChange={
                        updateFormOpen
                          ? (e) => setServicePrice(e.target.value)
                          : formik.handleChange
                      }
                      value={
                        updateFormOpen
                          ? ServicePrice
                          : formik.values.ServicePrice
                      }
                      className={
                        formik.errors.ServicePrice &&
                        formik.touched.ServicePrice
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    <div className="error">{formik.errors.ServicePrice}</div>
                  </div>
                  <div className="form_group Service_URL">
                    <label htmlFor="ServiceURL">Service URL</label>
                    <input
                      type="text"
                      placeholder="Paste Service URL"
                      id="ServiceURL"
                      name="ServiceURL"
                      onBlur={formik.handleBlur}
                      onChange={
                        updateFormOpen
                          ? (e) => setServiceURL(e.target.value)
                          : formik.handleChange
                      }
                      value={
                        updateFormOpen ? ServiceURL : formik.values.ServiceURL
                      }
                      className={
                        formik.errors.ServiceURL && formik.touched.ServiceURL
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    <div className="error">{formik.errors.ServiceURL}</div>
                  </div>
                  <div className="form_group description">
                    <label htmlFor="ServiceDescription">
                      Description <sup>*</sup>
                    </label>
                    <Editor
                      {...formik.getFieldProps("ServiceDescription")}
                      value={
                        updateFormOpen
                          ? ServiceDescription
                          : formik.values.ServiceDescription
                      }
                      onTextChange={
                        updateFormOpen
                          ? (e) => setServiceDescription(e.htmlValue)
                          : (e) => {
                              formik.setFieldValue(
                                "ServiceDescription",
                                e.htmlValue
                              ),
                                setServiceDescription(e.htmlValue);
                            }
                      }
                      handleBlur={formik.handleBlur}
                      id="ServiceDescription"
                      name="ServiceDescription"
                      style={{ height: "130px" }}
                      placeholder="Enter Short Description"
                      className={
                        formik.errors.ServiceDescription &&
                        formik.touched.ServiceDescription
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    {/* <ReactQuill
                modules={modules}
                formats={formats}
                       id="ServiceDescription"
                name="ServiceDescription"
                {...formik.getFieldProps("ServiceDescription")}
                value={
                  updateFormOpen
                    ? ServiceDescription
                    : formik.values.ServiceDescription
                }
                onChange={
                  updateFormOpen
                    ? (e) => setServiceDescription(e)
                    : (e) => {
                        formik.setFieldValue(
                          "ServiceDescription",
                          e
                        ),
                          setServiceDescription(e);
                      }
                }

                // style={{ height: "180px",border:'none' }}
                placeholder="Enter Short Description"
                className={
                  formik.errors.ServiceDescription &&
                  formik.touched.ServiceDescription
                    ? "input_error"
                    : "input_success"
                }
                /> */}

                    <div className="desc_error">
                      {formik.errors.ServiceDescription}
                    </div>
                    {/* <textarea name="service_description" id="service_description" cols="48" rows="4" placeholder="Enter Short Description"></textarea> */}
                  </div>
                  <div className="image_upload_type">
                    <div className="banner_type">
                      <label htmlFor="Service">Service Image Type</label>
                      <select
                        name="ServiceType"
                        onBlur={formik.handleBlur}
                        onChange={
                          updateFormOpen
                            ? (e) => setServiceType(e.target.value)
                            : formik.handleChange
                        }
                        value={
                          updateFormOpen
                            ? ServiceType
                            : formik.values.ServiceType
                        }
                      >
                        <option value="ImageUpload">ImageUpload</option>
                        <option value="Icon_Tag">Icon_Tag</option>
                        <option value="Image_Address_Link">
                          Image_Address_Link
                        </option>
                      </select>
                    </div>
                    {!updateFormOpen ? (
                      <>
                        {/* //Image Upload */}
                        {formik.values.ServiceType == "ImageUpload" ? (
                          <div className="form_group serviceImage">
                            {/* <label htmlFor="ServiceImage">Service Icon</label> */}

                            <label htmlFor="Image">
                              {ServicePreview == null ? (
                                <img
                                  src={
                                    ServiceImage != undefined
                                      ? ServiceImage
                                      : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                  }
                                  alt="Image"
                                />
                              ) : (
                                <img
                                  src={
                                    ServicePreview != null
                                      ? ServicePreview
                                      : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                  }
                                  alt="Image"
                                />
                              )}

                              {/* <i className="bx bxs-edit-location"></i> */}
                            </label>
                            <input
                              type="file"
                              id="ServiceImage"
                              name="ServiceImage"
                              accept="image/*"
                              onChange={handleServiceImage}
                              onBlur={formik.handleBlur}
                            />
                            <div className="profile_error">
                              {formik.errors.ServiceImage}
                            </div>
                            <p>
                              <strong>Note :</strong> Max file size limit 3MB
                            </p>
                            <small>
                              Allowed file types: png, jpg, jpeg,.gif.
                            </small>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* //Icon_Tag Upload*/}
                        {formik.values.ServiceType == "Icon_Tag" ? (
                          <>
                            <div className="form_group">
                              <label htmlFor="VCardName">Paste Icon Tag</label>
                              <input
                                type="text"
                                placeholder="Eg : <i className='box box-open'></i>"
                                name="ServiceIcon"
                                id="ServiceIcon"
                                onBlur={formik.handleBlur}
                                onChange={
                                  updateFormOpen
                                    ? (e) => setServiceIcon(e.target.value)
                                    : formik.handleChange
                                }
                                value={
                                  updateFormOpen
                                    ? ServiceIcon
                                    : formik.values.ServiceIcon
                                }
                                className={
                                  formik.errors.ServiceIcon &&
                                  formik.touched.ServiceIcon
                                    ? "input_error"
                                    : "input_success"
                                }
                              />
                              <div className="error">
                                {formik.errors.ServiceIcon}
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {/* //ImageAddress Upload */}
                        {formik.values.ServiceType == "Image_Address_Link" ? (
                          <div className="form_group serviceImage">
                            {/* <label htmlFor="ServiceImage">Service Icon</label> */}

                            <label htmlFor="Image">
                              {updateFormOpen ? (
                                <img
                                  src={
                                    ServiceAddress != null &&
                                    ServiceAddress != undefined &&
                                    ServiceAddress.length > 0
                                      ? ServiceAddress
                                      : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                  }
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={
                                    formik.values.ServiceAddress != null &&
                                    formik.values.ServiceAddress != undefined &&
                                    formik.values.ServiceAddress.length > 0
                                      ? formik.values.ServiceAddress
                                      : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                  }
                                  alt=""
                                />
                              )}

                              {/* <i className="bx bxs-edit-location"></i> */}
                            </label>
                            <div className="form_group url_link_input_group">
                              <label htmlFor="VCardName">
                                Paste Image Address
                              </label>
                              <input
                                type="text"
                                placeholder="Eg :https://img.asistostech.com/free-photo/"
                                name="ServiceAddress"
                                id="ServiceAddress"
                                onBlur={formik.handleBlur}
                                onChange={
                                  updateFormOpen
                                    ? (e) => setServiceAddress(e.target.value)
                                    : formik.handleChange
                                }
                                value={
                                  updateFormOpen
                                    ? ServiceAddress
                                    : formik.values.ServiceAddress
                                }
                                className={
                                  formik.errors.ServiceAddress &&
                                  formik.touched.ServiceAddress
                                    ? "input_error"
                                    : "input_success"
                                }
                              />

                              <div className="error">
                                {formik.errors.ServiceAddress}
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        {/* ImageUploadUpdate */}
                        {ServiceType == "ImageUpload" ? (
                          <div className="form_group serviceImage">
                            {/* <label htmlFor="ServiceImage">Service Icon</label> */}

                            <label htmlFor="Image">
                              {/* <img
                                src={
                                  ServiceImage != undefined
                                    ? ServiceImage
                                    : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                }
                                alt="Image"
                              /> */}
                              {ServicePreview == null ? (
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_BACKEND_API_URL
                                  }/${ServiceImage}`}
                                  className="ServiceImage"
                                  alt="ServiceImage"
                                />
                              ) : (
                                <img
                                  src={ServicePreview}
                                  className="ServiceImage"
                                  alt="ServiceImage"
                                />
                              )}

                              {/* <i className="bx bxs-edit-location"></i> */}
                            </label>
                            <input
                              type="file"
                              id="ServiceImage"
                              name="ServiceImage"
                              accept="image/*"
                              onChange={handleUpdateServiceImage}
                              onBlur={formik.handleBlur}
                            />
                            <div className="profile_error">
                              {formik.errors.ServiceImage}
                            </div>
                            <p>
                              <strong>Note :</strong> Max file size limit 3MB
                            </p>
                            <small>
                              Allowed file types: png, jpg, jpeg,.gif.
                            </small>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* ServiceIConUpdate */}
                        {ServiceType == "Icon_Tag" ? (
                          <>
                            <div className="form_group">
                              <label htmlFor="VCardName">Paste Icon Tag</label>
                              <input
                                type="text"
                                placeholder="Eg : <i className='box box-open'></i>"
                                name="ServiceIcon"
                                id="ServiceIcon"
                                onBlur={formik.handleBlur}
                                onChange={
                                  updateFormOpen
                                    ? (e) => setServiceIcon(e.target.value)
                                    : formik.handleChange
                                }
                                value={
                                  updateFormOpen
                                    ? ServiceIcon
                                    : formik.values.ServiceIcon
                                }
                                className={
                                  formik.errors.ServiceIcon &&
                                  formik.touched.ServiceIcon
                                    ? "input_error"
                                    : "input_success"
                                }
                              />
                              <div className="error">
                                {formik.errors.ServiceIcon}
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {/* ServiceAddessUpdate */}
                        {ServiceType == "Image_Address_Link" ? (
                          <div className="form_group serviceImage">
                            {/* <label htmlFor="ServiceImage">Service Icon</label> */}

                            <label htmlFor="Image">
                              <img
                                src={
                                  ServiceAddress != null &&
                                  ServiceAddress != undefined &&
                                  ServiceAddress.length > 0
                                    ? ServiceAddress
                                    : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                                }
                                alt=""
                              />
                              {/* <i className="bx bxs-edit-location"></i> */}
                            </label>
                            <div className="form_group url_link_input_group">
                              <label htmlFor="VCardName">
                                Update Image Address
                              </label>
                              <input
                                type="text"
                                placeholder="Eg :https://img.asistostech.com/free-photo/"
                                name="ServiceAddress"
                                id="ServiceAddress"
                                value={ServiceAddress}
                                onChange={(e) =>
                                  setServiceAddress(e.target.value)
                                }
                              />
                              <div className="clear_action">
                                <button
                                  className="clear_btn"
                                  type="button"
                                  onClick={() => setServiceAddress("")}
                                >
                                  clear
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>

                  <div className="form_submit_actions">
                    <div className="save">
                      {updateFormOpen ? (
                        <button type="submit" onClick={handleServiceUpdate}>
                          Update
                        </button>
                      ) : (
                        <>
                          <div className="save">
                            <button type="submit">
                              Save<i className="bx bxs-save"></i>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    {!serviceFormOpen ? (
                      <div className="discard">
                        <button type="button" onClick={formik.handleReset}>
                          Clear
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        {/* //Service  Detail Box */}

        <div
          className="view_new_service_container"
          id={viewServiceDetail ? "shadow_background" : ""}
        >
          <div
            className="view_new_service_box"
            id={viewServiceDetail ? "serviceUpdateOpen" : "serviceUpdateClose"}
          >
            <div className="title">
              <p>Service Details</p>
              <i
                className="bx bx-x"
                onClick={() => setViewServiceDetail(false)}
              ></i>
            </div>
            <div className="details_container">
              <div className="service_name">
                <div className="service_title">Service Name</div>
                <div className="name">
                  <p>{ServiceName != undefined ? ServiceName : "N/A"}</p>
                </div>
              </div>
              <div className="service_desc">
                <div className="service_title">Service Description</div>
                <div className="name">
                  <p>
                    {ServiceDescription != undefined
                      ? stripHtmlTags(ServiceDescription)
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="service_url">
                <div className="service_title">Service URL</div>
                <div className="name">
                  <a href={ServiceURL} target="_blank">
                    {ServiceURL != undefined ? ServiceURL : "N/A"}
                  </a>
                </div>
              </div>
              <div className="service_image">
                <div className="service_title">Service Image</div>
                <div className="service_image">
                  {/* ServiceIpload image */}
                  {ServiceType == "ImageUpload" ? (
                    <>
                      {ServiceImage ? (
                        // <img
                        //   src={
                        //     data.ServiceImage != undefined
                        //       ? data.ServiceImage
                        //       : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                        //   }
                        //   alt="ServiceImage"
                        //   name="ServiceImage"
                        // />
                        <img
                          src={`${
                            import.meta.env.VITE_APP_BACKEND_API_URL
                          }/${ServiceImage}`}
                          className="ServiceImage"
                          alt="ServiceImage"
                        />
                      ) : (
                        "Null"
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {/* Service Icons */}
                  {ServiceType == "Icon_Tag" ? (
                    <>
                      {ServiceIcon.length > 0 ? (
                        <HtmlRenderer htmlString={ServiceIcon} />
                      ) : (
                        "Null"
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {/* ServiceAddresImage */}
                  {ServiceType == "Image_Address_Link" ? (
                    <>
                      {ServiceAddress ? (
                        <img
                          src={
                            ServiceAddress
                              ? ServiceAddress
                              : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                          }
                          alt="ServiceAddress"
                          name="ServiceAddress"
                        />
                      ) : (
                        "Null"
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Services;
