import request from "supertest";
import app from "../../app";
import { describe, it, expect, beforeEach } from "@jest/globals";
import prisma from "../../config/prisma";
import bcrypt from "bcrypt";

beforeEach(async () => {
    await prisma.vehicle.deleteMany();
    await prisma.user.deleteMany();
});

describe("Purchase Vehicle Endpoint (PATCH /api/vehicles/:id/purchase)", () => {
    it("should successfully purchase a vehicle and decrement quantity by 1", async () => {
        const user = {
            name: "Test Customer",
            email: "customer@test.com",
            password: "customer123",
            role: "CUSTOMER",
        };

        await prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10),
            },
        });

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        const token = loginResponse.body.token;

        const createdVehicle = await prisma.vehicle.create({
            data: {
                make: "Tesla",
                model: "Model S",
                year: 2025,
                category: "Electric",
                price: 100000,
                quantity: 5,
            },
        });

        const response = await request(app)
            .patch(`/api/vehicles/${createdVehicle.id}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.quantity).toBe(4);

        const updatedInDb = await prisma.vehicle.findUnique({
            where: { id: createdVehicle.id },
        });

        expect(updatedInDb?.quantity).toBe(4);
    });

    it("should decrement quantity to 0 when last vehicle is purchased", async () => {
        const user = {
            name: "Test Customer",
            email: "customer2@test.com",
            password: "customer123",
            role: "CUSTOMER",
        };

        await prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10),
            },
        });

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        const token = loginResponse.body.token;

        const createdVehicle = await prisma.vehicle.create({
            data: {
                make: "Porsche",
                model: "Taycan",
                year: 2024,
                category: "Electric",
                price: 150000,
                quantity: 1,
            },
        });

        const response = await request(app)
            .patch(`/api/vehicles/${createdVehicle.id}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.quantity).toBe(0);
    });

    it("should return 400 error when attempting to purchase a vehicle with 0 quantity", async () => {
        const user = {
            name: "Test Customer",
            email: "customer3@test.com",
            password: "customer123",
            role: "CUSTOMER",
        };

        await prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10),
            },
        });

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        const token = loginResponse.body.token;

        const createdVehicle = await prisma.vehicle.create({
            data: {
                make: "BMW",
                model: "i7",
                year: 2024,
                category: "Sedan",
                price: 120000,
                quantity: 0,
            },
        });

        const response = await request(app)
            .patch(`/api/vehicles/${createdVehicle.id}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Vehicle is out of stock");
    });

    it("should return 404 error when purchasing a non-existent vehicle", async () => {
        const user = {
            name: "Test Customer",
            email: "customer4@test.com",
            password: "customer123",
            role: "CUSTOMER",
        };

        await prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10),
            },
        });

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        const token = loginResponse.body.token;

        const response = await request(app)
            .patch("/api/vehicles/999999/purchase")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Vehicle not found");
    });
});
