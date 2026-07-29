import express from "express";
import healthRouter from "./routes/health.routes"
import authRouter from "./routes/auth.routes"
import dotenv from "dotenv";
import protectedRoutes from "./routes/protected.routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(healthRouter);
app.use("/api/auth", authRouter);
app.use("/api", protectedRoutes);

export default app;