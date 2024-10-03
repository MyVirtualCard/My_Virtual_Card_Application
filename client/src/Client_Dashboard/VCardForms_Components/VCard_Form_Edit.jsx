import React, { useState, useEffect, useContext } from "react";
import "./VCard_Form_Edit.scss";
import Edit_BasicForm from "./Edit_All_Form_Component/Edit_BasicForm";
import { Link, useNavigate } from "react-router-dom";
import { SiBasicattentiontoken } from "react-icons/si";
import Edit_Select_Template from "./Edit_All_Form_Component/Edit_Select_Template";
import Edit_Services from "./Edit_All_Form_Component/Edit_Services";
import Edit_Products from "./Edit_All_Form_Component/Edit_Products";
import Edit_Gallery from "./Edit_All_Form_Component/Edit_Gallery";
import Edit_Blog from "./Edit_All_Form_Component/Edit_Blog";
import Edit_Testimonial from "./Edit_All_Form_Component/Edit_Testimonial";
import Edit_Iframe from "./Edit_All_Form_Component/Edit_Iframe";
import Edit_SocialMedias from "./Edit_All_Form_Component/Edit_SocialMedias";
import Edit_Banner from "./Edit_All_Form_Component/Edit_Banner";
import Edit_Dynamic_VCard from "./Edit_All_Form_Component/Edit_Dynamic_VCard";
import Edit_Appoinment from "./Edit_All_Form_Component/Edit_Appoinment";
import Edit_Business_Hour from "./Edit_All_Form_Component/Edit_Business_Hour";
import Edit_Font from "./Edit_All_Form_Component/Edit_Font";
import Edit_Terms_Conditions from "./Edit_All_Form_Component/Edit_Terms&Conditions";
import Edit_Manage_Session from "./Edit_All_Form_Component/Edit_Manage_Session";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useParams } from "react-router-dom";
import Context from "../../Context/GlobalContext";
import Edit_Plan from "./Edit_All_Form_Component/Edit_Plan";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Edit_PrivacyPolicy from "./Edit_All_Form_Component/Edit_PrivacyPolicy";
import Edit_QR_Code from "./Edit_All_Form_Component/Edit_QR_Code";
import Edit_GoogleMap from "./Edit_All_Form_Component/Edit_GoogleMap";
import Edit_ContactDetails from "./Edit_All_Form_Component/Edit_ContactDetails";
import { SHORTKEY } from "quill/modules/keyboard";
import Edit_About from "./Edit_All_Form_Component/Edit_About";
import Edit_Payment from "./Edit_All_Form_Component/Edit_Payment";
import Edit_Video from "./Edit_All_Form_Component/Edit_Video";
import { IoCreate } from "react-icons/io5";
import Edit_Dynamic_Theme from "./Edit_All_Form_Component/Edit_Dynamic_Theme";
import { FaHandPointDown } from "react-icons/fa";

