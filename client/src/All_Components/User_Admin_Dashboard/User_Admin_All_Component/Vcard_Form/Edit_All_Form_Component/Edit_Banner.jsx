import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_Banner.scss";
import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Context from "../../../../UseContext/Context";
const Banner = () => {
  let { URL_Alies } = useParams();

  let { FormSubmitLoader, setFormSubmitLoader, userName } =
    useContext(Context);

  let [PopupBannerId, setPopUpBannerId] = useState();
let [BannerLength,setBannerLength]=useState();
  let [BannerTitle, setBannerTitle] = useState();
  let [BannerURL, setBannerURL] = useState();
  let [BannerDescription, setBannerDescription] = useState();
  let [BannerButtonName, setBannerButtonName] = useState();
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});
  async function fetchCurrentPopUpBanner() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/popupBannerDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setBannerLength(res.data.data.length);
          if (res.data.data.length == 0) {
            // toast.error("No Popup Banner added!");
            setFormSubmitLoader(false);
          } else {
            
            setBannerTitle(res.data.data[0].BannerTitle);
            setBannerURL(res.data.data[0].BannerURL);
            setBannerDescription(res.data.data[0].BannerDescription);
            setBannerButtonName(res.data.data[0].BannerButtonName);
            setPopUpBannerId(res.data.data[0]._id);
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
  };
  
  useEffect(() => {
    fetchCurrentPopUpBanner();
  }, [key]);

  async function handleBannerSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies,
      BannerTitle,
      BannerURL,
      BannerDescription,
      BannerButtonName,
    };
    try {
      await api
        .post(`/popupBannerDetail/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          reloadComponent();
        })
        .catch((error) => {
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  async function handleBannerUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);

    let data = {
      URL_Alies,
      BannerTitle,
      BannerURL,
      BannerDescription,
      BannerButtonName,
    };
    try {
      await api
        .put(
          `/popupBannerDetail/update/${URL_Alies}`,
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
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <>
      <div className="banner_container">
        <div className="title">
          <h4> Update Banner Details</h4>
          <div className="note">
            <small>
              <span>Note :</span>When users open your VCard site initially{" "}
              <span>Popup Banner</span> load on your website.. This will help u
              to showcase your <span>Organization Description</span> and lot .
            </small>
          </div>
        </div>
        <div className="form_container_box">
          <form action="" >
            <div className="form_group">
              <label htmlFor="BannerTitle">
                Banner Title<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Banner Title"
                value={BannerTitle}
                onChange={(e) => {
                  setBannerTitle(e.target.value);
                }}
              />
            </div>

            <div className="form_group">
              <label htmlFor="BannerURL">
                URL<sup></sup>
              </label>
              <input
                type="text"
                placeholder="Banner URL"
                value={BannerURL}
                onChange={(e) => {
                  setBannerURL(e.target.value);
                }}
              />
            </div>

            <div className="form_group">
              <label htmlFor="BannerDescription">
                Description<sup>*</sup>
              </label>
              <Editor
                value={BannerDescription}
                onTextChange={(e) => setBannerDescription(e.htmlValue)}
                id="BannerDescription"
                name="BannerDescription"
                style={{ height: "130px" }}
                placeholder="Enter Short Description"
              />
              {/* <textarea name="banner_description" id="banner_description" cols="50" rows="4" placeholder="Enter Short Description" ></textarea> */}
            </div>

            <div className="form_group">
              <label htmlFor="BannerButtonName">
                Banner Button<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Button Name"
                value={BannerButtonName}
                onChange={(e) => {
                  setBannerButtonName(e.target.value);
                }}
              />
            </div>

            <div className="form_submit_actions">
              {BannerLength == 1 ?     <button className="save" onClick={handleBannerUpdate}>Update</button> : <button className="save" onClick={handleBannerSubmit}>Save</button> }
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Banner;
