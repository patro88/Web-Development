var app = angular.module("BookApp", []);

app.controller("BookController", function ($scope, $http) {
    
    $scope.searchBooks = function () {
        var title = $scope.searchTitle;
        $http.jsonp("https://www.googleapis.com/books/v1/volumes?q=" + title + "&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.books = response;
        })
    }


});