import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    amount: '',
    customerId: '',
    customerEmail: '',
    customerPhone: '',
  });
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/ccavanue/api/initiate-payment', formData);
    const { encRequest, accessCode } = response.data;

    const form = document.createElement('form');
    form.action = 'https://secure.ccavenue.com/transaction/initTrans';
    form.method = 'POST';

    const input1 = document.createElement('input');
    input1.type = 'hidden';
    input1.name = 'encRequest';
    input1.value = encRequest;
    form.appendChild(input1);

    const input2 = document.createElement('input');
    input2.type = 'hidden';
    input2.name = 'access_code';
    input2.value = accessCode;
    form.appendChild(input2);

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="orderId" placeholder="Order ID" onChange={handleChange} />
      <input type="text" name="amount" placeholder="Amount" onChange={handleChange} />
      <input type="text" name="customerId" placeholder="Customer ID" onChange={handleChange} />
      <input type="email" name="customerEmail" placeholder="Customer Email" onChange={handleChange} />
      <input type="tel" name="customerPhone" placeholder="Customer Phone" onChange={handleChange} />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default Payment;

