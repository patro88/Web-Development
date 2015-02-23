var app = angular.module("myApp", ['ngAnimate']);


app.controller("myController", function myContoller($scope) {

    $scope.items = [];
    $scope.addItem = function () {

        for (i = 10; i--;) {
            $scope.items.push({ 'title': 'item' + i })
        }
    }

    $scope.clearItems = function () {
        $scope.items = [];

    }
    $scope.removeItem = function (index) {
        $scope.items.splice(index, 1);
    }

});