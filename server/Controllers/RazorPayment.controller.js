import { instance } from "../index.js";
import crypto from "crypto";
import PaymentModel from "../Models/Payment.model.js";
import dotenv from "dotenv";
import UserModel from "../Models/User.model.js";
dotenv.config();
import cron from "node-cron";

//Create Order:
export const CreateOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    let getSpecificData = await PaymentModel.find({
      UserName: req.user.UserName,
    });
    console.log(getSpecificData.length);
    if (getSpecificData.length > 0) {
      res.status(401).json({ message: `Plan Already Selected!` });
    } else {
      const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: currency,
        receipt: receipt,
      };

      const order = await instance.orders.create(options);

      // Store the order in MongoDB
      const newPayment = new PaymentModel({
        orderId: order.id,
        amount: order.amount / 100,
        currency: order.currency,
        receipt: order.receipt,
        UserName: req.user.UserName,
        status: "created",
      });
      await newPayment.save();
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//VerifyPayment:
export const VerifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    currentPlan,
    UserName,
  } = req.body;
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      const payment = await PaymentModel.findOne({
        orderId: razorpay_order_id,
      });
      payment.paymentId = razorpay_payment_id;
      payment.signature = razorpay_signature;
      payment.currentPlan = currentPlan;
      payment.status = "successfull";
      payment.expireAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 365 days from now

      let ExistUser = await UserModel.findOne({ UserName });
      ExistUser.Paid = true;
      ExistUser.Plan = currentPlan;
      await ExistUser.save();
      await payment.save();
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ message: "Error updating payment status" });
    }
  } else {
    res.json({ status: "failure" });
  }
};

//CheckPaymentData:
// //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await PaymentModel.find({
      UserName: req.user.UserName,
    });
    if (getSpecificData.status === "created") {
      // Runs every minute
      cron.schedule("* * * * *", async () => {
        const now = new Date();
        const threeMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        const result = await PaymentModel.deleteMany({
          status: "created",
          createdAt: { $lt: threeMinutesAgo },
        });

        // console.log(`Deleted ${result.deletedCount} unpaid orders`);
      });
    }
    res.status(201).json({
      message: " Data Fetched!",
      length: getSpecificData.length,
      data: getSpecificData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const readUserAllData = async (req, res) => {
  try {
    let getSpecificData = await PaymentModel.find({});
    if (getSpecificData[0].status === "created") {
      // Runs every minute
      cron.schedule("* * * * *", async () => {
        const now = new Date();
        const threeMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        const result = await PaymentModel.deleteMany({
          status: "created",
          createdAt: { $lt: threeMinutesAgo },
        });

        // console.log(`Deleted ${result.deletedCount} unpaid orders`);
      });
    }
    res.status(201).json({
      message: " Data Fetched!",
      length: getSpecificData.length,
      data: getSpecificData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
