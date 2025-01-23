// models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
    currentPlan: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "successfull", "failed"],
      default: "created",
    },
    // Expiry date field
    expireAt: {
      type: Date,
      default: () => {
        const now = new Date();
        return new Date(now.setFullYear(now.getFullYear() + 1)); // Adds 1 year to the current date
      },
    },
  },
  { timestamps: true }
);

let PaymentModel = mongoose.model("Payment", PaymentSchema);

export default PaymentModel;
