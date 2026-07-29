import {describe, it, expect} from "@jest/globals";
import request from "supertest";
import app from "../../app";

describe('GET /health', () => {
    it('should return status 200 and status success message', async() =>{

        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({status: "success"});
    });
});