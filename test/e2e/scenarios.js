'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Game App', function() {

  it('should redirect index.html to index.html#/games', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/games');
      });
  });


  describe('Game list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/games');
    });


    it('should filter the game list as a user types into the search box', function() {

      var gameList = element.all(by.repeater('game in games'));
      var query = element(by.model('query'));

      expect(gameList.count()).toBe(5);

      query.sendKeys('assasin');
      expect(gameList.count()).toBe(1);

      query.clear();
      query.sendKeys('gta');
      expect(gameList.count()).toBe(1);
    });


    it('should be possible to control game order via the drop down select box', function() {

      var gameNameColumn = element.all(by.repeater('game in games').column('game.name'));
      var query = element(by.model('query'));

      function getNames() {
        return gameNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('gta'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "GTAV"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "GTAV"
      ]);
    });


    it('should render game specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('gta');
      element.all(by.css('.games li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/games/gta-v');
      });
    });
  });


  describe('Game detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/games/gta-v');
    });


    it('should display gta-v page', function() {
      expect(element(by.binding('game.name')).getText()).toBe('GTAV');
    });


    it('should display the first game image as the main game image', function() {
      expect(element(by.css('img.game.active')).getAttribute('src')).toMatch(/img\/games\/gtav.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.game-thumbs li:nth-child(3) img')).click();
      expect(element(by.css('img.game.active')).getAttribute('src')).toMatch(/img\/games\/gtav.2.jpg/);

      element(by.css('.game-thumbs li:nth-child(1) img')).click();
      expect(element(by.css('img.game.active')).getAttribute('src')).toMatch(/img\/games\/gtav.jpg/);
    });
  });
});
