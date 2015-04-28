app.controller("AskController",
	    function ($scope, $http,$location,dataService) {
//	        
//	$scope.loadTags = function(query) {
//		return $http.get('/tags/'+ query);
//	};
	$scope.submit = function(query) {
		var question = {
				title: 	$scope.title,
				description : $scope.description,
				answers : [],
				tags : $scope.tags
		}
		
		$http.post("/ask", question)
			.success( function (response){
				
				dataService.setValue("qid", response);
				$location.path("/qa");
//				$http.get("/questionAnswer/"+response)
//				.success( function (response){
//					$rootScope.result = response;
//					$location.path("/qa");
//				});
		});
	}
});