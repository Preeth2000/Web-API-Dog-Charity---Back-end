const request = require('supertest')
const app = require('../app')

describe('Post new message', () => {
  it('should create a new message', async () => {
    const res = await request(app.callback())
    .post('/api/v1/messages')
    .send({
      userID:"9",
      username:"unique_112233",
      title: 'Test_Title',
      paragraph: 'Test_Paragraph',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});

describe('Get all messages', () => {
  it('should get all messages', async () => {
    const res = await request(app.callback())
    .get('/api/v1/messages/test')
    expect(res.statusCode).toEqual(200)
  })
});

describe('Get new message by ID', () => {
  it('should get new message by its ID', async () => {
    const res = await request(app.callback())
    .get('/api/v1/messages/test/12')
    expect(res.statusCode).toEqual(200)
  })
});

describe('Update new message', () => {
  it('should update new message', async () => {
    const res = await request(app.callback())
    .put('/api/v1/messages/test/12')
    .send({
      paragraph:"Test_Paragraph_New"
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('updated', true)
  })
});

describe('Delete new message', () => {
  it('should delete new message ', async () => {
    const res = await request(app.callback())
    .delete('/api/v1/messages/test/12')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('deleted', true)
  })
});