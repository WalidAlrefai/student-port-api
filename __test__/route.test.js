'use strict';

process.env.SECRET = "walid" || process.env.SECRET;

const supertest = require('supertest');
const server = require('../src/server.js').app;
const { db } = require('../src/models/index.js');

const mockRequest = supertest(server);

let users = {
    admin: { id:0, username: 'admin', password: 'password' },
    editor: { id:1, username: 'editor', password: 'password' },
    user: { id:3,username: 'user', password: 'password' },
};

beforeAll(async () => {
    await db.sync();

});
afterAll(async () => {
    await db.drop();

});


describe('Auth Router', () => {
    Object.keys(users).forEach(userType => {
        describe(`${userType} users`, () => {
            it('can create one', async () => {
                const response = await mockRequest.post('/signup').send(users[userType]);
                const userObject = response.body;
                expect(response.status).toBe(201);
                expect(userObject.token).toBeDefined();
                expect(userObject.id).toBeDefined();
                expect(userObject.username).toEqual(users[userType].username)
            });
            it('can signin with basic', async () => {
                const response = await mockRequest.post('/signin')
                    .auth(users[userType].username, users[userType].password);
                const userObject = response.body;
                expect(response.status).toBe(200);
                expect(userObject.token).toBeDefined();
                expect(userObject.id).toBeDefined();
                expect(userObject.username).toEqual(users[userType].username)
            });
        });
        describe('bad logins', () => {
            it('basic fails with known user and wrong password ', async () => {
                const response = await mockRequest.post('/signin')
                    .auth('admin', 'xyz')
                const userObject = response.body;
                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined();
            });
            it('basic fails with unknown user', async () => {
                const response = await mockRequest.post('/signin')
                    .auth('nobody', 'xyz')
                const userObject = response.body;
                console.log(typeof response.status)
                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined()
                
            });
        })
    });
});