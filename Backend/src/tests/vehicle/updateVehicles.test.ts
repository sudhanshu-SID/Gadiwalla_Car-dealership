import request from "supertest";
import app from "../../app";
import prisma from "../../config/prisma";
import {describe, it, expect, beforeEach} from "@jest/globals";

describe("Update Vehicle", () => {

    beforeEach(async () => {
        await prisma.vehicle.deleteMany();
        await prisma.user.deleteMany();
    });

    it("should update an existing vehicle", async () => {

        const user = {
            name: "Sid",
            email: "sid@test.com",
            password: "123456",
        };

        await request(app)
            .post("/api/auth/register")
            .send(user);

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
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
            .put(`/api/vehicles/${vehicleId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner Legender",
                year: 2025,
                category: "SUV",
                price: 4800000,
                quantity: 10,
            });

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            id: vehicleId,
            make: "Toyota",
            model: "Fortuner Legender",
            year: 2025,
            category: "SUV",
            price: 4800000,
            quantity: 10,
        });

    });

});