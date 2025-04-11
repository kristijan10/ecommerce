import httpStatus from "../utils/httpStatus.js";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  if (["/auth/login", "/auth/register"].includes(req.path)) return next();

  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return next(
      Object.assign(new Error("Nepostojeci token. Pristup odbijen"), {
        status: httpStatus.UNAUTHORIZED,
      })
    );

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    next(error);
  }
};
