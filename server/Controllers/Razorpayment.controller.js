import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../Models/Payment.model.js";
export const Checkout = async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: Number(amount), // amount in the smallest currency unit
      currency: "INR",
      // receipt: receipt,
      // payment_capture: 1 // auto capture
    };
    const response = await instance.orders.create(options);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const PaymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `${process.env.CLIENT_DOMAIN_URL}/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
