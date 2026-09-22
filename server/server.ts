import "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live!");
});

app.listen(port, () => {
  console.log(`Server is running on port at http://localhost:${port}`);
});
