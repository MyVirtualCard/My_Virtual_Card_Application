import React, { useState, useContext, useRef, useEffect } from "react";
import "../Edit_All_Form_Component/Edit_form_styles/Edit_About.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import Context from "../../../Context/GlobalContext";

import { useParams } from "react-router-dom";
import { AboutDetailValidateShema } from "../../../Helper/About.validate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast,Bounce } from 'react-toastify';
const Edit_About = () => {
  
  let {
    user,
    setURL_Alies,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
    successMessage,
    setShowForm,
    URL_Alies,
    setSuccessMessage,
    successPopupOpen,
    setSuccessPopupOpen,
    errorMessage,
    setErrorMessage,
    errorPopupOpen,
    setErrorPopupOpen,
  } = useContext(Context);

  let [UpdateButtonToggle, setUpdateButtonToggle] = useState(false);
  let [CompanyName,setCompanyName]=useState();
  let [Category, setCategory] = useState();
  let [Year, setYear] = useState();
  let [Bussiness, setBussiness] = useState();
  let [Specialities, setSpecialities] = useState();
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
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  async function fetchAboutData() {
    try {
      setFormSubmitLoader(true);
      api
        .get(`/aboutDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
         
          if (res.data.data.length == 1) {
            setUpdateButtonToggle(true);
            setCompanyName(res.data.data[0].CompanyName);
            setCategory(res.data.data[0].Category);
            setYear(res.data.data[0].Year);
            setBussiness(res.data.data[0].Bussiness);
            setSpecialities(res.data.data[0].Specialities);
            setFormSubmitLoader(false);
          } else {
            setUpdateButtonToggle(false);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }
  useEffect(() => {
    fetchAboutData();
  }, [key]);



  async function handleBasicFormUpdate(e) {
    e.preventDefault();
    let data = {
      CompanyName,
      Category,
      Year,
      Bussiness,
      Specialities
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(`/aboutDetail/update_by_vcard_URL/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          toast.success(res.data.message);
          setTimeout(()=>{
            setShowForm('Social Link - Website')
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  let formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      CompanyName:'',
      Category:'',
      Year:'',
      Bussiness:'',
      Specialities:''
    },

    validationSchema: AboutDetailValidateShema,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
   
      await api
        .post(`/aboutDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
       
      
          setTimeout(()=>{
            setShowForm('Social Link - Website');
            reloadComponent();
          },2000)
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });




  return (
    <>
      <div className="aboutForm_container">
        <div className="AboutForm_container_box">
        <div className="form2_title">
              <h4>About Details</h4>
            </div>
          <form
            onSubmit={
              UpdateButtonToggle ? handleBasicFormUpdate : formik.handleSubmit
            }
            className="Form2"
          >
         <div className="form_group">
              <label htmlFor="CompanyName">
                Company Name<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your Company Name"
                name="CompanyName"
                id="CompanyName"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setCompanyName(e.target.value)
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? CompanyName : formik.values.CompanyName}
                // className={
                //   formik.errors.Email && formik.touched.Email
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.CompanyName}</div>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="Category">
               Category<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your Category"
                name="Category"
                id="Category"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setCategory(e.target.value)
                    : formik.handleChange
                }
                value={
                  UpdateButtonToggle ? Category : formik.values.Category
                }
                // className={
                //   formik.errors.MobileNumber && formik.touched.MobileNumber
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.Category}</div>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="Year">
              Year of Established<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Eg : Aug-2021"
                name="Year"
                id="Year"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setYear(e.target.value)
                    : formik.handleChange
                }
                value={
                  UpdateButtonToggle ? Year : formik.values.Year
                }
                // className={
                //   formik.errors.MobileNumber && formik.touched.MobileNumber
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.Year}</div>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="Bussiness">Bussiness List<sup>*</sup></label>
              <input
                id="Bussiness"
                name="Bussiness"
                type="text"
                placeholder="Eg: Website Building , Digital Marketing"
                onChange={
                  UpdateButtonToggle
                    ? (e) => setBussiness(e.target.value)
                    : formik.handleChange
                }
                value={
                  UpdateButtonToggle
                    ? Bussiness
                    : formik.values.Bussiness
                }
              />
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">
                  {formik.errors.Bussiness}
                </div>
              )}
            </div>
     
            <div className="form_group Specialities">
                    <label htmlFor="ServiceDescription">
                      Our Specialities <sup>*</sup>
                    </label>
                    <Editor
                      {...formik.getFieldProps("Specialities")}
                      value={
                        UpdateButtonToggle
                          ? Specialities
                          : formik.values.Specialities
                      }
                      onTextChange={
                        UpdateButtonToggle
                          ? (e) => setSpecialities(e.htmlValue)
                          : (e) => {
                              formik.setFieldValue(
                                "Specialities",
                                e.htmlValue
                              ),
                                setSpecialities(e.htmlValue);
                            }
                      }
                      handleBlur={formik.handleBlur}
                      id="Specialities"
                      name="Specialities"
                      style={{ height: "200px" }}
                      placeholder="Enter Short Description"
                      className={
                        formik.errors.Specialities &&
                        formik.touched.Specialities
                          ? "input_error"
                          : "input_success"
                      }
                    />
                    {/* <ReactQuill
                modules={modules}
                formats={formats}
                       id="ServiceDescription"
                name="ServiceDescription"
                {...formik.getFieldProps("ServiceDescription")}
                value={
                  updateFormOpen
                    ? ServiceDescription
                    : formik.values.ServiceDescription
                }
                onChange={
                  updateFormOpen
                    ? (e) => setServiceDescription(e)
                    : (e) => {
                        formik.setFieldValue(
                          "ServiceDescription",
                          e
                        ),
                          setServiceDescription(e);
                      }
                }

                // style={{ height: "180px",border:'none' }}
                placeholder="Enter Short Description"
                className={
                  formik.errors.ServiceDescription &&
                  formik.touched.ServiceDescription
                    ? "input_error"
                    : "input_success"
                }
                /> */}

                    <div className="desc_error">
                      {formik.errors.Specialities}
                    </div>
                    {/* <textarea name="service_description" id="service_description" cols="48" rows="4" placeholder="Enter Short Description"></textarea> */}
                  </div>
            <div className="form_submit_actions">
              {UpdateButtonToggle ? (
                <button className="save" type="submit">
                  Update<span class="material-symbols-outlined">update</span>
                </button>
              ) : (
                <button className="save" type="submit">
                  Save<i className='bx bxs-save'></i>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit_About;
