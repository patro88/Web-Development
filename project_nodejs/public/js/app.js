/**
 * Home page angular JS file
 * This file initializes the app and the controller for the home page
 * It also adds some functions to the home Controller for the nav tabs and sign up module 
 */

var app = angular.module("ATApp", ["ngRoute" , 'angularFileUpload', 'ngTagsInput']);

app.config(['$routeProvider',
            function ($routeProvider) {
	$routeProvider.
	when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeController'
	}).
	when('/about', {
		templateUrl: 'aboutMe.html'
	}).
	when('/profile', {
		templateUrl: 'profile/profile.html',
		controller: 'ProfileController',
		resolve: {
			loggedin: checkLoggedin
		}

	}).
	when('/ask', {
		templateUrl: 'ask/ask.html',
		controller: 'AskController',

	}).
	when('/page', {
		templateUrl: 'pages/page.html',
		controller: 'PageController',

	}).
	when('/questions/:id', {
		templateUrl: 'questions/questions.html',
		controller: 'QuestionController',

	}).
	when('/qa', {
		templateUrl: 'questionAnswer/qa.html',
		controller: 'QAController',

	}).
	when('/tags', {
		templateUrl: 'tags/tags.html',
		controller: 'TagController',

	}).
	when('/profile/:id', {
		templateUrl: 'profile/profile.html',
		controller: 'ProfileController',

	}).
//	when('/', {
//	redirectTo: '/home'
//	});
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


app.directive('elastic', [
                          '$timeout',
                          function($timeout) {
                        	  return {
                        		  restrict: 'A',
                        		  link: function($scope, element) {
                        			  var resize = function() {
                        				  return element[0].style.height = "" + element[0].scrollHeight + "px";
                        			  };
                        			  element.on("blur keyup change", resize);
                        			  $timeout(resize, 0);
                        		  }
                        	  };
                          }
                          ]);

app.factory('dataService', function() {
	var _dataObj = {};
	return {
		setValue: function (key, value) {
			_dataObj[key] = value;
        },
        getValue: function (key) {
            return _dataObj[key];
        }
	};
})

