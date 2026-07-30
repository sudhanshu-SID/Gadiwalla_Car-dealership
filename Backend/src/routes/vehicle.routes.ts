import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createVehicle ,getAllVehicles} from "../controllers/vehicle.controller";

const router = express.Router();

router.post("/", authenticate, createVehicle);
router.get("/", authenticate,getAllVehicles);

export default router;