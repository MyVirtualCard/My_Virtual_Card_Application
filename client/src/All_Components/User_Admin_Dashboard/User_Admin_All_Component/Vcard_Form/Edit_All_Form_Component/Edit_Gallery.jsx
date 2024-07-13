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
import Context from "../../../../UseContext/Context";
const Gallery = () => {
  let {URL_Alies}=useParams();
  let [AllGallery, setAllGallery] = useState();
  let [GalleryId, setGalleryId] = useState();
  let [updateFormOpen, setUpdateFormOpen] = useState(false);
  let [galleryFormOpen, setGalleryFormOpen] = useState(false);
  let {
    currentPlan,
    setCurrentPlan,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
  } = useContext(Context);

  let[GalleryCount,setGalleryCount]=useState(0);
  let [GalleryURL, setGalleryURL] = useState();
  let [GalleryImage, setGalleryImage] = useState(null);
  let[GalleryName,setGalleryName]=useState('')
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
        .get(
          `/galleryDetail/${URL_Alies}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.data.length == 0) {
            // toast.error("No Gallery added!");
            setFormSubmitLoader(false);
          } else {
            setAllGallery(res.data.data);
            setGalleryCount(res.data.data.length)
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
    setGalleryImage(base64);
  };
  const [filename, setFilename] = useState("Choose File");

  // const onUploadGalleryImage = (e) => {
  //   setGalleryImage(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  // };

  let formik = useFormik({
    initialValues: {
      URL_Alies:URL_Alies,
      GalleryURL: "",
      GalleryImage: null,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      values = await Object.assign(values, {
        GalleryImage: GalleryImage || "",
      });
      const formData = new FormData();
      formData.append('URL_Alies',URL_Alies)
      formData.append("GalleryImage", values.GalleryImage);
      formData.append("GalleryURL", values.GalleryURL);
      setFormSubmitLoader(true);
      await api
        .post(`/galleryDetail/${URL_Alies}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
setGalleryCount(++GalleryCount)
          setGalleryImage(null);
          values.GalleryURL = "";
          reloadComponent();
          setTimeout(()=>{
            setGalleryFormOpen(false)
          },1000)
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
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
          setGalleryURL(res.data.data.GalleryURL);
          setGalleryId(res.data.data._id);
          setFormSubmitLoader(false);
        })

        .catch((error) => {
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
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
      GalleryImage,
      GalleryURL,
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
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
          setTimeout(() => {
            setGalleryImage(null)
            setUpdateFormOpen(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleGalleryDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      api
        .delete(`/galleryDetail/deleteID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setGalleryCount(--GalleryCount)
          setFormSubmitLoader(false);
          reloadComponent();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
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
            <strong>{currentPlan} plan </strong>&nbsp; Subscribed!
          </p>
        </div>
        <div className="add_new_gallery">
          <button onClick={() => setGalleryFormOpen(true)}><i className='bx bx-plus'></i>Add Gallery</button>
        </div>
        <div className="plan_based_service_add_note">
          <div className="note">
            {currentPlan === "Demo" ? (
                <>
                <i class="bx bx-upload "></i>
                <small>
                Demo Plan Gallery access denied!
                </small>
              </>
     
            ) : (
              ""
            )}

            {currentPlan === "Basic" ? (
           <>
           <i class="bx bx-upload "></i>
           <small>
             Max Image addOn limit :<strong> {GalleryCount} / 4 </strong>
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
                  <th className="fw-bold" style={{width:'10%'}}>COUNT</th>
                  <th className="fw-bold" style={{width:'20%'}}>IMAGE</th>
                  <th className="fw-bold" style={{width:'40%'}}>URL</th>
                  <th className="fw-bold" style={{width:'30%'}}>ACTIONS</th>
                </tr>
              </thead>
              <tbody className=" shadow-sm">
                {AllGallery != undefined ? (
                  <>
                    {AllGallery.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td className="h-100 align-middle">{index + 1}</td>
                          <td className="h-100 align-middle">
                            <img src={data.GalleryImage} alt="gallery_image" />
                          </td>
                          <td className="h-100 align-middle fw-semibold">
                            {data.GalleryURL != "" ? data.GalleryURL : "N/A"}
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
                <label htmlFor="GalleryImage">
                  Choose Your Image<sup>*</sup>
                </label>
                <label htmlFor="GalleryImage">
                  <img
                    src={
                      GalleryImage != undefined
                        ? GalleryImage
                        : "https://img.freepik.com/free-vector/realistic-fog-background_23-2149115275.jpg?t=st=1715977908~exp=1715981508~hmac=1d533445708d92e0d4c40a4db9ebd8a90505fbfa07dcb1b58b5915f9fde4f028&w=900"
                    }
                    alt="GalleryImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <p>
                  <strong>Note :</strong> Max image size limit 2MB
                </p>
                <small>Allowed file types: png, jpg, jpeg.</small>

                <input
                  type="file"
                  id="GalleryImage"
                  name="GalleryImage"
                  onChange={onUploadGalleryImage}
                />
              </div>
              <div className="form_group">
                <label htmlFor="GalleryURL">Image URL</label>
                <input
                  type="text"
                  placeholder="Paste Image URL"
                  {...formik.getFieldProps("GalleryURL")}
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
                <label htmlFor="GalleryImage">
                  Choose Your Image<sup>*</sup>
                </label>
                <label htmlFor="GalleryImage">
                  <img
                    src={
                      GalleryImage != undefined
                        ? GalleryImage
                        : "https://img.freepik.com/free-vector/realistic-fog-background_23-2149115275.jpg?t=st=1715977908~exp=1715981508~hmac=1d533445708d92e0d4c40a4db9ebd8a90505fbfa07dcb1b58b5915f9fde4f028&w=900"
                    }
                    alt="GalleryImage"
                  />
                  <i className="bx bxs-edit-location"></i>
                </label>
                <p>
                  <strong>Note :</strong> Max image size limit 2MB
                </p>
                <small>Allowed file types: png, jpg, jpeg.</small>

                <input
                  type="file"
                  id="GalleryImage"
                  name="GalleryImage"
                  onChange={onUploadGalleryImage}
                />
              </div>
              <div className="form_group">
                <label htmlFor="GalleryURL">Image URL</label>
                <input
                  type="text"
                  placeholder="Paste Image URL"
                  value={GalleryURL}
                  onChange={() => setGalleryURL(e.target.value)}
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

export default Gallery;
