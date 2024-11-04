import { RequestHandler, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export function authmiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("mid");
  //@ts-ignore
  const token = req.headers.authorization as unknown as string;

  try {
    const payload = jwt.verify(token, JWT_PASSWORD);
    //@ts-ignore
    req.id = payload.id;
    next();
  } catch (e) {
    //@ts-ignore
    return res.status(403).json({
      message: "you are not logged in",
    });
  }
}
