import express from "express";
import throwError from "../utils/throwError.js";
import httpStatus from "../utils/httpStatus.js";
import roleMiddleware from "../middleware/role.js";
import { order_items, orders, products } from "../temp_data.js";

const router = express.Router();

const orderExists = (id) => !isNaN(id) && id >= 0;

router.get("/", (req, res) => {
  res.send(
    req.user.isAdmin ? orders : orders.filter((o) => o.user_id === req.user.id)
  );
});

router.post("/", (req, res) => {
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
});

router.put("/:id/status", roleMiddleware, (req, res) => {
  const id = +req.params.id;
  if (!orderExists(id))
    throwError(`Nije dobro prosledjen id parametar`, httpStatus.BAD_REQUEST);

  const { status } = req.params;
  if (!["pending", "paid"].includes(status))
    throwError("Unet nepoznati status", httpStatus.BAD_REQUEST);

  const order = orders.find((o) => o.id === id);
  if (!order) throwError(`Porudzbina ne postoji`, httpStatus.NOT_FOUND);

  order.status = status;
  res.send({ message: "Status uspesno izmenjen" });
});

export default router;
