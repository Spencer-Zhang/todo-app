var receivedData;

describe('SessionController', function() {
  var controller, scope;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new()
    controller = $controller('SessionController', {
      '$scope':scope
    });
  }));

  describe("#login", function() {

    describe("When creating a new user", function() {
      beforeEach(function() {
        controller.action = "Sign Up"
        scope.form.email="test"
        scope.form.password="test"
        controller.login();
      })

      it("sends a POST request to '/users' with correct data", function() {
        $httpBackend.whenPOST(API_ROOT + 'users').respond(function(method, url, data) {
          receivedData = angular.fromJson(data);
          return [200, {api_token: "abc", user_id: 12}]
        })
        $httpBackend.flush();
        expect(receivedData).toEqual(scope.form)
      })

      it("logs in the user if the API call succeeds", function() {
        $httpBackend.whenPOST(API_ROOT + 'users').respond(function(method, url, data) {
          receivedData = angular.fromJson(data);
          return [200, {api_token: "abc", user_id: 12}]
        })

        $httpBackend.flush();
        expect(scope.user.api_token).toEqual('abc')
        expect(scope.user.user_id).toEqual(12)
        expect(controller.loggedIn).toBe(true)
      })

      it("Creates an error if the API call fails", function() {
        $httpBackend.whenPOST(API_ROOT + 'users').respond(function(method, url, data) {
          receivedData = angular.fromJson(data);
          return [500, "Error"]
        })
        $httpBackend.flush();
        expect(controller.error).toEqual("Error")
        expect(controller.loggedIn).toBe(false)
      })
    });

    describe("When logging in as an existing user", function() {
      beforeEach(function() {
        controller.action = "Log In"
        scope.form.email="test"
        scope.form.password="test"
        controller.login();
      })

      it("sends a POST request to '/users/sign_in' with correct data", function() {
        $httpBackend.whenPOST(API_ROOT + 'users/sign_in').respond(function(method, url, data) {
          receivedData = angular.fromJson(data);
          return [200, {api_token: "abc", user_id: 12}]
        })
        $httpBackend.flush();
        expect(receivedData).toEqual(scope.form)
      })

      it("logs in the user if the API call succeeds", function() {
        $httpBackend.whenPOST(API_ROOT + 'users/sign_in').respond(function(method, url, data) {
          receivedData = angular.fromJson(data);
          return [200, {api_token: "abc", user_id: 12}]
        })

        $httpBackend.flush();
        expect(scope.user.api_token).toEqual('abc')
        expect(scope.user.user_id).toEqual(12)
        expect(controller.loggedIn).toBe(true)
      })

      it("Creates an error if the API call fails", function() {
        $httpBackend.whenPOST(API_ROOT + 'users/sign_in').respond(function(method, url, data) {
          receivedData = angular.fromJson(data);
          return [500, "Error"]
        })
        $httpBackend.flush();
        expect(controller.error).toEqual("Error")
        expect(controller.loggedIn).toBe(false)
      })
    });

    it('creates an error message if email is left blank', function() {
      scope.form.email=""
      scope.form.password="test"
      controller.login();
      expect(controller.error).toEqual("Fields cannot be blank");
    })

    it('creates an error message if password is left blank', function() {
      scope.form.email="test"
      scope.form.password=""
      controller.login();
      expect(controller.error).toEqual("Fields cannot be blank");
    })
  })

  describe('#logout', function() {
    it('logs the user out', inject(function($rootScope) {
      $rootScope.user = {id: 12, api_token: "abc"}
      controller.loggedIn = true;
      controller.logout();

      expect(scope.user).toEqual({})
      expect(controller.loggedIn).toEqual(false);
    }))
  })
});