import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    purchaseVehicle,
    restockVehicle,
    searchVehicles,
    deleteVehicle,
} from "../controllers/vehicle.controller";
import { authorizeAdmin } from "../middleware/authorizeAdmin";

const router = express.Router();

// Public routes for inventory browsing
router.get("/search", searchVehicles);
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);

// Protected routes for vehicle purchase (Authenticated Users)
router.patch("/:id/purchase", authenticate, purchaseVehicle);
router.post("/:id/purchase", authenticate, purchaseVehicle);

// Protected Admin-only routes for vehicle restock & inventory management
router.post("/:id/restock", authenticate, authorizeAdmin, restockVehicle);
router.post("/", authenticate, authorizeAdmin, createVehicle);
router.put("/:id", authenticate, authorizeAdmin, updateVehicle);
router.delete("/:id", authenticate, authorizeAdmin, deleteVehicle);

export default router;