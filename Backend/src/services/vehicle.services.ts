import { createVehicle as createVehicleRepository } from "../repositories/vehicle.repository";
import { getAllVehicles as getAllVehiclesRepository } from "../repositories/vehicle.repository";
import { getVehicleById as getVehicleByIdRepository } from "../repositories/vehicle.repository";
import { updateVehicle as updateVehicleRepository } from "../repositories/vehicle.repository";


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
    vehicleData: CreateVehicleData ) => {

    return await updateVehicleRepository(id, vehicleData);

};