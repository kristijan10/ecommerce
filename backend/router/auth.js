import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import throwError from "../utils/throwError.js";
import httpStatus from "../utils/httpStatus.js";
import { users } from "../temp_data.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      throwError(
        "{username: string, password: string}",
        httpStatus.BAD_REQUEST
      );

    const user = users.find((u) => u.username == username);
    if (!user)
      throwError(
        `Korisnik imena ${username} ne postoji u bazi`,
        httpStatus.NOT_FOUND
      );

    const validPassword = user.password === password;
    if (!validPassword)
      throwError("Uneta lozinka nije tacna", httpStatus.UNAUTHORIZED);

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "tajna"
    );

    res.send({ message: "Uspesno prijavljen korisnik", token });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, isAdmin = false } = req.body;

    if (!username || !email || !password)
      throwError(
        "{username: string, email: string, password: string, isAdmin?: bool}",
        httpStatus.BAD_REQUEST
      );

    const alreadyExists = users.find(
      (u) => u.username === username || u.email === email
    );
    if (alreadyExists)
      throwError(
        "Korisnik sa unetim podacima vec postoji",
        httpStatus.CONFLICT
      );

    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: users.length,
      username,
      email,
      // password: hashedPassword,
      password,
      isAdmin,
    };

    users.push(user);

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "tajna"
    );

    res.send({ message: "Uspesno registrovan korisnik", token });
  } catch (error) {
    next(error);
  }
});

export default router;
