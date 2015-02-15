var app = angular.module("personApp", []);
app.controller("personController", function ($scope) {
    $scope.firstName = "Shakti";
    $scope.lastName = "Patro";
});


$(function () {
    $("a").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
});