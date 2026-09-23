import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token is required, authorization denied!" });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET! as string) as {
      id: string;
      isAdmin: boolean;
    };

    req.user = { id: decode.id, isAdmin: decode.isAdmin };
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Token is invalid, authorization denied!" });
  }
};

export default auth;