import prisma from "../config/prisma";

type CreateUserData = {
    name: string;
    email: string;
    password: string;
};
// Find user by email
export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};
// Create user
 export const createUser = async (userData: CreateUserData) => {
    return prisma.user.create({
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

