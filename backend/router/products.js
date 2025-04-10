import express from "express";
import roleMiddleware from "../middleware/role.js";
import throwError from "../utils/throwError.js";
import httpStatus from "../utils/httpStatus.js";
import { products } from "../temp_data.js";

const router = express.Router();

const productExists = (id) => !isNaN(id) && id >= 0 && id < products.length;

router.get("/", (req, res) => {
  res.send(products);
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  if (!productExists(id))
    throwError(`Proizvod ne postoji`, httpStatus.NOT_FOUND);

  res.send(products[id]);
});

router.post("/", roleMiddleware, (req, res) => {
  const { name, desc = "", price, imageUrl } = req.body;

  if (!name || !price || !imageUrl)
    throwError(
      "{name: string, desc?: string, price: real, imageUrl: string}",
      httpStatus.BAD_REQUEST
    );

  products.push({
    id: products.length,
    name,
    desc,
    price,
    imageUrl,
  });
  res.send({ message: "Uspesno dodat proizvod" });
});

router.put("/:id", roleMiddleware, (req, res) => {
  const id = +req.params.id;
  if (!productExists(id))
    throwError(`Proizvod ne postoji`, httpStatus.NOT_FOUND);

  const inputKeys = Object.keys(req.body);

  const validKeys = new Set(Object.keys(products[0]));

  const keysToChange = inputKeys.filter((i) => validKeys.has(i));
  if (!keysToChange.length)
    return res.send({ message: "Nema podataka za izmenu" });

  keysToChange.forEach((k) => {
    products[id][k] = req.body[k];
  });

  res.send({ message: "Uspesno izmenjen proizvod", product: products[id] });
});

router.delete("/:id", roleMiddleware, (req, res) => {
  const id = +req.params.id;
  if (!productExists(id))
    throwError(`Proizvod ne postoji`, httpStatus.NOT_FOUND);

  products.splice(id, 1);
  res.send({ message: "Uspesno uklonjen proizvod", products });
});

export default router;
