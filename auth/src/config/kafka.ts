import { Kafka, Producer } from "kafkajs";

export const kafka = new Kafka({
  clientId: "auth-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

export const producer: Producer = kafka.producer();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const connectKafka = async (retries = 5) => {
  while (retries > 0) {
    try {
      await producer.connect();
      console.log("Auth Service: Connected to Kafka");
      return;
    } catch (err) {
      console.error(
        `Auth Service: Kafka connection failed. Retries left: ${retries - 1}`,
        err,
      );
      retries -= 1;
      await sleep(5000);
    }
  }
  throw new Error(
    "Auth Service: Could not connect to Kafka after multiple retries",
  );
};
