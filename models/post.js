var db = require('../db');

var Post = db.model('Post', {
	name: {type: String, required: true},
	text: {type: String, required: true},
	date: {type: Date, required: true, default: Date.now}
})

module.exports = Post;