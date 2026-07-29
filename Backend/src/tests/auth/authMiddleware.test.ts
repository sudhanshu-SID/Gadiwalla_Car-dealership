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

});