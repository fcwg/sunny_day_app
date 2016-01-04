var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);




//ROUTES

weatherApp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'Pages/home.htm',
		controller: 'homeController'
	})

	.when('/forecast', {
		templateUrl: 'Pages/forecast.htm',
		controller: 'forecastController'
	})

	.when('/forecast/:days', {
		templateUrl: 'Pages/forecast.htm',
		controller: 'forecastController'
	})

})


//SERVICES

weatherApp.service('cityService', function() {
	this.city = "San Francisco, CA";
})


//CONTROLLERS

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
	$scope.city = cityService.city;

	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	})

}])



weatherApp.controller('forecastController', ['$scope','$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

	$scope.city = cityService.city;

	$scope.days = $routeParams.days || '2';

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=e4cc9f2da50123ebaffe9c7d5d9c2766", {
		callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}});

	$scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt:$scope.days });

	$scope.convertToFahrenheit = function(degk) {
		return Math.round((1.8 * (degk - 273)) + 32);
	}

	$scope.convertToDate = function(dt) {
		return new Date(dt);
	}

}]);














