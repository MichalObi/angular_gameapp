'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('gameApp'));

  // Test service availability
  it('check the existence of Game factory', inject(function(Game) {
      expect(Game).toBeDefined();
    }));
});