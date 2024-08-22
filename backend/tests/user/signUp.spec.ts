import request from 'supertest';
import app from '../../src/app';
import { User } from '../../src/models/user';
import { connection } from '../../src/database/connection';

describe('SignUp', () => {
    const testUser = {
        name: "Cristiano Ronaldo",
        email: "cristiano@gmail.com",
        password: "cr7@T902"
    };

    afterEach(async () => {
        // Remove todos os usuários que correspondem ao email do usuário de teste
        await User.destroy({ where: { email: testUser.email } });
    });

    afterAll(async () => {
        // Remove todos os usuários após todos os testes
        await User.destroy({ where: {} });
        await connection.close();
    });

    it('should add a new user with success', async () => {
        const response = await request(app).post('/signup').send(testUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('msg', 'User created with success');
    });

    it('should try to create a user with empty fields', async () => {
        const userWithEmptyFields = {
            name: "",
            email: "",
            password: ""
        };
        const response = await request(app).post('/signup').send(userWithEmptyFields);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Requisição inválida. Por favor, verifique os dados enviados.');
    });

    it('should try to create a user with name empty field', async () => {
        const userWithEmptyFields = {
            name: "",
            email: "hugo@gmail.com",
            password: "h71Tv2!"
        };
        const response = await request(app).post('/signup').send(userWithEmptyFields);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Requisição inválida. Por favor, verifique os dados enviados.');
    });

    it('should try to create a user with email empty field', async () => {
        const userWithEmptyFields = {
            name: "Hugo",
            email: "",
            password: "h71Tv2!"
        };
        const response = await request(app).post('/signup').send(userWithEmptyFields);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Requisição inválida. Por favor, verifique os dados enviados.');
    });

    it('should try to create a user with password empty field', async () => {
        const userWithEmptyFields = {
            name: "Hugo",
            email: "hugo@gmail.com",
            password: ""
        };
        const response = await request(app).post('/signup').send(userWithEmptyFields);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Requisição inválida. Por favor, verifique os dados enviados.');
    });


    it('should try to create a user with an email that already exists', async () => {
        // Envia os dados do usuário de teste
        await request(app).post('/signup').send(testUser);
        // Tenta criar outro usuário com o mesmo email
        const newUserWithExistingEmail = {
            name: "Gabriel",
            email: testUser.email,
            password: "g97&J3T2"
        };
        const response = await request(app).post('/signup').send(newUserWithExistingEmail);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Este email já está em uso.');
    });

    it('should create a user with a password that already exists', async () => {
        // Envia os dados de um usuário com uma senha específica
        const userWithSpecificPassword = {
            name: "Samara",
            email: "samara@gmail.com",
            password: "saH7%l32"
        };
        await request(app).post('/signup').send(userWithSpecificPassword);

        // Tenta criar outro usuário com a mesma senha, mas com email diferente
        const newUserWithExistingPassword = {
            name: "Gabriel",
            email: "gabriel@gmail.com",
            password: "saH7%l32"
        };
        const response = await request(app).post('/signup').send(newUserWithExistingPassword);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('msg', 'User created with success');
    });

    it('Should try to create a user with an invalid email', async () => {
        const user = {
            name: "Julia",
            email: "juliagmail.com",
            password: "g972J3T2"
        };        
        const response = await request(app).post('/signup').send(user);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'E-mail inválido, insira um e-mail que seja válido.');
    })
});
