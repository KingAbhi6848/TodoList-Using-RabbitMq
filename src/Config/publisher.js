import { getChannel } from "./rabbitmq.js";
import consumeNotifications from "./subscribe.js";
const QUEUE_NAME = "notification_queue";

const sendNotification = async (message) => {
  try {
    // Use the user's ID as the queue name
    const channel = await getChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });

    // Send the message to the queue
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Sent contact data: ${JSON.stringify(message)}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

consumeNotifications();

export default sendNotification;
