import express from "express";
import roleMiddleware from "../middleware/role.js";
import throwError from "../utils/throwError.js";
import httpStatus from "../utils/httpStatus.js";
import { pool } from "../config.js";

const router = express.Router();

const productExists = (id) => !isNaN(id) && id >= 0;

router.get("/", async (req, res, next) => {
  try {
    const [products] = await pool.execute("SELECT * FROM products");
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    if (!productExists(id))
      throwError(`Proizvod ne postoji`, httpStatus.NOT_FOUND);

    const [[product]] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    res.status(product ? httpStatus.OK : httpStatus.NO_CONTENT).send(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", roleMiddleware, async (req, res, next) => {
  try {
    const { name, description = "", price, imageUrl } = req.body;

    if (!name || !price || !imageUrl)
      throwError(
        "{name, price, imageUrl[, desc]} obavezno",
        httpStatus.BAD_REQUEST
      );

    await pool.execute(
      "INSERT INTO products(name, description, price, imageUrl) VALUES(?, ?, ?, ?)",
      [name, description, price, imageUrl]
    );

    res.send({ message: "Uspesno dodat proizvod" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", roleMiddleware, async (req, res, next) => {
  try {
    const id = +req.params.id;
    if (isNaN(id) || id < 0) throwError(`Nevalidan ID`, httpStatus.NOT_FOUND);

    const input = req.body;

    const [columns] = await pool.execute("SHOW COLUMNS FROM products");
    const validColumns = new Set(columns.map((c) => c.Field));

    const keysToUpdate = Object.keys(input).filter(
      (k) => validColumns.has(k) && k !== "id"
    );
    if (!keysToUpdate.length)
      return res.send({ message: "Nema podataka za izmenu" });

    const setClause = keysToUpdate.map((k) => `${k} = ?`).join(", ");
    const values = keysToUpdate.map((k) => input[k]);

    values.push(id);

    await pool.execute(`UPDATE products SET ${setClause} WHERE id = ?`, values);

    res.send({ message: "Uspesno izmenjen proizvod" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", roleMiddleware, async (req, res, next) => {
  try {
    const id = +req.params.id;
    if (isNaN(id) || id < 0) throwError(`Nevalidan ID`, httpStatus.NOT_FOUND);

    const [response] = await pool.execute("DELETE FROM products WHERE id = ?", [
      id,
    ]);

    res.send({
      message: response.affectedRows
        ? "Uspesno uklonjen proizvod"
        : "Nista nije uklonjeno",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
