var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Post = require('../models/post');
var User = require('../models/user');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var config = require('../config.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/api/posts', function(req,res){
	Post.find(function(err, posts){
		if (err){return next(err)}
		res.sendStatus(201).json(posts);
	})
})

router.post('/api/posts', function(req,res){
	var post = new Post( {
		name: req.body.name,
		text: req.body.text
	})
	post.save(function(err, post){
		if (err){return next(err)};
		res.sendStatus(201).json(post);
	})
})





router.post('/api/sessions', function (req, res, next) {
  var username = req.body.username
  console.log(username);
  User.findOne({username: username})
  .select('password')
  .exec(function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) { return next(err) }
      if (!valid) { return res.sendStatus(401) }
      var token = jwt.encode({username: username}, config.secret)
      res.send(token)
    })
  })
})



// get existing user
router.get('/api/users', function (req, res, next) {
  if (!req.headers['x-auth']) {
    return res.sendStatus(401)
  }
  var auth = jwt.decode(req.headers['x-auth'], config.secret)
  User.findOne({username: auth.username}, function (err, user) {
    if (err) { return next(err) }
    res.json(user)
  })
})

router.post('/api/users', function (req, res, next) {
  var user = new User({username: req.body.username})
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) { return next(err) }
    user.password = hash
    user.save(function (err) {
      if (err) { return next(err) }
      res.sendStatus(201)
    })
  })
})



module.exports = router;
