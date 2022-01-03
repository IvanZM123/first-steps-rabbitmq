import amqp from "amqplib/callback_api";

import { CONNECTION, NAME_QUEUE } from "./constants";
import { MailService } from "./mail.service";

amqp.connect(CONNECTION, (err, connection) => {
  if (err) {
    return console.error("Error: ", err);
  }
  
  connection.createChannel((error, channel) => {
    if (error) {
      return console.error("Error: ", error);
    }

    const mailService = new MailService();

    channel.consume(NAME_QUEUE, (message) => {
      if (!message) return;
      
      // Transform message.
      const msg = message.content.toString();
      // Send mail.
      mailService.create(JSON.parse(msg));
      console.log(msg);
      // Remove message of the queue.
      channel.ack(message);
    });
  });
});
