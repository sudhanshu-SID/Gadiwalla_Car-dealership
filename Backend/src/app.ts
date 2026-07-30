import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import authRouter from "./routes/auth.routes";
import dotenv from "dotenv";
import protectedRoutes from "./routes/protected.routes";
import vehicleRoutes from "./routes/vehicle.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(healthRouter);
app.use("/api/auth", authRouter);
app.use("/api", protectedRoutes);
app.use("/api/vehicles", vehicleRoutes);

export default app;