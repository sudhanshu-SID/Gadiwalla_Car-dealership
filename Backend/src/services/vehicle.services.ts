import { createVehicle as createVehicleRepository } from "../repositories/vehicle.repository";
import { getAllVehicles as getAllVehiclesRepository } from "../repositories/vehicle.repository";
import { getVehicleById as getVehicleByIdRepository } from "../repositories/vehicle.repository";
import { updateVehicle as updateVehicleRepository } from "../repositories/vehicle.repository";
import { decrementVehicleQuantity as decrementVehicleQuantityRepository } from "../repositories/vehicle.repository";
import { incrementVehicleQuantity as incrementVehicleQuantityRepository } from "../repositories/vehicle.repository";
import { searchVehicles as searchVehiclesRepository } from "../repositories/vehicle.repository";
import { deleteVehicle as deleteVehicleRepository } from "../repositories/vehicle.repository";

export interface CreateVehicleData {
    make: string;
    model: string;
    year: number;
    category: string;
    price: number;
    quantity: number;
}

export const createVehicle = async (
    vehicleData: CreateVehicleData
) => {
    return await createVehicleRepository(vehicleData);
};

export const getAllVehicles = async () => {
    return await getAllVehiclesRepository();
};

export const getVehicleById = async (id: number) => {
    return await getVehicleByIdRepository(id);
};

export const updateVehicle = async (
    id: number,
    vehicleData: CreateVehicleData
) => {
    return await updateVehicleRepository(id, vehicleData);
};

export const purchaseVehicle = async (id: number) => {
    const vehicle = await getVehicleByIdRepository(id);

    if (!vehicle) {
        return { error: "NOT_FOUND", message: "Vehicle not found" };
    }

    if (vehicle.quantity <= 0) {
        return { error: "OUT_OF_STOCK", message: "Vehicle is out of stock" };
    }

    const updated = await decrementVehicleQuantityRepository(id);
    return { vehicle: updated };
};

export const restockVehicle = async (id: number, amount: number = 1) => {
    const vehicle = await getVehicleByIdRepository(id);

    if (!vehicle) {
        return { error: "NOT_FOUND", message: "Vehicle not found" };
    }

    const updated = await incrementVehicleQuantityRepository(id, amount);
    return { vehicle: updated };
};

export const searchVehicles = async (query?: string, category?: string) => {
    return await searchVehiclesRepository(query, category);
};

export const deleteVehicle = async (id: number) => {
    return await deleteVehicleRepository(id);
};