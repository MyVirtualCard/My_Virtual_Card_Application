import React, { useState, useEffect, useContext } from "react";
import "./Edit_form_styles/Edit_Plan.scss";
import { Link } from "react-router-dom";
// import batches from "../../../../assets/animations/batches.gif";
import standard from "../../../../../assets/animations/standard.gif";
import basic from "../../../../../assets/animations/basic.gif";
import enterprice from "../../../../../assets/animations/enterprice.gif";
import { toast, Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import Context from "../../../../UseContext/Context";

let Free_Plans = [
  {
    id: 1,
    PlanName: "Demo",
    batches:
      "https://img.icons8.com/external-bearicons-flat-bearicons/64/external-Free-Trial-miscellany-texts-and-badges-bearicons-flat-bearicons.png",
    Duration: "1-Day",
    PlanPrice: 10,
    VCardCount: "01",
    Access: [
      {
        id: 1,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Basic Information",
      },
      {
        id: 2,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Share cards with Everyone",
      },
      {
        id: 3,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Update card Unlimited times",
      },
      {
        id: 4,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Profile Photo / Company Logo",
      },
      {
        id: 5,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Name & Contact Number",
      },
      {
        id: 6,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Social Media Links",
      },
      {
        id: 7,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Email Instantly",
      },
      {
        id: 8,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Call Now in a Touch",
      },
      {
        id: 9,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Website in a Single Click",
      },
      {
        id: 10,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Photos in Gallery -2",
      },
      {
        id: 11,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Contact Form Included",
      },
    ],
  },
];
let Basic_Plans = [
  {
    id: 2,
    PlanName: "Basic",
    batches: basic,
    Duration: "Yearly",
    PlanPrice: 599,
    VCardCount: "05",
    Access: [
      {
        id: 1,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Basic Information",
      },
      {
        id: 2,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Share cards with Everyone",
      },
      {
        id: 3,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Update card Unlimited times",
      },
      {
        id: 4,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Profile Photo / Company Logo",
      },
      {
        id: 5,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Name & Contact Number",
      },
      {
        id: 6,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Social Media Links",
      },
      {
        id: 7,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Email Instantly",
      },
      {
        id: 8,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Call Now in a Touch",
      },
      {
        id: 9,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Website in a Single Click",
      },
      {
        id: 10,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Photos in Gallery -05",
      },
      {
        id: 11,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Contact Form Included",
      },
      {
        id: 12,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Services",
      },
      {
        id: 13,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "QR Code Generation",
      },
      {
        id: 14,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Google Map Link",
      },
    ],
  },
];
let Standard_Plans = [
  {
    id: 3,
    PlanName: "Standard",
    batches: standard,
    Duration: "Yearly",
    PlanPrice: 899,
    VCardCount: "08",
    Access: [
      {
        id: 1,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Basic Information",
      },
      {
        id: 2,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Share cards with Everyone",
      },
      {
        id: 3,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Update card Unlimited times",
      },
      {
        id: 4,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Profile Photo / Company Logo",
      },
      {
        id: 5,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Name & Contact Number",
      },
      {
        id: 6,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Social Media Links",
      },
      {
        id: 7,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Email Instantly",
      },
      {
        id: 8,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Call Now in a Touch",
      },
      {
        id: 9,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Website in a Single Click",
      },
      {
        id: 10,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Photos in Gallery -05",
      },
      {
        id: 11,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Product with images-05",
      },
      {
        id: 12,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Product Enquiry",
      },
      {
        id: 13,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Contact Form Included",
      },
      {
        id: 14,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Services",
      },
      {
        id: 15,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "QR Code Generation",
      },
      {
        id: 16,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Google Map Link",
      },
      {
        id: 17,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Custom Domain (@ Rs.999 - optional)",
      },
    ],
  },
];
let EnterPrice_Plans = [
  {
    id: 4,
    PlanName: "Enterprises",
    batches: enterprice,
    Duration: "Yearly",
    PlanPrice: 1299,
    VCardCount: "10",
    Access: [
      {
        id: 1,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Basic Information",
      },
      {
        id: 2,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Share cards with Everyone",
      },
      {
        id: 3,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Update card Unlimited times",
      },
      {
        id: 4,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Profile Photo / Company Logo",
      },
      {
        id: 5,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Name & Contact Number",
      },
      {
        id: 6,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Social Media Links",
      },
      {
        id: 7,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Email Instantly",
      },
      {
        id: 8,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Call Now in a Touch",
      },
      {
        id: 9,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Website in a Single Click",
      },
      {
        id: 10,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Photos in Gallery -10",
      },
      {
        id: 11,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Product with images-10",
      },
      {
        id: 12,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Product Enquiry",
      },
      {
        id: 13,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Contact Form Included",
      },
      {
        id: 14,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Services",
      },
      {
        id: 15,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "QR Code Generation",
      },
      {
        id: 16,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Testimonial Sider",
      },
      {
        id: 17,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Google Map Link",
      },
      {
        id: 18,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Payment upi linking",
      },
      {
        id: 19,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Custom Domain (@ Rs.999 - optional)",
      },
    ],
  },
];
const Plan = () => {
  let navigate = useNavigate();
  let { URL_Alies } = useParams();
  let {
    currentPlan,
    setCurrentPlan,
    PlanPrice,
    setPlanPrice,
    FormSubmitLoader,
    setFormSubmitLoader,
    userName,
  } = useContext(Context);

  let [currentAccessDetails, setCurrentAccessDetails] = useState();
  let [currentAccessActive, setCurrentAccessActive] = useState(false);
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  let [userData, setUserData] = useState();
  const [amount, setAmount] = useState("");

  console.log(amount, typeof amount);

  const [key, setKey] = useState(0);

  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  function handle_Plan_Selection(getCurrentPlan) {
    setCurrentPlan(getCurrentPlan === currentPlan ? null : getCurrentPlan);
    if (getCurrentPlan === currentPlan) {
      toast.error("Select Your Plan!");
    } else {
      toast.success(`${getCurrentPlan} Plan Selected!`);
    }
  }
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  async function handlePlanSubmit(e) {
    e.preventDefault();
    try {
      setFormSubmitLoader(true);
      let data = {
        URL_Alies,
        currentPlan,
        PlanPrice,
      };
      await api
        .post("/currentplan", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
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

  async function FetchUserRegisterData() {
    try {
      await api
        .get(`/auth/register/${userName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageDatas.token}`,
          },
        })
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    api
      .get(`/currentplan/specificAll/${userName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data[0]);
        if (res.data.data[0].currentPlan == null) {
          setCurrentPlan(null);
        } else {
          setCurrentPlan(res.data.data[0].currentPlan);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    FetchUserRegisterData();
  }, [FormSubmitLoader]);

  function handleAccessDetails(data) {
    setCurrentAccessDetails(data);
    setCurrentAccessActive(true);
  }

  async function handlePayment(e) {
    e.preventDefault();
    //Get key value:
    const {
      data: { key },
    } = await api.get("/razorpay/getkey", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageDatas.token}`,
      },
    });

    const { data } = await api.post(
      "/razorpay/checkout",
      {
        amount,
        currency: "INR",
        receipt: "receipt#1",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      }
    );

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: `${userData.firstName}  ${userData.lastName}`,
      description: "Demo ",
      image: userData.profile,
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${api}/razorpay/paymentVerification`,
      prefill: {
        name: userData.firstName,
        email: userData.email,
        contact: userData.mobileNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#01324e",
      },
    };
    var razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <>
      <div className="plan_container">
        {/* {currentAccessDetails === 1 ? (
          <>
            {Free_Plans.map((data, index) => {
              return (
                <div className="plan_access_details" id={currentAccessActive ?'activeDetail':''}>
                      <div className="plan_close" onClick={()=>setCurrentAccessActive(false)}>
                  <i className='bx bx-message-x'></i>
                  </div>
                  <div className="plan_title">
                    <h6>{data.PlanName} Plan Access</h6>
                  </div>
                  
                  <div className="plan_addon_service">
                    <>
                      {data.Access.map((data, index) => {
                        return (
                          <div className="list" key={index}>
                            <div className="icon">{data.icon}</div>
                            <div className="text">
                              <p>{data.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )} */}
        {currentAccessDetails === 2 ? (
          <>
            {Basic_Plans.map((data, index) => {
              return (
                <div
                  className="plan_access_details"
                  id={currentAccessActive ? "activeDetail" : ""}
                >
                  <div
                    className="plan_close"
                    onClick={() => setCurrentAccessActive(false)}
                  >
                    <i className="bx bx-message-x"></i>
                  </div>
                  <div className="plan_title">
                    <h6>{data.PlanName} Plan Access</h6>
                  </div>
                  <div className="plan_addon_service">
                    <>
                      {data.Access.map((data, index) => {
                        return (
                          <div className="list" key={index}>
                            <div className="icon">{data.icon}</div>
                            <div className="text">
                              <p>{data.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
        {currentAccessDetails === 3 ? (
          <>
            {Standard_Plans.map((data, index) => {
              return (
                <div
                  className="plan_access_details"
                  id={currentAccessActive ? "activeDetail" : ""}
                >
                  <div
                    className="plan_close"
                    onClick={() => setCurrentAccessActive(false)}
                  >
                    <i className="bx bx-message-x"></i>
                  </div>
                  <div className="plan_title">
                    <h6>{data.PlanName} Plan Access</h6>
                  </div>
                  <div className="plan_addon_service">
                    <>
                      {data.Access.map((data, index) => {
                        return (
                          <div className="list" key={index}>
                            <div className="icon">{data.icon}</div>
                            <div className="text">
                              <p>{data.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
        {currentAccessDetails === 4 ? (
          <>
            {EnterPrice_Plans.map((data, index) => {
              return (
                <div
                  className="plan_access_details"
                  id={currentAccessActive ? "activeDetail" : ""}
                >
                  <div
                    className="plan_close"
                    onClick={() => setCurrentAccessActive(false)}
                  >
                    <i className="bx bx-message-x"></i>
                  </div>
                  <div className="plan_title">
                    <h6>{data.PlanName} Plan Access</h6>
                  </div>
                  <div className="plan_addon_service">
                    <>
                      {data.Access.map((data, index) => {
                        return (
                          <div className="list" key={index}>
                            <div className="icon">{data.icon}</div>
                            <div className="text">
                              <p>{data.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
        <Toaster position="top-right" />
        <div id={currentAccessActive ? "listView" : "listUnview"}>
          <div className="plan_title">
            <h5>
              {currentPlan != null
                ? "Plan Subscribed!"
                : "Choose Your Subscription"}
            </h5>
            {currentPlan != null ? (
              <div className="actions">
                <button
                  onClick={handlePayment}
                  type="submit"
                  {...(currentPlan === null ? disabled : "")}
                >
                 <i className='bx bxs-bank'></i> Pay Now
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="note">
            <small>
              <b>Note : </b> Select your subscription plan to get more feature{" "}
              <b>VCard Templates</b> and increase your site active duration
              etc..
            </small>
          </div>
          <div className="all_plans_container_box">
            {/* plan1 */}
            {/* {Free_Plans.map((data, index) => {
            return (
              <div
                key={index}
                className="plan"
       
                id={currentPlan === data.PlanName ? "active" : ""}
              >
                <div
                  className="access_details_icons"
                  title="details"
                  onClick={() => handleAccessDetails(data.id)}
                >
              <i className='bx bx-list-ul'></i>
                </div>
                <div className="batches">
                  <img src={data.batches} alt="batch" />
                </div>
                <div className="plan_title">
                  <h3>{data.PlanName}</h3>
                </div>
                <div className="plan_price">
                  <h2>
                    ₹ {data.PlanPrice} <small>/{data.Duration}</small>
                  </h2>
                </div>
                <div className="card_count">
                  <p>
                    No of VCards : <span>{data.VCardCount}</span>
                  </p>
                </div>

                <div className="plan_action">
                  <div
                    onClick={() => {
                      setCurrentPlan(data.PlanName);
                      handle_Plan_Selection(data.PlanName),
                      setPlanPrice(data.PlanPrice);
                    }}
                    className="action_div"
                    id={currentPlan === data.PlanName ? "activePlan" : ""}
                  >
                    <button onClick={navigate('/payment')}>
                      {currentPlan === data.PlanName
                        ? "Selected"
                        : "Choose Plan"}
                    </button>
                  </div>
                </div>
       
              </div>
            );
          })} */}
            {Basic_Plans.map((data, index) => {
              return (
                <div
                  key={index}
                  className="plan"
                  id={currentPlan === data.PlanName ? "active" : ""}
                  // onClick={() => {
                  //   handle_Plan_Selection(data.PlanName),
                  //     setPlanPrice(data.PlanPrice);
                  // }}
                >
                  <div
                    className="access_details_icons"
                    title="details"
                    onClick={() => handleAccessDetails(data.id)}
                  >
                    <i className="bx bx-list-ul"></i>
                  </div>
                  <div className="batches">
                    <img src={data.batches} alt="batch" />
                  </div>
                  <div className="plan_title">
                    <h3>{data.PlanName}</h3>
                  </div>
                  <div className="plan_price">
                    <h2>
                      ₹ {data.PlanPrice} <small>/{data.Duration}</small>
                    </h2>
                  </div>
                  <div className="card_count">
                    <p>
                      No of VCard Design's : <span>{data.VCardCount}</span>
                    </p>
                  </div>

                  <div className="plan_action">
                    <div
                      onClick={() => {
                        setCurrentPlan(data.PlanName);
                        handle_Plan_Selection(data.PlanName),
                          setPlanPrice(data.PlanPrice);
                      }}
                      className="action_div"
                      id={currentPlan === data.PlanName ? "activePlan" : ""}
                    >
                      <button onClick={() => setAmount(Number(data.PlanPrice))}>
                        {currentPlan === data.PlanName
                          ? "Plan Selected"
                          : "Choose Plan"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {Standard_Plans.map((data, index) => {
              return (
                <div
                  key={index}
                  className="plan"
                  // onClick={() => {
                  //   handle_Plan_Selection(data.PlanName),
                  //     setPlanPrice(data.PlanPrice);
                  // }}
                  id={currentPlan === data.PlanName ? "active" : ""}
                >
                  <div
                    className="access_details_icons"
                    title="details"
                    onClick={() => handleAccessDetails(data.id)}
                  >
                    <i className="bx bx-list-ul"></i>
                  </div>
                  <div className="batches">
                    <img src={data.batches} alt="batch" />
                  </div>
                  <div className="plan_title">
                    <h3>{data.PlanName}</h3>
                  </div>
                  <div className="plan_price">
                    <h2>
                      ₹ {data.PlanPrice} <small>/{data.Duration}</small>
                    </h2>
                  </div>
                  <div className="card_count">
                    <p>
                      No of VCard Design's : <span>{data.VCardCount}</span>
                    </p>
                  </div>

                  <div className="plan_action">
                    <div
                      onClick={() => {
                        setCurrentPlan(data.PlanName);
                        handle_Plan_Selection(data.PlanName),
                          setPlanPrice(data.PlanPrice);
                      }}
                      className="action_div"
                      id={currentPlan === data.PlanName ? "activePlan" : ""}
                    >
                      <button onClick={() => setAmount(Number(data.PlanPrice))}>
                        {currentPlan === data.PlanName
                          ? "Plan Selected"
                          : "Choose Plan"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {EnterPrice_Plans.map((data, index) => {
              return (
                <div
                  key={index}
                  className="plan"
                  // onClick={() => {
                  //   handle_Plan_Selection(data.PlanName),
                  //     setPlanPrice(data.PlanPrice);
                  // }}
                  id={currentPlan === data.PlanName ? "active" : ""}
                >
                  <div
                    className="access_details_icons"
                    title="details"
                    onClick={() => handleAccessDetails(data.id)}
                  >
                    <i className="bx bx-list-ul"></i>
                  </div>
                  <div className="batches">
                    {/* <img src={data.batches} alt="batch" /> */}
                    <i className="bx bxs-purchase-tag bx-tada"></i>
                  </div>
                  <div className="plan_title">
                    <h3>{data.PlanName}</h3>
                  </div>
                  <div className="plan_price">
                    <h2>
                      ₹ {data.PlanPrice} <small>/{data.Duration}</small>
                    </h2>
                  </div>
                  <div className="card_count">
                    <p>
                      No of VCard Design's : <span>{data.VCardCount}</span>
                    </p>
                  </div>

                  <div className="plan_action">
                    <div
                      onClick={() => {
                        setCurrentPlan(data.PlanName);
                        handle_Plan_Selection(data.PlanName),
                          setPlanPrice(data.PlanPrice);
                      }}
                      className="action_div"
                      id={currentPlan === data.PlanName ? "activePlan" : ""}
                    >
                      <button onClick={() => setAmount(Number(data.PlanPrice))}>
                        {currentPlan === data.PlanName
                          ? "Plan Selected"
                          : "Choose Plan"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
