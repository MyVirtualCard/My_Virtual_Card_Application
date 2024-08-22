import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Context from "./All_Components/UseContext/Context";
import { Navigate, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
const FallbackWithDelay = ({ delay, fallback }) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showFallback ? fallback : null;
};
let LandingPage = lazy(() =>
  import("./All_Components/LandingPage/LandingPage")
);
let ResetPassword = lazy(() =>
  import("./All_Components/Authentication/ResetPassword/ResetPassword")
);
let ForgotPassword = lazy(() =>
  import("./All_Components/Authentication/ForgotPassword/ForgotPassword")
);
let Login = lazy(() => import("./All_Components/Authentication/Login/Login"));
let Register = lazy(() =>
  import("./All_Components/Authentication/Register/Register")
);
let UserAdmin = lazy(() =>
  import("./All_Components/User_Admin_Dashboard/UserAdmin/UserAdmin")
);
let User_Dashboard = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/User_Dashboard"
  )
);
let User_VCards = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/User_VCards"
  )
);
let VCard_URL_Form = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/VCard_URL_Form"
  )
);
let VCard_Form_Edit = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/Vcard_Form/VCard_Form_Edit"
  )
);
let Inquiries = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/Inquiries"
  )
);
let BasicForm = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/Vcard_Form/Edit_All_Form_Component/Edit_BasicForm"
  )
);
let UserAccountSetting = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Profile_Setting/UserAccountSetting"
  )
);

let VerifyOTP = lazy(() =>
  import("./All_Components/Authentication/VerifyOTP/VerifyOTP")
);
let ResendOTP = lazy(() =>
  import("./All_Components/Authentication/ResendOTP/ResendOTP")
);
let Terms_Condition = lazy(() =>
  import("./All_Components/LandingPage/Terms&Condition/Terms_Condition")
);
let Privacy_Policy = lazy(() =>
  import("./All_Components/LandingPage/PrivacyPolicy/Privacy_Policy")
);
let PaymentSuccess = lazy(() =>
  import("./All_Components/User_Admin_Dashboard/Payment/PaymentSuccess")
);
let Appoinment = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/Appoinment"
  )
);
let ProductOrder = lazy(() =>
  import(
    "./All_Components/User_Admin_Dashboard/User_Admin_All_Component/ProductOrder"
  )
);

// import NewCardDesign1 from "./All_Components/All_VCards/Live_VCards/NewCardDesign1.jsx";
// import NewCardDesign2 from "./All_Components/All_VCards/Live_VCards/NewCardDesign2.jsx";
// import NewCardDesign3 from "./All_Components/All_VCards/Live_VCards/NewCardDesign3.jsx";
// import NewCardDesign4 from "./All_Components/All_VCards/Live_VCards/NewCardDesign4.jsx";
// import NewCardDesign5 from "./All_Components/All_VCards/Live_VCards/NewCardDesign5.jsx";
// import NewCardDesign6 from "./All_Components/All_VCards/Live_VCards/NewCardDesign6.jsx";
// import NewCardDesign7 from "./All_Components/All_VCards/Live_VCards/NewCardDesign7.jsx";
// import NewCardDesign8 from "./All_Components/All_VCards/Live_VCards/NewCardDesign8.jsx";
// import NewCardDesign9 from "./All_Components/All_VCards/Live_VCards/NewCardDesign9.jsx";

//NewVCard templates
import Taxi_Service from "./All_Components/All_VCards/Live_VCards/Taxi_Service.jsx";
import Gym_Trainer from "./All_Components/All_VCards/Live_VCards/Gym_Trainer.jsx";

import Fashion_Designer from "./All_Components/All_VCards/Live_VCards/Fashion_Designer.jsx";

