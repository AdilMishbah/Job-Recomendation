import "dotenv/config";

const required = ["COGNODB_URI", "COGNODB_USER", "COGNODB_PASSWORD"];
const missing = required.filter((key) => !process.env[key]);

export const config = {
  port: Number(process.env.PORT || 5000),
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  cognodbUri: process.env.COGNODB_URI,
  cognodbUser: process.env.COGNODB_USER,
  cognodbPassword: process.env.COGNODB_PASSWORD,
};

export function assertDatabaseConfig() {
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}
