import express from "express";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
    "/protected",
    authenticate,
    (req, res) => {
        res.status(200).json({
            message: "Protected route accessed",
            user: req.user,
        });
    }
);

export default router;