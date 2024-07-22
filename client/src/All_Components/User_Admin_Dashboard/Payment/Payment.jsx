// components/PaymentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Payment= () => {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [billingInfo, setBillingInfo] = useState({
    billing_name: '',
    billing_address: '',
    billing_city: '',
    billing_state: '',
    billing_zip: '',
    billing_country: '',
    billing_tel: '',
    billing_email: '',
  });
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  let localStorageDatas = JSON.parse(localStorage.getItem("datas"));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/ccavanue/initiate-payment', {
        orderId,
        amount,
        currency: 'INR',
        redirectUrl: 'https://myvirtualcard.in/ccavanue/initiate-payment',
        cancelUrl: 'https://myvirtualcard.in/ccavanue/cancel',
        billingInfo,
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageDatas.token}`,
        },
      });

      const { encRequest, access_code } = response.data;

      // Create form dynamically and submit to CCAvenue
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

      const encRequestInput = document.createElement('input');
      encRequestInput.type = 'hidden';
      encRequestInput.name = 'encRequest';
      encRequestInput.value = encRequest;
      form.appendChild(encRequestInput);

      const accessCodeInput = document.createElement('input');
      accessCodeInput.type = 'hidden';
      accessCodeInput.name = 'access_code';
      accessCodeInput.value = access_code;
      form.appendChild(accessCodeInput);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment initiation error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Order ID" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      {/* Add other billing fields here */}
      <button type="submit">Pay Now</button>
    </form>
  );
};

// export default Payment;
