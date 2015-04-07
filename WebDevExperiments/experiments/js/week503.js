var app = angular.module("BookApp", []);

app.controller("BookController", function ($scope, $http) {

    $scope.searchBooksByIsbn = function () {
        var title = $scope.searchTitle;
        $http.jsonp("https://www.googleapis.com/books/v1/volumes?q=+isbn:" + title + "&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.books = response;
        })
    }
    $scope.searchBooksByPublisher = function () {
        var title = $scope.searchTitle;
        $http.jsonp("https://www.googleapis.com/books/v1/volumes?q=+inpublisher:" + title + "&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.books = response;
        })
    }
    $scope.searchBooksByAuthor = function () {
        var title = $scope.searchTitle;
        $http.jsonp("https://www.googleapis.com/books/v1/volumes?q=+inauthor:" + title + "&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.books = response;
        })
    }
    $scope.searchBooksByTitle = function () {
        var title = $scope.searchTitle;
        $http.jsonp("https://www.googleapis.com/books/v1/volumes?q=+intitle:" + title + "&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.books = response;
        })
    }
});

