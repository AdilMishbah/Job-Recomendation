import { Router } from "express";
import { execute } from "../db.js";
import { asyncHandler } from "../middleware/errors.js";
import { recordToObject } from "../utils/serialize.js";

const router = Router();

router.get("/:id", asyncHandler(async (req, res) => {
  const result = await execute(`
    MATCH (u:User {id: $userId})
    OPTIONAL MATCH (u)-[:HAS_SKILL]->(s:Skill)
    RETURN u.id AS id, u.name AS name, u.email AS email, collect(DISTINCT s.name) AS skills
  `, { userId: req.params.id });
  if (!result.records.length) return res.status(404).json({ success: false, error: "User not found" });
  res.json({ success: true, data: recordToObject(result.records[0]) });
}));

router.get("/:id/saved", asyncHandler(async (req, res) => {
  const result = await execute(`
    MATCH (u:User {id: $userId})-[:SAVED]->(j:Job)-[:POSTED_BY]->(c:Company)
    MATCH (j)-[:LOCATED_IN]->(l:Location)
    RETURN j.id AS id, j.title AS title, j.salary AS salary, j.type AS type,
           j.level AS level, j.category AS category, j.logo AS logo,
           j.workplaceType AS workplaceType, c.name AS company, l.name AS location
    ORDER BY j.id DESC
  `, { userId: req.params.id });
  res.json({ success: true, data: result.records.map(recordToObject) });
}));

router.post("/:id/skills", asyncHandler(async (req, res) => {
  const skills = Array.isArray(req.body?.skills) ? req.body.skills : [];
  if (!skills.length) return res.status(400).json({ success: false, error: "skills must be a non-empty array" });
  const result = await execute(`
    MATCH (u:User {id: $userId})
    UNWIND $skills AS skillName
    MERGE (s:Skill {name: trim(skillName)})
    MERGE (u)-[:HAS_SKILL]->(s)
    RETURN u.id AS userId, collect(DISTINCT s.name) AS skills
  `, { userId: req.params.id, skills });
  res.json({ success: true, data: recordToObject(result.records[0]) });
}));

router.post("/:id/saved/:jobId", asyncHandler(async (req, res) => {
  const result = await execute(`
    MATCH (u:User {id: $userId}), (j:Job {id: $jobId})
    MERGE (u)-[:SAVED]->(j)
    RETURN u.id AS userId, j.id AS jobId, true AS saved
  `, { userId: req.params.id, jobId: Number(req.params.jobId) });
  if (!result.records.length) return res.status(404).json({ success: false, error: "User or job not found" });
  res.status(201).json({ success: true, data: recordToObject(result.records[0]) });
}));

router.delete("/:id/saved/:jobId", asyncHandler(async (req, res) => {
  await execute(`
    MATCH (u:User {id: $userId})-[r:SAVED]->(j:Job {id: $jobId})
    DELETE r
  `, { userId: req.params.id, jobId: Number(req.params.jobId) });
  res.json({ success: true, data: { userId: req.params.id, jobId: Number(req.params.jobId), saved: false } });
}));

router.post("/:id/apply/:jobId", asyncHandler(async (req, res) => {
  const result = await execute(`
    MATCH (u:User {id: $userId}), (j:Job {id: $jobId})
    MERGE (u)-[:APPLIED_TO]->(j)
    RETURN u.id AS userId, j.id AS jobId, true AS applied
  `, { userId: req.params.id, jobId: Number(req.params.jobId) });
  if (!result.records.length) return res.status(404).json({ success: false, error: "User or job not found" });
  res.status(201).json({ success: true, data: recordToObject(result.records[0]) });
}));

export default router;
