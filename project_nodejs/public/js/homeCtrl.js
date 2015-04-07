app.controller("HomeController",
    function ($scope, $http, $location, $rootScope) {
        

        $scope.login = function (user) {
            $http.post("/login" , user)
            .success(function (response) {
                console.log(response);
                $rootScope.currentUser = response;
                $location.url("/profile");
                $http.get("/profile")
                .success(function(users)
                {
                    $scope.profile = users;
                });
                angular.element('#modalClose').trigger('click');
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
                $scope.regError = "Your passwords don't match";
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
                        $http.get("/profile")
                        .success(function(users)
                        {
                            $scope.profile = users;
                        });
                    }else{
                    	$scope.regError = "Some issue in registration. Please try again";
                    }
                });
            }
        }
        

    });