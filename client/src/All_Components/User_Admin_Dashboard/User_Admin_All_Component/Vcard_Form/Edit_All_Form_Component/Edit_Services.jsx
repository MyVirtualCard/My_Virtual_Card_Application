import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Services.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import { Editor as UpdateEditor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64ServiceImage } from "../../../../Helper/convert";
import Context from "../../../../UseContext/Context";
import { ServiceValidateShema } from "../../../../Helper/ServiceValidate";
const Services = () => {
  let { URL_Alies } = useParams();
  let {
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
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
          console.log(res);
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
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
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
      ServiceImage: undefined,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ServiceValidateShema,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      values = await Object.assign(values, {
        ServiceImage: ServiceImage || "",
      });
      values.ServiceDescription = stripHtmlTags(ServiceDescription);
      // const formData = new FormData();

      // formData.append("URL_Alies", URL_Alies);
      // formData.append("ServiceImage", ServiceImage);
      // formData.append("ServiceName", values.ServiceName);
      // formData.append("ServiceURL", values.ServiceURL);
      // formData.append(
      //   "ServiceDescription",
      //   (values.ServiceDescription = stripHtmlTags(ServiceDescription))
      // );

      await api
        .post(`/serviceDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setFormSubmitLoader(false);
          toast.success(res.data.message);
          reloadComponent();
          setServiceCount(++ServiceCount);
          setTimeout(() => {
            values.ServiceName = "";

            values.ServiceURL = "";
            // values.ServiceDescription = "";
            values.ServiceImage = undefined;
            setServiceImage(undefined);
            setServiceFormOpen(false);
          }, 500);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
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
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
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
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
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

          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
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
          reloadComponent();
          setServiceCount(--ServiceCount);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
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
            <strong>{currentPlan} plan </strong>&nbsp; Subscribed!
          </p>
        </div>

        <div className="add_new_service">
          <button
            onClick={() => {
              setServiceFormOpen(true), setUpdateFormOpen(false);
            }}
          >
            <i className="bx bx-plus"></i>Add Service
          </button>
        </div>
        <div className="plan_based_service_add_note">
          <div className="note">
            {currentPlan === "Demo" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>Demo Plan service access denied!</small>
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
          <table className="table rounded-3" id="example">
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
              {AllService != undefined ? (
                <>
                  {AllService.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="h-100 align-middle">
                          {data.ServiceType == "ImageUpload" ? (
                            <>
                              {data.ServiceImage.length != 0 ? (
                                <img
                                  src={
                                    data.ServiceImage != undefined
                                      ? data.ServiceImage
                                      : `https://img.freepik.com/premium-photo/hand-holds-icon-cancellation-symbol-cancel-icon-cross-mark-flat-red-icon-round-x-mark-cancel-button-wrong-cross-mark-rejection-declined-dark-background-banner-copy-space-place-text_150455-9901.jpg?w=900`
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

        {/* //Create New Service Form */}

        <div
          className="create_new_service_container"
          id={serviceFormOpen ? "shadow_background" : ""}
        >
          <div
            className="create_new_service_box"
            id={serviceFormOpen ? "serviceOpen" : "serviceClose"}
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
                      ? handleServiceTypeChange
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
              <div className="form_group editor">
                <label htmlFor="ServiceDescription">
                  Description <sup>*</sup>
                </label>
                <Editor
                  id="ServiceDescription"
                  name="ServiceDescription"
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
                  onBlur={formik.handleBlur}
                  style={{ height: "130px" }}
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
                  </select>
                </div>
              </div>
              {!updateFormOpen ? (
                <>
                  {formik.values.ServiceType == "ImageUpload" ? (
                    <div className="form_group serviceImage">
                      {/* <label htmlFor="ServiceImage">Service Icon</label> */}

                      <label htmlFor="Image">
                        <img
                          src={
                            ServiceImage != undefined
                              ? ServiceImage
                              : "https://img.freepik.com/free-vector/autumn-background_23-2149054409.jpg?t=st=1715971926~exp=1715975526~hmac=064e47d99740a4e25fb7345c45d5bc744da1c1ad7f5f1e14668eaae2cc601381&w=900"
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
                      <div className="error">{formik.errors.ServiceIcon}</div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {ServiceType == "ImageUpload" ? (
                    <div className="form_group serviceImage">
                      {/* <label htmlFor="ServiceImage">Service Icon</label> */}

                      <label htmlFor="Image">
                        <img
                          src={
                            ServiceImage != undefined
                              ? ServiceImage
                              : "https://img.freepik.com/free-vector/autumn-background_23-2149054409.jpg?t=st=1715971926~exp=1715975526~hmac=064e47d99740a4e25fb7345c45d5bc744da1c1ad7f5f1e14668eaae2cc601381&w=900"
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
                      <div className="error">{formik.errors.ServiceIcon}</div>
                    </div>
                  )}
                </>
              )}

              <div className="form_submit_actions">
                <div className="save">
                  {updateFormOpen ? (
                    <button type="submit" onClick={handleServiceUpdate}>
                      Update
                    </button>
                  ) : (
                    <>
                      {formik.values.ServiceImage != null ||
                      formik.values.ServiceIcon.length != 0 ? (
                        <div className="save">
                          <button type="submit">Save</button>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
                <div className="discard">
                  <button type="button" onClick={formik.handleReset}>
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

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
                        : "https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg?t=st=1719422605~exp=1719426205~hmac=bcd7dd8b57efc2e804d100a8b88ba5f9d6c24e865de29bacaa28f2ab02a248f8&w=740"
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
