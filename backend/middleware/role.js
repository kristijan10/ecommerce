import httpStatus from "../utils/httpStatus.js";

export default (req, res, next) => {
  if (!req.user.isAdmin)
    return res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "Nemas dozvolu na ovu akciju" });

  next();
};
