import request from 'supertest';
import app from '../../src/app';

describe('SignUp', () => {
    const user = {
        name: "Cristiano Ronaldo",
        email: "cristiano@gmail.com",
        password: "cr7@T902"
    };
    it('should add a new user', async () => {
        const response = await request(app).post('/signUp').send(user)
        expect(response.statusCode).toBe(201);
    });
})