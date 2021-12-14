import amqp from "amqplib/callback_api";

import { MAILS, NAME_QUEUE } from "./constants";

amqp.connect("amqp://localhost:5672", (err, connection) => {
  if (err) {
    return console.error("Error: ", err);
  }

  // Create a new channel.
  connection.createChannel((error, channel) => {
    if (error) {
      return console.error("Error: ", error);
    }

    // Create queue.
    channel.assertQueue(NAME_QUEUE, { durable: false });

    // Send messages.
    MAILS.forEach((mail, i) => {
      const buffer = Buffer.from(JSON.stringify(mail));
      channel.sendToQueue(NAME_QUEUE, buffer);
      console.log(`${i+1}. Mail: `, mail);
    });
  });

  // Close connection.
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 3000);
});
