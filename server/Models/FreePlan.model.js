import mongoose from "mongoose";

let FreePlanSchema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
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

let FreePlan = mongoose.model("Free Plan", FreePlanSchema);

export default FreePlan;
