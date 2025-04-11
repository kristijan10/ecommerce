import express from "express";
import cors from "cors";
import errorMiddleware from "./middleware/error.js";
import authMiddleware from "./middleware/auth.js";
import authRouter from "./router/auth.js";
import productsRouter from "./router/products.js";
import ordersRouter from "./router/orders.js";
import usersRouter from "./router/users.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(authMiddleware);

app.use("/auth", authRouter);

app.use("/products", productsRouter);

app.use("/orders", ordersRouter);

app.use("/users", usersRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
