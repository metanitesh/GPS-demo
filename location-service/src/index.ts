import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import { connectToDb, disconnectFromDb, getPlaces, addPlace } from "./db";
import { Document, InsertOneResult, WithId } from "mongodb";
import { appHost, appPort } from "./../config";

interface Location {
  type: string;
  coordinates: number[];
}

interface AddPlaceRequest {
  name: string;
  loc: Location;
}

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync("location.proto", options);
const locationProto: any = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(locationProto.LocationService.service, {
  GetPlace: async (
    _: any,
    callback: grpc.sendUnaryData<{ places: WithId<Document>[] }>
  ) => {
    try {
      const client = await connectToDb();
      const places = await getPlaces(client);
      await disconnectFromDb(client);
      callback(null, { places });
    } catch (error) {
      console.error(error);
    }
  },
  AddPlace: async (
    call: grpc.ServerUnaryCall<AddPlaceRequest>,
    callback: grpc.sendUnaryData<InsertOneResult<Document>>
  ) => {
    try {
      const client = await connectToDb();
      const { name, loc } = call.request;
      const response = await addPlace(client, { name, loc });
      await disconnectFromDb(client);
      callback(null, response);
    } catch (error) {
      console.error(error);
    }
  },
});

server.bindAsync(
  `${appHost}:${appPort}`,
  grpc.ServerCredentials.createInsecure(),
  (error: any, _: any) => {
    console.log(`Server running at ${appHost}: ${appPort}`);
    server.start();

    if (error) {
      console.error(error);
    }
  }
);
