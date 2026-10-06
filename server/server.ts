import "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import addressRouter from "./routes/addressRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import dpRouter from "./routes/dpRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live!");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/orders", orderRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/admin", adminRouter);
app.use("/api/delivery", dpRouter);
app.use("/api/inngest", serve({ client: inngest, functions }));

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
