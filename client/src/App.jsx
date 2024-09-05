import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  useContext,
  createContext,
} from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import FallBack from "./Fallback/FallBack";
import User_Dashboard from "./Client_Dashboard/Components/User_Dashboard";
import User_VCards from "./Client_Dashboard/Components/User_VCards";
import User_Inquries from "./Client_Dashboard/Components/User_Inquries";
import User_Appoinments from "./Client_Dashboard/Components/User_Appoinments";
import User_Setting from "./Client_Dashboard/Components/User_Setting";
import User_Notification from "./Client_Dashboard/Components/User_Notification";
import { ToastContainer, toast, Bounce, Slide, Zoom } from "react-toastify";
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage/LandingPage";

import Register from "./Authentication/Register/Register";
import Login from "./Authentication/Login/Login";
import VerifyOTP from "./Authentication/VerifyOTP/VerifyOTP";
import Context from "./Context/GlobalContext.js";
import VCard_URL_Form from "./Client_Dashboard/Components/VCard_URL_Form.jsx";
import VCard_Form_Edit from "./Client_Dashboard/VCardForms_Components/VCard_Form_Edit.jsx";
import Business_Consultant from "./Client_Dashboard/All_VCards/Live_VCards/Business_Consultant.jsx";
//Import All component:
const Client_Dashboard = lazy(() =>
  import("./Client_Dashboard/Client_Dashboard")
);
// const LandingPage = lazy(() => {
//   import("./LandingPage/LandingPage");
// });

const App = () => {
  let navigate = useNavigate();
  // All Global States;
  let [user, setUser] = useState();
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
  let [LiveLinkActivate, setLiveLinkActivate] = useState([]);
  let [VCardCount, setVCardCount] = useState([]);
  //URL_Alies
  let [URL_Alies, setURL_Alies] = useState();
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  useEffect(() => {
    let local_userName = JSON.parse(localStorage.getItem("userName"));
    let local_mobileNumber = JSON.parse(localStorage.getItem("mobileNumber"));
    let local_URL_Alies = localStorage.getItem("URL_Alies");
    if (local_userName) {
      return setUserName(local_userName);
    }
    if (local_mobileNumber) {
      setMobileNumber(local_mobileNumber);
    } else {
      setMobileNumber();
    }
    if (local_URL_Alies) {
      setURL_Alies(local_URL_Alies);
    } else {
      setURL_Alies("demo");
    }
  }, [navigate]);
  useEffect(() => {
    const Localstorage_UserData = JSON.parse(localStorage?.getItem("datas"));
    if (Localstorage_UserData) {
      setUser(Localstorage_UserData);
      if (userName == null) {
        return setUserName(Localstorage_UserData.userName);
      }
    }
  }, [navigate]);
  useEffect(() => {
    try {
      api
        .get(`/templateDetail/${URL_Alies}`)
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
            VCardCount, setVCardCount,
          }}
        >
          <Suspense fallback={<FallBack />}>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Authentication */}
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
              <Route path="/login" element={<Login />} />
              <Route path="/verify_OTP" element={<VerifyOTP />} />
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
              {/* Live VCards */}

              {URL_Alies == URL_Alies && currentTemplate === 5 ? (
                <Route path={`/:URL_Alies`} element={<Business_Consultant />} />
              ) : (
                ""
              )}
              {/* <Route path='/coder' element={<Business_Consultant />} /> */}
            </Routes>
          </Suspense>
        </Context.Provider>
      </div>
    </>
  );
};

export default App;
