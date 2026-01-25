import { ExpirationCompleteProducer } from "../events/producers/expiration-complete-producer";

const tasks: { [key: string]: NodeJS.Timeout } = {};

export class ExpirationService {
  async startTimer(orderId: string, delay: number = 15000) {
    console.log("Expiration service: starting timer for order:", orderId);

    const timeout = setTimeout(async () => {
      console.log("Expiration service: order expired:", orderId);
      delete tasks[orderId];
      console.log(
        "Expiration service: emitting expiration-complete for order:",
        orderId,
      );
      await ExpirationCompleteProducer.publish({ orderId });
    }, delay);

    tasks[orderId] = timeout;
  }

  async cancelTimer(orderId: string) {
    if (tasks[orderId]) {
      console.log("Expiration service: cancelling timer for order:", orderId);
      clearTimeout(tasks[orderId]);
      delete tasks[orderId];
    } else {
      console.log(
        "Expiration service: no active timer found for order:",
        orderId,
      );
    }
  }
}
