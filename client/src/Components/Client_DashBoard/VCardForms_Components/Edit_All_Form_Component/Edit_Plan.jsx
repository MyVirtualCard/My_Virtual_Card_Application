import React, { useState, useEffect, useContext } from "react";
import "./Edit_form_styles/Edit_Plan.scss";
import { Link } from "react-router-dom";
import standard from "../../../../assets/animations/standard.gif";
import basic from "../../../../assets/animations/basic.gif";
import enterprice from "../../../../assets/animations/enterprice.gif";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import hand from "../../../../assets/Brand_Logo/hand.png";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
import paynowAnimation from "../../../../assets/Lotte_Animation/payment.json";
import Lottie from "react-lottie";
let Free_Plans = [
  {
    id: 1,
    PlanName: "Free",
    batches:
      "https://img.icons8.com/external-bearicons-flat-bearicons/64/external-Free-Trial-miscellany-texts-and-badges-bearicons-flat-bearicons.png",
    Duration: "30-Days",
    PlanPrice: 0,
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
    VCardCount: "",
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
    VCardCount: "06",
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
    PlanName: "EnterPrice",
    batches: basic,
    Duration: "Yearly",
    PlanPrice: 1499,
    VCardCount: "",
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
      // {
      //   id: 19,
      //   icon: <i className="bx bxs-check-shield"></i>,
      //   text: "Custom Domain (@ Rs.999 - optional)",
      // },
      {
        id: 19,
        icon: <i className="bx bxs-check-shield"></i>,
        text: "Custom Vcard Design's",
      },
    ],
  },
];
const Edit_Plan = () => {
  let navigate = useNavigate();
  let { URL_Alies } = useParams();
  let {
    Token,
    PaymentSuccessPopup,
    setPaymentSuccessPopup,
    currentPlan,
    setCurrentPlan,
    PlanPrice,
    setPlanPrice,
    FormSubmitLoader,
    setFormSubmitLoader,
    UserName,
    UserData,
    status,
    setStatus,
    ActivePlan,
    setActivePlan,
    ShowForm,
    setShowForm,
  } = useContext(AppContext);

  let [currentAccessDetails, setCurrentAccessDetails] = useState();
  let [currentAccessActive, setCurrentAccessActive] = useState(false);
  let [paymentPopup, setPaymentPopup] = useState(false);

  const [amount, setAmount] = useState("");
  let [Seconds, setSeconds] = useState("300");
  const [key, setKey] = useState(0);

  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };
  function handle_Plan_Selection(getCurrentPlan) {
    setCurrentPlan(getCurrentPlan === currentPlan ? null : getCurrentPlan);
    if (getCurrentPlan == currentPlan) {
      // toast.error("Select Your Plan!");
    } else {
      // toast.success(`${getCurrentPlan} Plan Selected!`);
    }
  }
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
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
        .post("/freeplan", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          reloadComponent();
          navigate(`/${UserName}/uadmin/VCards`);
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
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded");
    };
    document.body.appendChild(script);
  }, []);

  const createOrder = async (amount, token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const orderData = await api.post(
      "/razorpay/create-order",
      {
        amount: amount,
        currency: "INR",
        receipt: "receipt#1",
      },
      config
    );

    return orderData.data;
  };

  //Razor Payment
  const handlePayment = async (amount, token) => {
    setPaymentPopup(false);
    const order = await createOrder(amount, token);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: order.amount,
      currency: order.currency,
      name: `${UserData.FullName}`,
      description: "Test Transaction",
      image: UserData.Profile,
      order_id: order.id,
      handler: async function (response) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        await api.post(
          "/razorpay/verify-payment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            currentPlan: currentPlan,
          },
          config
        );

        reloadComponent();
        setTimeout(() => {
          reloadComponent();

          navigate(`/${UserName}/uadmin/vcard_form_edit/${URL_Alies}`);
        }, 500);
        setPaymentSuccessPopup(true);

        setCurrentPlan(null);
      },
      prefill: {
        name: "Test User",
        email: "test.user@example.com",
        contact: "9999999999",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    api
      .get(`/razorpay/specificUser/${UserName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          setActivePlan(res.data.data);
          if (status != "created") {
            setShowForm("VCard Templates");
          } else {
            setShowForm("Choose Your Plan");
          }

          setStatus(res.data?.data[0]?.status);
          setCurrentPlan(res.data?.data[0]?.currentPlan);
        } else {
          setShowForm("Choose Your Plan");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //Free Plan
  useEffect(() => {
    api
      .get(`/freeplan/${URL_Alies}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          setShowForm("VCard Templates");
          setCurrentPlan(res.data.data[0]?.currentPlan);
          setStatus(res.data.data[0]?.currentPlan);
        } else {
          setShowForm("Choose Your Plan");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [key]);
  useEffect(() => {
    if (Seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds((pre) => pre - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [Seconds]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(Seconds / 60);
    const secs = Seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  function handleAccessDetails(data) {
    setCurrentAccessDetails(data);
    setCurrentAccessActive(true);
  }
  const PayNowAnimeOption = {
    loop: true,
    autoplay: true,
    animationData: paynowAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="plan_container">
        {status === "created" ? (
          <div className="repayment_timer_container">
            <div className="timer">
              <div className="note">
                <p>
                  <strong>Note :</strong>&nbsp; If Your Payment created but not
                  deduct any amount from your account retry payment after 5 min
                </p>
              </div>
              <h4>
                {formatTime(Seconds)}{" "}
                <small>-Seconds more to retry payment!</small>
              </h4>
            </div>
          </div>
        ) : (
          ""
        )}

        {currentAccessDetails === 1 ? (
          <>
            {Free_Plans.map((data, index) => {
              return (
                <div
                  className="plan_access_details"
                  id={currentAccessActive ? "activeDetail" : ""}
                  key={index}
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
        {currentAccessDetails === 2 ? (
          <>
            {Basic_Plans.map((data, index) => {
              return (
                <div
                  className="plan_access_details"
                  id={currentAccessActive ? "activeDetail" : ""}
                  key={index}
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
                  key={index}
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
                  key={index}
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

        {/* <Toaster position="top-right" /> */}
        <div id={currentAccessActive ? "listView" : "listUnview"}>
          <div className="plan_heading">
            <h5>
              {currentPlan != null
                ? `${currentPlan} Plan Subscribed!`
                : "Choose Your Subscription"}
            </h5>
          </div>
          <div className="note">
            <small>
              <b>Note : </b> Select your subscription plan to get more feature{" "}
              <b>VCard Templates</b> and increase your site active duration
              etc..
            </small>
          </div>

          <div className="all_plans_container_box">
            {/* payment popup */}
            {paymentPopup ? (
              <>
                <div className="activate_plan_container">
                  <div className="razorpay_popup">
                    <div className="left">
                      <div className="left_image">
                        <Lottie
                          options={PayNowAnimeOption}
                          height={"90%"}
                          width={"90%"}
                          className="lottie"
                        />
                      </div>
                    </div>
                    <div className="right">
                      <div className="user_details">
                        <h2>Hi, {UserName}</h2>
                        <img src={hand} alt="hand" />
                      </div>
                      <div className="note">
                        Your plan will be selected..U need to pay after this
                        plan will be activate ...
                      </div>
                      <div className="amount_details">
                        <div className="title">
                          <h4>Your Plan Price : </h4>
                        </div>
                        <div className="amount">
                          <p>
                            {currentPlan} Plan :<small>₹</small>
                            {amount}
                          </p>
                        </div>
                      </div>
                      <div className="actions">
                        <div className="pay">
                          <button onClick={() => handlePayment(amount, Token)}>
                            Pay Now
                          </button>
                          <i className="bx bxs-bank"></i>
                        </div>
                        <div className="cancel">
                          <button
                            onClick={() => {
                              setPaymentPopup(false), setCurrentPlan(null);
                            }}
                          >
                            Cancel
                          </button>
                          <i className="bx bx-exit"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
  {Free_Plans.map((data, index) => {
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
                      Static VCard Design's <span>{data.VCardCount}</span>
                    </p>
                  </div>
                  <div className="card_useCase">
                    <strong>UseCase</strong>
                    <p>
                      U should select only static Vcard Design's quickly and U
                      can't change your vcard Color combination default vcard
                      design's only u can access...
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
                      <button
                        // onClick={() => {
                        //   setAmount(Number(data.PlanPrice)),
                        //     setPaymentPopup(true);
                        // }}
                        onClick={handlePlanSubmit}
                        id={status == "created" ? "disable" : ""}
                      >
                        {currentPlan === data.PlanName
                          ? "Plan Selected"
                          : "Choose Plan"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
                      Static VCard Design's <span>{data.VCardCount}</span>
                    </p>
                  </div>
                  <div className="card_useCase">
                    <strong>UseCase</strong>
                    <p>
                      U should select only static Vcard Design's quickly and U
                      can't change your vcard Color combination default vcard
                      design's only u can access...
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
                      <button
                        onClick={() => {
                          setAmount(Number(data.PlanPrice)),
                            setPaymentPopup(true);
                        }}
                        id={status == "created" ? "disable" : ""}
                      >
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
                      Dynamic VCard Design's <span>{data.VCardCount}</span>
                    </p>
                  </div>
                  <div className="card_useCase">
                    <strong>UseCase</strong>
                    <p>
                      U can create your own design quickly and change your vcard
                      Color combination at anytime and lot of feautures are
                      included...
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
                      <button
                        onClick={() => {
                          setAmount(Number(data.PlanPrice)),
                            setPaymentPopup(true);
                        }}
                        id={status == "created" ? "disable" : ""}
                      >
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

export default Edit_Plan;
