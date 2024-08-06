import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("ak");
});

app.listen(3000);
console.log("hello");
