/**
 * A module to run queries on the dogs table from the database
 * @module models/dogs
 * @author Preeth Selvamohan
 * @see sql_scripts/create_dogs for SQL definitions
 */
const db = require('../helpers/database');

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} Dog entry unique ID
 * @returns {object} mysqljs results object containing indexable rows
 */
//get a single dog by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM dogs WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int|string} Format options for results
 * @returns {object} mysqljs results object containing indexable rows
 */
//list all the dogs in the database
exports.getAll = async function getAll (page, limit, order, direction) {
  const offset = (page - 1) * limit;
  let query;
  if (direction === 'DESC') {
    query = "SELECT * FROM dogs ORDER BY ?? DESC LIMIT ? OFFSET ?;";
  } else {
    query = "SELECT * FROM dogs ORDER BY ?? ASC LIMIT ? OFFSET ?;";    
  }
  const values = [order, parseInt(limit), parseInt(offset)];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} Dog entry data
 * @returns {object} mysqljs results object containing indexable rows added
 */
//create a new dog entry in the database
exports.add = async function add (dog) {
  const query = "INSERT INTO dogs SET ?";
  const data = await db.run_query(query, dog);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {int} Dog entry unique ID
 * @returns {object} mysqljs results object containing indexable rows to be deleted
 */
//delete a dog entry by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM dogs WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {object} Dog entry data
 * @param {int} Dog entry unique ID
 * @returns {object} mysqljs results object containing indexable rows updated
 */
//update an existing dog entry
exports.update = async function update (dog) {
  const query = "UPDATE dogs SET ? WHERE ID = ?;";
  const values = [dog, dog.ID];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {string} Dog entry name
 * @returns {object} mysqljs results object containing indexable rows
 */
//find a specific dog entry by name
exports.getByName = async function getByName (name) {
  const query = "SELECT * FROM dogs WHERE ?;";
  const values = [name];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Run an SQL query against the DB and return the result.
 * @param {string} Query SQL query string in sqljs format
 * @param {string} Dog entry breed
 * @returns {object} mysqljs results object containing indexable rows
 */
//find a specific dog entry by breed
exports.getByBreed = async function getByBreed (breed) {
  const query = "SELECT * FROM dogs WHERE ?;";
  const values = [breed];
  const data = await db.run_query(query, values);
  return data;
}