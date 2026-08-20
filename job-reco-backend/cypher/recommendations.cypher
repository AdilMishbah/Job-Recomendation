// Multi-hop: User -> Skill -> Job -> Company -> Location
MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(j:Job)
MATCH (j)-[:POSTED_BY]->(c:Company)-[:LOCATED_IN]->(l:Location)
WITH j, c, l, collect(DISTINCT s.name) AS matchedSkills
OPTIONAL MATCH (j)-[:REQUIRES]->(allSkills:Skill)
WITH j, c, l, matchedSkills, count(DISTINCT allSkills) AS totalSkills
RETURN j.title AS job, c.name AS company, l.name AS location,
       matchedSkills, totalSkills,
       CASE WHEN totalSkills = 0 THEN 0
            ELSE round((toFloat(size(matchedSkills)) / totalSkills) * 100) END AS matchPercent
ORDER BY matchPercent DESC;

// Graph-specific recommendation with preferred locations.
MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(j:Job)
MATCH (j)-[:POSTED_BY]->(c:Company)-[:LOCATED_IN]->(l:Location)
WHERE l.name IN $preferredLocations
RETURN j.title AS job, c.name AS company, l.name AS location,
       collect(DISTINCT s.name) AS matchedSkills,
       count(DISTINCT s) AS matchedSkillCount
ORDER BY matchedSkillCount DESC;
