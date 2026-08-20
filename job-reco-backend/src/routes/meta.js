import { Router } from "express";
import { execute } from "../db.js";
import { asyncHandler } from "../middleware/errors.js";
import { recordToObject } from "../utils/serialize.js";

const router = Router();

router.get("/companies", asyncHandler(async (req, res) => {
  const result = await execute(`MATCH (c:Company) RETURN c.name AS name ORDER BY name`);
  res.json({ success: true, data: result.records.map(recordToObject) });
}));
router.get("/skills", asyncHandler(async (req, res) => {
  const result = await execute(`MATCH (s:Skill) RETURN s.name AS name ORDER BY name`);
  res.json({ success: true, data: result.records.map(recordToObject) });
}));
router.get("/locations", asyncHandler(async (req, res) => {
  const result = await execute(`MATCH (l:Location) RETURN l.name AS name ORDER BY name`);
  res.json({ success: true, data: result.records.map(recordToObject) });
}));
router.get("/categories", asyncHandler(async (req, res) => {
  const result = await execute(`MATCH (c:Category) RETURN c.name AS name ORDER BY name`);
  res.json({ success: true, data: result.records.map(recordToObject) });
}));

export default router;
