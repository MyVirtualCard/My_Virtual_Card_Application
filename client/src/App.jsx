import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./All_Components/LandingPage/LandingPage";
import Context from "./All_Components/UseContext/Context";
import { Navigate, useNavigate } from "react-router-dom";
import ResetPassword from "./All_Components/Authentication/ResetPassword/ResetPassword";
import ForgotPassword from "./All_Components/Authentication/ForgotPassword/ForgotPassword";
import Login from "./All_Components/Authentication/Login/Login";
import Register from "./All_Components/Authentication/Register/Register";
import UserAdmin from "./All_Components/User_Admin_Dashboard/UserAdmin/UserAdmin";
import User_Dashboard from "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/User_Dashboard";
import User_VCards from "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/User_VCards";
import VCard_URL_Form from "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/VCard_URL_Form";
import VCard_Form_Edit from "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/Vcard_Form/VCard_Form_Edit";
import Inquiries from "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/Inquiries";
import BasicForm from "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/Vcard_Form/Edit_All_Form_Component/Edit_BasicForm";
import UserAccountSetting from "./All_Components/User_Admin_Dashboard/User_Profile_Setting/UserAccountSetting";
import VerifyOTP from "./All_Components/Authentication/VerifyOTP/VerifyOTP";
import ResendOTP from "./All_Components/Authentication/ResendOTP/ResendOTP";
import Terms_Condition from "./All_Components/LandingPage/Terms&Condition/Terms_Condition";
import Privacy_Policy from "./All_Components/LandingPage/PrivacyPolicy/Privacy_Policy";
import PaymentSuccess from "./All_Components/User_Admin_Dashboard/Payment/PaymentSuccess";

