app.controller("TagController",
		function ($scope, $http, $location, dataService) {

	$http.get("/tags")
	.success( function (response){
		$scope.tags = response;
	});	
	
	$scope.tagClick = function (text){
		dataService.setValue("tag", text);
		$location.path("/questions/tag");
	};
	
});