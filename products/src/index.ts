import cors from "cors";
import express from "express";
import { ProductController } from "./controllers/product-controller";

import { connectKafka } from "./config/kafka";
import { ProductConsumer } from "./events/consumers/product-consumer";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", ProductController.getAll);

const start = async () => {
  try {
    await connectKafka();
    await ProductConsumer.start();
    console.log("Product service listening for events");
  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log("Products service listening on port 3001");
  });
};

start();
