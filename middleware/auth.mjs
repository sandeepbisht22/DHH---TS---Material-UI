import jwt from "jsonwebtoken";
import config from "config";

const authMiddleware = (req, res, next) => {
  //1. get Token from header
  const token = req.header("x-auth-token");

  //2. Check if token is present or not
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //3. verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export { authMiddleware };