const VCard_Form_Edit = () => {
  // let { URL_Alies } = useParams();

  const [LiveLinkActivate, setLiveLinkActivate] = useState([]);
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };

  let {
    user,
    userName,
    FormSubmitLoader,
    setFormSubmitLoader,
    DynamicForm,
    setDynamicForm,
    currentTemplate,
    setCurrentTemplate,
    currentPlan,
    setCurrentPlan,
    ShowForm,
    setShowForm,
    activePlan,
    setPlanActive,
    URL_Alies,
    setURL_Alies,
    PaymentSuccessPopup,
    setPaymentSuccessPopup,
    status,
    setStatus,
    CurrentPlanActive,
    setCurrentPlanActive,
  } = useContext(Context);
  let local_URL_Alies = localStorage.getItem("URL_Alies");
  // setURL_Alies(local_URL_Alies)
  let navigate = useNavigate();

  let [formSliderToggle, setFormSliderToggle] = useState(false);

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  async function razorpayFetchData() {
    try {
      await api
        .get(`/razorpay/specificUser/${userName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            setStatus(res.data?.data[0]?.status);
            setCurrentPlan(res.data.data[0]?.currentPlan);
            if (res.data?.data[0]?.status != "created") {
              setShowForm("VCard Templates");
              setCurrentPlanActive(res.data.data.length);
            } else {
              setShowForm("Choose Your Plan");
              setCurrentPlanActive([]);
            }
          } else {
            setShowForm("Choose Your Plan");
            setStatus(null);
            // toast.error('Choose Your Plan First!')
          }
        })
        .catch((error) => {
          console.log(error);

          //    setErrorPopupOpen(true);
          //    setErrorMessage(error.response.data.message);
          //  setTimeout(()=>{
          //   setErrorPopupOpen(false);
          //  },5000)
        });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function freePlanFetchData() {
    await api
      .get(`/currentplan/specificAll/${userName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.data?.data?.length > 0) {
          setCurrentPlanActive(res.data?.data?.length);
          setStatus(res.data?.data[0]?.currentPlan);
          setCurrentPlan(res.data?.data[0]?.currentPlan);
          setShowForm("VCard Templates");
        } else {
          setStatus(null);
          setShowForm("Choose Your Plan");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleFormShow(e) {
    setFormSliderToggle(false);
    if (CurrentPlanActive == 1) {
      setShowForm(e.target.id);
    } else {
      toast.error("Choose Your Plan First!");
    }
  }
  function handleDynamicFormShow(e) {
    setFormSliderToggle(false);
    if (CurrentPlanActive == 1) {
      setDynamicForm(e.target.id);
    } else {
      toast.error("Choose Your Plan First!");
    }
  }
  async function fetchCurrentManageContent() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/manageContent/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
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
  async function fetchURLData() {
    setFormSubmitLoader(true);
    try {
      api
        .get(`/vcard_URL/${user.userName}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            setURL_Alies(res.data.data[0].URL_Alies);
            setFormSubmitLoader(false);
            setVCardCount(res.data.data);
          } else {
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setFormSubmitLoader(false);
    }
  }

  useEffect(() => {
    fetchURLData();
    razorpayFetchData();
    // freePlanFetchData();
    fetchCurrentManageContent();
  }, [status]);
  return (
    <>
      <div className="vcard_form_container">
        <div className="vcard_form_title">
          <div className="title">
            <h5>Update Your VCard</h5>
          </div>

          <div className="back_action">
            {LiveLinkActivate?.length > 0 ? (
              <>
                {currentTemplate != null ? (
                  <a
                    className="back"
                    //  href={`${import.meta.env.VITE_CLIENT_DOMAIN_URL}/
                    //  ${URL_Alies}`}
                    target="_blank"
                    onClick={() => {
                      window.open(
                        `${
                          import.meta.env.VITE_CLIENT_DOMAIN_URL
                        }/${URL_Alies}`,
                        "_blank"
                      );
                    }}
                  >
                    VCard Live preview
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </a>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            <button
              className="back"
              onClick={() => navigate(`/${userName}/uadmin/VCards`)}
            >
              Back
              <i className="bx bx-exit"></i>
            </button>
          </div>
        </div>
        <div className="vcard_form_box">
          <div
            className="slider_icon"
            onClick={() => setFormSliderToggle(!formSliderToggle)}
          >
            {!formSliderToggle ? (
              <i className="bx bxs-chevrons-right bx-flashing"></i>
            ) : (
              <i className="bx bxs-chevrons-left bx-flashing"></i>
            )}
          </div>
          {ShowForm != "Dynamic Theme" ? (
            <div
              className="form_sidenav"
              id={!formSliderToggle ? "slideClose" : "slideOpen"}
            >
              {status != null && status != "created" ? (
                <div
                  className="menu_item"
                  onClick={handleFormShow}
                  id={ShowForm === "Basic Detail" ? "menu_active" : ""}
                >
                  <i
                    className="bx bxs-user"
                    style={{ color: "orange" }}
                    id="Basic Detail"
                  ></i>

                  <small id="Basic Detail">Basic Detail</small>
                </div>
              ) : (
                <div
                  className="menu_item"
                  onClick={handleFormShow}
                  id={ShowForm === "Choose Your Plan" ? "menu_active" : ""}
                >
                  {/* <i className="bx bxs-spreadsheet" style={{ color: "green" }}></i> */}
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/3d-fluency/94/cash-in-hand.png"
                    alt="cash-in-hand"
                    id="Choose Your Plan"
                  />

                  <small id="Choose Your Plan">Choose Your Plan</small>
                </div>
              )}
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "VCard Templates" ? "menu_active" : ""}
              >
                {/* <i
                        className="bx bxs-spreadsheet"
                        style={{ color: "green" }}
                        id="VCard Templates"
                      ></i> */}
                <i
                  className="bx bxs-palette"
                  style={{ color: "royalBlue" }}
                  id="VCard Templates"
                ></i>

                <small id="VCard Templates">VCard Templates</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Contact Details" ? "menu_active" : ""}
              >
                {/* <i
                        className="bx bxs-spreadsheet"
                        style={{ color: "green" }}
                        id="Contact Details"
                      ></i> */}
                <i
                  className="bx bxs-contact"
                  style={{ color: "green" }}
                  id="Contact Details"
                ></i>
                <small id="Contact Details">Contact Details</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "About Details" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-wink-smile"
                  style={{ color: "gray" }}
                  id="About Details"
                ></i>
                <small id="About Details">About Details</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Social Link - Website" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-planet"
                  style={{ color: "tomato" }}
                  id="Social Link - Website"
                ></i>
                <small id="Social Link - Website">Social Link - Website</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Services" ? "menu_active" : ""}
              >
                <i
                  className="bx bx-trophy"
                  style={{ color: "black" }}
                  id="Services"
                ></i>
                <small id="Services">Services</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Products" ? "menu_active" : ""}
              >
                <i
                  className="bx bxl-product-hunt"
                  style={{ color: "orange" }}
                  id="Products"
                ></i>
                <small id="Products">Products</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Payment Details" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-bank"
                  style={{ color: "lightgreen" }}
                  id="Payment Details"
                ></i>
                <small id="Payment Details">Payment Details</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Galleries" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-photo-album"
                  style={{ color: "violet" }}
                  id="Galleries"
                ></i>
                <small id="Galleries">Galleries</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Videos" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-video"
                  style={{ color: "#4c4c4c" }}
                  id="Videos"
                ></i>
                <small id="Videos">Videos</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Testimonials" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-star"
                  style={{ color: "red" }}
                  id="Testimonials"
                ></i>
                <small id="Testimonials">Testimonials</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "GoogleMap" ? "menu_active" : ""}
              >
                <i
                  class="bx bxs-map-alt"
                  style={{ color: "lightgreen" }}
                  id="GoogleMap"
                ></i>
                <small id="GoogleMap">GoogleMap</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "PopUp Banner" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-image-add"
                  style={{ color: "darkGray" }}
                  id="PopUp Banner"
                ></i>
                <small id="PopUp Banner">PopUp Banner</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Business Hours" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-hourglass"
                  style={{ color: "skyblue" }}
                  id="Business Hours"
                ></i>
                <small id="Business Hours">Business Hours</small>
              </div>

              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Privacy Policy" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-lock"
                  style={{ color: "grey" }}
                  id="Privacy Policy"
                ></i>
                <small id="Privacy Policy">Privacy Policy</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Terms & Conditions" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-notepad"
                  style={{ color: "green" }}
                  id="Terms & Conditions"
                ></i>
                <small id="Terms & Conditions">Terms & Conditions</small>
              </div>
              <div
                className="menu_item"
                onClick={handleFormShow}
                id={ShowForm === "Manage Sections" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-slideshow"
                  style={{ color: "tomato" }}
                  id="Manage Sections"
                ></i>
                <small id="Manage Sections">Manage Sections</small>
              </div>
              <div
                className="menu_item"
                onClick={()=>{setShowForm('Dynamic Theme');setDynamicForm('Vcard_Theme')}}
                id={ShowForm === "Dynamic Theme" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-landscape"
                  style={{ color: "orange" }}
                  id="Dynamic Theme"
                ></i>
                <small id="Dynamic Theme">Dynamic Theme</small>
              </div>
              {/* <div
                      className="menu_item"
                      onClick={handleFormShow}
                      id={ShowForm === "Blog" ? "menu_active" : ""}
                    >
                      <i
                        className="bx bxl-blogger"
                        style={{ color: "purple" }}
                        id="Blog"
                      ></i>
                      <small id="Blog">Blog</small>
                    </div>
        
                    <div
                      className="menu_item"
                      onClick={handleFormShow}
                      id={ShowForm === "Fonts" ? "menu_active" : ""}
                    >
                      <i
                        className="bx bx-font-family"
                        style={{ color: "skyblue" }}
                        id="Fonts"
                      ></i>
                      <small id="Fonts">Fonts</small>
                    </div> */}
            </div>
          ) : (
            <div
              className="form_sidenav2"
              id={!formSliderToggle ? "slideClose" : "slideOpen"}
            >
              <div className="progressing">
                <small>Create Your Own Design</small>
                <FaHandPointDown />
              </div>

              <div
                className="menu_item"
                onClick={() => {
                  setShowForm("Dynamic Theme"), setDynamicForm("Vcard_Theme");
                }}
                id={DynamicForm === "Vcard_Theme" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-brush"
                  style={{ color: "Gray" }}
                  id="Vcard_Theme"
                ></i>
                <small id="Vcard_Theme">Vcard Theme</small>
              </div>
              <div
                className="menu_item"
                onClick={() => {
                  setShowForm("Dynamic Theme"),
                    setDynamicForm("Logo_Banner_Design");
                }}
                id={DynamicForm === "Logo_Banner_Design" ? "menu_active" : ""}
              >
                <i
                  className="bx bxs-image"
                  style={{ color: "orange" }}
                  id="Logo_Banner_Design"
                ></i>
                <small id="Logo_Banner_Design">Logo_Banner_Design</small>
              </div>
              {/* <div
            className="menu_item"
            onClick={handleFormShow}
            id={ShowForm === "Blog" ? "menu_active" : ""}
          >
            <i
              className="bx bxl-blogger"
              style={{ color: "purple" }}
              id="Blog"
            ></i>
            <small id="Blog">Blog</small>
          </div>

          <div
            className="menu_item"
            onClick={handleFormShow}
            id={ShowForm === "Fonts" ? "menu_active" : ""}
          >
            <i
              className="bx bx-font-family"
              style={{ color: "skyblue" }}
              id="Fonts"
            ></i>
            <small id="Fonts">Fonts</small>
          </div> */}
            </div>
          )}

          <div
            className="all_form_inputs"
            id={!formSliderToggle ? "formExpand" : "formMinimize"}
          >
            {status != null && status != "created" ? (
              <> {ShowForm === "Basic Detail" ? <Edit_BasicForm /> : ""}</>
            ) : (
              <>{ShowForm === "Choose Your Plan" ? <Edit_Plan /> : ""}</>
            )}

            {/* {status != "successfull" ? (
              <>{ShowForm === "Choose Your Plan" ? <Edit_Plan /> : ""}</>
            ) : (
              ""
            )} */}

            {ShowForm === "VCard Templates" ? <Edit_Select_Template /> : ""}
            {ShowForm === "Contact Details" ? <Edit_ContactDetails /> : ""}
            {ShowForm === "About Details" ? <Edit_About /> : ""}
            {ShowForm === "Services" ? <Edit_Services /> : ""}
            {ShowForm === "Products" ? <Edit_Products /> : ""}
            {ShowForm === "Payment Details" ? <Edit_Payment /> : ""}
            {ShowForm === "Galleries" ? <Edit_Gallery /> : ""}
            {ShowForm === "Videos" ? <Edit_Video /> : ""}
            {ShowForm === "Blog" ? <Edit_Blog /> : ""}
            {ShowForm === "Testimonials" ? <Edit_Testimonial /> : ""}
            {ShowForm === "GoogleMap" ? <Edit_GoogleMap /> : ""}
            {ShowForm === "Iframes" ? <Edit_Iframe /> : ""}
            {ShowForm === "Social Link - Website" ? <Edit_SocialMedias /> : ""}

            {ShowForm === "PopUp Banner" ? <Edit_Banner /> : ""}
            {ShowForm === "Dynamic Theme" ? <Edit_Dynamic_Theme /> : ""}
            {ShowForm === "Appoinment" ? <Edit_Appoinment /> : ""}
            {ShowForm === "Business Hours" ? <Edit_Business_Hour /> : ""}
            {ShowForm === "Privacy Policy" ? <Edit_PrivacyPolicy /> : ""}
            {ShowForm === "Fonts" ? <Edit_Font /> : ""}
            {ShowForm === "Terms & Conditions" ? <Edit_Terms_Conditions /> : ""}
            {ShowForm === "Manage Sections" ? <Edit_Manage_Session /> : ""}
          </div>
          {/* PaymentSuccess_banner
           */}
          {PaymentSuccessPopup ? (
            <div className="payment_success_container">
              <div
                className="popup_box"
                id={PaymentSuccessPopup ? "open" : "close"}
              >
                <div className="close">
                  {/* <i className="fa fa-close" onClick={() => setPaymentSuccessPopup(false)}></i> */}
                  <RxCross2 onClick={() => setPaymentSuccessPopup(false)} />
                </div>
                <div className="left">
                  <h4>Your Plan Successfully Purchased!</h4>
                  <p>
                    Let's build your brand identity increase your sales and
                    client's easily...
                  </p>
                  <button onClick={() => setPaymentSuccessPopup(false)}>
                    Let's Build <IoCreate className="icon" />
                  </button>
                </div>
                <div className="right">
                  <img
                    src="https://img.freepik.com/free-vector/flat-man-with-golden-coins-receive-cashback-e-wallet_88138-835.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default VCard_Form_Edit;
