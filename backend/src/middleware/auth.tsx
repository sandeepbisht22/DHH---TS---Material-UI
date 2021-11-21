import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";
import { NextFunction, Response, Request } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  user?: {
    id: string | JwtPayload;
  }; // or any other type
}
interface DataStoredInToken {
  user: {
    id: string | JwtPayload;
  };
}
const authMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  //1. get Token from header
  const token = req.header("x-auth-token");

  //2. Check if token is present or not
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //3. verify token
  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtSecret")
    ) as DataStoredInToken;
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export { authMiddleware };
