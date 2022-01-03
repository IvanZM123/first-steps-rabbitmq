import amqp, { Message } from "amqplib/callback_api";
import { writeFile, mkdir } from "fs";
import { resolve, parse } from "path";
import { promisify } from "util";

const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);

const QUEUE_NAME = "task_queue";

amqp.connect("amqp://localhost:5672", (error, connection) => {
  if (error) return console.error(error);
  console.log("Successfully connection a RabbitMQ");

  connection.createChannel((err, channel) => {
    if (err) return console.error(err);
    console.log("Created channel correctly");

    channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.consume(
      // Name.
      QUEUE_NAME,
      // Callback.
      async (msg: Message | null) => {
        if (!msg) throw new Error("msg is empty");
        const data = msg.content.toString();
        const payload = JSON.parse(data);

        const { dir, base: filename } = parse(payload.filename);
        const dirPath: string = resolve("uploads", dir);
        const fullpath: string = resolve(dirPath, filename);

        try {
          // Create directory recursively.
          await mkdirAsync(dirPath, { recursive: true });

          // Write file.
          await writeFileAsync(fullpath, payload.data, { encoding: "utf-8" });

          // Clear queue.
          channel.ack(msg);
          console.log(`Wrote ${ fullpath } file successfully.`);
        } catch (error) {
          console.error(error);
        }
      },
      // Options.
      { noAck: false }
    );
  });
});
