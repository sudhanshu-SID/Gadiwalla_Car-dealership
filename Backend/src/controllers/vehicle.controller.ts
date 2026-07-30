import { Request, Response } from "express";
import { createVehicle as createVehicleService, getAllVehicles as getAllVehiclesService, getVehicleById as getVehicleByIdService, updateVehicle as updateVehicleService, deleteVehicle as deleteVehicleService,} from "../services/vehicle.services";

export const createVehicle = async (
    req: Request,
    res: Response
) => {

    try {

        const vehicle = await createVehicleService(req.body);

        return res.status(201).json(vehicle);

    } catch {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};

 export const getAllVehicles = async (
    req: Request,
    res: Response
 ) => {

    try {

        const vehicles = await getAllVehiclesService();

        return res.status(200).json(vehicles);

    } catch {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};

 export const getVehicleById = async (
    req: Request,
    res: Response
    ) => {

    try {

        const id = Number(req.params.id);

        const vehicle = await getVehicleByIdService(id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found",
            });
        }

        return res.status(200).json(vehicle);

        } catch {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};

export const updateVehicle = async (
    req: Request,
    res: Response
    ) => {

    try {

        const id = Number(req.params.id);

        const vehicle = await updateVehicleService(id, req.body);

        return res.status(200).json(vehicle);

    } catch {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};

 export const deleteVehicle = async (
    req: Request,
    res: Response
    ) => {

    try {

        const id = Number(req.params.id);

        await deleteVehicleService(id);

        return res.status(200).json({
            message: "Vehicle deleted successfully",
        });

    } catch {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};