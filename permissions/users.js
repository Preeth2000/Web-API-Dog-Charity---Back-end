/**
 * A module to set permissions for users to perform CRUD operations on data stored on users
 * @module permissions/users
 * @author Preeth Selvamohan
 */
const AccessControl = require('role-acl');
const ac = new AccessControl();

// controls for CRUD operations on user records
ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('read')
  .on('user', ['*', '!password', '!passwordSalt']);

ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('update')
  .on('user', ['firstName', 'lastName', 'about', 'password', 'email', 'avatarURL']);

ac
  .grant('admin')
  .execute('read')
  .on('user');

ac
  .grant('admin')
  .execute('read')
  .on('users');

ac
  .grant('admin')
  .execute('update')
  .on('user');

ac
  .grant('admin')
  .condition({Fn:'NOT_EQUALS', args: {'requester':'$.owner'}})
  .execute('delete')
  .on('user');

ac
  .grant('staff')
  .execute('read')
  .on('user');

ac
  .grant('staff')
  .execute('read')
  .on('users');


/**
 * Function to check if user has permission to read all user records
 * @params{object} User role
 * @returns{boolean} If user can read all record or not
 */
exports.readAll = (requester) => {
  return ac
    .can(requester.role)
    .execute('read')
    .sync()
    .on('users');
}

/**
 * Function to check if user has permission to read user record
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can read all record or not
 */
exports.read = (requester, data) => {
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.ID})
    .execute('read')
    .sync()
    .on('user');
}

/**
 * Function to check if user has permission to update user records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can update record or not
 */
exports.update = (requester, data) => {
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.ID})
    .execute('update')
    .sync()
    .on('user');
}

/**
 * Function to check if user has permission to delete user records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can delete record or not
 */
exports.delete = (requester, data) => {
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.ID})
    .execute('delete')
    .sync()
    .on('user');
}
