import amqp from "amqplib/callback_api";

const QUEUE_NAME = "task_queue";

// Capture message in the console.
const [filename, data] = process.argv.slice(2);

amqp.connect("amqp://localhost:5672", (error, connection) => {
  if (error) return console.error(error);
  console.log("Successfully connection a RabbitMQ");

  connection.createChannel((err, channel) => {
    if (err) return console.error(err);
    console.log("Created channel correctly");

    channel.assertQueue(QUEUE_NAME, { durable: true });

    const payload = { filename, data };

    channel.sendToQueue(
      // Name.
      QUEUE_NAME,
      // Message.
      Buffer.from(JSON.stringify(payload)),
      // Options.
      { persistent: true }
    );
    console.log(`Sent message: `, payload);
  });
});
