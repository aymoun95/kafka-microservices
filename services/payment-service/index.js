import cors from "cors";
import express from "express";
import { Kafka } from "kafkajs";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const connectToKafka = async () => {
  try {
    await producer.connect();
    console.log("Connected to Producer successfully");
  } catch (err) {
    console.error("Error connecting to Kafka:", err);
  }
};

app.post("/payment-service", async (req, res, next) => {
  const { cart } = req.body;

  const userId = "user123"; //

  //TODO: payment

  //kafka

  await producer.send({
    topic: "payment-successful",
    messages: [{ value: JSON.stringify({ userId, cart }) }],
  });

  return res.status(200).send({ message: "Payment successful" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

app.listen(8000, () => {
  connectToKafka();
  console.log("Payment service is listening on port 8000");
});
