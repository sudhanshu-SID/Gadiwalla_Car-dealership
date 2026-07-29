import prisma from "../config/prisma";

type CreateUserData = {
    name: string;
    email: string;
    password: string;
};

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

const createUser = async (userData: CreateUserData) => {
    return prisma.user.create({
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

export default createUser;