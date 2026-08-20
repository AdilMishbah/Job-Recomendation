import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { closeDatabase, verifyDatabase } from "./db.js";
import healthRouter from "./routes/health.js";
import jobsRouter from "./routes/jobs.js";
import recommendationsRouter from "./routes/recommendations.js";
import usersRouter from "./routes/users.js";
import metaRouter from "./routes/meta.js";
import { errorHandler, notFound } from "./middleware/errors.js";

const app = express();

app.use(cors({ origin: config.frontendOrigin === "*" ? true : config.frontendOrigin }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => res.json({
  name: "Graph-Based Job Recommendation API",
  version: "1.0.0",
  docs: "/api/health",
}));
app.use("/api/health", healthRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/recommendations", recommendationsRouter);
app.use("/api/users", usersRouter);
app.use("/api/meta", metaRouter);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(config.port, async () => {
  console.log(`API listening on http://localhost:${config.port}`);
  try {
    await verifyDatabase();
    console.log("CognoDB connection verified.");
  } catch (error) {
    console.error("CognoDB is not reachable. API will stay online and return 503 for database requests.");
    console.error(error.message);
  }
});

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);
  server.close(async () => {
    await closeDatabase();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

export default app;
