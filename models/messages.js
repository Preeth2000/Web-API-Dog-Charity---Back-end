/**
 * A module to run queries on the messages table from the database
 * @module models/messages
 * @author Preeth Selvamohan
 * @see sql_scripts/create_messages for SQL definitions
 */
const db = require('../helpers/database');

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int|string} Format options for results
 * @returns {object} mysqljs results object containing indexable rows
 */
//list all the messages in the database
exports.getAll = async function getAll (page, limit, order) {
  const query = "SELECT * FROM messages;";
  const data = await db.run_query(query);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} User unique ID
 * @returns {object} mysqljs results object containing indexable rows
 */
//get all messages created by a single user  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM messages WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} Message entry unique ID
 * @returns {object} mysqljs results object containing indexable rows
 */
//Gets all messages by unique message ID
exports.getMessages = async function getMessages (id) {
  const query = "SELECT * FROM messages WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} Message entry data
 * @returns {object} mysqljs results object containing indexable rows added
 */
//create a new message entry in database
exports.add = async function add (message) {
  const query = "INSERT INTO messages SET ?";
  const data = await db.run_query(query, message);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} Message entry unique ID
 * @returns {object} mysqljs results object containing indexable rows to be deleted
 */
//delete a message by its ID
exports.delById = async function delById (id) {
  const query = "DELETE FROM messages WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} Message entry data
 * @param {int} Message entry unique ID
 * @returns {object} mysqljs results object containing indexable rows updated
 */
//update an existing message entry
exports.update = async function update (message) {
  const query = "UPDATE messages SET ? WHERE ID = ?;";
  const values = [message, message.ID];
  const data = await db.run_query(query, values);
  return data;
}

