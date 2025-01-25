import React, { Suspense, useContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer,toast, Bounce } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import loadable from "@loadable/component";
import { AppContext } from "./Components/Context/AppContext";
import ClientDashboard from "./Components/Client_DashBoard/ClientDashboard";
import User_VCards from "./Components/Client_DashBoard/Pages/User_VCards";
import VCard_Form_Edit from "./Components/Client_DashBoard/VCardForms_Components/VCard_Form_Edit";
import VCard_URL_Form from "./Components/Client_DashBoard/Pages/VCard_URL_Form";
import ProtectedRoute from "./Components/Client_DashBoard/ProtectedRoute/ProtectedRoute";
import CAB_DRIVERS_LIVE from "./Components/Client_DashBoard/All_VCards/Live_VCards/New_Live_VCards/CAB_DRIVERS_LIVE";
import axios from "axios";
import Dynamic_VCard_Live from "./Components/Client_DashBoard/All_VCards/Dynamic_VCards/Dynamic_VCard_Live";
import GYM_TRAINER_DEMO from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/GYM_TRAINER";
import TAXI_SERVICE_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/TAXI_SERVICE_PREVIEW";
import FASHION_DESIGNER_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/FASHION_DESIGNER_PREVIEW";
import MANAGER_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/MANAGER_PREVIEW";
import BEAUTY_PARLOR_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/BEAUTY_PARLOR_PREVIEW";
import CORPORATE_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/CORPORATE_PREVIEW";
import DOCTOR_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/DOCTOR_PREVIEW";
import ADVOCATE_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/ADVOCATE_PREVIEW";
import EDUCATION_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/EDUCATION_PREVIEW";
import CAB_DRIVERS_PREVIEW from "./Components/Client_DashBoard/All_VCards/Static_VCards/New_Version_VCards/CAB_DRIVERS_PREVIEW";
import Dynamic_VCard_PREVIEW from "./Components/Client_DashBoard/All_VCards/Dynamic_VCards/Dynamic_VCard_PREVIEW";
import ResellerOTP from "./Components/Authentication/VerifyOTP/ResellerOTP";
import ResellerDashboard from "./Components/Reseller_Dashboard/ResellerDashboard";
import Users from "./Components/Reseller_Dashboard/Pages/Users";
import SuperAdmin from "./Components/SuperAdmin_Dashboard/SuperAdmin";
import Clients from "./Components/SuperAdmin_Dashboard/Pages/Clients";
import Corporate_Company from "./Components/Client_DashBoard/All_VCards/Live_VCards/New_Live_VCards/Corporate_Company";

const LazyComponent = loadable(() => import("./LazyLoading/LazyLoading"));
let LandingPage = React.lazy(() =>
  import("./Components/LandingPage/LandingPageNew")
);
let Register = React.lazy(() =>
  import("./Components/Authentication/Register/Register")
);
let Login = React.lazy(() => import("./Components/Authentication/Login/Login"));
const App = () => {
  let navigate = useNavigate();
  const [shouldLoad, setShouldLoad] = useState(false);
  let {
    backendUrl,
    Token,
    setToken,
    UserName,
    setUserName,
    URL_Alies,
    currentTemplate,
    setURL_Alies,
    setCurrentTemplate,
    ResellerUserName,
    setResellerUserName,
    setCurrentPlanActive,
    setStatus,
    setCurrentPlan,
    setShowForm
  } = useContext(AppContext);
  //Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  let local_URL_Alies = localStorage.getItem("URL_Alies");
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true); // Update state after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  useEffect(() => {
    let Token = localStorage.getItem("token");
    let UserName = localStorage.getItem("UserName");
    let local_URL_Alies = localStorage.getItem("URL_Alies");
    let ResellerUserName = localStorage.getItem("ResellerUserName");
    setUserName(UserName);
    setResellerUserName(ResellerUserName);
    setToken(Token);

    if (URL_Alies == null) {
      setURL_Alies(window.location.pathname.split("/")[1]);
    } else {
      setURL_Alies(local_URL_Alies);
    }
  }, [navigate]);
  // useEffect(() => {
  //   let local_URL_Alies = localStorage.getItem("URL_Alies");
  //   try {
  //     axios
  //       .get(
  //         backendUrl +
  //           `/templateDetail/${
  //             URL_Alies.length > 0
  //               ? local_URL_Alies
  //               : window.location.pathname.split("/")[1]
  //           }`
  //       )
  //       .then((res) => {
  //         if (res.data?.data?.length > 0) {
  //           setURL_Alies(res.data?.data[0].URL_Alies);
  //           setCurrentTemplate(res.data?.data[0].currentTemplate);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         toast.error(error.response.data.message);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [navigate]);
  useEffect(() => {
    try {
      api
        .get(
          `/templateDetail/${
            window.location.pathname.split("/")[1]
          }`
        )
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
    // Pixel Integration
    useEffect(() => {
      // Facebook Pixel script
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
  
      // Initialize Pixel
      window.fbq("init", "430826446693118");
      window.fbq("track", "PageView");
    }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Suspense fallback={<LazyComponent />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Reseller_OTP" element={<ResellerOTP />} />
          {/* //Client Dashboard */}
          <Route
            path={`/${UserName}/uadmin`}
            element={
              <ProtectedRoute>
                <ClientDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path={"create_new_vcard"}
              element={
                <ProtectedRoute>
                  <VCard_URL_Form />
                </ProtectedRoute>
              }
            />
            <Route
              path={`VCards`}
              element={
                <ProtectedRoute>
                  <User_VCards />
                </ProtectedRoute>
              }
            />
            <Route
              path={"vcard_form_edit/:URL_Alies"}
              element={
                <ProtectedRoute>
                  <VCard_Form_Edit />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* //New Designs */}
          <Route path="/Gym_Trainer_Preview" element={<GYM_TRAINER_DEMO />} />
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
          <Route path="/Education_Preview" element={<EDUCATION_PREVIEW />} />
          <Route
            path="/Cab_Drivers_Preview"
            element={<CAB_DRIVERS_PREVIEW />}
          />

          {/* Live Static Vcard */}
          {URL_Alies == URL_Alies && currentTemplate === 5 ? (
            <Route path={`/:URL_Alies`} element={<Corporate_Company />} />
          ) : (
            ""
          )}
          {URL_Alies == URL_Alies && currentTemplate === 9 ? (
            <Route path={`/:URL_Alies`} element={<CAB_DRIVERS_LIVE />} />
          ) : (
            ""
          )}

          {/* Dunamic Vcard */}
          {/* Dynamic Vcard */}
          {currentTemplate === 0 ? (
            <Route path={`/:URL_Alies`} element={<Dynamic_VCard_Live />} />
          ) : (
            ""
          )}

          {/* Reseller Dashboard */}
          <Route
            path={`/${ResellerUserName}/re-seller`}
            element={<ResellerDashboard />}
          >
            <Route path="users" element={<Users />} />
          </Route>
          {/* Super Admin Dashboard */}
          <Route path={`/super-admin`} element={<SuperAdmin />}>
            <Route path="clients" element={<Clients />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
