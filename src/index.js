import express from "express";

const app = express();

app.use(express.json());

const PORT = 8000;

app.get("/health", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
