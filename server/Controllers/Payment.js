import express from 'express'
const router = express.Router();
import axios from 'axios';
import { encrypt } from '../CCAvenue/ccavenueHelper.js';
import dotenv from 'dotenv';
dotenv.config();

const { MERCHANT_ID, ACCESS_CODE, WORKING_KEY, REDIRECT_URL, CANCEL_URL } = process.env;

router.post('/initiate-payment', (req, res) => {
  const { orderId, amount, customerId, customerEmail, customerPhone } = req.body;

  const data = {
    merchant_id: MERCHANT_ID,
    order_id: orderId,
    currency: 'INR',
    amount,
    redirect_url: REDIRECT_URL,
    cancel_url: CANCEL_URL,
    language: 'EN',
    billing_name: customerId,
    billing_address: 'Some Address',
    billing_city: 'Some City',
    billing_state: 'Some State',
    billing_zip: '123456',
    billing_country: 'India',
    billing_tel: customerPhone,
    billing_email: customerEmail,
  };

  const encryptedData = encrypt(new URLSearchParams(data).toString(), WORKING_KEY);

  res.json({
    encRequest: encryptedData,
    accessCode: ACCESS_CODE,
  });
});

router.post('/payment-response', (req, res) => {
  const { encResp } = req.body;
  const decryptedData = decrypt(encResp, WORKING_KEY);
  const responseParams = new URLSearchParams(decryptedData);

  // Process the response here

  res.json({
    success: true,
    data: Object.fromEntries(responseParams),
  });
});

export default router;
