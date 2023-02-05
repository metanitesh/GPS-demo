import dotenv from "dotenv";
dotenv.config();

export const dbName = "emil";
export const dbCollectionLocation = "location";

export const dbHost = process.env.DB_HOST || "localhost";
export const dbPort = process.env.DB_PORT || "27017";
export const appHost = process.env.APP_HOST || "localhost";
export const appPort = process.env.APP_PORT
  ? parseInt(process.env.APP_PORT)
  : 3005;

export const secret = "secret"; //fetch it from secret manager
