import { MongoClient } from "mongodb";
import { secret, dbHost, dbPort } from "./../config";

const uri = `mongodb://${dbHost}:${dbPort}`;

export const connect = async () => {
  const client = new MongoClient(uri, {});
  await client.connect();
  return client;
};

export const close = async (client: MongoClient) => {
  await client.close();
};

export const getUser = async (client: MongoClient, username: string) => {
  const database = client.db("emil");
  const users = database.collection("users");
  return await users.findOne({ username });
};

export const addUser = async (
  client: MongoClient,
  username: string,
  password: string,
  salt: string
) => {
  const database = client.db("emil");
  const users = database.collection("users");

  return await users.insertOne({ username, password, salt });
};
