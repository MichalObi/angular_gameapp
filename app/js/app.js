'use strict';

/* App Module */

var gameApp = angular.module('gameApp', [
  'ngRoute',
  'gameAnimations',
  'gameControllers',
  'gameFilters',
  'gameServices'
]);

gameApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/games', {
        templateUrl: 'partials/game-list.html',
        controller: 'GameListCtrl'
      }).
      when('/games/:gameId', {
        templateUrl: 'partials/game-detail.html',
        controller: 'GameDetailCtrl'
      }).
      otherwise({
        redirectTo: '/games'
      });
  }]);
