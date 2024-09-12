import React, { useContext, useMemo, useState, useEffect } from "react";
import "./Styles/VCards.scss";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import Context from "../../Context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
const User_VCards = () => {
  let navigate = useNavigate();
  const handleCopyURL = () => {
    setCopied(true);
    toast.success("Link Copied!");
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  let {
    currentTemplate,
    setCurrentTemplate,
    setShowForm,
    currentPlan,
    activePlan, setPlanActive,
    userName,
    user,
    setUser,
    FormSubmitLoader,
    setFormSubmitLoader,
    setSavedVCardTemplate,
    status,
    setStatus,
    URL_Alies,
    setURL_Alies,
    LiveLinkActivate,
    setLiveLinkActivate,
    VCardCount, setVCardCount,
  } = useContext(Context);
  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);
  let [CurrentPlan, setCurrentPlan] = useState();
  const [key, setKey] = useState(0);
  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };

  const [copied, setCopied] = useState(false);
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  useEffect(() => {
    setFormSubmitLoader(true);
    api
      .get(`/vcard_URL/${userName}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          setFormSubmitLoader(false);
          setVCardCount(res.data.data);
        } else {
          setFormSubmitLoader(false);
        }
      })
      .catch((error) => {
        setFormSubmitLoader(false);
      });
  }, []);
  useEffect(() => {
    api
      .get(`/razorpay/specificUser/${userName}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setCurrentPlan(res.data.data[0].currentPlan);
        setPlanActive(res.data.data);
        setShowForm("Basic Detail");
        setStatus(res.data.data[0].status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //Free Plan
  useEffect(() => {
    api
      .get(`/currentplan/specificAll/${userName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          setCurrentPlan(res.data.data[0]?.currentPlan);
        } else {
          setShowForm("Choose Your Plan");
        }
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
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
   
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
  //VCard Delete
  async function handleVCardDelete() {
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/vcard/all_Data_Delete_API/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
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
          console.log(error);
          toast.error(error.response.data.message);
          setFormSubmitLoader(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          console.log(res)
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
      <div className="VCards_container">
        {/* DeletePopup */}
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
        <div className="vcard_title">
          <h4>All Your VCards</h4>
        </div>
        <div className="vcard_action">
          <Link>
            <button
              onClick={async () => {
                setFormSubmitLoader(true);
                await api
                  .get(`/vcard_URL/${userName}`, {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.token}`,
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

        {/* Table */}

        <div className="row_2">
          <div className="table_container">
            <table>
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
                            <>
                              {data.Profile ? (
                                <img
                                  src={data.Profile}
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
                              <td
                                className="fw-light text-center align-items-center"
                                style={{
                                  fontSize: "0.8rem",
                                  color: "orange",
                                }}
                              >
                                Live link not available!..Less VCard Details
                                Added
                              </td>
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
                        <td className="fw-bolder">
                          <small>
                            {data.createdAt
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("-")}
                          </small>
                        </td>
                        <td className="fw-light">
                          <button
                            onClick={async () => {
                              localStorage.setItem("URL_Alies", data.URL_Alies);
                              navigate(
                                `/${userName}/uadmin/vcard_form_edit/${data.URL_Alies}`
                              );
                              // setShowForm('Basic Details')
                            }}
                          >
                            Edit
                          </button>
                          <button
                            style={{ color: "red" }}
                            onClick={() => {
                              // handleVCardDelete(data.URL_Alies);
                              setURL_Alies(data.URL_Alies);
                              setVcardDeleteToggle(true);
                            }}
                          >
                            Delete
                          </button>
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
    </>
  );
};

export default User_VCards;
