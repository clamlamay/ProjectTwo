/**
 * Created by jenniferbrown on 10/30/16.
 */
var bookshelf = require('./db')

//whatever table this table relates too, require other model
require('./AccountModel')

var Content = bookshelf.Model.extend({
    tableName: 'contents',
    user: function(){
        return this.belongsTo('Account')//refers to the table its related too
    }
});

module.exports = bookshelf.model('Content', Content);