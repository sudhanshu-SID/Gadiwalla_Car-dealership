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

export const decrementVehicleQuantity = async (id: number) => {
    return prisma.vehicle.update({
        where: {
            id,
        },
        data: {
            quantity: {
                decrement: 1,
            },
        },
    });
};

export const incrementVehicleQuantity = async (id: number, amount: number = 1) => {
    return prisma.vehicle.update({
        where: {
            id,
        },
        data: {
            quantity: {
                increment: amount,
            },
        },
    });
};

export const searchVehicles = async (query?: string, category?: string) => {
    return prisma.vehicle.findMany({
        where: {
            AND: [
                query
                    ? {
                          OR: [
                              { make: { contains: query, mode: "insensitive" } },
                              { model: { contains: query, mode: "insensitive" } },
                              { category: { contains: query, mode: "insensitive" } },
                          ],
                      }
                    : {},
                category && category !== "ALL"
                    ? { category: { equals: category, mode: "insensitive" } }
                    : {},
            ],
        },
        orderBy: {
            id: "asc",
        },
    });
};

export const deleteVehicle = async (id: number) => {
    return prisma.vehicle.delete({
        where: {
            id,
        },
    });
};
