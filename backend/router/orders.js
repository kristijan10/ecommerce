import express from "express";
import throwError from "../utils/throwError.js";
import httpStatus from "../utils/httpStatus.js";
import roleMiddleware from "../middleware/role.js";
import { pool } from "../config.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    const sql = isAdmin
      ? `SELECT * FROM orders`
      : `SELECT * FROM orders WHERE user_id = ?`;

    const [orders] = await pool.execute(sql, isAdmin ? [] : [req.user.id]);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { order_data, order_items_data } = req.body;
    if (!order_items_data?.length || order_data?.user_id < 0)
      throwError("Nemam dovoljno podataka", httpStatus.BAD_REQUEST);

    // pravim prvo order
    const [response] = await pool.execute(
      "INSERT INTO orders(user_id, status) VALUES(?, ?)",
      [order_data.user_id, order_data?.status || "pending"]
    );

    const order_id = response.insertId;

    // pa dohvativsi id novonastalog ordera pravim nove order_items
    const values = order_items_data.map(() => `(?, ?, ?, ?)`);
    const params = order_items_data.flatMap((i) => [
      order_id,
      i.product_id,
      i.quantity,
      i.amount,
    ]);

    const sql = `INSERT INTO order_items(order_id, product_id, quantity, amount) VALUES${values}`;
    await pool.execute(sql, params);

    res.send({ message: "Uspesno kreirana porudzbina" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id/status", roleMiddleware, async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { status } = req.params;

    if (isNaN(id) || id < 0) throwError(`Nevalidan ID`, httpStatus.BAD_REQUEST);
    if (!["pending", "paid"].includes(status))
      throwError("Nepoznati status", httpStatus.BAD_REQUEST);

    await pool.execute("UPDATE orders SET status = ? WHERE id = ?", [
      status,
      id,
    ]);

    res.send({ message: "Status uspesno izmenjen" });
  } catch (error) {
    next(error);
  }
});

export default router;
