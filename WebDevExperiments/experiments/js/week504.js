var app = angular.module("BookApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/search', {
            templateUrl: 'partials/search.html'
            //, controller: 'SearchController'
        }).
        when('/fav', {
            templateUrl: 'partials/favs.html'
            //,controller: 'FavsController'
        }).
        otherwise({
            redirectTo: '/search'
        });
  }]);

app.controller("SearchController", function ($scope) {
    $scope.books = books;
});


app.controller("FavsController", function ($scope) {
    $scope.books = books;
});



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

    $scope.favoriteBooks = [];

    $scope.addToFavorites = function (book, i) {
        $scope.books.items[i].sss = i;
        var index = $scope.favoriteBooks.indexOf(book);
        if (index != -1) {
            $scope.favoriteBooks.splice(index, 1);
        } else {
            book.isFavorite = 'true';
            $scope.favoriteBooks.push(book);
        }
        

    }

});

