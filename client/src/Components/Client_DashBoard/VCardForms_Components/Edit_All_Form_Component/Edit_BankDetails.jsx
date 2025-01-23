import React, { useState, useEffect, useContext } from "react";
import "./Edit_form_styles/Edit_BankDetails.scss";
import axios from "axios";

import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose a theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";

import { UPIDetailValidateShema } from "../../../Helper/UPI.validate";
import { BankDetailValidateShema } from "../../../Helper/Bank.validate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { AppContext } from "../../../Context/AppContext";
const Edit_BankDetails = () => {
  let { Token, setFormSubmitLoader, setShowForm, URL_Alies } =
    useContext(AppContext);

  let [UpdateButtonToggle, setUpdateButtonToggle] = useState(false);
  let [UpdateBankToggle, setUpdateBankToggle] = useState(false);
  let [gpay, setGpay] = useState();
  let [paytm, setPaytm] = useState();
  let [phonepay, setPhonepay] = useState();
  let [UPI_Type, setUPI_Type] = useState();
  let [QRCodeImage, setQRCodeImage] = useState(null);

  let [HolderName, setHolderName] = useState();
  let [BankName, setBankName] = useState();
  let [AccountNumber, setAccountNumber] = useState();
  let [IFSCCode, setIFSCCode] = useState();

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
            Authorization: `Bearer ${Token}`,
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
        .put(`/upiDetail/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
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
            Authorization: `Bearer ${Token}`,
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
  //Bank Actions
  async function fetchBankData() {
    try {
      setFormSubmitLoader(true);
      api
        .get(`/bankDetail/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 1) {
            setUpdateBankToggle(true);
            setHolderName(res.data.data[0]?.HolderName);
            setBankName(res.data.data[0]?.BankName);

            setIFSCCode(res.data.data[0]?.IFSCCode);
            setAccountNumber(res.data.data[0]?.AccountNumber);
            setFormSubmitLoader(false);
          } else {
            setUpdateBankToggle(false);
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
  let Account_formik = useFormik({
    initialValues: {
      URL_Alies: URL_Alies,
      HolderName: "",
      BankName: "",
      IFSCCode: "",
      AccountNumber: "",
    },

    validationSchema: BankDetailValidateShema,

    onSubmit: async (values) => {
      setFormSubmitLoader(true);

      await api
        .post(`/bankDetail/${URL_Alies}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setUpdateBankToggle(true);
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
  async function handleBankFormUpdate(e) {
    e.preventDefault();
    let data = {
      HolderName,
      BankName,
      IFSCCode,
      AccountNumber,
    };
    setFormSubmitLoader(true);
    try {
      api
        .put(`/bankDetail/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
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
  useEffect(() => {
    fetchUPIData();
    fetchBankData();
  }, [key]);
  async function handleBankDetailDelete() {
    await api
      .delete(`/bankDetail/${URL_Alies}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setUpdateBankToggle(false);
        setHolderName("");
        setAccountNumber("");
        setBankName("");
        setIFSCCode("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  async function handleUPIDetailDelete() {
    await api
      .delete(`/upiDetail/${URL_Alies}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setUpdateButtonToggle(false);
        setPaytm("");
        setGpay("");
        setPhonepay("");
        setQRCodeImage(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }
  return (
    <div className="payment_container">
      <div className="payment_container_title">
        <h4>Payment Details</h4>
      </div>

      <div className="payments_box">
        {/* UPI_App_details */}
        <div className="left_upi_app">
          <div className="upi_app_title">
            <h5>Add Your Online Payment UPI Number</h5>
          </div>
          {UpdateButtonToggle == true ? (
            <div className="delete_bank_details">
              <i className="bx bx-trash" onClick={handleUPIDetailDelete}></i>
            </div>
          ) : (
            ""
          )}
          <form
            onSubmit={
              UpdateButtonToggle ? handleUPIFormUpdate : formik.handleSubmit
            }
            className="Form1"
          >
            <div className="form_group">
              <label htmlFor="CompanyName">GooglePay UPI</label>
              <input
                type="text"
                placeholder="Enter Your Gpay UPI ID"
                name="gpay"
                id="gpay"
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
              <label htmlFor="paytm">Paytm UPI</label>
              <input
                type="text"
                placeholder="Enter Your Paytm UPI ID"
                name="paytm"
                id="paytm"
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
                placeholder="Enter Your PhonePay UPI ID"
                name="phonepay"
                id="phonepay"
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
                  <label htmlFor="Profile">
                    Scan to pay with any UPI app<sup>*</sup>
                  </label>
                  <select
                    name="UPI_Type"
                    id="UPI_Type"
                    className={`UPI_Type ${
                      formik.errors.UPI_Type && formik.touched.UPI_Type
                        ? "input_error"
                        : "input_success"
                    }`}
                    onChange={
                      UpdateButtonToggle
                        ? (e) => setUPI_Type(e.target.value)
                        : formik.handleChange
                    }
                    value={
                      UpdateButtonToggle ? UPI_Type : formik.values.UPI_Type
                    }
                  >
                    <option value="" label="Select Your UPI App" />
                    <option value="GooglePay QRCode">GooglePay QRCode</option>
                    <option value="Paytm QRCode">Paytm QRCode</option>
                    <option value="PhonePay QRCode">PhonePay QRCode</option>
                    <option value="Bank QRCode">Bank QRCode</option>
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
                        : "https://img.freepik.com/free-vector/qr-code-scanning-concept-with-characters-illustrated_23-2148625454.jpg?t=st=1726956435~exp=1726960035~hmac=3d26f0be47bae3d5da3b4a270e91ad945c69024998ef9a71b6355e4b7dafddca&w=740"
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
        <div className="border"></div>
        {/* BankDetails */}
        <div className="right_bank">
          <div className="bank_title">
            <h5>Add Your Bank Account Details</h5>
          </div>
          {UpdateBankToggle == true ? (
            <div className="delete_bank_details">
              <i className="bx bx-trash" onClick={handleBankDetailDelete}></i>
            </div>
          ) : (
            ""
          )}

          <form
            onSubmit={
              UpdateBankToggle
                ? handleBankFormUpdate
                : Account_formik.handleSubmit
            }
            className="Form2"
          >
            <div className="form_group">
              <label htmlFor="HolderName">
                Account Name<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Account Holder Name"
                name="HolderName"
                id="HolderName"
                onChange={
                  UpdateBankToggle
                    ? (e) => setHolderName(e.target.value)
                    : Account_formik.handleChange
                }
                value={
                  UpdateBankToggle
                    ? HolderName
                    : Account_formik.values.HolderName
                }
              />
              {UpdateBankToggle ? (
                ""
              ) : (
                <div className="error">{Account_formik.errors.HolderName}</div>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="CompanyName">
                Bank Name <sup>*</sup>
              </label>
              <select
                name="BankName"
                id="BankName"
                className={`UPI_Type ${
                  Account_formik.errors.UPI_Type &&
                  Account_formik.touched.UPI_Type
                    ? "input_error"
                    : "input_success"
                }`}
                onChange={
                  UpdateBankToggle
                    ? (e) => setBankName(e.target.value)
                    : Account_formik.handleChange
                }
                value={
                  UpdateBankToggle ? BankName : Account_formik.values.BankName
                }
              >
                <option value="" label="<----Select Your Bank Name-----> " />
                <option value="State Bank Of India ">
                  State Bank Of India{" "}
                </option>
                <option value="State Bank of Indore">
                  State Bank of Indore
                </option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="Canara Bank">Canara Bank</option>
                <option value="Central Bank of India">
                  Central Bank of India
                </option>
                <option value="Indian Bank">Indian Bank</option>
                <option value="Indian Overseas Bank">
                  Indian Overseas Bank
                </option>
                <option value="Union Bank Of India">Union Bank Of India</option>
                <option value="United Bank of India">
                  United Bank of India
                </option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="IDFC First Bank">IDFC First Bank</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Karur Vysya Bank">Karur Vysya Bank</option>
                <option value="Federal Bank">Federal Bank</option>
              </select>
              {UpdateBankToggle ? (
                ""
              ) : (
                <div className="error">{Account_formik.errors.BankName}</div>
              )}
            </div>

            <div className="form_group">
              <label htmlFor="IFSCCode">
                IFSC Code<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your IFSC Code"
                name="IFSCCode"
                id="IFSCCode"
                onBlur={Account_formik.handleBlur}
                onChange={
                  UpdateBankToggle
                    ? (e) => setIFSCCode(e.target.value)
                    : Account_formik.handleChange
                }
                value={
                  UpdateBankToggle ? IFSCCode : Account_formik.values.IFSCCode
                }
              />
              {UpdateBankToggle ? (
                ""
              ) : (
                <div className="error">{Account_formik.errors.IFSCCode}</div>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="AccountNumber">
                Account Number<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Enter Your Account Number"
                name="AccountNumber"
                id="AccountNumber"
                onBlur={Account_formik.handleBlur}
                onChange={
                  UpdateBankToggle
                    ? (e) => setAccountNumber(e.target.value)
                    : Account_formik.handleChange
                }
                value={
                  UpdateBankToggle
                    ? AccountNumber
                    : Account_formik.values.AccountNumber
                }
              />
              {UpdateBankToggle ? (
                ""
              ) : (
                <div className="error">
                  {Account_formik.errors.AccountNumber}
                </div>
              )}
            </div>
            <div className="form_submit_actions">
              {UpdateBankToggle ? (
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
    </div>
  );
};

export default Edit_BankDetails;
