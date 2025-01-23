import React, { useState, useEffect, useContext } from "react";
import "./VCard_Form_Edit.scss";

import { Link, useNavigate } from "react-router-dom";
import { SiBasicattentiontoken } from "react-icons/si";
import { SiIconfinder } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { IoCreate } from "react-icons/io5";
import { MdMiscellaneousServices } from "react-icons/md";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FaHandPointDown } from "react-icons/fa";
import Edit_Plan from "./Edit_All_Form_Component/Edit_Plan";
import Edit_Select_Template from "./Edit_All_Form_Component/Edit_Select_Template";
import Edit_BasicForm from "./Edit_All_Form_Component/Edit_BasicForm";
import Edit_ContactDetails from "./Edit_All_Form_Component/Edit_ContactDetails";
import Edit_About from "./Edit_All_Form_Component/Edit_About";
import Edit_SocialMedias from "./Edit_All_Form_Component/Edit_SocialMedias";
import Edit_Services from "./Edit_All_Form_Component/Edit_Services";
import Edit_Products from "./Edit_All_Form_Component/Edit_Products";
import Edit_BankDetails from "./Edit_All_Form_Component/Edit_BankDetails";
import Edit_Gallery from "./Edit_All_Form_Component/Edit_Gallery";
import Edit_Video from "./Edit_All_Form_Component/Edit_Video";
import Edit_Testimonial from "./Edit_All_Form_Component/Edit_Testimonial";
import Edit_GoogleMap from "./Edit_All_Form_Component/Edit_GoogleMap";
import Edit_Banner from "./Edit_All_Form_Component/Edit_Banner";
import Edit_Business_Hour from "./Edit_All_Form_Component/Edit_Business_Hour";
import Edit_Manage_Session from "./Edit_All_Form_Component/Edit_Manage_Session";
import { AppContext } from "../../Context/AppContext";
import Edit_Dynamic_Theme from "./Edit_All_Form_Component/Edit_Dynamic_Theme";

