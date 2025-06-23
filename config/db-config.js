const env = process.env.NODE_ENV || "local";
require("dotenv").config(); // ✅ Load environment variables from API repo's .env

const express = require("express");
const app = express();
// ... your other bootstrapping code

const Sequelize = require("sequelize");
const SECOND = 1000;
const MINUTE = SECOND * 60;

function reporter(message, _) {
  if (!message.includes("Trying SequelizeRetry #1")) {
    console.log(`message >>>> ${message}`);
  }
}
const dbConfig = {
  local: {
    username: process.env.SMART_QUEQE_MANAGER_DB_USERNAME,
    password: process.env.SMART_QUEQE_MANAGER_DB_PASSWORD,
    database: process.env.SMART_QUEQE_MANAGER_DB_NAME,
    host: process.env.SMART_QUEQE_MANAGER_DB_INSTANCE_URL,
    port: process.env.SMART_QUEQE_MANAGER_DB_PORT,
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "module.exportsSequelizeData",
    logQueryParameters: true,
    benchmark: true,
    pool: {
      // connection pool with 3 reusable connections
      max: 3,
      // connection in the pool will be qualified as idle if it is unused for 10 seconds or more
      idle: SECOND * 10,
      // The pool when invoked for a connection will wait a maximum of 5 minute before throwing a Timeout error
      acquire: MINUTE * 5,
    },
    dialectOptions: {
      idle_in_transaction_session_timeout:
        process.env.SMART_QUEQE_MANAGER_DB_TRANSACTION_TIMEOUT || SECOND * 60,
    },
    retry: {
      max: 3, // maximum amount of tries
      timeout: MINUTE * 10, // throw if no response or error within millisecond timeout
      match: [
        // Must match error signature (ala bluebird catch) to continue
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        Sequelize.ConnectionAcquireTimeoutError,
        Sequelize.ConnectionRefusedError,
      ],
      backoffBase: SECOND, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.1, // Exponent to increase backoff each try. Default: 1.1
      report: reporter,
      name: "SequelizeRetry", // if user supplies string, it will be used when composing error/reporting messages; else if retry gets a callback, uses callback name in erroring/reporting; else (default) uses literal string 'unknown'
    },
  },
  development: {
    username: process.env.SMART_QUEQE_MANAGER_DB_USERNAME,
    password: process.env.SMART_QUEQE_MANAGER_DB_PASSWORD,
    database: process.env.SMART_QUEQE_MANAGER_DB_NAME,
    host:
      process.env.SMART_QUEQE_MANAGER_DB_SOCKET_PATH +
      "/" +
      process.env.SMART_QUEQE_MANAGER_DB_INSTANCE_URL,
    port: process.env.SMART_QUEQE_MANAGER_DB_PORT,
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "module.exportsSequelizeData",
    logQueryParameters: true,
    dialectOptions: {
      socketPath:
        process.env.SMART_QUEQE_MANAGER_DB_SOCKET_PATH +
        "/" +
        process.env.SMART_QUEQE_MANAGER_DB_INSTANCE_URL,
    },
    benchmark: true,
    pool: {
      // connection pool with 3 reusable connections
      max: 6,
      // connection in the pool will be qualified as idle if it is unused for 10 seconds or more
      idle: SECOND * 10,
      // The pool when invoked for a connection will wait a maximum of 5 minute before throwing a Timeout error
      acquire: MINUTE * 10,
    },
    dialectOptions: {
      idle_in_transaction_session_timeout:
        process.env.SMART_QUEQE_MANAGER_DB_TRANSACTION_TIMEOUT || SECOND * 60,
    },
    retry: {
      max: 3, // maximum amount of tries
      timeout: MINUTE * 10, // throw if no response or error within millisecond timeout
      match: [
        // Must match error signature (ala bluebird catch) to continue
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        Sequelize.ConnectionAcquireTimeoutError,
        Sequelize.ConnectionRefusedError,
      ],
      backoffBase: SECOND, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.1, // Exponent to increase backoff each try. Default: 1.1
      report: reporter,
      name: "SequelizeRetry", // if user supplies string, it will be used when composing error/reporting messages; else if retry gets a callback, uses callback name in erroring/reporting; else (default) uses literal string 'unknown'
    },
  },
  beta: {
    username: process.env.SMART_QUEQE_MANAGER_DB_USERNAME,
    password: process.env.SMART_QUEQE_MANAGER_DB_PASSWORD,
    database: process.env.SMART_QUEQE_MANAGER_DB_NAME,
    host:
      process.env.SMART_QUEQE_MANAGER_DB_SOCKET_PATH +
      "/" +
      process.env.SMART_QUEQE_MANAGER_DB_INSTANCE_URL,
    port: process.env.SMART_QUEQE_MANAGER_DB_PORT,
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "module.exportsSequelizeData",
    logQueryParameters: true,
    dialectOptions: {
      socketPath:
        process.env.SMART_QUEQE_MANAGER_DB_SOCKET_PATH +
        "/" +
        process.env.SMART_QUEQE_MANAGER_DB_INSTANCE_URL,
    },
    benchmark: true,
    pool: {
      // connection pool with 3 reusable connections
      max: 3,
      // connection in the pool will be qualified as idle if it is unused for 10 seconds or more
      idle: SECOND * 10,
      // The pool when invoked for a connection will wait a maximum of 5 minute before throwing a Timeout error
      acquire: MINUTE * 10,
    },
    dialectOptions: {
      idle_in_transaction_session_timeout:
        process.env.SMART_QUEQE_MANAGER_DB_TRANSACTION_TIMEOUT || SECOND * 60,
    },
    retry: {
      max: 3, // maximum amount of tries
      timeout: MINUTE * 10, // throw if no response or error within millisecond timeout
      match: [
        // Must match error signature (ala bluebird catch) to continue
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        Sequelize.ConnectionAcquireTimeoutError,
        Sequelize.ConnectionRefusedError,
      ],
      backoffBase: SECOND, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.1, // Exponent to increase backoff each try. Default: 1.1
      report: reporter,
      name: "SequelizeRetry", // if user supplies string, it will be used when composing error/reporting messages; else if retry gets a callback, uses callback name in erroring/reporting; else (default) uses literal string 'unknown'
    },
  },
  production: {
    username: process.env.SMART_QUEQE_MANAGER_DB_USERNAME,
    password: process.env.SMART_QUEQE_MANAGER_DB_PASSWORD,
    database: process.env.SMART_QUEQE_MANAGER_DB_NAME,
    host:
      process.env.SMART_QUEQE_MANAGER_DB_SOCKET_PATH +
      "/" +
      process.env.SMART_QUEQE_MANAGER_DB_INSTANCE_URL,
    port: process.env.SMART_QUEQE_MANAGER_DB_PORT,
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "module.exportsSequelizeData",
    logQueryParameters: true,
    dialectOptions: {
      socketPath:
        process.env.SMART_QUEQE_MANAGER_DB_SOCKET_PATH +
        "/" +
        process.env.SMART_QUEQE_MANAGER_DB_INSTANCE_URL,
    },
    benchmark: true,
    pool: {
      // connection pool with 3 reusable connections
      max: 3,
      // connection in the pool will be qualified as idle if it is unused for 10 seconds or more
      idle: SECOND * 10,
      // The pool when invoked for a connection will wait a maximum of 5 minute before throwing a Timeout error
      acquire: MINUTE * 10,
    },
    dialectOptions: {
      idle_in_transaction_session_timeout:
        process.env.SMART_QUEQE_MANAGER_DB_TRANSACTION_TIMEOUT || SECOND * 60,
    },
    retry: {
      max: 3, // maximum amount of tries
      timeout: MINUTE * 10, // throw if no response or error within millisecond timeout
      match: [
        // Must match error signature (ala bluebird catch) to continue
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        // Sequelize.ConnectionAcquireTimeoutError,
        Sequelize.ConnectionRefusedError,
      ],
      backoffBase: SECOND, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.1, // Exponent to increase backoff each try. Default: 1.1
      report: reporter,
      name: "SequelizeRetry", // if user supplies string, it will be used when composing error/reporting messages; else if retry gets a callback, uses callback name in erroring/reporting; else (default) uses literal string 'unknown'
    },
  },
};

const deepFreeze = (obj) => {
  if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach((prop) => deepFreeze(obj[prop]));
  }
  return obj;
};

module.exports = deepFreeze(dbConfig);