const App = () => {
  //URL Name state:
  let [AuthToggle, setAuthToggle] = useState(false);
  let [URL_Alies, setURL_Alies] = useState("");
  let [SideNavActions, setSideNavActions] = useState(false);
  let [profileOpen, setProfileOpen] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");
  let [confirmPassToggle, setConfirmPassToggle] = useState(false);
  let [Index, setIndex] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  let [userToken, setUserToken] = useState("");
  let [loader3, setLoader3] = useState(false);
  let [loader4, setLoader4] = useState(false);
  let [loader5, setLoader5] = useState(false);
  let [SuperAdminLoader, setSuperAdmin_Loader] = useState(false);
  let [FormSubmitLoader, setFormSubmitLoader] = useState(false);
  //AllUser Data:
  let [userData, setUserData] = useState("Jayakumar");
  let [AllData, setAllData] = useState([]);
  // State to store user authentication
  let [UserDetails, setUserDetails] = useState([]);
  let [show, setShow] = useState(false);
  let [userName, setUserName] = useState("Jayakumar");
  let [profile, setProfile] = useState();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [location, setLocation] = useState("");
  let [mobileNumber, setMobileNumber] = useState(null);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loader, setLoader] = useState(false);
  //Profile view toggle state:
  const [profileView, setProfileView] = useState(false);
  //New
  let [userDetail, setUserDetail] = useState();
  let [Data, setData] = useState("");
  let [BasicID, setBasicID] = useState("");
  let [ServiceId, setServiceId] = useState("");
  let [ProductId, setProdictId] = useState("");
  let [QRCodeId, setQRCodeId] = useState("");
  let [GallId, setGallId] = useState("");
  let [TestimonialID, setTestimonialID] = useState("");
  //States all
  let [slideClose, setSlideShow] = useState(false);
  let [basicForm, setBasicForm] = useState(true);
  let [contactForm, setContactForm] = useState(false);
  let [serviceForm, setServiceForm] = useState(false);
  let [productForm, setProductForm] = useState(false);
  let [galleryForm, setGalleryForm] = useState(false);
  let [socialMediaForm, setSocialMediaForm] = useState(false);
  let [testimonialForm, setTestimonialForm] = useState(false);
  let [QRCodeForm, setQRCodeForm] = useState(false);

  //Basic Detail form states:
  let [banner, setBanner] = useState();
  let [logo, setLogo] = useState();
  let [fullName, setFullName] = useState();
  let [profession, setProfession] = useState();
  let [summary, setSummary] = useState();

  //Contact Detail form States:

  let [Email1, setEmail1] = useState();
  let [AlternateEmail, setAlternateEmail] = useState();
  let [MobileNumber1, setMobileNumber1] = useState();
  let [AlternateMobileNumber, setAlternateMobileNumber] = useState();
  let [DOB, setDOB] = useState();
  let [Address, setAddress] = useState();

  //Service etail form states:

  let [serviceImage, setServiceImage] = useState();

  let [serviceTitle, setServiceTitle] = useState();
  let [serviceSummary, setServiceSummary] = useState();

  //Product detail form states:
  let [productImage, setProductImage] = useState();
  let [productTitle, setProductTitle] = useState();
  let [productReleaseDate, setProductReleaseDate] = useState();
  let [productSummary, setProductSummary] = useState();

  //Gallery:
  let [galleryImage, setGalleryImage] = useState();
  let [videoURL, setVideoURL] = useState();

  //SOcialMedia :

  let [Facebook, setFacebook] = useState();
  let [LinkedIn, setLinkedIn] = useState();
  let [WhatsUp, setWhatsUp] = useState();
  let [Instagram, setInstagram] = useState();
  let [Twiter, setTwiter] = useState();
  let [Website, setWebsite] = useState();
  let [Direction, setDirection] = useState();
  let [UTube, setUTube] = useState();
  let [Github, setGithub] = useState();

  //Testimonial:
  let [clientImage, setClientImage] = useState();
  let [clientName, setClientName] = useState();
  let [clientFeedbackDate, setClientFeedbackDate] = useState();
  let [clientFeedback, setClientFeedback] = useState();

  //QRCODE:

  let [QRCodeImage, setQRCodeImage] = useState();
  //Fetch data from mongoDb:

  let [ID, setID] = useState([]);
  let [loader2, setLoader2] = useState(false);

  let [BasicData, setBasicData] = useState([]);

  let [ContactData, setContactData] = useState([]);

  let [ServiceData, setServiceData] = useState([]);

  let [ProductData, setProductData] = useState([]);

  let [GalleryData, setGalleryData] = useState([]);

  let [SocialMediaData, setSocialMediaData] = useState([]);

  let [TestimonialData, setTestimonialData] = useState([]);

  let [QRCodeData, setQRCodeData] = useState([]);

  //Edit Data:
  let [BasicEdit, setBasicEdit] = useState(false);

  let [ContactEdit, setContactEdit] = useState(false);

  let [ServiceEdit, setServiceEdit] = useState(false);

  let [ProductEdit, setProductEdit] = useState(false);

  let [GalleryEdit, setGalleryEdit] = useState(false);

  let [SocialMediaEdit, setSocialMediaEdit] = useState(false);

  let [TestimonialEdit, setTestimonialEdit] = useState(false);
  let [QRCodeEdit, setQRCodeEdit] = useState(false);

  //Super Admin pannel Register form
  let [AddUser, setAddUser] = useState(false);
  let [EditUser, setEditUser] = useState(false);
  // let [userName, setUserName] = useState("Jayakumar");
  let [currentTemplate, setCurrentTemplate] = useState(null);
  let [savedTemplate, setSavedTemplate] = useState(null);
  //Plan:
  let [currentPlan, setCurrentPlan] = useState(null);
  let [SavedPlan, setSavedPlan] = useState(null);
  let [PlanPrice, setPlanPrice] = useState();

  // PaymentPopup
  let [PaymentSuccessPopup,setPaymentSuccessPopup]=useState(false);
  
  //OTPValue Store:

  let[OTP_Value,setOTP_Value]=useState()
  useEffect(() => {
    const Token = JSON.parse(localStorage.getItem("datas"));
    if (Token) {
      setUser(Token);
      setUserName(Token.userName);
    } else {
      setUserName("Jayakumar");
    }
  }, [navigate]);

  let [vcardSelection, setVcardSelection] = useState([]);
  return (
    <>
      <div className="App_container">
        <Context.Provider
          value={{
            OTP_Value,setOTP_Value,
            PaymentSuccessPopup,setPaymentSuccessPopup,
            URL_Alies,
            setURL_Alies,
            AuthToggle,
            setAuthToggle,
            currentTemplate,
            setCurrentTemplate,
            savedTemplate,
            setSavedTemplate,
            SavedPlan,
            setSavedPlan,
            currentPlan,
            setCurrentPlan,
            Index,
            setIndex,
            userData,
            setUserData,
            FormSubmitLoader,
            setFormSubmitLoader,
            userName,
            setUserName,
            SideNavActions,
            setSideNavActions,
            profileOpen,
            setProfileOpen,
            searchQuery,
            setSearchQuery,
            confirmPassToggle,
            setConfirmPassToggle,
            show,
            SuperAdminLoader,
            setSuperAdmin_Loader,
            EditUser,
            setEditUser,
            AddUser,
            setAddUser,
            AllData,
            setAllData,
            loader4,
            setLoader4,
            loader5,
            setLoader5,
            ServiceId,
            setServiceId,
            currentPlan,
            setCurrentPlan,
            PlanPrice,
            setPlanPrice,
            userToken,
            setUserToken,
            UserDetails,
            setUserDetails,
            user,
            setUser,
            profileView,
            setProfileView,
            show,
            setShow,
            profile,
            setProfile,
            firstName,
            setFirstName,
            lastName,
            setLastName,
            location,
            setLocation,
            mobileNumber,
            setMobileNumber,
            email,
            setEmail,
            password,
            setPassword,
            loader,
            setLoader,
            userToken,
            setUserToken,
            UserDetails,
            setUserDetails,
            user,
            setUser,
            profileView,
            setProfileView,
            show,
            setShow,
            profile,
            setProfile,
            firstName,
            setFirstName,
            lastName,
            setLastName,
            location,
            setLocation,
            mobileNumber,
            setMobileNumber,
            email,
            setEmail,
            password,
            setPassword,
            loader,
            setLoader,
            Data,
            setData,
            BasicID,
            setBasicID,
            ProductId,
            setProdictId,
            QRCodeId,
            setQRCodeId,
            GallId,
            setGallId,
            TestimonialID,
            setTestimonialID,

            slideClose,
            setSlideShow,
            basicForm,
            setBasicForm,
            contactForm,
            setContactForm,
            serviceForm,
            setServiceForm,
            productForm,
            setProductForm,
            galleryForm,
            setGalleryForm,
            socialMediaForm,
            setSocialMediaForm,
            testimonialForm,
            setTestimonialForm,
            QRCodeForm,
            setQRCodeForm,
            banner,
            setBanner,
            userDetail,
            setUserDetail,
            logo,
            setLogo,
            fullName,
            setFullName,
            profession,
            setProfession,
            summary,
            setSummary,
            Email1,
            setEmail1,
            AlternateEmail,
            setAlternateEmail,
            MobileNumber1,
            setMobileNumber1,
            AlternateMobileNumber,
            setAlternateMobileNumber,
            DOB,
            setDOB,
            Address,
            setAddress,
            serviceImage,
            setServiceImage,
            serviceTitle,
            setServiceTitle,
            serviceSummary,
            setServiceSummary,
            productImage,
            setProductImage,
            productTitle,
            setProductTitle,
            productReleaseDate,
            setProductReleaseDate,
            productSummary,
            setProductSummary,
            galleryImage,
            setGalleryImage,
            videoURL,
            setVideoURL,
            Facebook,
            setFacebook,
            LinkedIn,
            setLinkedIn,
            WhatsUp,
            setWhatsUp,
            Instagram,
            setInstagram,
            Twiter,
            setTwiter,
            Website,
            setWebsite,
            Direction,
            setDirection,
            UTube,
            setUTube,
            Github,
            setGithub,
            clientImage,
            setClientImage,
            clientName,
            setClientName,
            clientFeedbackDate,
            setClientFeedbackDate,
            clientFeedback,
            setClientFeedback,
            QRCodeImage,
            setQRCodeImage,
            ID,
            setID,
            loader2,
            setLoader2,
            loader3,
            setLoader3,
            BasicData,
            setBasicData,
            ContactData,
            setContactData,
            ServiceData,
            setServiceData,
            ProductData,
            setProductData,
            GalleryData,
            setGalleryData,
            SocialMediaData,
            setSocialMediaData,
            TestimonialData,
            setTestimonialData,
            QRCodeData,
            setQRCodeData,
            BasicEdit,
            setBasicEdit,
            ContactEdit,
            setContactEdit,
            ServiceEdit,
            setServiceEdit,
            ProductEdit,
            setProductEdit,
            GalleryEdit,
            setGalleryEdit,
            SocialMediaEdit,
            setSocialMediaEdit,
            TestimonialEdit,
            setTestimonialEdit,
            QRCodeEdit,
            setQRCodeEdit,
          }}
        >
          <Routes>
            {/* Landing Homepage */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to={`/${userName}/uadmin/dashboard`} />
                ) : (
                  <Register />
                )
              }
            />
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/verify_OTP" element={<VerifyOTP />} /> */}
            <Route path="/login" element={<Login />} />

            <Route
              path="/verify_OTP"
              element={
                user ? (
                  <Navigate to={`/${userName}/uadmin/dashboard`} />
                ) : (
                  <VerifyOTP />
                )
              }
            />
            <Route path="/resend_OTP" element={<ResendOTP />} />
            <Route path="/forgot_password" element={<ForgotPassword />}>
            <Route
              path="/forgot_password/reset_password/:id/:token"
              element={<ResetPassword />}
            />
            </Route>
           

            <Route path={`/${userName}/uadmin`} element={<UserAdmin />}>
              <Route
                path={`/${userName}/uadmin/dashboard`}
                element={<User_Dashboard />}
              />
              <Route
                path={`/${userName}/uadmin/user_vcard`}
                element={<User_VCards />}
              />
              {/* <Route
                path={`/${userName}/uadmin/vcard_form/:URL_Alies`}
                element={<VCard_Form />}
              /> */}
              <Route
                path={`/${userName}/uadmin/create_new_vcard`}
                element={<VCard_URL_Form />}
              />

              <Route
                path={`/${userName}/uadmin/vcard_form_edit/:URL_Alies`}
                element={<VCard_Form_Edit />}
              />
              <Route
                path={`/${userName}/uadmin/inquiries`}
                element={<Inquiries />}
              />
              <Route
                path={`/${userName}/uadmin/vcard_form/basic_form`}
                element={<BasicForm />}
              />

              <Route
                path={`/${userName}/uadmin/account_setting`}
                element={<UserAccountSetting />}
              />

            </Route>
            <Route path='/paymentsuccess' element={<PaymentSuccess />} />
            <Route path="/terms_condition" element={<Terms_Condition />} />
            <Route path="/privacy_condition" element={<Privacy_Policy />} />
          </Routes>
        </Context.Provider>
      </div>
    </>
  );
};

export default App;
