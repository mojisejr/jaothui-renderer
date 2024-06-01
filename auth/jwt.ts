import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorNotify } from "../notify/line";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) res.sendStatus(401);

  jwt.verify(token!, process.env.jwt_secret! as string, (err: any) => {
    if (err) {
      errorNotify(`jwt.verify: ${err.message}`);
      return res.sendStatus(403);
    }

    next();
  });
};
