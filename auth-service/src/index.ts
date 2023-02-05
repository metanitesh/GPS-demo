import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret, appHost, appPort } from "./../config";
import { connect, close, getUser, addUser } from "./db";

interface IUserRequest extends express.Request {
  user?: any;
}

export const app = express();
app.use(express.json());

const tokens: any = []; // Store active tokens using redis

const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const client = await connect();
    await addUser(client, username, hashedPassword, salt);
    await close(client);

    res.send({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const client = await connect();
    const user = await getUser(client, username);
    await close(client);

    if (!user) {
      return res
        .status(401)
        .send({ message: "Username or password is incorrect" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(401)
        .send({ message: "Username or password is incorrect" });
    }

    const token = jwt.sign({ username }, secret);
    tokens.push(token);

    res.send({ token });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

const logout = (req: Request, res: Response) => {
  const bearerHeader = req.headers["authorization"];

  const token = bearerHeader && bearerHeader.split(" ")[1];

  // Remove token from active tokens
  const index = tokens.indexOf(token);
  if (index !== -1) {
    tokens.splice(index, 1);
  }

  res.send({ message: "User logged out successfully." });
};

const verifyToken = (req: IUserRequest, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader || typeof bearerHeader !== "string") {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  if (tokens.indexOf(token) === -1) {
    return res
      .status(401)
      .send({ message: "Token is invalid or has expired." });
  }

  try {
    jwt.verify(token, secret);
    req.user = jwt.decode(token);
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token." });
  }
};

app.post("/create", createUser);
app.post("/login", login);
app.get("/verify", verifyToken, (req: IUserRequest, res: Response) => {
  res.send({ message: "Token is valid", user: req.user });
});
app.post("/logout", verifyToken, logout);

app.listen(appPort, appHost, () =>
  console.log(`Listening on port ${appPort}...`)
);
