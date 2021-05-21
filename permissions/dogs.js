/**
 * A module to set permissions for users to perform CRUD operations on data stored on dogs
 * @module permissions/dogs
 * @author Preeth Selvamohan
 */
const AccessControl = require('role-acl');
const ac = new AccessControl();

// controls for specific CRUD operations on dog records
// don't let users update an Dog ID


ac
  .grant('staff')
  .execute('read')
  .on('dog');

ac
  .grant('staff')
  .execute('update')
  .on('dog');

ac
  .grant('staff')
  .execute('add')
  .on('dog');

ac
  .grant('staff')
  .execute('delete')
  .on('dog');

ac
  .grant('admin')
  .execute('update')
  .on('dog');

ac
  .grant('admin')
  .execute('add')
  .on('dog');

ac
  .grant('admin')
  .execute('delete')
  .on('dog');

ac
  .grant('admin')
  .execute('read')
  .on('dog');


/**
 * Function to check if user has permission to read dog records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can read a record or not
 */
exports.read = (requester, data) => {
    console.log(requester)
    console.log(data)
  return ac
    .can(requester.role)
    .execute('read')
    .sync()
    .on('dog');
}

/**
 * Function to check if user has permission to update dog records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can update record or not
 */
exports.update = (requester, data) => {
    console.log(requester)
    console.log(data)
  return ac
    .can(requester.role)
    .execute('update')
    .sync()
    .on('dog');
}

/**
 * Function to check if user has permission to create dog records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can create a record or not
 */
exports.add = (requester, data) => {
    console.log(requester)
    console.log(data)
  return ac
    .can(requester.role)
    .execute('add')
    .sync()
    .on('dog');
}

/**
 * Function to check if user has permission to delete dog records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can delete record or not
 */
exports.delete = (requester) => {
  return ac
    .can(requester.role)
    .execute('delete')
    .sync()
    .on('dog');
}