angular.module('app')
.controller('loginCtrl', function ($scope, UserSvc, $location) {
  $scope.login = function (username, password) {
    UserSvc.login(username, password)
    .then(function (user) {
    	console.log(user+'thhththt')
      	$scope.$emit('login', user)
      	$location.path('/')
    })
  }
})

angular.module('app')
.service('UserSvc', function ($http) {
  var svc = this
  svc.getUser = function () {
    return $http.get('/api/users')
    .then(function (response) {
      return response.data
    })
  }
	// angular requesting a jwt through post
	svc.login = function (username, password) {
    return $http.post('/api/sessions', {
      username: username, password: password
    }).then(function (response) {
      svc.token = response.data
      $http.defaults.headers.common['X-Auth'] = response.data
      return svc.getUser()
    })
  }
})