import FallBack from "./Fallback/FallBack.jsx";
import Gym_Trainer_Demo from "./All_Components/All_VCards/Static_VCards/Gym_Trainer_Demo.jsx";
import Taxi_Service_Demo from "./All_Components/All_VCards/Static_VCards/Taxi_Service_Demo.jsx";
import Fashion_Designer_Demo from "./All_Components/All_VCards/Static_VCards/Fashion_Designer_Demo.jsx";
import Manager_Demo from "./All_Components/All_VCards/Static_VCards/Manager_Demo.jsx";
import Business_Consultant_Demo from "./All_Components/All_VCards/Static_VCards/Business_Consultant_Demo.jsx";
import Manager from "./All_Components/All_VCards/Live_VCards/Manager.jsx";
import Business_Consultant from "./All_Components/All_VCards/Live_VCards/Business_Consultant.jsx";

const App = () => {
  //URL Name state:
  let [AuthToggle, setAuthToggle] = useState(false);
  let [ForgotPassToggle, setForgotPassToggle] = useState(false);
  let [ResetPassToggle, setResetPassToggle] = useState(false);
  let [VerifyOTPToggle, setVerifyOTPToggle] = useState(false);
  let [ResendOTPToggle, setResendOTPToggle] = useState(false);
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
  let [userData, setUserData] = useState("myvirtualcard");
  let [AllData, setAllData] = useState([]);
  // State to store user authentication
  let [UserDetails, setUserDetails] = useState([]);
  let [show, setShow] = useState(false);
  let [userName, setUserName] = useState("myvirtualcard");
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
  let [ShowForm, setShowForm] = useState("Choose Your Plan");
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
  let [PaymentSuccessPopup, setPaymentSuccessPopup] = useState(false);
  let [status, setStatus] = useState(null);
  let [activePlan, setPlanActive] = useState([]);
  //OTPValue Store:

  let [OTP_Value, setOTP_Value] = useState();

  //Success and error popup state
  let [successMessage, setSuccessMessage] = useState();
  let [successPopupOpen, setSuccessPopupOpen] = useState(false);
  let [errorMessage, setErrorMessage] = useState();
  let [errorPopupOpen, setErrorPopupOpen] = useState(false);

  let [AllFeedback, setAllFeedback] = useState([]);
  let [AllAppoinment, setAllAppoinment] = useState([]);
  let [VCardCount, setVCardCount] = useState([]);

  let [LiveLinkActivate, setLiveLinkActivate] = useState([]);
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
  const localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const URL_Alies_LocalStorage = localStorage.getItem("URL_Alies");
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  useEffect(() => {
    try {
      api
        .get(`/templateDetail/${URL_Alies_LocalStorage}`)
        .then((res) => {
          setURL_Alies(res.data.data[0].URL_Alies);
          setCurrentTemplate(res.data.data[0].currentTemplate);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // async function fetchCurrentTemplate() {
  //   try {
  //     await api
  //       .get(`/templateDetail/specificAll/${URL_Alies}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorageDatas.token}`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data.data)
  //         // setVCardAdded(res.data.data.length);
  //         if (res.data.data.length <= 0) {
  //           setCurrentTemplate(null);
  //         } else {
  //           setCurrentTemplate(res.data.data[0].currentTemplate);
  //           setURL_Alies(res.data.data[0].URL_Alies)
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // }
  // useEffect(() => {
  //   fetchCurrentTemplate();
  // }, []);
  // console.log(currentTemplate)
  return (
    <>
      <div className="App_container">
        <Toaster
          toastOptions={{
            style: {
              position: "relative",
              top: "60px",
              left: "50px",
              right: "auto",
              bottom: "auto",
              zIndex: "1000",
            },
          }}
        />
        <Context.Provider
          value={{
            ForgotPassToggle,
            setForgotPassToggle,
            ResetPassToggle,
            setResetPassToggle,
            VerifyOTPToggle,
            setVerifyOTPToggle,
            ResendOTPToggle,
            setResendOTPToggle,
            LiveLinkActivate,
            setLiveLinkActivate,
            VCardCount,
            setVCardCount,
            AllFeedback,
            setAllFeedback,
            AllAppoinment,
            setAllAppoinment,
            successMessage,
            setSuccessMessage,
            successPopupOpen,
            setSuccessPopupOpen,
            errorMessage,
            setErrorMessage,
            errorPopupOpen,
            setErrorPopupOpen,
            ShowForm,
            setShowForm,
            activePlan,
            setPlanActive,
            status,
            setStatus,
            OTP_Value,
            setOTP_Value,
            PaymentSuccessPopup,
            setPaymentSuccessPopup,
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
          <Suspense
            fallback={
              <FallbackWithDelay loadingTime={1000} fallback={<FallBack />} />
            }
          >
            <Routes>
              {/* Landing Homepage */}
              <Route path="/fallback" element={<FallBack />} />
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
                  path={`/${userName}/uadmin/appoinment`}
                  element={<Appoinment />}
                />
                <Route
                  path={`/${userName}/uadmin/product_order`}
                  element={<ProductOrder />}
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
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/terms_condition" element={<Terms_Condition />} />
              <Route path="/privacy_condition" element={<Privacy_Policy />} />

              {/*AllVardsTemplate */}

              {/* {currentTemplate == 1 ? (
              <Route path={`/:URL_Alies`} element={<NewCardDesign1 />} />
            ) : (
              ""
            )}
            {currentTemplate == 2 ? (
              <Route path="/:URL_Alies" element={<NewCardDesign2 />} />
            ) : (
              ""
            )}
            {currentTemplate == 3 ? (
              <Route path={`/:URL_Alies`} element={<NewCardDesign3 />} />
            ) : (
              ""
            )}
            {currentTemplate == 4 ? (
              <Route path={`/:URL_Alies`} element={<NewCardDesign4 />} />
            ) : (
              ""
            )}
            {currentTemplate == 5 ? (
              <Route path={`/:URL_Alies`} element={<NewCardDesign5 />} />
            ) : (
              ""
            )}
            {currentTemplate == 6 ? (
              <Route path={`/:URL_Alies`} element={<NewCardDesign6 />} />
            ) : (
              ""
            )}
            {currentTemplate == 7 ? (
              <Route path={`/:URL_Alies`} element={<NewCardDesign7 />} />
            ) : (
              ""
            )}
            {currentTemplate == 8 ? (
              <Route path={`/:URL_Alies`} element={<NewCardDesign8 />} />
            ) : (
              ""
            )}
            {currentTemplate == 9 ? (
              <Route path={`/:URL_Alies`} element={<NewCardDesign9 />} />
            ) : (
              ""
            )} */}
              {/* Static VCard */}
              <Route path="/Gym_Trainer" element={<Gym_Trainer_Demo />} />
              <Route path="/Taxi_Service" element={<Taxi_Service_Demo />} />
              <Route
                path="/Fasion_Designer"
                element={<Fashion_Designer_Demo />}
              />
              <Route path="/Manager" element={<Manager_Demo />} />
              <Route
                path="/Business_Consultant"
                element={<Business_Consultant_Demo />}
              />

              {/* //New Tempaltes */}

              {URL_Alies == URL_Alies && currentTemplate === 1 ? (
                <Route path={`/:URL_Alies`} element={<Gym_Trainer />} />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 2 ? (
                <Route path={`/:URL_Alies`} element={<Taxi_Service />} />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 3 ? (
                <Route path={`/:URL_Alies`} element={<Fashion_Designer />} />
              ) : (
                ""
              )}
                 {URL_Alies == URL_Alies && currentTemplate === 4 ? (
                <Route path={`/:URL_Alies`} element={<Manager />} />
              ) : (
                ""
              )}
                  {URL_Alies == URL_Alies && currentTemplate === 5 ? (
                <Route path={`/:URL_Alies`} element={<Business_Consultant />} />
              ) : (
                ""
              )}
                {/* <Route path={`/manager_live`} element={<Manager />} /> */}
                {/* <Route path={`/bussiness_consultant_live`} element={<Business_Consultant />} /> */}
            </Routes>
          </Suspense>
        </Context.Provider>
      </div>
    </>
  );
};

export default App;
