import prisma from "../config/prisma";

type CreateUserData = {
    name: string;
    email: string;
    password: string;
};

const createUser = async (userData: CreateUserData) => {
    return await prisma.user.create({
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

export default createUser;