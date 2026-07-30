import prisma from "../config/prisma";

export const createVehicle = async (vehicleData: {
    make: string;
    model: string;
    year: number;
    category: string;
    price: number;
    quantity: number;
}) => {
    return prisma.vehicle.create({
        data: vehicleData,
    });
};

export const getAllVehicles = async () => {
    return prisma.vehicle.findMany({
        orderBy: {
            id: "asc",
        },
    });
};