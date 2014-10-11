beforeEach(function() {
  module('TodoApp')
})
beforeEach(inject(function(_$httpBackend_) {
  jasmine.Ajax.install();
  $httpBackend = _$httpBackend_;
}));