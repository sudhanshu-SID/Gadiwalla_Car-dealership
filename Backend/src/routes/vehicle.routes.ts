import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createVehicle ,getAllVehicles, getVehicleById, updateVehicle, deleteVehicle} from "../controllers/vehicle.controller";
import { authorizeAdmin } from "../middleware/authorizeAdmin";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createVehicle);
router.get("/", authenticate,getAllVehicles);
router.get("/:id", authenticate, getVehicleById);
router.put("/:id", authenticate, authorizeAdmin, updateVehicle);
router.delete("/:id", authenticate, authorizeAdmin, deleteVehicle);

export default router;