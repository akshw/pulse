import express from "express";
import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const app = express();
app.use(express.json());
const client = new PrismaClient();
const topic_name = "pulse-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const metadata = req.body.metadata;
  const producer = kafka.producer();
  await producer.connect();

  console.log(userId, zapId, metadata);

  await client.$transaction(async (tx) => {
    const run = await client.zapRun.create({
      data: {
        zapId: zapId,
        metadata: metadata,
      },
    });

    producer.send({
      topic: topic_name,
      messages: [
        {
          value: JSON.stringify(metadata),
        },
      ],
    });
  });
  res.json({
    msg: "done",
  });
});

app.get("/", (req, res) => {
  res.send("ak");
});

app.listen(3000);
console.log("hello");
