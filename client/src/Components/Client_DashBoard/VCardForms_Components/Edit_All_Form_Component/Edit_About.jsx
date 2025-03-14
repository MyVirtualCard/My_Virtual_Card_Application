import React, { useState, useContext, useRef, useEffect } from "react";
import "../Edit_All_Form_Component/Edit_form_styles/Edit_About.scss";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AboutDetailValidateShema } from "../../../Helper/About.validate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { AppContext } from "../../../Context/AppContext";
const Edit_About = () => {
  let { Token, setFormSubmitLoader, setShowForm, URL_Alies } =
    useContext(AppContext);

  let [UpdateButtonToggle, setUpdateButtonToggle] = useState(false);
  let [CompanyName, setCompanyName] = useState();
  let [Category, setCategory] = useState();
  let [Year, setYear] = useState();
  let [Bussiness, setBussiness] = useState([]);
  let [BussinessList, setBussinessList] = useState([]);
  let [Specialities, setSpecialities] = useState();
  const [key, setKey] = useState(0);

  const modules = {
    clipboard: {
      matchVisual: false, // Ensures pasted content matches the editor's styling
    },
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }], // Custom dropdown
      [{ list: "ordered" }, { list: "bullet" }, { list: "square" }], // Ordered and Unordered list
      ["bold", "italic", "underline", "strike"], // Text formatting options
      [{ color: [] }, { background: [] }], // Text color and background color
      [{ align: [] }], // Text alignment
      ["link", "image", "video"], // Adding links, images, and videos
      ["clean"], // Remove formatting
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

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
            Authorization: `Bearer ${Token}`,
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
      Specialities,
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(`/aboutDetail/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          toast.success(res.data.message);
          setTimeout(() => {
            setShowForm("Social Link - Website");
          }, 2000);
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
      CompanyName: "",
      Category: "",
      Year: "",
      Bussiness: "",
      Specialities: "",
    },

    validationSchema: AboutDetailValidateShema,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);
      values.Bussiness = Bussiness;
      await api
        .post(`/aboutDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          setTimeout(() => {
            setShowForm("Social Link - Website");
            reloadComponent();
          }, 2000);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    },
  });

  const handleBussinessAdd = (value) => {
    if (value.length > 0) {
      setBussiness((prevItems) => [...prevItems, value]);
      formik.values.Bussiness = "";
    }
  };

  useEffect(() => {
    setBussinessList(Bussiness);
  }, [Bussiness]);
  // Function to delete an item by index
  const deleteItem = (index) => {
    const updatedList = Bussiness.filter((_, i) => i !== index); // Filter out the item at the specified index
    setBussiness(updatedList); // Update the state with the new list
  };

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
                value={
                  UpdateButtonToggle ? CompanyName : formik.values.CompanyName
                }
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
                value={UpdateButtonToggle ? Category : formik.values.Category}
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
                value={UpdateButtonToggle ? Year : formik.values.Year}
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
              <label htmlFor="Bussiness">
                Bussiness List<sup>*</sup>
              </label>
              <input
                id="Bussiness"
                name="Bussiness"
                type="text"
                placeholder="Eg: Website Building , Digital Marketing"
                onChange={
                  UpdateButtonToggle
                    ? formik.handleChange
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? formik.values.Bussiness : formik.values.Bussiness}
              />
              <div className="add_btn">
                <button
                  onClick={() => handleBussinessAdd(formik.values.Bussiness)}
                  type="button"
                >
                  <i className="bx bx-plus"></i>Add
                </button>
              </div>
              <div className="bussiness_list">
                {Bussiness.map((data, index) => {
                  return (
                    <div className="items" key={index}>
                      <small>{data}</small>
                      <div className="delete" onClick={() => deleteItem(index)}>
                        <i className="bx bx-x"></i>
                      </div>
                    </div>
                  );
                })}
              </div>

              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.Bussiness}</div>
              )}
            </div>

            <div className="form_group Specialities">
              <label htmlFor="ServiceDescription">
                Our Specialities <sup>*</sup>
              </label>
              {UpdateButtonToggle ? (
                <ReactQuill
                  modules={modules}
                  formats={formats}
                  id="Specialities"
                  name="Specialities"
                  placeholder="Enter Your Specialities"
                  value={Specialities}
                  onChange={(e) => setSpecialities(e)}
                />
              ) : (
                <Editor
                  {...formik.getFieldProps("Specialities")}
                  value={formik.values.Specialities}
                  onTextChange={(e) => {
                    formik.setFieldValue("Specialities", e.htmlValue),
                      setSpecialities(e.htmlValue);
                  }}
                  handleBlur={formik.handleBlur}
                  id="Specialities"
                  name="Specialities"
                  // style={{ height: "200px" }}
                  placeholder="Enter Your Specialities"
                  className={
                    formik.errors.Specialities && formik.touched.Specialities
                      ? "input_error"
                      : "input_success"
                  }
                />
              )}

              <div className="desc_error">{formik.errors.Specialities}</div>
            </div>
            <div className="form_submit_actions">
              {UpdateButtonToggle ? (
                <button className="save" type="submit">
                  Update<span class="material-symbols-outlined">update</span>
                </button>
              ) : (
                <button className="save" type="submit">
                  Save<i className="bx bxs-save"></i>
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
