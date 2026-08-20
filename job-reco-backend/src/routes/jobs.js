import { Router } from "express";
import { execute } from "../db.js";
import { asyncHandler } from "../middleware/errors.js";
import { recordToObject } from "../utils/serialize.js";

const router = Router();

const JOB_PROJECTION = `
  j { .id, .title, .salary, .type, .level, .category, .logo, .workplaceType, .description },
  c.name AS company,
  l.name AS location,
  collect(DISTINCT s.name) AS skills
`;

router.get("/", asyncHandler(async (req, res) => {
  const { search = "", type = "", level = "", location = "", category = "", limit = "50", offset = "0" } = req.query;
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 100);
  const safeOffset = Math.max(Number(offset) || 0, 0);
  const query = `
    MATCH (j:Job)-[:POSTED_BY]->(c:Company)
    MATCH (j)-[:LOCATED_IN]->(l:Location)
    OPTIONAL MATCH (j)-[:REQUIRES]->(s:Skill)
    WHERE ($search = "" OR toLower(j.title) CONTAINS toLower($search)
      OR toLower(c.name) CONTAINS toLower($search)
      OR toLower(j.category) CONTAINS toLower($search))
      AND ($type = "" OR j.type = $type)
      AND ($level = "" OR j.level = $level)
      AND ($location = "" OR l.name = $location)
      AND ($category = "" OR j.category = $category)
    RETURN ${JOB_PROJECTION}
    ORDER BY j.id DESC
    SKIP $offset LIMIT $limit
  `;
  const result = await execute(query, { search, type, level, location, category, limit: safeLimit, offset: safeOffset });
  res.json({ success: true, data: result.records.map(recordToObject), count: result.records.length });
}));

router.get("/:id", asyncHandler(async (req, res) => {
  const query = `
    MATCH (j:Job {id: $id})-[:POSTED_BY]->(c:Company)
    MATCH (j)-[:LOCATED_IN]->(l:Location)
    OPTIONAL MATCH (j)-[:REQUIRES]->(s:Skill)
    RETURN ${JOB_PROJECTION}
  `;
  const result = await execute(query, { id: Number(req.params.id) });
  if (!result.records.length) return res.status(404).json({ success: false, error: "Job not found" });
  res.json({ success: true, data: recordToObject(result.records[0]) });
}));

router.get("/:id/related", asyncHandler(async (req, res) => {
  const query = `
    MATCH (j:Job {id: $id})-[:REQUIRES]->(s:Skill)<-[:REQUIRES]-(related:Job)
    WHERE related.id <> j.id
    RETURN related.id AS id, related.title AS title, collect(DISTINCT s.name) AS sharedSkills,
           count(DISTINCT s) AS sharedSkillCount
    ORDER BY sharedSkillCount DESC, related.title
    LIMIT 10
  `;
  const result = await execute(query, { id: Number(req.params.id) });
  res.json({ success: true, data: result.records.map(recordToObject) });
}));

export default router;
