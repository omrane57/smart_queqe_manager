const env = process.env.NODE_ENV || "local";
require(__dirname + "/config/db-config.js")[env];
const requiredEnvVariables = [
  "SMART_QUEQE_MANAGER_DB_USERNAME",
  "SMART_QUEQE_MANAGER_DB_PASSWORD",
  "SMART_QUEQE_MANAGER_DB_NAME",
  "SMART_QUEQE_MANAGER_DB_INSTANCE_URL",
  "SMART_QUEQE_MANAGER_DB_PORT",
  "NODE_ENV",
];

if (env != "local") {
  requiredEnvVariables.push("SMART_QUEQE_MANAGER_DB_SOCKET_PATH");
}

for (const envVar of requiredEnvVariables) {
  ``;
  if (!process.env[envVar]) {
    throw new Error(
      `${envVar} is required but not found in the environment variables`
    );
  }
}
const db = require("./models");

module.exports = db;
