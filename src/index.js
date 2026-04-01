import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { matchRouter } from "./routes/matches.js";
import { attachWebSocketServer } from "./ws/server.js";

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.use("/matches", matchRouter);

const { broadcastMatchCreated } = attachWebSocketServer(server);

app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === "0.0.0.0"
      ? `http://localhost:${PORT}`
      : `http://${HOST}:${{ PORT }}`;
  console.log(`Server is running on: ${baseUrl}`);
  console.log(
    `Websocket Server is running on: ${baseUrl.replace("http", "ws")}/ws`,
  );
});
