/**
 * A module to set permissions for users to perform CRUD operations on data stored on messages
 * @module permissions/messages
 * @author Preeth Selvamohan
 */
const AccessControl = require('role-acl');
const ac = new AccessControl();

// controls for CRUD operations on message records
//Users can only edit their own messages
//Staff and admin can edit all messages
ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('read')
  .on('messages', ['*']);

ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('update')
  .on('messages', ['title', 'paragraph']);

ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('delete')
  .on('messages', ['*']);

ac
  .grant('admin')
  .execute('read')
  .on('users');

ac
  .grant('admin')
  .execute('delete')
  .on('messages');

ac
  .grant('staff')
  .execute('read')
  .on('messages');

ac
  .grant('staff')
  .execute('update')
  .on('messages');

ac
  .grant('staff')
  .execute('delete')
  .on('messages');

/**
 * Function to check if user has permission to read all message records
 * @params{object} User role
 * @returns{boolean} If user can update record or not
 */
exports.readAll = (requester) => {
  return ac
    .can(requester.role)
    .execute('read')
    .sync()
    .on('messages');
}

/**
 * Function to check if user has permission to read message record
 * @params{object} User role
 * @returns{boolean} If user can read all record or not
 */
exports.read = (requester, data) => {
  return ac
    .can(requester.role)
    .execute('read')
    .sync()
    .on('messages');
}

/**
 * Function to check if user has permission to update message records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can update record or not
 */
exports.update = (requester, data) => {
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.ID})
    .execute('update')
    .sync()
    .on('messages');
}

/**
 * Function to check if user has permission to update any message records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can update record or not
 */
exports.updateAny = (requester, data) => {
  return ac
    .can(requester.role)
    .execute('update')
    .sync()
    .on('messages');
}

/**
 * Function to check if user has permission to delete message records
 * @params{object} User role and data to be processed
 * @returns{boolean} If user can delete record or not
 */
exports.delete = (requester, data) => {
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.ID})
    .execute('delete')
    .sync()
    .on('messages');
}

/**
 * Function to check if user has permission to delete any message records
 * @params{object} User role
 * @returns{boolean} If user can delete record or not
 */
exports.deleteAny = (requester) => {
  return ac
    .can(requester.role)
    .execute('delete')
    .sync()
    .on('messages');
}
