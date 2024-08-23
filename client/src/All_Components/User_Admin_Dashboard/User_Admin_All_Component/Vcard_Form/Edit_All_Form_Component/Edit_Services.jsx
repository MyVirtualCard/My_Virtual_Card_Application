import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Services.scss";
import { useFormik, Field } from "formik";
import { Editor } from "primereact/editor";
import { Editor as UpdateEditor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64ServiceImage } from "../../../../Helper/convert";
import Context from "../../../../UseContext/Context";
import { ServiceValidateShema } from "../../../../Helper/ServiceValidate";
import { modules, formats } from "../../Quill";
const Services = () => {
  let { URL_Alies } = useParams();
  let {
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
    setShowForm,
    successMessage,
    setSuccessMessage,
    successPopupOpen,
    setSuccessPopupOpen,
    errorMessage,
    setErrorMessage,
    errorPopupOpen,
    setErrorPopupOpen,
  } = useContext(Context);
  let [ServiceCount, setServiceCount] = useState(0);
  let [AllService, setAllService] = useState([]);
  let [serviceFormOpen, setServiceFormOpen] = useState(false);
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [viewServiceDetail, setViewServiceDetail] = useState(false);
  let [ServiceName, setServiceName] = useState();
  let [ServiceURL, setServiceURL] = useState();
  let [ServiceDescription, setServiceDescription] = useState();
  let [ServiceImage, setServiceImage] = useState();
  let [ServiceId, setServiceId] = useState();
  let [ServiceType, setServiceType] = useState();
  let [ServiceIcon, setServiceIcon] = useState();
  let [ServiceAddress, setServiceAddress] = useState();

  const [filename, setFilename] = useState("Choose File");
  const [key, setKey] = useState(0);

  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  async function fetchAllService() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/serviceDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
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
  const onUploadServiceImage = async (e) => {
    // setServiceImage(e.target.files[0]);
    // setFilename(e.target.files[0].name);
    let base64 = await convertToBase64ServiceImage(e.target.files[0]);
    setServiceImage(base64);
  };
  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      ServiceName: "",
      ServiceURL: "",
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
      values.ServiceDescription = stripHtmlTags(ServiceDescription);
      setFormSubmitLoader(true);
      values = await Object.assign(values, {
        ServiceImage: ServiceImage || "",
      });

      await api
        .post(`/serviceDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
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
          formik.handleReset();
          setFormSubmitLoader(false);

          setServiceCount(++ServiceCount);
          if (currentPlan === "Trial Plan" && ServiceCount == 2) {
            setTimeout(() => {
              setShowForm("Products");
            }, 2000);
          }
          if (currentPlan === "Basic" && ServiceCount == 4) {
            setTimeout(() => {
              setShowForm("Products");
            }, 2000);
          }
          if (currentPlan === "Standard" && ServiceCount == 6) {
            setTimeout(() => {
              setShowForm("Products");
            }, 2000);
          }
          if (currentPlan === "Enterprises" && ServiceCount == 8) {
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
          setServiceFormOpen(false);
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
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setViewServiceDetail(true);
          setServiceName(res.data.data.ServiceName);
          setServiceURL(res.data.data.ServiceURL);
          setServiceDescription(
            (res.data.data.ServiceDescription = stripHtmlTags(
              res.data.data.ServiceDescription
            ))
          );
          setServiceImage(res.data.data.ServiceImage);
          setServiceId(res.data.data._id);
          setFormSubmitLoader(false);
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
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setServiceFormOpen(true);
          setUpdateFormOpen(true);
          setServiceName(res.data.data.ServiceName);
          setServiceURL(res.data.data.ServiceURL);
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

    // const formData = new FormData();
    // formData.append("ServiceImage", ServiceImage);
    // formData.append('ServiceName',ServiceName);
    // formData.append('ServiceURL',ServiceURL);
    // formData.append('ServiceDescription', ServiceDescription = stripHtmlTags(ServiceDescription));
    ServiceDescription = stripHtmlTags(ServiceDescription);
    let data = {
      URL_Alies,
      ServiceName,
      ServiceImage,
      ServiceURL,
      ServiceType,
      ServiceIcon,
      ServiceAddress,
      ServiceDescription,
    };
    try {
      api
        .put(`/serviceDetail/updateID/${ServiceId}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
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

            setServiceIcon("");
            setServiceImage(undefined);
            setServiceFormOpen(false);
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
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
      api
        .delete(`/serviceDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          setServiceCount(--ServiceCount);
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
  const handleServiceChange = (event) => {
    const ServiceImage = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(ServiceImage);
    reader.onload = () => {
      formik.setFieldValue("ServiceImage", reader.result);
      setServiceImage(reader.result);
    };
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
        <div className="service_plan_title">
          <p>
            <strong>{currentPlan} </strong>&nbsp; Subscribed!
          </p>
        </div>

 
        {!serviceFormOpen ? 
        <>
               <div className="add_new_service">
          {currentPlan === "Trial Plan" && ServiceCount != 2 ? (
            <button
              onClick={() => {
                setServiceFormOpen(true), setUpdateFormOpen(false),
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
          {currentPlan === "Basic" && ServiceCount != 4 ? (
            <button
              onClick={() => {
                setServiceFormOpen(true), setUpdateFormOpen(false),
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
                setServiceFormOpen(true), setUpdateFormOpen(false),
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
          {currentPlan === "Enterprises" && ServiceCount != 8 ? (
            <button
              onClick={() => {
                setServiceFormOpen(true), setUpdateFormOpen(false),
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
            {currentPlan === "Trial Plan" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Service addOn limit :<strong> {ServiceCount} / 2 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Basic" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Service addOn limit :<strong> {ServiceCount} / 4 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Standard" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Service addOn limit :<strong> {ServiceCount} / 6 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Enterprises" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Service addOn limit :<strong> {ServiceCount} / 8 </strong>
                </small>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="service_list_table table-responsive container w-100 rounded-3">
          <table className="table table-borderless rounded-3" id="example">
            <thead className="table-secondary rounded-3">
              <tr>
                <th className="fw-bold" style={{ width: "20%" }}>
                  IMAGE OR ICON
                </th>

                <th className="fw-bold" style={{ width: "20%" }}>
                  TITLE
                </th>
                <th className="fw-bold" style={{ width: "25%" }}>
                  DESCRIPTION
                </th>
                <th className="fw-bold" style={{ width: "15%" }}>
                  URL
                </th>
                <th className="fw-bold" style={{ width: "25%" }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="shadow-sm">
              {AllService != undefined && AllService.length > 0 ? (
                <>
                  {AllService.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="h-100 align-middle">
                          {/* ServiceIpload image */}
                          {data.ServiceType == "ImageUpload" ? (
                            <>
                              {data.ServiceImage.length != 0 ? (
                                <img
                                  src={
                                    data.ServiceImage != undefined
                                      ? data.ServiceImage
                                      : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                                  }
                                  alt="ServiceImage"
                                  name="ServiceImage"
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
                        </td>

                        <td className="h-100 align-middle">
                          {data.ServiceName}
                        </td>
                        <td className="h-100 align-middle">
                          {data.ServiceDescription.slice(0, 20)}
                        </td>
                        <td className="h-100 align-middle">
                          <a href={data.ServiceURL} target="_blank">
                            {data.ServiceURL != "" ? data.ServiceURL : "N/A"}
                          </a>
                        </td>
                        <td className="h-100 align-middle">
                          <i
                            className="bx bxs-show"
                            style={{ color: "skyBlue" }}
                            onClick={() => handleServiceView(data._id)}
                          ></i>
                          <i
                            className="bx bx-edit"
                            onClick={() => handleServiceEdit(data._id)}
                            style={{ color: "#6571FF" }}
                          ></i>
                          <i
                            className="bx bx-trash-alt"
                            style={{ color: "red" }}
                            onClick={() => handleServiceDelete(data._id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Service Added!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </>
        : 
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
                  value={updateFormOpen ? ServiceURL : formik.values.ServiceURL}
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
                {/* <Editor
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
                /> */}
                <ReactQuill
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
                />

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
                      updateFormOpen ? ServiceType : formik.values.ServiceType
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
                          <img
                            src={
                              ServiceImage != undefined
                                ? ServiceImage
                                : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                            }
                            alt="Image"
                          />
                          {/* <i className="bx bxs-edit-location"></i> */}
                        </label>
                        <input
                          type="file"
                          id="ServiceImage"
                          name="ServiceImage"
                          accept="image/*"
                          onChange={handleServiceChange}
                          onBlur={formik.handleBlur}
                        />
                        <div className="profile_error">
                          {formik.errors.ServiceImage}
                        </div>
                        <p>
                          <strong>Note :</strong> Max file size limit 3MB
                        </p>
                        <small>Allowed file types: png, jpg, jpeg,.gif.</small>
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
                          <label htmlFor="VCardName">Paste Image Address</label>
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
                          <img
                            src={
                              ServiceImage != undefined
                                ? ServiceImage
                                : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                            }
                            alt="Image"
                          />
                          {/* <i className="bx bxs-edit-location"></i> */}
                        </label>
                        <input
                          type="file"
                          id="ServiceImage"
                          name="ServiceImage"
                          accept="image/*"
                          onChange={handleServiceChange}
                          onBlur={formik.handleBlur}
                        />
                        <div className="profile_error">
                          {formik.errors.ServiceImage}
                        </div>
                        <p>
                          <strong>Note :</strong> Max file size limit 3MB
                        </p>
                        <small>Allowed file types: png, jpg, jpeg,.gif.</small>
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
                            onChange={(e) => setServiceAddress(e.target.value)}
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
                      {formik.values.ServiceImage != null ||
                      (formik.values.ServiceIcon.length != 0) |
                        (formik.values.ServiceAddress.length != 0) ? (
                        <div className="save">
                          <button type="submit">Save<i className='bx bxs-save'></i></button>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
                {!serviceFormOpen ? 
                 <div className="discard">
                 <button type="button" onClick={formik.handleReset}>
                   Clear
                 </button>
               </div>
                : ''}
               
              </div>
            </form>
          </div>
        </div>
        </>
        }



        {/* //Update  Service Form */}

        {/* <div
          className="update_new_service_container"
          id={updateFormOpen ? "shadow_background" : ""}
        >
          <div
            className="update_new_service_box"
            id={updateFormOpen ? "serviceUpdateOpen" : "serviceUpdateClose"}
          >
            <div className="title">
              <p>Update Service</p>
              <i
                className="bx bx-x"
                onClick={() => setUpdateFormOpen(false)}
              ></i>
            </div>
            <form action="" onSubmit={handleServiceUpdate}>
              <div className="form_group">
                <label htmlFor="ServiceName">
                  Service Name <sup>*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Enter Service Title"
                  onChange={(e) => setServiceName(e.target.value)}
                  value={ServiceName}
                  // {...formik.getFieldProps("ServiceName")}
                />
              </div>
              <div className="form_group">
                <label htmlFor="ServiceURL">Service URL</label>
                <input
                  type="text"
                  placeholder="Paste Service URL"
                  value={ServiceURL}
                  onChange={(e) => setServiceURL(e.target.value)}
                />
              </div>
              <div className="form_group editor">
                <label htmlFor="ServiceDescription">
                  Description <sup>*</sup>
                </label>
                <UpdateEditor
                  // {...formik.getFieldProps(
                  //   "ServiceDescription",
                  //   ServiceDescription
                  // )}
                  value={ServiceDescription}
                  onTextChange={(e) => setServiceDescription(e.htmlValue)}
                  id="ServiceDescription"
                  name="ServiceDescription"
                  style={{ height: "130px" }}
                  placeholder="Enter Short Description"
                />
             
              </div>
              <div className="form_group serviceImage">
                <label htmlFor="ServiceImage">Service Icon</label>
                <label htmlFor="ServiceImage">
                  <img
                    src={
                      ServiceImage != "undefined"
                        ? ServiceImage
                        : "https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg?t=st=1719422605~exp=1719426205~hmac=bcd7dd8b57efc2e804d100a8b88ba5f9d6c24e865de29bacaa28f2ab02a248f8&w=740"
                    }
                    alt="ServiceImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <input
                  type="file"
                  id="ServiceImage"
                  name="ServiceImage"
                  onChange={onUploadServiceImage}
                />
                <p>
                  <strong>Note :</strong> Max file size limit 2MB
                </p>
                <small>Allowed file types: png, jpg, jpeg,.gif.</small>
              </div>
              <div className="form_submit_actions">
                <div className="save">
                  <button type="submit">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div> */}
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
                  <img
                    src={
                      ServiceImage != "undefined"
                        ? ServiceImage
                        : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                    }
                    alt="service"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
