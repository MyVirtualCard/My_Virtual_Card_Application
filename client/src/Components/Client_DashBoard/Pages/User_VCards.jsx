import React, { useContext, useMemo, useState, useEffect } from "react";
import "./Styles/User_VCards.scss";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import touch_hand from "../../../assets/Brand_Logo/touch.gif";
import { AppContext } from "../../Context/AppContext";
const User_VCards = () => {
  let navigate = useNavigate();
  const handleCopyURL = () => {
    setCopied(true);
    toast.success("Link Copied!");
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };
  let {
    UserName,
    Token,
    setShowForm,
    FormSubmitLoader,
    setFormSubmitLoader,
    setURL_Alies,
    URL_Alies,
    currentTemplate, setCurrentTemplate,
    status, setStatus,
    currentPlan, setCurrentPlan,
    PlanPrice, setPlanPrice,
    SavedPlan, setSavedPlan,
    ActivePlan, setActivePlan,
    CurrentPlanActive, setCurrentPlanActive
  } = useContext(AppContext);
  let [VCardCount, setVCardCount] = useState([]);
  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);
  let [ExpireAt, setExpireAt] = useState(null);
  let [Info, setInfo] = useState(false);
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };

  const [copied, setCopied] = useState(false);
  let [Count, setCount] = useState(0);
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  useEffect(() => {
    setFormSubmitLoader(true);
    api
      .get(`/vcard_url/${UserName}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
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
  }, [navigate]);
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
            setCurrentPlanActive(res.data.data.length);
            setStatus(res.data?.data[0]?.status);
            setCurrentPlan(res.data.data[0]?.currentPlan);
            setExpireAt(res.data.data[0]?.expireAt);
            setShowForm("VCard Templates");
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


  useEffect(() => {
    try {
      api
        .get(`/templateDetail/specific/${UserName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            setURL_Alies(res.data?.data[0]?.URL_Alies);
            setCurrentTemplate(res.data?.data[0]?.currentTemplate);
          }
        })
        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  async function handleUrlDataDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/vcard_url/deleteID/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          reloadComponent();
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
  //VCard Delete
  async function handleVCardDelete() {
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/vcard/all_Data_Delete_API/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          reloadComponent();
          toast.success("Your VCard Sucessfully Deleted!");
          setFormSubmitLoader(false);
          setVcardDeleteToggle(false);
          localStorage.setItem("URL_Alies", "");
          setURL_Alies("");
          let timer = setTimeout(() => {
            setVCardCount([]);
          }, 1000);
          return () => clearTimeout(timer);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
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
          setLiveLinkActivate(res.data?.data);
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
    // fetchCurrentManageContent();
    razorpayFetchData();
    // freePlanFetchData();
  }, []);
  useEffect(() => {
    // Set up the interval to increment the count every second
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Clear the interval after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 5000); // 5 seconds

    // Cleanup function: clear interval and timeout on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className="VCards_container">
        {/* DeletePopup */}
        {VcardDeleteToggle ? (
          <div className="Vcard_delete_popupBox">
            <div className="popup_title">
              Are u sure want to delete Your VCard?
            </div>

            <div className="popup_actions">
              <div className="delete">
                <button
                  onClick={() => {
                    handleUrlDataDelete(VCardCount[0]._id), handleVCardDelete();
                  }}
                >
                  Yes
                </button>
              </div>
              <div className="cancel">
                <button onClick={() => setVcardDeleteToggle(false)}>No</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="vcard_title">
          <h4>All Your VCards</h4>
        </div>
        <div className="vcard_action">
          <Link>
            <button
              onClick={async () => {
                setFormSubmitLoader(true);
                await api
                  .get(`/vcard_url/${UserName}`, {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${Token}`,
                    },
                  })
                  .then((res) => {
              
                    if (res.data.length < 1) {
                      setFormSubmitLoader(false);
                      navigate(`/${UserName}/uadmin/create_new_vcard`);
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
        {/* Card Box */}
        <div className="row_2">
          <div className="card_box">
            <div className="card_title_box">
              <div className="title">
                <h4>PROFILE</h4>
              </div>
              <div className="title">
                <h4>BUSSINESS CATEGORY</h4>
              </div>
              <div className="title">
                <h4>PREVIEW URL</h4>
              </div>
              <div className="title">
                <h4>SUBSCRIBED</h4>
              </div>
              <div className="title">
                <h4>ACTIVATED AT</h4>
              </div>
              <div className="title">
                <h4>ACTIONS</h4>
              </div>
            </div>
            {VCardCount.length > 0 ? (
              <>
                {VCardCount.map((data, index) => {
                  return (
                    <div className="card_detail_box" key={index}>
                      <div className="detail">
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
                          <>
                            {data.Profile ? (
                              <img
                                src={`${
                                  import.meta.env.VITE_APP_BACKEND_API_URL
                                }/${data.Profile}`}
                                alt="profile"
                              />
                            ) : (
                              <img
                                src="https://img.freepik.com/premium-photo/social-media-smiling-boy-icon-illustration-happy-user-art_762678-33823.jpg?w=740"
                                alt="profile"
                              />
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="detail">
                        <p>
                          {data.VCardName == "Others"
                            ? data.BussinessType
                            : data.VCardName}
                        </p>
                      </div>
                      <div className="detail">
                        {currentTemplate === null ? (
                          <small className="note">
                            Select your VCard templete First!
                          </small>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                      <div className="detail">
                        <small>
                          {currentPlan != null
                            ? currentPlan + " " + "Plan"
                            : "No Plan"}
                      
                        </small>
                      </div>
                      <div className="detail">
                        <p>
                          {" "}
                          {data.createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                      </div>
                      <div className="detail_actions">
                        <div
                          className="edit"
                          onClick={async () => {
                            localStorage.setItem("URL_Alies", data.URL_Alies);
                            navigate(
                              `/${UserName}/uadmin/vcard_form_edit/${data.URL_Alies}`
                            );
                            // setShowForm('Basic Details')
                          }}
                        >
                          <div className="icon">
                            <FaEdit />
                          </div>

                          <small>Edit</small>
                          {Count != 5 ? (
                            <div className="touch_hand">
                              <img src={touch_hand} alt="hand" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="delete"
                          onClick={() => {
                            // handleVCardDelete(data.URL_Alies);
                            setURL_Alies(data.URL_Alies);
                            setVcardDeleteToggle(true);
                          }}
                        >
                          <div className="icon">
                            <MdDelete />
                          </div>

                          <small>Delete</small>
                        </div>
                        <div
                          className="info"
                          onClick={() => {
                            // handleVCardDelete(data.URL_Alies);
                            setURL_Alies(data.URL_Alies);
                          }}
                        >
                          <div
                            className="icon"
                            onMouseEnter={() => setInfo(true)}
                            onMouseLeave={() => {
                              setInfo(false);
                            }}
                          >
                            <HiOutlineDotsVertical />
                          </div>

                          <small>Info</small>

                          <div
                            className="info_message_box"
                            id={Info ? "show" : ""}
                          >
                            <div className="info_title">
                              <h5>Your Plan Will Be Expiring At!</h5>
                            </div>
                            <div className="info_message">
                              <p>
                                Plan Expiration Date:{" "}
                                <strong>
                                  {ExpireAt != null ? (
                                    <>
                                      {ExpireAt.slice(0, 10)
                                        .split("-")
                                        .reverse()
                                        .join("-")}
                                    </>
                                  ) : (
                                    "Plan not been activated!"
                                  )}
                                </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="card_detail_box_empty">
                <small>Empty VCard!</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User_VCards;
