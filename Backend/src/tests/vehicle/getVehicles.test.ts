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