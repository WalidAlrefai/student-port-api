'use strict';
process.env.SECRET = 'walid' || process.env.SECRET;
const supertest = require('supertest');
const server = require('../src/server');
const { db } = require('../src/models/index.js');
const mockRequest = supertest(server.app);
console.log(mockRequest);
let id;
let users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    editor: { username: 'editor', password: 'password', role: 'editor' },
    student: { username: 'student', password: 'password', role: 'student' },
};
beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('users Test', () => {
    Object.keys(users).forEach(user => {
        describe(`${user} users`, () => {
            it.skip('get all records', async () => {
                let Auth = await mockRequest.post('/signin').auth(users[user].username,users[user].password);
                let  token = Auth.body.token;
                const response = await mockRequest.get('/users').set('Authorization', `Bearer ${token}`)
                expect(response.status).toEqual(200)
            });
            it.skip('get one record', async () => {
                const register = await mockRequest.post('/signin').auth(users[user].username, users[user].password);
                const token = register.body.token;
                const response = await mockRequest.get(`/users/${id}`).set('Authorization', `Bearer ${token}`);
                expect(response.status).toBe(200);
            });
            it.skip('update record', async () => {
                const register = await mockRequest.post('/signin').auth(users[user].username, users[user].password);
                const token = register.body.token;
                
                const response = await mockRequest.put(`/users/${id}`).send({
                    firstName:"test",
                    lastName:"test"
                }).set("Authorization", `Bearer ${token}`);
                if (user == 'student'||user == 'admin') {
                    expect(response.status).toBe(201);
                } else {
                    expect(response.status).toBe(500);
                }
            });
            it.skip('delete record', async () => {
                const register = await mockRequest.post('/signin').auth(users[user].username, users[user].password);
                const token = register.body.token;
                const response = await mockRequest.delete('/users/1').set('Authorization', `Bearer ${token}`);
                if (users[user].role === 'admin') {
                    expect(response.status).toBe(204);
                } else {
                    expect(response.status).not.toBe(204);
                }
            });
        });
    });
});