angular.module('oneTimeBidingExampleApp', []).
controller('EventController', ['$scope', function ($scope) {
    var counter = 0;
    var names = ['Shakti', 'Vikas', 'Pankaj', 'Abhishek', 'Kartik'];

    $scope.clickMe = function (clickEvent) {
        $scope.name = names[counter % names.length];
        counter++;
    };
}]).controller('FilterController', ['filterFilter', function (filterFilter) {
    this.array = [
      { name: 'Patro' },
      { name: 'Shriyan' },
      { name: 'Mahaley' },
      { name: 'Tiwary' },
      { name: 'Tripathy' }
    ];
    this.filteredArray = filterFilter(this.array, 't');
}]).filter('reverse', function () {
    return function (input, uppercase) {
        input = input || '';
        var out = "";
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        // conditional based on optional argument
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    };
}).controller('MyController', ['$scope', function ($scope) {
    $scope.greeting = 'hello';
}]);