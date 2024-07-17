import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentResponse = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  useEffect(() => {
    const encResp = params.get('encResp');

    const handlePaymentResponse = async () => {
      const response = await api.post('/api/payment-response', { encResp });
      console.log(response.data);
    };

    if (encResp) {
      handlePaymentResponse();
    }
  }, [params]);

  return <div>Processing Payment...</div>;
};

export default PaymentResponse;
