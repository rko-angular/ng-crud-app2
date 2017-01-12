'use strict';

// Declare app level module which depends on views, and components & dependecies
angular.module('myPeeps', [
  'ngRoute',
  'firebase',
  'myPeeps.peeps'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/peeps'});
}]);
