import React, { useContext, useMemo, useState, useEffect } from "react";
import "./Styles/Users.scss";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import Context from "../../Context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import touch_hand from "../../assets/Client_Dashboard/touch.gif";
const Users = () => {
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
    setCurrentPlan,
    activePlan,
    setCurrentPlanActive,
    setPlanActive,
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
    VCardCount,
    setVCardCount,
  } = useContext(Context);
  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);
  let [AllUser, setAllUser] = useState([]);
  let [AllPaymentUser, setAllPaymentUser] = useState([]);
  let [ID, setID] = useState();
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

  let fetchUser = async () => {
    try {
      setFormSubmitLoader(true);
      api
        .get(`/api/user/register`)
        .then((res) => {
          console.log(res.data.UserData);
          setFormSubmitLoader(false);
          setAllUser(res.data.UserData);
        })
        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  let fetchPlan = async () => {
    try {
      setFormSubmitLoader(true);
      api
        .get(`/razorpay/AllData`)
        .then((res) => {
   
          setAllPaymentUser(res.data.data);
          setFormSubmitLoader(false);
 
        })
        .catch((error) => {
          setFormSubmitLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  async function handleUserDelete(id) {
    // e.preventDefault();
    setFormSubmitLoader(true);
    try {
      await api
        .delete(`/api/user/register_specific_data/${id}`)
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
  useEffect(() => {
    fetchUser();

    fetchPlan();
  }, [key]);
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
      <div className="users_container">
        {/* DeletePopup */}
        {VcardDeleteToggle ? (
          <div className="Vcard_delete_popupBox">
            <div className="popup_title">
              Are u sure want to delete this User?
            </div>

            <div className="popup_actions">
              <div className="delete">
                <button
                  onClick={() => {
                    handleUserDelete(ID);
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
          <h4>All Users</h4>
        </div>

        {/* Card Box */}
        <div className="row_2">
          <div className="card_box">
            <div className="card_title_box">
              <div className="title">
                <h4>NO</h4>
              </div>
              <div className="title">
                <h4>PROFILE</h4>
              </div>

              <div className="title">
                <h4>USERNAME</h4>
              </div>
              <div className="title">
                <h4>EMAIL</h4>
              </div>
              <div className="title">
                <h4>MOBILE NUMBER</h4>
              </div>
              <div className="title">
                <h4>VERIFIED</h4>
              </div>
              <div className="title">
                <h4>CREATED AT</h4>
              </div>
              <div className="title">
                <h4>PLAN</h4>
              </div>
              <div className="title">
                <h4>ACTIONS</h4>
              </div>
            </div>
            {AllUser.length > 0 ? (
              <>
                {AllUser.map((data, index) => {
                  return (
                    <>
               
    <div className="card_detail_box" key={index}>
                      <div className="detail">
                        <p className="count_no">{index + 1}]</p>
                      </div>
                      <div className="detail">
                        {data.profile != null ? (
                          <img
                            src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${
                              data.profile
                            }`}
                            alt="profile"
                          />
                        ) : (
                          <img
                            src="https://img.freepik.com/premium-vector/man-with-red-circle-around-his-neck_1256222-3753.jpg?uid=R79330344&ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                            alt="profile"
                          />
                        )}
                      </div>

                      <div className="detail">
                        <p>{data.firstName}</p>
                      </div>
                      <div className="detail">
                        {data.email != null ? (
                          <small className="note">{data.email}</small>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="detail">
                        <small>
                          {data.mobileNumber != null
                            ? "+91" + " " + data.mobileNumber
                            : ""}
                        </small>
                      </div>
                      <div className="detail">
                        <p>{data.verified == "false" ? "No" : "Yes"}</p>
                      </div>
                      <div className="detail">
                        <p>
                          {data.createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                      </div>
                      <div className="detail">
                  
                           <p className="plan">{AllPaymentUser[index]?.user === data.userName? AllPaymentUser[index].currentPlan : 'No Plan'}</p>
                 
                     
                      </div>
                      <div className="detail_actions">
                        <div
                          className="delete"
                          onClick={() => {
                            // setID(data._id);
                            // setVcardDeleteToggle(true);
                          }}
                        >
                          <div className="icon">
                            <MdDelete />
                          </div>

                          <small>Delete</small>
                        </div>
                        {/* <div
                          className="info"
                          onClick={() => {
                          
                            setID(data._id);
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
                        </div> */}
                      </div>
                    </div>
                    </>
                
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

export default Users;
