import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { matchRouter } from "./routes/matches.js";

const app = express();

app.use(express.json());

const PORT = 8000;

app.get("/health", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.use("/matches", matchRouter);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
