import React, { useRef, useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Select_Template.scss";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Gym_Trainer from "../../../../assets/Vcard_Images/Preview/GYM_TRAINER_PREVIEW.png";
import Taxi_Service from "../../../../assets/Vcard_Images/Preview/TAXI_SERVICE_PREVIEW.png";
import Fashion_Desinger from "../../../../assets/Vcard_Images/Preview/FASHION_DESIGNER_PREVIEW.png";
import Manager from "../../../../assets/Vcard_Images/Preview/MANAGER_PREVIEW.png";
import BeautyParlor from "../../../../assets/Vcard_Images/Preview/BEAUTY_PARLOR_PREVIEW.png";
import CorporateCompany from "../../../../assets/Vcard_Images/Preview/CORPORATE_COMPANY_PREVIEW.png";
import Doctor from "../../../../assets/Vcard_Images/Preview/DOCTOR_PREVIEW.png";
import Advocate from "../../../../assets/Vcard_Images/Preview/ADVOCATE_PREVIEW.png";
import Education from "../../../../assets/Vcard_Images/Preview/EDUCATIONAL_INSTITUTE_PREVIEW.png";
import CabDriver from "../../../../assets/Vcard_Images/Preview/CAB_DRIVER_PREVIEW.png";
import selected_gif from "../../../../assets/animations/vcard_selected.gif";
import touch_gif from "../../../../assets/Brand_Logo/touch.gif";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import touch_hand from "../../../../assets/Brand_Logo/touch.gif";
import { AppContext } from "../../../Context/AppContext";
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
  {
    id: 7,
    image: Doctor,
    TemplateName: "Doctor",
  },
  {
    id: 8,
    image: Advocate,
    TemplateName: "Advocate Officer",
  },
  // {
  //   id: 9,
  //   image: Education,
  //   TemplateName: "Education Institute",
  // },
  {
    id: 9,
    image: CabDriver,
    TemplateName: "Cab Driver",
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
    id: 0,
    image: CorporateCompany,
    TemplateName: "Dynamic VCard",
  },
  
];

const Edit_Select_Template = () => {
  // let { URL_Alies } = useParams();
  let {
    Token,
    URL_Alies,
    FormSubmitLoader,
    setFormSubmitLoader,
    currentPlan,
    currentTemplate,
    setCurrentTemplate,
    setShowForm,

  } = useContext(AppContext);
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

  let handShow = () => {
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
  };

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchCurrentTemplate() {
    try {
      await api
        .get(`/templateDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
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
    setCount(3);
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
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setCount(3);
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
    setCount(3);
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      currentTemplate: currentTemplate,
    };
    api
      .put(`/templateDetail/update_with_URL/${URL_Alies}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setFormSubmitLoader(false);
        toast.success(res.data.message);
        setCount(3);
        setTimeout(() => {
          setShowForm("Contact Details");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);

        setFormSubmitLoader(false);
      });
  }
  function handle_Template_Selection(getCurrentId) {
    setCurrentTemplate(getCurrentId === currentTemplate ? null : getCurrentId);
    setCount(0);
    if (getCurrentId === currentTemplate) {
      toast.error("Select Your VCard Template!");
      setCount(3);
    } else if (currentTemplate != savedTemplate && savedTemplate != null) {
      setCount(3);
      toast.error("Already VCard Selected!");
    } else {
      // toast.success("VCard Selected!");
      handShow();
    }
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
              Select {currentPlan} Plan Template <sup>*</sup>
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
          {currentPlan === "EnterPrice" ? (
            <p>Total Dynamic VCard Design's - {EnterpriceTemplate.length}</p>
          ) : (
            ""
          )}
        </div>
        <div className="row_two">
          {currentPlan != null ? (
            <div className="image_container">
              {currentPlan === "Free" ? (
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
              {currentPlan === "EnterPrice" ? (
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
                        {data.id === 0 && currentTemplate === null ? (
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

export default Edit_Select_Template;
