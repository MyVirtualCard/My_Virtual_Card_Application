import React, { useState, useEffect, useContext } from "react";
import "./Edit_form_styles/Edit_Payment.scss";
import axios from "axios";
import Context from "../../../Context/GlobalContext";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";

import { UPIDetailValidateShema } from "../../../Helper/UPI.validate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Bounce } from "react-toastify";
const Edit_Payment = () => {
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
    let [gpay,setGpay]=useState();
    let [paytm, setPaytm] = useState();
    let [phonepay, setPhonepay] = useState();
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
    async function fetchUPIData() {
      try {
        setFormSubmitLoader(true);
        api
          .get(`/upiDetail/${URL_Alies}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
          
            if (res.data.data.length == 1) {
              setUpdateButtonToggle(true);
              setGpay(res.data.data[0].gpay);
              setPaytm(res.data.data[0].paytm);
              setPhonepay(res.data.data[0].phonepay);
              setFormSubmitLoader(false);
            } else {
              setUpdateButtonToggle(false);
              setFormSubmitLoader(false);
            }
          })
          .catch((error) => {
          
            toast.error(error.response.data.message);
            setFormSubmitLoader(false);
          });
      } catch (error) {
        console.log(error);
        setFormSubmitLoader(false);
      }
    }
    useEffect(() => {
      fetchUPIData();
    }, [key]);
  
  
  
    async function handleUPIFormUpdate(e) {
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
          .put(`/upiDetail/update_by_vcard_URL/${URL_Alies}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            reloadComponent();
            toast.success(res.data.message);
            setTimeout(()=>{
              setShowForm('Gallery')
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
        gpay:'',
        paytm:'',
        phonepay:'',
      },
  
      validationSchema: UPIDetailValidateShema,
  
      onSubmit: async (values) => {
        setFormSubmitLoader(true);
     
        await api
          .post(`/upiDetail/${URL_Alies}`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            toast.success(res.data.message);
         
        
            setTimeout(()=>{
              setShowForm('Gallery');
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
    <div className="payment_container">
      <div className="payment_container_title">
        <h4>Payment Details</h4>
      </div>

      <div className="payments_box">
        <div className="left_upi_app">
          <div className="upi_app_title">
            <h5>Add Your Online Payment UPI Number</h5>
          </div>
          <form
            onSubmit={
              UpdateButtonToggle ? handleUPIFormUpdate : formik.handleSubmit
            }
            className="Form1"
          >
            <div className="form_group">
              <label htmlFor="CompanyName">Google Pay UPI <sup>*</sup></label>
              <input
                type="text"
                placeholder="Enter Your Gpay Number"
                name="gpay"
                id="gpay"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setGpay(e.target.value)
                    : formik.handleChange
                }
                value={
                  UpdateButtonToggle ? gpay : formik.values.gpay
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
                <div className="error">{formik.errors.gpay}</div>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="paytm">Paytm UPI ?<sup>*</sup></label>
              <input
                type="text"
                placeholder="Enter Your Paytm Number"
                name="paytm"
                id="paytm"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setPaytm(e.target.value)
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? paytm : formik.values.paytm}
              
              />
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.paytm}</div>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="phonepay">Phone Pay UPI</label>
              <input
                type="text"
                placeholder="Enter Your PhonePay Number"
                name="phonepay"
                id="phonepay"
                onBlur={formik.handleBlur}
                onChange={
                  UpdateButtonToggle
                    ? (e) => setPhonepay(e.target.value)
                    : formik.handleChange
                }
                value={UpdateButtonToggle ? phonepay : formik.values.phonepay}
                // className={
                //   formik.errors.MobileNumber && formik.touched.MobileNumber
                //     ? "input_error"
                //     : "input_success"
                // }
              />
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="error">{formik.errors.phonepay}</div>
              )}
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
        <div className="right_bank">
          <div className="bank_title">
            <h5>Add Your Bank Account Details</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_Payment;
