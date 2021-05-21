/**
 * A module to run queries on the favourites table from the database
 * @module models/favourites
 * @author Preeth Selvamohan
 * @see sql_scripts/create_favourites for SQL definitions
 */
const db = require('../helpers/database');

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} User unique ID
 * @returns {object} mysqljs results object containing indexable rows
 */
//get a all dog IDs favourited by a single user ID 
exports.getById = async function getById (id) {
  const query = "SELECT * FROM favourites WHERE userID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} Dog entry unique ID
 * @returns {object} mysqljs results object containing indexable rows
 */
//get a all dog entries favourited by a single user I 
exports.getDogs = async function getDogs (id) {
  const query = "SELECT * FROM dogs WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} Dog entry id
 * @returns {object} mysqljs results object containing indexable rows added
 */
//add a new dog entry into favourites in the database
exports.addFavourite = async function addFavourite (body) {
  const query = "INSERT INTO favourites SET ?;";
  const values = [body];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} Dog entry unique ID
 * @returns {object} mysqljs results object containing indexable rows to be deleted
 */
//delete a dog entry from favourites by its id
exports.removeFavourite = async function removeFavourite (body) {
  const query = "DELETE FROM favourites WHERE ID = ? AND dogID = ?;";
  const values = [body];
  const data = await db.run_query(query, values);
  return data
}

