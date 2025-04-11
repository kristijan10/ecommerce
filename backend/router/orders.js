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

// TODO
router.post("/", async (req, res, next) => {
  try {
    const { items } = req.body;

    const order = {
      id: orders.length,
      user_id: req.user.id,
      status: "pending",
      createdAt: Date.now(),
    };

    items.forEach((i) => {
      const item = products.find((p) => p.id === i.item_id);

      const order_item = {
        order_id: order.id,
        product_id: i.item_id,
        quantity: i.quantity,
        amount: i.quantity * item.price,
      };

      order_items.push(order_item);
    });

    orders.push(order);

    res.send({ message: "Uspesno dodata porudzbina", id: order.id });
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
