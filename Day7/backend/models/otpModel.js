const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    otp: { type: String, required: true },
    used: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", otpSchema);
console.log("Model created");
module.exports = OTP;
