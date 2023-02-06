export const dbName = "emil";
export const dbCollectionLocation = "location";
import dotenv from "dotenv";
dotenv.config();

export const dbHost = process.env.DB_HOST || "localhost";
export const dbPort = process.env.DB_PORT || "27017";
export const appHost = process.env.APP_HOST || "127.0.0.1";
export const appPort = process.env.APP_PORT || 3004;
