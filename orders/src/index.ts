import cors from "cors";
import express from "express";
import { connectKafka } from "./config/kafka";
import { OrderController } from "./controllers/order-controller";
import { OrderStatusConsumer } from "./events/consumers/order-status-consumer";

import { addClient, removeClient } from "./config/sse";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/orders", OrderController.create);
app.get("/api/orders", OrderController.getAll);

app.get("/api/orders/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const userId = req.query.userId as string;

  if (userId) {
    addClient(userId, res);

    req.on("close", () => {
      removeClient(userId, res);
    });
  }
});

const start = async () => {
  app.listen(3002, () => {
    console.log("Orders service listening on port 3002");
  });

  try {
    await connectKafka();
    await OrderStatusConsumer.start();
  } catch (err) {
    console.error("Failed to connect to Kafka:", err);
  }
};

start();
