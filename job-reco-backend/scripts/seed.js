import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import neo4j from "neo4j-driver";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jobs = JSON.parse(await fs.readFile(path.join(__dirname, "jobs.seed.json"), "utf8"));

if (!process.env.COGNODB_URI || !process.env.COGNODB_USER || !process.env.COGNODB_PASSWORD) {
  throw new Error("Set COGNODB_URI, COGNODB_USER and COGNODB_PASSWORD in .env first.");
}

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(process.env.COGNODB_USER, process.env.COGNODB_PASSWORD)
);

const skillRules = [
  [/react/i, ["React", "JavaScript", "HTML", "CSS"]],
  [/javascript/i, ["JavaScript", "Node.js", "HTML", "CSS"]],
  [/backend/i, ["Node.js", "JavaScript", "REST APIs", "SQL"]],
  [/python/i, ["Python", "SQL", "Git", "REST APIs"]],
  [/data analyst|financial analyst|business analyst/i, ["SQL", "Python", "Excel", "Data Analysis"]],
  [/machine learning|ai research/i, ["Python", "Machine Learning", "SQL", "Data Analysis"]],
  [/devops|cloud engineer/i, ["AWS", "Docker", "Linux", "CI/CD"]],
  [/mobile app/i, ["JavaScript", "React Native", "REST APIs", "Git"]],
  [/designer|researcher/i, ["Figma", "UX Research", "UI Design", "Prototyping"]],
  [/marketing|seo|social media|content|copywriter|technical writer/i, ["SEO", "Content Strategy", "Analytics", "Communication"]],
  [/support|customer success/i, ["Customer Support", "Troubleshooting", "Communication", "IT Support"]],
  [/recruiter/i, ["Recruiting", "Communication", "Talent Acquisition", "HR"]],
  [/qa engineer/i, ["Testing", "Selenium", "JavaScript", "SQL"]],
  [/product manager/i, ["Product Management", "Agile", "Analytics", "Communication"]],
];

const skillsForJob = (job) => {
  const text = `${job.title} ${job.category}`;
  const matched = skillRules.find(([pattern]) => pattern.test(text));
  return matched ? matched[1] : ["Communication", "Problem Solving", "Git"];
};

const userSkills = {
  "demo-user": ["React", "JavaScript", "Node.js", "SQL", "Git", "REST APIs", "Python"],
};

const driverSession = driver.session({ database: process.env.COGNODB_DATABASE || undefined });

try {
  await driver.verifyConnectivity();
  console.log("Connected to CognoDB.");

  await driverSession.run(`
    CREATE CONSTRAINT job_id_unique IF NOT EXISTS FOR (j:Job) REQUIRE j.id IS UNIQUE
  `);
  await driverSession.run(`
    CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE
  `);
  await driverSession.run(`
    CREATE CONSTRAINT skill_name_unique IF NOT EXISTS FOR (s:Skill) REQUIRE s.name IS UNIQUE
  `);
  await driverSession.run(`
    CREATE CONSTRAINT company_name_unique IF NOT EXISTS FOR (c:Company) REQUIRE c.name IS UNIQUE
  `);
  await driverSession.run(`
    CREATE CONSTRAINT location_name_unique IF NOT EXISTS FOR (l:Location) REQUIRE l.name IS UNIQUE
  `);
  await driverSession.run(`
    CREATE CONSTRAINT category_name_unique IF NOT EXISTS FOR (c:Category) REQUIRE c.name IS UNIQUE
  `);

  await driverSession.run(`MATCH (n) DETACH DELETE n`);

  for (const job of jobs) {
    await driverSession.run(`
      MERGE (j:Job {id: $id})
      SET j.title = $title,
          j.salary = $salary,
          j.type = $type,
          j.level = $level,
          j.category = $category,
          j.logo = $logo,
          j.workplaceType = $workplaceType,
          j.description = $description
      MERGE (c:Company {name: $company})
      MERGE (l:Location {name: $location})
      MERGE (cat:Category {name: $category})
      MERGE (j)-[:POSTED_BY]->(c)
      MERGE (j)-[:LOCATED_IN]->(l)
      MERGE (j)-[:IN_CATEGORY]->(cat)
    `, {
      ...job,
      description: `${job.title} opportunity at ${job.company} in ${job.location}. This ${job.type.toLowerCase()} role is suitable for ${job.level.toLowerCase()} candidates.`,
    });

    for (const skill of skillsForJob(job)) {
      await driverSession.run(`
        MATCH (j:Job {id: $jobId})
        MERGE (s:Skill {name: $skill})
        MERGE (j)-[:REQUIRES]->(s)
      `, { jobId: job.id, skill });
    }
  }

  await driverSession.run(`
    MERGE (u:User {id: "demo-user"})
    SET u.name = "Demo Candidate", u.email = "demo@example.com"
  `);
  for (const skill of userSkills["demo-user"]) {
    await driverSession.run(`
      MATCH (u:User {id: "demo-user"})
      MERGE (s:Skill {name: $skill})
      MERGE (u)-[:HAS_SKILL]->(s)
    `, { skill });
  }

  console.log(`Seeded ${jobs.length} jobs, companies, locations, categories, skills and demo user.`);
} finally {
  await driverSession.close();
  await driver.close();
}
