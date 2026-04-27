import express from "express";
import {
  registerVisitor,
  updateStatus,
} from "../controllers/visitor.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route to create a pass (Accessible by logged-in users)
router.post("/register", protect, registerVisitor);

// Route to Approve/Reject (Accessible by Hosts or Admins)
router.patch("/status/:id", protect, updateStatus);

export default router;
