/**
 * A module to send CRUD operations on data stored on users
 * @module routes/users
 * @author Preeth Selvamohan
 * @see schemas/user for JSON Schema definition file
 */
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/users');
const auth = require('../controllers/auth');
const can = require('../permissions/users');
const {validateUser, validateUserUpdate} = require('../controllers/validation');

const prefix = '/api/v1/users'
const router = Router({prefix: prefix});

router.get('/', auth, getAll);
router.post('/', bodyParser(), validateUser, createUser);
router.post('/login', auth, login);
router.get('/:id([0-9]{1,})', auth, getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateUserUpdate, updateUser);
router.del('/:id([0-9]{1,})', auth, deleteUser);

router.get('/test', testGetAll);
router.get('/test/:id([0-9]{1,})', testGetById);
router.post('/test/login', testLogin);
router.put('/test/:id([0-9]{1,})', bodyParser(), validateUserUpdate, testUpdateUser);
router.del('/test/:id([0-9]{1,})', testDeleteUser);

/**
 * Asynchronous funtion to log in a user
 * @params{object} Object containing user id, username, email and URL(optional)
 * @returns{object} Object containing all user details excluding passwords
 */
async function login(ctx) {
  // return any details needed by the client
  const {ID, username, email, avatarURL} = ctx.state.user
  const links = {
    self: `${ctx.protocol}://${ctx.host}${prefix}/${ID}`
  }
  ctx.body = {ID, username, email, avatarURL, links};
  ctx.status = 201;
}

/**
 * Asynchronous function to get all User entries
 * @returns {object} mysqljs results objects containing indexable rows 
 */
async function getAll(ctx) {
  const permission = can.readAll(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const result = await model.getAll();
    if (result.length) {
      ctx.body = result;
      ctx.status = 201;
    }    
  }
}

/**
 *Aynchronous function to get a user entry by its id
 *@params{int} User unique id
 *@returns{object[]} mysqljs results object containing indexable rows 
 */
async function getById(ctx) {
  const id = ctx.params.id;
  const result = await model.getById(id);
  if (result.length) {
    const data = result[0]
    const permission = can.read(ctx.state.user, data);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      ctx.body = permission.filter(data);
    }
  }
}

/**
 *Aynchronous function to create a new user entry
 *@params{object} Object containing a username, password and email input
 *@returns{object} mysqljs results object(s) containing id, boolean and link to resource
 */
async function createUser(ctx) {
  const body = ctx.request.body;
  const id = ctx.params.id;
  const staffCode = ctx.params.staffCode;
  const result = await model.add(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}

/**
 *Aynchronous function to update a user entry
 *@params{object} Object containing a email(optional) and password(optional) input
 *@returns{object} mysqljs results object(s) containing id, boolean and link to resource
 */
async function updateUser(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);  // check it exists
  if (result.length) {
    let data = result[0];
    const permission = can.update(ctx.state.user, data);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      // exclude fields that should not be updated
      const newData = permission.filter(ctx.request.body);
      Object.assign(newData, {ID: id}); // overwrite updatable fields with body data
      result = await model.update(newData);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
}

/**
 *Aynchronous function to delete a user entry
 *@params{int} Users unique id
 *@returns{object} mysqljs results object(s) containing id and boolean
 */
async function deleteUser(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);
  if (result.length) {
    const data = result[0];
    console.log("trying to delete", data);
    const permission = can.delete(ctx.state.user, data);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      result = await model.delById(id);
      if (result.affectedRows) {
        ctx.body = {ID: id, deleted: true}
      }      
    }
  }
}


/**
 * Asynchronous function to get all User entries
 * Removed authentication for testing
 * Function only called in testing, never used in web API
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
 * Asynchronous funtion to log in a user
 * Removed authentication for testing
 * Function only called in testing, never used in web API
 * @params{object} Object containing user id, username, email and URL(optional)
 * @returns{object} Object containing all user details excluding passwords
 */
async function testLogin(ctx) {
  // return any details needed by the client
  const {ID, username, email, avatarURL} = ctx.state.user
  const links = {
    self: `${ctx.protocol}://${ctx.host}${prefix}/${ID}`
  }
  ctx.body = {ID, username, email, avatarURL, links};
  ctx.status = 200;
}

/**
 *Aynchronous function to update a user entry
 *Removed authentication for testing
 *Function only called in testing, never used in web API
 *@params{object} Object containing a email(optional) and password(optional) input
 *@returns{object} mysqljs results object(s) containing id, boolean and link to resource
 */
async function testUpdateUser(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);  // check it exists
  if (result.length) {
    let data = result[0];
    // exclude fields that should not be updated
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
 *Aynchronous function to get a user entry by its id
 *@params{int} User unique id
 *@returns{object[]} mysqljs results object containing indexable rows 
 */
async function testGetById(ctx) {
  const id = ctx.params.id;
  const result = await model.getById(id);
  if (result.length) {
    const data = result[0]
    ctx.body = data;
    ctx.status = 200;
  }
}

/**
 *Aynchronous function to delete a user entry
 *@params{int} Users unique id
 *@returns{object} mysqljs results object(s) containing id and boolean
 */
async function testDeleteUser(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);
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
