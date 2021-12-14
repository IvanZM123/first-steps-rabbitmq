import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import { NODEMAILER } from "./constants";

export class MailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(NODEMAILER);
  }

  async create(mail: SendMailOptions) {
    return this.transporter.sendMail(mail);
  }
}
