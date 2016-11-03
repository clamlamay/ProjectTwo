var bookshelf = require('./db')

//whatever table this table relates too, require other model
require('./ContentModel')

var Account = bookshelf.Model.extend({
    tableName: 'users',
    contents: function(){
        return this.hasMany('Content')//refers to the table its related too
    }
});

module.exports = bookshelf.model('Account', Account);