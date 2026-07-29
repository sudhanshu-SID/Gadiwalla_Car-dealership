import { Request, Response } from "express";
import {registerUser, loginUser} from "../services/auth.services";

//user register controller
export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json(user);

    } catch (error: any) {
        // Handle name validation error
        if (error.message === "Name is required") {
        return res.status(400).json({
        message: error.message,
     });
    }
        // Handle password validation error
        if(error.message === "Password is required") {
            return res.status(400).json({
                message: error.message,
            });
        }
        
        // Handle invalid email error
        if(error.message === "Invalid email") {
            return res.status(400).json({
                message: error.message,
            });
        }
        // Handle duplicate email error
        if (error.message === "Email already exists") {
            return res.status(409).json({
                message: error.message,
            });
        }
        
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
    //user login controller
   export const login = async (req: any, res: any) => {
      try {

        const response = await loginUser(req.body);

        return res.status(200).json(response);

      } catch (error: any) {

        if (error.message === "Invalid credentials") {
            return res.status(401).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

