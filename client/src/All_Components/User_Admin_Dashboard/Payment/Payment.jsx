import React, { useState } from "react";
import axios from "axios";
const Payment = () => {
  const [amount, setAmount] = useState("");
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const handlePayment = async (e) => {
    e.preventDefault();
    let data = {
      amount,
    };
    await axios.post(`${api}/api/ccavenue/initiate-payment`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        }
      }).then((res) => {
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
        }
      }).catch((error)=>{
        console.log(error)
      })
    };
    return (
      <form onSubmit={handlePayment}>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    );
  };

export default Payment;
