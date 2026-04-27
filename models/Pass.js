import mongoose from "mongoose";

const passSchema = new mongoose.Schema(
  {
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "used", "expired"],
      default: "active",
    },
    checkInTime: { type: Date },
    checkOutTime: { type: Date },
    gateEntry: { type: String }, // e.g., "Main Gate"
  },
  { timestamps: true },
);

export default mongoose.model("Pass", passSchema);
