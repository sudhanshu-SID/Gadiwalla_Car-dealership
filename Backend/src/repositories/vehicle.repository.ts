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

export const getVehicleById = async (id: number) => {
    return prisma.vehicle.findUnique({
        where: {
            id,
        },
    });
};

export const updateVehicle = async (
    id: number,
    vehicleData: {
        make: string;
        model: string;
        year: number;
        category: string;
        price: number;
        quantity: number;
    }
    ) => {

    return prisma.vehicle.update({
        where: {
            id,
        },
        data: vehicleData,
    });

};

export const deleteVehicle = async (id: number) => {

    return prisma.vehicle.delete({
        where: {
            id,
        },
    });

};
