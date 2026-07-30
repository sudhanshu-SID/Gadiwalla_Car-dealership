import request from "supertest";
import app from "../../app";
import prisma from "../../config/prisma";
import {describe, it, expect, beforeEach} from "@jest/globals";

describe("Delete Vehicle", () => {

    beforeEach(async () => {
        await prisma.vehicle.deleteMany();
        await prisma.user.deleteMany();
    });

    it("should delete a vehicle successfully", async () => {

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
            .delete(`/api/vehicles/${vehicleId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            message: "Vehicle deleted successfully",
        });

        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id: vehicleId,
            },
        });

        expect(vehicle).toBeNull();

    });

});