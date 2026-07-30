import request from "supertest";
import app from "../../app";
import prisma from "../../config/prisma";
import jwt from "jsonwebtoken";
import {describe,it, expect,beforeEach,afterAll} from "@jest/globals";

describe("POST /api/vehicles/:id/restock Endpoint", () => {
    let adminToken: string;
    let customerToken: string;
    let vehicleId: number;

    beforeEach(async () => {
        await prisma.vehicle.deleteMany();
        await prisma.user.deleteMany();

        // Create Admin User
        const adminUser = await prisma.user.create({
            data: {
                name: "Admin User",
                email: "admin@gadiwalla.com",
                password: "hashedpassword",
                role: "ADMIN",
            },
        });

        // Create Customer User
        const customerUser = await prisma.user.create({
            data: {
                name: "Customer User",
                email: "customer@gadiwalla.com",
                password: "hashedpassword",
                role: "CUSTOMER",
            },
        });

        const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

        adminToken = jwt.sign(
            { id: adminUser.id, email: adminUser.email, role: adminUser.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        customerToken = jwt.sign(
            { id: customerUser.id, email: customerUser.email, role: customerUser.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Create Vehicle with quantity 2
        const vehicle = await prisma.vehicle.create({
            data: {
                make: "Porsche",
                model: "Taycan",
                year: 2024,
                category: "Electric",
                price: 150000,
                quantity: 2,
            },
        });

        vehicleId = vehicle.id;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should allow Admin to restock a vehicle and increment quantity", async () => {
        const response = await request(app)
            .post(`/api/vehicles/${vehicleId}/restock`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ amount: 3 });

        expect(response.status).toBe(200);
        expect(response.body.quantity).toBe(5);
    });

    it("should reject restock request from non-admin CUSTOMER role", async () => {
        const response = await request(app)
            .post(`/api/vehicles/${vehicleId}/restock`)
            .set("Authorization", `Bearer ${customerToken}`)
            .send({ amount: 1 });

        expect(response.status).toBe(403);
    });

    it("should return 404 if restocking non-existent vehicle", async () => {
        const response = await request(app)
            .post("/api/vehicles/999999/restock")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ amount: 1 });

        expect(response.status).toBe(404);
    });
});
