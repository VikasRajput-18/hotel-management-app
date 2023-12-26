import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import mongoose, { ConnectOptions } from "mongoose";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is listing on http://localhost:${PORT}`);
});