const VCard_Form_Edit = () => {
  // let { URL_Alies } = useParams();

  const [LiveLinkActivate, setLiveLinkActivate] = useState([]);
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };

  let {
    Token,
    UserName,
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
    URL_Alies,
    setURL_Alies,
    PaymentSuccessPopup,
    setPaymentSuccessPopup,
    status,
    setStatus,
    CurrentPlanActive,
    setCurrentPlanActive,
  } = useContext(AppContext);
  console.log(status)
  // setURL_Alies(local_URL_Alies)
  let navigate = useNavigate();

  let [formSliderToggle, setFormSliderToggle] = useState(false);

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  async function razorpayFetchData() {
    try {
      await api
        .get(`/razorpay/specificUser/${UserName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
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
            // setShowForm("Choose Your Plan");
            // setStatus(null);
            // toast.error('Choose Your Plan First!')
          }
        })
        .catch((error) => {
          console.log(error);

      
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function freePlanFetchData() {
    await api
      .get(`/freeplan/specificAll/${UserName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        if (res.data?.data?.PlanPrice == 0) {
          setCurrentPlanActive(1);
          setStatus(res.data?.data?.currentPlan);
          setCurrentPlan(res.data?.data?.currentPlan);
          setShowForm("VCard Templates");
        } else {
          // setStatus(null);
          // setShowForm("Choose Your Plan");
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
  async function fetchCurrentManageContent() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/manageContent/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
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
        .get(`/vcard_url/${UserName}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
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
    freePlanFetchData();
    fetchCurrentManageContent();
  }, [status]);
console.log(status)
  return (
    <>
      <div className="vcard_form_container">
        <div className="vcard_form_box">
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
                      Preview VCard
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
                onClick={() => navigate(`/${UserName}/uadmin/VCards`)}
              >
                Back
                <i className="bx bx-exit"></i>
              </button>
            </div>
          </div>
          <div className="vcard_content">
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
                  <small id="Social Link - Website">
                    Social Link - Website
                  </small>
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
                    className="bx bxs-map-alt"
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

                {/* <div
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
                </div> */}
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
                {currentPlan == "EnterPrice" ? (
                  <div
                    className="menu_item"
                    onClick={() => {
                      setShowForm("Dynamic Theme");
                      setDynamicForm("Vcard_Theme");
                    }}
                    id={ShowForm === "Dynamic Theme" ? "menu_active" : ""}
                  >
                    <i
                      className="bx bxs-landscape"
                      style={{ color: "orange" }}
                      id="Dynamic Theme"
                    ></i>
                    <small id="Dynamic Theme">Dynamic VCard</small>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div
                className="form_sidenav2"
                id={!formSliderToggle ? "slideClose" : "slideOpen"}
              >
                <div className="progressing">
                  <FiArrowLeftCircle
                    className="icon"
                    onClick={() => setShowForm("Basic Detail")}
                  />
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
                    className="bx bxs-palette"
                    style={{ color: "orange" }}
                    id="Logo_Banner_Design"
                  ></i>
                  <small id="Logo_Banner_Design">Profile_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Contact_Icons");
                  }}
                  id={DynamicForm === "Contact_Icons" ? "menu_active" : ""}
                >
                  <div
                    className="icon"
                    style={{ color: "royalblue" }}
                    id="Contact_Icons"
                  >
                    <SiIconfinder />
                  </div>

                  <small id="Contact_Icons">Contact_Icons</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Title_Design");
                  }}
                  id={DynamicForm === "Title_Design" ? "menu_active" : ""}
                >
                  <i
                    className="bx bx-captions"
                    style={{ color: "#4c4c4c" }}
                    id="Title_Design"
                  ></i>

                  <small id="Title_Design">Title_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Service_Design");
                  }}
                  id={DynamicForm === "Service_Design" ? "menu_active" : ""}
                >
                  <div
                    className="icon"
                    style={{ color: "#4c4c4c" }}
                    id="Service_Design"
                  >
                    <MdMiscellaneousServices />
                  </div>

                  <small id="Service_Design">Service_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Product_Design");
                  }}
                  id={DynamicForm === "Product_Design" ? "menu_active" : ""}
                >
                  <i
                    className="bx bx-cart-alt"
                    style={{ color: "skyblue" }}
                    id="Product_Design"
                  ></i>

                  <small id="Product_Design">Product_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Appoinment_Design");
                  }}
                  id={DynamicForm === "Appoinment_Design" ? "menu_active" : ""}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#0B8A72" }}
                    id="Appoinment_Design"
                  >
                    groups
                  </span>

                  <small id="Appoinment_Design">Appoinment_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Gallery_Design");
                  }}
                  id={DynamicForm === "Gallery_Design" ? "menu_active" : ""}
                >
                  <i
                    className="bx bx-image"
                    style={{ color: "darkgreen" }}
                    id="Gallery_Design"
                  ></i>

                  <small id="Gallery_Design">Gallery_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Timer_Design");
                  }}
                  id={DynamicForm === "Timer_Design" ? "menu_active" : ""}
                >
                  <i
                    className="bx bxs-timer"
                    style={{ color: "violet" }}
                    id="Timer_Design"
                  ></i>
                  <small id="Timer_Design">Timer_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Testimonial_Design");
                  }}
                  id={DynamicForm === "Testimonial_Design" ? "menu_active" : ""}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "blue" }}
                    id="Testimonial_Design"
                  >
                    share_reviews
                  </span>
                  <small id="Timer_Design">Testimonial_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Feedback_Design");
                  }}
                  id={DynamicForm === "Feedback_Design" ? "menu_active" : ""}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "brown" }}
                    id="Feedback_Design"
                  >
                    reviews
                  </span>
                  <small id="Feedback_Design">Feedback_Design</small>
                </div>
                <div
                  className="menu_item"
                  onClick={() => {
                    setShowForm("Dynamic Theme"),
                      setDynamicForm("Inquiry_Design");
                  }}
                  id={DynamicForm === "Inquiry_Design" ? "menu_active" : ""}
                  style={{ display: "none" }}
                >
                  <i
                    className="bx bx-support"
                    style={{ color: "tomato" }}
                    id="Inquiry_Design"
                  ></i>
                  <small id="Inquiry_Design">Inquiry_Design</small>
                </div>
              </div>
            )}

            <div
              className="all_form_inputs"
              id={!formSliderToggle ? "formExpand" : "formMinimize"}
            >
              {status === null || status === "created"  ? (
                  <>{ShowForm === "Choose Your Plan" ? <Edit_Plan /> : ""}</>
          
              ) : (
               
                <> {ShowForm === "Basic Detail" ? <Edit_BasicForm /> : ""}</>
              )}

          

              {ShowForm === "VCard Templates" ? <Edit_Select_Template /> : ""}
              {ShowForm === "Contact Details" ? <Edit_ContactDetails /> : ""}
              {ShowForm === "About Details" ? <Edit_About /> : ""}
              {ShowForm === "Social Link - Website" ? (
                <Edit_SocialMedias />
              ) : (
                ""
              )}
              {ShowForm === "Services" ? <Edit_Services /> : ""}
              {ShowForm === "Products" ? <Edit_Products /> : ""}
              {ShowForm === "Payment Details" ? <Edit_BankDetails /> : ""}
              {ShowForm === "Galleries" ? <Edit_Gallery /> : ""}
              {ShowForm === "Videos" ? <Edit_Video /> : ""}
              {ShowForm === "Blog" ? <Edit_Blog /> : ""}
              {ShowForm === "Testimonials" ? <Edit_Testimonial /> : ""}
              {ShowForm === "GoogleMap" ? <Edit_GoogleMap /> : ""}
              {ShowForm === "PopUp Banner" ? <Edit_Banner /> : ""}
              {ShowForm === "Dynamic Theme" ? <Edit_Dynamic_Theme /> : ""}
              {ShowForm === "Appoinment" ? <Edit_Appoinment /> : ""}
              {ShowForm === "Business Hours" ? <Edit_Business_Hour /> : ""}
              {/* {ShowForm === "Privacy Policy" ? <Edit_PrivacyPolicy /> : ""} */}
              {/* {ShowForm === "Fonts" ? <Edit_Font /> : ""} */}
              {/* {ShowForm === "Terms & Conditions" ? (
                <Edit_Terms_Conditions />
              ) : (
                ""
              )} */}
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
      </div>
    </>
  );
};

export default VCard_Form_Edit;
