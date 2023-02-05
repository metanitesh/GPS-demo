import { appHost, appPort } from "./../config";
import express from "express";
import { authRouter } from "./auth-client";
import locationRouter from "./location-client";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/locations", locationRouter);

app.listen(appPort, appHost, () => {
  console.log(`Example app listening on port ${appPort}`);
});
