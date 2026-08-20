# Job Recommendation Backend

Express + official Neo4j JavaScript driver backend for the Wexa AI CognoDB take-home assignment. The application models users, jobs, skills, companies, locations and categories as a graph in CognoDB.

## Why a graph database?

Job recommendation is relationship-heavy: a candidate connects to skills, skills connect to jobs, jobs connect to companies and locations, and saved/applied jobs connect users back to jobs. CognoDB makes these multi-hop traversals explicit and natural. The recommendation endpoint uses `User -> Skill -> Job -> Company -> Location` relationships rather than a chain of relational joins.

## Graph model

```text
User -[:HAS_SKILL]-> Skill <-[:REQUIRES]- Job
User -[:SAVED]-> Job
User -[:APPLIED_TO]-> Job
Job -[:POSTED_BY]-> Company -[:LOCATED_IN]-> Location
Job -[:LOCATED_IN]-> Location
Job -[:IN_CATEGORY]-> Category
```

## API

- `GET /api/health`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `GET /api/jobs/:id/related`
- `GET /api/recommendations/:userId`
- `GET /api/recommendations/:userId/graph`
- `GET /api/users/:id`
- `GET /api/users/:id/saved`
- `POST /api/users/:id/skills` body `{ "skills": ["React", "Node.js"] }`
- `POST /api/users/:id/saved/:jobId`
- `DELETE /api/users/:id/saved/:jobId`
- `POST /api/users/:id/apply/:jobId`
- `GET /api/meta/companies`
- `GET /api/meta/skills`
- `GET /api/meta/locations`
- `GET /api/meta/categories`

All Cypher parameters come from driver parameters, not string concatenation.

## Setup

1. Create a free CognoDB instance at the CognoDB Cloud console.
2. Copy the `bolt+s://...` URI and the generated `cognodb` password.
3. Copy `.env.example` to `.env` and fill in the credentials.
4. Install dependencies:

```bash
npm install
```

5. Seed the graph:

```bash
npm run seed
```

6. Start the API:

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default.

## Seed data

The seed script loads the 30 realistic job records already present in the frontend and derives realistic skill relationships from each job. It also creates a `demo-user` with React, JavaScript, Node.js, SQL, Git, REST APIs and Python skills.

## Example recommendation

```http
GET /api/recommendations/demo-user
```

The response includes matched skills and a match percentage based on the graph relationship between the demo user and each job.

## Environment variables

```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
COGNODB_URI=bolt+s://<instance-id>.databases.cognodb.cloud
COGNODB_USER=cognodb
COGNODB_PASSWORD=<your-password>
```

Never commit `.env` or database credentials.
