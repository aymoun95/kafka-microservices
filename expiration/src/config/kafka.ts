import { Consumer, Kafka, Producer } from "kafkajs";

export const kafka = new Kafka({
  clientId: "expiration-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
  groupId: "expiration-group",
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const connectKafka = async (retries = 5) => {
  while (retries > 0) {
    try {
      await producer.connect();
      await consumer.connect();
      console.log("Expiration Service: Connected to Kafka");
      return;
    } catch (err) {
      console.error(
        `Expiration Service: Kafka connection failed. Retries left: ${retries - 1}`,
        err,
      );
      retries -= 1;
      await sleep(5000);
    }
  }
  throw new Error(
    "Expiration Service: Could not connect to Kafka after multiple retries",
  );
};
