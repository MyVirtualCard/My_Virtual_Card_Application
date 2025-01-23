import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Testimonial.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { convertToBase64ClientImage } from "../../../Helper/convert";
import { AppContext } from "../../../Context/AppContext";
const Edit_Testimonial = () => {
  let { URL_Alies } = useParams();
  let [viewTestimonialDetail, setViewTestimonialDetail] = useState(false);
  let [testimonialFormOpen, setTestimonialFormOpen] = useState(false);
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [testimonialId, setTestimonialId] = useState();
  let [AllTestimonial, setAllTestimonial] = useState();
  let {
    Token,
    currentPlan,
    setFormSubmitLoader,
    setShowForm,
    setErrorPopupOpen,
  } = useContext(AppContext);
  let [ClientCount, setClientCount] = useState(0);
  let [ClientName, setClientName] = useState();
  let [ClientFeedback, setClientFeedback] = useState("");
  let [ClientImage, setClientImage] = useState();
  let [ClientReviewDate, setClientReviewDate] = useState();
  const [key, setKey] = useState(0);


  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  async function fetchAllTestimonial() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/testimonialDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            // toast.error("Empty Testimonial!");
            setFormSubmitLoader(false);
          } else {
          
            setAllTestimonial(res.data.data);
            setClientCount(res.data.data.length);
            setFormSubmitLoader(false);
          }
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
  useEffect(() => {
    fetchAllTestimonial();
  }, [key]);
  const onUploadClientImage = async (e) => {
    let base64 = await convertToBase64ClientImage(e.target.files[0]);
    setClientImage(base64);
  };
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      ClientName: "",
      ClientFeedback: "",
      ClientReviewDate: "",
      ClientImage: undefined,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      values.URL_Alies = URL_Alies;
      values = await Object.assign(values, { ClientImage: ClientImage || "" });
      values.ClientFeedback = stripHtmlTags(ClientFeedback);
      setFormSubmitLoader(true);
      await api
        .post(`/testimonialDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          reloadComponent();
          setClientCount(++ClientCount);
          if (currentPlan === "Free" && ClientCount == 2) {
            setTimeout(() => {
              setShowForm("GoogleMap");
            }, 2000);
          }
          if (currentPlan === "Basic" && ClientCount == 5) {
            setTimeout(() => {
              setShowForm("GoogleMap");
            }, 100);
          }
          if (currentPlan === "Standard" && ClientCount == 6) {
            setTimeout(() => {
              setShowForm("GoogleMap");
            }, 2000);
          }
          if (currentPlan === "EnterPrice" && ClientCount == 8) {
            setTimeout(() => {
              setShowForm("GoogleMap");
            }, 2000);
          }
          setTimeout(() => {
            values.ClientName = "";
            setClientImage(undefined);
            values.ClientFeedback = stripHtmlTags("");
            setClientFeedback("");
            values.ClientReviewDate = "";
            setTestimonialFormOpen(false);
          }, 500);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          // setTestimonialFormOpen(false);
          setFormSubmitLoader(false);
        });
    },
  });
  async function handleTestimonialView(id) {
    setViewTestimonialDetail(true);
    try {
      await api
        .get(`/testimonialDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setViewTestimonialDetail(true);
          setClientName(res.data.data.ClientName);
          setClientReviewDate(res.data.data.ClientReviewDate);
          setClientFeedback(
            (res.data.data.ClientFeedback = stripHtmlTags(
              res.data.data.ClientFeedback
            ))
          );
          setClientImage(res.data.data.ClientImage);
          // set(res.data.data._id);
          setFormSubmitLoader(false);
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
  async function handleTestimonialEdit(id) {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/testimonialDetail/specificID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setUpdateFormOpen(true);
          reloadComponent();
          setClientReviewDate(res.data.data.ClientReviewDate);
          setClientName(res.data.data.ClientName);
          setClientImage(res.data.data.ClientImage);
          setClientFeedback(res.data.data.ClientFeedback);
          setTestimonialId(res.data.data._id);
          setFormSubmitLoader(false);
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

  async function handleTestimonialUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);

    // const formData = new FormData();
    // formData.append("ServiceImage", ServiceImage);
    // formData.append('ServiceName',ServiceName);
    // formData.append('ServiceURL',ServiceURL);
    // formData.append('ServiceDescription', ServiceDescription = stripHtmlTags(ServiceDescription));

    let data = {
      URL_Alies,
      ClientName,
      ClientImage,
      ClientReviewDate,
      ClientFeedback: stripHtmlTags(ClientFeedback),
    };
    try {
      api
        .put(`/testimonialDetail/updateID/${testimonialId}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setTimeout(() => {
            setUpdateFormOpen(false);
            setClientImage(undefined);
            setClientName("");
            setClientFeedback("");
            setClientReviewDate("");
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
  async function handleTestimonialDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      api
        .delete(`/testimonialDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          reloadComponent();

          toast.success(res.data.message);
          setClientCount(--ClientCount);
          setFormSubmitLoader(false);
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
      <div className="update_testimonial_container">
      <div className="image_title">
          <h4>Testimonial's</h4>
        </div>
      
        {!testimonialFormOpen && !updateFormOpen ? 
        <>
          <div className="add_new_testimonial">
          {currentPlan === "Free" && ClientCount != 2 ? (
            <button onClick={() => setTestimonialFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Testimonial
            </button>
          ) : (
            ""
          )}
          {currentPlan === "Basic" && ClientCount != 5 ? (
            <button onClick={() => setTestimonialFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Testimonial
            </button>
          ) : (
            ""
          )}
          {currentPlan === "Standard" && ClientCount != 6 ? (
            <button onClick={() => setTestimonialFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Testimonial
            </button>
          ) : (
            ""
          )}
          {currentPlan === "EnterPrice" && ClientCount != 8 ? (
            <button onClick={() => setTestimonialFormOpen(true)}>
              <i className="bx bx-plus"></i>Add New Testimonial
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
                  Max Client Detail addOn limit :
                  <strong> {ClientCount} / 2 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Basic" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Client Detail addOn limit :
                  <strong> {ClientCount} / 5 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "Standard" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Client Detail addOn limit :
                  <strong> {ClientCount} / 6 </strong>
                </small>
              </>
            ) : (
              ""
            )}

            {currentPlan === "EnterPrice" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Client Detail addOn limit :
                  <strong> {ClientCount} / 8 </strong>
                </small>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
 
               {/* All Testimonial */}
               <div className="All_testimonial_container">
              {AllTestimonial != undefined && AllTestimonial.length != 0 ? (
                <>
                  {AllTestimonial.map((data, index) => {
                    return (
                      <div className="video_box" key={index}>
                        <div className="video_header">
                          <h2>Client Review - {index + 1}</h2>
                        </div>
                        <div className="video">
                       
                              {data.ClientImage ? (
                                <img
                                  src={
                                    data.ClientImage != undefined
                                      ? data.ClientImage
                                      : `https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996`
                                  }
                                  alt="ClientImage"
                                  name="ClientImage"
                                />
                             
                              ) : (
                              <img src='https://img.freepik.com/free-vector/minimalist-geometric-judith-s-tiktok-profile-picture_742173-12131.jpg?ga=GA1.1.111147909.1717157513&semt=ais_hybrid'>
                              </img>
                              )}
                        
                      
                        </div>
                        <div className="product_details">
                          <div className="detail">
                            <div className="title">
                              <h5>Client Name </h5>
                            </div>
                            <div className="data">
                              <small>:</small>
                              <p>{data.ClientName}</p>
                            </div>
                          </div>
                          <div className="detail">
                            <div className="title">
                              <h5>Client Feedback </h5>
                            </div>
                            <div className="data">
                              <small>:</small>
                              <p>{data.ClientFeedback}</p>
                            </div>
                          </div>
                          <div className="detail">
                            <div className="title">
                              <h5>Review Date </h5>
                            </div>
                            <div className="data">
                              <small>:</small>
                              <p
                            >
                              {data.ClientReviewDate}
                              </p>
                            </div>
                          </div>
                     
                        </div>
                        <div className="icon_actions">
                          <div className="delete">
                            <i
                              className="bx bx-trash-alt"
                              style={{ color: "red" }}
                              onClick={() => handleTestimonialDelete(data._id)}
                            ></i>
                            <small>Delete</small>
                          </div>
                          <div className="show">
                            <i
                              className="bx bxs-show"
                              style={{ color: "skyBlue" }}
                              onClick={() => handleTestimonialView(data._id)}
                            ></i>
                            <small>View</small>
                          </div>
                          <div className="edit">
                            <i
                              className="bx bx-edit"
                              style={{ color: "#6571FF" }}
                              onClick={() => handleTestimonialEdit(data._id)}
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
                  <small> Testimonial's not been Added!</small>
                </div>
              )}
            </div>
        </>
        : <>
        
        {/* //Create Testimonial Form */}
           {testimonialFormOpen ? (
          <div
            className="create_new_testimonial_container"
            // id={testimonialFormOpen ? "shadow_background" : ""}
          >
            <div
              className="create_new_testimonial_box"
              // id={testimonialFormOpen ? "testimonialOpen" : "testimonialClose"}
            >
              <div className="title">
                <p>New Testimonial</p>
                <i
                  className="bx bx-x"
                  onClick={() => setTestimonialFormOpen(false)}
                ></i>
              </div>
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="form_group">
                  <label htmlFor="ClientName">
                    Client Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Client Name"
                    {...formik.getFieldProps("ClientName")}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="ClientReviewDate">
                    Client Review Date <sup>*</sup>
                  </label>
                  <input
                    type="date"
                    placeholder="Enter Client Reviewed Date"
                    value={formik.values.ClientReviewDate}
                    {...formik.getFieldProps(
                      "ClientReviewDate",
                      ClientReviewDate
                    )}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="ClientFeedback">
                    Client Feedback <sup>*</sup>
                  </label>
                  <Editor
                    {...formik.getFieldProps("ClientFeedback")}
                    value={formik.values.ClientFeedback}
                    onTextChange={(e) => setClientFeedback(e.htmlValue)}
                    id="ClientFeedback"
                    name="ClientFeedback"
                    style={{ height: "130px" }}
                    placeholder="Enter Short Description"
                  />
                  {/* <textarea name="client_description" id="client_description" cols="48" rows="4" placeholder="Enter Short Description"></textarea> */}
                </div>
             
                <div className="form_group" style={{placeItems:'center'}}>
                  <label htmlFor="ClientImage">Client Image</label>
                  <label htmlFor="ClientImage">
                    <img
                      src={
                        ClientImage != undefined
                          ? ClientImage
                          : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                      }
                      alt="ClientImage"
                    />
                    <i className="bx bxs-edit-location"></i>
                  </label>
                  <small>Allowed file types: png, jpg, jpeg.</small>
                  <input
                    type="file"
                    id="ClientImage"
                    name="ClientImage"
                    onChange={onUploadClientImage}
                  />
                </div>
                <div className="form_submit_actions">
                  <div className="save">
                    <button type="submit">Save</button>
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
        ) : (
          ""
        )}
        
        {/* //update New Service Form */}
        {updateFormOpen ? (
          <div
            className="update_new_testimonial_container"
            // id={updateFormOpen ? "shadow_background" : ""}
          >
            <div
              className="update_new_testimonial_box"
              // id={
              //   updateFormOpen
              //     ? "testimonialUpdateOpen"
              //     : "testimonialUpdateClose"
              // }
            >
              <div className="title">
                <p>Update Testimonial</p>
                <i
                  className="bx bx-x"
                  onClick={() => setUpdateFormOpen(false)}
                ></i>
              </div>
              <form action="" onSubmit={handleTestimonialUpdate}>
                <div className="form_group">
                  <label htmlFor="ClientName">
                    Client Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Client Name"
                    value={ClientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="ClientReviewDate">
                    Client Review Date <sup>*</sup>
                  </label>
                  <input
                    type="date"
                    placeholder="Enter Client Reviewed Date"
                    value={ClientReviewDate}
                    onChange={(e) => setClientReviewDate(e.target.value)}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="ClientFeedback">
                    Client Feedback <sup>*</sup>
                  </label>
                  <Editor
                    {...formik.getFieldProps("ClientFeedback", ClientFeedback)}
                    value={ClientFeedback}
                    onTextChange={(e) => setClientFeedback(e.htmlValue)}
                    s
                    id="ClientFeedback"
                    name="ClientFeedback"
                    style={{ height: "130px" }}
                    placeholder="Enter Short Description"
                  />
                  {/* <textarea name="client_description" id="client_description" cols="48" rows="4" placeholder="Enter Short Description"></textarea> */}
                </div>
                <div className="form_group">
                  <label htmlFor="ClientImage">Client Image</label>
                  <label htmlFor="ClientImage">
                    <img
                      src={
                        ClientImage
                          ? ClientImage
                          : "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                      }
                      alt="ClientImage"
                    />
                    <i className="bx bxs-edit-location"></i>
                  </label>
                  <small>Allowed file types: png, jpg, jpeg.</small>
                  <input
                    type="file"
                    id="ClientImage"
                    name="ClientImage"
                    onChange={onUploadClientImage}
                  />
                </div>
                <div className="form_submit_actions">
                  <div className="save">
                    <button type="submit">Update</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        </>}




     


        {/* //Testimonial  Detail Box */}

        <div
          className="view_new_testimonial_container"
          id={viewTestimonialDetail ? "shadow_background" : ""}
        >
          <div
            className="view_new_testimonial_box"
            id={
              viewTestimonialDetail ? "serviceUpdateOpen" : "serviceUpdateClose"
            }
          >
            <div className="title">
              <p>Testimonial Details</p>
              <i
                className="bx bx-x"
                onClick={() => setViewTestimonialDetail(false)}
              ></i>
            </div>
            <div className="details_container">
              <div className="service_name">
                <div className="service_title">Client Name</div>
                <div className="name">
                  <p>{ClientName != undefined ? ClientName : "N/A"}</p>
                </div>
              </div>
              <div className="service_desc">
                <div className="service_title">Client Feedback</div>
                <div className="name">
                  <p>
                    {ClientFeedback != undefined
                      ? stripHtmlTags(ClientFeedback)
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="service_url">
                <div className="service_title">Review Date</div>
                <div className="name">
                  <p>
                    {ClientReviewDate != undefined ? ClientReviewDate : "N/A"}
                  </p>
                </div>
              </div>
              <div className="service_image">
                <div className="service_title">Client Image</div>
                <div className="service_image">
                  <img
                    src={
                      ClientImage != undefined
                        ? ClientImage
                        : "https://img.freepik.com/free-photo/texture-cold-gray-background-copy-space-generative-ai_169016-29494.jpg?t=st=1719067458~exp=1719071058~hmac=cd83aaa24c4e3db687a13e63bc286a6ae631fa31fc3c17a55273372b6a109a0f&w=1060"
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

export default Edit_Testimonial;
