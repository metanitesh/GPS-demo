import { Router, Request, Response } from "express";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { authVerify } from "./auth-client";
import { locationServiceHost, locationServicePort } from "../config";

interface Location {
  _id: string;
  name: string;
  loc?: {
    coordinates: [number, number];
    type: string;
  };
}

interface LocationResponse {
  locations: {
    places: Location[];
  };
}

const PROTO_PATH = "./location.proto";
const locationService = `${locationServiceHost}:${locationServicePort}`;

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const NewsService: any =
  grpc.loadPackageDefinition(packageDefinition).LocationService;

const locationClient = new NewsService(
  locationService,
  grpc.credentials.createInsecure()
);

const locationRouter = Router();

locationRouter.get("/places", authVerify, (req: Request, res: Response) => {
  locationClient.GetPlace(
    {},
    (error: Error | null, locations: LocationResponse) => {
      if (error) {
        res.send(error);
      }
      res.json({ locations: locations });
    }
  );
});

locationRouter.post("/place", authVerify, (req: Request, res: Response) => {
  const place = {
    name: req.body.name,
    loc: {
      type: "POINT",
      coordinates: [req.body.lat, req.body.long],
    },
  };

  locationClient.AddPlace(place, (error: Error | null, location: {}) => {
    console.log("location add");
    if (error) {
      res.send(error);
    }
    res.send(location);
  });
});

export default locationRouter;
