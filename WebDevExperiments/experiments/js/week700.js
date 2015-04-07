var app = angular.module("FormApp", []);


app.controller("FormController", function myContoller($scope, $http) {

    $scope.add = function (player) {

        $http.post("http://nodejs-shakti200.rhcloud.com/api/player", player)
           .success(function (response) {
               $scope.added = true;
           });
    }

    $scope.update = function (player) {
        $http.put("http://nodejs-shakti200.rhcloud.com/api/player/" + player._id, player)
        .success(function (response) {
            $scope.updated = true;
            $scope.uploaded = null;
        });
    };

    $scope.upload = function () {
        $http.get("http://nodejs-shakti200.rhcloud.com/api/player/1")
        .success(function (response) {
            $scope.player = response;
            $scope.uploaded = true;
        });
        
    }

    $scope.delete = function (id) {
        $http.delete("http://nodejs-shakti200.rhcloud.com/api/player/"+id)
        .success(function (response) {
            $scope.updated = true;
            $scope.uploaded = null;
            $scope.player = null;
        });

    }

});