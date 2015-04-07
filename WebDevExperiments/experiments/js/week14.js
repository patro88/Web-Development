var app = angular.module("calculateApp", []);
app.controller("calculateController", function ($scope) {
    $scope.services = [
         {
             name: 'Web Development',
             price: 1350,
             active: false
         }, {
             name: 'Algorithm',
             price: 1200,
             active: false
         }, {
             name: 'Databases',
             price: 1250,
             active: false
         }, {
             name: 'Artificial Intelligence',
             price: 1400,
             active: false
         }
    ];

    $scope.toggleActive = function (s) {
        s.active = !s.active;
    };

    $scope.total = function () {

        var total = 0;
        angular.forEach($scope.services, function (s) {
            if (s.active) {
                total += s.price;
            }
        });

        return total;
    };
});


