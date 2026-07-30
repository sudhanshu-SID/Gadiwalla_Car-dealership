import { Request, Response } from "express";
import { createVehicle as createVehicleService, getAllVehicles as getAllVehiclesService,} from "../services/vehicle.services";

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