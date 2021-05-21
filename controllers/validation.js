/**
 * A module to run JSON Schema based validation on request/response data.
 * @module controllers/validation
 * @author Preeth Selvamohan
 * @see schemas/* for JSON Schema definition files
 */

const {Validator, ValidationError} = require('jsonschema');

const userSchema = require('../schemas/user.json').definitions.user;
const userUpdateSchema = require('../schemas/user.json').definitions.userUpdate;
const dogSchema = require('../schemas/dog.json').definitions.dog;
const dogUpdateSchema = require('../schemas/dog.json').definitions.dogUpdate;
const messagesSchema = require('../schemas/messages.json').definitions.messages;
const messageUpdateSchema = require('../schemas/messages.json').definitions.messageUpdate;

/**
 * Wrapper that returns a Koa middleware validator for a given schema.
 * @param {object} schema - The JSON schema definition of the resource
 * @param {string} resource - The name of the resource e.g. 'article'
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */
const makeKoaValidator = (schema, resource) => {

  const v = new Validator();
  const validationOptions = {
    throwError: true,
    propertyName: resource
  };
  
  /**
   * Koa middleware handler function to do validation
   * @param {object} ctx - The Koa request/response context object
   * @param {function} next - The Koa next callback
   * @throws {ValidationError} a jsonschema library exception
   */
  const handler = async (ctx, next) => {

    const body = ctx.request.body;

    try {
      v.validate(body, schema, validationOptions);
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error);
        ctx.status = 400
        ctx.body = error;
      } else {
        throw error;
      }
    }
  }
  return handler;
}


/** Validate data against user schema for creating new users */
exports.validateUser = makeKoaValidator(userSchema, 'user');
/** Validate data against user schema for updating existing users */
exports.validateUserUpdate = makeKoaValidator(userUpdateSchema, 'userUpdate');
/** Validate data against dog schema for creating new dog entries */
exports.validateDog = makeKoaValidator(dogSchema, 'dog');
/** Validate data against dog schema for updating existing dog entries */
exports.validateDogUpdate = makeKoaValidator(dogUpdateSchema, 'dogUpdate');
/** Validate data against message schema for creating new message entires */
exports.validateMessage = makeKoaValidator(messagesSchema, 'messages');
/** Validate data against message schema for updating existing message entries */
exports.validateMessageUpdate = makeKoaValidator(messageUpdateSchema, 'messageUpdate');
