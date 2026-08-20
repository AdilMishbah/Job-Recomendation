import { Router } from "express";
import { asyncHandler } from "../middleware/errors.js";
import { verifyDatabase } from "../db.js";

const router = Router();

router.get("/", asyncHandler(async (req, res) => {
  await verifyDatabase();
  res.json({ success: true, status: "ok", database: "connected" });
}));

export default router;
