import QRCode from "qrcode"; // 1. Import it at the top
import Visitor from "../models/User.js";

export const registerVisitor = async (req, res) => {
  try {
    const { name, email, purpose, hostId } = req.body;

    // 2. Create the visitor first
    const newVisitor = new Visitor({
      name,
      email,
      purpose,
      host: hostId,
    });

    // GENERATE THE QR CODE HERE
    // We take the newVisitor._id and turn it into a "DataURL"
    const qrCodeImage = await QRCode.toDataURL(newVisitor._id.toString());

    // 4. Save that image string into the visitor's record
    newVisitor.qrCode = qrCodeImage;

    await newVisitor.save();

    res.json({
      message: "Visitor Registered! ✅",
      visitor: newVisitor, // This now contains the QR code string
    });
  } catch (error) {
    res.json({ message: "Error", error: error.message });
  }
};
