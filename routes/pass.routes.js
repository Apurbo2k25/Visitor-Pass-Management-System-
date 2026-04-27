import express from "express";
import { scanPass } from "../controllers/pass.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Only Security staff can scan and verify passes
router.post("/scan", protect, authorize("security", "admin"), scanPass);

export default router;
