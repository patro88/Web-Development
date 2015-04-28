app.controller("QAController",
		function ($scope, $http,dataService, $location, $route, $rootScope) {
	

	$http.get("/questionAnswer/"+dataService.getValue("qid"))
	.success( function (response){
		$scope.qa = response;
	});	
	
	
	$scope.tagClick = function (text){
		dataService.setValue("tag", text);
		$location.path("/questions/tag");
	};
	
	$scope.submitAns = function(qid, val){
		
		var reqObj = {
			qid: qid,
			ans : {
				user: $rootScope.currentUser.userid,
				answer: val
			}
		};
		
		$http.post("/answer", reqObj)
		.success(function(response){
			$scope.qa = response;
		});
//		$route.reload();
	}
	
	
	$scope.dislike = function(qid, uid){
		var data= {
				userid: uid,
				qid : qid
		}
		$http.post("/dislike", data)
		.success(function(response){
			$scope.qa = response;
//			$route.reload();
		});
	};
	
	
	$scope.like = function(qid, uid){
		var data= {
				userid: uid,
				qid : qid
		}
		$http.post("/like", data)
		.success(function(response){
			$scope.qa = response;
//			$route.reload();
		})
	};
	

	$scope.tagClickQA = function (text){
		dataService.setValue("tag", text);
		$location.path("/questions/tag");
//		$route.reload();
	};
});