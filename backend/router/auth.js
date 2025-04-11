import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import throwError from "../utils/throwError.js";
import httpStatus from "../utils/httpStatus.js";
import { pool } from "../config.js";

const router = express.Router();

const generateToken = ({ id, isAdmin }) =>
  jwt.sign({ id, isAdmin }, process.env.JWT_SECRET);

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throwError("{username, password} obavezni", httpStatus.BAD_REQUEST);

    const [[user]] = await pool.execute(
      `SELECT id, password, IF(isAdmin = 1, true, false) AS isAdmin FROM users WHERE username = ?`,
      [username]
    );
    if (!user)
      throwError(`Korisnik ${username} ne postoji`, httpStatus.NOT_FOUND);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      throwError(
        "Korisnicko ime ili lozinka nisu tacni",
        httpStatus.UNAUTHORIZED
      );

    res.send({ message: "Uspesna prijava", token: generateToken(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, isAdmin = false } = req.body;
    if (!username || !email || !password)
      throwError(
        "{username, email, password[, isAdmin]} obavezno",
        httpStatus.BAD_REQUEST
      );

    const [exists] = await pool.execute(
      `SELECT id FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );
    if (exists.length) throwError("Korisnik vec postoji", httpStatus.CONFLICT);

    const hash = await bcrypt.hash(password, 10);
    await pool.execute(
      "INSERT INTO users(username, email, password, isAdmin) VALUES(?, ?, ?, ?)",
      [username, email, hash, isAdmin]
    );

    const [[user]] = await pool.execute(
      `SELECT id, isAdmin FROM users WHERE username = ?`,
      [username]
    );

    res.send({
      message: "Uspesno registrovan korisnik",
      token: generateToken(user),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
