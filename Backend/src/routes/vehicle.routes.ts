import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createVehicle ,getAllVehicles, getVehicleById, updateVehicle, deleteVehicle} from "../controllers/vehicle.controller";

const router = express.Router();

router.post("/", authenticate, createVehicle);
router.get("/", authenticate,getAllVehicles);
router.get("/:id", authenticate, getVehicleById);
router.put("/:id", authenticate, updateVehicle);
router.delete("/:id", authenticate, deleteVehicle);

export default router;