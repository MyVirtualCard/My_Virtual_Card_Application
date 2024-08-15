import React, { useState, useContext, useEffect, useRef } from "react";
import "./Edit_form_styles/Edit_Gallery.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { convertToBase64GalleryImage } from "../../../../Helper/convert";
import { GalleryValidateShema } from "../../../../Helper/GalleryValidate";
import Context from "../../../../UseContext/Context";
const Gallery = () => {
  let { URL_Alies } = useParams();
  let [AllGallery, setAllGallery] = useState();
  let [GalleryId, setGalleryId] = useState();
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [galleryFormOpen, setGalleryFormOpen] = useState(false);
  let [GalleryType, setGalleryType] = useState();
  let [GalleryImageURL, setGalleryImageURL] = useState();
  let {
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    setShowForm,
    userName,
    successMessage,setSuccessMessage,
    successPopupOpen,setSuccessPopupOpen,
    errorMessage,setErrorMessage,
    errorPopupOpen,setErrorPopupOpen,
  } = useContext(Context);

  let [GalleryCount, setGalleryCount] = useState(0);
  let [GalleryURL, setGalleryURL] = useState();
  let [GalleryImage, setGalleryImage] = useState(null);
  let [GalleryName, setGalleryName] = useState("");
  let [fullImageToggle, setFullImageToggle] = useState(false);
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));

  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  async function fetchCurrentGallery() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/galleryDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
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
          
          toast.error(error.response.data.message)
          setFormSubmitLoader(false);
        });
    } catch (error) {
   console.log(error.message)
  setFormSubmitLoader(false);
    }
  }
  useEffect(() => {
    fetchCurrentGallery();
  }, [key]);

  const handleGalleryImageChange = (event) => {
    const GalleryImage = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(GalleryImage);
    reader.onload = () => {
      formik.setFieldValue("GalleryImage", reader.result);
      setGalleryImage(reader.result);
    };
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
    validationSchema: GalleryValidateShema,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        GalleryImage: GalleryImage || "",
      });
      setFormSubmitLoader(true);
      await api
        .post(`/galleryDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
       
          toast.success(res.data.message)
          if(currentPlan === "Trial Plan" && GalleryCount == 2){
            setTimeout(()=>{
              setShowForm('Testimonials')
            },500)
          };
          if(currentPlan === "Basic" && GalleryCount == 4){
            setTimeout(()=>{
              setShowForm('Testimonials')
            },500)
          };
          if(currentPlan === "Standard" && GalleryCount == 6){
            setTimeout(()=>{
              setShowForm('Testimonials')
            },500)
          };
          if(currentPlan === "Enterprises" && GalleryCount ==10){
            setTimeout(()=>{
              setShowForm('Testimonials')
            },500)
          };
          setFormSubmitLoader(false);
          setGalleryCount(++GalleryCount);
          setGalleryImage(null);
          setGalleryImageURL = "";
          
          setTimeout(() => {
            setGalleryFormOpen(false);
            reloadComponent();
          }, 1000);
        })
        .catch((error) => {
        
          toast.error(error.response.data.message)
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
            Authorization: `Bearer ${localStorageDatas.token}`,
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
            Authorization: `Bearer ${localStorageDatas.token}`,
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
      ;
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error)
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
    try {
      api
        .put(`/galleryDetail/updateID/${GalleryId}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
       
toast.success(res.data.message)
          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
            setGalleryImage(null);
            setUpdateFormOpen(false);
          }, 1000);
        })
        .catch((error) => {
       
          toast.error(error.response.data.message)
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error)
      setFormSubmitLoader(false);
    }
  }
  async function handleGalleryDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      api
        .delete(`/galleryDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message)

          setGalleryCount(--GalleryCount);
          setFormSubmitLoader(false);
          reloadComponent();
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          setFormSubmitLoader(false);
        });
    } catch (error) {
    console.log(error)
    setFormSubmitLoader(false);
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

        <div className="plan_title">
          <p>
            <strong>{currentPlan}  </strong>&nbsp; Subscribed!
          </p>
        </div>
        <div className="add_new_gallery">
        {currentPlan === "Trial Plan" && GalleryCount != 2 ? (
                  <button onClick={() => setGalleryFormOpen(true)}>
                  <i className="bx bx-plus"></i>Add New Gallery
                </button>
          ) : (
      ''
          )}
          {currentPlan === "Basic" && GalleryCount != 4 ? (
                     <button onClick={() => setGalleryFormOpen(true)}>
                     <i className="bx bx-plus"></i>Add New Gallery
                   </button>
          ) : (
           ''
          )}
          {currentPlan === "Standard" && GalleryCount != 6 ? (
                     <button onClick={() => setGalleryFormOpen(true)}>
                     <i className="bx bx-plus"></i>Add New Gallery
                   </button>
          ) : (
      ''
          )}
          {currentPlan === "Enterprises" && GalleryCount != 10 ? (
             <button onClick={() => setGalleryFormOpen(true)}>
             <i className="bx bx-plus"></i>Add New Gallery
           </button>
          ) : (
          ''
          )}
     
        </div>
        <div className="plan_based_service_add_note">
          <div className="note">
            {currentPlan === "Trial Plan" ? (
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
                  Max Image addOn limit :<strong> {GalleryCount} / 4</strong>
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

            {currentPlan === "Enterprises" ? (
              <>
                <i class="bx bx-upload "></i>
                <small>
                  Max Image addOn limit :<strong> {GalleryCount} / 10 </strong>
                </small>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {!fullImageToggle ? (
          <div className="gallery_list_table table-responsive container w-100 rounded-3">
            <table className="table rounded-3" id="example">
              <thead className="table-secondary rounded-3">
                <tr>
                  <th className="fw-bold" style={{ width: "20%" }}>
                    COUNT
                  </th>
                  <th className="fw-bold" style={{ width: "20%" }}>
                    UPLOAD IMAGE
                  </th>
                  <th className="fw-bold" style={{ width: "30%" }}>
                     URL Image
                  </th>
                  <th className="fw-bold" style={{ width: "30%" }}>
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className=" shadow-sm">
                {AllGallery != undefined ? (
                  <>
                    {AllGallery.map((data, index) => {

                      console.log(data.GalleryImageURL.length)
                      return (
                        <tr key={index}>
                          <td className="h-100 align-middle">{index + 1}</td>
                          <td className="h-100 align-middle">
                           {data.GalleryImage.length > 0 ? <img src={data.GalleryImage} alt="gallery_image" />: "Null"} 
                          </td>
                          <td className="h-100 align-middle fw-semibold">
                            {data.GalleryImageURL.length > 0 ?   <img src={data.GalleryImageURL} alt="gallery_image" />: 'Null'}
                        
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
                      No Gallery Images Added!
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
                      <img
                        src={
                          GalleryImage != undefined
                            ? GalleryImage
                            : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                        }
                        alt="Image"
                      />
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
                        formik.errors.GalleryImage && formik.touched.GalleryImage
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
                        formik.errors.GalleryImageURL && formik.touched.GalleryImageURL
                          ? "input_error"
                          : "input_success"
                      }

                      
                    />
                           <div className="url_error">{formik.errors.GalleryImageURL}</div>
                  </div>
                )}
              </div>

              <div className="form_submit_actions">
                {formik.values.GalleryImage != null || formik.values.GalleryImageURL.length != 0 ?  <div className="save">
                  <button type="submit" >
                    Save
                  </button>
                </div>: ''}
              
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
                      onChange={(e)=>setGalleryType(e.target.value)}
                   
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
                      <img
                        src={
                          GalleryImage != undefined
                            ? GalleryImage
                            : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                        }
                        alt="Image"
                      />
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
                      onChange={handleGalleryImageChange}
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
                      onChange={(e)=>setGalleryImageURL(e.target.value)}
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

export default Gallery;
