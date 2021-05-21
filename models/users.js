/**
 * A module to run queries on the users table from the database
 * @module models/users
 * @author Preeth Selvamohan
 * @see sql_scripts/create_users for SQL definitions
 */
const db = require('../helpers/database');
const bcrypt = require('bcrypt');

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} User unique ID
 * @returns {object} mysqljs results object containing indexable rows
 */
//get a single user by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM users WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {string} User username
 * @returns {object} mysqljs results object containing indexable rows
 */
//get a single user by the (unique) username
exports.findByUsername = async function getByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?;";
  const user = await db.run_query(query, username);
  return user;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int|string} Format options for results
 * @returns {object} mysqljs results object containing indexable rows
 */
//list all the users in the database
exports.getAll = async function getAll (page, limit, order) {
  const query = "SELECT * FROM users;";
  const data = await db.run_query(query);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} User data
 * @returns {object} mysqljs results object containing indexable rows added
 */
//create a new user in the database
exports.add = async function add (user) {
  const query = "INSERT INTO users SET ?";
  const password = user.password;
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  const data = await db.run_query(query, user);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} User unique ID
 * @returns {object} mysqljs results object containing indexable rows to be deleted
 */
//delete a user by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM users WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} User entry data
 * @param {int} User entry unique ID
 * @returns {object} mysqljs results object containing indexable rows updated
 */
//update an existing user
exports.update = async function update (user) {
  const query = "UPDATE users SET ? WHERE ID = ?;";
  if (user.password) {
    const password = user.password;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;  
  }
  const values = [user, user.ID];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} User role data
 * @param {int} User unique ID
 * @returns {object} mysqljs results object containing indexable rows updated
 */
exports.setStaff = async function setStaff (user) {
  const query = "UPDATE users SET role TO staff WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}