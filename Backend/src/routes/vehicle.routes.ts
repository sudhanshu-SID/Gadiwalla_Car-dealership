import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createVehicle ,getAllVehicles, getVehicleById,} from "../controllers/vehicle.controller";

const router = express.Router();

router.post("/", authenticate, createVehicle);
router.get("/", authenticate,getAllVehicles);
router.get("/:id", authenticate, getVehicleById);

export default router;