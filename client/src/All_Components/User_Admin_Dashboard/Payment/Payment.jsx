import React, { useState } from "react";
import axios from "axios";
import "./Payment.scss";
const Payment = () => {
  const [order_id, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [encRequest, setEncRequest] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));

  const handlePayment = async (e) => {
    e.preventDefault();
    const response = await api.post(
      "/ccavenue/initiate",
      { order_id, amount },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      }
    );
    setEncRequest(response.data.encRequest);
    setAccessCode(response.data.access_code);
    document.getElementById("ccavenue_form").submit();
  };

  return (
    <div>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          value={order_id}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Order ID"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button type="submit">Pay Now</button>
      </form>

      {encRequest && accessCode && (
        <form
          id="ccavenue_form"
          method="post"
          action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
        >
          <input type="hidden" name="encRequest" value={encRequest} />
          <input type="hidden" name="access_code" value={accessCode} />
        </form>
      )}
    </div>
  );
};

export default Payment;
