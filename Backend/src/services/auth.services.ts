import createUser from "../repositories/auth.repository";

type RegisterUserData = {
    name: string;
    email: string;
    password: string;
};

const registerUser = async (userData: RegisterUserData) => {
    return await createUser(userData);
};

export default registerUser;