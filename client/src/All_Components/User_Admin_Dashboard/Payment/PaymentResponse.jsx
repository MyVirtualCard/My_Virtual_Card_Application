// components/PaymentResponse.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentResponse = () => {
  const location = useLocation();
  const [response, setResponse] = useState(null);
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const encResp = params.get('encResp');
        const response = await api.post('/ccavanue/payment-response', { encResp });
        setResponse(response.data);
      } catch (error) {
        console.error('Error processing payment response:', error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <div>
      {response ? (
        response.success ? (
          <div>Payment Successful: {JSON.stringify(response.data)}</div>
        ) : (
          <div>Payment Failed: {JSON.stringify(response.data)}</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PaymentResponse;
