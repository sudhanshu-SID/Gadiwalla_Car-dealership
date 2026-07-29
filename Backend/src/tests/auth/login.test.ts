import app from "../../app";
import request from "supertest";
import prisma from "../../config/prisma";
import {describe, it, beforeEach, expect} from "@jest/globals";

describe("POST /api/auth/login", () => {

    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    it("should login with valid credentials", async () => {

        const user = {
            name: "Sid",
            email: "sid@test.com",
            password: "123456",
        };

        await request(app)
            .post("/api/auth/register")
            .send(user);

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            message: "Login successful",
        });

    });

});