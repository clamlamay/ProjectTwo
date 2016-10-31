var db = require('./db');
var bookshelf = require('bookshelf')(db);

var AccountModel = bookshelf.Model.extend({
  tableName: 'users_accounts'
});

module.exports = AccountModel;