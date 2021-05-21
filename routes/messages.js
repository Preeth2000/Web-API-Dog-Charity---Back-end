/**
 * A module to send CRUD operations on data stored on messages
 * @module routes/messages
 * @author Preeth Selvamohan
 * @see schemas/messages for JSON Schema definition file
 */
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/messages');
const auth = require('../controllers/auth');
const can = require('../permissions/messages');
const {validateMessage, validateMessageUpdate} = require('../controllers/validation');

const prefix = '/api/v1/messages'
const router = Router({prefix: prefix});

router.get('/', auth, getAll);
router.post('/', bodyParser(), validateMessage, createMessage);
router.get('/:id([0-9]{1,})', auth, getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateMessageUpdate, updateMessage);
router.del('/:id([0-9]{1,})', auth, deleteMessage);

router.get('/test', testGetAll);
router.get('/test/:id([0-9]{1,})', getById);
router.put('/test/:id([0-9]{1,})', bodyParser(), validateMessageUpdate, testUpdateMessage);
router.del('/test/:id([0-9]{1,})', testDeleteMessage);

/**
 * Asynchronous function to get all message entries
 * @params {int} Unique user id used to find all messages by user unless user role is staff or admin
 * @returns {object} mysqljs results objects containing indexable rows 
 */
async function getAll(ctx) {
  const permission = can.readAll(ctx.state.user);
  const permission2 = can.read(ctx.state.user)
  if (!permission.granted) {
    if(!permission2.granted){
      ctx.status = 403;
    } else{
      const result = await model.getById();
      if (result.length) {
        ctx.body = result;
        ctx.status = 200;
      }
    }
  } else {
    const result = await model.getAll();
    if (result.length) {
      ctx.body = result;
      ctx.status = 200;
    }    
  }
}

/**
 *Aynchronous function to get a message entry by users id
 *@params{int} User unique id
 *@returns{object[]} mysqljs results object containing indexable rows 
 */
async function getById(ctx) {
  const id = ctx.params.id;
  const result = await model.getById(id);
  const ids = result.map(result => result.ID);
  ctx.body = ids;
  var arrayLength = ctx.body.length;
  var messageList = []
  for (var i = 0; i < arrayLength; i++) {
    const result2 = await model.getMessages(ctx.body[i]);
    messageList.push(result2[0])
  }
  ctx.body = messageList;
  ctx.status = 200;
}

/**
 *Aynchronous function to create a new message
 *@params{object} Object containing a title and message content input
 *@returns{object} Object containing user id, boolean an link to resource
 */
async function createMessage(ctx) {
  const body = ctx.request.body;
  const id = ctx.params.id;
  const result = await model.add(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}

/**
 *Aynchronous function to update a message entry
 *@params{object} Object containing a title(optional) and content(optional) input
 *@returns{object} mysqljs results object(s) containing id and link to resource
 */
async function updateMessage(ctx) {
  const id = ctx.params.id;
  let result = await model.getMessages(id);  // check it exists
  if (result.length) {
    let data = result[0];
    const permission = can.update(ctx.state.user, data);
    const permission2 = can.updateAny(ctx.state.user, data);

    if (permission.granted || permission2.granted) {
      // exclude fields that should not be updated
      const newData = permission.filter(ctx.request.body);
      Object.assign(newData, {ID: id}); // overwrite updatable fields with body data
      result = await model.update(newData);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
        ctx.status = 200;
      }
    } else {
      ctx.status = 403;
    } 
  }
}

/**
 *Aynchronous function to delete a message entry
 *@params{int} Message entry unique id
 *@returns{object} mysqljs results object(s) containing id and boolean
 */
async function deleteMessage(ctx) {
  const id = ctx.params.id;
  let result = await model.getMessages(id);
  if (result.length) {
    const data = result[0];
    console.log("trying to delete", data);
    const permission = can.delete(ctx.state.user, data);
    const permission2 = can.deleteAny(ctx.state.user, data);
    
    if (permission.granted || permission2.granted) {
      result = await model.delById(id);
      if (result.affectedRows) {
        ctx.body = {ID: id, deleted: true}
        ctx.status = 200;
      }
    } else {
      ctx.status = 403;      
    }
  }
}

/**
 * Asynchronous function to get all message entries
 * *Removed authentication for testing
 *Function only called in testing, never used in web API
 * @params {int} Unique user id used to find all messages by user unless user role is staff or admin
 * @returns {object} mysqljs results objects containing indexable rows 
 */
async function testGetAll(ctx) {
  const result = await model.getAll();
    if (result.length) {
      ctx.body = result;
      ctx.status = 200;
    }
}

/**
 *Aynchronous function to update a message entry
 *Removed authentication for testing
 *Function only called in testing, never used in web API
 *@params{object} Object containing a title(optional) and content(optional) input
 *@returns{object} mysqljs results object(s) containing id and link to resource
 */
async function testUpdateMessage(ctx) {
  const id = ctx.params.id;
  let result = await model.getMessages(id);  // check it exists
  if (result.length) {
    let data = result[0];
    const newData = ctx.request.body;
      Object.assign(newData, {ID: id}); // overwrite updatable fields with body data
      result = await model.update(newData);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
        ctx.status = 200;
      }
  }
}

/**
 *Aynchronous function to delete a message entry
 *Removed authentication for testing
 *Function only called in testing, never used in web API
 *@params{int} Message entry unique id
 *@returns{object} mysqljs results object(s) containing id and boolean
 */
async function testDeleteMessage(ctx) {
  const id = ctx.params.id;
  let result = await model.getMessages(id);
  if (result.length) {
    const data = result[0];
    console.log("trying to delete", data);
    result = await model.delById(id);
      if (result.affectedRows) {
        ctx.body = {ID: id, deleted: true}
        ctx.status = 200;
      }
  }
}

module.exports = router;
