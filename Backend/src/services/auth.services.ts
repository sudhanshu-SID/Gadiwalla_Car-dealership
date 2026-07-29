import createUser, { findUserByEmail } from "../repositories/auth.repository";

type RegisterUserData = {
    name: string;
    email: string;
    password: string;
};

const registerUser = async (userData: RegisterUserData) => {
    
    // validate name
    if(!userData.name.trim()) {
        throw new Error("Name is required");
   }
   
   // Validate password
    if(!userData.password.trim()){
        throw new Error("Password is required");
    }

    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email format
    if(!emailRegex.test(userData.email)) {
        throw new Error("Invalid email");
    }
    // Check if the email already exists in the database
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    return createUser(userData);
};

export default registerUser;