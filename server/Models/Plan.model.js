import mongoose from "mongoose";

let currentPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
      unique: true,
    },
    currentPlan: {
      type: String,
      required: true,
    },
    PlanPrice: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Expiry Date Field
    expireAt: {
      type: Date,
      required: true,
      index: { expires: "0s" }, // TTL index to automatically remove the document at the specified date
    },
  }
);

let currentPlan = mongoose.model("currentPlan", currentPlanSchema);

export default currentPlan;
