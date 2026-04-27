import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    purpose: { type: String, required: true },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "checked-in", "checked-out"],
      default: "pending",
    },
    checkInTime: { type: Date },
    checkOutTime: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("Visitor", visitorSchema);
