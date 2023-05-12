const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
    case "production":
        ENV_FILE_NAME = ".env.production";
        break;
    case "staging":
        ENV_FILE_NAME = ".env.staging";
        break;
    case "test":
        ENV_FILE_NAME = ".env.test";
        break;
    case "development":
    default:
        ENV_FILE_NAME = ".env";
        break;
}

try {
    dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
    process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001,https://admin.streampay.store";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,https://streampay.store";

const DATABASE_TYPE = process.env.DATABASE_TYPE || "postgres";

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE

const DATABASE_URL =
    `postgres://kujijnpmnglvfs:c34332d7b0cde3a3d5163fadd6608c5246d18a3609e22b5d140b12fe9db78a72` +
    `@ec2-34-242-154-118.eu-west-1.compute.amazonaws.com:5432/d9ag5o6gcs7baj`

const REDIS_URL = process.env.REDIS_URL || "redis://default:yJxAdsh0MoiM3q4eOHrFxNN0xTpou1c9MWqnAU2x2Uhu0UQWkQx7ONM2pSJ0eoOh@vr9kdd.stackhero-network.com:6379";

const plugins = [
    `medusa-fulfillment-manual`,
    `medusa-payment-manual`,
    // To enable the admin plugin, uncomment the following lines and run `yarn add @medusajs/admin`
    {
        resolve: "@medusajs/admin",
        /** @type {import('@medusajs/admin').PluginOptions} */
        options: {
            // ...
        },
    },
]

const modules = {
    eventBus: {
        resolve: "@medusajs/event-bus-redis",
        options: {
            redisUrl: REDIS_URL
        }
    },
    cacheService: {
        resolve: "@medusajs/cache-redis",
        options: {
            redisUrl: REDIS_URL
        }
    },
}

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    database_database: "./medusa-db.sql",
    database_type: DATABASE_TYPE,
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    // Uncomment the following lines to enable REDIS
    redis_url: REDIS_URL
}

if (DATABASE_URL && DATABASE_TYPE === "postgres") {
    projectConfig.database_url = DATABASE_URL;
    delete projectConfig["database_database"];
}


/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
    // ...
    plugins: [{
        resolve: "@medusajs/admin",
        /** @type {import('@medusajs/admin').PluginOptions} */
        options: {
            path: "app",
        },
    }, ],
    // ...
}