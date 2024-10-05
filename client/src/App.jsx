import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  useContext,
  createContext,
} from "react";
import "./App.scss";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import FallBack from "./Fallback/FallBack";
import User_Dashboard from "./Client_Dashboard/Components/User_Dashboard";
import User_VCards from "./Client_Dashboard/Components/User_VCards";
import User_Inquries from "./Client_Dashboard/Components/User_Inquries";
import User_Appoinments from "./Client_Dashboard/Components/User_Appoinments";
import User_Setting from "./Client_Dashboard/Components/User_Setting";
import User_Notification from "./Client_Dashboard/Components/User_Notification";
import { ToastContainer, toast, Bounce, Slide, Zoom } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage/LandingPage";
import Register from "./Authentication/Register/Register";
import Login from "./Authentication/Login/Login";
import VerifyOTP from "./Authentication/VerifyOTP/VerifyOTP";
import Context from "./Context/GlobalContext.js";
import VCard_URL_Form from "./Client_Dashboard/Components/VCard_URL_Form.jsx";
import VCard_Form_Edit from "./Client_Dashboard/VCardForms_Components/VCard_Form_Edit.jsx";
import Business_Consultant from "./Client_Dashboard/All_VCards/Live_VCards/Business_Consultant.jsx";
import ResetPassword from "./Authentication/ResetPassword/ResetPassword.jsx";
import Gym_Trainer from "./Client_Dashboard/All_VCards/Live_VCards/Gym_Trainer.jsx";
import Terms_Condition from "./LandingPage/Terms&Condition/Terms_Condition.jsx";
import Privacy_Policy from "./LandingPage/PrivacyPolicy/Privacy_Policy.jsx";
import Client_Dashboard from "./Client_Dashboard/Client_Dashboard.jsx";
import LandingPageNew from "./LandingPage/LandingPageNew.jsx";
import Gym_Trainer_Demo from "./Client_Dashboard/All_VCards/Static_VCards/Gym_Trainer_Demo.jsx";
import Taxi_Service_Demo from "./Client_Dashboard/All_VCards/Static_VCards/Taxi_Service_Demo.jsx";
import Fashion_Designer_Demo from "./Client_Dashboard/All_VCards/Static_VCards/Fashion_Designer_Demo.jsx";
import Manager_Demo from "./Client_Dashboard/All_VCards/Static_VCards/Manager_Demo.jsx";
import Business_Consultant_Demo from "./Client_Dashboard/All_VCards/Static_VCards/Business_Consultant_Demo.jsx";
import Real_Estate_Demo from "./Client_Dashboard/All_VCards/Static_VCards/Real_Estate_Demo.jsx";
import Beauty_Parlor_Demo from "./Client_Dashboard/All_VCards/Static_VCards/Beauty_Parlor_Demo.jsx";
import Boutique_Demo from "./Client_Dashboard/All_VCards/Static_VCards/Boutique_Demo.jsx";
import Taxi_Service from "./Client_Dashboard/All_VCards/Live_VCards/Taxi_Service.jsx";
import Fashion_Designer from "./Client_Dashboard/All_VCards/Live_VCards/Fashion_Designer.jsx";
import Manager from "./Client_Dashboard/All_VCards/Live_VCards/Manager.jsx";
import Real_Estate from "./Client_Dashboard/All_VCards/Live_VCards/Real_Estate.jsx";
import Beauty_Parlor from "./Client_Dashboard/All_VCards/Live_VCards/Beauty_Parlor.jsx";
import Boutique from "./Client_Dashboard/All_VCards/Live_VCards/Boutique.jsx";
import GYM_TRAINER_DEMO from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/GYM_TRAINER.jsx";

