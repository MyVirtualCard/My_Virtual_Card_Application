import React, { useState, useContext, useEffect } from "react";
import "./Edit_form_styles/Edit_PrivacyPolicy.scss";
import { Editor } from "primereact/editor";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { AppContext } from "../../../Context/AppContext";

const Edit_PrivacyPolicy = () => {
  let { URL_Alies } = useParams();
  let { FormSubmitLoader, setFormSubmitLoader } =
    useContext(AppContext);
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const [PolicyCount, setPolicyCount] = useState(0);
  const [PrivacyPolicy, setPrivacyPolicy] = useState("");
  const [key, setKey] = useState(0);

  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});
  useEffect(() => {
    api
      .get(`/privacyPolicyDetail/${URL_Alies}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      })
      .then((res) => {
        setPrivacyPolicy(res.data.data[0].PrivacyPolicy);
        
        setPolicyCount(res.data.data.length);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [key]);
  //Localstorage data:
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));

  let formik = useFormik({
    initialValues: {
      URL_Alies:URL_Alies,
      PrivacyPolicy: PrivacyPolicy,
    },
    validateOnChange: false,
    validateOnBlur: false,
    // validate:SocialMediaValidate,

    onSubmit: async (values) => {
      values.PrivacyPolicy = stripHtmlTags(PrivacyPolicy);
      setFormSubmitLoader(true);
      await api
        .post(
          `/privacyPolicyDetail/${URL_Alies}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageDatas.token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          reloadComponent();
          setTimeout(() => {
            setPrivacyPolicy("");
          }, 2000);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    },
  });

  async function handleUpdate(e){
e.preventDefault();
    let data={
      URL_Alies,
      PrivacyPolicy
    }
    try{
      setFormSubmitLoader(true);
      await api
        .put(
          `/privacyPolicyDetail/update/${URL_Alies}`,
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
          reloadComponent();
          setTimeout(() => {
            setPrivacyPolicy("");
          }, 2000);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
          setFormSubmitLoader(false);
        });
    }
    catch(error){
      toast.error(error.message)
    }
  }
  return (
    <>
      <div className="privacyPolicy_container">
        <div className="title">
          {/* <h6>Link Your Social Medias</h6> */}

          <div className="note">
            <small>
              <span>Note :</span>A privacy policy is a legal document that
              explains how an organization handles any customer, client or
              employee information gathered in its operations.
            </small>
          </div>
        </div>
        {PolicyCount == 0 ? (
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="form_group">
              <label htmlFor="description">
                Privacy Policy <sup>*</sup>
              </label>
              <Editor
                value={formik.values.PrivacyPolicy}
                onTextChange={(e) => setPrivacyPolicy(e.htmlValue)}
                style={{ height: "300px" }}
                className="texteditor"
                {...formik.getFieldProps("PrivacyPolicy", PrivacyPolicy)}
              />
            </div>
            <div className="form_submit_actions">
              <button className="save" type="submit">
                Save
              </button>

              <button className="discard" onClick={formik.handleReset}>
                Clear
              </button>
            </div>
          </form>
        ) : (
          <form action="" onSubmit={handleUpdate}>
            <div className="form_group">
              <label htmlFor="description">
                Privacy Policy <sup>*</sup>
              </label>
              <Editor
                value={PrivacyPolicy}
                onTextChange={(e) => setPrivacyPolicy(e.htmlValue)}
                style={{ height: "300px" }}
                className="texteditor"
              
               
              />
            </div>
            <div className="form_submit_actions">
              <button className="save" type="submit">
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Edit_PrivacyPolicy;
