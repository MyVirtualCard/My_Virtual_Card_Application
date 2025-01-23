import React, { useContext, useState } from "react";
import "./ResellerDashboard.scss";
import hand from "../../assets/Brand_Logo/hand.png";
import Users from "./Pages/Users";
import { AppContext } from "../Context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import standard from "../../assets/animations/standard.gif";
import basic from "../../assets/animations/basic.gif";
import enterprice from "../../assets/animations/enterprice.gif";
import paynowAnimation from "../../assets/Lotte_Animation/payment.json";
import Lottie from "react-lottie";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const ResellerDashboard = () => {
  let navigate = useNavigate();
  let {
    PaymentSuccessPopup,
    setPaymentSuccessPopup,
    currentPlan,
    setCurrentPlan,
    PlanPrice,
    setPlanPrice,
    FormSubmitLoader,
    setFormSubmitLoader,
    status,
    ResellerData,
    setResellerData,
    ResellerUserName,
    setResellerUserName,
    setStatus,
    ActivePlan,
    setActivePlan,
    ShowForm,
    setShowForm,
  } = useContext(AppContext);
  let [PlanPopUpToggle, setPlanPopUpToggle] = useState(false);
  let [currentAccessDetails, setCurrentAccessDetails] = useState();
  let [currentAccessActive, setCurrentAccessActive] = useState(false);
  let [paymentPopup, setPaymentPopup] = useState(false);

  const [amount, setAmount] = useState("");
  let [Seconds, setSeconds] = useState("300");
  const [key, setKey] = useState(0);

  var reloadComponent = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger a remount
  };

  let SixMonth_Plan = [
    {
      id: 4,
      PlanName: "Basic",
      batches: basic,
      Duration: "6-Month",
      PlanPrice: 499,
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
  let OneYear_Plan = [
    {
      id: 4,
      PlanName: "EnterPrice",
      batches: basic,
      Duration: "Yearly",
      PlanPrice: 999,
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
  //Server Port
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
  //LogOut user
  let handleSignOut = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("Reseller_Data");
      localStorage.removeItem("Reseller_UserName");
      toast.success("LogOut successfully");

      setTimeout(() => {
        navigate("/");
        setResellerData(null);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  // Create Order
  const createOrder = async (amount) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ResellerData.token}`,
      },
    };

    const orderData = await api.post(
      "/razorpay/reseller/create-order",
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
  const handlePayment = async (amount) => {
    setPaymentPopup(false);
    const order = await createOrder(amount);
    console.log(order);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: order.amount,
      currency: order.currency,
      name: `${ResellerData.FullName}`,
      description: "Test Transaction",
      image: ResellerData.Profile,
      order_id: order.id,
      handler: async function (response) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ResellerData.token}`,
          },
        };

        await api.post(
          "/razorpay/reseller/verify-payment",
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

          navigate(`/${ResellerUserName}/re-seller/orders`);
        }, 500);

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

  return (
    <>
      <div className="reseller_container">
        <div className={`row ${PlanPopUpToggle ? "hide" : ""}`}>
          <div className="col_left_sidenav">
            <div className="title">
              <h2>Reseller Dashboard</h2>
            </div>
            <div className="user_datas">
              <img
                src="https://img.freepik.com/free-photo/3d-icon-travel-with-man_23-2151037420.jpg?ga=GA1.1.111147909.1717157513&semt=ais_hybrid"
                alt="user_image
                  "
              />
              <h2>Balakrishnan S</h2>
              <p>+91 8825457794</p>
            </div>
            <div className="menus">
              <ul>
                <NavLink>
                  <i className="bx bxs-dashboard"></i>
                  <p>Dashboard</p>
                </NavLink>
                <NavLink
                  to={`users`}
                  className={
                    window.location.pathname ===
                    `/${ResellerUserName}/re-seller/users`
                      ? "activeMenu"
                      : ""
                  }
                >
                  <i className="bx bxs-group"></i>
                  <p>All Users</p>
                </NavLink>
                {/* <NavLink>
                  <i className="bx bxs-user"></i>
                  <p>My Profile</p>
                </NavLink> */}
              </ul>
            </div>
            <div className="logout">
              <p onClick={handleSignOut}>
                {" "}
                <i className="bx bxs-log-out"></i>Logout
              </p>
            </div>
          </div>
          <div className="col_right_content">
            <div className="top_navbar">
              <div className="user_name">
                <h2>Balakrishnan</h2>
                <img src={hand} alt="hand" />
              </div>
              <div className="update_profile">
                <div className="notify">
                  <i className="bx bx-bell"></i>
                </div>

                <div className="setting">
                  <i className="bx bx-cog"></i>
                </div>
                <div className="revenu">
                <p>Total Revenue </p>
                <small>₹  0</small>
              </div>
              </div>
          
            </div>
            <div className="content">
              {window.location.pathname ===
              `/${ResellerUserName}/re-seller/users` ? (
                <Users />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* Plan popup */}
        {PlanPopUpToggle ? (
          <div className="payment_container">
            <div className="payment_popup">
              <div className="close" onClick={() => setPlanPopUpToggle(false)}>
                <i className="bx bx-x"></i>
              </div>
              <div className="user_details">
                <h2>Hello, Balakrishnan</h2>
                <img src={hand} alt="hand" />
              </div>
              <div className="note">
                Activate your plan first then u proceed to enroll new user to
                get rewards and bonus...
              </div>
              <div className="price_container">
                {SixMonth_Plan.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="plan"

                      // id={currentPlan === data.PlanName ? "active" : ""}
                    >
                      <div
                        className="access_details_icons"
                        title="details"
                        // onClick={() => handleAccessDetails(data.id)}
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
                          To get Membership in oru product with 6-month{" "}
                          <span>{data.VCardCount}</span>
                        </p>
                      </div>
                      <div className="card_useCase">
                        <strong>UseCase</strong>
                        <p>
                          U have to increase oru product sales and customers to
                          get your profitable amount based upon our product
                          demand high..
                        </p>
                      </div>

                      <div className="plan_action">
                        <div
                          // onClick={() => {
                          //   setCurrentPlan(data.PlanName);
                          //   handle_Plan_Selection(data.PlanName),
                          //     setPlanPrice(data.PlanPrice);
                          // }}
                          className="action_div"
                          // id={currentPlan === data.PlanName ? "activePlan" : ""}
                        >
                          <button
                            onClick={() => {
                              setAmount(Number(data.PlanPrice)),
                                setCurrentPlan(data.PlanName);
                              setPaymentPopup(true);
                              setPlanPopUpToggle(false);
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

                {OneYear_Plan.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="plan2"

                      // id={currentPlan === data.PlanName ? "active" : ""}
                    >
                      <div
                        className="access_details_icons"
                        title="details"
                        // onClick={() => handleAccessDetails(data.id)}
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
                          To get Membership in oru product with 1-Year{" "}
                          <span>{data.VCardCount}</span>
                        </p>
                      </div>
                      <div className="card_useCase">
                        <strong>UseCase</strong>
                        <p>
                          U have to increase oru product sales and customers to
                          get your profitable amount based upon our product
                          demand high...
                        </p>
                      </div>

                      <div className="plan_action">
                        <div
                          // onClick={() => {
                          //   setCurrentPlan(data.PlanName);
                          //   handle_Plan_Selection(data.PlanName),
                          //     setPlanPrice(data.PlanPrice);
                          // }}
                          className="action_div"
                          // id={currentPlan === data.PlanName ? "activePlan" : ""}
                        >
                          <button
                            onClick={() => {
                              setAmount(Number(data.PlanPrice)),
                                setCurrentPlan(data.PlanName);
                              setPaymentPopup(true);
                              setPlanPopUpToggle(false);
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
        ) : (
          ""
        )}
        {/* payment popup */}
        {paymentPopup ? (
          <>
            <div className="activate_plan_container">
              <div className="razorpay_popup">
                <div className="left">
                  <div className="left_image">
                    <Lottie
                      options={PayNowAnimeOption}
                      height={"100%"}
                      width={"100%"}
                      className="lottie"
                    />
                  </div>
                </div>
                <div className="right">
                  <div className="user_details">
                    <h2>Hi, Balakrishnan</h2>
                    <img src={hand} alt="hand" />
                  </div>
                  <div className="note">
                    Your plan will be selected..U need to pay after this plan
                    will be activate ...
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
                      <button onClick={() => handlePayment(amount)}>
                        Pay Now
                      </button>
                      <i className="bx bxs-bank"></i>
                    </div>
                    <div className="cancel">
                      <button onClick={() => setPaymentPopup(false)}>
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
      </div>
    </>
  );
};

export default ResellerDashboard;
