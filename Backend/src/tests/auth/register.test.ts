import {describe, it, expect} from "@jest/globals";
import request from "supertest";
import app from "../../app";

describe('POST /api/auth/register', () => {
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
});