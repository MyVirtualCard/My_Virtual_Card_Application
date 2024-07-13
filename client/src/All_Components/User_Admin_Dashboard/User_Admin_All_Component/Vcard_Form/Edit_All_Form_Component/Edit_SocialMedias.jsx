import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_SocialMedias.scss";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../../../UseContext/Context";
import { SocialMediaValidate } from "../../../../Helper/SocialMediaValidate";
const SocialMedias = () => {
  let { URL_Alies } = useParams();
  let { FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(Context);
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
  //Localstorage data:
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});
  async function fetchCurrentSocialMedia() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/socialMediaDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 1) {
            setFacebook(res.data.data[0].Facebook);
            setLinkedIn(res.data.data[0].LinkedIn);
            setWhatsUp(res.data.data[0].WhatsUp);
            setInstagram(res.data.data[0].Instagram);
            setTwiter(res.data.data[0].Twiter);
            setWebsite(res.data.data[0].Website);
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
      toast.error(error.message);
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
      Website,
      YouTube,
      Github,
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(
          `/socialMediaDetail/update_by_vcard_URL/${URL_Alies}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
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

  //Save Function
  async function handleFormSave(e) {
    e.preventDefault();
    let data = {
      URL_Alies,
      Facebook,
      LinkedIn,
      WhatsUp,
      Instagram,
      Twiter,
      Website,
      YouTube,
      Github,
    };
    setFormSubmitLoader(true);
    try {
      api
        .post(
          `/socialMediaDetail/${URL_Alies}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res)
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <div className="socialmedia_component">
        <div className="title">
          <h6>Link Your Social Medias</h6>

          <div className="note">
            <small>
              <span>Note :</span>Link all your social media with in https URL
              except <span>whatsup</span> ..Whatsup should paste your{" "}
              <span>10 digit mobile number with country code</span>.
            </small>
          </div>
        </div>
        <div className="all_socialmedias">
          <form action="" onSubmit={UpdateToggle ? handleFormUpdate : handleFormSave}>
            <div className="form_group ">
              <label htmlFor="Facebook">
                <i className="bx bxl-facebook-square"></i>
              </label>
              <input
                type="text"
                placeholder="https://www.facebook.com/"
                value={Facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="WhatsUp">
                <i className="bx bxl-whatsapp-square"></i>
                <sup>(*mandatory)</sup>
              </label>
              <input
                type="tel"
                placeholder="+91 ..........."
                value={WhatsUp}
                onChange={(e) => setWhatsUp(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="Instagram">
                <i className="bx bxl-instagram-alt"></i>
              </label>
              <input
                type="text"
                placeholder="https://www.instagram.com/"
                value={Instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="LinkedIn">
                <i className="bx bxl-linkedin-square"></i>
              </label>
              <input
                type="text"
                placeholder="https://www.linkedin.com/"
                value={LinkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="Twiter">
                <i className="bx bxl-twitter"></i>
              </label>
              <input
                type="text"
                placeholder="https://www.twiter.com/"
                value={Twiter}
                onChange={(e) => setTwiter(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="Github">
                <i className="bx bxl-github"></i>
              </label>
              <input
                type="text"
                placeholder="https://www.github.com/"
                value={Github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="YouTube">
                <i className="bx bxl-youtube"></i>
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/"
                value={YouTube}
                onChange={(e) => setYouTube(e.target.value)}
              />
            </div>
            <div className="form_group">
              <label htmlFor="Website">
                <i className="bx bx-world" style={{ color: "grey" }}></i>
              </label>
              <input
                type="text"
                placeholder="Your website link"
                value={Website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="form_submit_actions">
              <div className="save">
                {UpdateToggle ? (
                  <button type="submit">Update</button>
                ) : (
                  <button type="submit">Save</button>
                )}
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SocialMedias;
