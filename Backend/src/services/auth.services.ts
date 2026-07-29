import { createUser, findUserByEmail } from "../repositories/auth.repository";
import bcrypt from "bcrypt";
type RegisterUserData = {
    name: string;
    email: string;
    password: string;
};

export const registerUser = async (userData: RegisterUserData) => {

    // validate name
    if (!userData.name.trim()) {
        throw new Error("Name is required");
    }

    // Validate password
    if (!userData.password.trim()) {
        throw new Error("Password is required");
    }

    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email format
    if (!emailRegex.test(userData.email)) {
        throw new Error("Invalid email");
    }
    // Check if the email already exists in the database
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // return createUser(userData); 
    //instead of directly returning the password we return hashedPassword
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return createUser({
        ...userData,
        password: hashedPassword,
    });

};

export const loginUser = async (loginData: any) => {

    if(!loginData.email.trim()){
        throw new Error("Invalid email");
    }
    

    const existingUser = await findUserByEmail(loginData.email);

    if (!existingUser) {
        throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(
        loginData.password,
        existingUser.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid credentials");
    }

    return {
        message: "Login successful",
    };
};

