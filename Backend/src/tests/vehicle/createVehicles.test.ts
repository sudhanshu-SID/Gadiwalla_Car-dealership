import request from "supertest";
import app from "../../app";
import {describe, it, expect, beforeEach} from "@jest/globals"

describe("Create Vehicle", () => {

    it("should create a vehicle successfully", async () => {

        // Register
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