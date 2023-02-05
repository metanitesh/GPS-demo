import axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { authServiceHost, authServicePort } from "./../config";

const authBaseUrl = `http://${authServiceHost}:${authServicePort}`;

const authRouter = Router();

authRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${authBaseUrl}/create`, {
      username: req.body.username,
      password: req.body.password,
    });
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${authBaseUrl}/login`, {
      username: req.body.username,
      password: req.body.password,
    });
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${authBaseUrl}/logout`,
      {},
      {
        headers: {
          authorization: req.headers["authorization"],
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
});

const authVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get(`${authBaseUrl}/verify`, {
      headers: {
        authorization: req.headers["authorization"],
      },
    });

    if (response.status === 200) {
      next();
    }
  } catch (error) {
    res.send(error);
  }
};

export { authRouter, authVerify };
