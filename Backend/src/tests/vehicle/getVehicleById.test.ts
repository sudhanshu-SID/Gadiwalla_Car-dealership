import request from "supertest";
import app from "../../app";
import prisma from "../../config/prisma";
import {describe, it, expect, beforeEach} from "@jest/globals";

describe("Get Vehicle By ID", () => {

    beforeEach(async () => {
        await prisma.vehicle.deleteMany();
        await prisma.user.deleteMany();
    });

    it("should return a vehicle by its id", async () => {

        const admin = {
            name: "Admin",
            email: "admin@test.com",
            password: "admin123",
            role: "ADMIN",
        };

        await prisma.user.create({
            data: {
                ...admin,
                password: await require("bcrypt").hash(admin.password, 10),
            },
        });

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: admin.email,
                password: admin.password,
            });

        const token = loginResponse.body.token;

        const createResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                year: 2024,
                category: "SUV",
                price: 4500000,
                quantity: 5,
            });

        const vehicleId = createResponse.body.id;

        const response = await request(app)
            .get(`/api/vehicles/${vehicleId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            id: vehicleId,
            make: "Toyota",
            model: "Fortuner",
            year: 2024,
            category: "SUV",
            price: 4500000,
            quantity: 5,
        });

    });

});