import {describe, it, expect, beforeEach} from "@jest/globals";
import request from "supertest";
import app from "../../app";
import prisma from "../../config/prisma";

describe('POST /api/auth/register', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    it('should create a new user and return status 201', async() =>{
        const newUser = {
            name: "sid",
            email: "sid@gmail.com",
            password: "sid12345"
        };
        const response = await request(app).post('/api/auth/register')
        .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name", newUser.name);
        expect(response.body).toHaveProperty("email", newUser.email);
        expect(response.body).not.toHaveProperty("password");    
    });
    it("should reject duplicate email", async () => {
         const user = {
         name: "Sid",
         email: "sid@test.com",
         password: "123456",
     };

        await request(app)
        .post("/api/auth/register")
        .send(user);

        const response = await request(app)
        .post("/api/auth/register")
        .send(user);

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Email already exists");
    });

    it("should reject invalid email", async () => {
        const user = {
        name: "Sid",
        email: "invalid-email",
        password: "123456",
    };

         const response = await request(app)
        .post("/api/auth/register")
        .send(user);

         expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid email");
    });
    it("should reject empty name", async () => {
        const user = {
        name: "",
        email: "sid@test.com",
        password: "123456",
    };

        const response = await request(app)
        .post("/api/auth/register")
        .send(user);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Name is required");
    });
    
});