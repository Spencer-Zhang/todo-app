function SessionController($scope, $rootScope, $http) {
  var self = this;

  this.action = 'Log In'

  this.error = ""
  $scope.form = {email: "testuser", password: "test"}

  this.loggedIn = false;

  this.login = function() {
    var path;
    if($scope.form.email != "" && $scope.form.password != "") {
      if(self.action == "Log In") { path = "users/sign_in" }
      if(self.action == "Sign Up") { path = "users" }

      var responsePromise = $http.post(API_ROOT + path, $scope.form)
      responsePromise.success(function(data) {
        $rootScope.user = data;
        self.loggedIn = true;
      })
      responsePromise.error(function(data) {
        self.error = data;
      })
    } else {
      self.error = "Fields cannot be blank";
    }
  }

  this.logout = function() {
    self.loggedIn = false;
    $rootScope.user = {};
    $http.delete(API_ROOT + "users/sign_out", $rootScope.user)
  }
}