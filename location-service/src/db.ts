import { MongoClient } from "mongodb";

import { dbName, dbCollectionLocation, dbHost, dbPort  } from "./../config";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;

export const connectToDb = async () => {
  const client = new MongoClient(uri, {});

  await client.connect();
  return client;
};

export const disconnectFromDb = async (client: MongoClient) => {
  await client.close();
};

export const getPlaces = async (client: MongoClient) => {
  const database = client.db(dbName);
  const collection = database.collection(dbCollectionLocation);
  return await collection.find({}).toArray();
};

export const addPlace = async (client: MongoClient, place: object) => {
  const database = client.db(dbName);
  const collection = database.collection(dbCollectionLocation);
  return await collection.insertOne(place);
};
