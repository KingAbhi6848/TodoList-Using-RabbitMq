// consumer.js
import { sendEmail } from "./nodemailer.js";
import { getChannel } from "./rabbitmq.js";

const consumeNotifications = async () => {
  try {
    const QUEUE_NAME = "notification_queue";
    const channel = await getChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });

    console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Received message: ${JSON.stringify(message)}`);

        // Process the message here
        sendEmail(message);
        // Acknowledge the message after processing
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export default consumeNotifications;
