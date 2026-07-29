import express from "express";
import healthRouter from "./routes/health.routes"
import authRouter from "./routes/auth.routes"
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(healthRouter);
app.use("/api/auth", authRouter);

export default app;