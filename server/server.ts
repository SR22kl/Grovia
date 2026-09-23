import "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live!");
});

app.use("/api/aut", authRouter);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port at http://localhost:${port}`);
});
