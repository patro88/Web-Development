app.controller("QuestionController",
	    function ($scope, $http, $location, $rootScope, $routeParams, dataService, $route) {
//	        
//	$scope.loadTags = function(query) {
//		return $http.get('/tags/'+ query);
//	};
	
	if($routeParams.id == "all"){
		$rootScope.qTags = false;
		$http.get("/questions")
		.success(function(response){
			$scope.questions = response;
		});
	}else if($routeParams.id == "search"){
		$rootScope.qTags = false;
		var searchText = dataService.getValue("search");
		$http.post("/search", {text: searchText})
		.success( function(response){
			$scope.questions = response;
		})
	}else if($routeParams.id == "tag"){
		$rootScope.qTags = true;
		$http.get("/tagQuestion/"+dataService.getValue("tag"))
		.success(function(response){
			$scope.questions = response;
			
		})
		
	}
	
	$scope.questionDetails = function(id) {
		dataService.setValue("qid", id);
		$location.path("/qa");
	}
	
	$scope.tagClickQ = function (text){
		dataService.setValue("tag", text);
		$location.path("/questions/tag");
		$route.reload();
	};
	
});