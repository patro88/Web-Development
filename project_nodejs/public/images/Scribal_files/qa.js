app.controller("QAController",
		function ($scope, $http,dataService, $location) {
	

	$http.get("/questionAnswer/"+dataService.getValue("qid"))
	.success( function (response){
		$scope.qa = response;
	});	
	
	
	$scope.tagClick = function (text){
		dataService.setValue("tag", text);
		$location.path("/questions/tag");
	};
	
	$scope.submitAns = function(){
		
		reqObj = {
			qid: $scope.qa[0]._id,
			ans : $scope.answer
		};

		$http.post("/answer/", reqObj)
		.success(function(response){
			$scope.qa = response;
		});
//		$route.reload();
	}
	
//	console.log($rootScope.result);
//	$scope.qa = $rootScope.result.q;
//	$scope.tags = $rootScope.result.t;
	
	
	
//	$http.get("/questionAnswer/"+id)
//	.success( function (response){
//		$scope.qa = response;
//		console.log
//
//	});
});