import { SendMailOptions } from "nodemailer";
import config from "config";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const NAME_QUEUE = "MAILS";

export const CONNECTION: string = config.get("connection");

export const NODEMAILER: SMTPTransport = config.get("mailer");

export const MAILS: SendMailOptions[] = [
  {
    from: "abc@domain.com",
    to: "xyz@domain.com",
    subject: "My first message with RabbitMQ",
    text: "I am happy to send my first email through RabbitMQ",
    html: "<h1>RabbitMQ is the best 🐰</h1>"
  },
  {
    from: "efg@domain.com",
    to: "uvw@domain.com",
    subject: "My second message with RabbitMQ",
    text: "I am happy to send my second email through RabbitMQ",
    html: "<h1>RabbitMQ is the best 😍</h1>"
  },
  {
    from: "hij@domain.com",
    to: "rst@domain.com",
    subject: "My third message with RabbitMQ",
    text: "I am happy to send my third email through RabbitMQ",
    html: "<h1>RabbitMQ is the best 🔥</h1>"
  },
  {
    from: "klm@domain.com",
    to: "qpo@domain.com",
    subject: "My fourth message with RabbitMQ",
    text: "I am happy to send my fourth email through RabbitMQ",
    html: "<h1>RabbitMQ is the best 🚀</h1>"
  }
];
