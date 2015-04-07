var app = angular.module("personApp", []);
app.controller("personController", function ($scope) {
    $scope.firstName = "Shakti";
    $scope.lastName = "Patro";
});


$(function () {
    $(".non-click a").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
});