import { Request, Response, NextFunction } from "express";

export const authorizeAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            message: "Access denied. Admin privileges required.",
        });
    }

    next();

};