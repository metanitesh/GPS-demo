export const dbName = "emil";
export const dbCollectionLocation = "location";
import dotenv from "dotenv";
dotenv.config();

export const appHost = process.env.APP_HOST || "localhost";
export const appPort = process.env.APP_PORT
  ? parseInt(process.env.APP_PORT)
  : 3006;
export const locationServiceHost =
  process.env.LOCATION_SERVICE_HOST || "localhost";
export const locationServicePort = process.env.LOCATION_SERVICE_PORT || "3005";
export const authServiceHost = process.env.AUTH_SERVICE_HOST || "localhost";
export const authServicePort = process.env.AUTH_SERVICE_PORT || "3004";
