var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Post = require('../models/post');
var User = require('../models/user');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

var secretkey = 'supersecretkey';
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});







router.get('/api/posts', function(req,res){
	Post.find(function(err, posts){
		if (err){return next(err)}
		res.status(201).json(posts);
	})
})

router.post('/api/posts', function(req,res){
	var post = new Post( {
		name: req.body.name,
		text: req.body.text
	})
	post.save(function(err, post){
		if (err){return next(err)};
		res.status(201).json(post);
	})
})

router.post('/session', function(req, res, next){
	User.findOne({username: req.body.username})
	.select('password')
	.exec( function(err, user){
		if (err){return next(err)}
		if (!user){return res.status(401)}
			bcrypt.compare(req.body.password, user.password, function(err, valid){
				if (err){return next(err)}
				if (!valid){return res.status(401)}
				var token = jwt.encode({username: username}, secretkey);
				res.json(token);	
			})
		})
	})

router.get('/user', function(req,res){
	var token = req.headers['x-auth'];
	var auth = jwt.decode(token, secretkey)
	User.findOne({username: auth.username}, function(err, user){
	res.json(user);
	})
})

router.post('/user', function(req, res, next){
	var user = new User ({
		username: req.body.username
	})
	bcrypt.hash(req.body.password, 10, function(err, hash){
		user.password = hash
		user.save(function(err){
			if (err){throw next(err)}
				res.status(201);
		})
	})
})




module.exports = router;
