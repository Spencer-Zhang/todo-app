var request;

beforeEach(function() {
  jasmine.Ajax.install();
})

describe('SessionController', function() {
  var controller;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new()
    controller = $controller('SessionController', {
      '$scope':scope
    });
  }));

  it('can create a new user', function() {
    $.ajax('test')
    console.log(jasmine.Ajax.requests.mostRecent())
  });

  it('can log in as an existing user', function() {

  })
});