// Parameterized job search.
MATCH (j:Job)-[:POSTED_BY]->(c:Company)
MATCH (j)-[:LOCATED_IN]->(l:Location)
OPTIONAL MATCH (j)-[:REQUIRES]->(s:Skill)
WHERE ($search = "" OR toLower(j.title) CONTAINS toLower($search)
   OR toLower(c.name) CONTAINS toLower($search)
   OR toLower(j.category) CONTAINS toLower($search))
  AND ($location = "" OR l.name = $location)
RETURN j, c.name AS company, l.name AS location, collect(DISTINCT s.name) AS skills
ORDER BY j.id DESC
SKIP $offset LIMIT $limit;

// Find related jobs through shared skills.
MATCH (j:Job {id: $jobId})-[:REQUIRES]->(s:Skill)<-[:REQUIRES]-(related:Job)
WHERE related.id <> j.id
RETURN related.id AS id, related.title AS title,
       collect(DISTINCT s.name) AS sharedSkills,
       count(DISTINCT s) AS sharedSkillCount
ORDER BY sharedSkillCount DESC;
