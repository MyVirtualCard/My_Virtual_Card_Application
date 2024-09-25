import React, { useRef, useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Select_Template.scss";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import Gym_Trainer from "../../../assets/Digicards/Preview/GYM_TRAINER_PREVIEW.png";
import Taxi_Service from "../../../assets/Digicards/Preview/TAXI_DRIVER_PREVIEW.png";
import Fashion_Desinger from "../../../assets/Digicards/Preview/FASHION_DESIGNER_PREVIEW.png";
import Manager from "../../../assets/Digicards/Preview/MANAGER_PREVIEW.png";
// import Bussiness from "../../../assets/Digicards/Bussiness_Consultant.png";
// import RealEstate from "../../../assets/Digicards/Real_Estate.png";
import BeautyParlor from "../../../assets/Digicards/Preview/BEAUTY_PARLOR_PREVIEW.png";
// import BoutiqueShop from "../../../assets/Digicards/Boutique_Shop.png";
import CorporateCompany from "../../../assets/Digicards/Preview/CORPORATE_COMPANY_PREVIEW.png";
import selected_gif from "../../../assets/animations/vcard_selected.gif";
import touch_gif from "../../../assets/animations/touch.gif";
import Context from "../../../Context/GlobalContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import touch_hand from "../../../assets/Client_Dashboard/touch.gif";
let FreeTemplate = [
  {
    id: 5,
    image: CorporateCompany,
    TemplateName: "Corporate Company",
  },
];
let BasicTemplate = [
  {
    id: 1,
    image: CorporateCompany,
    TemplateName: "Corporate Company",
  },
  {
    id: 2,
    image: Gym_Trainer,
    TemplateName: "Gym Trainer",
  },
  {
    id: 3,

    image: Taxi_Service,
    TemplateName: "Taxi Service",
  },
  {
    id: 4,
    image: Fashion_Desinger,
    TemplateName: "Fashion Designer",
  },
  {
    id: 5,
    image: Manager,
    TemplateName: "Manager",
  },

  {
    id: 6,
    image: BeautyParlor,
    TemplateName: "Beauty Parlor",
  },

];
let StandardTemplate = [
  {
    id: 1,
    image: Gym_Trainer,
    TemplateName: "Gym Trainer",
  },
  {
    id: 2,

    image: Taxi_Service,
    TemplateName: "Taxi Service",
  },
  {
    id: 3,
    image: Fashion_Desinger,
    TemplateName: "Fashion Designer",
  },
  {
    id: 4,
    image: Manager,
    TemplateName: "Manager",
  },
  {
    id: 5,
    image: CorporateCompany,
    TemplateName: "Corporate Company",
  },
  {
    id: 6,
    image: BeautyParlor,
    TemplateName: "Beauty Parlor",
  },

];
let EnterpriceTemplate = [
  {
    id: 1,
    image: Gym_Trainer,
    TemplateName: "Gym Trainer",
  },
  {
    id: 2,

    image: Taxi_Service,
    TemplateName: "Taxi Service",
  },
  {
    id: 3,
    image: Fashion_Desinger,
    TemplateName: "Fashion Designer",
  },
  {
    id: 4,
    image: Manager,
    TemplateName: "Manager",
  },
  {
    id: 5,
    image: CorporateCompany,
    TemplateName: "Corporate Company",
  },
  {
    id: 6,
    image: BeautyParlor,
    TemplateName: "Beauty Parlor",
  },
];

const Select_Template = () => {
  let { URL_Alies } = useParams();
  let {
    user,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
    currentPlan,
    setCurrentPlan,
    SavedPlan,
    setSavedPlan,
    currentTemplate,
    setCurrentTemplate,
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
  let [BannerToggle, setBannerToggle] = useState(true);
  let [BussinessHourToggle, setBussinessHourToggle] = useState(true);
  let [GoogleMapToggle, setGoogleMapToggle] = useState(true);
  let [AppoinmentToggle, setAppoinmentToggle] = useState(true);
  let [ServiceToggle, setServiceToggle] = useState(true);
  let [ProductToggle, setProductToggle] = useState(true);
  let [GalleryToggle, setGalleryToggle] = useState(true);
  let [TestimonialToggle, setTestimonialToggle] = useState(true);
  let [QRCodeToggle, setQRCodeToggle] = useState(true);
  let [FeedbackFormToggle, setFeedbackFormToggle] = useState(true);
  let [InquiryFormToggle, setInquiryFormToggle] = useState(true);
  let [SocialMediaToggle, setSocialMediaToggle] = useState(true);
  let [ContactDetailsToggle, setContactDetailsToggle] = useState(true);
  // let [currentTemplate, setCurrentTemplate] = useState(null);
  let [VCardAdded, setVCardAdded] = useState(0);
  let [savedTemplate, setSavedTemplate] = useState(null);
  let [Count, setCount] = useState(0);
  let handShow=()=>{
  // Set up the interval to increment the count every second
  const interval = setInterval(() => {
    setCount((prevCount) => prevCount + 1);
  }, 1000);

  // Clear the interval after 10 seconds
  const timeout = setTimeout(() => {
    clearInterval(interval);
  }, 3000); // 5 seconds

  // Cleanup function: clear interval and timeout on component unmount
  return () => {
    clearInterval(interval);
    clearTimeout(timeout);
  };
  }

  function handle_Template_Selection(getCurrentId) {
    setCurrentTemplate(getCurrentId === currentTemplate ? null : getCurrentId);
     setCount(0)
    if (getCurrentId === currentTemplate) {
      toast.error("Select Your VCard Template!");
      setCount(3)
    } else if (currentTemplate != savedTemplate && savedTemplate != null) {
      setCount(3)
      toast.error("Already VCard Selected!");
    } else {
      toast.success("VCard Selected!");
      handShow();
    }
  }
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchCurrentTemplate() {
    try {
      await api
        .get(`/templateDetail/specificAll/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setVCardAdded(res.data.data.length);
          if (res.data.data.length <= 0) {
            setCurrentTemplate(null);
          } else {
            setCurrentTemplate(res.data.data[0].currentTemplate);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCurrentTemplate();
    setCount(3)
  }, []);

  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      currentTemplate: null,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:BasicDetailValidate,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      values.currentTemplate = currentTemplate;
      values.URL_Alies = URL_Alies;
      await api
        .post(`/templateDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setCount(3)
          setTimeout(() => {
            setShowForm("Contact Details");
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });

  async function handleTemplateUpdate() {
    setCount(3)
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      currentTemplate: currentTemplate,
    };
    api
      .put(`/templateDetail/update_with_URL/${URL_Alies}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setFormSubmitLoader(false);
        toast.success(res.data.message);
        setCount(3)
        setTimeout(() => {
          setShowForm("Contact Details");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);

        setFormSubmitLoader(false);
      });
  }

  return (
    <>
      <div className="select_vcard_template_container">
        {/* <Toaster position="top-right" /> */}
        <div className="row_one">
          {currentTemplate == null ? (
            <h6>
              Select {currentPlan} Plan Template <sup>*</sup>
            </h6>
          ) : (
            <h6>
              Selected {currentPlan} Plan Template <sup>*</sup>
            </h6>
          )}

          {VCardAdded == 0 ? (
            <button onClick={formik.handleSubmit} type="submit">
              Save VCard Design<i className="bx bxs-save"></i>
            </button>
          ) : (
            <button onClick={handleTemplateUpdate} type="submit">
              Update VCard Design
              <span class="material-symbols-outlined">update</span>
              {Count != 3 ? (
                            <div className="touch_hand">
                              <img src={touch_hand} alt="hand" />
                            </div>
                          ) : (
                            ""
                          )}
            </button>
          )}
        </div>
        <div className="total_template">
          {currentPlan === "Free Plan" ? (
            <p>Total VCard Design's - {FreeTemplate.length}</p>
          ) : (
            ""
          )}
          {currentPlan === "Basic" ? (
            <p>Total VCard Design's - {BasicTemplate.length}</p>
          ) : (
            ""
          )}

          {currentPlan === "Standard" ? (
            <p>Total VCard Design's - {StandardTemplate.length}</p>
          ) : (
            ""
          )}
          {currentPlan === "Enterprises" ? (
            <p>Total VCard Design's - {EnterpriceTemplate.length}</p>
          ) : (
            ""
          )}
        </div>
        <div className="row_two">
          {currentPlan != null ? (
            <div className="image_container">
              {currentPlan === "Free Plan" ? (
                <>
                  {FreeTemplate.map((data, index) => {
                    return (
                      <div
                        className={
                          savedTemplate != null
                            ? "free_image"
                            : "single_template trial_single_template"
                        }
                        key={index}
                        id={
                          (currentTemplate === data.id &&
                            currentTemplate == savedTemplate) ||
                          savedTemplate == null
                            ? "templateSelected"
                            : "templateUnselected"
                        }
                        onClick={() => handle_Template_Selection(data.id)}
                        {...formik.getFieldProps("currentTemplate")}
                      >
                        {data.id === currentTemplate &&
                        savedTemplate == null ? (
                          <div className="selected_gif">
                            <img src={selected_gif} alt="selected" />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.id === 1 && currentTemplate === null ? (
                          <div className="touch_hand">
                            <img src={touch_gif} alt="touch" />
                          </div>
                        ) : (
                          ""
                        )}
    <div className="vcard_name">
                          <h4>{data.TemplateName}</h4>
                        </div>
                        <div
                          className="image_box trial_template"
                          id={
                            currentTemplate === savedTemplate
                              ? "selected"
                              : "unselected"
                          }
                        >
                          <img src={data.image} alt="" />
                        </div>
                      </div>
                    );
                  })}{" "}
                </>
              ) : (
                ""
              )}
              {currentPlan === "Basic" ? (
                <>
                  {BasicTemplate.map((data, index) => {
                    return (
                      <div
                        className={
                          savedTemplate != null ? "free_image" : "image"
                        }
                        key={index}
                        id={
                          (currentTemplate === data.id &&
                            currentTemplate == savedTemplate) ||
                          savedTemplate == null
                            ? "templateSelected"
                            : "templateUnselected"
                        }
                        onClick={() => handle_Template_Selection(data.id)}
                        {...formik.getFieldProps("currentTemplate")}
                      >
                        {data.id === currentTemplate ? (
                          <div className="selected_gif">
                            <img src={selected_gif} alt="selected" />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.id === 1 && currentTemplate === null ? (
                          <div className="touch_hand">
                            <img src={touch_gif} alt="touch" />
                          </div>
                        ) : (
                          ""
                        )}
    <div className="vcard_name">
                          <h4>{data.TemplateName}</h4>
                        </div>
                        <div className="image_box">
                          <img src={data.image} alt="" />
                        </div>
                      </div>
                    );
                  })}{" "}
                </>
              ) : (
                ""
              )}
              {currentPlan === "Standard" ? (
                <>
                  {StandardTemplate.map((data, index) => {
                    return (
                      <div
                        className={
                          savedTemplate != null ? "free_image" : "image"
                        }
                        key={index}
                        id={
                          (currentTemplate === data.id &&
                            currentTemplate == savedTemplate) ||
                          savedTemplate == null
                            ? "templateSelected"
                            : "templateUnselected"
                        }
                        onClick={() => handle_Template_Selection(data.id)}
                        {...formik.getFieldProps("currentTemplate")}
                      >
                        {data.id === currentTemplate ? (
                          <div className="selected_gif">
                            <img src={selected_gif} alt="selected" />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.id === 1 && currentTemplate === null ? (
                          <div className="touch_hand">
                            <img src={touch_gif} alt="touch" />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="vcard_name">
                          <h4>{data.TemplateName}</h4>
                        </div>
                        <div className="image_box">
                          <img src={data.image} alt="" />
                        </div>
                      </div>
                    );
                  })}{" "}
                </>
              ) : (
                ""
              )}
              {currentPlan === "Enterprises" ? (
                <>
                  {EnterpriceTemplate.map((data, index) => {
                    return (
                      <div
                        className={
                          savedTemplate != null ? "free_image" : "image"
                        }
                        key={index}
                        id={
                          (currentTemplate === data.id &&
                            currentTemplate == savedTemplate) ||
                          savedTemplate == null
                            ? "templateSelected"
                            : "templateUnselected"
                        }
                        onClick={() => handle_Template_Selection(data.id)}
                        {...formik.getFieldProps("currentTemplate")}
                      >
                        {data.id === currentTemplate ? (
                          <div className="selected_gif">
                            <img src={selected_gif} alt="selected" />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.id === 1 && currentTemplate === null ? (
                          <div className="touch_hand">
                            <img src={touch_gif} alt="touch" />
                          </div>
                        ) : (
                          ""
                        )}
    <div className="vcard_name">
                          <h4>{data.TemplateName}</h4>
                        </div>
                        <div className="image_box">
                          <img src={data.image} alt="" />
                        </div>
                      </div>
                    );
                  })}{" "}
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="noplans">
              <p>No plan Choosen!</p>
            </div>
          )}
        </div>

        {/* <div className="row_3">
          <Footer />
        </div> */}
      </div>
    </>
  );
};

export default Select_Template;
