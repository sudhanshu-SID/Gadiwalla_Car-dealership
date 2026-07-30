import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Access token required",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access token required",
        });
    }
    // try {
    //     jwt.verify(
    //         token,
    //         process.env.JWT_SECRET as string,
    //     );
    //     next();
    // } catch {
    //     return res.status(401).json({
    //         message: "Invalid token",
    //     });
    // }
    try {

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
    );

    req.user = decoded as NonNullable<Express.Request["user"]>;

    next();

} catch {

    return res.status(401).json({
        message: "Invalid token",
    });

}
};