/**
 * Home page angular JS file
 * This file initializes the app and the controller for the home page
 * It also adds some functions to the home Controller for the nav tabs and sign up module 
 */

var app = angular.module("ATApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'carousalHome.html',
            controller: 'HomeController'
        }).
        when('/about', {
            templateUrl: 'aboutMe.html'
        }).
        when('/profile', {
            templateUrl: 'profile.html',
            resolve: {
                loggedin: checkLoggedin
            }
        }).
//        when('/', {
//        	redirectTo: '/home'
//        });
        otherwise({
            redirectTo: '/home'
        });
  }]);

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            alert("You need to login");
            deferred.reject();
            $location.url('/login');
        }
    });
    
    return deferred.promise;
};




