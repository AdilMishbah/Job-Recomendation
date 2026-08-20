import { Router } from "express";
import { execute } from "../db.js";
import { asyncHandler } from "../middleware/errors.js";
import { recordToObject } from "../utils/serialize.js";

const router = Router();

router.get("/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const query = `
    MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(j:Job)
    MATCH (j)-[:POSTED_BY]->(c:Company)
    MATCH (j)-[:LOCATED_IN]->(l:Location)
    WITH u, j, c, l, collect(DISTINCT s.name) AS matchedSkills
    OPTIONAL MATCH (j)-[:REQUIRES]->(allSkills:Skill)
    WITH j, c, l, matchedSkills, count(DISTINCT allSkills) AS totalSkills
    RETURN j.id AS id, j.title AS title, j.salary AS salary, j.type AS type,
           j.level AS level, j.category AS category, j.logo AS logo,
           j.workplaceType AS workplaceType, c.name AS company, l.name AS location,
           matchedSkills, totalSkills,
           CASE WHEN totalSkills = 0 THEN 0
                ELSE round((toFloat(size(matchedSkills)) / totalSkills) * 100) END AS matchPercent
    ORDER BY matchPercent DESC, size(matchedSkills) DESC, j.id DESC
    LIMIT 10
  `;
  const result = await execute(query, { userId });
  res.json({ success: true, data: result.records.map(recordToObject) });
}));

router.get("/:userId/graph", asyncHandler(async (req, res) => {
  const query = `
    MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)
    OPTIONAL MATCH (s)<-[:REQUIRES]-(j:Job)-[:POSTED_BY]->(c:Company)
    RETURN u.id AS userId, collect(DISTINCT s.name) AS skills,
           collect(DISTINCT {jobId: j.id, job: j.title, company: c.name}) AS connectedJobs
  `;
  const result = await execute(query, { userId: req.params.userId });
  if (!result.records.length) return res.status(404).json({ success: false, error: "User not found" });
  res.json({ success: true, data: recordToObject(result.records[0]) });
}));

export default router;
