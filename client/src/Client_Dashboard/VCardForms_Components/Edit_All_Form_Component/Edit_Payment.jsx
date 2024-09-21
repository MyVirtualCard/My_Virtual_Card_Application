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
  let [gpay, setGpay] = useState();
  let [paytm, setPaytm] = useState();
  let [phonepay, setPhonepay] = useState();
  let [UPI_Type, setUPI_Type] = useState();
  let [QRCodeImage, setQRCodeImage] = useState(null);

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
            setGpay(res.data.data[0]?.gpay);
            setPaytm(res.data.data[0]?.paytm);
            setPhonepay(res.data.data[0]?.phonepay);
            setUPI_Type(res.data.data[0]?.UPI_Type);
            setQRCodeImage(res.data.data[0]?.QRCodeImage);
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

  const handleQRCodeImage = (event) => {
    const QRCodeImage = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(QRCodeImage);
    reader.onload = () => {
      formik.setFieldValue("QRCodeImage", reader.result);
      setQRCodeImage(reader.result);
    };
  };

  async function handleUPIFormUpdate(e) {
    e.preventDefault();
    let data = {
      gpay,
      paytm,
      phonepay,
      UPI_Type,
      QRCodeImage,
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
      gpay: "",
      paytm: "",
      phonepay: "",
      UPI_Type: "",
      QRCodeImage: "",
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

          setTimeout(() => {
            setShowForm("Galleries");
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
  // Handler function for the change event
  const handleUPITypeChange = (event) => {
    setUPI_Type(event.target.value);
  };
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
              <label htmlFor="CompanyName">
                GooglePay UPI <sup>*</sup>
              </label>
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
                value={UpdateButtonToggle ? gpay : formik.values.gpay}
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
              <label htmlFor="paytm">
                Paytm UPI <sup>*</sup>
              </label>
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
              <label htmlFor="phonepay">PhonePay UPI</label>
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
            <div className="form_group QRCODE">
              <div className="image_upload_type">
                <div className="logo_type">
                  <label htmlFor="Profile">Scan to pay with any UPI app</label>
                  <select
                    name="UPI_Type"
                    id="UPI_Type"
                    className={`UPI_Type ${
                      formik.errors.UPI_Type && formik.touched.UPI_Type
                        ? "input_error"
                        : "input_success"
                    }`}
                    onBlur={UpdateButtonToggle ? "" : formik.handleBlur}
                    onChange={
                      UpdateButtonToggle
                        ? (e) => setUPI_Type(e.target.value)
                        : formik.handleChange
                    }
                    value={
                      UpdateButtonToggle ? UPI_Type : formik.values.UPI_Type
                    }
                  >
                    <option value="" label="Select Your UPI Type" />
                    <option value="GooglePay QRCode">GooglePay QRCode</option>
                    <option value="Paytm QRCode">Paytm QRCode</option>
                    <option value="PhonePay QRCode">PhonePay QRCode</option>
                  </select>
                </div>
              </div>
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="type_error">{formik.errors.UPI_Type}</div>
              )}
              <div className="first">
                <label htmlFor="Logo">
                  <img
                    src={
                      QRCodeImage != null
                        ? QRCodeImage
                        : "https://img.freepik.com/free-photo/person-scanning-qr-code_23-2149321701.jpg?t=st=1726926661~exp=1726930261~hmac=11038d8e82906c67f5283e0d2e87591b7ce5cb75f47204727256b861b472184e&w=740"
                    }
                    className="QRCodeImage"
                    alt="QRCodeImage"
                  />

                  <span
                    className="material-symbols-outlined"
                    onClick={() => setQRCodeImage(undefined)}
                  >
                    clear_all
                  </span>
                </label>
                <div className="details">
                  <p>
                    <strong>Note :</strong> Max file size limit 2MB
                  </p>
                  <small>Allowed file types: png, jpg, jpeg.</small>
                  <div className="input">
                    <input
                      name="QRCodeImage"
                      id="QRCodeImage"
                      type="file"
                      accept="image/*"
                      onChange={handleQRCodeImage}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>
              {UpdateButtonToggle ? (
                ""
              ) : (
                <div className="desc_error">{formik.errors.QRCodeImage}</div>
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
