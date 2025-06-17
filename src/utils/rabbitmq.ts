import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: "localhost",
      port: 5672,
      username: "admin",
      password: "admin123",
    });

    channel = await connection.createChannel();

    console.log("RabbitMQ connected successfully👌");
  } catch (error) {
    console.log("Error connecting to RabbitMQ:", error);
  }
};

export const publishToQueue = async (queueName: string, message: any) => {
  if (!channel) {
    console.error("Rabbitmq Channel is not initialized.");
    return;
  }

  try {
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Message published to queue ${queueName}`);
  } catch (error) {
    console.error("Error publishing message to queue:", error);
  }
};

export const invalidateCacheJob = async (cacheKeys: string[]) => {
  try {
    const message = {
      action: "invalidateCache",
      keys: cacheKeys,
    };

    await publishToQueue("cache-invalidation", message);
    console.log("Cache invalidation job published rabbitmq successfully 🎉");
  } catch (error) {
    console.error("Error creating cache invalidation job:", error);
  }
};
