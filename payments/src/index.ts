import cors from "cors";
import express from "express";
import { connectKafka } from "./config/kafka";
import { PaymentController } from "./controllers/payment-controller";
import { OrderCreatedConsumer } from "./events/consumers/order-created-consumer";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/payments/pay", PaymentController.pay);

const start = async () => {
  app.listen(3003, () => {
    console.log("Payments service listening on port 3003");
  });

  try {
    await connectKafka();
    await OrderCreatedConsumer.start();
  } catch (err) {
    console.error("Failed to connect to Kafka:", err);
  }
};

start();
