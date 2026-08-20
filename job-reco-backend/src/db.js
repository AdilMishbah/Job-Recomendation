import neo4j from "neo4j-driver";
import { assertDatabaseConfig, config } from "./config.js";

assertDatabaseConfig();

export const driver = neo4j.driver(
  config.cognodbUri,
  neo4j.auth.basic(config.cognodbUser, config.cognodbPassword),
  { maxConnectionPoolSize: 50 }
);

export async function verifyDatabase() {
  await driver.verifyConnectivity();
  return true;
}

export async function closeDatabase() {
  await driver.close();
}

export async function execute(query, params = {}) {
  return driver.executeQuery(query, params, {
    database: process.env.COGNODB_DATABASE || undefined,
  });
}
