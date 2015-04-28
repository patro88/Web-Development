app.controller("HomeController",
    function ($scope, $http, $location, $rootScope, dataService) {
        

        $scope.login = function (user) {
            $http.post("/login" , user)
            .success(function (response) {
//                console.log(response);
                $rootScope.currentUser = response;
                $location.url("/profile");
//                $http.get("/profile")
//                .success(function(users)
//                { 
//                    $scope.profile = users;
//                });
//                $scope.profile = users;
                angular.element('#modalClose').trigger('click');
            })
            .error(function(data, status){
            	$rootScope.message = "INVALID username or password. Please try again.";
            	 alert("INVALID username or password. Please try again.");
            });
        };
        
        $scope.logout = function(){
            $http.post("/logout")
            .success(function(){
                $rootScope.currentUser = null;
                $scope.profile = null;
                $location.url("/home");
            });
        } 
        
        $scope.register = function(user){
            console.log(user);
            if(user.password != user.password2 || !user.password || !user.password2)
            {
                $rootScope.message = "Your passwords don't match";
                alert("Your passwords don't match");
//                $scope.regError = "Your passwords don't match";
            }
            else
            {
            	$scope.regError = null;
                $http.post("/register", user)
                .success(function(response){
                    console.log(response);
                    if(response != null)
                    {
                        $rootScope.currentUser = response;
                        angular.element('#modalClose').trigger('click');
                        $location.url("/profile");
//                        $http.get("/profile")
//                        .success(function(users)
//                        {
//                            $scope.profile = users;
//                        });
//                        $scope.profile = users;
                    }else{
                    	$scope.regError = "Some issue in registration. Please try again";
                    }
                });
            }
        }
        
        
        $scope.search = function(){
        	dataService.setValue("search", $scope.searchText);
        	$location.path("/questions/search");
        }
        

    });


