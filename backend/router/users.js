import express from "express"
import { users } from "../temp_data.js";
import roleMiddleware from "../middleware/role.js";
import throwError from "../utils/throwError.js";
import httpStatus from "../utils/httpStatus.js";

const router = express.Router();

const userExists = (id) => !isNaN(id) && id >= 0 && users.length > id;

router.get("/me", (req, res) => {
  const { id } = req.user;
  const { password, ...user } = users.find((u) => u.id === id);

  res.send(user);
});

router.get("/", roleMiddleware, (req, res) => { 
  res.send(users);
});

router.put("/:id", roleMiddleware, (req, res) => {
  const id = +req.params.id;
  if (!userExists(id))
    throwError(`Nije dobro prosledjen id parametar`, httpStatus.BAD_REQUEST);

  if (req.user.id === id) throwError("Ne mozes promeniti svoju ulogu", httpStatus.UNPROCESSABLE);

  const { isAdmin } = req.body;
  if (typeof isAdmin !== "boolean" ) throwError("{isAdmin: boolean}", httpStatus.BAD_REQUEST);
  
  const user = users.find(u => u.id === id);
  user.isAdmin = isAdmin;

  res.send({ message: "Uspesno izmenjeno" });
})

export default router;