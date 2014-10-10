// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = angular.module("TodoApp", [])

var API_ROOT = "http://recruiting-api.nextcapital.com/"

app.run(function($rootScope) {
  $rootScope.user = {user_id: "", api_token: ""}
})

function ErrorController($scope, $rootScope) {
  this.message = $rootScope.error;
}

function SessionController($scope, $rootScope) {
  var self = this;

  this.action = 'Log In'
  this.user = $rootScope.user
  this.error = ""
  $scope.form = {email: "test", password: ""}

  this.login = function() {
    var path;
    if($scope.form.email != "" && $scope.form.password != "") {
      if(self.action == "Log In") {
        path = "users/sign_in"
      } else if (self.action == "Sign Up") {}
        path = "users"
      }
      $.ajax({
        url: API_ROOT + path,
        type: "POST",
        data: $scope.form,
        success: function(body) {
          $rootScope.user = JSON.parse(body);
        },
        error: function(body) {
          var errorMessage = JSON.parse(body.responseText);
          self.error = errorMessage;
          $scope.$apply()
        }
      })
    } else {
      self.error = "Fields cannot be blank"
    }
  }

  this.logout = function() {
    $rootScope.user.loggedIn = false;
  }
}

function TodoController($scope, $rootScope) {
  var self = this;
  this.user = $rootScope.user
  this.todos = []

  $scope.$watch("user.loggedIn", function() {
    if(self.user.loggedIn) {

    }
  })
}
