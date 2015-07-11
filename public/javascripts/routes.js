angular.module('app')
.config(function ($routeProvider){
	$routeProvider
		.when('/', {controller: 'postCtrl', templateUrl: '/partials/post.html'})
		.when('/register', {controller: 'regCtrl', templateUrl: '/partials/register.html'})
		.when('/login', {controller: 'loginCtrl', templateUrl: '/partials/login.html'})

})