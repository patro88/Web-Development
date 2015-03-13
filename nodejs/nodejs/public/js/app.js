var app = angular.module("CMApp", []);
app.controller("BookController",
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


app.controller("PlayerController",
    function ($scope, $http) {
        $http.get("/api/player")
        .success(function (response) {
            $scope.players = response;
        });

        $scope.remove = function (id) {
            $http.delete("/api/player/" + id)// to delete data from the client-side
            .success(function (response) {
                $scope.players = response; // update the list after a row has been deleted
            });
        };
        $scope.add = function (player) {
            $http.post("/api/player", player) // to add data onto the client-side
            .success(function (response) {
                $scope.players = response;// update the list after a row has been added
                $scope.player = null;
            });
        };
        $scope.selectedIndex = null;
        $scope.select = function (index) {
            $scope.selectedIndex = index;
            $scope.player = $scope.players[index];

        }
        $scope.update = function (player) {
            $http.put("/api/player/" + player._id, player) // update a particular row
            .success(function (response) {
                $scope.players = response;// update the list after a row has been updated
                $scope.player = null;
            });

        };

    });