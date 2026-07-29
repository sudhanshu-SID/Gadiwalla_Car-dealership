import createUser, { findUserByEmail } from "../repositories/auth.repository";

type RegisterUserData = {
    name: string;
    email: string;
    password: string;
};

const registerUser = async (userData: RegisterUserData) => {

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    return createUser(userData);
};

export default registerUser;