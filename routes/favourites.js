/**
 * A module to send CRUD operations on data stored on favourites dog entries
 * @module routes/favourites
 * @author Preeth Selvamohan
 */
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const auth = require('../controllers/auth');
const can = require('../permissions/favourites');

const favourites = require('../models/favourites');
const dogs = require('../models/dogs');

const prefix = '/api/v1/favourites';
const router = Router({prefix: prefix});

router.get('/:id([0-9]{1,})', getById);
router.post('/:id([0-9]{1,})', addFavourite);
router.del('/:id([0-9]{1,})', removeFavourite);

/**
 *Aynchronous function to get a favourited dog entry by its id
 *@params{int} Dog entry unique id
 *@returns{object[]} mysqljs results list of all entries
 */
async function getById(ctx) {
  const id = ctx.params.id;
  const result = await favourites.getById(id);
  const ids = result.map(result => result.dogID);
  ctx.body = ids;
  var arrayLength = ctx.body.length;
  var favouriteList = []
  for (var i = 0; i < arrayLength; i++) {
    const result2 = await favourites.getDogs(ctx.body[i]);
    favouriteList.push(result2[0])
  }
  ctx.body = favouriteList;
  ctx.status = 200;
}

/**
 *Aynchronous function to add a dog entry to favourites list
 *@params{object} Object containing a name, breed and imageURL(optional) input
 */
async function addFavourite(ctx) {
  const body = ctx.request.body;
  const result = await favourites.addFavourite(body);
  ctx.status = 201;
}

/**
 *Aynchronous function to delete a dog entry from favourites list
 *@params{int} Dog entry unique id
 */
async function removeFavourite(ctx) {
  const body = ctx.request.body;
  const result = await favourites.removeFavourite(body);
  ctx.status = 200;
}



module.exports = router;