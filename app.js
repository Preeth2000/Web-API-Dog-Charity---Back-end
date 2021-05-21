const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

const users = require('./routes/users.js');
const dogs = require('./routes/dogs.js');
const favourites = require('./routes/favourites.js')
const messages = require ('./routes/messages.js')

app.use(users.routes());
app.use(dogs.routes());
app.use(favourites.routes());
app.use(messages.routes());

module.exports = app;
