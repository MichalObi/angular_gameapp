'use strict';

/* Controllers */

var gameControllers = angular.module('gameControllers', []);

gameControllers.controller('GameListCtrl', ['$scope', 'Game',
  function($scope, Game) {
    $scope.games = Game.query();
    $scope.orderProp = 'age';
  }]);

gameControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', 'Game',
  function($scope, $routeParams, Game) {
    $scope.game = Game.get({gameId: $routeParams.gameId}, function(game) {
      $scope.mainImageUrl = game.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
