import { authorizeAdmin } from "../../middleware/authorizeAdmin";
import {describe, it, beforeEach, expect, jest} from "@jest/globals";




describe("Authorize Admin Middleware", () => {

    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should allow admin users", () => {

        const req: any = {
            user: {
                role: "ADMIN",
            },
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        authorizeAdmin(req, res, next);

        expect(next).toHaveBeenCalled();

    });

    it("should deny non-admin users", () => {

        const req: any = {
            user: {
                role: "CUSTOMER",
            },
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        authorizeAdmin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);

    });

    it("should deny requests without user", () => {

        const req: any = {};

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        authorizeAdmin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);

    });

});