import FASHION_DESIGNER_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/FASHION_DESIGNER_PREVIEW.jsx";
import MANAGER_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/MANAGER_PREVIEW.jsx";
import BEAUTY_PARLOR_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/BEAUTY_PARLOR_PREVIEW.jsx";
import CORPORATE_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/CORPORATE_PREVIEW.jsx";
import GYM_TRAINER_LIVE from "./Client_Dashboard/All_VCards/Live_VCards/New_Live_VCards/GYM_TRAINER_LIVE.jsx";
import TAXI_DRIVER_LIVE from "./Client_Dashboard/All_VCards/Live_VCards/New_Live_VCards/TAXI_DRIVER_LIVE.jsx";
import FASHION_DESIGNER_LIVE from "./Client_Dashboard/All_VCards/Live_VCards/New_Live_VCards/FASHION_DESIGNER_LIVE.jsx";
import MANAGER_LIVE from "./Client_Dashboard/All_VCards/Live_VCards/New_Live_VCards/MANAGER_LIVE.jsx";
import BEAUTY_PARLOR_LIVE from "./Client_Dashboard/All_VCards/Live_VCards/New_Live_VCards/BEAUTY_PARLOR_LIVE.jsx";
import Corporate_Company from "./Client_Dashboard/All_VCards/Live_VCards/New_Live_VCards/Corporate_Company.jsx";

import Page_Not_Found_Error_Page from "./Page_Not_Found_Error_Page/Page_Not_Found_Error_Page.jsx";
import URLNotFound from "./Client_Dashboard/404_Error_Page/404.jsx";
import DOCTOR_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/DOCTOR_PREVIEW.jsx";
import ADVOCATE_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/ADVOCATE_PREVIEW.jsx";
import EDUCATION_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/EDUCATION_PREVIEW.jsx";
import CAB_DRIVERS_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/CAB_DRIVERS_PREVIEW.jsx";
import TAXI_SERVICE_PREVIEW from "./Client_Dashboard/All_VCards/Static_VCards/New_Version_VCards/TAXI_SERVICE_PREVIEW.jsx";
import DOCTOR_LIVE from "./Client_Dashboard/All_VCards/Live_VCards/New_Live_VCards/DOCTOR_LIVE.jsx";
import ADVOCATE_LIVE from "./Client_Dashboard/All_VCards/Live_VCards/New_Live_VCards/ADVOCATE_LIVE.jsx";

