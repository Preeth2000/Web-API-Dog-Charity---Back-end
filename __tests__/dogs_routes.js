const request = require('supertest')
const app = require('../app')
//CHANGE IDs IN ROUTES TO LAST ID IN TEST_DB dogs
describe('Post new dog entry', () => {
  it('should create a new entry for a dog', async () => {
    const res = await request(app.callback())
    .post('/api/v1/dogs/test')
    .send({
      name: 'test_dog',
      breed: 'test_breed',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});

describe('Get all dogs', () => {
  it('should get all dogs', async () => {
    const res = await request(app.callback())
    .get('/api/v1/dogs')
    expect(res.statusCode).toEqual(200)
  })
});

describe('Get new dog by ID', () => {
  it('should get new dog by their ID', async () => {
    const res = await request(app.callback())
    .get('/api/v1/dogs/37')
    expect(res.statusCode).toEqual(200)
  })
});

describe('Get new dog by name', () => {
  it('should get dog entries by their name', async () => {
    const res = await request(app.callback())
    .get('/api/v1/dogs/name')
    .send({
      name: 'test_dog'
    })
    expect(res.statusCode).toEqual(200)
  })
});

describe('Get new dog by breed', () => {
  it('should get dog entries by their breed', async () => {
    const res = await request(app.callback())
    .get('/api/v1/dogs/name')
    .send({
      breed: 'test_breed'
    })
    expect(res.statusCode).toEqual(200)
  })
});

describe('Update new dog entry', () => {
  it('should update new dog breed', async () => {
    const res = await request(app.callback())
    .put('/api/v1/dogs/test/37')
    .send({
      breed:"Pitbull"
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('updated', true)
  })
});

describe('Delete new dog entry', () => {
  it('should delete new dog ', async () => {
    const res = await request(app.callback())
    .delete('/api/v1/dogs/test/37')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('deleted', true)
  })
});