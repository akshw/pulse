import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
const client = new PrismaClient();

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const metadata = req.body.metadata;

  console.log(userId, zapId, metadata);

  await client.$transaction(async (tx) => {
    const run = await client.zapRun.create({
      data: {
        zapId: zapId,
        metadata: metadata,
      },
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
