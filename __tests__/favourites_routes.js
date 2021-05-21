const request = require('supertest')
const app = require('../app')


describe('Get favourites list by user ID', () => {
  it('should get all favourited dogs by the user ID', async () => {
    const res = await request(app.callback())
    .get('/api/v1/favourites/11')
    expect(res.statusCode).toEqual(200)
  })
});

/*
describe('Add to favourites list', () => {
  it('should add a dog to the users favourite list', async () => {
    const res = await request(app.callback())
    .post('/api/v1/favourites/11')
    .send({
      userID:"12",
      dogID:"10"
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});
*/

/*
describe('Delete from favourites list', () => {
  it('should delete a dog entry from the users favourite list ', async () => {
    const res = await request(app.callback())
    .delete('/api/v1/favourites/11')
    .send({
      ID:"11",
      dogID:"11"
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('deleted', true)
  })
});
*/