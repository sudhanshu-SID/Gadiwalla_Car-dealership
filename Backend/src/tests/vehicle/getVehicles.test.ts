import request from "supertest";
import app from "../../app";
import { describe, it, expect, beforeEach} from "@jest/globals";
import prisma from "../../config/prisma";


beforeEach(async () => {
    await prisma.vehicle.deleteMany();
    await prisma.user.deleteMany();
});

describe("Get All Vehicles", () => {

    it("should return all vehicles", async () => {

        // Register user
        const user = {
            name: "Sid",
            email: "sid@test.com",
            password: "123456",
        };

        await request(app)
            .post("/api/auth/register")
            .send(user);

        // Login
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            });

        const token = loginResponse.body.token;

        // Create vehicles
        await request(app)
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

        await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Honda",
                model: "City",
                year: 2023,
                category: "Sedan",
                price: 1800000,
                quantity: 3,
            });

        // Fetch all vehicles
        const response = await request(app)
            .get("/api/vehicles")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);

        expect(response.body[0]).toMatchObject({
            make: "Toyota",
            model: "Fortuner",
        });

        expect(response.body[1]).toMatchObject({
            make: "Honda",
            model: "City",
        });

    });

});