//Import All component:
const App = () => {
  let navigate = useNavigate();
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  // All Global States;
  let [user, setUser] = useState(null);
  let [userName, setUserName] = useState(null);
  let [mobileNumber, setMobileNumber] = useState();
  let [registeredData, setRegisteredData] = useState([]);
  //Loader
  let [FormSubmitLoader, setFormSubmitLoader] = useState(false);
  //CurrentVCard templateActive
  let [currentTemplate, setCurrentTemplate] = useState(null);
  //Current Plan:
  let [currentPlan, setCurrentPlan] = useState(null);
  let [SavedPlan, setSavedPlan] = useState(null);
  let [PlanPrice, setPlanPrice] = useState();
  // /PaYEMENT
  let [status, setStatus] = useState(null);
  let [activePlan, setPlanActive] = useState([]);
  let [ShowForm, setShowForm] = useState("Choose Your Plan");
  let [DynamicForm, setDynamicForm] = useState();
  let [LiveLinkActivate, setLiveLinkActivate] = useState([]);
  let [VCardCount, setVCardCount] = useState([]);
  let [CurrentPlanActive, setCurrentPlanActive] = useState(0);
  let [PaymentSuccessPopup, setPaymentSuccessPopup] = useState(false);
  //URL_Alies
  let [URL_Alies, setURL_Alies] = useState("");

  //Forget Pass
  let [ResetPassToken_Id, setResetPassToken_Id] = useState("");
  let [resetPassToken, setResetPassToken] = useState();
  let [resetPassId, setResetPassId] = useState();

  // Dynamic Form States

  // 1]Vcard theme states
  let [VCardColour, setVCardColour] = useState("#fff");
  let [VCardTextColour, setVCardTextColour] = useState("#000");
  let [SVG_Design, setSVG_Design] = useState("");
  // 2]Banner and Logo
  const [BannerHeight, setBannerHeight] = React.useState([200]);
  const [BannerBrightness, setBannerBrightness] = React.useState([100]);
  let [LogoWidth, setLogoWidth] = useState(100);
  let [LogoWidthUnit, setLogoWidthUnit] = useState("px");
  let [LogoHeight, setLogoHeight] = useState(100);
  let [LogoHeightUnit, setLogoHeightUnit] = useState("px");
  let [LogoBorderRadius, setLogoBorderRadius] = useState("0");
  let [LogoBorderRadiusUnit, setLogoBorderRadiusUnit] = useState("px");
  let [LogoPosition, setLogoPosition] = useState("absolute");
  let [LogoTopPosition, setLogoTopPosition] = useState("100");
  let [LogoPositionUnit, setLogoPositionUnit] = useState("%");
  let [LogoLeftPosition, setLogoLeftPosition] = useState("50");
  let [LogoBottomPosition, setLogoBottomPosition] = useState("0");
  let [LogoRightPosition, setLogoRightPosition] = useState("0");
  //3]Button/icon states
  let [BtnBackColour, setBtnBackColour] = useState("violet");
  let [BtnTextColour, setBtnTextColour] = useState("white");
  let [BtnHoverColour, setBtnHoverColour] = useState("tomato");
  let [BtnHoverTextColour, setBtnHoverTextColour] = useState("white");
  const [isHovered, setIsHovered] = useState(false);
  let [ContactBtnBorderRadius, setContactBtnBorderRadius] = useState("0");
  let [ContactBtnUnit, setContactBtnUnit] = useState("px");
  let [IconBorderRadius, setIconBorderRadius] = useState("0");
  let [IconUnit, setIconUnit] = useState("px");

  // 4]Title states
  let [TitleColor, setTitleColor] = useState("#4c4c4c");
  let [TitleSize, setTitleSize] = useState("15");
  let [TitleUnit, setTitleUnit] = useState("px");
  let [TitleFontWeight, setTitleFontWeight] = useState("600");
  let [TitleFont, setTitleFont] = useState("Arial");
  let [TitlePosition, setTitlePosition] = useState("center");
  // 5] Service States
  let [ServiceBackColor, setServiceBackColor] = useState("lightGray");
  let [ServiceTextColor, setServiceTextColor] = useState("white");
  let [ServiceTitleColor, setServiceTitleColor] = useState("gray");
  let [ServiceTitleFont, setServiceTitleFont] = useState("Arial");
  let [ServiceTitleSize, setServiceTitleSize] = useState(10);
  let [ServiceTitleUnit, setServiceTitleUnit] = useState("px");
  let [ServiceFontWeight, setServiceFontWeight] = useState(500);
  let [ServiceTitleAlign, setServiceTitleAlign] = useState("start");
  let [BtnBackColor, setBtnBackColor] = useState("orange");
  let [BtnTextColor, setBtnTextColor] = useState("white");
  let [BtnHoverBackColor, setBtnHoverBackColor] = useState("white");
  let [BtnHoverTextColor, setBtnHoverTextColor] = useState("orange");
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  let local_userName = JSON.parse(localStorage.getItem("userName"));
  let local_mobileNumber = JSON.parse(localStorage.getItem("mobileNumber"));
  let local_URL_Alies = localStorage.getItem("URL_Alies");
  useEffect(() => {
    if (local_userName) {
      return setUserName(local_userName);
    }
    if (local_mobileNumber) {
      return setMobileNumber(local_mobileNumber);
    }
    if (local_URL_Alies === "") {
      setURL_Alies(URL_Alies);
    } else {
      setURL_Alies(local_URL_Alies);
    }
  }, [navigate]);
  useEffect(() => {
    const Localstorage_UserData = JSON.parse(localStorage.getItem("datas"));

    if (Localstorage_UserData != null) {
      setUser(Localstorage_UserData);
      if (userName == null || userName == "") {
        return setUserName(Localstorage_UserData.userName);
      }
    }
  }, [navigate]);
  useEffect(() => {
    try {
      api
        .get(`/templateDetail/${local_URL_Alies}`)
        .then((res) => {
          if (res.data?.data?.length > 0) {
            setURL_Alies(res.data?.data[0].URL_Alies);
            setCurrentTemplate(res.data?.data[0].currentTemplate);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  return (
    <>
      <div className="App_container">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Zoom}
        />

        <Context.Provider
          value={{
            URL_Alies,
            setURL_Alies,
            userName,
            mobileNumber,
            user,
            DynamicForm,
            setDynamicForm,
            setUser,
            registeredData,
            setRegisteredData,
            FormSubmitLoader,
            setFormSubmitLoader,
            currentTemplate,
            setCurrentTemplate,
            currentPlan,
            setCurrentPlan,
            status,
            setStatus,
            activePlan,
            setPlanActive,
            ShowForm,
            setShowForm,
            PlanPrice,
            setPlanPrice,
            SavedPlan,
            setSavedPlan,
            LiveLinkActivate,
            setLiveLinkActivate,
            VCardCount,
            setVCardCount,
            ResetPassToken_Id,
            setResetPassToken_Id,
            resetPassToken,
            setResetPassToken,
            resetPassId,
            setResetPassId,
            CurrentPlanActive,
            setCurrentPlanActive,
            PaymentSuccessPopup,
            setPaymentSuccessPopup,
            //1] Vcard Theme states
            VCardColour,
            setVCardColour,
            VCardTextColour,
            setVCardTextColour,
            SVG_Design,
            setSVG_Design,
            //2] Dynamic Banner and Logo states
            BannerHeight,
            setBannerHeight,
            BannerBrightness,
            setBannerBrightness,
            LogoWidth,
            setLogoWidth,
            LogoWidthUnit,
            setLogoWidthUnit,
            LogoHeight,
            setLogoHeight,
            LogoHeightUnit,
            setLogoHeightUnit,
            LogoBorderRadius,
            setLogoBorderRadius,
            LogoBorderRadiusUnit,
            setLogoBorderRadiusUnit,
            LogoPosition,
            setLogoPosition,
            LogoTopPosition,
            setLogoTopPosition,
            LogoPositionUnit,
            setLogoPositionUnit,
            LogoLeftPosition,
            setLogoLeftPosition,
            LogoBottomPosition,
            setLogoBottomPosition,
            LogoRightPosition,
            setLogoRightPosition,
            // 3]Dynamic Button and Icon states
            BtnBackColour,
            setBtnBackColour,
            BtnTextColour,
            setBtnTextColour,
            BtnHoverColour,
            setBtnHoverColour,
            BtnHoverTextColour,
            setBtnHoverTextColour,
            isHovered,
            setIsHovered,
            ContactBtnBorderRadius,
            setContactBtnBorderRadius,
            ContactBtnUnit,
            setContactBtnUnit,
            IconBorderRadius,
            setIconBorderRadius,
            IconUnit,
            setIconUnit,

            // 4]Title states
            TitleColor,
            setTitleColor,
            TitleSize,
            setTitleSize,
            TitleUnit,
            setTitleUnit,
            TitleFontWeight,
            setTitleFontWeight,
            TitleFont,
            setTitleFont,
            TitlePosition,
            setTitlePosition,
            // 5]ServiceStates
            ServiceBackColor,
            setServiceBackColor,
            ServiceTextColor,
            setServiceTextColor,
            ServiceTitleColor,
            setServiceTitleColor,
            ServiceTitleFont,
            setServiceTitleFont,
            ServiceTitleSize,
            setServiceTitleSize,
            ServiceTitleUnit,
            setServiceTitleUnit,
            ServiceFontWeight,
            setServiceFontWeight,
            ServiceTitleAlign,
            setServiceTitleAlign,
            BtnBackColor,
            setBtnBackColor,
            BtnTextColor,
            setBtnTextColor,
            BtnHoverBackColor,
            setBtnHoverBackColor,
            BtnHoverTextColor,
            setBtnHoverTextColor,
          }}
        >
          <Suspense fallback={<FallBack />}>
            <Routes>
              {/* Landing Page */}
              <Route path="/old" element={<LandingPage />} />
              <Route path="/" element={<LandingPageNew />} />
              {/* Authentication */}
              <Route path="/register" element={<Register />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/verify_OTP" element={<VerifyOTP />} />
              <Route
                path="/reset_password/:id/:token"
                element={<ResetPassword />}
              />

              <Route path="/paymentsuccess" element={<f />} />
              <Route path="/terms_condition" element={<Terms_Condition />} />
              <Route path="/privacy_condition" element={<Privacy_Policy />} />
              {/* Client Dashboard Routes */}
              <Route
                path={`/${userName}/uadmin`}
                element={<Client_Dashboard />}
              >
                <Route
                  path={`/${userName}/uadmin/create_new_vcard`}
                  element={<VCard_URL_Form />}
                />
                <Route
                  path={`/${userName}/uadmin/dashboard`}
                  element={<User_Dashboard />}
                />
                <Route
                  path={`/${userName}/uadmin/VCards`}
                  element={<User_VCards />}
                />
                <Route
                  path={`/${userName}/uadmin/Inquries`}
                  element={<User_Inquries />}
                />
                <Route
                  path={`/${userName}/uadmin/Appoinments`}
                  element={<User_Appoinments />}
                />
                <Route
                  path={`/${userName}/uadmin/setting`}
                  element={<User_Setting />}
                />
                <Route
                  path={`/${userName}/uadmin/notification`}
                  element={<User_Notification />}
                />
                <Route
                  path={`/${userName}/uadmin/vcard_form_edit/:URL_Alies`}
                  element={<VCard_Form_Edit />}
                />
              </Route>

              {/* Static VCard */}
              <Route path="/Gym_Trainer" element={<Gym_Trainer_Demo />} />
              <Route path="/Taxi_Service" element={<Taxi_Service_Demo />} />
              <Route
                path="/Fashion_Designer"
                element={<Fashion_Designer_Demo />}
              />
              <Route path="/Manager" element={<Manager_Demo />} />
              <Route
                path="/Business_Consultant"
                element={<Business_Consultant_Demo />}
              />
              <Route path="/Real_Estate" element={<Real_Estate_Demo />} />
              <Route path="/Beauty_Parlor" element={<Beauty_Parlor_Demo />} />
              <Route path="/Boutique_Shop" element={<Boutique_Demo />} />
              {/* //New Designs */}
              <Route
                path="/Gym_Trainer_Preview"
                element={<GYM_TRAINER_DEMO />}
              />
              <Route
                path="/Taxi_Service_Preview"
                element={<TAXI_SERVICE_PREVIEW />}
              />
              <Route
                path="/Fashion_Designer_Preview"
                element={<FASHION_DESIGNER_PREVIEW />}
              />
              <Route path="/Manager_Preview" element={<MANAGER_PREVIEW />} />
              <Route
                path="/Beauty_Parlor_Preview"
                element={<BEAUTY_PARLOR_PREVIEW />}
              />
              <Route
                path="/Corporate_Company_Preview"
                element={<CORPORATE_PREVIEW />}
              />
              <Route path="/Doctor_Preview" element={<DOCTOR_PREVIEW />} />
              <Route path="/Advocate_Preview" element={<ADVOCATE_PREVIEW />} />
              <Route
                path="/Education_Preview"
                element={<EDUCATION_PREVIEW />}
              />
              <Route
                path="/Cab_Drivers_Preview"
                element={<CAB_DRIVERS_PREVIEW />}
              />
              {/* Live VCards */}

              {/* {URL_Alies == URL_Alies && currentTemplate === 1 ? (
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
               {URL_Alies == URL_Alies && currentTemplate === 6 ? (
                <Route path={`/:URL_Alies`} element={<Real_Estate />} />
              ) : (
                ""
              )}
                    {URL_Alies == URL_Alies && currentTemplate === 7 ? (
                <Route path={`/:URL_Alies`} element={<Beauty_Parlor />} />
              ) : (
                ""
              )}
                 {URL_Alies == URL_Alies && currentTemplate === 8 ? (
                <Route path={`/:URL_Alies`} element={<Boutique />} />
              ) : (
                ""
              )} */}
              {URL_Alies == URL_Alies && currentTemplate === 1 ? (
                <Route path={`/:URL_Alies`} element={<Corporate_Company />} />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 2 ? (
                <Route path={`/:URL_Alies`} element={<GYM_TRAINER_LIVE />} />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 3 ? (
                <Route path={`/:URL_Alies`} element={<TAXI_DRIVER_LIVE />} />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 4 ? (
                <Route
                  path={`/:URL_Alies`}
                  element={<FASHION_DESIGNER_LIVE />}
                />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 5 ? (
                <Route path={`/:URL_Alies`} element={<MANAGER_LIVE />} />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 6 ? (
                <Route path={`/:URL_Alies`} element={<BEAUTY_PARLOR_LIVE />} />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 7 ? (
                <Route path={`/:URL_Alies`} element={<DOCTOR_LIVE />} />
              ) : (
                ""
              )}
              {URL_Alies == URL_Alies && currentTemplate === 8 ? (
                <Route path={`/:URL_Alies`} element={<ADVOCATE_LIVE />} />
              ) : (
                ""
              )}
              {/* <Route path="*" element={<Page_Not_Found_Error_Page />} /> */}
            </Routes>
          </Suspense>
        </Context.Provider>
      </div>
    </>
  );
};

export default App;
