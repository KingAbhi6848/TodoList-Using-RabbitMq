// connection.js
import amqp from "amqplib";

let connection;
let channel;

const connectToRabbitMQ = async () => {
  if (!connection) {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("notifications_queue", { durable: true });
    console.log("Connected to RabbitMQ and channel is created.");
  }
};

export const getChannel = async () => {
  if (!channel) {
    await connectToRabbitMQ();
  }
  return channel;
};

export const closeConnection = async () => {
  if (channel) {
    await channel.close();
    console.log("Channel closed.");
  }
  if (connection) {
    await connection.close();
    console.log("Connection closed.");
  }
};
