angular.module('app')
.controller('postCtrl', function($scope, postSvc){
	
	

	 $scope.addpost = function () {
	 	if ($scope.postname && $scope.posttext){
	 		postSvc.create( {
	 			name: $scope.postname, 
	 			text: $scope.posttext
	 		})
	 		.success(function(post){
	 			$scope.posts.unshift(post);
				$scope.postname=null;
	 			$scope.posttext=null;
	 		})
	 	}
	}
		postSvc.fetch()
		.success(function(posts){
			$scope.posts = posts
		})
});

angular.module('app')
	.service('postSvc', function($http){
		this.fetch = function(){
			return $http.get('/api/posts')
		}

		this.create = function(post){
			return $http.post('/api/posts', post)
		}
	})

