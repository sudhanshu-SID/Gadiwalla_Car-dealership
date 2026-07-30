import request from "supertest";
import app from "../../app";
import {describe, it, expect, beforeEach} from "@jest/globals";
import prisma from "../../config/prisma";


describe("Create Vehicle", () => {

    beforeEach(async () => {
        await prisma.vehicle.deleteMany();
        await prisma.user.deleteMany();
    });

    it("should create a vehicle successfully", async () => {

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

        // Create vehicle
        const vehicle = {
            make: "Toyota",
            model: "Fortuner",
            year: 2024,
            category: "SUV",
            price: 4500000,
            quantity: 5,
        };

        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send(vehicle);

        expect(response.status).toBe(201);

        expect(response.body).toMatchObject(vehicle);

        expect(response.body.id).toBeDefined();

    });

});