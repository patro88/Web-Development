/**
 * Home page angular JS file
 * This file initializes the app and the controller for the home page
 * It also adds some functions to the home Controller for the nav tabs and sign up module 
 */

var app = angular.module("ATApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'carousalHome.html'
        }).
        when('/about', {
            templateUrl: 'aboutMe.html'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);



app.controller("HomeController",
    function ($scope, $http) {
        $http.get("/api/book")
        .success(function (response) {
            $scope.booklist = response;
        });

        $scope.remove = function (index) {
            $http.delete("/api/book/" + index)// to delete data from the client-side
            .success(function (response) {
                $scope.booklist = response; // update the list after a row has been deleted
            });
        };
        $scope.add = function (book){ 
            $http.post("/api/book", book) // to add data onto the client-side
            .success(function (response) {
                $scope.booklist = response;// update the list after a row has been added
            });
        };
        $scope.selectedIndex = null;
        $scope.select = function (index)
        {
            $scope.selectedIndex = index;
            $scope.book = $scope.booklist[index];
        }
        $scope.update = function (book) {
            $http.put("/api/book/" + $scope.selectedIndex, book) // update a particular row
            .success(function (response) {
                $scope.booklist = response;// update the list after a row has been updated
            });

        };

    });
