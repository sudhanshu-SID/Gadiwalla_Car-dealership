import request from "supertest";
import app from "../../app";
import {describe,it,expect } from "@jest/globals";

describe("Authentication Middleware", () => {

    it("should reject request without JWT token", async () => {

        const response = await request(app)
            .get("/api/protected");

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            message: "Access token required",
        });

    });

    it("should reject request with an invalid JWT token", async () => {

    const response = await request(app)
        .get("/api/protected")
        .set("Authorization", "Bearer invalid_token");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
        message: "Invalid token",
    });

  });

    it("should allow request with a valid JWT token", async () => {

    const user = {
        name: "Sid",
        email: "sid@test.com",
        password: "123456",
    };

    // Register user
    await request(app)
        .post("/api/auth/register")
        .send(user);

    // Login to get JWT
    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
            email: user.email,
            password: user.password,
        });

    const token = loginResponse.body.token;

    const response = await request(app)
        .get("/api/protected")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Protected route accessed");

});

    it("should attach decoded user information to the request", async () => {

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

    const response = await request(app)
        .get("/api/protected")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.user).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.role).toBe("CUSTOMER");

});

});