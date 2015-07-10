var db = require('../db');

var User = db.model('User', {
	username: String,
	password: {type:String, select: false}
})

module.exports = User;