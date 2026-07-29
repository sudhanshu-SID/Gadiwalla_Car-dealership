import { Request, Response } from "express";
import registerUser from "../services/auth.services";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json(user);

    } catch (error: any) {

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

export default register;