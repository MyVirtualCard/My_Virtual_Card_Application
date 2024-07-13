import React, { useState, useEffect, useContext } from "react";
import "./VCard_Form_Edit.scss";
import Edit_BasicForm from "./Edit_All_Form_Component/Edit_BasicForm";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import { useParams } from "react-router-dom";
import Context from "../../../UseContext/Context";
import Edit_Plan from "./Edit_All_Form_Component/Edit_Plan";
import toast from "react-hot-toast";
import Edit_PrivacyPolicy from "./Edit_All_Form_Component/Edit_PrivacyPolicy";
import Edit_QR_Code from "./Edit_All_Form_Component/Edit_QR_Code";

const VCard_Form_Edit = () => {
let{userName,currentPlan, setCurrentPlan,}=useContext(Context)
  let navigate = useNavigate();
  let [CurrentPlanActive,setCurrentPlanActive]=useState(0);
  let [formSliderToggle,setFormSliderToggle]=useState(false);
  let [userData, setUserData] = useState("jayakumar");
  let [ShowForm, setShowForm] = useState("Choose Your Plan");
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});
  useEffect(()=>{
    try{
      api.get(`/currentplan/specificAll/${userName}`,   {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      }).then((res)=>{
         
        if(res.data.data.length === 1){
          setCurrentPlanActive(res.data.data.length)
        }
        else{
          toast.error('Choose Your Plan First!')
        }
      }).catch((error)=>{
        toast.error(error.response.data.message)
      })
    }
    catch(error){
      toast.error(error.message)
    }
  },[])
  function handleFormShow(e) {
    setFormSliderToggle(false)
    if(CurrentPlanActive == 1){
      setShowForm(e.target.id);
    }
    else{
      toast.error('Choose Your Plan First!')
    }
  }
  let userDetails = JSON.parse(localStorage.getItem("datas"));
  useEffect(() => {
    api
      .get(`/auth/register/${userDetails.id}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  return (
    <>
      <div className="vcard_form_container">
        <div className="vcard_form_title">
          <div className="title">
            <h5>Update Your VCard</h5>
          </div>
          <div className="back_action">
            <button
            className="back"
              onClick={() =>
                navigate(`/${userName}/uadmin/user_vcard`)
              }
            >
              Back
              <i className='bx bx-exit' ></i>
            </button>
          </div>
        </div>
        <div className="vcard_form_box">
        <div className="slider_icon" onClick={()=>setFormSliderToggle(!formSliderToggle)}>
          <i className='bx bx-slider-alt' ></i>
          </div>
        <div className="form_sidenav" id={!formSliderToggle ? "slideClose":'slideOpen'}>

       
        <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Choose Your Plan" ? "menu_active" : ""}
            >
              {/* <i className="bx bxs-spreadsheet" style={{ color: "green" }}></i> */}
              <img width="24" height="24" src="https://img.icons8.com/3d-fluency/94/cash-in-hand.png" alt="cash-in-hand" id='Choose Your Plan'/>

              <small id='Choose Your Plan'>Choose Your Plan</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Basic Detail" ? "menu_active" : ""}
            >
              <i className="bx bxs-user" style={{ color: "blue" }} id="Basic Detail"></i>
              <small id="Basic Detail">Basic Detail</small>
            </div>
         
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "VCard Templates" ? "menu_active" : ""}
            >
              <i className="bx bxs-spreadsheet" style={{ color: "green" }} id="VCard Templates"></i>

              <small id="VCard Templates">VCard Templates</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Social Link - Website" ? "menu_active" : ""}
            >
              <i className="bx bxs-planet" style={{ color: "tomato" }} id="Social Link - Website"></i>
              <small id="Social Link - Website">Social Link - Website</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Services" ? "menu_active" : ""}
            >
              <i className="bx bx-trophy" style={{ color: "black" }} id="Services"></i>
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
              <small id='Products'>Products</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Galleries" ? "menu_active" : ""}
            >
              <i className="bx bxs-photo-album" style={{ color: "violet" }} id="Galleries"></i>
              <small id="Galleries">Galleries</small>
            </div>
       
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Testimonials" ? "menu_active" : ""}
            >
              <i className="bx bxs-star" style={{ color: "red" }} id
              ="Testimonials"></i>
              <small id="Testimonials">Testimonials</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "PopUp Banner" ? "menu_active" : ""}
            >
              <i className="bx bxs-image-add" style={{ color: "darkGray" }} id='PopUp Banner'></i>
              <small id="PopUp Banner">PopUp Banner</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Business Hours" ? "menu_active" : ""}
            >
              <i className="bx bxs-hourglass" style={{ color: "skyblue" }} id="Business Hours"></i>
              <small id="Business Hours">Business Hours</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Customize QR Code" ? "menu_active" : ""}
            >
              <i className="bx bx-qr-scan" id="Customize QR Code"></i>
              <small id="Customize QR Code">Customize QR Code</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Privacy Policy" ? "menu_active" : ""}
            >
          
              <i className='bx bxs-lock' style={{ color: "grey" }} id="Privacy Policy"></i>
              <small id="Privacy Policy">Privacy Policy</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Terms & Conditions" ? "menu_active" : ""}
            >
              <i className="bx bxs-notepad" style={{ color: "green" }} id="Terms & Conditions"></i>
              <small id="Terms & Conditions">Terms & Conditions</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Manage Sections" ? "menu_active" : ""}
            >
              <i className="bx bxs-slideshow" style={{ color: "tomato" }} id="Manage Sections"></i>
              <small id="Manage Sections">Manage Sections</small>
            </div>
            <div className="progressing">
            <small>On Working  Progress</small>
            <i class='bx bx-chevrons-down bx-fade-down' ></i>
            </div>
    
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Iframes" ? "menu_active" : ""}
            >
              <i className="bx bx-shape-square" style={{ color: "grey" }} id="Iframes"></i>
              <small id="Iframes">Iframes</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Appoinment" ? "menu_active" : ""}
            >
              <i className="bx bxs-calendar" style={{ color: "royalBlue" }} id="Appoinment"></i>
              <small id='Appoinment'>Appoinment</small>
            </div>
         
         
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Dynamic VCard" ? "menu_active" : ""}
            >
              <i className="bx bxs-landscape" style={{ color: "orange" }} id="Dynamic VCard"></i>
              <small id="Dynamic VCard">Dynamic VCard</small>
            </div>
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Blog" ? "menu_active" : ""}
            >
              <i className="bx bxl-blogger" style={{ color: "purple" }} id="Blog"></i>
              <small id="Blog">Blog</small>
            </div>
         
          
            <div
              className="menu_item"
              onClick={handleFormShow}
              id={ShowForm === "Fonts" ? "menu_active" : ""}
            >
              <i className="bx bx-font-family" style={{ color: "skyblue" }} id="Fonts"></i>
              <small id="Fonts">Fonts</small>
            </div>
        
           
          </div>
          <div className="all_form_inputs" id={!formSliderToggle ? "formExpand":'formMinimize'}>
            {ShowForm === "Basic Detail" ? <Edit_BasicForm /> : ""}
            {ShowForm === "Choose Your Plan" ? <Edit_Plan /> : ""}
            {ShowForm === "VCard Templates" ? <Edit_Select_Template /> : ""}
            {ShowForm === "Services" ? <Edit_Services /> : ""}
            {ShowForm === "Products" ? <Edit_Products /> : ""}
            {ShowForm === "Galleries" ? <Edit_Gallery /> : ""}
            {ShowForm === "Blog" ? <Edit_Blog /> : ""}
            {ShowForm === "Testimonials" ? <Edit_Testimonial /> : ""}
            {ShowForm === "Iframes" ? <Edit_Iframe /> : ""}
            {ShowForm === "Social Link - Website" ? <Edit_SocialMedias /> : ""}
            {ShowForm === "Customize QR Code" ? <Edit_QR_Code/>:''}
            {ShowForm === "PopUp Banner" ? <Edit_Banner /> : ""}
            {ShowForm === "Dynamic VCard" ? <Edit_Dynamic_VCard /> : ""}
            {ShowForm === "Appoinment" ? <Edit_Appoinment /> : ""}
            {ShowForm === "Business Hours" ? <Edit_Business_Hour /> : ""}
            {ShowForm === 'Privacy Policy' ?  <Edit_PrivacyPolicy/>: ''}
            {ShowForm === "Fonts" ? <Edit_Font /> : ""}
            {ShowForm === "Terms & Conditions" ? <Edit_Terms_Conditions /> : ""}
            {ShowForm === "Manage Sections" ? <Edit_Manage_Session /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default VCard_Form_Edit;
