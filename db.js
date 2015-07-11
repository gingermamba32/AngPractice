var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social', function(){
	console.log('CONNECTED TO DB');
})

module.exports = mongoose;