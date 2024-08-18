import React, { useContext, useEffect, useState } from "react";
import "./menuStyles/User_VCards.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Context from "../../UseContext/Context";
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../UserAdmin_Footer/Footer";
const User_VCards = () => {
  // let { userName } = useParams();
  let navigate = useNavigate();
  let {
    URL_Alies,
    setURL_Alies,
    userName,
    setFormSubmitLoader,
    setCurrentTemplate,
    currentTemplate,
    ShowForm,
    currentPlan,
    setShowForm,
    VCardCount,
    setVCardCount,
    successMessage,
    setSuccessMessage,
    successPopupOpen,
    setSuccessPopupOpen,
    errorMessage,
    setErrorMessage,
    errorPopupOpen,
    setErrorPopupOpen,
    LiveLinkActivate,
    setLiveLinkActivate,
  } = useContext(Context);
  let [CurrentPlan, setCurrentPlan] = useState();
  let [savedVCardTemplate, setSavedVCardTemplate] = useState([]);
  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);
  let [Yes, setYes] = useState(false);

  // let [URL_Alies, setURL_Alies] = useState();
  let userData = JSON.parse(localStorage.getItem("datas"));

  const [key, setKey] = useState(0);
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  // let VCardURL = JSON.parse(localStorage.getItem("URL_Alies"));
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  useEffect(() => {
    setFormSubmitLoader(true);
    api
      .get(`/vcard_URL/${userName}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setFormSubmitLoader(false);
        setVCardCount(res.data.data);
      })
      .catch((error) => {
        setFormSubmitLoader(false);
        console.log(error);
      });
  }, [key]);

  useEffect(() => {
    api
      .get(`/razorpay/specificUser/${userName}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setCurrentPlan(res.data.data[0].currentPlan);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  async function handleVCardDelete() {
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/vcard/all_Data_Delete_API/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          reloadComponent();

          toast.success("Your VCard Sucessfully Deleted!");
          setFormSubmitLoader(false);
          setVcardDeleteToggle(false);
          localStorage.removeItem("URL_Alies");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  const [copied, setCopied] = useState(false);

  const handleCopyURL = () => {
    setCopied(true);
    toast.success("Link Copied!");
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };
  useEffect(() => {
    api
      .get(`/templateDetail/specific/${userName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setSavedVCardTemplate(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    try {
      api
        .get(`/templateDetail/specific/${userName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data.length);
          if (res.data.data.length > 0) {
            setURL_Alies(res.data.data[0].URL_Alies);
            setCurrentTemplate(res.data.data[0].currentTemplate);
          }
        })
        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    api
      .get(`/razorpay/specificUser/${userName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      })
      .then((res) => {
        setPlanActive(res.data.data);
        setShowForm("Basic Detail");
        setStatus(res.data.data[0].status);
        setCurrentPlan(res.data.data[0].currentPlan);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  async function fetchCurrentManageContent() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/manageContent/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
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

  useEffect(() => {
    fetchCurrentManageContent();
  }, []);
  return (
    <>
      <div className="user_vcards_container">
        {VcardDeleteToggle ? (
          <div className="Vcard_delete_popupBox">
            <div className="popup_title">
              Are u sure want to delete Your VCard?
            </div>

            <div className="popup_actions">
              <div className="delete">
                <button onClick={handleVCardDelete}>Yes</button>
              </div>
              <div className="cancel">
                <button onClick={() => setVcardDeleteToggle(false)}>No</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Success and Error Popup */}
        <div className="success_error_container">
          <div
            className="popup_success_box"
            id={successPopupOpen ? "successOpen" : "successClose"}
          >
            <div
              className="popup_close"
              onClick={() => setSuccessPopupOpen(false)}
            >
              <i className="bx bx-x"></i>
            </div>
            <div className="popup_message">{successMessage}</div>
          </div>

          {errorPopupOpen ? (
            <div className="popup_error_box">
              <div
                className="popup_close"
                onClick={() => setErrorPopupOpen(false)}
              >
                <i className="bx bx-x"></i>
              </div>
              <div className="popup_message">{errorMessage}</div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row_1">
          <div className="title">
            <h5 className="fw-medium">All Your VCards</h5>
          </div>
          <div className="actions">
            <Link>
              <button
                onClick={async () => {
                  setFormSubmitLoader(true);
                  await api
                    .get(`/vcard_URL/${userName}`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userData.token}`,
                      },
                    })
                    .then((res) => {
                      if (res.data.length < 1) {
                        setFormSubmitLoader(false);
                        navigate(`/${userName}/uadmin/create_new_vcard`);
                        setShowForm("Choose Your Plan");
                      } else {
                        setFormSubmitLoader(false);

                        toast.error(
                          "Already You Created Your VCard..One VCard Access You subscribed!"
                        );
                        setFormSubmitLoader(false);
                      }
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                }}
                className="fw-bolder"
              >
                <i className="bx bx-plus"></i>
                Create New VCard
              </button>
            </Link>
          </div>
        </div>
        <div className="row_2">
          <div className="appoinment_container  ">
            <div className="container table-responsive">
              <table
                className="table table-borderless table-hover rounded-3"
                id="example"
              >
                <thead className="bg-primary">
                  <tr>
                    <th
                      className="fw-semibold text-center"
                      style={{ width: "10%" }}
                    >
                      PROFILE
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "18%" }}
                    >
                      VCARD NAME
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "25%" }}
                    >
                      PREVIEW URL
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                      PLAN
                    </th>

                    {/* <th
                      className="text-center fw-semibold "
                      style={{ width: "5%" }}
                    >
                      SUBSCRIBERS
                    </th> */}
                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                      CREATED AT
                    </th>
                    <th
                      className="text-center fw-semibold "
                      style={{ width: "40%" }}
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-light text-center">
                  {VCardCount != undefined && VCardCount.length > 0 ? (
                    VCardCount.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td className="fw-light">
                            {data.ProfileType == "Paste_ImageAddress" ? (
                              <img
                                src={
                                  data.ProfileAddress.length > 0 &&
                                  data.ProfileAddress != undefined
                                    ? data.ProfileAddress
                                    : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                                }
                                alt="profile"
                              />
                            ) : (
                              ""
                            )}
                            {data.ProfileType == "ImageUpload" ? (
                              <img
                                src={
                                  data.Profile.length > 0 &&
                                  data.Profile != undefined
                                    ? data.Profile
                                    : "https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                                }
                                alt="profile"
                              />
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="fw-light">{data.VCardName}</td>
                          {currentTemplate === null ? (
                            <td className="fw-light text-center align-items-center">
                              <small>Select your VCard templete First!</small>
                            </td>
                          ) : (
                            <>
                              {LiveLinkActivate.length > 0 ? (
                                <td className="fw-light text-center align-items-center">
                                  {" "}
                                  <a
                                    href={`${
                                      import.meta.env.VITE_CLIENT_DOMAIN_URL
                                    }/${data.URL_Alies}`}
                                    target="_blank"
                                  >
                                    {import.meta.env.VITE_CLIENT_DOMAIN_URL}/
                                    {data.URL_Alies}
                                  </a>
                                  <CopyToClipboard
                                    text={`${
                                      import.meta.env.VITE_CLIENT_DOMAIN_URL
                                    }/${data.URL_Alies}`}
                                    onCopy={handleCopyURL}
                                  >
                                    <i className="bx bx-copy"></i>
                                  </CopyToClipboard>
                                </td>
                              ) : (
                                <td className="fw-light text-center align-items-center" style={{fontSize:'0.8rem',color:'orange'}}>Live link not available!..Less VCard Details Added</td>
                              )}
                            </>
                          )}

                          <td className="fw-light plan">
                            <small>
                              {CurrentPlan != null ? CurrentPlan : "No Plan"}
                            </small>
                          </td>

                          {/* <td className="fw-light plan">
                            <i className="bx bxs-group"></i>
                          </td> */}
                          <td className="fw-bolder" >
                            <small>
                              {data.createdAt
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </small>
                          </td>
                          <td className="fw-light">
                            <i
                              className="bx bxs-edit"
                              onClick={async () => {
                                localStorage.setItem(
                                  "URL_Alies",
                                  data.URL_Alies
                                );
                                navigate(
                                  `/${userName}/uadmin/vcard_form_edit/${data.URL_Alies}`
                                );
                                // setShowForm('Basic Details')
                              }}
                            ></i>
                            <i
                              className="bx bx-trash"
                              style={{ color: "red" }}
                              onClick={() => {
                                // handleVCardDelete(data.URL_Alies);
                                setURL_Alies(data.URL_Alies);
                                setVcardDeleteToggle(true);
                              }}
                            ></i>
                            {/* <i className="bx bx-dots-vertical-rounded"></i> */}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td colSpan="1" className="text-center">
                        No Vcard Found!
                      </td>

                      {/* <td></td> */}
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="row_3">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default User_VCards;
