'use strict';

/* jasmine specs for controllers go here */
describe('Game controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('gameApp'));
  beforeEach(module('gameServices'));

  describe('GameListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('games/games.json').
          respond([{name: 'GTA V'}, {name: 'Assassins creed 3'}]);

      scope = $rootScope.$new();
      ctrl = $controller('GameListCtrl', {$scope: scope});
    }));


    it('should create "games" model with 2 games fetched from xhr', function() {
      expect(scope.games).toEqualData([]);
      $httpBackend.flush();

      expect(scope.games).toEqualData(
          [{name: 'GTA V'}, {name: 'Assassins creed 3'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('GameDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzGameData = function() {
          return {
            name: 'game xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('games/xyz.json').respond(xyzGameData());

      $routeParams.gameId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('GameDetailCtrl', {$scope: scope});
    }));


    it('should fetch game detail', function() {
      expect(scope.game).toEqualData({});
      $httpBackend.flush();

      expect(scope.game).toEqualData(xyzGameData());
    });
  });
});
