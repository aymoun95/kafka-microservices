import { connectKafka } from "./config/kafka";
import { ExpirationConsumer } from "./events/consumers/expiration-consumer";

const start = async () => {
  try {
    await connectKafka();
    await ExpirationConsumer.start();
    console.log("Expiration service started and listening for events");
  } catch (err) {
    console.error(err);
  }
};

start();
