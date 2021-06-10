import mongoose from "mongoose";

const HVACSchema = {
  Date: String,
  Time: String,
  Name: String,
  Temperature: Number,
  hasTriggeredAC: Boolean,
  hasTriggeredHeater: Boolean,
};

export const HVAC = mongoose.model("HVAC", HVACSchema);
