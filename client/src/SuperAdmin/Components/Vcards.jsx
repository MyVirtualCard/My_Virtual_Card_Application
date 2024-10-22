import React, { useContext, useMemo, useState, useEffect } from "react";
import "./Styles/Vcards.scss";
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
const Vcards = () => {
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
    VCardCount,
    setVCardCount,
  } = useContext(Context);
  let [VcardDeleteToggle, setVcardDeleteToggle] = useState(false);
  let[AllVcard,setAllVcard]=useState([]);
  let[ID,setID]=useState();
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
      .get('/vcard_URL')
      .then((res) => {
 
          console.log(res.data.data)
          setFormSubmitLoader(false);
          setAllVcard(res.data.data);
      
      })
      .catch((error) => {
        setFormSubmitLoader(false);
      });
  }, [key]);
  async function razorpayFetchData() {
    try {
      await api
        .get(`/razorpay/specificUser/${userName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
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

    // razorpayFetchData();

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
      <div className="vcards_container">
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
                    handleUserDelete(ID)
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
          <h4>All Created Vcards</h4>
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
                <h4>VCARD_NAME</h4>
              </div>
              <div className="title">
                <h4>USERNAME</h4>
              </div>
              <div className="title">
                <h4>PROFESSION</h4>
              </div>
            
              <div className="title">
                <h4>URL_ALIES</h4>
              </div>
             
              <div className="title">
                <h4>ACTIONS</h4>
              </div>
            </div>
            {AllVcard.length > 0 ? (
              <>
                {AllVcard.map((data, index) => {
                  return (
                    <div className="card_detail_box" key={index}>
                     <div className="detail">
                      
                      <p className="count_no">{index+1}]</p>
                      </div>
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
                      
                      <p>{data.VCardName}</p>
                      </div>
                      <div className="detail">
                       <p>{data.FirstName} {data.LastName}</p>
                      </div>
                      <div className="detail">
                        <p>
                          {data.Profession}
                        </p>
                      </div>
                      <div className="detail">
                     
                       
                           {data.URL_Alies.length > 0 ? (
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
                            ) : (
                              <small className="note2">
                                Live link not available!..Less VCard Details
                                Added
                              </small>
                            )}
                      
                       
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

export default Vcards;
