export function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

export function notFound(req, res) {
  res.status(404).json({ success: false, error: "Route not found" });
}

export function errorHandler(error, req, res, next) {
  console.error(`[${new Date().toISOString()}]`, error);
  const dbError = /neo4j|cognodb|connectivity|database/i.test(error.message || "");
  res.status(dbError ? 503 : 500).json({
    success: false,
    error: dbError ? "Job database is temporarily unavailable." : "Internal server error.",
  });
}
