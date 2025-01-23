import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_SocialMedias.scss";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import {  SocialMediaValidateSchema } from "../../../Helper/SocialMediaValidate";
import { AppContext } from "../../../Context/AppContext";
const Edit_SocialMedias = () => {
  let { URL_Alies } = useParams();
  let { Token,FormSubmitLoader, setFormSubmitLoader,setErrorMessage,
    setShowForm,
    errorPopupOpen,setErrorPopupOpen,  LiveLinkActivate,
    setLiveLinkActivate, } =
    useContext(AppContext);
  let [UpdateToggle, setUpdateToggle] = useState(false);
  //SOcialMedia :
  let [Facebook, setFacebook] = useState();
  let [LinkedIn, setLinkedIn] = useState();
  let [WhatsUp, setWhatsUp] = useState();
  let [Instagram, setInstagram] = useState();
  let [Twiter, setTwiter] = useState();
  let [Website, setWebsite] = useState();
  let [YouTube, setYouTube] = useState();
  let [Github, setGithub] = useState();
//Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchCurrentSocialMedia() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/socialMediaDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 1) {
            setFacebook(res.data.data[0].Facebook);
            setLinkedIn(res.data.data[0].LinkedIn);
            setWhatsUp(res.data.data[0].WhatsUp);
            setInstagram(res.data.data[0].Instagram);
            setTwiter(res.data.data[0].Twiter);
        
            setYouTube(res.data.data[0].YouTube);
            setGithub(res.data.data[0].Github);
            setFormSubmitLoader(false);
            setUpdateToggle(true);
          } else {
            // toast.error("Data not added!");
            setUpdateToggle(false);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      setErrorPopupOpen(true);
      setErrorMessage(error.message);
      setTimeout(()=>{
      setErrorPopupOpen(false)
      },3000)
     
    }
  }
  useEffect(() => {
    fetchCurrentSocialMedia();
  }, []);
//Update Function
  async function handleFormUpdate(e) {
    e.preventDefault();
    let data = {
      Facebook,
      LinkedIn,
      WhatsUp,
      Instagram,
      Twiter,
     
      YouTube,
      Github,
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(
          `/socialMediaDetail/${URL_Alies}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message)
          setFormSubmitLoader(false);
          setTimeout(()=>{
            setShowForm('Services')
          },2000)
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

  //Save SocialMedias
  let formik = useFormik({
    initialValues: {
      URL_Alies:URL_Alies,
      Facebook,
      LinkedIn,
      WhatsUp,
      Instagram,
      Twiter,
   
      YouTube,
      Github,
    },

    validationSchema: SocialMediaValidateSchema,

    onSubmit: async (values) => {
      console.log(values)
      setFormSubmitLoader(true);
      await api
        .post(`/socialMediaDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message)
          setTimeout(()=>{
            setShowForm('Services')
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          setFormSubmitLoader(false);
        });
    },
  });
  async function fetchCurrentManageContent() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/manageContent/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          }
        })
        .then((res) => {
          setLiveLinkActivate(res.data.data);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }

  useEffect(() => {
    fetchCurrentManageContent();
  }, []);

  return (
    <>
      <div className="socialmedia_component">
        <div className="title">
          <h6>Link Your Social Medias</h6>

          <div className="note">
            <small>
              <span>Note :</span>Link all your social media with in https URL
              except <span>whatsup</span> ..WhatsApp Field should Add your{" "}
              <span>10 digit mobile number </span>.
            </small>
          </div>
        </div>
        <div className="all_socialmedias">
          <form action="" onSubmit={UpdateToggle ? handleFormUpdate : formik.handleSubmit}>
            <div className="form_group ">
              <label htmlFor="Facebook">
                 Facebook
              </label>
              <input
                type="text"
                   name="Facebook"
                id="Facebook"
                placeholder="https://www.facebook.com/"
                value={UpdateToggle ? Facebook : formik.values.Facebook}
                onChange={UpdateToggle ?(e) => setFacebook(e.target.value) : formik.handleChange  }
              />
              <div className="icon">
              <i className="bx bxl-facebook-square"></i>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="WhatsUp">
              WhatsApp
                <sup>(*mandatory)</sup>
              </label>
              <input
                type="tel"
                placeholder="Enter Your WhatsApp MobileNumber"
                name="WhatsUp"
                id="WhatsUp"
                onBlur={formik.handleBlur}
                value={UpdateToggle ? WhatsUp : formik.values.WhatsUp}
                onChange={UpdateToggle ? (e) => setWhatsUp(e.target.value) : formik.handleChange  }
                className={
                  formik.errors.WhatsUp && formik.touched.WhatsUp
                    ? "input_error"
                    : "input_success"
                }
              />
              <div className="icon">
              <i className="bx bxl-whatsapp-square"></i>
              </div>
                    <div className="error">{formik.errors.WhatsUp}</div>
            </div>
            <div className="form_group">
              <label htmlFor="Instagram">
            Instagram
              </label>
              <input
                type="text"
                     name="Instagram"
                id="Instagram"
                placeholder="https://www.instagram.com/"
                value={UpdateToggle ? Instagram : formik.values.Instagram}
               
                onChange={UpdateToggle ?(e) => setInstagram(e.target.value) : formik.handleChange  }
               
              />
              <div className="icon">
              <i className="bx bxl-instagram-alt"></i>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="LinkedIn">
              LinkedIn
              </label>
              <input
                type="text"
                             name="LinkedIn"
                id="LinkedIn"
                placeholder="https://www.linkedin.com/"
                value={UpdateToggle ? LinkedIn : formik.values.LinkedIn}
         
                onChange={UpdateToggle ?(e) => setLinkedIn(e.target.value) : formik.handleChange  }
              />
              <div className="icon">
              <i className="bx bxl-linkedin-square"></i>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="Twiter">
            Twiter
              </label>
              <input
                type="text"
                              name="Twiter"
                id="Twiter"
                placeholder="https://www.twiter.com/"
                value={UpdateToggle ? Twiter : formik.values.Twiter}
          
                onChange={UpdateToggle ?(e) => setTwiter(e.target.value) : formik.handleChange  }
              />
              <div className="icon">
              <i className="bx bxl-twitter"></i>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="Github">
               Github
              </label>
              <input
                type="text"
                                 name="Github"
                id="Github"
                placeholder="https://www.github.com/"
                value={UpdateToggle ? Github : formik.values.Github}
               
                onChange={UpdateToggle ?(e) => setGithub(e.target.value) : formik.handleChange  }
              />
              <div className="icon">
              <i className="bx bxl-github"></i>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="YouTube">
            YoutTube
              </label>
              <input
                type="text"
                                 name="YouTube"
                id="YouTube"
                placeholder="https://www.youtube.com/"
                value={UpdateToggle ? YouTube : formik.values.YouTube}
           
                onChange={UpdateToggle ?(e) => setYouTube(e.target.value) : formik.handleChange  }
              />
              <div className="icon">
              <i className="bx bxl-youtube"></i>
              </div>
            </div>
       
            <div className="form_submit_actions">
              <div className="save">
                {UpdateToggle ? (
                  <button type="submit">Update<span class="material-symbols-outlined">update</span></button>
                ) : (
                  <button type="submit">Save<i className='bx bxs-save'></i></button>
                )}
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit_SocialMedias;
