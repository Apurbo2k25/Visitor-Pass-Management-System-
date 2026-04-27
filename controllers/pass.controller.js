import Pass from "../models/Pass.js";
import Visitor from "../models/Visitor.js";

export const scanPass = async (req, res) => {
  try {
    const { visitorId } = req.body;

    // Find the visitor and check if they are "Approved"
    const visitor = await Visitor.findById(visitorId);
    if (!visitor || visitor.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Invalid or Unapproved Pass! ❌" });
    }

    // Create a new Pass Log (Check-In)
    const newPass = new Pass({
      visitor: visitorId,
      checkInTime: new Date(),
      status: "used",
    });

    await newPass.save();

    visitor.status = "checked-in";
    await visitor.save();

    res.json({
      message: `Access Granted! Welcome ${visitor.name} ✅`,
      pass: newPass,
    });
  } catch (error) {
    res.status(500).json({ message: "Scanning Error", error: error.message });
  }
};
