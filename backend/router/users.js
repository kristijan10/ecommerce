import express from "express";
// import { users } from "../temp_data.js";
import roleMiddleware from "../middleware/role.js";
import throwError from "../utils/throwError.js";
import httpStatus from "../utils/httpStatus.js";
import { pool } from "../config.js";

const router = express.Router();

router.get("/me", async (req, res, next) => {
  try {
    const id = req?.user?.id;
    if (!id) throwError("Korisnik nije prijavljen", httpStatus.BAD_REQUEST);

    const [[user]] = await pool.execute(
      "SELECT id, username, email, IF(isAdmin = 1, true, false) AS isAdmin, createdAt, updatedAt FROM users WHERE id = ?",
      [id]
    );
    if (!user)
      throwError(`Korisnik sa id ${id} ne postoji`, httpStatus.NOT_FOUND);

    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/", roleMiddleware, async (req, res, next) => {
  try {
    const [users] = await pool.execute(
      "SELECT id, username, email, IF(isAdmin = 1, true, false) AS isAdmin, createdAt, updatedAt FROM users"
    );
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", roleMiddleware, async (req, res, next) => {
  try {
    const id = +req.params.id;
    if (isNaN(id) || id < 0)
      throwError(`Neispravan ID`, httpStatus.BAD_REQUEST);

    if (req.user.id === id)
      throwError("Ne mozes promeniti svoju ulogu", httpStatus.UNPROCESSABLE);

    const input = req.body;

    const [columns] = await pool.execute("SHOW COLUMNS FROM users");
    const validColumns = new Set(columns.map((c) => c.Field));

    const keysToUpdate = Object.keys(input).filter(
      (k) => validColumns.has(k) && k !== "id"
    );
    if (!keysToUpdate.length)
      return res.send({ message: "Nema podataka za izmenu" });

    const setClause = keysToUpdate.map((k) => `${k} = ?`).join(", ");
    const values = keysToUpdate.map((k) => input[k]);

    values.push(id);

    await pool.execute(`UPDATE users SET ${setClause} WHERE id = ?`, values);

    res.send({ message: "Uspesno izmenjen korisnik" });
  } catch (error) {
    next(error);
  }
});

export default router;
