const request = require('supertest')
const app = require('../app')
//CHANGE IDs IN ROUTES TO LAST ID IN TEST_DB users
describe('Post new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
    .post('/api/v1/users')
    .send({
      username: 'unique_112233',
      password: 'password',
      email: 'unique_email@example.com',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});

describe('Get all users', () => {
  it('should get all users', async () => {
    const res = await request(app.callback())
    .get('/api/v1/users/test')
    expect(res.statusCode).toEqual(200)
  })
});

describe('Get new user by ID', () => {
  it('should get new user by their ID', async () => {
    const res = await request(app.callback())
    .get('/api/v1/users/test/21')
    expect(res.statusCode).toEqual(200)
  })
});

describe('Update new user', () => {
  it('should update new user email', async () => {
    const res = await request(app.callback())
    .put('/api/v1/users/test/21')
    .send({
      email: 'unique_email777@example.com'
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('updated', true)
  })
});

describe('Delete new user', () => {
  it('should delete new user ', async () => {
    const res = await request(app.callback())
    .delete('/api/v1/users/test/21')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('deleted', true)
  })
});

/*
describe('Login new user', () => {
  it('should log in a new user', async () => {
    const res = await request(app.callback())
    .post('/api/v1/users/test/login')
    .send({
      id:"13",
      username: 'unique_112233',
      password: 'password',
      email: 'unique_email@example.com'
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});
*/





